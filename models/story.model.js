const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    synopsis: { type: String, required: true },
    status: { type: String, required: true },
    genres: [String],
    tags: [String],
    metrics: {
        reads: { type: Number, required: true },
        likes: { type: Number, required: true },
        comments: { type: Number, required: true },
        shares: { type: Number, required: true }
    },
    chapters: [{
        id: { type: Number, required: true },
        title: { type: String, required: true },
        number: { type: Number, required: true },
        readStatus: { type: Boolean, required: true },
        publishedAt: { type: Date, required: true }
    }],
    isBookmarked: { type: Boolean, default: false },
    isLiked: { type: Boolean, default: false },
    rating: { type: Number, required: true },
    publishedAt: { type: Date, required: true },
    lastUpdated: { type: Date, required: true },
    language: { type: String, required: true },
    maturityRating: { type: String, required: true },
    wordCount: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
