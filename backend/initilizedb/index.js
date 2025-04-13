const mongoose = require("mongoose");
const Product = require("../models/product");
const initdata = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/urboncompany";
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
