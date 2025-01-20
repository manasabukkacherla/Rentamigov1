"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true, // Set unique to true
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required !"],
        match: [
            /^[a-zA-Z0-9._]{5,20}$/,
            "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
        ],
    },
    image: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number"], // Basic phone validation
    },
});
UserSchema.index({ username: 1 }, { unique: true });
// Check if the model exists, if not create a new one
const User = mongoose_1.models.User || (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
