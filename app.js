require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const storyRoutes = require("./routes/story.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes")

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", storyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
