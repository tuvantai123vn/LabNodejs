const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.post("/checkout", orderController.checkout);
router.get("/", orderController.getOrders);

module.exports = router;
