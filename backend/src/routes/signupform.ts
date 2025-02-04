import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/signup"; // Import User model
import transporter from "../utils/emailservice"; // Import email transporter

const signupRouter = express.Router();

// ✅ Store verified emails temporarily (Use DB for production)
const verifiedEmails = new Set<string>();

/**
 * 📌 Send OTP to Email
 */
signupRouter.post("/send-otp", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 min

    // Store OTP temporarily
    verifiedEmails.add(email);

    // Send OTP Email
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
 * 📌 Verify OTP
 */
signupRouter.post("/verify-otp", async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

    // Check OTP validity (For real implementation, store OTP in DB)
    if (!verifiedEmails.has(email)) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    verifiedEmails.add(email); // Mark email as verified
    res.json({ message: "OTP verified successfully", emailVerified: true });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * 📌 Register User


/**
 * 📌 POST /register - User Registration
 */
signupRouter.post("/register", async (req: Request, res: Response) => {
  try {
    let { username, fullName, email, phone, address, city, state, password, role, acceptTerms } = req.body;

    console.log("📩 Received Payload:");
    console.log(`➡ Username: ${username}`);
    console.log(`➡ Full Name: ${fullName}`);
    console.log(`➡ Email: ${email}`);
    console.log(`➡ Phone: ${phone}`);
    console.log(`➡ Address: ${address}`);
    console.log(`➡ City: ${city}`);
    console.log(`➡ State: ${state}`);
    console.log(`➡ Role: ${role}`);
    console.log(`➡ Accept Terms: ${acceptTerms}`);

    // ✅ Trim and normalize input
    username = username?.trim().toLowerCase();
    email = email?.trim().toLowerCase();
    fullName = fullName?.trim() || ""; // ✅ Ensure fullName is never null
    phone = phone?.trim();
    address = address?.trim();
    city = city?.trim();
    state = state?.trim();

    // ✅ Validate required fields
    if (!username || !fullName || !email || !phone || !address || !city || !state || !password || !role || !acceptTerms) {
      console.log("❌ Error: Missing required fields!");
      return res.status(400).json({ error: "All fields are required, and terms must be accepted." });
    }

    if (!fullName || fullName.length < 3) {
      console.log("❌ Error: Full Name is too short!");
      return res.status(400).json({ error: "Full Name must be at least 3 characters long." });
    }

    // ✅ Ensure email is verified before registration
    if (!verifiedEmails.has(email)) {
      console.log("❌ Error: Email not verified!");
      return res.status(400).json({ error: "Email verification is required. Please verify OTP before creating an account." });
    }

    // ✅ Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      console.log("❌ Error: Username or Email already exists!");
      return res.status(400).json({ error: "Username or email already exists." });
    }

    // ✅ Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`🔒 Password Hashed Successfully`);

    // ✅ Save the new user to the database
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
      emailVerified: true, // ✅ Ensure email is marked as verified
    });

    console.log("📤 Sending Data to Database:");
    console.log(`➡ Username: ${newUser.username}`);
    console.log(`➡ Full Name: ${newUser.fullName}`);
    console.log(`➡ Email: ${newUser.email}`);
    console.log(`➡ Phone: ${newUser.phone}`);
    console.log(`➡ Address: ${newUser.address}`);
    console.log(`➡ City: ${newUser.city}`);
    console.log(`➡ State: ${newUser.state}`);
    console.log(`➡ Role: ${newUser.role}`);
    console.log(`➡ Email Verified: ${newUser.emailVerified}`);
    console.log(`➡ Accept Terms: ${newUser.acceptTerms}`);

    await newUser.save();
    console.log("✅ User Saved Successfully");

    // ✅ Remove email from verified list after successful registration
    verifiedEmails.delete(email);
    console.log(`✅ Email removed from verified list: ${email}`);

    /**
     * 📧 Send Welcome Email to User
     */
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to RentAmigo",
      html: `<h1>Welcome to RentAmigo</h1>
             <p>Dear ${fullName},</p>
             <p>Thank you for signing up! We're excited to have you onboard.</p>`,
    });
    console.log(`📧 Welcome email sent to: ${email}`);

    /**
     * 📧 Notify Admin of New Registration
     */
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
    console.log("📩 Admin notified about new registration");

    res.status(201).json({
      message: "User registered successfully, and emails sent.",
      user: {
        id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        emailVerified: newUser.emailVerified,
      },
    });
  } catch (error: any) {
    console.error("❌ Error registering user:", error);

    if (error.code === 11000) {
      console.log("❌ Duplicate Entry: Email or Username already exists!");
      return res.status(400).json({ error: "Email or username already exists." });
    }

    res.status(500).json({ error: "An error occurred during registration." });
  }
});





export default signupRouter;
