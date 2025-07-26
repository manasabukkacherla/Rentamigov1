"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ownerInterestForm_1 = __importDefault(require("../models/ownerInterestForm"));
const sendOtpService_1 = __importDefault(require("../services/sendOtpService"));
const emailservice_1 = __importDefault(require("../utils/emailservice")); // Import email transporter
const router = express_1.default.Router();
/**
 * POST: Send OTP to a phone number
 */
router.post("/send-otp", async (req, res) => {
    const { mobileNo } = req.body;
    if (!mobileNo) {
        return res.status(400).json({ success: false, message: "Mobile number is required." });
    }
    try {
        const otpResponse = await sendOtpService_1.default.sendOtp(mobileNo, "sms");
        res.status(200).json({
            success: true,
            message: "OTP sent successfully.",
            sid: otpResponse.sid,
        });
    }
    catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send OTP.",
        });
    }
});
/**
 * POST: Verify OTP
 */
router.post("/verify-otp", async (req, res) => {
    const { mobileNo, otp } = req.body;
    if (!mobileNo || !otp) {
        return res.status(400).json({ success: false, message: "Mobile number and OTP are required." });
    }
    try {
        const verificationResponse = await sendOtpService_1.default.verifyOtp(mobileNo, otp);
        if (!verificationResponse.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP.",
            });
        }
        res.status(200).json({
            success: true,
            message: "OTP verified successfully.",
        });
    }
    catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({
            success: false,
            message: "Failed to verify OTP.",
        });
    }
});
/**
 * POST: Submit Owner Interest Form
 */
router.post("/owner", async (req, res) => {
    const { name, email, mobileNo, propertyName, locality, city, isVerified } = req.body;
    if (!name || !email || !mobileNo || !propertyName || !locality || !city || !isVerified) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, email, mobileNo, propertyName, locality, city, and isVerified) are required.",
        });
    }
    try {
        const newEntry = new ownerInterestForm_1.default({
            name,
            email,
            mobileNo,
            propertyName,
            locality,
            city,
            isVerified,
        });
        const savedEntry = await newEntry.save();
        // Send confirmation email to the user
        const confirmationEmail = `
      <h1>Thank You for Registering Your Property</h1>
      <p>Dear ${name},</p>
      <p>We have successfully received your property registration details:</p>
      <ul>
        <li><strong>Property Name:</strong> ${propertyName}</li>
        <li><strong>Locality:</strong> ${locality}</li>
        <li><strong>City:</strong> ${city}</li>
        <li><strong>Mobile Number:</strong> ${mobileNo}</li>
      </ul>
      <p>We will get back to you shortly.</p>
      <p>Best regards,<br>RentAmigo Team</p>
    `;
        await emailservice_1.default.sendMail({
            from: process.env.EMAIL_USER, // Your email
            to: email, // User's email
            subject: "Property Registration Confirmation",
            html: confirmationEmail,
        });
        // Send notification email to the company
        const companyEmail = `
      <h1>New Property Registration</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile Number:</strong> ${mobileNo}</p>
      <p><strong>Property Name:</strong> ${propertyName}</p>
      <p><strong>Locality:</strong> ${locality}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Verified:</strong> ${isVerified ? "Yes" : "No"}</p>
      <p><strong>Submission Date:</strong> ${savedEntry.createdAt}</p>
    `;
        await emailservice_1.default.sendMail({
            from: process.env.EMAIL_USER,
            to: "contact@rentamigo.in", // Company email
            subject: "New Property Registration Submission",
            html: companyEmail,
        });
        res.status(201).json({
            success: true,
            message: "Owner interest form submitted successfully, and emails sent.",
            data: savedEntry,
        });
    }
    catch (error) {
        console.error("Error submitting owner interest form or sending emails:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit owner interest form or send emails.",
        });
    }
});
/**
 * GET: Retrieve all owner interest forms
 */
router.get("/ownerget", async (_req, res) => {
    try {
        const forms = await ownerInterestForm_1.default.find();
        res.status(200).json({
            success: true,
            data: forms,
        });
    }
    catch (error) {
        console.error("Error retrieving forms:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve forms.",
        });
    }
});
/**
 * GET: Retrieve a specific form by ID
 */
router.get("/ownerget/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const form = await ownerInterestForm_1.default.findById(id);
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found.",
            });
        }
        res.status(200).json({
            success: true,
            data: form,
        });
    }
    catch (error) {
        console.error("Error retrieving form:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve form.",
        });
    }
});
/**
 * PUT: Update a specific form by ID
 */
router.put("/ownerput/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, mobileNo, propertyName, locality, city } = req.body;
    try {
        const updatedForm = await ownerInterestForm_1.default.findByIdAndUpdate(id, { name, email, mobileNo, propertyName, locality, city }, { new: true } // Return the updated document
        );
        if (!updatedForm) {
            return res.status(404).json({
                success: false,
                message: "Form not found.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Form updated successfully.",
            data: updatedForm,
        });
    }
    catch (error) {
        console.error("Error updating form:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update form.",
        });
    }
});
/**
 * DELETE: Delete a specific form by ID
 */
router.delete("/ownerdel/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedForm = await ownerInterestForm_1.default.findByIdAndDelete(id);
        if (!deletedForm) {
            return res.status(404).json({
                success: false,
                message: "Form not found.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Form deleted successfully.",
        });
    }
    catch (error) {
        console.error("Error deleting form:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete form.",
        });
    }
});
exports.default = router;
