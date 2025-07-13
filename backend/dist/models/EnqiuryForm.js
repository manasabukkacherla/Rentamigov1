"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Enquiry Form schema
const EnquiryFormSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: false, // Emails can repeat across different submissions
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Email validation
        trim: true,
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile number is required"],
        match: [/^\+?\d{10,}$/, "Invalid phone number format"], // Ensures valid phone format
        trim: true,
    },
    isOtpVerified: {
        type: Boolean,
        required: true,
        default: false, // Default to not verified
    },
    selectedServices: {
        type: [String], // Array of strings representing selected service names
        required: true,
        validate: {
            validator: (services) => services.length > 0,
            message: "At least one service must be selected",
        },
    },
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});
// Export the model, ensuring it is not recreated if already defined
const EnquiryForm = mongoose_1.models.EnquiryForm || (0, mongoose_1.model)("EnquiryForm", EnquiryFormSchema);
exports.default = EnquiryForm;
