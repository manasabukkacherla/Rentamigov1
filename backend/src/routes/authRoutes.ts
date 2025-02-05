import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/signup"; // User Model
import { verifyGoogleToken } from "../utils/googleAuth"; // Verify Google Token
import bcrypt from "bcryptjs";
dotenv.config();
const loginRouter = express.Router();

// 🔹 Google Authentication Route
loginRouter.post("/google", async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    // 🔹 1️⃣ Verify Google Token
    const googleUser = await verifyGoogleToken(credential);
    if (!googleUser) {
      return res.status(401).json({ error: "Invalid Google token" });
    }

    // 🔹 2️⃣ Check if the user exists in DB
    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      return res.status(400).json({
        error: "User not registered. Please sign up first.",
        email: googleUser.email, // Send email to pre-fill signup form
      });
    }

    // 🔹 3️⃣ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
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
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});
loginRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 🔹 1️⃣ Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 🔹 2️⃣ Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 🔹 3️⃣ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
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
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

export default loginRouter;
