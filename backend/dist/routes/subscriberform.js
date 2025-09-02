"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscribe_1 = __importDefault(require("../models/subscribe"));
const emailservice_1 = __importDefault(require("../utils/emailservice")); // Import the transporter
const subscriptionRouter = express_1.default.Router();
subscriptionRouter.post("/subscribe", async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).send({ error: "Name and Email are required" });
        }
        // Save to database
        const subscription = new subscribe_1.default({ name, email });
        await subscription.save();
        // Send confirmation email to the user
        await emailservice_1.default.sendMail({
            from: process.env.EMAIL_USER, // Your Gmail address
            to: email, // Subscriber's email
            subject: "Subscription Confirmation",
            text: `Dear ${name},\n\nThank you for subscribing to our service.\n\nBest regards,\nYour Company`,
        });
        // Send notification email to the company
        await emailservice_1.default.sendMail({
            from: process.env.EMAIL_USER, // Your Gmail address
            to: process.env.EMAIL_USER, // Your company email
            subject: "New Subscription",
            text: `New subscriber details:\n\nName: ${name}\nEmail: ${email}`,
        });
        res.status(201).send({ message: "Subscription added and emails sent successfully!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while subscribing." });
    }
});
// PUT: Update a subscription by email
subscriptionRouter.put("/subscribep", async (req, res) => {
    try {
        const { email, name } = req.body;
        if (!email || !name) {
            return res.status(400).json({ error: "Email and name are required" });
        }
        const updatedSubscription = await subscribe_1.default.findOneAndUpdate({ email }, { name }, { new: true });
        if (!updatedSubscription) {
            return res.status(404).json({ error: "Subscription not found" });
        }
        res.status(200).json(updatedSubscription);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});
// GET: Fetch all subscriptions
subscriptionRouter.get("/subscriptions", async (req, res) => {
    try {
        const subscriptions = await subscribe_1.default.find();
        res.status(200).json(subscriptions);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});
// GET: Fetch a specific subscription by email
subscriptionRouter.get("/subscriptions/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const subscription = await subscribe_1.default.findOne({ email });
        if (!subscription) {
            return res.status(404).json({ error: "Subscription not found" });
        }
        res.status(200).json(subscription);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});
exports.default = subscriptionRouter;
