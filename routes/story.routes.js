const express = require("express");
const { getStories, getContinueReading, getFeaturedStories, getRecommendedForYou, getUserStories, getAllStories } = require("../controllers/story.controller");

const router = express.Router();

router.get("/stories/continue-reading", getContinueReading);

router.get("/stories/featured", getFeaturedStories);

router.get("/stories/recommended", getRecommendedForYou);

router.get("/stories/user/:userId", getUserStories);

router.get("/stories/getall", getAllStories);


module.exports = router;
