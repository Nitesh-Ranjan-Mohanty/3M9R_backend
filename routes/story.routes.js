const express = require("express");
const { getStories, getContinueReading, getFeaturedStories, getRecommendedForYou } = require("../controllers/story.controller");

const router = express.Router();

router.get("/stories", getStories);

router.get("/stories/continue-reading", getContinueReading);

router.get("/stories/featured", getFeaturedStories);

router.get("/stories/recommended", getRecommendedForYou);

module.exports = router;
