const express = require("express");

const router = express.Router();

const productsController = require('../controllers/admin')

// router.get("/cart", productsController.getProduct);
router.patch("/edit-product/:productTitle", productsController.editProduct);



module.exports = router;