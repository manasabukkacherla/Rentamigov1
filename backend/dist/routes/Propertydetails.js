"use strict";
// routes/Propertydetails.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Propertydetails_1 = __importDefault(require("../models/Propertydetails")); // adjust path as needed
const PropertyDetailsrouter = express_1.default.Router();
/**
 * @route   POST /api/properties
 * @desc    Add or update a property (upsert)
 * @access  Public
 */
PropertyDetailsrouter.post("/", async (req, res) => {
    const { propertyId, ...updateData } = req.body;
    if (!propertyId) {
        return res.status(400).json({ message: "Property ID is required" });
    }
    try {
        // Try to find existing
        let property = await Propertydetails_1.default.findOne({ propertyId });
        if (property) {
            // Update existing
            property = await Propertydetails_1.default.findOneAndUpdate({ propertyId }, { $set: updateData }, { new: true, upsert: true, runValidators: true });
            return res
                .status(200)
                .json({ message: "Property updated successfully", property });
        }
        // Create new
        const newProperty = new Propertydetails_1.default({ propertyId, ...updateData });
        await newProperty.save();
        return res
            .status(201)
            .json({ message: "Property added successfully", property: newProperty });
    }
    catch (error) {
        console.error("Error saving property details:", error);
        return res.status(500).json({ message: "Server error", error });
    }
});
/**
 * @route   GET /api/properties
 * @desc    Get all properties
 * @access  Public
 */
PropertyDetailsrouter.get("/", async (_req, res) => {
    try {
        const properties = await Propertydetails_1.default.find();
        return res.status(200).json(properties);
    }
    catch (error) {
        console.error("Error fetching properties:", error);
        return res.status(500).json({ message: "Error fetching properties", error });
    }
});
/**
 * @route   GET /api/properties/property/user
 * @desc    Get properties by userId query param
 * @access  Public
 */
PropertyDetailsrouter.get("/property/user", async (req, res) => {
    const userId = String(req.query.userId || "").trim();
    if (!userId) {
        return res
            .status(400)
            .json({ message: "Missing required query parameter: userId" });
    }
    try {
        const userProps = await Propertydetails_1.default.find({
            "metadata.createdBy": userId,
        });
        return res.status(200).json(userProps);
    }
    catch (error) {
        console.error("Error fetching user properties:", error);
        return res
            .status(500)
            .json({ message: "Error fetching user properties", error });
    }
});
/**
 * @route   GET /api/properties/:id
 * @desc    Get a single property by Mongo _id
 * @access  Public
 */
PropertyDetailsrouter.get("/:id", async (req, res) => {
    try {
        const property = await Propertydetails_1.default.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.status(200).json(property);
    }
    catch (error) {
        console.error("Error fetching property:", error);
        return res.status(500).json({ message: "Error fetching property", error });
    }
});
/**
 * @route   PUT /api/properties/:id
 * @desc    Update a property by Mongo _id
 * @access  Public
 */
PropertyDetailsrouter.put("/:id", async (req, res) => {
    try {
        const updatedProperty = await Propertydetails_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        return res
            .status(200)
            .json({ message: "Property updated successfully", property: updatedProperty });
    }
    catch (error) {
        console.error("Error updating property:", error);
        return res.status(500).json({ message: "Error updating property", error });
    }
});
/**
 * @route   DELETE /api/properties/:id
 * @desc    Delete a property by Mongo _id
 * @access  Public
 */
PropertyDetailsrouter.delete("/:id", async (req, res) => {
    try {
        const deleted = await Propertydetails_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.status(200).json({ message: "Property deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting property:", error);
        return res.status(500).json({ message: "Error deleting property", error });
    }
});
exports.default = PropertyDetailsrouter;
