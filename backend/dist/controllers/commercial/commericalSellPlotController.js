"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSellPlotById = exports.getPlotById = exports.getAllPlots = exports.createPlot = void 0;
const commercialsellplot_1 = __importDefault(require("../../models/commercial/commercialsellplot"));
const generatePropertyId = async () => {
    try {
        const prefix = "RA-COMSEPL";
        const highestPlot = await commercialsellplot_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });
        let nextNumber = 1;
        if (highestPlot) {
            const match = highestPlot.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        const existingWithExactId = await commercialsellplot_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await commercialsellplot_1.default.findOne({ propertyId: forcedPropertyId });
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
        return `RA-COMSEPL${timestamp}`;
    }
};
const transformPlotData = (formData) => {
    // Create a transformed plot object that matches our schema
    const transformedData = {};
    // Basic Information
    if (formData.basicInformation) {
        transformedData.basicInformation = {
            title: formData.basicInformation.title,
            Type: Array.isArray(formData.basicInformation.Type)
                ? formData.basicInformation.Type[0]
                : formData.basicInformation.Type || 'Commercial',
            address: formData.basicInformation.address.street,
            landmark: formData.basicInformation.landmark,
            city: formData.basicInformation.address.city,
            state: formData.basicInformation.address.state,
            zipCode: formData.basicInformation.address.zipCode,
            latitude: (formData.basicInformation.location.latitude) || "",
            longitude: (formData.basicInformation.location.longitude) || "",
            isCornerProperty: formData.basicInformation.isCornerProperty
        };
    }
    // Plot Details
    if (formData.plotDetails) {
        // Ensure totalArea is always set with a valid number
        const totalArea = formData.plotDetails.totalArea || 0;
        // Ensure zoningType is set with a valid string value
        const zoningType = formData.plotDetails.zoningType ||
            'commercial';
        transformedData.plotDetails = {
            totalArea: totalArea,
            zoningType: zoningType,
            boundaryWall: Boolean(formData.plotDetails.boundaryWall),
            waterSewer: formData.plotDetails.waterSewer || false,
            electricity: formData.plotDetails.electricity || false,
            roadAccess: formData.plotDetails.roadAccess || '',
            securityRoom: formData.plotDetails.securityRoom || false,
            previousConstruction: formData.plotDetails.previousConstruction || false,
        };
    }
    else {
        // If plotDetails is missing, create a minimal object with required fields
        transformedData.plotDetails = {
            totalArea: 0,
            zoningType: 'commercial',
            boundaryWall: false,
            waterSewer: false,
            electricity: false,
            roadAccess: '',
            securityRoom: false,
            previousConstruction: false,
        };
    }
    // Pricing Details
    if (formData.pricingDetails) {
        transformedData.pricingDetails = {
            propertyPrice: formData.pricingDetails.propertyPrice || 0,
            priceType: formData.pricingDetails.priceType || 'fixed',
            area: formData.pricingDetails.area || 0,
            totalPrice: formData.pricingDetails.totalPrice || 0,
            pricePerSqFt: formData.pricingDetails.pricePerSqft || 0
        };
    }
    else {
        transformedData.pricingDetails = {
            propertyPrice: 0,
            priceType: 'fixed',
            area: 0,
            totalPrice: 0,
            pricePerSqFt: 0
        };
    }
    // Registration - this is missing in many cases, so ensure it's always defined
    // Availability
    if (formData.availability) {
        transformedData.availability = {
            availableFrom: formData.availability.availableFrom,
            availabilityStatus: formData.availability.availableImmediately ? 'immediate' : 'later',
            possessionDate: formData.availability.availableFrom ? new Date(formData.availability.availableFrom).toISOString() : new Date().toISOString(),
            availableImmediately: formData.availability.availableImmediately,
            leaseDuration: formData.availability.leaseDuration || '',
            noticePeriod: formData.availability.noticePeriod || '',
            petsAllowed: Boolean(formData.availability.petsAllowed),
            operatingHours: formData.availability.operatingHours || { restricted: false, restrictions: '' },
            bookingAmount: 0
        };
    }
    else {
        transformedData.availability = {
            availabilityStatus: 'later',
            possessionDate: new Date().toISOString(),
            bookingAmount: 0
        };
    }
    // Contact Information
    if (formData.contactInformation) {
        transformedData.contactInformation = {
            name: formData.contactInformation.name,
            email: formData.contactInformation.email,
            phone: formData.contactInformation.phone,
            alternatePhone: formData.contactInformation.alternatePhone || '',
            bestTimeToContact: formData.contactInformation.bestTimeToContact || ''
        };
    }
    else {
        transformedData.contactInformation = {
            name: 'Not provided',
            email: 'info@rentamigo.com',
            phone: '0000000000'
        };
    }
    // Media
    if (formData.media) {
        transformedData.media = {
            photos: {
                plot: [
                    ...(formData.media.photos?.exterior || []),
                    ...(formData.media.photos?.interior || [])
                ],
                surroundings: [
                    ...(formData.media.photos?.landscape || []),
                    ...(formData.media.photos?.adjacent || []),
                    ...(formData.media.photos?.aerialView || [])
                ],
                documents: formData.media.documents || [],
                floorPlans: formData.media.photos?.floorPlan || []
            },
            videoTour: formData.media.videoTour
        };
    }
    else {
        transformedData.media = {
            photos: {
                plot: [],
                surroundings: [],
                documents: []
            }
        };
    }
    // Metadata
    if (formData.metadata) {
        transformedData.metadata = {
            createdBy: formData.metadata.createdBy,
            createdAt: formData.metadata.createdAt || new Date()
        };
    }
    console.log("Transformed data:", JSON.stringify(transformedData, null, 2));
    return transformedData;
};
// Create a new commercial plot listing
const createPlot = async (req, res) => {
    try {
        const formData = req.body;
        console.log('Received plot data:', formData);
        // Validate required fields
        if (!formData.basicInformation || !formData.basicInformation.title) {
            return res.status(400).json({
                success: false,
                error: 'Property name is required'
            });
        }
        // Transform frontend data to match backend schema
        const transformedData = transformPlotData(formData);
        // Generate property ID
        const propertyId = await generatePropertyId();
        // Create the complete plot data
        const plotData = {
            propertyId,
            ...transformedData
        };
        // Create and save the plot
        const newPlot = new commercialsellplot_1.default(plotData);
        const savedPlot = await newPlot.save();
        // Return populated plot data with user information
        const populatedPlot = await commercialsellplot_1.default.findById(savedPlot._id)
            .populate('metadata.createdBy', 'name email')
            .select('-__v');
        res.status(201).json({
            success: true,
            message: 'Commercial plot listing created successfully',
            data: populatedPlot
        });
    }
    catch (error) {
        console.error('Error creating plot:', error);
        res.status(400).json({
            success: false,
            error: 'Failed to create plot',
            message: error.message
        });
    }
};
exports.createPlot = createPlot;
// Get all commercial plots
const getAllPlots = async (req, res) => {
    try {
        const plots = await commercialsellplot_1.default.find()
            .populate('metadata.createdBy', 'name email')
            .select('-__v')
            .sort({ 'metadata.createdAt': -1 });
        res.status(200).json({
            success: true,
            count: plots.length,
            data: plots
        });
    }
    catch (error) {
        console.error('Error fetching plots:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve plots',
            message: error.message
        });
    }
};
exports.getAllPlots = getAllPlots;
// Get a specific commercial plot by ID
const getPlotById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const plot = await commercialsellplot_1.default.findOne({ propertyId })
            .populate('metadata.createdBy', 'name email')
            .select('-__v');
        if (!plot) {
            return res.status(404).json({
                success: false,
                error: 'Plot not found'
            });
        }
        res.status(200).json({
            success: true,
            data: plot
        });
    }
    catch (error) {
        console.error('Error fetching plot:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve plot',
            message: error.message
        });
    }
};
exports.getPlotById = getPlotById;
const deleteSellPlotById = async (req, res) => {
    try {
        const data = await commercialsellplot_1.default.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'sell plot listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'sell plot listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting sell plot:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete sell plot listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteSellPlotById = deleteSellPlotById;
