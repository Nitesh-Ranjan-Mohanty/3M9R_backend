const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Story = require("./models/story.model");

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");

        // Clear the existing data (optional)
        await Story.deleteMany({});
        console.log("Existing data cleared");

        // Dummy data
        const stories = [
            {
                title: "The Dragon's Legacy",
                author: "Sarah Mitchell",
                rating: 4.6,
                image: "dragon_legacy.jpg",
                views: 49864,
                comments: 308,
                category: "featured",
            },
            {
                title: "Echoes of Tomorrow",
                author: "Sarah Mitchell",
                rating: 4.3,
                image: "space_shuttle.jpg",
                category: "featured",
            },
            {
                title: "The Last Spellweaver",
                author: "Sarah Mitchell",
                rating: 4.1,
                image: "spellweaver.jpg",
                category: "featured",
            },
            {
                title: "Quantum Dreams",
                author: "Sarah Mitchell",
                rating: 4.9,
                image: "space_galaxy.jpg",
                category: "featured",
            },
            {
                title: "The Midnight Garden",
                author: "James Walker",
                rating: 4.9,
                image: "midnight_garden.jpg",
                category: "featured",
            },
            {
                title: "The Dragon's Legacy",
                chapter: 2,
                timeAgo: "3d ago",
                image: "dragon_legacy_image.jpg",
                category: "continue",
            },
            {
                title: "The Last Spellweaver",
                chapter: 5,
                timeAgo: "5d ago",
                image: "spellweaver_image.jpg",
                category: "continue",
            },
            {
                title: "The Alchemist's Path",
                author: "Emily Chen",
                image: "alchemists_path.jpg",
                category: "recommended",
            },
            {
                title: "Digital Horizons",
                author: "Emily Chen",
                image: "digital_horizons.jpg",
                category: "recommended",
            },
            {
                title: "The Crystal Prophecy",
                author: "Marcus Reid",
                image: "crystal_prophecy.jpg",
                category: "recommended",
            },
            {
                title: "Neon Twilight",
                author: "Marcus Reid",
                image: "neon_twilight.jpg",
                category: "recommended",
            },
        ];

        // Insert dummy data
        await Story.insertMany(stories);
        console.log("Dummy data inserted");

        // Close the connection
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    } catch (error) {
        console.error("Error seeding data:", error.message);
        process.exit(1);
    }
};

// Run the seed function
seedData();
