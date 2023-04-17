const express = require("express");
const { auth } = require("../../middleware/auth");
const Cart = require("../../models/Cart");
const CartItems = require("../../models/CartItems");
const router = express.Router();
const Order = require("../../models/Order");

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

// @route   GET /api/v1/checkout
// @desc    checkout
// @access  Private
router.post("/pay", auth, async (req, res) => {
  console.log("stripe-routes.js 10 | req body", req.body);
  let { user, amount, id, orders, purchase_methode } = req.body;
  if (amount < 0) throw Error("Unvalide amount");
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    // Handle payment with stripe
    if (purchase_methode === stripe && id) {
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "Your Company Description",
        payment_method: id,
        confirm: true,
      });
      console.log("stripe-routes.js 19 | payment", payment);
    }

    let savedOrders = [];
    let cart = await Cart.findOne({ user: user._id });

    orders.forEach(async (order) => {
      const newOrder = new Order({
        user: user._id,
        item: order._id,
        purchase_methode,
      });
      const savedOrder = await newOrder.save();
      await CartItems.findByIdAndDelete(order._id);
      cart.items = cart.items.filter((item) => item != order._id);
      await cart.save();

      savedOrders.push(savedOrder);
    });
    return res.json({
      message: "Payment Successful",
      success: true,
      savedOrders,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});
router.get("/order", auth, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.body.user });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});
router.get("/order/:_id", auth, async (req, res, next) => {
  const { _id } = req.params;
  try {
    const orders = await Order.findOne({ user: req.body.user._id, _id });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
