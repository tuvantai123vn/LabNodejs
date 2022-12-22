const express = require("express");
const path = require("path");

const router = express.Router();

const productsController = require('../controllers/product')

router.get("/", productsController.getProduct);



module.exports = router;