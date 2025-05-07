const mongoose = require("mongoose");
const Product = require("../models/product");
const initdata = require("./data");
require('dotenv').config();


const MONGO_URL = "mongodb+srv://abhishekkaushal2526:eyAs707z6oD4ZVD5@cluster0.h9hvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

const initDb = async () => {
  await Product.insertMany(initdata.data);
  console.log("data was initilize");
};
initDb();
