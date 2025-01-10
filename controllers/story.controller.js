const Story = require("../models/story.model");

// Default cover image if not provided
const defaultCoverImage = "https://via.placeholder.com/500x750?text=Lorem+Ipsum";

// Fetch "Continue Reading" stories
const getContinueReading = async (req, res) => {
    try {
        const continueReading = await Story.find({ category: "continue" })
            .populate('author', 'username avatar bio followersCount booksPublished totalReads');  // Populate author details

        res.json({
            title: "Continue Reading",
            stories: continueReading.map(story => ({
                id: story._id,
                title: story.title,
                cover: story.cover || defaultCoverImage,  // Use default image if cover is not available
                author: {
                    id: story.author._id,
                    name: story.author.username,
                    avatar: story.author.avatar || defaultCoverImage,  // Use default avatar if not available
                    bio: story.author.bio,
                    followersCount: story.author.followersCount,
                    booksPublished: story.author.booksPublished,
                    totalReads: story.author.totalReads,
                },
                synopsis: story.synopsis,
                status: story.status,
                genres: story.genres,
                tags: story.tags,
                metrics: {
                    reads: story.metrics.reads,
                    likes: story.metrics.likes,
                    comments: story.metrics.comments,
                    shares: story.metrics.shares,
                },
                chapters: story.chapters.map(chapter => ({
                    id: chapter._id,
                    title: chapter.title,
                    number: chapter.number,
                    readStatus: chapter.readStatus,
                    publishedAt: chapter.publishedAt,
                })),
                isBookmarked: story.isBookmarked,
                isLiked: story.isLiked,
                rating: story.rating,
                publishedAt: story.publishedAt,
                lastUpdated: story.lastUpdated,
                language: story.language,
                maturityRating: story.maturityRating,
                wordCount: story.wordCount,
            })),
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching continue reading stories", error: error.message });
    }
};

// Fetch "Featured Stories"
const getFeaturedStories = async (req, res) => {
    try {
        const featuredStories = await Story.find({ category: "featured" })
            .limit(5)  // Limit to 5 records
            .populate('author', 'username avatar bio followersCount booksPublished totalReads');  // Populate author details

        res.json({
            title: "Featured Stories",
            stories: featuredStories.map(story => ({
                id: story._id,
                title: story.title,
                cover: story.cover || defaultCoverImage,  // Use default image if cover is not available
                author: {
                    id: story.author._id,
                    name: story.author.username?.name,
                    avatar: story.author.avatar || defaultCoverImage,  // Use default avatar if not available
                    bio: story.author.bio,
                    followersCount: story.author.followersCount,
                    booksPublished: story.author.booksPublished,
                    totalReads: story.author.totalReads,
                },
                synopsis: story.synopsis,
                status: story.status,
                genres: story.genres,
                tags: story.tags,
                metrics: {
                    reads: story.metrics.reads,
                    likes: story.metrics.likes,
                    comments: story.metrics.comments,
                    shares: story.metrics.shares,
                },
                chapters: story.chapters.map(chapter => ({
                    id: chapter._id,
                    title: chapter.title,
                    number: chapter.number,
                    readStatus: chapter.readStatus,
                    publishedAt: chapter.publishedAt,
                })),
                isBookmarked: story.isBookmarked,
                isLiked: story.isLiked,
                rating: story.rating,
                publishedAt: story.publishedAt,
                lastUpdated: story.lastUpdated,
                language: story.language,
                maturityRating: story.maturityRating,
                wordCount: story.wordCount,
            })),
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching featured stories", error: error.message });
    }
};

// Fetch "Recommended For You" stories
const getRecommendedForYou = async (req, res) => {
    try {
        const recommendedStories = await Story.find({ category: "recommended" })
            .populate('userId', 'username avatar bio followersCount booksPublished totalReads')  // Populate the `username` from the `User` model
            .exec();

        const response = {
            title: "Recommended For You",
            description: "Personalized picks based on your reading history",
            books: recommendedStories.map(story => ({
                id: story._id,
                title: story.title,
                cover: story.cover || defaultCoverImage,  // Use default image if cover is not available
                author: {
                    id: story.userId._id,
                    name: story.userId.username,
                    avatar: story.userId.avatar || defaultCoverImage,  // Use default avatar if not available
                    bio: story.userId.bio,
                    followersCount: story.userId.followersCount,
                    booksPublished: story.userId.booksPublished,
                    totalReads: story.userId.totalReads,
                },
                synopsis: story.synopsis,
                status: story.status,
                genres: story.genres,
                tags: story.tags,
                metrics: {
                    reads: story.metrics.reads,
                    likes: story.metrics.likes,
                    comments: story.metrics.comments,
                    shares: story.metrics.shares,
                },
                chapters: story.chapters.map(chapter => ({
                    id: chapter._id,
                    title: chapter.title,
                    number: chapter.number,
                    readStatus: chapter.readStatus,
                    publishedAt: chapter.publishedAt,
                })),
                isBookmarked: story.isBookmarked,
                isLiked: story.isLiked,
                rating: story.rating,
                publishedAt: story.publishedAt,
                lastUpdated: story.lastUpdated,
                language: story.language,
                maturityRating: story.maturityRating,
                wordCount: story.wordCount,
            })),
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recommended stories", error: error.message });
    }
};

// Fetch stories written by a specific user
const getUserStories = async (req, res) => {
    try {
        const { userId } = req.params;  // Get the userId from the request params

        // Find stories that belong to the user
        const stories = await Story.find({ userId })
            .populate('author', 'username avatar bio followersCount booksPublished totalReads');  // Populate author details

        if (stories.length === 0) {
            return res.status(404).json({ message: "No stories found for this user" });
        }

        res.status(200).json({
            stories: stories.map(story => ({
                id: story._id,
                title: story.title,
                cover: story.cover || defaultCoverImage,  // Use default image if cover is not available
                author: {
                    id: story.author._id,
                    name: story.author.username?.name,
                    avatar: story.author.avatar || defaultCoverImage,  // Use default avatar if not available
                    bio: story.author.bio,
                    followersCount: story.author.followersCount,
                    booksPublished: story.author.booksPublished,
                    totalReads: story.author.totalReads,
                },
                synopsis: story.synopsis,
                status: story.status,
                genres: story.genres,
                tags: story.tags,
                metrics: {
                    reads: story.metrics.reads,
                    likes: story.metrics.likes,
                    comments: story.metrics.comments,
                    shares: story.metrics.shares,
                },
                chapters: story.chapters.map(chapter => ({
                    id: chapter._id,
                    title: chapter.title,
                    number: chapter.number,
                    readStatus: chapter.readStatus,
                    publishedAt: chapter.publishedAt,
                })),
                isBookmarked: story.isBookmarked,
                isLiked: story.isLiked,
                rating: story.rating,
                publishedAt: story.publishedAt,
                lastUpdated: story.lastUpdated,
                language: story.language,
                maturityRating: story.maturityRating,
                wordCount: story.wordCount,
            }))
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user stories", error: error.message });
    }
};

const getAllStories = async (req, res) => {
    try {
        const stories = await Story.find()
            .populate('author', 'username avatar bio followersCount booksPublished totalReads');  // Populate author details

        if (stories.length === 0) {
            return res.status(404).json({ message: "No stories found" });
        }

        res.status(200).json({
            stories: stories.map(story => ({
                id: story._id,
                title: story.title,
                cover: story.cover || defaultCoverImage,  // Use default image if cover is not available
                author: {
                    id: story.author._id,
                    name: story?.author?.username?.name,
                    avatar: story.author.avatar || defaultCoverImage,  // Use default avatar if not available
                    bio: story.author.bio,
                    followersCount: story.author.followersCount,
                    booksPublished: story.author.booksPublished,
                    totalReads: story.author.totalReads,
                },
                synopsis: story.synopsis,
                status: story.status,
                genres: story.genres,
                tags: story.tags,
                metrics: {
                    reads: story.metrics.reads,
                    likes: story.metrics.likes,
                    comments: story.metrics.comments,
                    shares: story.metrics.shares,
                },
                chapters: story.chapters.map(chapter => ({
                    id: chapter._id,
                    title: chapter.title,
                    number: chapter.number,
                    readStatus: chapter.readStatus,
                    publishedAt: chapter.publishedAt,
                })),
                isBookmarked: story.isBookmarked,
                isLiked: story.isLiked,
                rating: story.rating,
                publishedAt: story.publishedAt,
                lastUpdated: story.lastUpdated,
                language: story.language,
                maturityRating: story.maturityRating,
                wordCount: story.wordCount,
            })),
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stories", error: error.message });
    }
};



// Controller to write a new story
const createStory = async (req, res) => {
    try {
        const {
            id,
            category,
            title,
            cover,
            author,
            synopsis,
            status,
            genres,
            tags,
            metrics,
            chapters,
            rating,
            publishedAt,
            lastUpdated,
            language,
            maturityRating,
            wordCount,
            userId
        } = req.body;

        const newStory = new Story({
            id,
            category,
            title,
            cover,
            author,
            synopsis,
            status,
            genres,
            tags,
            metrics: metrics || {
                reads: 0,
                likes: 0,
                comments: 0,
                shares: 0,
            },
            chapters: chapters || [],
            rating,
            publishedAt: publishedAt || new Date(),
            lastUpdated: lastUpdated || new Date(),
            language,
            maturityRating,
            wordCount,
            userId,
        });

        const savedStory = await newStory.save();
        res.status(201).json({ success: true, story: savedStory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to add a chapter to a story
const addChapter = async (req, res) => {
    try {
        const { storyId } = req.params;
        const { id, title, number, content, readStatus, publishedAt } = req.body;

        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ success: false, message: "Story not found" });
        }

        const newChapter = {
            id,
            title,
            number,
            content,
            readStatus,
            publishedAt: publishedAt || new Date(),
        };

        story.chapters.push(newChapter);
        story.lastUpdated = new Date(); // Update the lastUpdated field

        const updatedStory = await story.save();
        res.status(200).json({ success: true, story: updatedStory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getChaptersByStoryId = async (req, res) => {
    try {
        const { storyId } = req.params;

        // Find the story by ID
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ success: false, message: "Story not found" });
        }

        // Return the chapters of the story
        res.status(200).json({ success: true, chapters: story.chapters });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getContinueReading, getFeaturedStories, getRecommendedForYou, getUserStories,
    getAllStories, addChapter, createStory, getChaptersByStoryId
};
