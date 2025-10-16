"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailRouter = express_1.default.Router();
// Create reusable transporter object using SMTP
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com", // or your SMTP host
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use app-specific password for Gmail
    },
});
const transporter1 = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BUG_EMAIL,
        pass: process.env.PASS,
    },
});
emailRouter.post("/send-email", async (req, res) => {
    const { content, toEmailAddress } = req.body;
    if (!content || !toEmailAddress) {
        return res.status(400).json({
            success: false,
            error: "Content and toEmailAddress are required.",
        });
    }
    const mailOptions = {
        from: {
            name: "Your contact form",
            address: process.env.EMAIL_USER,
        },
        to: toEmailAddress,
        subject: `[contactform] ${req.body.subject || ""}`.trim(),
        text: `New email from ${process.env.EMAIL_USER}.\n\n${content}`,
    };
    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
            success: false,
            error: error.message || "Failed to send email",
        });
    }
});
exports.default = emailRouter;
