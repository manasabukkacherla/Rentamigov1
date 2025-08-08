"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchShowrooms = exports.deleteShowroom = exports.updateShowroom = exports.getShowroom = exports.getAllShowrooms = exports.createShowroom = void 0;
const CommercialsellShowroom_1 = __importDefault(require("../../models/commercial/CommercialsellShowroom"));
// Generate property ID with format RA-COMSESR-XXXX
const generatePropertyId = async () => {
    const prefix = "RA-COMSESR";
    try {
        const highestShowroom = await CommercialsellShowroom_1.default.findOne({
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
        const existingWithExactId = await CommercialsellShowroom_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await CommercialsellShowroom_1.default.findOne({ propertyId: forcedPropertyId });
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
        return `${prefix}${timestamp}`;
    }
};
// Create a new commercial showroom listing
const createShowroom = async (req, res) => {
    try {
        const showroomData = req.body;
        console.log(showroomData);
        // Generate property ID
        const propertyId = await generatePropertyId();
        // // Add metadata
        showroomData.metadata = {
            createdBy: showroomData.metadata.createdBy,
            createdAt: new Date(),
        };
        // // Add property ID
        showroomData.propertyId = propertyId;
        // // Create new showroom listing
        const showroom = new CommercialsellShowroom_1.default(showroomData);
        await showroom.save();
        res.status(201).json({
            success: true,
            message: 'Commercial showroom listing created successfully',
            data: showroom
        });
    }
    catch (error) {
        console.error('Error creating commercial showroom:', error);
        res.status(500).json({ error: 'Failed to create commercial showroom listing' });
    }
};
exports.createShowroom = createShowroom;
// Get all commercial showroom listings
const getAllShowrooms = async (req, res) => {
    try {
        const showrooms = await CommercialsellShowroom_1.default.find()
            .sort({ 'metadata.createdAt': -1 });
        res.status(200).json({
            success: true,
            count: showrooms.length,
            data: showrooms
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching commercial showroom listings',
            error: error.message
        });
    }
};
exports.getAllShowrooms = getAllShowrooms;
// Get single commercial showroom listing
const getShowroom = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const showroom = await CommercialsellShowroom_1.default.findOne({ propertyId });
        if (!showroom) {
            return res.status(404).json({
                success: false,
                message: 'Commercial showroom listing not found'
            });
        }
        res.status(200).json({
            success: true,
            data: showroom
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching commercial showroom listing',
            error: error.message
        });
    }
};
exports.getShowroom = getShowroom;
// Update commercial showroom listing
const updateShowroom = async (req, res) => {
    try {
        const showroom = await CommercialsellShowroom_1.default.findById(req.params.id);
        const userId = req.body.userId;
        if (showroom?.metadata?.createdBy?.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this listing'
            });
        }
        if (!showroom) {
            return res.status(404).json({
                success: false,
                message: 'Commercial showroom listing not found'
            });
        }
        // Update metadata
        req.body.metadata = {
            ...showroom.metadata,
            updatedAt: new Date()
        };
        const updatedShowroom = await CommercialsellShowroom_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            message: 'Commercial showroom listing updated successfully',
            data: updatedShowroom
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating commercial showroom listing',
            error: error.message
        });
    }
};
exports.updateShowroom = updateShowroom;
// Delete commercial showroom listing
const deleteShowroom = async (req, res) => {
    try {
        const showroom = await CommercialsellShowroom_1.default.findById(req.params.id);
        const userId = req.body.userId;
        if (!showroom) {
            return res.status(404).json({
                success: false,
                message: 'Commercial showroom listing not found'
            });
        }
        if (showroom?.metadata?.createdBy?.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this listing'
            });
        }
        await showroom.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Commercial showroom listing deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting commercial showroom listing',
            error: error.message
        });
    }
};
exports.deleteShowroom = deleteShowroom;
// Search commercial showroom listings
const searchShowrooms = async (req, res) => {
    try {
        const { city, minPrice, maxPrice, minArea, maxArea, showroomType, furnishingStatus } = req.query;
        const query = {};
        if (city)
            query['basicInformation.address.city'] = city;
        if (showroomType)
            query['basicInformation.showroomType'] = showroomType;
        if (furnishingStatus)
            query['propertyDetails.furnishingStatus'] = furnishingStatus;
        if (minPrice || maxPrice) {
            query['pricingDetails.price'] = {};
            if (minPrice)
                query['pricingDetails.price'].$gte = Number(minPrice);
            if (maxPrice)
                query['pricingDetails.price'].$lte = Number(maxPrice);
        }
        if (minArea || maxArea) {
            query['propertyDetails.area.superBuiltUpArea'] = {};
            if (minArea)
                query['propertyDetails.area.superBuiltUpArea'].$gte = Number(minArea);
            if (maxArea)
                query['propertyDetails.area.superBuiltUpArea'].$lte = Number(maxArea);
        }
        const showrooms = await CommercialsellShowroom_1.default.find(query)
            .sort({ 'metadata.createdAt': -1 });
        res.status(200).json({
            success: true,
            count: showrooms.length,
            data: showrooms
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching commercial showroom listings',
            error: error.message
        });
    }
};
exports.searchShowrooms = searchShowrooms;
