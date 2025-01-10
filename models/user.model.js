const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Author-related fields
    avatar: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    followersCount: {
        type: Number,
        default: 0,
    },
    booksPublished: {
        type: Number,
        default: 0,
    },
    totalReads: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
