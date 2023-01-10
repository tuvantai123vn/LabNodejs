const express = require("express");
const router = express.Router();
const movieController = require("../controller/movie");

router.get("/trending", movieController.getTrendingMovie);

router.get("/top-rate", movieController.getRatingMovie);

router.get("/discover", movieController.getMovieByGenre);

router.get("/discover/tv", movieController.getMovieByMediatype);

router.get("/search", movieController.getMovieByKeyword);

router.post("/video", movieController.postTrailer);

module.exports = router;
