const express = require('express');

const router = express.Router();
const controllers = require("../controllers/search");

router.post("/Get/search", controllers.search);

module.exports = router;