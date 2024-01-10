const express = require("express");
const path = require("path");

const router = express.Router();

const productsController = require('../controllers/product')

router.get("/", productsController.getAllProducts);
router.post("/", productsController.createProduct);
router.get("/:id", productsController.getProductById);

module.exports = router;