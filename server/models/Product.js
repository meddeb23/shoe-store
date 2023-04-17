const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [5, "Product name is too short"],
  },
  image: {
    type: String,
    required: true,
    trim: true,
    required: [true, "Image is required"],
    minlength: [20, " is too short"],
  },
  colors: {
    type: [String],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: (props) => `Colors should not be empty`,
    },
  },
  size: {
    type: [Number],
    required: true,
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: (props) => `Sizes should not be empty`,
    },
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  update_at: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
