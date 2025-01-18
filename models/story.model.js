const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    id: { type: Number, required: false },
    category: { type: String },
    title: { type: String, required: true },
    cover: { type: String, required: false },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
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
        id: { type: Number, required: false },
        title: { type: String, required: false },
        number: { type: Number, required: false },
        readStatus: { type: Boolean, required: false },
        content: { type: String, required: false },
        publishedAt: { type: Date, required: false }
    }],
    isBookmarked: { type: Boolean, default: false },
    isLiked: { type: Boolean, default: false },
    rating: { type: Number, required: true },
    publishedAt: { type: Date, required: true },
    lastUpdated: { type: Date, required: true },
    language: { type: String, required: true },
    maturityRating: { type: String, required: true },
    wordCount: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
