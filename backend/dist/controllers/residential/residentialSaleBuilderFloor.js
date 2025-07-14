"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBuilderFloors = exports.deleteSaleBuilderFloor = exports.updateSaleBuilderFloor = exports.getSaleBuilderFloorById = exports.getAllSaleBuilderFloors = exports.createSaleBuilderFloor = void 0;
const residentialSaleBuilderFloor_1 = __importDefault(require("../../models/residential/residentialSaleBuilderFloor"));
const generatePropertyId = async () => {
    try {
        const prefix = "RA-RESSEBF";
        const highestShowroom = await residentialSaleBuilderFloor_1.default.findOne({
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
        const existingWithExactId = await residentialSaleBuilderFloor_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await residentialSaleBuilderFloor_1.default.findOne({ propertyId: forcedPropertyId });
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
        return `RA-RESSEBF${timestamp}`;
    }
};
// Create a new apartment listing
const createSaleBuilderFloor = async (req, res) => {
    try {
        const propertyId = await generatePropertyId();
        const builderFloorData = {
            ...req.body,
            propertyId,
            metadata: {
                ...req.body.metadata,
                createdAt: new Date()
            }
        };
        const builderFloor = new residentialSaleBuilderFloor_1.default(builderFloorData);
        await builderFloor.save();
        res.status(201).json({
            success: true,
            message: 'Builder Floor listing created successfully',
            data: builderFloor
        });
    }
    catch (error) {
        console.error('Error creating builder floor listing:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create builder floor listing',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.createSaleBuilderFloor = createSaleBuilderFloor;
const getAllSaleBuilderFloors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Build filter object based on query parameters
        const filters = {};
        if (req.query.city)
            filters['basicInformation.address.city'] = req.query.city;
        if (req.query.state)
            filters['basicInformation.address.state'] = req.query.state;
        if (req.query.minPrice)
            filters.price = { $gte: parseInt(req.query.minPrice) };
        if (req.query.maxPrice)
            filters.price = { ...filters.price, $lte: parseInt(req.query.maxPrice) };
        if (req.query.bedrooms)
            filters['propertyDetails.bedrooms'] = parseInt(req.query.bedrooms);
        if (req.query.propertyType)
            filters.propertyType = req.query.propertyType;
        const builderFloors = await residentialSaleBuilderFloor_1.default.find(filters)
            .skip(skip)
            .limit(limit)
            .sort({ 'metadata.createdAt': -1 });
        const total = await residentialSaleBuilderFloor_1.default.countDocuments(filters);
        res.status(200).json({
            success: true,
            data: builderFloors,
            pagination: {
                current: page,
                total: Math.ceil(total / limit),
                totalRecords: total
            }
        });
    }
    catch (error) {
        console.error('Error fetching builder floors:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch builder floors',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.getAllSaleBuilderFloors = getAllSaleBuilderFloors;
const getSaleBuilderFloorById = async (req, res) => {
    try {
        const builderFloor = await residentialSaleBuilderFloor_1.default.findOne({ propertyId: req.params.propertyId });
        if (!builderFloor) {
            return res.status(404).json({
                success: false,
                message: 'Builder Floor not found'
            });
        }
        res.status(200).json({
            success: true,
            data: builderFloor
        });
    }
    catch (error) {
        console.error('Error fetching builder floor:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch builder floor',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.getSaleBuilderFloorById = getSaleBuilderFloorById;
const updateSaleBuilderFloor = async (req, res) => {
    try {
        const builderFloor = await residentialSaleBuilderFloor_1.default.findById(req.params.id);
        const userId = req.body.userId;
        if (!builderFloor) {
            return res.status(404).json({
                success: false,
                message: 'Builder Floor not found'
            });
        }
        if (builderFloor.metadata?.createdBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this listing'
            });
        }
        const updatedBuilderFloor = await residentialSaleBuilderFloor_1.default.findByIdAndUpdate(req.params.id, {
            ...req.body,
            metadata: {
                ...builderFloor.metadata,
                updatedAt: new Date()
            }
        }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: 'Builder Floor listing updated successfully',
            data: updatedBuilderFloor
        });
    }
    catch (error) {
        console.error('Error updating builder floor:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update builder floor',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.updateSaleBuilderFloor = updateSaleBuilderFloor;
const deleteSaleBuilderFloor = async (req, res) => {
    try {
        const builderFloor = await residentialSaleBuilderFloor_1.default.findById(req.params.id);
        const userId = req.body.userId;
        if (!builderFloor) {
            return res.status(404).json({
                success: false,
                message: 'Builder Floor not found'
            });
        }
        if (builderFloor.metadata?.createdBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this listing'
            });
        }
        await builderFloor.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Builder Floor listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting apartment:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete builder floor',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.deleteSaleBuilderFloor = deleteSaleBuilderFloor;
// Get apartments by user
const getUserBuilderFloors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const userId = req.body.userId;
        const builderFloors = await residentialSaleBuilderFloor_1.default.find({
            'metadata.createdBy': userId
        })
            .skip(skip)
            .limit(limit)
            .sort({ 'metadata.createdAt': -1 });
        const total = await residentialSaleBuilderFloor_1.default.countDocuments({
            'metadata.createdBy': userId
        });
        res.status(200).json({
            success: true,
            data: builderFloors,
            pagination: {
                current: page,
                total: Math.ceil(total / limit),
                totalRecords: total
            }
        });
    }
    catch (error) {
        console.error('Error fetching user builder floors:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user builder floors',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.getUserBuilderFloors = getUserBuilderFloors;
