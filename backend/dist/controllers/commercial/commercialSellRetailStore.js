"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommercialSellRetailStore = exports.updateCommercialSellRetailStore = exports.getCommercialSellRetailStoreById = exports.getAllCommercialSellRetailStores = exports.createCommercialSellRetailStore = void 0;
const CommercialSellRetailStore_1 = __importDefault(require("../../models/commercial/CommercialSellRetailStore"));
const mongoose_1 = __importDefault(require("mongoose"));
const generatePropertyId = async () => {
    try {
        const prefix = "RA-COMSERS";
        const highestShop = await CommercialSellRetailStore_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });
        let nextNumber = 1;
        if (highestShop) {
            const match = highestShop?.propertyId?.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        const existingWithExactId = await CommercialSellRetailStore_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await CommercialSellRetailStore_1.default.findOne({ propertyId: forcedPropertyId });
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
        return `RA-COMSERS${timestamp}`;
    }
};
const createCommercialSellRetailStore = async (req, res) => {
    try {
        const formData = req.body;
        const propertyId = await generatePropertyId();
        // Prepare metadata
        const metadata = {
            ...formData.metadata,
            createdBy: formData.metadata.createdBy,
            createdAt: new Date(),
        };
        // Construct the data object according to the Mongoose schema
        const shopData = {
            ...formData,
            propertyId,
            metadata,
        };
        const shop = new CommercialSellRetailStore_1.default(shopData);
        await shop.save();
        res.status(201).json({
            success: true,
            message: 'Commercial sell retail store listing created successfully',
            data: {
                _id: shop._id,
                propertyId: shop.propertyId,
            },
        });
    }
    catch (error) {
        console.error('Error creating commercial sell retail store:', error);
        // Mongoose validation errors are helpful to send back to the client
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.errors,
            });
        }
        res.status(500).json({
            success: false,
            error: 'Failed to create commercial sell retail store',
            details: error.message,
        });
    }
};
exports.createCommercialSellRetailStore = createCommercialSellRetailStore;
const getAllCommercialSellRetailStores = async (req, res) => {
    try {
        // Extract query parameters for filtering
        const { city, state, minPrice, maxPrice, minArea, maxArea } = req.query;
        // Build filter object
        const filter = {
            'metadata.status': { $ne: 'deleted' }
        };
        // Add location filters if provided
        if (city)
            filter['basicInformation.address.city'] = city;
        if (state)
            filter['basicInformation.address.state'] = state;
        // Add price range filter if provided
        if (minPrice || maxPrice) {
            filter['priceDetails.price'] = {};
            if (minPrice)
                filter['priceDetails.price'].$gte = Number(minPrice);
            if (maxPrice)
                filter['priceDetails.price'].$lte = Number(maxPrice);
        }
        // Add area range filter if provided
        if (minArea || maxArea) {
            filter['propertyDetails.area.totalArea'] = {};
            if (minArea)
                filter['propertyDetails.area.totalArea'].$gte = Number(minArea);
            if (maxArea)
                filter['propertyDetails.area.totalArea'].$lte = Number(maxArea);
        }
        const shops = await CommercialSellRetailStore_1.default.find(filter)
            .sort({ 'metadata.createdAt': -1 });
        res.status(200).json({
            success: true,
            count: shops.length,
            data: shops
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve commercial sell retail store listings',
            details: error.message
        });
    }
};
exports.getAllCommercialSellRetailStores = getAllCommercialSellRetailStores;
const getCommercialSellRetailStoreById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const shop = await CommercialSellRetailStore_1.default.findOne({ propertyId });
        if (!shop) {
            return res.status(404).json({
                success: false,
                error: 'Commercial sell retail store listing not found'
            });
        }
        res.status(200).json({
            success: true,
            data: shop
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve commercial sell retail store listing',
            details: error.message
        });
    }
};
exports.getCommercialSellRetailStoreById = getCommercialSellRetailStoreById;
const updateCommercialSellRetailStore = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Find the shop to update
        const shop = await CommercialSellRetailStore_1.default.findOne({
            $or: [
                { propertyId: id },
                { _id: mongoose_1.default.Types.ObjectId.isValid(id) ? id : null }
            ],
            'metadata.status': { $ne: 'deleted' }
        });
        if (!shop) {
            return res.status(404).json({
                success: false,
                error: 'Commercial sell retail store listing not found'
            });
        }
        // Check if user has permission to update this listing
        // if (req.user && req.user._id && shop.metadata.createdBy.toString() !== req.user._id.toString()) {
        //   return res.status(403).json({
        //     success: false,
        //     error: 'You do not have permission to update this listing'
        //   });
        // }
        // Update the shop with new data
        // Don't allow changing propertyId or metadata.userId
        delete updateData.propertyId;
        if (updateData.metadata) {
            delete updateData.metadata.createdBy;
            // Update modified time
            updateData.metadata.updatedAt = new Date();
        }
        const updatedShop = await CommercialSellRetailStore_1.default.findByIdAndUpdate(shop._id, { $set: updateData }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: 'Commercial sell retail store listing updated successfully',
            data: updatedShop
        });
    }
    catch (error) {
        console.error('Error updating commercial sell retail store:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update commercial sell retail store listing',
            details: error.message
        });
    }
};
exports.updateCommercialSellRetailStore = updateCommercialSellRetailStore;
const deleteCommercialSellRetailStore = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the shop to delete
        const shop = await CommercialSellRetailStore_1.default.findOne({
            $or: [
                { propertyId: id },
                { _id: mongoose_1.default.Types.ObjectId.isValid(id) ? id : null }
            ],
            'metadata.status': { $ne: 'deleted' }
        });
        if (!shop) {
            return res.status(404).json({
                success: false,
                error: 'Commercial sell retail store listing not found'
            });
        }
        // Check if user has permission to delete this listing
        // if (req.user && req.user._id && shop.metadata.createdBy.toString() !== req.user._id.toString()) {
        //   return res.status(403).json({
        //     success: false,
        //     error: 'You do not have permission to delete this listing'
        //   });
        // }
        // Soft delete - update status to 'deleted'
        const deletedShop = await CommercialSellRetailStore_1.default.findByIdAndUpdate(shop._id, { $set: { 'metadata.status': 'deleted' } }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Commercial sell retail store listing deleted successfully',
            data: deletedShop
        });
    }
    catch (error) {
        console.error('Error deleting commercial sell retail store:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete commercial sell retail store listing',
            details: error.message
        });
    }
};
exports.deleteCommercialSellRetailStore = deleteCommercialSellRetailStore;
