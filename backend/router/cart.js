const express = require("express");

const router = express.Router();

const productsController = require('../controllers/cart')

router.get("/getcart", productsController.getCart);
router.post("/add-cart", productsController.addToCart);



module.exports = router;