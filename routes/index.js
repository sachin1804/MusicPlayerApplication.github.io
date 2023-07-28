const express = require('express');
const router = express.Router();
const Song = require('../models/song');
const songController = require("../controllers/song_controller");
const homeController = require("../controllers/home_controller");
const playlistController = require("../controllers/playlist_controller");
const tracksController = require("../controllers/tracks_controller");
const searchResultsController = require("../controllers/search_results_controller");
const newReleaseController = require("../controllers/new_release_controller");

router.get('/', homeController.home);
router.use('/users', require("./users"));
router.get('/playlist', playlistController.getPlaylist);
router.get('/tracks', tracksController.getTracks);
router.get('/search-results', searchResultsController.searchResults);
router.get('/get-tracks', tracksController.getTracks);
router.get('/new-release-tracks', newReleaseController.newRelease);


module.exports = router;