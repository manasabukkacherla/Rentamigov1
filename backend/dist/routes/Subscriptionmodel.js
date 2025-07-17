"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Subscriptionmodel_1 = __importDefault(require("../models/Subscriptionmodel"));
const Notification_1 = __importDefault(require("../models/Notification"));
const index_1 = require("../index"); // adjust the path as needed
const Subscriptionrouter = (0, express_1.Router)();
// ✅ **Create a new subscription plan**
Subscriptionrouter.post("/", async (req, res) => {
    try {
        const planData = req.body;
        const newPlan = new Subscriptionmodel_1.default(planData);
        await newPlan.save();
        6;
        // Create a notification message.
        const message = `New Subscription Created: ${newPlan}`;
        const newNotification = new Notification_1.default({
            resourceId: newPlan._id, // Link notification to the user or post
            message,
            read: false,
            createdAt: new Date(),
        });
        // Save the notification to MongoDB.
        const savedNotification = await newNotification.save();
        console.log("Emitting newNotification", savedNotification);
        // Emit a "newNotification" event to all connected clients.
        index_1.io.emit("newNotification", savedNotification);
        res.status(201).json({
            message: "Subscription Plan created successfully",
            plan: newPlan,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// ✅ **Get all subscription plans**
Subscriptionrouter.get("/", async (req, res) => {
    try {
        const plans = await Subscriptionmodel_1.default.find();
        res.status(200).json(plans);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// ✅ **Get a single subscription plan by ID**
Subscriptionrouter.get("/:id", async (req, res) => {
    try {
        const plan = await Subscriptionmodel_1.default.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: "Subscription Plan not found" });
        }
        res.status(200).json(plan);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// ✅ **Update a subscription plan**
Subscriptionrouter.put("/:id", async (req, res) => {
    try {
        const updatedPlan = await Subscriptionmodel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedPlan) {
            return res.status(404).json({ message: "Subscription Plan not found" });
        }
        res.status(200).json({
            message: "Subscription Plan updated successfully",
            plan: updatedPlan,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// ✅ **Delete a subscription plan**
Subscriptionrouter.delete("/:id", async (req, res) => {
    try {
        const deletedPlan = await Subscriptionmodel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPlan) {
            return res.status(404).json({ message: "Subscription Plan not found" });
        }
        res.status(200).json({ message: "Subscription Plan deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = Subscriptionrouter;
