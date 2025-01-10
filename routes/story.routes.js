const express = require("express");
const { getStories, getContinueReading } = require("../controllers/story.controller");

const router = express.Router();

router.get("/stories", getStories);

router.get("/stories/continue-reading", getContinueReading);

module.exports = router;
