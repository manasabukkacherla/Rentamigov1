"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signup_1 = __importDefault(require("../models/signup")); // Import User model
const emailservice_1 = __importDefault(require("../utils/emailservice")); // Import email transporter
const employee_1 = __importDefault(require("../models/employee"));
const BlogStatisticsModel_1 = __importDefault(require("../models/blogs/BlogStatisticsModel"));
const signupRouter = express_1.default.Router();
// ✅ Store verified emails temporarily (Use DB for production)
const verifiedEmails = new Set();
/**
 * 📌 Send OTP to Email
 */
signupRouter.post("/send-otp", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ error: "Email is required" });
        // Check if email is already registered
        const existingUser = await signup_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: "Email already registered" });
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 min
        // Store OTP temporarily
        verifiedEmails.add(email);
        // Send OTP Email
        await emailservice_1.default.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email Verification OTP",
            html: `<h1>Your OTP Code: ${otp}</h1><p>This OTP is valid for 10 minutes.</p>`,
        });
        res.json({ message: "OTP sent successfully" });
    }
    catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Server error, please try again." });
    }
});
/**
 * 📌 Verify OTP
 */
signupRouter.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp)
            return res.status(400).json({ error: "Email and OTP are required" });
        // Check OTP validity (For real implementation, store OTP in DB)
        if (!verifiedEmails.has(email)) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
        verifiedEmails.add(email); // Mark email as verified
        res.json({ message: "OTP verified successfully", emailVerified: true });
    }
    catch (error) {
        console.error("OTP Verification Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});
/**
 * 📌 Register User


/**
 * 📌 POST /register - User Registration
 */
signupRouter.post("/register", async (req, res) => {
    try {
        let { username, fullName, email, phone, address, city, state, password, role, acceptTerms, } = req.body;
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
        if (!username ||
            !fullName ||
            !email ||
            !phone ||
            !address ||
            !city ||
            !state ||
            !password ||
            !role ||
            !acceptTerms) {
            console.log("❌ Error: Missing required fields!");
            return res.status(400).json({
                error: "All fields are required, and terms must be accepted.",
            });
        }
        if (!fullName || fullName.length < 3) {
            console.log("❌ Error: Full Name is too short!");
            return res
                .status(400)
                .json({ error: "Full Name must be at least 3 characters long." });
        }
        // ✅ Ensure email is verified before registration
        if (!verifiedEmails.has(email)) {
            console.log("❌ Error: Email not verified!");
            return res.status(400).json({
                error: "Email verification is required. Please verify OTP before creating an account.",
            });
        }
        // ✅ Check if email or username already exists
        const existingUser = await signup_1.default.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            console.log("❌ Error: Username or Email already exists!");
            return res
                .status(400)
                .json({ error: "Username or email already exists." });
        }
        // ✅ Hash the password before storing it
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        console.log(`🔒 Password Hashed Successfully`);
        // ✅ Save the new user to the database
        const newUser = new signup_1.default({
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
        const stats = await BlogStatisticsModel_1.default.findOne({ userId: newUser._id });
        if (!stats) {
            console.log("No stat found");
            const newStat = new BlogStatisticsModel_1.default({
                userId: newUser._id,
            });
            await newStat.save();
        }
        // ✅ Remove email from verified list after successful registration
        verifiedEmails.delete(email);
        console.log(`✅ Email removed from verified list: ${email}`);
        /**
         * 📧 Send Welcome Email to User
         */
        await emailservice_1.default.sendMail({
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
        await emailservice_1.default.sendMail({
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
    }
    catch (error) {
        console.error("❌ Error registering user:", error);
        if (error.code === 11000) {
            console.log("❌ Duplicate Entry: Email or Username already exists!");
            return res
                .status(400)
                .json({ error: "Email or username already exists." });
        }
        res.status(500).json({ error: "An error occurred during registration." });
    }
});
signupRouter.get("/users", async (req, res) => {
    try {
        const users = await signup_1.default.find().select("-password"); // Exclude password field
        res.status(200).json({ users });
        console.log(users);
    }
    catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ error: "Server error, please try again." });
    }
});
/**
 * 📌 GET /user/:id - Fetch User Details by ID
 */
signupRouter.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Validate the ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }
        // Fetch user details from the database
        const user = await signup_1.default.findById(id).select("-password"); // Exclude password field
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("❌ Error fetching user details:", error);
        res.status(500).json({ error: "Server error, please try again." });
    }
});
/**
 * 📌 GET /employee/:id - Fetch Employee Details by ID
 */
signupRouter.get("/employee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("employee id", id);
        // Validate the ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }
        // Fetch employee details from the database
        const employee = await employee_1.default.findById(id).select("-password"); // Exclude password field
        console.log(employee);
        if (!employee) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ employee });
    }
    catch (error) {
        console.error("❌ Error fetching user details:", error);
        res.status(500).json({ error: "Server error, please try again." });
    }
});
// update user details
signupRouter.put("/user/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body; // Get only the fields sent in the request
        console.log("🔄 Update Request Received for User ID:", id, "Data:", updateFields);
        // ✅ Validate User ID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            console.error("❌ Invalid user ID format.");
            return res
                .status(400)
                .json({ success: false, error: "Invalid user ID format" });
        }
        // ✅ Check if user exists
        const existingUser = await signup_1.default.findById(id);
        if (!existingUser) {
            console.error("❌ User not found.");
            return res.status(404).json({ success: false, error: "User not found" });
        }
        // ✅ Trim and normalize only provided fields
        if (updateFields.username)
            updateFields.username = updateFields.username.trim().toLowerCase();
        if (updateFields.email)
            updateFields.email = updateFields.email.trim().toLowerCase();
        if (updateFields.fullName)
            updateFields.fullName = updateFields.fullName.trim();
        if (updateFields.phone)
            updateFields.phone = updateFields.phone.trim();
        if (updateFields.address)
            updateFields.address = updateFields.address.trim();
        if (updateFields.city)
            updateFields.city = updateFields.city.trim();
        if (updateFields.state)
            updateFields.state = updateFields.state.trim();
        // ✅ Check if username or email is already taken by another user (if they are being updated)
        if (updateFields.email || updateFields.username) {
            const duplicateUser = await signup_1.default.findOne({
                $or: [
                    { email: updateFields.email },
                    { username: updateFields.username },
                ],
                _id: { $ne: id }, // Exclude the current user from the check
            });
            if (duplicateUser) {
                console.error("❌ Username or Email already exists.");
                return res
                    .status(400)
                    .json({ success: false, error: "Username or email already exists." });
            }
        }
        // ✅ Update user details with only provided fields
        const updatedUser = await signup_1.default.findByIdAndUpdate(id, updateFields, {
            new: true, // Return updated user
            runValidators: true, // Ensure validation is applied
        }).select("-password"); // Exclude password from response
        console.log("✅ User Updated Successfully:", updatedUser);
        return res.status(200).json({
            success: true,
            message: "User details updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("❌ Error updating user details:", error);
        return res.status(500).json({
            success: false,
            error: "An error occurred while updating user details.",
        });
    }
});
// update employee details
signupRouter.put("/employee/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body; // Get only the fields sent in the request
        console.log("🔄 Update Request Received for User ID:", id, "Data:", updateFields);
        // ✅ Validate User ID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            console.error("❌ Invalid user ID format.");
            return res
                .status(400)
                .json({ success: false, error: "Invalid user ID format" });
        }
        // ✅ Check if user exists
        const existingUser = await employee_1.default.findById(id);
        if (!existingUser) {
            console.error("❌ User not found.");
            return res
                .status(404)
                .json({ success: false, error: "User not found" });
        }
        // ✅ Trim and normalize only provided fields
        if (updateFields.username)
            updateFields.username = updateFields.username.trim().toLowerCase();
        if (updateFields.email)
            updateFields.email = updateFields.email.trim().toLowerCase();
        if (updateFields.fullName)
            updateFields.fullName = updateFields.fullName.trim();
        if (updateFields.phone)
            updateFields.phone = updateFields.phone.trim();
        if (updateFields.address)
            updateFields.address = updateFields.address.trim();
        if (updateFields.city)
            updateFields.city = updateFields.city.trim();
        if (updateFields.state)
            updateFields.state = updateFields.state.trim();
        // ✅ Check if username or email is already taken by another user (if they are being updated)
        if (updateFields.email || updateFields.username) {
            const duplicateUser = await employee_1.default.findOne({
                $or: [
                    { email: updateFields.email },
                    { username: updateFields.username },
                ],
                _id: { $ne: id }, // Exclude the current user from the check
            });
            if (duplicateUser) {
                console.error("❌ Username or Email already exists.");
                return res.status(400).json({
                    success: false,
                    error: "Username or email already exists.",
                });
            }
        }
        // ✅ Update user details with only provided fields
        const updatedUser = await employee_1.default.findByIdAndUpdate(id, updateFields, {
            new: true, // Return updated user
            runValidators: true, // Ensure validation is applied
        }).select("-password"); // Exclude password from response
        console.log("✅ User Updated Successfully:", updatedUser);
        return res.status(200).json({
            success: true,
            message: "User details updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("❌ Error updating user details:", error);
        return res.status(500).json({
            success: false,
            error: "An error occurred while updating user details.",
        });
    }
});
// update password for USERS
signupRouter.put("/user/update-password/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;
        console.log("🔄 Password change request for User ID:", id);
        // ✅ Validate User ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(400)
                .json({ success: false, error: "Invalid user ID format" });
        }
        // ✅ Validate password fields
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: "Both current and new passwords are required.",
            });
        }
        // ✅ Find user in database
        const user = await signup_1.default.findById(id);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: "User not found." });
        }
        // ✅ Verify the current password
        const isMatch = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, error: "Incorrect current password." });
        }
        // ✅ Hash the new password before storing it
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // ✅ Update password in database
        user.password = hashedPassword;
        await user.save();
        console.log("✅ Password updated successfully for user:", user.email);
        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully." });
    }
    catch (error) {
        console.error("❌ Error updating password:", error);
        return res.status(500).json({
            success: false,
            error: "An error occurred while updating password.",
        });
    }
});
// update password for employees
signupRouter.put("/employee/update-password/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;
        console.log("🔄 Password change request for User ID:", id);
        // ✅ Validate User ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(400)
                .json({ success: false, error: "Invalid user ID format" });
        }
        // ✅ Validate password fields
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: "Both current and new passwords are required.",
            });
        }
        // ✅ Find user in database
        const employee = await employee_1.default.findById(id);
        if (!employee) {
            return res
                .status(404)
                .json({ success: false, error: "User not found." });
        }
        // ✅ Verify the current password
        const isMatch = await bcryptjs_1.default.compare(currentPassword, employee.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, error: "Incorrect current password." });
        }
        // ✅ Hash the new password before storing it
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // ✅ Update password in database
        employee.password = hashedPassword;
        await employee.save();
        console.log("✅ Password updated successfully for user:", employee.email);
        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully." });
    }
    catch (error) {
        console.error("❌ Error updating password:", error);
        return res.status(500).json({
            success: false,
            error: "An error occurred while updating password.",
        });
    }
});
exports.default = signupRouter;
