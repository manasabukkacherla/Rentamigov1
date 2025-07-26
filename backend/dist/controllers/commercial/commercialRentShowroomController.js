"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommercialRentShowroom = exports.updateCommercialRentShowroom = exports.getCommercialRentShowroomById = exports.getAllCommercialRentShowroom = exports.createRentShowroom = void 0;
const lodash_1 = __importDefault(require("lodash"));
const commercialRentShowroom_1 = require("../../models/commercial/commercialRentShowroom");
// Generate property ID with format RA-COMRSH####
const generatePropertyId = async () => {
    try {
        // Prefix for the commercial rent showroom property ID
        const prefix = "RA-COMRESR";
        // Find the showroom with the highest property ID number
        const highestShowroom = await commercialRentShowroom_1.CommercialRentShowroom.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });
        let nextNumber = 1; // Default start number
        if (highestShowroom) {
            // Extract the numeric part from the existing highest property ID
            const match = highestShowroom.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                // Convert to number and increment by 1
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        // Create the property ID with the sequence number
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        // Check if this exact ID somehow exists (should be rare but possible with manual entries)
        const existingWithExactId = await commercialRentShowroom_1.CommercialRentShowroom.findOne({ propertyId });
        if (existingWithExactId) {
            // In case of collision, recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            // Force increment the next number and try again
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            // Double-check this new ID
            const forcedExisting = await commercialRentShowroom_1.CommercialRentShowroom.findOne({ propertyId: forcedPropertyId });
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
        return `RA-COMRESH${timestamp}`;
    }
};
// Create a new commercial rent showroom listing
const createRentShowroom = async (req, res) => {
    try {
        const formData = req.body;
        console.log('Creating commercial rent showroom with data:', JSON.stringify(formData, null, 2));
        // Check for required fields
        if (!formData.basicInformation || !formData.showroomDetails || !formData.propertyDetails) {
            return res.status(400).json({
                success: false,
                error: 'Missing required information',
                details: 'basicInformation, showroomDetails and propertyDetails are required'
            });
        }
        // Generate property ID
        const propertyId = await generatePropertyId();
        console.log('Generated property ID:', propertyId);
        // Set metadata if not provided
        if (!formData.metadata) {
            formData.metadata = {};
        }
        // Ensure createdBy is present
        if (!formData.metadata.createdBy) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field',
                details: 'metadata.createdBy is required'
            });
        }
        // Create the showroom data object
        const showroomData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata,
                createdBy: formData.metadata.createdBy,
                createdAt: new Date()
            }
        };
        // Create new showroom listing
        const showroom = new commercialRentShowroom_1.CommercialRentShowroom(showroomData);
        await showroom.save();
        res.status(201).json({
            success: true,
            message: 'Commercial rent showroom listing created successfully',
            data: showroom
        });
    }
    catch (error) {
        console.error('Error creating commercial rent showroom:', error);
        // Check for validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.message,
                errors: error.errors
            });
        }
        res.status(500).json({
            success: false,
            error: 'Failed to create commercial rent showroom listing',
            details: error.message
        });
    }
};
exports.createRentShowroom = createRentShowroom;
const getAllCommercialRentShowroom = async (req, res) => {
    try {
        const properties = await commercialRentShowroom_1.CommercialRentShowroom.find().sort({ 'metadata.createdAt': -1 });
        res.status(200).json({
            success: true,
            message: 'Commercial Rent showroom listings retrieved successfully',
            data: properties
        });
    }
    catch (error) {
        console.error('Error fetching commercial Rent showroom listings:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch commercial Rent showroom listings'
        });
    }
};
exports.getAllCommercialRentShowroom = getAllCommercialRentShowroom;
const getCommercialRentShowroomById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await commercialRentShowroom_1.CommercialRentShowroom.findOne({ propertyId });
        if (!property) {
            return res.status(404).json({
                success: false,
                error: 'Commercial Rent showroom property not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Commercial Rent showroom property retrieved successfully',
            data: property
        });
    }
    catch (error) {
        console.error('Error fetching commercial Rent showroom property:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch commercial Rent showroom property'
        });
    }
};
exports.getCommercialRentShowroomById = getCommercialRentShowroomById;
const updateCommercialRentShowroom = async (req, res) => {
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
        const existingDoc = await commercialRentShowroom_1.CommercialRentShowroom.findById(documentId);
        if (!existingDoc) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }
        const mergedData = lodash_1.default.merge(existingDoc.toObject(), cleanedData);
        const updatedDoc = await commercialRentShowroom_1.CommercialRentShowroom.findByIdAndUpdate(documentId, { $set: mergedData }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: "Commercial RentShowroom updated successfully.",
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
exports.updateCommercialRentShowroom = updateCommercialRentShowroom;
const deleteCommercialRentShowroom = async (req, res) => {
    try {
        const data = await commercialRentShowroom_1.CommercialRentShowroom.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Commercial RentShowroom listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Commercial RentShowroom listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting Commercial RentShowroom:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete Commercial RentShowroom listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteCommercialRentShowroom = deleteCommercialRentShowroom;
