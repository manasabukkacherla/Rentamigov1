"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the User Schema
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["owner", "agent", "tenant", "pg", "employee", "admin"],
        required: true,
    },
    acceptTerms: {
        type: Boolean,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    bio: {
        type: String,
        required: false,
        default: ""
    },
    website: {
        type: String,
        required: false,
        default: ""
    },
    twitter: {
        type: String,
        required: false,
        default: ""
    },
    instagram: {
        type: String,
        required: false,
        default: ""
    },
    linkedin: {
        type: String,
        required: false,
        default: ""
    },
    image: {
        type: String,
        required: false,
        default: ""
    }
}, { timestamps: true });
// Export the User model
const User = mongoose_1.models.User || (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
