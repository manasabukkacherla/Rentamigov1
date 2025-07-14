"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommercialShed = exports.updateCommercialShed = exports.getCommercialShedById = exports.getAllCommercialSheds = exports.createCommercialShed = void 0;
const CommercialSellShed_1 = __importDefault(require("../../models/commercial/CommercialSellShed"));
// Generate property ID with format RA-COMSHED-XXXX
const generatePropertyId = async () => {
    try {
        // Prefix for the commercial sell office space property ID
        const prefix = "RA-COMSESD";
        // Find the office space with the highest property ID number
        const highestOfficeSpace = await CommercialSellShed_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });
        let nextNumber = 1; // Default start number
        if (highestOfficeSpace) {
            // Extract the numeric part from the existing highest property ID
            const match = highestOfficeSpace.propertyId?.match(/(\d+)$/);
            if (match && match[1]) {
                // Convert to number and increment by 1
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        // Create the property ID with the sequence number
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        // Check if this exact ID somehow exists
        const existingWithExactId = await CommercialSellShed_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            // In case of collision, recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await CommercialSellShed_1.default.findOne({ propertyId: forcedPropertyId });
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
        return `RA-COMSESD${timestamp}`;
    }
};
// Create a new commercial shed listing
const createCommercialShed = async (req, res) => {
    try {
        const shedData = req.body;
        // Basic validation - ensure required fields exist
        if (!shedData.basicInformation?.title) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field: property name'
            });
        }
        if (!shedData.shedDetails?.totalArea) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field: property area'
            });
        }
        // Generate property ID
        const propertyId = await generatePropertyId();
        // Add metadata and property ID
        shedData.metaData = {
            createdBy: shedData.metaData?.createdBy,
            createdAt: new Date(),
            // status: 'pending',
            // isVerified: false,
            // isActive: true,
            // views: 0,
            // inquiries: 0,
            // favoriteCount: 0
        };
        // Add property ID to the shed data
        shedData.propertyId = propertyId;
        // Create and save shed with optimized approach
        const shed = new CommercialSellShed_1.default(shedData);
        await shed.save();
        // Return a successful response with minimal data
        return res.status(201).json({
            success: true,
            message: 'Commercial shed listing created successfully',
            data: {
                propertyId: shed.propertyId,
                _id: shed._id,
                metaData: shed.metaData
            }
        });
    }
    catch (error) {
        console.error('Error creating commercial shed:', error);
        // Handle validation errors specifically
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.message
            });
        }
        // Handle duplicate key errors
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                error: 'Duplicate property information',
                details: 'A property with this information already exists'
            });
        }
        // General error response
        return res.status(500).json({
            success: false,
            error: 'Failed to create commercial shed listing',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.createCommercialShed = createCommercialShed;
// Get all commercial sheds with pagination and filtering
const getAllCommercialSheds = async (req, res) => {
    try {
        const { page = 1, limit = 10, city, minPrice, maxPrice, minArea, maxArea, sort } = req.query;
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;
        // Build filter query
        const query = {};
        if (city) {
            query['address.city'] = city;
        }
        if (minPrice) {
            query['pricingDetails.propertyPrice'] = { $gte: parseInt(minPrice, 10) };
        }
        if (maxPrice) {
            query['pricingDetails.propertyPrice'] = {
                ...query['pricingDetails.propertyPrice'] || {},
                $lte: parseInt(maxPrice, 10)
            };
        }
        if (minArea) {
            query['shedDetails.totalArea'] = { $gte: parseInt(minArea, 10) };
        }
        if (maxArea) {
            query['shedDetails.totalArea'] = {
                ...query['shedDetails.totalArea'] || {},
                $lte: parseInt(maxArea, 10)
            };
        }
        // Build sort query
        let sortQuery = { 'metaData.createdAt': -1 }; // Default sorting
        if (sort === 'price-asc') {
            sortQuery = { 'pricingDetails.propertyPrice': 1 };
        }
        else if (sort === 'price-desc') {
            sortQuery = { 'pricingDetails.propertyPrice': -1 };
        }
        else if (sort === 'area-asc') {
            sortQuery = { 'shedDetails.totalArea': 1 };
        }
        else if (sort === 'area-desc') {
            sortQuery = { 'shedDetails.totalArea': -1 };
        }
        // Execute query with projection for list view
        const sheds = await CommercialSellShed_1.default.find(query)
            .select('propertyId basicInformation.title shedDetails.totalArea pricingDetails.propertyPrice media.photos.exterior metaData')
            .sort(sortQuery)
            .skip(skip)
            .limit(limitNum)
            .lean();
        // Get total count for pagination
        const total = await CommercialSellShed_1.default.countDocuments(query);
        return res.status(200).json({
            success: true,
            data: sheds,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(total / limitNum)
            }
        });
    }
    catch (error) {
        console.error('Error fetching commercial sheds:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch commercial sheds'
        });
    }
};
exports.getAllCommercialSheds = getAllCommercialSheds;
// Get a single commercial shed by ID
const getCommercialShedById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const shed = await CommercialSellShed_1.default.findOne({ propertyId });
        if (!shed) {
            return res.status(404).json({
                success: false,
                error: 'Commercial shed not found'
            });
        }
        // Update view count
        await CommercialSellShed_1.default.updateOne({ $inc: { 'metaData.views': 1 } });
        return res.status(200).json({
            success: true,
            data: shed
        });
    }
    catch (error) {
        console.error('Error fetching commercial shed:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch commercial shed'
        });
    }
};
exports.getCommercialShedById = getCommercialShedById;
// Update a commercial shed
const updateCommercialShed = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Try to find by MongoDB _id or propertyId
        const query = id.match(/^[0-9a-fA-F]{24}$/)
            ? { _id: id }
            : { propertyId: id };
        // Update metadata
        updateData.metaData = {
            ...updateData.metaData,
            updatedAt: new Date()
        };
        const shed = await CommercialSellShed_1.default.findById(req.params.id);
        const userId = req.body.userId;
        if (shed?.metaData?.createdBy?.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this listing'
            });
        }
        const updatedShed = await CommercialSellShed_1.default.findOneAndUpdate(query, updateData, { new: true, runValidators: true });
        if (!updatedShed) {
            return res.status(404).json({
                success: false,
                error: 'Commercial shed not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Commercial shed updated successfully',
            data: updatedShed
        });
    }
    catch (error) {
        console.error('Error updating commercial shed:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.message
            });
        }
        return res.status(500).json({
            success: false,
            error: 'Failed to update commercial shed'
        });
    }
};
exports.updateCommercialShed = updateCommercialShed;
// Delete a commercial shed
const deleteCommercialShed = async (req, res) => {
    try {
        const { id } = req.params;
        // Try to find by MongoDB _id or propertyId
        const query = id.match(/^[0-9a-fA-F]{24}$/)
            ? { _id: id }
            : { propertyId: id };
        const deletedShed = await CommercialSellShed_1.default.findOneAndDelete(query);
        const userId = req.body.userId;
        if (deletedShed?.metaData?.createdBy?.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this listing'
            });
        }
        if (!deletedShed) {
            return res.status(404).json({
                success: false,
                error: 'Commercial shed not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Commercial shed deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting commercial shed:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to delete commercial shed'
        });
    }
};
exports.deleteCommercialShed = deleteCommercialShed;
