const express = require("express");
const path = require("path");

const router = express.Router();

const productsController = require('../controllers/product')

// router.get("/products", productsController.getProduct);
// router.post("/add-products", productsController.postAddProduct);
// router.get("/products/:title", productsController.getProductByTitle);



module.exports = router;