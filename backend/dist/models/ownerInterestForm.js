"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Owner Interest Form schema
const OwnerInterestFormSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Valid email regex
        trim: true,
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile number is required"],
        match: [/^\+?\d{10,}$/, "Invalid phone number format"], // Valid international format
        trim: true,
    },
    propertyName: {
        type: String,
        required: [true, "Property name is required"],
        trim: true,
    },
    locality: {
        type: String,
        required: [true, "Locality is required"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
    },
    isVerified: {
        type: Boolean,
        required: true, // Ensure that it is always submitted with the request
        default: true, // Default is true to avoid mandatory OTP verification
    },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});
// Export the model, ensuring it is not recreated if already defined
const OwnerInterestForm = mongoose_1.models.OwnerInterestForm ||
    (0, mongoose_1.model)("OwnerInterestForm", OwnerInterestFormSchema);
exports.default = OwnerInterestForm;
