const express = require("express");

const router = express.Router();

const productsController = require('../controllers/cart')

// router.get("/cart", productsController.getProduct);
router.post("/add-cart", productsController.addToCart);



module.exports = router;