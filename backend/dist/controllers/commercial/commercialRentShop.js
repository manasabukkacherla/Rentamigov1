"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommercialRentShop = exports.updateCommercialRentShop = exports.getCommercialRentShopById = exports.getAllCommercialRentShop = exports.createCommercialRentShop = void 0;
const lodash_1 = __importDefault(require("lodash"));
const commercialrentshop_1 = __importDefault(require("../../models/commercial/commercialrentshop"));
const signup_1 = __importDefault(require("../../models/signup"));
// import { validateCommercialShop } from '../validators/commercialShopValidator';
const generatePropertyId = async () => {
    try {
        const prefix = "RA-COMRESH";
        const highestShop = await commercialrentshop_1.default.findOne({
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
        const existingWithExactId = await commercialrentshop_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await commercialrentshop_1.default.findOne({ propertyId: forcedPropertyId });
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
const createCommercialRentShop = async (req, res) => {
    try {
        const formData = req.body;
        console.log(formData);
        const propertyId = await generatePropertyId();
        const userId = formData.metadata.createdBy;
        const user = await signup_1.default.findById(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        if (user) {
            const userName = user.username;
            const shopData = {
                propertyId,
                basicInformation: formData.basicInformation,
                shopDetails: formData.shopDetails,
                rentalTerms: formData.rentalTerms,
                brokerage: formData.brokerage,
                availability: formData.availability,
                contactInformation: formData.contactInformation,
                media: formData.media,
                metadata: {
                    createdBy: formData.metadata.createdBy,
                    createdAt: new Date(),
                }
            };
            // // Create new shop listing
            const shop = new commercialrentshop_1.default(shopData);
            await shop.save();
            res.status(201).json({
                success: true,
                message: 'Commercial rent shop listing created successfully',
                data: shop
            });
        }
    }
    catch (error) {
        console.error('Error creating commercial rent shop:', error);
        res.status(500).json({
            error: 'Failed to create commercial rent shop listing',
            details: error.message
        });
    }
};
exports.createCommercialRentShop = createCommercialRentShop;
const getAllCommercialRentShop = async (req, res) => {
    try {
        const properties = await commercialrentshop_1.default.find().sort({ 'metadata.createdAt': -1 });
        res.status(200).json({
            success: true,
            message: 'Commercial Rent shop listings retrieved successfully',
            data: properties
        });
    }
    catch (error) {
        console.error('Error fetching commercial Rent shop listings:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch commercial Rent shop listings'
        });
    }
};
exports.getAllCommercialRentShop = getAllCommercialRentShop;
const getCommercialRentShopById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await commercialrentshop_1.default.findOne({ propertyId });
        if (!property) {
            return res.status(404).json({
                success: false,
                error: 'Commercial Rent shop property not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Commercial Rent shop property retrieved successfully',
            data: property
        });
    }
    catch (error) {
        console.error('Error fetching Commercial Rent shop property:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch Commercial Rent shop property'
        });
    }
};
exports.getCommercialRentShopById = getCommercialRentShopById;
const updateCommercialRentShop = async (req, res) => {
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
        const existingDoc = await commercialrentshop_1.default.findById(documentId);
        if (!existingDoc) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }
        const mergedData = lodash_1.default.merge(existingDoc.toObject(), cleanedData);
        const updatedDoc = await commercialrentshop_1.default.findByIdAndUpdate(documentId, { $set: mergedData }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: "CommercialRentShop updated successfully.",
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
exports.updateCommercialRentShop = updateCommercialRentShop;
const deleteCommercialRentShop = async (req, res) => {
    try {
        const data = await commercialrentshop_1.default.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Commercial RentShop listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Commercial RentShop listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting Commercial RentShop:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete Commercial RentShop',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteCommercialRentShop = deleteCommercialRentShop;
