"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const twilio_1 = __importDefault(require("twilio"));
const owner_intrst_1 = __importDefault(require("../models/owner-intrst"));
const router = (0, express_1.Router)();
const client = (0, twilio_1.default)(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
// Route to start OTP verification
router.post("/start", async (req, res) => {
    const { to, channel = "sms" } = req.body;
    try {
        if (!to) {
            throw new Error("Phone number is required");
        }
        const verification = await client.verify
            .services(process.env.VERIFY_SERVICE_SID)
            .verifications.create({ to, channel });
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    }
    catch (error) {
        console.error("Error sending OTP:", error.message || error);
        res.status(400).json({ success: false, error: error.message || "Failed to send OTP" });
    }
});
// Route to verify OTP
router.post("/check", async (req, res) => {
    const { to, code, name, email, propertyName, locality, city } = req.body;
    try {
        if (!to || !code) {
            throw new Error("Phone number and OTP are required");
        }
        const verificationCheck = await client.verify
            .services(process.env.VERIFY_SERVICE_SID)
            .verificationChecks.create({ to, code });
        if (verificationCheck.status === "approved") {
            // Save verified data to the database
            const newEntry = new owner_intrst_1.default({
                name,
                email,
                mobileNo: to,
                propertyName,
                locality,
                city,
            });
            await newEntry.save();
            res.status(200).json({
                success: true,
                message: "Phone number verified and data saved successfully",
            });
        }
        else {
            throw new Error("Invalid OTP");
        }
    }
    catch (error) {
        console.error("Error verifying OTP:", error.message || error);
        res.status(400).json({ success: false, error: error.message || "Verification failed" });
    }
});
exports.default = router;
