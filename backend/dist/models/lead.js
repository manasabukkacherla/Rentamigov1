"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Lead schema
const LeadSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    role: { type: String, enum: ["owner", "agent", "tenant", "pg", "employee"], required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    propertyId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Property", required: true },
    propertyName: { type: String, required: true, trim: true },
    flatNo: { type: String, required: true, trim: true },
    status: {
        type: String,
        enum: ["New", "Contacted", "Interested", "Not Interested", "RNR", "Call Back", "No Requirement", "Converted"],
        default: "New",
    },
    createdAt: { type: Date, default: Date.now, immutable: true }, // ✅ This makes sure `createdAt` never changes
}, { timestamps: { createdAt: true } });
const Lead = mongoose_1.models.Lead || (0, mongoose_1.model)("Lead", LeadSchema);
exports.default = Lead;
