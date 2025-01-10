const Story = require("../models/story.model");


// Fetch "Continue Reading" stories
const getContinueReading = async (req, res) => {
    try {
        const continueReading = await Story.find({ category: "continue" });
        res.json({
            title: "Continue Reading",
            stories: continueReading.map(story => ({
                title: story.title,
                chapter: story.chapter,
                timeAgo: story.timeAgo,
                image: story.image,
            })),
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching continue reading stories", error: error.message });
    }
};

// Fetch "Featured Stories"
const getFeaturedStories = async (req, res) => {
    try {
        const featuredStories = await Story.find({ category: "featured" });
        res.json({
            title: "Featured Stories",
            stories: featuredStories.map(story => ({
                title: story.title,
                author: story.author,
                rating: story.rating,
                image: story.image,
                views: story.views,
                comments: story.comments,
            })),
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching featured stories", error: error.message });
    }
};

// Fetch "Recommended For You" stories

const getRecommendedForYou = async (req, res) => {
    try {
        // Fetch the recommended stories and populate the `author` field using `userId`
        const recommendedStories = await Story.find({ category: "recommended" })
            .populate('userId', 'username')  // Populate the `username` from the `User` model
            .exec();

        // Map the recommended stories to the response format
        const response = {
            title: "Recommend For You",
            description: "Personalized picks based on your reading history",
            books: recommendedStories.map(story => ({
                title: story.title,
                author: story.userId.username,  // Access the `username` from the populated `userId`
                image: story.image,
            })),
        };

        // Send the response
        res.json(response);
    } catch (error) {
        // Handle error
        res.status(500).json({ message: "Error fetching recommended stories", error: error.message });
    }
};


// Fetch stories written by a specific user
const getUserStories = async (req, res) => {
    try {
        const { userId } = req.params;  // Get the userId from the request params

        // Find stories that belong to the user
        const stories = await Story.find({ userId });

        if (stories.length === 0) {
            return res.status(404).json({ message: "No stories found for this user" });
        }

        res.status(200).json({ stories });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user stories", error: error.message });
    }
};

module.exports = { getContinueReading, getFeaturedStories, getRecommendedForYou, getUserStories };
