const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    image: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    chapter: {
        type: Number,
    },
    timeAgo: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

module.exports = mongoose.model("Story", storySchema);
