const express = require("express");
const router = express.Router();

const homeController = require('../controllers/home.controller');

router.get('/', homeController.getVideos);
router.get('/moreVideos/:nextPage/:search', homeController.moreVideos);
router.get('/watch', homeController.watchVideo);
router.get('/search', homeController.searchVideos);

module.exports = { router };
