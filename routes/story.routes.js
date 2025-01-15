const express = require("express");
const { getStories, getContinueReading, getFeaturedStories, getRecommendedForYou, getUserStories,
    getAllStories, createStory, addChapter, getChaptersByStoryId, getStoryById, editStory
    } = require("../controllers/story.controller");

const router = express.Router();

router.get("/stories/continue-reading", getContinueReading);

router.get("/stories/featured", getFeaturedStories);

router.get("/stories/recommended", getRecommendedForYou);

router.get("/stories/user/:userId", getUserStories);

router.get("/stories/getall", getAllStories);

router.post("/stories", createStory);

router.post("/stories/:storyId/chapters", addChapter);
// Route to get chapters by story ID
router.get("/stories/:storyId/chapters", getChaptersByStoryId);

router.get('/story/:story_id', getStoryById);

router.put("/stories/:storyId", editStory);

module.exports = router;
