"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommercialLeaseAgriculture = exports.updateCommercialLeaseAgriculture = exports.getCommercialLeaseAgricultureById = exports.getAllCommercialLeaseAgriculture = exports.createCommercialLeaseAgriculture = void 0;
const CommercialLeaseAgriculture_1 = __importDefault(require("../../models/commercial/CommercialLeaseAgriculture"));
const lodash_1 = __importDefault(require("lodash"));
// Helper function to generate Property ID
const generatePropertyId = async () => {
    try {
        const prefix = "RA-COMLEAG";
        const highestShop = await CommercialLeaseAgriculture_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });
        let nextNumber = 1;
        if (highestShop) {
            const match = highestShop.propertyId?.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        const existingWithExactId = await CommercialLeaseAgriculture_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await CommercialLeaseAgriculture_1.default.findOne({ propertyId: forcedPropertyId });
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
// Create Commercial Lease Agriculture
const createCommercialLeaseAgriculture = async (req, res) => {
    try {
        const formData = req.body;
        // Prefer authenticated user if available
        // Generate property ID
        const propertyId = await generatePropertyId();
        if (!propertyId) {
            return res.status(500).json({
                success: false,
                message: 'Failed to generate property ID.'
            });
        }
        console.log(propertyId);
        // Add metadata with userId and user (like Sell controller)
        const agricultureData = {
            propertyId,
            ...formData,
            basicInformation: {
                ...formData.basicInformation,
                title: formData.basicInformation.title,
                Type: formData.basicInformation.Type,
                address: {
                    street: formData.basicInformation.address.street,
                    city: formData.basicInformation.address.city,
                    state: formData.basicInformation.address.state,
                    zipCode: formData.basicInformation.address.zipCode
                },
                landmark: formData.basicInformation.landmark,
                location: {
                    latitude: formData.basicInformation.location.latitude,
                    longitude: formData.basicInformation.location.longitude
                },
                isCornerProperty: formData.basicInformation.isCornerProperty,
                powerSupply: formData.basicInformation.powerSupply
            },
            Agriculturelanddetails: {
                ...formData.Agriculturelanddetails,
                totalArea: Number(formData.Agriculturelanddetails.totalArea),
                soilType: formData.Agriculturelanddetails.soilType,
                irrigation: formData.Agriculturelanddetails.irrigation,
                fencing: formData.Agriculturelanddetails.fencing,
                cropSuitability: formData.Agriculturelanddetails.cropSuitability,
                waterSource: formData.Agriculturelanddetails.waterSource,
                legalClearances: formData.Agriculturelanddetails.legalClearances
            },
            leaseTerms: {
                ...formData.leaseTerms,
                leaseAmount: {
                    amount: formData.leaseTerms.leaseAmount.amount,
                    duration: formData.leaseTerms.leaseAmount.duration,
                    durationType: formData.leaseTerms.leaseAmount.durationType,
                    isNegotiable: formData.leaseTerms.leaseAmount.isNegotiable
                },
                leaseTenure: {
                    minimumTenure: formData.leaseTerms.leaseTenure.minimumTenure,
                    minimumUnit: formData.leaseTerms.leaseTenure.minimumUnit,
                    maximumTenure: formData.leaseTerms.leaseTenure.maximumTenure,
                    maximumUnit: formData.leaseTerms.leaseTenure.maximumUnit,
                    lockInPeriod: formData.leaseTerms.leaseTenure.lockInPeriod,
                    lockInUnit: formData.leaseTerms.leaseTenure.lockInUnit,
                    noticePeriod: formData.leaseTerms.leaseTenure.noticePeriod,
                    noticePeriodUnit: formData.leaseTerms.leaseTenure.noticePeriodUnit
                }
            },
            availability: {
                ...formData.availability,
                availableFrom: formData.availability.availableFrom,
                availableImmediately: formData.availability.availableImmediately,
                availabilityStatus: formData.availability.availabilityStatus,
                leaseDuration: formData.availability.leaseDuration,
                noticePeriod: formData.availability.noticePeriod,
                isPetsAllowed: formData.availability.isPetsAllowed,
                operatingHours: formData.availability.operatingHours
            },
            contactInformation: {
                ...formData.contactInformation,
                name: formData.contactInformation.name,
                email: formData.contactInformation.email,
                phone: formData.contactInformation.phone,
                alternatePhone: formData.contactInformation.alternatePhone,
                bestTimeToContact: formData.contactInformation.bestTimeToContact
            },
            media: {
                photos: formData.media.photos,
                videoTour: formData.media.videoTour,
                documents: formData.media.documents,
            },
            metadata: {
                ...formData.metadata,
                createdBy: formData.metadata?.createdBy,
                createdAt: new Date()
            }
        };
        // Create new agriculture lease listing
        const agriculture = new CommercialLeaseAgriculture_1.default(agricultureData);
        await agriculture.save();
        res.status(201).json({
            success: true,
            message: 'Agricultural land lease listing created successfully!',
            data: agriculture
        });
    }
    catch (error) {
        console.error('Error creating commercial lease agriculture:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create agricultural land lease listing',
            error: error instanceof Error ? error.message : error
        });
    }
};
exports.createCommercialLeaseAgriculture = createCommercialLeaseAgriculture;
// Get all Commercial Rent Agriculture
const getAllCommercialLeaseAgriculture = async (req, res) => {
    try {
        const properties = await CommercialLeaseAgriculture_1.default.find({}).sort({ 'metadata.createdAt': -1 });
        res.status(200).json({
            success: true,
            message: 'Agricultural land Rent listings retrieved successfully',
            data: properties
        });
    }
    catch (error) {
        console.error('Error fetching agricultural land Rent listings:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch agricultural land Rent listings'
        });
    }
};
exports.getAllCommercialLeaseAgriculture = getAllCommercialLeaseAgriculture;
// Get Commercial Rent Agriculture by ID
const getCommercialLeaseAgricultureById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await CommercialLeaseAgriculture_1.default.findOne({ propertyId });
        if (!property) {
            return res.status(404).json({
                success: false,
                error: 'Agricultural land Rent property not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Agricultural land Rent property retrieved successfully',
            data: property
        });
    }
    catch (error) {
        console.error('Error fetching agricultural land Rent property:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch agricultural land Rent property'
        });
    }
};
exports.getCommercialLeaseAgricultureById = getCommercialLeaseAgricultureById;
// Update Commercial Rent Agriculture
const updateCommercialLeaseAgriculture = async (req, res) => {
    try {
        const documentId = req.params.id; // This is the _id of the document
        // Validate request body
        const incomingData = req.body?.data;
        if (!incomingData) {
            return res.status(400).json({
                success: false,
                message: "No data provided for update.",
            });
        }
        // Step 1: Clean the incoming data (remove all _id and __v fields)
        const cleanedData = JSON.parse(JSON.stringify(incomingData, (key, value) => {
            if (key === "_id" || key === "__v")
                return undefined;
            return value;
        }));
        // Step 2: Fetch existing document using _id
        const existingDoc = await CommercialLeaseAgriculture_1.default.findById(documentId);
        if (!existingDoc) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }
        const mergedData = lodash_1.default.merge(existingDoc.toObject(), cleanedData);
        const updatedDoc = await CommercialLeaseAgriculture_1.default.findByIdAndUpdate(documentId, { $set: mergedData }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: "Lease Agriculture updated successfully.",
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
exports.updateCommercialLeaseAgriculture = updateCommercialLeaseAgriculture;
const deleteCommercialLeaseAgriculture = async (req, res) => {
    try {
        const leaseAgriculture = await CommercialLeaseAgriculture_1.default.findByIdAndDelete(req.params.id);
        if (!leaseAgriculture) {
            return res.status(404).json({
                success: false,
                message: 'Lease Agriculture listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Lease Agriculture listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting lease Agriculture:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete lease Agriculture listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteCommercialLeaseAgriculture = deleteCommercialLeaseAgriculture;
