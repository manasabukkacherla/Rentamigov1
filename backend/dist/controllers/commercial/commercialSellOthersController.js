"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommercialSellOthers = exports.updateCommercialSellOthers = exports.getCommercialSellOthersById = exports.getAllCommercialSellOthers = exports.createCommercialSellOthers = void 0;
const CommercialSellOthers_1 = __importDefault(require("../../models/commercial/CommercialSellOthers"));
const lodash_1 = __importDefault(require("lodash"));
// Generate property ID with format RA-COMSEOT-XXXX
const generatePropertyId = async () => {
    const prefix = "RA-COMSEOT";
    try {
        const highestProperty = await CommercialSellOthers_1.default.findOne({
            'basicInformation.propertyId': { $regex: `^${prefix}\\d+$` }
        }).sort({ 'basicInformation.propertyId': -1 });
        let nextNumber = 1;
        if (highestProperty) {
            const match = highestProperty.propertyId?.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        const existingWithExactId = await CommercialSellOthers_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await CommercialSellOthers_1.default.findOne({ propertyId: forcedPropertyId });
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
// Create a new commercial sell others property
const createCommercialSellOthers = async (req, res) => {
    try {
        const formData = req.body;
        const propertyId = await generatePropertyId();
        // Correctly map frontend 'metadata' to backend 'metaData'
        const otherPropertyData = {
            ...formData,
            propertyId,
            metaData: {
                ...formData.metadata,
                createdBy: formData.metadata.createdBy,
                createdAt: new Date(),
            },
        };
        // Remove the original metadata field to avoid confusion
        const otherProperty = new CommercialSellOthers_1.default(otherPropertyData);
        await otherProperty.save();
        res.status(201).json({
            success: true,
            message: 'Commercial sell others property created successfully',
            data: otherProperty,
        });
    }
    catch (error) {
        console.error('Error creating commercial sell others listing:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to create commercial sell others listing',
            error: error,
        });
    }
};
exports.createCommercialSellOthers = createCommercialSellOthers;
// Get all commercial sell others listings
const getAllCommercialSellOthers = async (req, res) => {
    try {
        const others = await CommercialSellOthers_1.default.find({});
        res.status(200).json({
            success: true,
            count: others.length,
            data: others
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch commercial others sale listings'
        });
    }
};
exports.getAllCommercialSellOthers = getAllCommercialSellOthers;
// Get commercial sell others listing by ID
const getCommercialSellOthersById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await CommercialSellOthers_1.default.findOne({ propertyId });
        if (!property) {
            return res.status(404).json({ error: 'Commercial sell others property not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Commercial sell others property retrieved successfully',
            data: property
        });
    }
    catch (error) {
        console.error('Error fetching commercial sell others property:', error);
        res.status(500).json({ error: 'Failed to fetch commercial sell others property' });
    }
};
exports.getCommercialSellOthersById = getCommercialSellOthersById;
// Update commercial sell others property
const updateCommercialSellOthers = async (req, res) => {
    try {
        const documentId = req.params.id;
        // @ts-ignore
        const userId = req.user?._id; // Get user ID from authenticated session
        const incomingData = req.body?.data;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in.' });
        }
        if (!incomingData) {
            return res.status(400).json({
                success: false,
                message: 'No data provided for update.',
            });
        }
        const existingDoc = await CommercialSellOthers_1.default.findById(documentId);
        if (!existingDoc) {
            return res.status(404).json({
                success: false,
                message: 'Property not found',
            });
        }
        // Authorization check
        if (existingDoc.metaData?.createdBy?.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this property.',
            });
        }
        const cleanedData = JSON.parse(JSON.stringify(incomingData, (key, value) => {
            if (key === '_id' || key === '__v')
                return undefined;
            return value;
        }));
        const mergedData = lodash_1.default.merge(existingDoc.toObject(), cleanedData);
        const updatedDoc = await CommercialSellOthers_1.default.findByIdAndUpdate(documentId, { $set: mergedData }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: 'Sell others updated successfully.',
            data: updatedDoc,
        });
    }
    catch (error) {
        console.error('Update error:', error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown update error',
        });
    }
};
exports.updateCommercialSellOthers = updateCommercialSellOthers;
// Delete commercial sell others property
const deleteCommercialSellOthers = async (req, res) => {
    try {
        const documentId = req.params.id;
        // @ts-ignore
        const userId = req.user?._id; // Get user ID from authenticated session
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in.' });
        }
        const docToDelete = await CommercialSellOthers_1.default.findById(documentId);
        if (!docToDelete) {
            return res.status(404).json({
                success: false,
                message: 'Sell others listing not found',
            });
        }
        // Authorization check
        if (docToDelete.metaData?.createdBy?.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this property.',
            });
        }
        await CommercialSellOthers_1.default.findByIdAndDelete(documentId);
        res.status(200).json({
            success: true,
            message: 'Sell others listing deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting Sell others:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete Sell others listing',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.deleteCommercialSellOthers = deleteCommercialSellOthers;
