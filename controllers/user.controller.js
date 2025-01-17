const User = require("../models/user.model");
const Story = require("../models/story.model");

const getUserData = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch user data
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch authored stories
        const stories = await Story.find({ author: userId }).select(
            "title metrics.reads metrics.likes metrics.comments metrics.shares"
        );

        // Dynamically calculate authored stories count
        const authoredCount = stories.length;

        // Prepare response
        const userData = {
            id: user._id,
            username: user.username,
            avatar: user.avatar,
            bio: user.bio,
            location: user.location,
            website: user.website,
            badges: user.badges,
            stats: {
                ...user.stats,
                authored: authoredCount, // Update authored count
            },
            achievements: user.achievements,
            interests: user.interests,
            recentActivity: user.recentActivity,
            authoredStories: stories.map((story) => ({
                id: story._id,
                title: story.title,
                metrics: story.metrics,
            })),
        };

        res.status(200).json(userData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getUserData };
