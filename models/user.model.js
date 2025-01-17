//const mongoose = require("mongoose");

//const userSchema = new mongoose.Schema({
//    username: {
//        type: String,
//        required: true,
//        unique: true,
//    },
//    email: {
//        type: String,
//        required: true,
//        unique: true,
//    },
//    password: {
//        type: String,
//        required: true,
//    },
//    // Author-related fields
//    avatar: {
//        type: String,
//        required: true,
//    },
//    bio: {
//        type: String,
//        required: true,
//    },
//    followersCount: {
//        type: Number,
//        default: 0,
//    },
//    booksPublished: {
//        type: Number,
//        default: 0,
//    },
//    totalReads: {
//        type: Number,
//        default: 0,
//    },
//});

//const User = mongoose.model("User", userSchema);

//module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    bio: { type: String, required: true },
    location: { type: String },
    website: { type: String },
    badges: [String],
    stats: {
        storiesRead: { type: Number, default: 0 },
        chaptersCompleted: { type: Number, default: 0 },
        readingStreak: { type: Number, default: 0 },
        totalReadingTime: { type: String, default: '0h' },
        authored: { type: Number, default: 0 },
        totalReads: { type: Number, default: 0 },
        followers: { type: Number, default: 0 },
        following: { type: Number, default: 0 },
        level: { type: Number, default: 0 },
        xp: { type: Number, default: 0 },
    },
    achievements: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
        },
    ],
    interests: [String],
    recentActivity: [
        {
            type: { type: String, required: true },
            story: { type: String, required: true },
            date: { type: Date, required: true },
        },
    ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
