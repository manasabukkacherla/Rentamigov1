"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PropertyDetailsSchema = new mongoose_1.Schema({
    Property_Id: String,
    Lease_No: String,
    Property_Name: String,
    No_Of_Bedrooms: Number,
    No_Of_Bathrooms: Number,
    No_Of_Balconies: Number,
    Property_Type: {
        type: String,
        enum: [
            "Living Room",
            "Kitchen",
            "Dining Room",
            "Study Room",
            "Puja Room",
            "Theater Room",
            "Gym Room",
            "Utility Area",
        ],
    },
    Furnishing_Status: String,
    Address: String,
    Age_Of_The_Property: Number,
    Floor_Of_The_Property: Number,
    Total_No_Of_Floors: Number,
    Lift: Boolean,
    Power_Backup: Boolean,
    Security: Boolean,
    CCTV: Boolean,
    Gym: Boolean,
    Swimming_Pool: Boolean,
    Kids_Pool: Boolean,
    Jacuzzi: Boolean,
    Club_House: Boolean,
    Jogging_Track: Boolean,
    Children_Play_Area: Boolean,
    Badminton_Court: Boolean,
});
const PropertyDetails = mongoose_1.models.PropertyDetails || (0, mongoose_1.model)("PropertyDetails", PropertyDetailsSchema);
