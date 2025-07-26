"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLeaseApartment = exports.updateLeaseApartment = exports.getLeaseApartmentById = exports.getAllLeaseApartments = exports.createLeaseApartment = void 0;
const residentialLeaseAppartment_1 = __importDefault(require("../../models/residential/residentialLeaseAppartment"));
const lodash_1 = __importDefault(require("lodash"));
const generatePropertyId = async () => {
    try {
        const prefix = "RA-RESLEAP";
        const highestShowroom = await residentialLeaseAppartment_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });
        let nextNumber = 1;
        if (highestShowroom) {
            const match = highestShowroom.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        const existingWithExactId = await residentialLeaseAppartment_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await residentialLeaseAppartment_1.default.findOne({ propertyId: forcedPropertyId });
            if (forcedExisting) {
                return generatePropertyId();
            }
            return forcedPropertyId;
        }
        return propertyId;
    }
    catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-RESLEAP${timestamp}`;
    }
};
// Create Lease Apartment
const createLeaseApartment = async (req, res) => {
    try {
        // Log the incoming request body
        console.log('Incoming request body:', req.body);
        const formData = req.body;
        const propertyId = await generatePropertyId();
        console.log('Property ID:', propertyId);
        // Create new property with the generated ID and metadata
        const propertyData = JSON.parse(JSON.stringify({
            ...req.body,
            propertyId,
            metadata: {
                ...req.body.metadata,
                createdAt: new Date()
            }
        }));
        console.log('Property data before save:', JSON.stringify(propertyData, null, 2));
        const property = new residentialLeaseAppartment_1.default(propertyData);
        await property.save();
        res.status(201).json({
            success: true,
            message: 'Lease Apartment created successfully',
            propertyId: property.propertyId,
            data: property
        });
    }
    catch (error) {
        console.error('Error creating lease apartment:', error);
        // Send more detailed error information
        res.status(500).json({
            success: false,
            error: 'Failed to create lease apartment',
            details: error.message,
            validationErrors: error.errors
        });
    }
};
exports.createLeaseApartment = createLeaseApartment;
// Get All Lease Apartments
const getAllLeaseApartments = async (req, res) => {
    try {
        const properties = await residentialLeaseAppartment_1.default.find({})
            .sort({ 'metadata.createdAt': -1 })
            .lean() // Use lean() for better performance
            .exec();
        res.status(200).json({
            success: true,
            message: 'Fetched all lease apartments successfully',
            data: properties,
        });
    }
    catch (error) {
        console.error('Error fetching apartments:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch lease apartments',
        });
    }
};
exports.getAllLeaseApartments = getAllLeaseApartments;
// Get Lease Apartment by Property ID
const getLeaseApartmentById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await residentialLeaseAppartment_1.default.findOne({ propertyId })
            .lean()
            .exec();
        if (!property) {
            return res.status(404).json({
                success: false,
                error: 'Lease Apartment not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Lease Apartment fetched successfully',
            data: property,
        });
    }
    catch (error) {
        console.error('Error fetching apartment:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch lease apartment',
        });
    }
};
exports.getLeaseApartmentById = getLeaseApartmentById;
// Update Lease Apartment
const updateLeaseApartment = async (req, res) => {
    try {
        const id = req.params._id;
        const incomingData = req.body?.data;
        if (!incomingData) {
            return res.status(400).json({ success: false, message: 'No data provided for update' });
        }
        const cleanedData = JSON.parse(JSON.stringify(incomingData, (key, value) => (['_id', '__v'].includes(key) ? undefined : value)));
        const existing = await residentialLeaseAppartment_1.default.findById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        const merged = lodash_1.default.merge(existing.toObject(), cleanedData);
        const updated = await residentialLeaseAppartment_1.default.findByIdAndUpdate(id, { $set: merged }, {
            new: true,
            runValidators: true,
            lean: true // Use lean() for better performance
        });
        res.status(200).json({ success: true, message: 'Updated successfully', data: updated });
    }
    catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ success: false, message: 'Failed to update lease apartment' });
    }
};
exports.updateLeaseApartment = updateLeaseApartment;
// Delete Lease Apartment
const deleteLeaseApartment = async (req, res) => {
    try {
        const deleted = await residentialLeaseAppartment_1.default.findByIdAndDelete(req.params.id)
            .lean()
            .exec();
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    }
    catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete lease apartment' });
    }
};
exports.deleteLeaseApartment = deleteLeaseApartment;
