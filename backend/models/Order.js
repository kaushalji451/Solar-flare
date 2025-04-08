const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderId : String,
    item :  [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    paymentId : String,
    totalAmount : Number
});

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;