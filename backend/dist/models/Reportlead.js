"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Report schema
const ReportSchema = new mongoose_1.Schema({
    leadId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Lead", required: true },
    name: { type: String, required: true, trim: true },
    number: { type: String, required: true, trim: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["agent", "fraud", "other"], required: true },
    description: { type: String, required: true, trim: true },
    timestamp: { type: Date, default: Date.now, immutable: true },
}, { timestamps: { createdAt: true } });
const Report = mongoose_1.models.Report || (0, mongoose_1.model)("Report", ReportSchema);
exports.default = Report;
