"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIndependentHouses = exports.deleteRentIndependentHouse = exports.updateRentIndependentHouse = exports.getRentIndependentHouseById = exports.getAllRentIndependentHouses = exports.createRentIndependentHouse = void 0;
const residentialRentIndependent_1 = __importDefault(require("../../models/residential/residentialRentIndependent"));
const generatePropertyId = async () => {
    try {
        const prefix = "RA-RESREIH";
        const highestShowroom = await residentialRentIndependent_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });
        let nextNumber = 1;
        if (highestShowroom) {
            const match = highestShowroom.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        const existingWithExactId = await residentialRentIndependent_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await residentialRentIndependent_1.default.findOne({ propertyId: forcedPropertyId });
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
        return `RA-RESREAP${timestamp}`;
    }
};
// Create a new apartment listing
const createRentIndependentHouse = async (req, res) => {
    try {
        const propertyId = await generatePropertyId();
        const independentHouseData = {
            ...req.body,
            propertyId,
            metadata: {
                ...req.body.metadata,
                createdAt: new Date()
            }
        };
        // Initialize media structure if not present
        if (!independentHouseData.media) {
            independentHouseData.media = {
                photos: {
                    exterior: [],
                    interior: [],
                    floorPlan: [],
                    washrooms: [],
                    lifts: [],
                    emergencyExits: [],
                    bedrooms: [],
                    halls: [],
                    storerooms: [],
                    kitchen: []
                },
                documents: [],
                videoTour: '',
                mediaItems: [] // Initialize empty mediaItems array
            };
            console.log('Initialized empty media structure in createRentIndependentHouse');
        }
        else {
            // Ensure all required media properties exist
            if (!independentHouseData.media.photos) {
                independentHouseData.media.photos = {};
            }
            // Initialize photo categories
            ['exterior', 'interior', 'floorPlan', 'washrooms', 'lifts',
                'emergencyExits', 'bedrooms', 'halls', 'storerooms', 'kitchen'].forEach(category => {
                if (!independentHouseData.media.photos[category]) {
                    independentHouseData.media.photos[category] = [];
                }
            });
            // Initialize other media properties
            if (!independentHouseData.media.documents)
                independentHouseData.media.documents = [];
            if (!independentHouseData.media.videoTour)
                independentHouseData.media.videoTour = '';
            if (!independentHouseData.media.mediaItems) {
                independentHouseData.media.mediaItems = [];
                console.log('Initialized empty mediaItems array in existing media');
            }
        }
        console.log('Independent house data before save:', JSON.stringify({
            propertyId: independentHouseData.propertyId,
            mediaItemsLength: independentHouseData.media?.mediaItems?.length || 0
        }));
        const independentHouse = new residentialRentIndependent_1.default(independentHouseData);
        // Explicitly ensure mediaItems is set
        if (!independentHouse.media.mediaItems) {
            independentHouse.media.mediaItems = [];
        }
        await independentHouse.save();
        // Verify mediaItems was saved correctly
        const savedIndependentHouse = await residentialRentIndependent_1.default.findOne({ propertyId });
        console.log('Saved independent house mediaItems:', savedIndependentHouse?.media?.mediaItems?.length || 0);
        res.status(201).json({
            success: true,
            message: 'Independent house listing created successfully',
            data: independentHouse
        });
    }
    catch (error) {
        console.error('Error creating independent house listing:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create independent house listing',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.createRentIndependentHouse = createRentIndependentHouse;
const getAllRentIndependentHouses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Build filter object based on query parameters
        const filters = {};
        if (req.query.city)
            filters['basicInformation.address.city'] = req.query.city;
        if (req.query.state)
            filters['basicInformation.address.state'] = req.query.state;
        if (req.query.minPrice)
            filters.price = { $gte: parseInt(req.query.minPrice) };
        if (req.query.maxPrice)
            filters.price = { ...filters.price, $lte: parseInt(req.query.maxPrice) };
        if (req.query.bedrooms)
            filters['propertyDetails.bedrooms'] = parseInt(req.query.bedrooms);
        if (req.query.propertyType)
            filters.propertyType = req.query.propertyType;
        const builderFloors = await residentialRentIndependent_1.default.find(filters)
            .skip(skip)
            .limit(limit)
            .sort({ 'metadata.createdAt': -1 });
        const total = await residentialRentIndependent_1.default.countDocuments(filters);
        res.status(200).json({
            success: true,
            data: builderFloors,
            pagination: {
                current: page,
                total: Math.ceil(total / limit),
                totalRecords: total
            }
        });
    }
    catch (error) {
        console.error('Error fetching independent houses:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch independent houses',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.getAllRentIndependentHouses = getAllRentIndependentHouses;
const getRentIndependentHouseById = async (req, res) => {
    try {
        const independentHouse = await residentialRentIndependent_1.default.findOne({ propertyId: req.params.propertyId });
        if (!independentHouse) {
            return res.status(404).json({
                success: false,
                message: 'Independent House not found'
            });
        }
        res.status(200).json({
            success: true,
            data: independentHouse
        });
    }
    catch (error) {
        console.error('Error fetching independent house:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch independent house',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.getRentIndependentHouseById = getRentIndependentHouseById;
const updateRentIndependentHouse = async (req, res) => {
    try {
        const independentHouse = await residentialRentIndependent_1.default.findById(req.params.id);
        const userId = req.body.userId;
        if (!independentHouse) {
            return res.status(404).json({
                success: false,
                message: 'Independent House not found'
            });
        }
        if (independentHouse.metadata?.createdBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this listing'
            });
        }
        const updatedIndependentHouse = await residentialRentIndependent_1.default.findByIdAndUpdate(req.params.id, {
            ...req.body,
            metadata: {
                ...independentHouse.metadata,
                updatedAt: new Date()
            }
        }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: 'Independent House listing updated successfully',
            data: updatedIndependentHouse
        });
    }
    catch (error) {
        console.error('Error updating independent house:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update independent house',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.updateRentIndependentHouse = updateRentIndependentHouse;
const deleteRentIndependentHouse = async (req, res) => {
    try {
        const independentHouse = await residentialRentIndependent_1.default.findById(req.params.id);
        const userId = req.body.userId;
        if (!independentHouse) {
            return res.status(404).json({
                success: false,
                message: 'Independent House not found'
            });
        }
        if (independentHouse.metadata?.createdBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this listing'
            });
        }
        await independentHouse.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Independent House listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting apartment:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete independent house',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.deleteRentIndependentHouse = deleteRentIndependentHouse;
// Get apartments by user
const getUserIndependentHouses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const userId = req.body.userId;
        const independentHouses = await residentialRentIndependent_1.default.find({
            'metadata.createdBy': userId
        })
            .skip(skip)
            .limit(limit)
            .sort({ 'metadata.createdAt': -1 });
        const total = await residentialRentIndependent_1.default.countDocuments({
            'metadata.createdBy': userId
        });
        res.status(200).json({
            success: true,
            data: independentHouses,
            pagination: {
                current: page,
                total: Math.ceil(total / limit),
                totalRecords: total
            }
        });
    }
    catch (error) {
        console.error('Error fetching user independent houses:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user independent houses',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};
exports.getUserIndependentHouses = getUserIndependentHouses;
