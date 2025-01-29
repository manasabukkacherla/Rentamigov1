import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/signup"; // Importing the User model

dotenv.config();

const loginRouter = express.Router();

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
