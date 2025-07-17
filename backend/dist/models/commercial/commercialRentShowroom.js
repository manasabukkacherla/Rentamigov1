"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommercialRentShowroom = void 0;
const mongoose_1 = require("mongoose");
;
// Schema
const CommercialRentShowroomSchema = new mongoose_1.Schema({
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
        isCornerProperty: { type: Boolean, default: false }
    },
    showroomDetails: {
        totalSpace: { type: Number, required: true },
        frontageWidth: { type: Number, required: true },
        ceilingHeight: { type: Number, required: true },
        glassFrontage: { type: Boolean, default: false },
        lightingType: { type: String },
        acInstalled: { type: Boolean, default: false },
        nearbyCompetitors: {
            present: { type: Boolean, default: false },
            brandNames: { type: String }
        },
        displayRacks: { type: Boolean, default: false }
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
        facingDirection: { type: String, required: false },
        furnishingStatus: { type: String, required: false },
        propertyAmenities: [{ type: String, required: false }],
        wholeSpaceAmenities: [{ type: String, required: false }],
        electricitySupply: {
            powerLoad: { type: Number, required: false, default: null },
            backup: { type: Boolean, default: false }
        },
        waterAvailability: { type: String, required: true },
        propertyAge: { type: String, required: true },
        propertyCondition: { type: String, required: false, default: 'new' }
    },
    rentalTerms: {
        expectedRent: { type: Number, required: true },
        rentType: { type: String, enum: ['inclusive', 'exclusive'], required: true },
        isNegotiable: { type: Boolean, default: false },
        securityDeposit: {
            amount: { type: Number, required: true },
            depositType: { type: String }
        },
        maintenanceCharges: {
            amount: { type: Number, required: false },
            frequency: {
                type: String,
                enum: ['monthly', 'quarterly', 'yearly', 'half-yearly', ''],
                required: false,
            }
        },
        otherCharges: {
            water: {
                amount: { type: Number, required: false },
                type: { type: String, required: true }
            },
            electricity: {
                amount: { type: Number, required: false },
                type: { type: String, required: true }
            },
            gas: {
                amount: { type: Number, required: false },
                type: { type: String, required: true }
            },
            others: {
                amount: { type: Number, required: false },
                type: { type: String, required: true }
            },
        },
    },
    brokerage: {
        required: { type: Boolean, default: false },
        amount: { type: Number, required: false }
    },
    availability: {
        type: { type: String, default: "immediate" },
        date: { type: Date },
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
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Rent' },
        propertyName: { type: String, default: 'Showroom' },
        status: { type: String, default: 'Available' }
    }
}, {
    timestamps: true
});
// Indexes
// CommercialRentShowroomSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialRentShowroomSchema.index({ 'basicInformation.city': 1 });
CommercialRentShowroomSchema.index({ 'basicInformation.state': 1 });
CommercialRentShowroomSchema.index({ 'rentalTerms.expectedRent': 1 });
CommercialRentShowroomSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialRentShowroomSchema.index({ 'metadata.createdAt': -1 });
// Export model and interfaces
exports.CommercialRentShowroom = (0, mongoose_1.model)('CommercialRentShowroom', CommercialRentShowroomSchema);
