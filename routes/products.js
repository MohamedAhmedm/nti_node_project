const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");

//get all products
// router.get(`/`, async (req, res) => {
//   const productList = await Product.find();

//   if (!productList) {
//     res.status(404).json({ success: false });
//   }
//   res.send(productList);
// });
router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.params.categories) {
    filter = { categories: req.params.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});
router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({ success: false });
  }
  res.send(product);
});

//create a new product
router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    res
      .status(404)
      .json({ success: false, message: "the category was not found" });
  }
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();
  if (!product) {
    res
      .status(404)
      .json({ success: false, message: "The product cannot be created" });
  }
});

//update product
router.put(`/:id`, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) {
    res
      .status(400)
      .json({ success: false, message: "the category was not found" });
  }
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );
  if (!product) {
    res
      .status(404)
      .json({ success: false, message: "the product was not updated" });
  }
  res.send(product);
});

//delete product
router.delete("/:id", async (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is deleted!" });
      }
    })
    .catch((err) => {
      res.status(404).json({
        error: err,
        success: false,
      });
    });
});

router.get("/get/count", async (req, res) => {
  const count = await Product.countDocuments();
  res.send({ productsCount:count });
});

//   const count = await Product.countDocuments();
//   res.send(count);
// });
router.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  productFeatured = await Product.find({ isFeatured: true }).limit(+count);

  if (!productFeatured) {
    res.status(404).json({ success: false });
  }
  res.send(productFeatured);
});

module.exports = router;
