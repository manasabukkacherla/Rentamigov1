"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signup_1 = __importDefault(require("../models/signup"));
const emailservice_1 = __importDefault(require("../utils/emailservice")); // Email service
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
// Store OTPs temporarily in memory (use Redis for production)
const otpStorage = new Map();
/**
 * 1️⃣ Send OTP to the user email
 */
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        // Find user by email
        const user = await signup_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Generate OTP (6-digit)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
        // Store OTP in memory
        otpStorage.set(email, { otp, expiresAt });
        // Send email with OTP
        await emailservice_1.default.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset Your Password - OTP",
            html: `<h1>Your OTP Code: ${otp}</h1><p>This code is valid for 10 minutes.</p>`,
        });
        res.json({ message: "OTP sent successfully" });
    }
    catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});
/**
 * 2️⃣ Verify OTP
 */
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required" });
        }
        // Retrieve stored OTP
        const storedOtpData = otpStorage.get(email);
        if (!storedOtpData) {
            return res.status(400).json({ error: "OTP not found or expired" });
        }
        // Check OTP validity
        if (storedOtpData.otp !== otp || Date.now() > storedOtpData.expiresAt) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
        // OTP is correct, remove it from storage
        otpStorage.delete(email);
        res.json({ message: "OTP verified successfully" });
    }
    catch (error) {
        console.error("OTP Verification Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});
/**
 * 3️⃣ Reset Password
 */
router.post("/reset-password", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and new password are required" });
        }
        // Find user
        const user = await signup_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Hash new password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: "Password reset successfully" });
    }
    catch (error) {
        console.error("Password Reset Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
