const express = require("express");

const path = require("path");
// Middlewares
const error = require("../middleware/error");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const products = require("../routes/api/product");
const user = require("../routes/api/user");
const cart = require("../routes/api/cart");
const checkout = require("../routes/api/product");

module.exports = function (app) {
  // Put basic security
  app.use(helmet());
  app.use(helmet.hidePoweredBy({ setTo: "PHP 5.1.6" }));
  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use("/", express.static(path.join(__dirname, "public")));
  app.use(require("morgan")("dev"));
  app.use("/api/v1/products", products);
  app.use("/api/v1/user", user);
  app.use("/api/v1/cart", cart);
  app.use("/api/v1/checkout", checkout);
  app.use(error);
};
