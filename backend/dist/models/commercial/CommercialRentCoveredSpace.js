"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema
const CommercialRentCoveredSpaceSchema = new mongoose_1.Schema({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        Type: [{ type: String, required: true }],
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        landmark: { type: String },
        location: {
            latitude: { type: String },
            longitude: { type: String },
        },
        isCornerProperty: { type: Boolean },
    },
    spaceDetails: {
        totalArea: { type: Number, required: true },
        areaUnit: { type: String, required: true },
        coveredArea: { type: Number, required: true },
        openArea: { type: Number, required: true },
        roadWidth: { type: Number, required: true },
        roadWidthUnit: { type: String, required: true },
        ceilingHeight: { type: Number, required: true },
        ceilingHeightUnit: { type: String, required: true },
        noOfOpenSides: { type: Number, required: true }, // ✅ Changed to Number
    },
    propertyDetails: {
        area: {
            totalArea: { type: Number, required: true }, // ✅ Changed to Number
            builtUpArea: { type: Number, required: true }, // ✅ Changed to Number
            carpetArea: { type: Number, required: true }, // ✅ Changed to Number
        },
        floor: {
            floorNumber: { type: Number, required: true },
            totalFloors: { type: Number, required: true },
        },
        facingDirection: { type: String, required: true },
        furnishingStatus: { type: String, required: true },
        propertyAmenities: [{ type: String }],
        wholeSpaceAmenities: [{ type: String }],
        electricitySupply: {
            powerLoad: { type: Number, required: true },
            backup: { type: Boolean, default: false },
        },
        waterAvailability: { type: String, required: true },
        propertyAge: { type: String, required: true },
        propertyCondition: { type: String, required: true },
    },
    rentalTerms: {
        rentDetails: {
            expectedRent: { type: Number, required: true },
            isNegotiable: { type: Boolean, default: false },
            rentType: { type: String, required: true },
        },
        securityDeposit: {
            amount: { type: Number, required: true },
        },
        maintenanceAmount: {
            amount: { type: Number },
            frequency: { type: String },
        },
        otherCharges: {
            water: {
                amount: { type: Number },
                type: { type: String, required: true },
            },
            electricity: {
                amount: { type: Number },
                type: { type: String, required: true },
            },
            gas: {
                amount: { type: Number },
                type: { type: String, required: true },
            },
            others: {
                amount: { type: Number },
                type: { type: String, required: true },
            },
        },
    },
    brokerage: {
        required: { type: String, required: true },
        amount: { type: Number },
    },
    availability: {
        type: { type: String, required: true },
        date: { type: Date, required: false },
    },
    contactInformation: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        alternatePhone: { type: String },
        bestTimeToContact: { type: String },
    },
    media: {
        photos: {
            exterior: { type: [String], default: [] },
            interior: { type: [String], default: [] },
            floorPlan: { type: [String], default: [] },
            washrooms: { type: [String], default: [] },
            lifts: { type: [String], default: [] },
            emergencyExits: { type: [String], default: [] }
        },
        videoTour: { type: String, default: null },
        documents: { type: [String], default: [] }
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Rent' },
        propertyName: { type: String, default: 'Covered Space' },
        status: { type: String, default: 'Available' }
    },
}, {
    timestamps: true,
});
// Export
exports.default = (0, mongoose_1.model)('CommercialRentCoveredSpace', CommercialRentCoveredSpaceSchema);
