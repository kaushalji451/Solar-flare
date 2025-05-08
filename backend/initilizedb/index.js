const mongoose = require("mongoose");
const Product = require("../models/product");
const initdata = require("./data");
require('dotenv').config();


const MONGO_URL = "mongodb+srv://abhishekkaushal2526:bDfdkRsBEOloPZ4c@urboncompany.gjaquql.mongodb.net/?retryWrites=true&w=majority&appName=urbonCompany";
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
