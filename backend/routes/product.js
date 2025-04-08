const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("../models/product");

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