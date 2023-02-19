const express = require('express');

const router = express.Router();
const controllers = require("../controllers/room");


router.get("/GET/room", controllers.getRoom);

module.exports = router;