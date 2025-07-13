"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubscriptionPlanSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Subscription plan name is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"],
    },
    billingCycle: {
        type: String,
        enum: ["monthly", "yearly", "quarterly"],
        required: [true, "Billing cycle is required"],
    },
    maxProperties: {
        type: Number,
        required: [true, "Max properties is required"],
        min: [1, "At least one property should be allowed"],
    },
    maxLeads: {
        type: Number,
        required: [true, "Max leads is required"],
        min: [1, "At least one lead should be allowed"],
    },
    tokensPerLead: {
        type: Number,
        required: [true, "Tokens per lead is required"],
        min: [1, "At least one token per lead should be allowed"],
    },
    features: {
        type: [String],
        default: [],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    trialDays: {
        type: Number,
        required: [true, "Trial days are required"],
        min: [0, "Trial days cannot be negative"],
    },
}, { timestamps: true });
const SubscriptionPlan = mongoose_1.models.SubscriptionPlan || (0, mongoose_1.model)("SubscriptionPlan", SubscriptionPlanSchema);
exports.default = SubscriptionPlan;
