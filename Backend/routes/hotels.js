const express = require("express");

const router = express.Router();
const controllers = require("../controllers/hotel");

router.post("/", controllers.createHotel);

router.put("/:id", controllers.editHotel);

router.delete("/:id", controllers.deleteHotel);

router.get("/:id", controllers.getById);

router.get("/", controllers.getAll);

router.get("/GET/KV", controllers.KV);

router.get("/GET/rating", controllers.ratingHotel);

router.get("/GET/type", controllers.slhotel);

module.exports = router;
