const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cartItems",
  },
  shipping_status: {
    type: String,
    default: "Not shipped",
  },
  purchase_methode: {
    type: String,
    default: "Cash",
  },
  order_date: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
