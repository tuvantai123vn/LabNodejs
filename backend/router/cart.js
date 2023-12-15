const express = require("express");

const router = express.Router();

const cartController = require('../controllers/cart')

router.get("/getcart", cartController.getCart);
router.post("/add-cart", cartController.addToCart);
router.delete('/remove-cart/:productId', cartController.removeFromCart);


module.exports = router;