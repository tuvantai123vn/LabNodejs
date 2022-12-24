const express = require("express");
const path = require("path");

const productsController = require('../controllers/product')
const router = express.Router();

router.get("/products", productsController.getProduct);

router.post("/add-product",productsController.postAddProduct);

module.exports = router;