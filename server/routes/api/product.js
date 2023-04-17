const express = require("express");
const router = express.Router();
const path = require("path");

const { isAdmin } = require("../../middleware/auth");

const Product = require("../../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length !== 0) return res.status(200).json(products);
    return res.status(404).json({ msg: "No products found" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/find", async (req, res) => {
  const { q } = req.query;
  const query = q ? { name: { $regex: new RegExp(q) } } : {};
  try {
    const products = await Product.find(query);
    console.log(products);
    if (products.length !== 0) return res.status(200).json(products);
    return res.status(404).json({ msg: "No products found" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/insert", isAdmin, async (req, res) => {
  const { product } = req.body;

  if (product.image) {
    product["image"] = path.join("images", "productImages", product.image);
  }
  try {
    const newProd = new Product(product);
    const savedProd = await newProd.save();
    res.status(201).json(savedProd);
  } catch (error) {
    console.log(error);

    if (error._message === "Product validation failed") {
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
router.put("/update/:prod_id", isAdmin, async (req, res) => {
  const { product } = req.body;
  const { prod_id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(prod_id, product);
    if (!updatedProduct)
      return res.status(404).json({ msg: `No product with id ${prod_id}` });
    return res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.json(Object.keys(error));
  }
  res.send(`Update Product id: ${req.params.prod_id} 😄`);
});
router.delete("/delete/:prod_id", isAdmin, async (req, res) => {
  const { prod_id } = req.params;
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: prod_id });
    if (!deletedProduct)
      return res.status(404).json({ msg: `No product with id ${prod_id}` });

    return res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});
router.get("/best-seller", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length !== 0)
      return res.status(200).json({ products: products.slice(0, 3) });
    return res.status(404).json({ msg: "No products found" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/:prod_id", async (req, res) => {
  const { prod_id } = req.params;
  try {
    const product = await Product.findById(prod_id);
    if (product) return res.status(200).json(product);
    return res.status(404).json({ msg: "No product found" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
