"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommercialRentOthers = exports.updateCommercialRentOthers = exports.getCommercialRentOthersById = exports.getAllCommercialRentOthers = exports.createCommercialRentOthers = void 0;
const lodash_1 = __importDefault(require("lodash"));
const CommercialRentOthers_1 = __importDefault(require("../../models/commercial/CommercialRentOthers"));
const generatePropertyId = async () => {
    try {
        // Prefix for the commercial other property ID
        const prefix = "RA-COMREOT";
        // Find the property with the highest property ID number
        const highestProperty = await CommercialRentOthers_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });
        let nextNumber = 1; // Default start number
        if (highestProperty) {
            // Extract the numeric part from the existing highest property ID
            const match = highestProperty.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                // Convert to number and increment by 1
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        // Create the property ID with the sequence number
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        // Check if this exact ID somehow exists (should be rare but possible with manual entries)
        const existingWithExactId = await CommercialRentOthers_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            // In case of collision (e.g., if IDs were manually entered), recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            // Force increment the next number and try again
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            // Double-check this new ID
            const forcedExisting = await CommercialRentOthers_1.default.findOne({ propertyId: forcedPropertyId });
            if (forcedExisting) {
                // If still colliding, recursively generate a new ID
                return generatePropertyId();
            }
            return forcedPropertyId;
        }
        return propertyId;
    }
    catch (error) {
        console.error('Error generating property ID:', error);
        // Fallback to timestamp-based ID if there's an error
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMREOT${timestamp}`;
    }
};
const createCommercialRentOthers = async (req, res) => {
    try {
        const formData = req.body;
        console.log(formData);
        // Generate property ID
        const propertyId = await generatePropertyId();
        // Prefer authenticated user if available
        const userId = formData.metaData.createdBy;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User is not authenticated or user ID is missing in request.'
            });
        }
        // Create the data object with property ID and metadata
        const otherPropertyData = {
            propertyId,
            ...formData,
            metaData: {
                ...formData.metaData,
                createdBy: userId,
                createdAt: new Date()
            }
        };
        // Create new commercial other property listing
        const otherProperty = new CommercialRentOthers_1.default(otherPropertyData);
        await otherProperty.save();
        res.status(201).json({
            success: true,
            message: 'Commercial rent others listing created successfully',
            data: otherProperty
        });
    }
    catch (error) {
        console.error('Error creating commercial rent others listing:', error);
        res.status(500).json({ error: 'Failed to create commercial rent others listing' });
    }
};
exports.createCommercialRentOthers = createCommercialRentOthers;
// Get all commercial Rent others properties
const getAllCommercialRentOthers = async (req, res) => {
    try {
        const RentProperties = await CommercialRentOthers_1.default.find().sort({ 'metaData.createdAt': -1 });
        res.status(200).json({
            success: true,
            count: RentProperties.length,
            data: RentProperties
        });
    }
    catch (error) {
        console.error('Error fetching commercial Rent others properties:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch commercial Rent others properties',
            error: error
        });
    }
};
exports.getAllCommercialRentOthers = getAllCommercialRentOthers;
// Get a single commercial Rent others property by ID
const getCommercialRentOthersById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const RentProperty = await CommercialRentOthers_1.default.findOne({ propertyId });
        if (!RentProperty) {
            return res.status(404).json({
                success: false,
                message: 'Commercial Rent others property not found'
            });
        }
        res.status(200).json({
            success: true,
            data: RentProperty
        });
    }
    catch (error) {
        console.error('Error fetching commercial Rent others property by ID:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch commercial Rent others property',
            error: error
        });
    }
};
exports.getCommercialRentOthersById = getCommercialRentOthersById;
// Update a commercial Rent others property
const updateCommercialRentOthers = async (req, res) => {
    try {
        const documentId = req.params.id;
        const incomingData = req.body?.data;
        if (!incomingData) {
            return res.status(400).json({
                success: false,
                message: "No data provided for update.",
            });
        }
        const cleanedData = JSON.parse(JSON.stringify(incomingData, (key, value) => {
            if (key === "_id" || key === "__v")
                return undefined;
            return value;
        }));
        const existingDoc = await CommercialRentOthers_1.default.findById(documentId);
        if (!existingDoc) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }
        const mergedData = lodash_1.default.merge(existingDoc.toObject(), cleanedData);
        const updatedDoc = await CommercialRentOthers_1.default.findByIdAndUpdate(documentId, { $set: mergedData }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: "rent others updated successfully.",
            data: updatedDoc,
        });
    }
    catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Unknown update error",
        });
    }
};
exports.updateCommercialRentOthers = updateCommercialRentOthers;
// Delete a commercial Rent others property
const deleteCommercialRentOthers = async (req, res) => {
    try {
        const data = await CommercialRentOthers_1.default.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'rent others listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'rent others listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting rent others:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete rent others listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteCommercialRentOthers = deleteCommercialRentOthers;
