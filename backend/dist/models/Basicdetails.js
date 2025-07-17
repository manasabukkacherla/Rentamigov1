"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PropertySelection_1 = __importDefault(require("./PropertySelection")); // Ensure correct import
const BasicDetailsSchema = new mongoose_1.Schema({
    propertyName: {
        type: String,
        required: [true, "Property name is required"],
    },
    propertyAddress: {
        flatNo: { type: String, default: "" },
        floor: { type: String, default: "" },
        houseName: { type: String, default: "" },
        address: { type: String, required: ["Address is required"] },
        pinCode: { type: String, required: ["Pin Code is required"] },
        city: { type: String, required: ["City is required"] },
        street: { type: String, default: "" },
        state: { type: String, required: ["State is required"] },
        zipCode: { type: String, required: ["Zip Code is required"] },
    },
    coordinates: {
        latitude: { type: String, required: ["Latitude is required"] },
        longitude: { type: String, required: ["Longitude is required"] },
    },
    propertySize: {
        type: String,
        enum: ["studio", "1bhk", "2bhk", "3bhk", "3plus"],
    },
    plotType: {
        type: String,
    },
    landmark: {
        type: [String],
        default: [],
    },
    cornerProperty: {
        type: Boolean,
        required: [false, "Corner property field is required"],
    },
    propertyId: {
        type: String,
        required: [false, "Property ID is required"],
        unique: true,
    },
}, { timestamps: true });
// ✅ **Pre-Save Hook to Fetch the Latest Property ID from PropertySelection**
BasicDetailsSchema.pre("validate", async function (next) {
    const basicDetails = this;
    if (!basicDetails.propertyId) {
        try {
            const lastPropertySelection = await PropertySelection_1.default.findOne()
                .sort({ createdAt: -1 })
                .select("propertyId");
            if (lastPropertySelection && lastPropertySelection.propertyId) {
                basicDetails.propertyId = lastPropertySelection.propertyId;
            }
            else {
                return next(new Error("No property ID found in PropertySelection"));
            }
        }
        catch (error) {
            return next(error);
        }
    }
    next();
});
// ✅ **Check if the model already exists to prevent re-compilation**
const BasicDetails = mongoose_1.models.BasicDetails || (0, mongoose_1.model)("BasicDetails", BasicDetailsSchema);
exports.default = BasicDetails;
