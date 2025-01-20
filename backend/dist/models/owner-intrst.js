"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OwnerIntrstPropertySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile number is required"],
        match: [/^\+?[\d\s-]{10,}$/, "Please enter a valid mobile number"],
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
});
// Check if the model exists, if not create a new one
const OwnerIntrstPropertyModel = mongoose_1.models.OwnerIntrstPropertyModel ||
    (0, mongoose_1.model)("OwnerIntrstPropertyModel", OwnerIntrstPropertySchema);
exports.default = OwnerIntrstPropertyModel;
