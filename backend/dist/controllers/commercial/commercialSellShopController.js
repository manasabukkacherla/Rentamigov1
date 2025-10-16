"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommercialSellShop = exports.updateCommercialSellShop = exports.getCommercialSellShopById = exports.getAllCommercialSellShop = exports.createCommercialShop = void 0;
const CommercialsellShop_1 = __importDefault(require("../../models/commercial/CommercialsellShop"));
const lodash_1 = __importDefault(require("lodash"));
const generatePropertyId = async () => {
    try {
        const prefix = "RA-COMSESH";
        const highestShop = await CommercialsellShop_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });
        let nextNumber = 1;
        if (highestShop) {
            const match = highestShop.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        const existingWithExactId = await CommercialsellShop_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await CommercialsellShop_1.default.findOne({ propertyId: forcedPropertyId });
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
        return `RA-COMSESH${timestamp}`;
    }
};
const createCommercialShop = async (req, res) => {
    try {
        const formData = req.body;
        console.log(formData);
        const propertyId = await generatePropertyId();
        const shopData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata,
                createdBy: formData.metadata.createdBy,
                createdAt: new Date()
            }
        };
        // Create new shop listing
        const shop = new CommercialsellShop_1.default(shopData);
        await shop.save();
        res.status(201).json({
            success: true,
            message: 'Commercial shop listing created successfully',
            data: shop
        });
    }
    catch (error) {
        console.error('Error creating commercial shop:', error);
        res.status(500).json({
            error: 'Failed to create commercial shop listing',
            details: error.message
        });
    }
};
exports.createCommercialShop = createCommercialShop;
const getAllCommercialSellShop = async (req, res) => {
    try {
        const shop = await CommercialsellShop_1.default.find({});
        res.status(200).json({
            success: true,
            count: shop.length,
            data: shop
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch commercial shop sale listings'
        });
    }
};
exports.getAllCommercialSellShop = getAllCommercialSellShop;
const getCommercialSellShopById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await CommercialsellShop_1.default.findOne({ propertyId });
        if (!property) {
            return res.status(404).json({ error: 'Commercial sell shop property not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Commercial sell shop property retrieved successfully',
            data: property
        });
    }
    catch (error) {
        console.error('Error fetching commercial sell shop property:', error);
        res.status(500).json({ error: 'Failed to fetch commercial sell shop property' });
    }
};
exports.getCommercialSellShopById = getCommercialSellShopById;
const updateCommercialSellShop = async (req, res) => {
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
        const existingDoc = await CommercialsellShop_1.default.findById(documentId);
        if (!existingDoc) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }
        if (existingDoc.metadata?.createdBy?.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this listing'
            });
        }
        const mergedData = lodash_1.default.merge(existingDoc.toObject(), cleanedData);
        const updatedDoc = await CommercialsellShop_1.default.findByIdAndUpdate(documentId, { $set: mergedData }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: "Sell shop updated successfully.",
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
exports.updateCommercialSellShop = updateCommercialSellShop;
const deleteCommercialSellShop = async (req, res) => {
    try {
        const data = await CommercialsellShop_1.default.findByIdAndDelete(req.params.id);
        const userId = req.body.userId;
        if (data?.metadata?.createdBy?.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this listing'
            });
        }
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Sell shop listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Sell shop listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting Sell shop:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete Sell shop listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteCommercialSellShop = deleteCommercialSellShop;
