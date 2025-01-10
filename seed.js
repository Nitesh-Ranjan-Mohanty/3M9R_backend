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
