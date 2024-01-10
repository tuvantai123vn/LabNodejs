const express = require("express");

const router = express.Router();

const adminController = require('../controllers/admin')

// router.get("/cart", productsController.getProduct);
router.patch("/:id", adminController.postEditProduct);
router.delete("/:id", adminController.deleteProductById);



module.exports = router;