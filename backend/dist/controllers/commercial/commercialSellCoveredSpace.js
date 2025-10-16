"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommercialSellCoveredSpace = exports.updateCommercialSellCoveredSpace = exports.getCommercialSellCoveredSpaceById = exports.getAllCommercialSellCoveredSpaces = exports.createCommercialSellCoveredSpace = void 0;
const lodash_1 = __importDefault(require("lodash"));
const CommercialSellCoveredSpace_1 = __importDefault(require("../../models/commercial/CommercialSellCoveredSpace"));
// Helper function to generate a unique property ID
const generatePropertyId = async () => {
    // Prefix for the commercial sell covered space property ID
    const prefix = "RA-COMSECS";
    try {
        // Find the property with the highest property ID number
        const highestProperty = await CommercialSellCoveredSpace_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });
        let nextNumber = 1; // Default start number
        if (highestProperty && highestProperty.propertyId) {
            // Extract the numeric part from the existing highest property ID
            const match = highestProperty.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                // Convert to number and increment by 1
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        // Create the property ID with the sequence number
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        // Check if this exact ID somehow exists (should be rare but possible with manual entries)
        const existingWithExactId = await CommercialSellCoveredSpace_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            // In case of collision (e.g., if IDs were manually entered), recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            // Force increment the next number and try again
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            // Double-check this new ID
            const forcedExisting = await CommercialSellCoveredSpace_1.default.findOne({ propertyId: forcedPropertyId });
            if (forcedExisting) {
                // If still colliding, recursively generate a new ID
                return generatePropertyId();
            }
            return forcedPropertyId;
        }
        return propertyId;
    }
    catch (error) {
        console.error('Error generating property ID:', error);
        // Fallback to timestamp-based ID if there's an error
        const timestamp = Date.now().toString().slice(-8);
        return `${prefix}${timestamp}`;
    }
};
// Create a new commercial sell covered space listing
const createCommercialSellCoveredSpace = async (req, res) => {
    try {
        // Log the incoming request body
        console.log('Received form data:', req.body);
        // Generate a unique property ID
        const propertyId = await generatePropertyId();
        // // Map frontend fields to backend schema
        // const mapPayload = (body: any) => {
        //   // Map registrationCharges.included -> includedInPrice
        //   if (body.propertyDetails && body.propertyDetails.registrationCharges) {
        //     body.propertyDetails.registrationCharges.includedInPrice = body.propertyDetails.registrationCharges.included;
        //     delete body.propertyDetails.registrationCharges.included;
        //   }
        //   // Ensure waterAvailability is an array
        //   if (body.propertyDetails && body.propertyDetails.waterAvailability && !Array.isArray(body.propertyDetails.waterAvailability)) {
        //     body.propertyDetails.waterAvailability = [body.propertyDetails.waterAvailability];
        //   }
        //   // Map area fields in propertyDetails.area
        //   if (body.propertyDetails && body.propertyDetails.area) {
        //     if (body.propertyDetails.area.superBuiltUpAreaSqft !== undefined) {
        //       body.propertyDetails.area.totalArea = Number(body.propertyDetails.area.superBuiltUpAreaSqft) || 0;
        //     }
        //     if (body.propertyDetails.area.builtUpAreaSqft !== undefined) {
        //       body.propertyDetails.area.builtUpArea = Number(body.propertyDetails.area.builtUpAreaSqft) || 0;
        //     }
        //     if (body.propertyDetails.area.carpetAreaSqft !== undefined) {
        //       body.propertyDetails.area.carpetArea = Number(body.propertyDetails.area.carpetAreaSqft) || 0;
        //     }
        //   }
        //   // Map area fields in spaceDetails
        //   if (body.spaceDetails) {
        //     if (body.spaceDetails.totalArea !== undefined) {
        //       body.spaceDetails.totalArea = Number(body.spaceDetails.totalArea) || 0;
        //     }
        //     if (body.spaceDetails.coveredArea !== undefined) {
        //       body.spaceDetails.coveredArea = Number(body.spaceDetails.coveredArea) || 0;
        //     }
        //     if (body.spaceDetails.openArea !== undefined) {
        //       body.spaceDetails.openArea = Number(body.spaceDetails.openArea) || 0;
        //     }
        //     if (body.spaceDetails.roadWidth !== undefined && typeof body.spaceDetails.roadWidth !== 'object') {
        //       body.spaceDetails.roadWidth = Number(body.spaceDetails.roadWidth) || 0;
        //     }
        //     if (body.spaceDetails.ceilingHeight !== undefined && typeof body.spaceDetails.ceilingHeight !== 'object') {
        //       body.spaceDetails.ceilingHeight = Number(body.spaceDetails.ceilingHeight) || 0;
        //     }
        //     if (body.spaceDetails.noOfOpenSides !== undefined && typeof body.spaceDetails.noOfOpenSides !== 'string') {
        //       body.spaceDetails.noOfOpenSides = String(body.spaceDetails.noOfOpenSides);
        //     }
        //   }
        //   // Ensure numbers for floor fields
        //   if (body.propertyDetails && body.propertyDetails.floor) {
        //     if (body.propertyDetails.floor.floorNumber !== undefined) {
        //       body.propertyDetails.floor.floorNumber = Number(body.propertyDetails.floor.floorNumber) || 0;
        //     }
        //     if (body.propertyDetails.floor.totalFloors !== undefined) {
        //       body.propertyDetails.floor.totalFloors = Number(body.propertyDetails.floor.totalFloors) || 0;
        //     }
        //   }
        //   // Ensure numbers for priceDetails
        //   if (body.propertyDetails && body.propertyDetails.priceDetails) {
        //     if (body.propertyDetails.priceDetails.Price !== undefined) {
        //       body.propertyDetails.priceDetails.Price = Number(body.propertyDetails.priceDetails.Price) || 0;
        //     }
        //   }
        //   // Ensure numbers for brokerage amount
        //   if (body.propertyDetails && body.propertyDetails.brokerage) {
        //     if (body.propertyDetails.brokerage.amount !== undefined) {
        //       body.propertyDetails.brokerage.amount = Number(body.propertyDetails.brokerage.amount) || 0;
        //     }
        //   }
        //   // Ensure numbers for registrationCharges
        //   if (body.propertyDetails && body.propertyDetails.registrationCharges) {
        //     if (body.propertyDetails.registrationCharges.amount !== undefined) {
        //       body.propertyDetails.registrationCharges.amount = Number(body.propertyDetails.registrationCharges.amount) || 0;
        //     }
        //     if (body.propertyDetails.registrationCharges.stampDuty !== undefined) {
        //       body.propertyDetails.registrationCharges.stampDuty = Number(body.propertyDetails.registrationCharges.stampDuty) || 0;
        //     }
        //   }
        //   return body;
        // };
        // const mappedBody = mapPayload({ ...req.body });
        // Create a new commercial sell covered space document
        const newCoveredSpace = new CommercialSellCoveredSpace_1.default({
            propertyId,
            ...req.body,
            metadata: {
                ...req.body.metadata,
                createdBy: req.body.metadata.createdBy,
                createdAt: new Date()
            }
        });
        // Save the document to the database
        const savedCoveredSpace = await newCoveredSpace.save();
        // Send success response
        res.status(201).json({
            success: true,
            message: 'Commercial covered space sale listing created successfully',
            data: savedCoveredSpace
        });
    }
    catch (error) {
        // Log the error and request body for debugging
        console.error('Error creating commercial covered space sale listing:', error);
        console.error('Request body that caused the error:', req.body);
        // Send error response
        let details = [];
        if (error.errors) {
            details = Object.values(error.errors).map((err) => err.message);
        }
        else if (Array.isArray(error?.details)) {
            details = error.details;
        }
        else if (typeof error === 'string') {
            details = [error];
        }
        res.status(400).json({
            success: false,
            error: error.message || 'Failed to create commercial covered space sale listing',
            details
        });
    }
};
exports.createCommercialSellCoveredSpace = createCommercialSellCoveredSpace;
const getAllCommercialSellCoveredSpaces = async (req, res) => {
    try {
        const coveredSpaces = await CommercialSellCoveredSpace_1.default.find({});
        res.status(200).json({
            success: true,
            count: coveredSpaces.length,
            data: coveredSpaces
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch commercial covered space sale listings'
        });
    }
};
exports.getAllCommercialSellCoveredSpaces = getAllCommercialSellCoveredSpaces;
const getCommercialSellCoveredSpaceById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await CommercialSellCoveredSpace_1.default.findOne({ propertyId });
        if (!property) {
            return res.status(404).json({ error: 'Commercial sell covered space property not found' });
        }
        res.status(200).json({
            message: 'Commercial sell covered space property retrieved successfully',
            data: property
        });
    }
    catch (error) {
        console.error('Error fetching commercial sell covered space property:', error);
        res.status(500).json({ error: 'Failed to fetch commercial sell covered space property' });
    }
};
exports.getCommercialSellCoveredSpaceById = getCommercialSellCoveredSpaceById;
const updateCommercialSellCoveredSpace = async (req, res) => {
    // Map frontend fields to backend schema for update as well
    const mapPayload = (body) => {
        if (body.propertyDetails && body.propertyDetails.registrationCharges) {
            body.propertyDetails.registrationCharges.includedInPrice = body.propertyDetails.registrationCharges.included;
            delete body.propertyDetails.registrationCharges.included;
        }
        if (body.propertyDetails && body.propertyDetails.waterAvailability && !Array.isArray(body.propertyDetails.waterAvailability)) {
            body.propertyDetails.waterAvailability = [body.propertyDetails.waterAvailability];
        }
        if (body.propertyDetails && body.propertyDetails.area) {
            if (body.propertyDetails.area.superBuiltUpAreaSqft !== undefined) {
                body.propertyDetails.area.totalArea = Number(body.propertyDetails.area.superBuiltUpAreaSqft) || 0;
            }
            if (body.propertyDetails.area.builtUpAreaSqft !== undefined) {
                body.propertyDetails.area.builtUpArea = Number(body.propertyDetails.area.builtUpAreaSqft) || 0;
            }
            if (body.propertyDetails.area.carpetAreaSqft !== undefined) {
                body.propertyDetails.area.carpetArea = Number(body.propertyDetails.area.carpetAreaSqft) || 0;
            }
        }
        if (body.spaceDetails) {
            if (body.spaceDetails.totalArea !== undefined) {
                body.spaceDetails.totalArea = Number(body.spaceDetails.totalArea) || 0;
            }
            if (body.spaceDetails.coveredArea !== undefined) {
                body.spaceDetails.coveredArea = Number(body.spaceDetails.coveredArea) || 0;
            }
            if (body.spaceDetails.openArea !== undefined) {
                body.spaceDetails.openArea = Number(body.spaceDetails.openArea) || 0;
            }
            if (body.spaceDetails.roadWidth !== undefined && typeof body.spaceDetails.roadWidth !== 'object') {
                body.spaceDetails.roadWidth = Number(body.spaceDetails.roadWidth) || 0;
            }
            if (body.spaceDetails.ceilingHeight !== undefined && typeof body.spaceDetails.ceilingHeight !== 'object') {
                body.spaceDetails.ceilingHeight = Number(body.spaceDetails.ceilingHeight) || 0;
            }
            if (body.spaceDetails.noOfOpenSides !== undefined && typeof body.spaceDetails.noOfOpenSides !== 'string') {
                body.spaceDetails.noOfOpenSides = String(body.spaceDetails.noOfOpenSides);
            }
        }
        if (body.propertyDetails && body.propertyDetails.floor) {
            if (body.propertyDetails.floor.floorNumber !== undefined) {
                body.propertyDetails.floor.floorNumber = Number(body.propertyDetails.floor.floorNumber) || 0;
            }
            if (body.propertyDetails.floor.totalFloors !== undefined) {
                body.propertyDetails.floor.totalFloors = Number(body.propertyDetails.floor.totalFloors) || 0;
            }
        }
        if (body.propertyDetails && body.propertyDetails.priceDetails) {
            if (body.propertyDetails.priceDetails.Price !== undefined) {
                body.propertyDetails.priceDetails.Price = Number(body.propertyDetails.priceDetails.Price) || 0;
            }
        }
        if (body.propertyDetails && body.propertyDetails.brokerage) {
            if (body.propertyDetails.brokerage.amount !== undefined) {
                body.propertyDetails.brokerage.amount = Number(body.propertyDetails.brokerage.amount) || 0;
            }
        }
        if (body.propertyDetails && body.propertyDetails.registrationCharges) {
            if (body.propertyDetails.registrationCharges.amount !== undefined) {
                body.propertyDetails.registrationCharges.amount = Number(body.propertyDetails.registrationCharges.amount) || 0;
            }
            if (body.propertyDetails.registrationCharges.stampDuty !== undefined) {
                body.propertyDetails.registrationCharges.stampDuty = Number(body.propertyDetails.registrationCharges.stampDuty) || 0;
            }
        }
        return body;
    };
    req.body = mapPayload({ ...req.body });
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
        const existingDoc = await CommercialSellCoveredSpace_1.default.findById(documentId);
        if (!existingDoc) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }
        const mergedData = lodash_1.default.merge(existingDoc.toObject(), cleanedData);
        const updatedDoc = await CommercialSellCoveredSpace_1.default.findByIdAndUpdate(documentId, { $set: mergedData }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: "Sell Covered space updated successfully.",
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
exports.updateCommercialSellCoveredSpace = updateCommercialSellCoveredSpace;
const deleteCommercialSellCoveredSpace = async (req, res) => {
    try {
        const data = await CommercialSellCoveredSpace_1.default.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Sell covered space listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Sell covered space listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting Sell covered space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete Sell covered space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteCommercialSellCoveredSpace = deleteCommercialSellCoveredSpace;
