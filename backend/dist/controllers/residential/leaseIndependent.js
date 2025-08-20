"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLeaseIndependentHouse = exports.updateLeaseIndependentHouse = exports.getLeaseIndependentHouseById = exports.getAllLeaseIndependentHouses = exports.createLeaseIndependentHouse = void 0;
const residentialLeaseIndependentHouse_1 = __importDefault(require("../../models/residential/residentialLeaseIndependentHouse"));
const lodash_1 = __importDefault(require("lodash"));
const generatePropertyId = async () => {
    try {
        const prefix = "RA-RESLEIH";
        const highestShowroom = await residentialLeaseIndependentHouse_1.default.findOne({
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
        const existingWithExactId = await residentialLeaseIndependentHouse_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await residentialLeaseIndependentHouse_1.default.findOne({ propertyId: forcedPropertyId });
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
        return `RA-RESLEIH${timestamp}`;
    }
};
const createLeaseIndependentHouse = async (req, res) => {
    try {
        const formData = req.body;
        const propertyId = await generatePropertyId();
        console.log("formData", formData);
        console.log("propertyId", propertyId);
        const propertyData = JSON.parse(JSON.stringify({
            ...req.body,
            propertyId,
            metadata: {
                ...req.body.metadata,
                createdAt: new Date()
            }
        }));
        const property = new residentialLeaseIndependentHouse_1.default(propertyData);
        console.log("propertyData", propertyData);
        await property.save();
        res.status(201).json({
            success: true,
            message: 'Lease Independent House created successfully',
            data: property,
        });
    }
    catch (error) {
        console.error('Error creating lease independent house:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create lease independent house',
        });
    }
};
exports.createLeaseIndependentHouse = createLeaseIndependentHouse;
const getAllLeaseIndependentHouses = async (req, res) => {
    try {
        const properties = await residentialLeaseIndependentHouse_1.default.find({}).sort({ 'metadata.createdAt': -1 });
        res.status(200).json({
            success: true,
            message: 'Fetched all independent house leases successfully',
            data: properties,
        });
    }
    catch (error) {
        console.error('Error fetching houses:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch independent house leases',
        });
    }
};
exports.getAllLeaseIndependentHouses = getAllLeaseIndependentHouses;
const getLeaseIndependentHouseById = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await residentialLeaseIndependentHouse_1.default.findOne({ propertyId });
        if (!property) {
            return res.status(404).json({
                success: false,
                error: 'Lease Independent House not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Lease Independent House fetched successfully',
            data: property,
        });
    }
    catch (error) {
        console.error('Error fetching house:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch lease independent house',
        });
    }
};
exports.getLeaseIndependentHouseById = getLeaseIndependentHouseById;
const updateLeaseIndependentHouse = async (req, res) => {
    try {
        const id = req.params._id;
        const incomingData = req.body?.data;
        if (!incomingData) {
            return res.status(400).json({ success: false, message: 'No data provided for update' });
        }
        const cleanedData = JSON.parse(JSON.stringify(incomingData, (key, value) => (['_id', '__v'].includes(key) ? undefined : value)));
        const existing = await residentialLeaseIndependentHouse_1.default.findById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        const merged = lodash_1.default.merge(existing.toObject(), cleanedData);
        const updated = await residentialLeaseIndependentHouse_1.default.findByIdAndUpdate(id, { $set: merged }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ success: true, message: 'Updated successfully', data: updated });
    }
    catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ success: false, message: 'Failed to update lease independent house' });
    }
};
exports.updateLeaseIndependentHouse = updateLeaseIndependentHouse;
const deleteLeaseIndependentHouse = async (req, res) => {
    try {
        const deleted = await residentialLeaseIndependentHouse_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    }
    catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete lease independent house' });
    }
};
exports.deleteLeaseIndependentHouse = deleteLeaseIndependentHouse;
