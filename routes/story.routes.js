const express = require("express");
const { getStories, getContinueReading, getFeaturedStories } = require("../controllers/story.controller");

const router = express.Router();

router.get("/stories", getStories);

router.get("/stories/continue-reading", getContinueReading);

router.get("/stories/featured", getFeaturedStories);

module.exports = router;
