"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PropertySelection_1 = __importDefault(require("./PropertySelection")); // Ensure correct import
const PropertyDetailsSchema = new mongoose_1.Schema({
    propertyId: {
        type: String,
        required: true,
        unique: true,
    },
    propertyFeatures: {
        noOfBedrooms: { type: Number, required: true },
        noOfWashrooms: { type: Number, required: true },
        noOfBalconies: { type: Number, required: true },
    },
    parkingDetails: {
        hasParking: { type: Boolean, required: true },
        twoWheelerParking: { type: Number, default: 0 },
        fourWheelerParking: { type: Number, default: 0 },
    },
    extraRooms: {
        servantRoom: { type: Boolean, default: false },
        pujaRoom: { type: Boolean, default: false },
        storeRoom: { type: Boolean, default: false },
        others: { type: Boolean, default: false },
    },
    utilityArea: { type: Boolean, required: true },
    propertyConfiguration: {
        furnishingStatus: { type: String, required: true },
        flooringType: {
            type: String,
            enum: ["Marble", "Ceramic", "Vitrified", "Wooden", "Mosaic", "Others"],
            required: true,
        },
    },
    propertyFacing: {
        type: String,
        enum: [
            "North",
            "South",
            "East",
            "West",
            "North-East",
            "North-West",
            "South-East",
            "South-West",
        ],
        required: true,
    },
    propertyAge: { type: Number, required: true },
    areaDetails: {
        superBuiltUpArea: { type: Number, required: true },
        builtUpArea: { type: Number, required: true },
        carpetArea: { type: Number, required: true },
    },
    electricityAvailability: {
        type: String,
        enum: ["24 hours", "Partial power cuts", "No power"],
        required: true,
    },
    waterAvailability: {
        type: String,
        enum: ["Bore well", "Government Supply", "Tanker supply"],
        required: true,
    },
    propertyRestrictions: {
        foodPreference: {
            type: String,
            enum: ["Veg Only", "Veg & Non-Veg"],
            required: true,
        },
        pets: {
            type: String,
            enum: ["Allowed", "Not Allowed"],
            required: true,
        },
        tenantType: {
            type: String,
            enum: ["Bachelors", "Family", "Company Lease"],
            required: true,
        },
    },
}, { timestamps: true });
// ✅ **Pre-Save Hook to Fetch the Latest Property ID from PropertySelection**
PropertyDetailsSchema.pre("validate", async function (next) {
    const propertyDetails = this;
    if (!propertyDetails.propertyId) {
        try {
            const lastPropertySelection = await PropertySelection_1.default.findOne()
                .sort({ createdAt: -1 })
                .select("propertyId");
            if (lastPropertySelection && lastPropertySelection.propertyId) {
                propertyDetails.propertyId = lastPropertySelection.propertyId;
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
const PropertyDetails = mongoose_1.models.PropertyDetails || (0, mongoose_1.model)("PropertyDetails", PropertyDetailsSchema);
exports.default = PropertyDetails;
