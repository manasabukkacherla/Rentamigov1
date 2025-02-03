import express, { Request, Response } from "express";
import User from "../models/signup"; // Import the User model
import transporter from "../utils/emailservice"; // Import the email transporter
import bcrypt from "bcryptjs";
const signupRouter = express.Router();

// POST: Handle user signup


// Store OTPs temporarily in memory (Use Redis or DB for production)
const otpStorage = new Map<string, { otp: string; expiresAt: number }>();

/**
 * 1️⃣ Send OTP for Signup Email Verification
 */
signupRouter.post("/send-otp", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    // Store OTP temporarily in memory
    otpStorage.set(email, { otp, expiresAt });

    // Send email with OTP
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      html: `<h1>Your OTP Code: ${otp}</h1><p>This OTP is valid for 10 minutes.</p>`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Server error, please try again." });
  }
});

/**
 * 2️⃣ Verify OTP for Signup
 */
// Store verified emails
const verifiedEmails = new Set<string>();

signupRouter.post("/verify-otp", async (req: Request, res: Response) => {
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

    // ✅ Mark email as verified
    verifiedEmails.add(email);

    // ✅ Remove OTP after verification
    

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// POST: Handle user signup
signupRouter.post("/register", async (req: Request, res: Response) => {
  try {
    let { username, fullName, email, phone, address, city, state, password, role, acceptTerms } = req.body;

    // Trim user input
    username = username.trim();
    fullName = fullName.trim();
    email = email.trim();
    phone = phone.trim();
    address = address.trim();
    city = city.trim();
    state = state.trim();

    // Validate required fields
    if (!username || !fullName || !email || !phone || !address || !city || !state || !password || !role || !acceptTerms) {
      return res.status(400).json({ error: "All fields are required, and terms must be accepted." });
    }

    // 🚨 Ensure email is verified before registration
    if (!verifiedEmails.has(email)) {
      return res.status(400).json({ error: "Email verification is required. Please verify OTP before creating an account." });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists." });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const newUser = new User({
      username,
      fullName,
      email,
      phone,
      address,
      city,
      state,
      password: hashedPassword,
      role,
      acceptTerms,
    });

    await newUser.save();

    // 🚨 Remove email from verified list after successful registration
    verifiedEmails.delete(email);

    // Send welcome email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to RentAmigo",
      html: `<h1>Welcome to RentAmigo</h1><p>Dear ${fullName},</p><p>Thank you for signing up!</p>`,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "venkat.s@rentamigo.in",
      subject: "New User Registration",
      html: `
        <h1>New User Registration</h1>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}, ${city}, ${state}</p>
        <p><strong>Role:</strong> ${role}</p>
      `,
    });

    res.status(201).json({
      message: "User registered successfully, and emails sent.",
      user: {
        id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        address: `${newUser.address}, ${newUser.city}, ${newUser.state}`,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    console.error("Error registering user:", error);

    if (error.code === 11000) {
      return res.status(400).json({ error: "Email or username already exists." });
    }

    res.status(500).json({ error: "An error occurred during registration." });
  }
});




// PUT: Update user by email
signupRouter.put("/update", async (req: Request, res: Response) => {
  try {
    const { email, username, phone, address, city, state, role } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required to update user." });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { username, phone, address, city, state, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found for the provided email." });
    }

    res.status(200).json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "An error occurred while updating the user." });
  }
});

// GET: Fetch all users
signupRouter.get("/users", async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

// GET: Fetch a specific user by email
signupRouter.get("/users/:email", async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "An error occurred while fetching the user." });
  }
});

export default signupRouter;
