"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/ServiceEnquiry.ts
const mongoose_1 = require("mongoose");
const ServiceEnquirySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile number is required"],
        match: [/^[\d\s-]{10,}$/, "Please enter a valid mobile number"],
    },
    selectedServices: [
        {
            type: String,
            required: [true, "At least one service must be selected"],
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const ServiceEnquiry = mongoose_1.models.ServiceEnquiry ||
    (0, mongoose_1.model)("ServiceEnquiry", ServiceEnquirySchema);
exports.default = ServiceEnquiry;
