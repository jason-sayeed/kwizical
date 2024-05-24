const express = require("express");
const router = express.Router();

const MusicController = require("../controllers/music");

router.get("/genre", MusicController.getGenres);
router.get("/genre/:id/artists", MusicController.getArtistsForGenre);
router.get("/artist/:id/top", MusicController.getTopTracksForArtist);
router.get("/track/:id", MusicController.getTrack);
router.get("/artist/:id/albums", MusicController.getAlbumsForArtist);

module.exports = router;
