const mongoose = require("mongoose");

const CartItemsSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product id required"],
  },
  product_name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [5, "Product name is too short"],
  },
  product_image: {
    type: String,
    required: true,
    trim: true,
    required: [true, "Image is required"],
    minlength: [20, " is too short"],
  },
  size: {
    type: Number,
    required: [true, "size is required"],
  },
  color: {
    type: String,
    required: [true, "color is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartItems = mongoose.model("cartItems", CartItemsSchema);

module.exports = CartItems;
