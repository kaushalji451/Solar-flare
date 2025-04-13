const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderSchema = new Schema(
  {
    orderId: String,
    paymentId: String,
    totalAmount: Number,
    
    // Reference to Product collection
    item: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    
    // Reference to User collection
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  }
);

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;