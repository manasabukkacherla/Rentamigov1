"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSellWarehouse = exports.updateSellWarehouse = exports.getSellWarehouseById = exports.getAllSellWarehouses = exports.createCommercialWarehouse = void 0;
const lodash_1 = __importDefault(require("lodash"));
const CommercialSellWarehouse_1 = __importDefault(require("../../models/commercial/CommercialSellWarehouse"));
// Generate property ID with format RA-COMWARH-XXXX
const generatePropertyId = async () => {
    try {
        const prefix = "RA-COMSEWH";
        // Find the warehouse with the highest property ID number
        const highestWarehouse = await CommercialSellWarehouse_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 }).lean();
        let nextNumber = 1;
        if (highestWarehouse) {
            const match = highestWarehouse.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        // Verify the generated ID doesn't already exist
        const existingWithExactId = await CommercialSellWarehouse_1.default.findOne({ propertyId }).lean();
        if (existingWithExactId) {
            // Try the next sequential ID to avoid collisions
            const forcedNextId = `${prefix}-${(nextNumber + 1).toString().padStart(4, '0')}`;
            const forcedExisting = await CommercialSellWarehouse_1.default.findOne({ propertyId: forcedNextId }).lean();
            if (forcedExisting) {
                // If still colliding, generate a completely new ID
                return generatePropertyId();
            }
            return forcedNextId;
        }
        return propertyId;
    }
    catch (error) {
        console.error('Error generating property ID:', error);
        // Fallback to timestamp-based ID if there's an error
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMWARH-${timestamp}`;
    }
};
// Create a new commercial warehouse listing
const createCommercialWarehouse = async (req, res) => {
    try {
        const warehouseData = req.body;
        // Generate property ID
        const propertyId = await generatePropertyId();
        // Add metadata and property ID
        warehouseData.metadata = {
            createdBy: warehouseData.metadata?.createdBy,
            createdAt: new Date(),
        };
        // Add property ID to the warehouse data
        warehouseData.propertyId = propertyId;
        // Create and save warehouse with optimized approach
        const warehouse = new CommercialSellWarehouse_1.default(warehouseData);
        await warehouse.save();
        // Return a successful response with minimal data
        return res.status(201).json({
            success: true,
            message: 'Commercial warehouse listing created successfully',
            data: {
                propertyId: warehouse.propertyId,
                _id: warehouse._id,
                basicInformation: warehouse.basicInformation,
                metadata: warehouse.metadata
            }
        });
    }
    catch (error) {
        console.error('Error creating commercial warehouse:', error);
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
            error: 'Failed to create commercial warehouse listing',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.createCommercialWarehouse = createCommercialWarehouse;
const getAllSellWarehouses = async (req, res) => {
    try {
        const warehouses = await CommercialSellWarehouse_1.default.find();
        res.status(200).json({
            success: true,
            count: warehouses.length,
            data: warehouses
        });
    }
    catch (error) {
        console.error('Error fetching commercial Sell warehouses:', error);
        res.status(500).json({
            error: 'Failed to fetch commercial Sell warehouse listings',
            details: error.message
        });
    }
};
exports.getAllSellWarehouses = getAllSellWarehouses;
const getSellWarehouseById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const warehouse = await CommercialSellWarehouse_1.default.findOne({ propertyId });
        if (!warehouse) {
            return res.status(404).json({
                success: false,
                error: 'Commercial Sell warehouse not found'
            });
        }
        res.status(200).json({
            success: true,
            data: warehouse
        });
    }
    catch (error) {
        console.error('Error fetching commercial Sell  warehouse:', error);
        res.status(500).json({
            error: 'Failed to fetch commercial Sell  warehouse',
            details: error.message
        });
    }
};
exports.getSellWarehouseById = getSellWarehouseById;
const updateSellWarehouse = async (req, res) => {
    try {
        const documentId = req.params.id;
        const incomingData = req.body?.data;
        const userId = req.body.userId;
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
        const existingDoc = await CommercialSellWarehouse_1.default.findById(documentId);
        if (existingDoc?.metadata?.createdBy?.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this listing",
            });
        }
        if (!existingDoc) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }
        const mergedData = lodash_1.default.merge(existingDoc.toObject(), cleanedData);
        const updatedDoc = await CommercialSellWarehouse_1.default.findByIdAndUpdate(documentId, { $set: mergedData }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: "Commercial Sell Warehouse updated successfully.",
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
exports.updateSellWarehouse = updateSellWarehouse;
const deleteSellWarehouse = async (req, res) => {
    try {
        const userId = req.body.userId;
        const listing = await CommercialSellWarehouse_1.default.findById(req.params.id);
        if (listing?.metadata?.createdBy?.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this listing",
            });
        }
        const data = await CommercialSellWarehouse_1.default.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Commercial Sell Warehouse listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Commercial Sell Warehouse listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting Commercial Sell Warehouse:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete Commercial Sell Warehouse listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteSellWarehouse = deleteSellWarehouse;
