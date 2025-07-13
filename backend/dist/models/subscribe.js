"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Subscription schema
const SubscriptionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        match: [
            /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
            'Invalid email format',
        ],
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
// Check if the model exists, if not create a new one
const Subscription = mongoose_1.models.Subscription || (0, mongoose_1.model)('Subscription', SubscriptionSchema);
exports.default = Subscription;
