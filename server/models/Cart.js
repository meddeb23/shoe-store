const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    unique: [true, "This user already have a cart"],
    required: [true, 'user id required'],
  },
  items:{
    type: [{type:mongoose.Schema.Types.ObjectId, ref: 'cartItems'}],
  },
  lastUpdated:{
    type: Date,
    default: Date.now()
  },

});

const Cart = mongoose.model("cart", CartSchema);

module.exports = Cart;
