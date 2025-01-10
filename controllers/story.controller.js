const Story = require("../models/story.model");

const getStories = async (req, res) => {
    try {
        // Fetch data for the respective categories
        const featuredStories = await Story.find({ category: "featured" });
        const continueReading = await Story.find({ category: "continue" });
        const recommendedForYou = await Story.find({ category: "recommended" });

        // Format response
        res.json({
            featuredStories: {
                title: "Featured Stories",
                stories: featuredStories.map(story => ({
                    title: story.title,
                    author: story.author,
                    rating: story.rating,
                    image: story.image,
                    views: story.views,
                    comments: story.comments,
                })),
            },
            continueReading: {
                title: "Continue Reading",
                stories: continueReading.map(story => ({
                    title: story.title,
                    chapter: story.chapter,
                    timeAgo: story.timeAgo,
                    image: story.image,
                })),
            },
            recommendedForYou: {
                title: "Recommend For You",
                description: "Personalized picks based on your reading history",
                books: recommendedForYou.map(story => ({
                    title: story.title,
                    author: story.author,
                    image: story.image,
                })),
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stories", error: error.message });
    }
};

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
        const recommendedStories = await Story.find({ category: "recommended" });
        res.json({
            title: "Recommend For You",
            description: "Personalized picks based on your reading history",
            books: recommendedStories.map(story => ({
                title: story.title,
                author: story.author,
                image: story.image,
            })),
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching recommended stories", error: error.message });
    }
};


module.exports = { getStories, getContinueReading, getFeaturedStories, getRecommendedForYou };
