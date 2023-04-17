const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");
const CartItems = require("../../models/CartItems");
const Cart = require("../../models/Cart");

const { auth } = require("../../middleware/auth");

// @route   GET /api/v1/cart
// @desc    Get cart info
// @access  Private
router.get("/", auth, async (req, res) => {
  const { user } = req.body;

  try {
    let cart = await Cart.findOne({ user: user._id });
    if (!cart) return res.status(404).json({ msg: "No cart" });
    let total = 0;
    for (let i = 0; i < cart.items.length; i++) {
      cart.items[i] = await CartItems.findById(cart.items[i]);
      total += cart.items[i].quantity * cart.items[i].price;
    }
    return res.status(200).json({ items: cart.items, _id: cart._id, total });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// @route   Post /api/v1/cart
// @desc    Create user's cart
// @access  Private
router.post("/", auth, async (req, res) => {
  const { user } = req.body;

  try {
    const newCart = new Cart({
      user: user._id,
    });
    const savedCart = await newCart.save();
    if (!savedCart)
      return res.status(500).json({ msg: "Internal Server Error" });
    return res.status(200).json({ savedCart });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// @route   Post /api/v1/cart
// @desc    Insert item to cart
// @access  Private
router.post("/insert", auth, async (req, res) => {
  const { user, product_id, size, color, quantity } = req.body;

  try {
    const product = await Product.findById(product_id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    const newCartItem = new CartItems({
      product_id,
      product_name: product.name,
      product_image: product.image,
      size,
      color,
      price: product.price,
      quantity,
    });
    const savedCartItem = await newCartItem.save();
    if (!savedCartItem)
      return res.status(500).json({ msg: "Internal Server Error" });

    const cart = await Cart.findOne({ user: user._id });
    if (!cart) return res.status(404).json({ msg: "No cart" });

    cart.items.push(savedCartItem._id);
    cart.lastUpdated = Date.now();
    const savedCart = await cart.save();

    res.status(201).json({ savedCart });
  } catch (error) {
    console.log(error);

    if (error._message === "cartItems validation failed") {
      const response = {};
      for (const item in error.errors) {
        if (error.errors.hasOwnProperty(item)) {
          if (error.errors[item].name === "ValidatorError") {
            response[item] = error.errors[item].message;
          } else {
            response[item] = "Input is not valid";
          }
        }
      }
      return res.status(400).json(response);
    }
    return res.status(500).json({ error: error.errors });
  }
});

// @route   Put /api/v1/cart
// @desc    Update item in cart
// @access  Private
router.put("/update/:prod_id", auth, async (req, res) => {
  const { user, quantity, size, color } = req.body;
  const { prod_id } = req.params;
  const cartItem = {};
  if (quantity) cartItem["quantity"] = quantity;
  if (size) cartItem["size"] = size;
  if (color) cartItem["color"] = color;

  try {
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) return res.status(404).json({ msg: "No cart" });
    // TODO: Should be tested later 🍓
    if (cart.items.indexOf(prod_id) === -1)
      return res.status(404).json({ msg: `No cart item with id ${prod_id}` });

    const updatedItem = await CartItems.findByIdAndUpdate(prod_id, {
      $set: cartItem,
    });

    return res.status(200).json({ msg: "Cart item updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

// @route   Delete /api/v1/cart
// @desc    Delete item form cart
// @access  Private
router.delete("/delete/:prod_id", auth, async (req, res) => {
  const { prod_id } = req.params;
  const { user } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: user._id },
      { $pull: { items: prod_id } }
    );
    if (!cart) return res.status(404).json({ msg: "No cart" });
    if (cart.items.indexOf(prod_id) === -1)
      return res.status(404).json({ msg: `No cart item with id ${prod_id}` });
    const deletedItem = await CartItems.findOneAndDelete({ _id: prod_id });
    if (!deletedItem)
      return res.status(404).json({ msg: `No cart item with id ${prod_id}` });

    return res.status(200).json({ msg: "cart item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
