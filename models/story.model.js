const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    title: String,
    author: String,
    rating: Number,
    image: String,
    views: Number,
    comments: Number,
    chapter: Number,
    timeAgo: String,
    category: String,
});

module.exports = mongoose.model("Story", storySchema);
