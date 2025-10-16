"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSellOfficeSpace = exports.updateSellOfficeSpace = exports.getSellOfficeSpaceById = exports.getAllSellOfficeSpace = exports.createSellOfficeSpace = void 0;
const lodash_1 = __importDefault(require("lodash"));
const CommercialSellOfficeSpace_1 = __importDefault(require("../../models/commercial/CommercialSellOfficeSpace"));
/**
 * Generates a unique property ID for sell office space
 */
const generatePropertyId = async () => {
    try {
        // Prefix for the commercial sell office space property ID
        const prefix = "RA-COMSEOS";
        // Find the office space with the highest property ID number
        const highestOfficeSpace = await CommercialSellOfficeSpace_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });
        let nextNumber = 1; // Default start number
        if (highestOfficeSpace) {
            // Extract the numeric part from the existing highest property ID
            const match = highestOfficeSpace.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                // Convert to number and increment by 1
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        // Create the property ID with the sequence number
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        // Check if this exact ID somehow exists
        const existingWithExactId = await CommercialSellOfficeSpace_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            // In case of collision, recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await CommercialSellOfficeSpace_1.default.findOne({ propertyId: forcedPropertyId });
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
        return `RA-COMSEOS${timestamp}`;
    }
};
/**
 * Create a new sell office space listing
 */
const createSellOfficeSpace = async (req, res) => {
    try {
        const formData = req.body;
        console.log('Received form data:', formData);
        // Generate property ID
        const propertyId = await generatePropertyId();
        // Prepare office space data with all required fields
        const officeSpaceData = {
            propertyId,
            basicInformation: {
                title: formData.basicInformation?.title || "Office Space for Sale",
                Type: formData.basicInformation?.Type || [],
                address: {
                    street: formData.basicInformation?.address?.street || "",
                    city: formData.basicInformation?.address?.city || "",
                    state: formData.basicInformation?.address?.state || "",
                    zipCode: formData.basicInformation?.address?.zipCode || ""
                },
                landmark: formData.basicInformation?.landmark || "",
                location: {
                    latitude: formData.basicInformation?.location?.latitude || 0,
                    longitude: formData.basicInformation?.location?.longitude || 0
                },
                isCornerProperty: formData.basicInformation?.isCornerProperty || false
            },
            officeDetails: {
                seatingCapacity: parseInt(formData.officeDetails?.seatingCapacity) || 0,
                cabins: {
                    available: formData.officeDetails?.cabins?.available || false,
                    count: parseInt(formData.officeDetails?.cabins?.count) || 0
                },
                conferenceRoom: formData.officeDetails?.conferenceRoom || false,
                meetingRoom: formData.officeDetails?.meetingRoom || false,
                receptionArea: formData.officeDetails?.receptionArea || false,
                wifiSetup: formData.officeDetails?.wifiSetup || false,
                serverRoom: formData.officeDetails?.serverRoom || false,
                coworkingFriendly: formData.officeDetails?.coworkingFriendly || false
            },
            propertyDetails: {
                area: {
                    totalArea: parseInt(formData.propertyDetails?.area?.totalArea) || 0,
                    carpetArea: parseInt(formData.propertyDetails?.area?.carpetArea) || 0,
                    builtUpArea: parseInt(formData.propertyDetails?.area?.builtUpArea) || 0
                },
                floor: {
                    floorNumber: parseInt(formData.propertyDetails?.floor?.floorNumber) || 0,
                    totalFloors: parseInt(formData.propertyDetails?.floor?.totalFloors) || 0
                },
                facingDirection: formData.propertyDetails?.facingDirection || "",
                furnishingStatus: formData.propertyDetails?.furnishingStatus || "",
                propertyAmenities: formData.propertyDetails?.propertyAmenities || [],
                wholeSpaceAmenities: formData.propertyDetails?.wholeSpaceAmenities || [],
                electricitySupply: {
                    powerLoad: parseInt(formData.propertyDetails?.electricitySupply?.powerLoad) || 0,
                    backup: formData.propertyDetails?.electricitySupply?.backup || false
                },
                waterAvailability: formData.propertyDetails?.waterAvailability || [],
                propertyAge: parseInt(formData.propertyDetails?.propertyAge) || 0,
                propertyCondition: formData.propertyDetails?.propertyCondition || "new"
            },
            pricingDetails: {
                propertyPrice: parseInt(formData.pricingDetails?.propertyPrice) || 0, // Ensure correct mapping from frontend
                pricetype: formData.pricingDetails?.pricetype || 'fixed'
            },
            registration: {
                chargestype: formData.registrationCharges?.chargestype || 'inclusive',
                registrationAmount: parseInt(formData.registrationCharges?.registrationAmount) || 0,
                stampDutyAmount: parseInt(formData.registrationCharges?.stampDutyAmount) || 0
            },
            brokerage: {
                required: formData.brokerage?.required || "no",
                amount: parseInt(formData.brokerage?.amount) || 0
            },
            availability: {
                type: formData.availability?.type || "immediate",
                date: formData.availability?.date || null
            },
            contactInformation: {
                name: formData.contactInformation?.name || "",
                email: formData.contactInformation?.email || "",
                phone: formData.contactInformation?.phone || "",
                alternatePhone: formData.contactInformation?.alternatePhone || "",
                bestTimeToContact: formData.contactInformation?.bestTimeToContact || ""
            },
            media: {
                photos: {
                    exterior: formData.media?.photos?.exterior || [],
                    interior: formData.media?.photos?.interior || [],
                    floorPlan: formData.media?.photos?.floorPlan || [],
                    washrooms: formData.media?.photos?.washrooms || [],
                    lifts: formData.media?.photos?.lifts || [],
                    emergencyExits: formData.media?.photos?.emergencyExits || []
                },
                videoTour: formData.media?.videoTour || "",
                documents: formData.media?.documents || []
            },
            metadata: {
                ...formData.metadata,
                createdBy: formData.metadata.createdBy,
                createdAt: new Date()
            }
        };
        console.log('Prepared sell office space data:', officeSpaceData);
        // Create new sell office space listing
        const officeSpace = new CommercialSellOfficeSpace_1.default(officeSpaceData);
        await officeSpace.save();
        console.log('Sell office space saved successfully:', officeSpace);
        res.status(201).json({
            success: true,
            message: 'Sell office space listing created successfully',
            data: officeSpace
        });
    }
    catch (error) {
        console.error('Error creating sell office space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create sell office space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.createSellOfficeSpace = createSellOfficeSpace;
const getAllSellOfficeSpace = async (req, res) => {
    try {
        const officespace = await CommercialSellOfficeSpace_1.default.find({});
        res.status(200).json({
            success: true,
            count: officespace.length,
            data: officespace
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch commercial office space sale listings'
        });
    }
};
exports.getAllSellOfficeSpace = getAllSellOfficeSpace;
const getSellOfficeSpaceById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await CommercialSellOfficeSpace_1.default.findOne({ propertyId });
        if (!property) {
            return res.status(404).json({ error: 'Commercial sell office space property not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Commercial sell office space property retrieved successfully',
            data: property
        });
    }
    catch (error) {
        console.error('Error fetching commercial sell office space property:', error);
        res.status(500).json({ error: 'Failed to fetch commercial sell office space property' });
    }
};
exports.getSellOfficeSpaceById = getSellOfficeSpaceById;
const updateSellOfficeSpace = async (req, res) => {
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
        const existingDoc = await CommercialSellOfficeSpace_1.default.findById(documentId);
        if (!existingDoc) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }
        const mergedData = lodash_1.default.merge(existingDoc.toObject(), cleanedData);
        const updatedDoc = await CommercialSellOfficeSpace_1.default.findByIdAndUpdate(documentId, { $set: mergedData }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: "Sell office space updated successfully.",
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
exports.updateSellOfficeSpace = updateSellOfficeSpace;
const deleteSellOfficeSpace = async (req, res) => {
    try {
        const data = await CommercialSellOfficeSpace_1.default.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Sell office space listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Sell office space listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting Sell office space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete Sell office space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteSellOfficeSpace = deleteSellOfficeSpace;
