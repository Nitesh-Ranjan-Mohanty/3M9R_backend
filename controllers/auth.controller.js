const User = require("../models/user.model");

// Sign up endpoint (for development, no encryption)
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already taken" });
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error during sign up", error: error.message });
    }
};

// Login endpoint (for development, no encryption)
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by email
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password (in dev, we are not encrypting)
        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};

module.exports = { signup, login };
