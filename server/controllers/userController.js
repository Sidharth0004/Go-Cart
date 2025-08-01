import bcrypt from 'bcryptjs';
import User from '../models/User.js'; 
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const normalizedEmail = email.toLowerCase();

        // Check if user already exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = new User({ name, email: normalizedEmail, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Helps prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(201).json({ success: true, message: "User registered successfully", user: {  name: newUser.name, email: newUser.email } });

    } catch (error) {
        console.error("Error registering user:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }


};

//Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const normalizedEmail = email.toLowerCase();

        // Check if user exists
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({ success: true,  user: { name: user.name, email: user.email } });

    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};