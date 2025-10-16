"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the OwnerInterestForm schema
const OwnerInterestFormSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile number is required"],
        match: [/^\+?\d{10,}$/, "Invalid phone number format"],
    },
    propertyName: {
        type: String,
        required: [true, "Property name is required"],
    },
    locality: {
        type: String,
        required: [true, "Locality is required"],
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
// Check if the model exists, if not create a new one
const OwnerInterestForm = mongoose_1.models.OwnerInterestForm ||
    (0, mongoose_1.model)("OwnerInterestForm", OwnerInterestFormSchema);
exports.default = OwnerInterestForm;
