const Story = require("../models/story.model");

// Default cover image if not provided
const defaultCoverImage = "https://picsum.photos/200/300/?blur";

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
                    content: chapter?.content
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
                    content: chapter?.content
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
                    content: chapter?.content
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
                    content: chapter?.content
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
                    content: chapter?.content
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

const getStoryById = async (req, res) => {
    try {
        const { story_id } = req.params; // Extract story_id from route parameters

        const story = await Story.findById(story_id)
            .populate('author', 'username avatar bio followersCount booksPublished totalReads')  // Populate author details
            .populate('chapters'); // Populate chapters if needed

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.status(200).json({
            id: story._id,
            title: story.title,
            cover: story.cover || defaultCoverImage, // Use default image if cover is not available
            author: {
                id: story.author._id,
                name: story.author?.username,
                avatar: story.author.avatar || defaultAvatarImage, // Use default avatar if not available
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
                reads: story.metrics?.reads,
                likes: story.metrics?.likes,
                comments: story.metrics?.comments,
                shares: story.metrics?.shares,
            },
            chapters: story.chapters.map(chapter => ({
                id: chapter._id,
                title: chapter.title,
                number: chapter.number,
                readStatus: chapter.readStatus,
                publishedAt: chapter.publishedAt,
                content: chapter?.content
            })),
            isBookmarked: story.isBookmarked,
            isLiked: story.isLiked,
            rating: story.rating,
            publishedAt: story.publishedAt,
            lastUpdated: story.lastUpdated,
            language: story.language,
            maturityRating: story.maturityRating,
            wordCount: story.wordCount,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching story", error: error.message });
    }
};


// Controller to write a new story
const createStory = async (req, res) => {
    try {
        const {
            category,
            title,
            cover,
            author,
            synopsis,
            status,
            genres,
            tags,
            language,
            maturityRating,
            wordCount,
            userId
        } = req.body;

        const newStory = new Story({
            category,
            title,
            cover,
            author,
            synopsis,
            status,
            genres,
            tags,
            metrics:{
                reads: 0,
                likes: 0,
                comments: 0,
                shares: 0,
            },
            chapters: [],
            rating:0,
            publishedAt: new Date(),
            lastUpdated: new Date(),
            language,
            maturityRating,
            wordCount: wordCount || 0,
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
        const {title, content } = req.body;

        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ success: false, message: "Story not found" });
        }

        const newChapter = {
            title,
            number:0,
            content,
            readStatus:0,
            publishedAt: new Date(),
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

// Controller to edit a story
const editStory = async (req, res) => {
    const { storyId } = req.params;
    const updates = req.body;

    try {
        // Find the story by ID and update with new data
        const story = await Story.findByIdAndUpdate(
            storyId,
            updates,
            { new: true, runValidators: true } // Returns the updated document
        );

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.status(200).json({
            message: "Story updated successfully",
            story,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update story",
            error: error.message,
        });
    }
};

// Delete Chapter Controller
const deleteChapter = async (req, res) => {
    const { storyId, chapterId } = req.params;

    try {
        // Find the story by ID
        const story = await Story.findById(storyId);

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        // Find the chapter index
        const chapterIndex = story.chapters.findIndex(
            (chapter) => chapter?._id?.equals(chapterId?.trim())
        );
        console.log(chapterIndex,chapterId)
        if (chapterIndex === -1) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        // Remove the chapter from the chapters array
        story.chapters.splice(chapterIndex, 1);

        // Save the updated story
        await story.save();

        res.status(200).json({ message: "Chapter deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// Delete Story Controller
const deleteStory = async (req, res) => {
    const { storyId } = req.params;

    try {
        // Find and delete the story by ID
        const story = await Story.findByIdAndDelete(storyId);

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.status(200).json({ message: "Story deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

module.exports = {
    getContinueReading, getFeaturedStories, getRecommendedForYou, getUserStories,
    getAllStories, addChapter, createStory, getChaptersByStoryId, getStoryById,
    editStory, deleteChapter, deleteStory
};
