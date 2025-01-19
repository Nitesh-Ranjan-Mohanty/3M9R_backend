const express = require("express");
const { getStories, getContinueReading, getFeaturedStories, getRecommendedForYou, getUserStories,
    getAllStories, createStory, addChapter, getChaptersByStoryId, getStoryById, editStory, deleteChapter,
    deleteStory, getChapterByStoryIdAndChapterId, updateChapterByStoryIdAndChapterId
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

router.delete("/stories/:storyId/chapters/:chapterId", deleteChapter);

// Route to delete a story
router.delete("/stories/:storyId", deleteStory);

router.get('/story/:storyId/chapter/:chapterId', getChapterByStoryIdAndChapterId);

// Route to update a chapter by storyId and chapterId
router.put('/story/:storyId/chapter/:chapterId', updateChapterByStoryIdAndChapterId);


module.exports = router;
