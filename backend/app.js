const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");
const Review = require("./models/review");
const User = require("./models/User");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
require('dotenv').config();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATHCH", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGO_URL = process.env.MONGO_URI;
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
// get all product data
app.get("/", async (req, res) => {
  let result = await Product.find({});
  res.send(result);
});

// create product data
app.post("/product", async (req, res) => {
  let newproduct = new Product(req.body);
  let data = await newproduct.save();
  res.json("your data was saved");
});

// get single product data
app.get("/product/:id", async (req, res) => {
  let { id } = req.params;
  let result = await Product.findById(id).populate("reviewid").exec();
  res.json(result);
});

// update update single product data
app.put("/product/edit/:id", async (req, res) => {
  let { id } = req.params;
  let responce = await Product.findByIdAndUpdate(id, req.body);
  let data = await responce.save();
  res.json("your data was updated");
});

// delete product
app.delete("/product/:id", async (req, res) => {
  let { id } = req.params;
  let responce = await Product.findByIdAndDelete(id);
  res.json(responce.categery);
});


// review add
app.post("/product/review/:id", async (req, res) => {
  let { id } = req.params;
  let newreview = new Review(req.body);
  let data = await newreview.save();

  let product = await Product.findByIdAndUpdate(
    id,
    { $push: { reviewid: data._id } },
    { new: true }
  );
  res.json("your review was saved");
});
// f

// user post request 
app.post("/user",async(req,res)=>{
  let check = await User.find({email : req.body.email});
  if(!check ){
    let newuser = new User(req.body);
    let data = await newuser.save();
      if(data){
        res.json("user added");
      }
  }else{
    console.log(check);
    res.json("this user is exist please login");
  }
})

// user check request && get user
app.post("/user/check",async(req,res)=>{
  let {email} = req.body;
  let data = await User.find({email : email});
  if(data){
    res.json(data);
  }else{
    res.json("user does not exist");
  }
})


// user get route
app.get("/user",async(req,res)=>{
  let {email} = req.query;
  let data = await User.find({email : email});
  // console.log(data);
  res.json(data);
})

app.get("/isowner",(req,res)=>{
  let {email} = req.query;
  if(email == process.env.ADMIN){
    res.json("this is owner");
  }else{
    res.json("not an owner");
  }
})



// post product data post request
app.post("/product/cart/:id",async(req,res)=>{
    let {id} = req.params;
    let { _id: userId } = req.body;
    let product =await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
  }
  let cart = await Cart.findOne({userId});
  
  if (!cart) {
      cart = new Cart({userId : userId, item: [product._id]});
  } else {
    if (!cart.item.includes(product._id)) {
      cart.item.push(product._id);
  } else {
      return res.status(400).json({ message: "Product already in cart" });
  }
  }
  await cart.save();
  res.json("product added successfully");
})


// cart items get route
app.get("/cart/:id",async(req,res)=>{
  let {id} = req.params;
  if(id){
  let data = await Cart.findOne({userId : id}).populate("item");
    res.json(data.item);
  }
})

// // item delete
app.delete("/cart/:id",async(req,res)=>{
    let {id} = req.params;
    const objectIdToRemove = new mongoose.Types.ObjectId(id);
        const result = await Cart.updateMany(
            { item: objectIdToRemove },  
            { $pull: { item: objectIdToRemove } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Item not found in any cart" });
        }

        res.status(200).json({ message: "Item removed successfully", result });
})

// payment getway intergation backend

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id : process.env.RAZORPAY_KEY,
  key_secret : process.env.RAZORPAY_SECRET,
})

// create order  api
app.post("/create-order",async(req,res)=>{
  const {amount,currency} =req.body;
  try {
    const order =await  razorpay.orders.create({
      amount : amount*100, 
      currency : currency,
      payment_capture : 1
    })
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
})



// to empty the items cart 
app.get("/orders",async(req,res)=>{
  let {userId} = req.query;
  if(userId!=undefined){
  let data = await Cart.findOneAndUpdate(
    {userId : userId},
    {$set : {item : []}},
  )
  res.json(data);
  console.log(data);
  }
})


// to post the order in order schema
app.post("/order",async(req,res)=>{
  let {order,response} = req.body;

  let existingOrder = await Order.findOne({
    orderId: response.razorpay_order_id
  });

  if (existingOrder) {
    return res.status(200).json("Order already exists");
  }
  let data = new Order({
    orderId : response.razorpay_order_id,
    paymentId : response.razorpay_payment_id,
    item : order.item,
    userId : order.userId
  });
  await data.save();
  res.json("added successfully");
})


// all orders get
app.get("/allOrder/:id", async(req,res)=>{
  let {id} = req.params;
  const objectId = new mongoose.Types.ObjectId(id); 
  let data = await Order.find({userId : objectId}).populate("item");
  res.json(data);
})

app.listen(8080, () => {
  console.log(`listing on port 8080`);
});
