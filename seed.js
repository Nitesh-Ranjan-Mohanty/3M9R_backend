const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user.model");
const Story = require("./models/story.model");

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");

        // Clear the existing data (optional)
        await User.deleteMany({});
        await Story.deleteMany({});
        console.log("Existing data cleared");

        // Create dummy users (Authors)
        const dummyUsers = [
            {
                username: "sarah_mitchell",
                email: "sarah@example.com",
                password: "password123", // No encryption for dev purposes
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                bio: "Award-winning author with a passion for creating immersive worlds and unforgettable characters.",
                followersCount: 26298,
                booksPublished: 10,
                totalReads: 1220349,
            },
            {
                username: "john_doe",
                email: "john@example.com",
                password: "password123", // No encryption for dev purposes
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                bio: "A science fiction author who explores the boundaries of technology and humanity.",
                followersCount: 10500,
                booksPublished: 5,
                totalReads: 500000,
            },
        ];

        // Insert dummy users
        const insertedUsers = await User.insertMany(dummyUsers);
        console.log("Dummy users inserted");

        // Dummy userId from the inserted users
        const dummyUserId1 = insertedUsers[0]._id; // First user (Sarah Mitchell)
        const dummyUserId2 = insertedUsers[1]._id; // Second user (John Doe)

        // Dummy data for stories
        const stories = [
            {
                id: 1,
                title: "The Dragon's Legacy",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId1, // Using ObjectId for author
                synopsis: "An epic tale of adventure, mystery, and discovery that will keep you on the edge of your seat until the very last page.",
                status: "completed",
                genres: ["Mystery", "Fantasy", "Contemporary"],
                tags: ["Epic", "Mystery", "Adventure", "Magic"],
                metrics: {
                    reads: 56265,
                    likes: 3724,
                    comments: 972,
                    shares: 444,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: false, publishedAt: "2024-09-19T07:52:21.904Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: true, publishedAt: "2024-10-24T08:55:46.271Z" },
                    { id: 3, title: "Chapter 3", number: 3, readStatus: false, publishedAt: "2024-11-25T12:32:26.035Z" },
                    { id: 4, title: "Chapter 4", number: 4, readStatus: true, publishedAt: "2024-12-29T23:45:59.846Z" },
                    { id: 5, title: "Chapter 5", number: 5, readStatus: true, publishedAt: "2024-10-16T15:34:13.931Z" },
                    { id: 6, title: "Chapter 6", number: 6, readStatus: false, publishedAt: "2024-09-16T15:07:37.198Z" },
                    { id: 7, title: "Chapter 7", number: 7, readStatus: true, publishedAt: "2024-12-13T20:59:14.210Z" },
                ],
                isBookmarked: false,
                isLiked: false,
                rating: 4.435433775587903,
                publishedAt: "2024-12-15T15:33:13.889Z",
                lastUpdated: "2024-12-30T14:34:43.868Z",
                language: "English",
                maturityRating: "Teen",
                wordCount: 55916,
                userId: dummyUserId1, // Assign the dummy user ID
                category: "featured"
            },
            {
                id: 2,
                title: "Echoes of Tomorrow",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId2, // Using ObjectId for author
                synopsis: "A futuristic tale set in a world where time travel is possible, and the stakes are incredibly high.",
                status: "ongoing",
                genres: ["Science Fiction", "Adventure"],
                tags: ["Time Travel", "Adventure", "Technology"],
                metrics: {
                    reads: 25000,
                    likes: 1100,
                    comments: 500,
                    shares: 120,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-01-15T10:00:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-02-20T12:00:00.000Z" },
                ],
                isBookmarked: true,
                isLiked: true,
                rating: 4.2,
                publishedAt: "2024-01-15T10:00:00.000Z",
                lastUpdated: "2024-02-15T15:00:00.000Z",
                language: "English",
                maturityRating: "Adult",
                wordCount: 35000,
                userId: dummyUserId2, // Assign the dummy user ID
                category: "featured"
            },
            {
                id: 3,
                title: "Whispers in the Void",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId1,
                synopsis: "A suspense-filled exploration of the unknown in the depths of space.",
                status: "completed",
                genres: ["Sci-Fi", "Suspense", "Thriller"],
                tags: ["Space", "Thriller", "Suspense", "Exploration"],
                metrics: {
                    reads: 85000,
                    likes: 3500,
                    comments: 1200,
                    shares: 500,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: false, publishedAt: "2024-03-21T10:00:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: true, publishedAt: "2024-04-15T11:45:00.000Z" },
                ],
                isBookmarked: false,
                isLiked: true,
                rating: 4.6,
                publishedAt: "2024-03-21T10:00:00.000Z",
                lastUpdated: "2024-05-02T16:30:00.000Z",
                language: "English",
                maturityRating: "Teen",
                wordCount: 42000,
                userId: dummyUserId1,
                category: "featured"
            },
            {
                id: 4,
                title: "The Eternal War",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId2,
                synopsis: "A high-stakes war between two civilizations on the brink of annihilation.",
                status: "ongoing",
                genres: ["Fantasy", "War", "Adventure"],
                tags: ["War", "Adventure", "Fantasy", "Battle"],
                metrics: {
                    reads: 123000,
                    likes: 9800,
                    comments: 3500,
                    shares: 800,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-06-01T08:00:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-06-15T09:30:00.000Z" },
                ],
                isBookmarked: true,
                isLiked: true,
                rating: 4.8,
                publishedAt: "2024-06-01T08:00:00.000Z",
                lastUpdated: "2024-06-16T15:30:00.000Z",
                language: "English",
                maturityRating: "Adult",
                wordCount: 75000,
                userId: dummyUserId2,
                category: "featured"
            },
            {
                id: 5,
                title: "The Lost Kingdom",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId1,
                synopsis: "An ancient kingdom's secrets are unveiled through a journey of epic discovery and forgotten lore.",
                status: "completed",
                genres: ["Historical", "Adventure", "Fantasy"],
                tags: ["Ancient", "Mystery", "Adventure", "Discovery"],
                metrics: {
                    reads: 102000,
                    likes: 7300,
                    comments: 1500,
                    shares: 600,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-07-15T10:00:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-07-30T12:30:00.000Z" },
                ],
                isBookmarked: false,
                isLiked: true,
                rating: 4.9,
                publishedAt: "2024-07-15T10:00:00.000Z",
                lastUpdated: "2024-08-05T16:00:00.000Z",
                language: "English",
                maturityRating: "Teen",
                wordCount: 80000,
                userId: dummyUserId1,
                category: "featured"
            },
            {
                id: 6,
                title: "Whispers of the Past",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId2,
                synopsis: "A gripping tale of time and memory, where a mysterious artifact uncovers long-lost secrets.",
                status: "completed",
                genres: ["Mystery", "Fantasy", "Historical"],
                tags: ["Memory", "Time", "Mystery", "Secrets"],
                metrics: {
                    reads: 41200,
                    likes: 2900,
                    comments: 800,
                    shares: 320,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-05-10T08:00:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-05-25T11:00:00.000Z" },
                ],
                isBookmarked: false,
                isLiked: true,
                rating: 4.4,
                publishedAt: "2024-05-10T08:00:00.000Z",
                lastUpdated: "2024-06-01T14:30:00.000Z",
                language: "English",
                maturityRating: "Teen",
                wordCount: 45000,
                userId: dummyUserId2,
                category: "recommended"
            },
            {
                id: 7,
                title: "Fate's Gambit",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId4,
                synopsis: "In a world where fate can be controlled, a young woman battles destiny for her freedom.",
                status: "ongoing",
                genres: ["Fantasy", "Adventure"],
                tags: ["Fate", "Freedom", "Magic", "Adventure"],
                metrics: {
                    reads: 60500,
                    likes: 4200,
                    comments: 1400,
                    shares: 520,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-02-15T09:30:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-03-01T12:00:00.000Z" },
                ],
                isBookmarked: true,
                isLiked: false,
                rating: 4.5,
                publishedAt: "2024-02-15T09:30:00.000Z",
                lastUpdated: "2024-03-15T16:45:00.000Z",
                language: "English",
                maturityRating: "Teen",
                wordCount: 38000,
                userId: dummyUserId4,
                category: "recommended"
            },
            {
                id: 8,
                title: "Through the Shattered Sky",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId2,
                synopsis: "A dangerous journey through a war-torn world where hope is as fragile as the sky.",
                status: "completed",
                genres: ["Sci-Fi", "Action", "Drama"],
                tags: ["Hope", "Survival", "War", "Action"],
                metrics: {
                    reads: 71000,
                    likes: 5000,
                    comments: 2200,
                    shares: 670,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-03-01T13:00:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-03-15T14:30:00.000Z" },
                ],
                isBookmarked: true,
                isLiked: true,
                rating: 4.3,
                publishedAt: "2024-03-01T13:00:00.000Z",
                lastUpdated: "2024-04-01T18:30:00.000Z",
                language: "English",
                maturityRating: "Adult",
                wordCount: 62000,
                userId: dummyUserId2,
                category: "recommended"
            },
            {
                id: 9,
                title: "Into the Abyss",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId2,
                synopsis: "A deep-sea exploration leads to unimaginable discoveries beneath the ocean's surface.",
                status: "ongoing",
                genres: ["Adventure", "Thriller", "Sci-Fi"],
                tags: ["Ocean", "Discovery", "Thriller", "Exploration"],
                metrics: {
                    reads: 34000,
                    likes: 2100,
                    comments: 900,
                    shares: 330,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-01-01T10:00:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-01-15T11:30:00.000Z" },
                ],
                isBookmarked: false,
                isLiked: false,
                rating: 4.1,
                publishedAt: "2024-01-01T10:00:00.000Z",
                lastUpdated: "2024-02-01T13:30:00.000Z",
                language: "English",
                maturityRating: "Teen",
                wordCount: 52000,
                userId: dummyUserId2,
                category: "recommended"
            },
            {
                id: 10,
                title: "The Phoenix War",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId7,
                synopsis: "A legend of an ancient war reborn in the modern world, threatening to destroy everything.",
                status: "completed",
                genres: ["Fantasy", "Action", "Adventure"],
                tags: ["War", "Fantasy", "Legend", "Rebirth"],
                metrics: {
                    reads: 91000,
                    likes: 6100,
                    comments: 2500,
                    shares: 890,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-06-01T10:00:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-06-10T12:00:00.000Z" },
                ],
                isBookmarked: true,
                isLiked: true,
                rating: 4.7,
                publishedAt: "2024-06-01T10:00:00.000Z",
                lastUpdated: "2024-06-15T17:00:00.000Z",
                language: "English",
                maturityRating: "Adult",
                wordCount: 70000,
                userId: dummyUserId7,
                category: "recommended"
            },
            {
                id: 11,
                title: "Moonlit Journey",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId2,
                synopsis: "A romantic adventure across the stars, filled with mystery and cosmic magic.",
                status: "ongoing",
                genres: ["Romance", "Sci-Fi", "Adventure"],
                tags: ["Romance", "Adventure", "Space", "Cosmic"],
                metrics: {
                    reads: 50000,
                    likes: 3300,
                    comments: 1100,
                    shares: 450,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-04-01T11:00:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-04-15T13:30:00.000Z" },
                ],
                isBookmarked: false,
                isLiked: true,
                rating: 4.2,
                publishedAt: "2024-04-01T11:00:00.000Z",
                lastUpdated: "2024-04-25T18:00:00.000Z",
                language: "English",
                maturityRating: "Teen",
                wordCount: 49000,
                userId: dummyUserId2,
                category: "recommended"
            },
            {
                id: 12,
                title: "The Silent Echo",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId2,
                synopsis: "A story of silence and sound, where one voice could alter the course of fate.",
                status: "completed",
                genres: ["Thriller", "Mystery", "Drama"],
                tags: ["Mystery", "Thriller", "Fate", "Silence"],
                metrics: {
                    reads: 83000,
                    likes: 5700,
                    comments: 1900,
                    shares: 680,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-03-20T08:30:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-04-10T10:00:00.000Z" },
                ],
                isBookmarked: true,
                isLiked: false,
                rating: 4.4,
                publishedAt: "2024-03-20T08:30:00.000Z",
                lastUpdated: "2024-04-05T15:30:00.000Z",
                language: "English",
                maturityRating: "Teen",
                wordCount: 63000,
                userId: dummyUserId2,
                category: "recommended"
            },
            {
                id: 13,
                title: "Endless Horizon",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId2,
                synopsis: "A seafaring expedition across the world’s most dangerous waters to find the lost city of Atlantis.",
                status: "ongoing",
                genres: ["Adventure", "Mystery", "Fantasy"],
                tags: ["Atlantis", "Adventure", "Expedition", "Seafaring"],
                metrics: {
                    reads: 90000,
                    likes: 6300,
                    comments: 2500,
                    shares: 900,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-05-10T07:00:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-05-25T08:30:00.000Z" },
                ],
                isBookmarked: false,
                isLiked: true,
                rating: 4.6,
                publishedAt: "2024-05-10T07:00:00.000Z",
                lastUpdated: "2024-05-30T19:00:00.000Z",
                language: "English",
                maturityRating: "Teen",
                wordCount: 74000,
                userId: dummyUserId2,
                category: "recommended"
            },





            {
                id: 88,
                title: "Echoes of Tomorrow",
                cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
                author: dummyUserId2, // Using ObjectId for author
                synopsis: "A futuristic tale set in a world where time travel is possible, and the stakes are incredibly high.",
                status: "ongoing",
                genres: ["Science Fiction", "Adventure"],
                tags: ["Time Travel", "Adventure", "Technology"],
                metrics: {
                    reads: 25000,
                    likes: 1100,
                    comments: 500,
                    shares: 120,
                },
                chapters: [
                    { id: 1, title: "Chapter 1", number: 1, readStatus: true, publishedAt: "2024-01-15T10:00:00.000Z" },
                    { id: 2, title: "Chapter 2", number: 2, readStatus: false, publishedAt: "2024-02-20T12:00:00.000Z" },
                ],
                isBookmarked: true,
                isLiked: true,
                rating: 4.2,
                publishedAt: "2024-01-15T10:00:00.000Z",
                lastUpdated: "2024-02-15T15:00:00.000Z",
                language: "English",
                maturityRating: "Adult",
                wordCount: 35000,
                userId: dummyUserId2, // Assign the dummy user ID
            },
            // Add more stories here
        ];

        // Insert dummy data for stories
        await Story.insertMany(stories);
        console.log("Dummy stories inserted");

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
