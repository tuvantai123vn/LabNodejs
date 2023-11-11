const express = require("express");
const path = require("path");

const router = express.Router();

const productsController = require('../controllers/product')

router.get("/", productsController.getProduct);
router.post("/add-product", productsController.postAddProduct);



module.exports = router;