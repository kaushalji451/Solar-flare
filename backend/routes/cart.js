const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product");

  
  // cart items get route
  app.get("/cart/:id",async(req,res)=>{
    let {id} = req.params;
    let data = await Cart.findOne({userId : id}).populate("item");
      res.json(data.item);
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