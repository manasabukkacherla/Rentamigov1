"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the SocietyAmenities schema
const SocietyAmenitiesSchema = new mongoose_1.Schema({
    property: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Property",
        required: [true, "Property reference is required"],
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
    },
    role: {
        type: String,
        enum: ["owner", "agent", "tenant", "pg", "employee"],
        required: [true, "User role is required"],
    },
    propertyName: {
        type: String,
        required: false,
        trim: true,
    },
    selectedAmenities: {
        type: [String],
        validate: {
            validator: (value) => value.every((amenity) => [
                "Lift",
                "Power Backup",
                "Security",
                "CCTV",
                "Gym",
                "Swimming Pool",
                "Kids Pool",
                "Jacuzzi",
                "Club House",
                "Jogging Track",
                "Children Play Area",
                "Badminton Court",
                "Lawn Tennis Court",
                "Table Tennis",
                "Squash Court",
                "Football",
                "Steam Room",
                "Carrom",
                "Chess Board",
                "Multipurpose Hall",
                "Yoga / Meditation Center",
                "Flower Park",
                "Day-to-Day Utility Stores",
                "Salon",
            ].includes(amenity)),
            message: "Invalid amenity provided",
        },
    },
    powerBackupType: {
        type: String,
        enum: ["Partially", "Fully"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
// Middleware to populate `propertyName` before saving
SocietyAmenitiesSchema.pre("save", async function (next) {
    const societyAmenities = this;
    if (societyAmenities.property) {
        const property = await (0, mongoose_1.model)("Property").findById(societyAmenities.property);
        if (property) {
            societyAmenities.propertyName = property.propertyName;
        }
    }
    next();
});
// Define and export the SocietyAmenities model
const SocietyAmenities = mongoose_1.models.SocietyAmenities ||
    (0, mongoose_1.model)("SocietyAmenities", SocietyAmenitiesSchema);
exports.default = SocietyAmenities;
