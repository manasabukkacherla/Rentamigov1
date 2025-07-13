"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema
const CommercialShowroomSchema = new mongoose_1.Schema({
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
        landmark: { type: String, required: true },
        location: {
            latitude: { type: String, required: true },
            longitude: { type: String, required: true },
        },
        isCornerProperty: { type: Boolean }
    },
    showroomDetails: {
        totalSpace: { type: Number, required: true },
        frontageWidth: { type: Number, required: true },
        ceilingHeight: { type: Number, required: true },
        glassFrontage: { type: Boolean, default: false },
        lightingType: { type: String, enum: ['warm', 'cool', 'natural', 'immediate', ``] },
        acInstalled: { type: Boolean, default: false },
        nearbyCompetitors: {
            present: { type: Boolean, default: false },
            brandNames: { type: String }
        },
        displayRacks: { type: Boolean, default: false },
    },
    propertyDetails: {
        area: {
            totalArea: { type: Number, required: true },
            carpetArea: { type: Number, required: true },
            builtUpArea: { type: Number, required: true }
        },
        floor: {
            floorNumber: { type: Number, required: true },
            totalFloors: { type: Number, required: true }
        },
        facingDirection: { type: String },
        furnishingStatus: { type: String },
        propertyAmenities: [{ type: String }],
        wholeSpaceAmenities: [{ type: String }],
        electricitySupply: {
            powerLoad: { type: Number },
            backup: { type: Boolean, default: false }
        },
        waterAvailability: [{ type: String }],
        propertyAge: { type: String },
        propertyCondition: { type: String }
    },
    pricingDetails: {
        propertyPrice: { type: Number, required: true },
        pricetype: { type: String, enum: ['fixed', 'negotiable'], required: true },
        area: { type: Number, required: true },
        totalprice: { type: Number, required: true },
        pricePerSqft: { type: Number, required: true }
    },
    registration: {
        chargestype: { type: String, enum: ['inclusive', 'exclusive'], required: true },
        registrationAmount: { type: Number },
        stampDutyAmount: { type: Number }
    },
    brokerage: {
        required: { type: String, enum: ['yes', 'no'], required: true },
        amount: { type: Number }
    },
    availability: {
        availableFrom: { type: String },
        availableImmediately: { type: Boolean, required: true },
        leaseDuration: { type: String, required: true },
        noticePeriod: { type: String, required: true },
        petsAllowed: { type: Boolean, default: false },
        operatingHours: {
            restricted: { type: Boolean, required: true },
            restrictions: { type: String }
        }
    },
    contactInformation: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        alternatePhone: { type: String },
        bestTimeToContact: { type: String }
    },
    media: {
        photos: {
            exterior: [{ type: String }],
            interior: [{ type: String }],
            floorPlan: [{ type: String }],
            washrooms: [{ type: String }],
            lifts: [{ type: String }],
            emergencyExits: [{ type: String }]
        },
        videoTour: { type: String },
        documents: [{ type: String }]
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Sell' },
        propertyName: { type: String, default: 'Showroom' },
        status: { type: String, default: 'Available' }
    }
}, {
    timestamps: true
});
// Indexes
// CommercialShowroomSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialShowroomSchema.index({ 'basicInformation.city': 1 });
CommercialShowroomSchema.index({ 'basicInformation.state': 1 });
CommercialShowroomSchema.index({ 'pricingDetails.propertyPrice': 1 });
CommercialShowroomSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialShowroomSchema.index({ 'metadata.createdAt': -1 });
exports.default = (0, mongoose_1.model)('CommercialsellShowroom', CommercialShowroomSchema);
