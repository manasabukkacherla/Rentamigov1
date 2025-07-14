"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const signup_1 = __importDefault(require("../models/signup")); // User Model
const googleAuth_1 = require("../utils/googleAuth"); // Verify Google Token
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const employee_1 = __importDefault(require("../models/employee"));
dotenv_1.default.config();
const loginRouter = express_1.default.Router();
// 🔹 Google Authentication Route
loginRouter.post("/google", async (req, res) => {
    try {
        const { credential } = req.body;
        // 🔹 1️⃣ Verify Google Token
        const googleUser = await (0, googleAuth_1.verifyGoogleToken)(credential);
        if (!googleUser) {
            return res.status(401).json({ error: "Invalid Google token" });
        }
        // 🔹 2️⃣ Check if the user exists in DB
        let user = await signup_1.default.findOne({ email: googleUser.email });
        if (!user) {
            return res.status(400).json({
                error: "User not registered. Please sign up first.",
                email: googleUser.email, // Send email to pre-fill signup form
            });
        }
        // 🔹 3️⃣ Generate JWT Token
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            isEmployee: false, // Explicitly set for regular users
        }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        // 🔹 4️⃣ Send User Data & Token
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                phone: user.phone,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});
loginRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // 🔹 1️⃣ Check if the user exists
        const user = await signup_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        // 🔹 2️⃣ Verify password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        // 🔹 3️⃣ Generate JWT Token
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            isEmployee: false, // Explicitly set for regular users
        }, process.env.JWT_SECRET, {
            expiresIn: "2h", // 🔒 Securely setting expiration time
        });
        // 🔹 4️⃣ Send response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                phone: user.phone,
                address: `${user.address}, ${user.city}, ${user.state}`,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
});
// employee login
loginRouter.post("/emp-login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // 🔹 1️⃣ Check if the employee exists
        const employee = await employee_1.default.findOne({ email });
        console.log("employee details.... ", employee);
        if (!employee) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        // 🔹 2️⃣ Verify password
        const isMatch = await bcryptjs_1.default.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        // 🔹 3️⃣ Generate JWT Token
        const token = jsonwebtoken_1.default.sign({
            id: employee._id,
            isEmployee: true, // Set flag for employee tokens
        }, process.env.JWT_SECRET, {
            expiresIn: "2h", // 🔒 Securely setting expiration time
        });
        // 🔹 4️⃣ Send response
        res.status(200).json({
            message: "Login successful",
            token,
            employee: {
                name: employee.name,
                id: employee._id,
                email: employee.email,
                username: employee.username,
                phone: employee.phone,
                address: `${employee.address}, ${employee.city}, ${employee.state}`,
                role: employee.role,
            },
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
});
exports.default = loginRouter;
