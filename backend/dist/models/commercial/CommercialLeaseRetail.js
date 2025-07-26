"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema
const CommercialLeaseRetailStoreSchema = new mongoose_1.Schema({
    propertyId: { type: String, unique: true },
    basicInformation: {
        title: { type: String },
        Type: [{ type: String }],
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipCode: { type: String },
        },
        landmark: { type: String },
        location: {
            latitude: { type: String },
            longitude: { type: String },
        },
        isCornerProperty: { type: Boolean }
    },
    retailStoreDetails: {
        location: { type: String },
        anchorStores: { type: Boolean, default: false },
        footfallData: { type: String },
        signageAllowed: { type: Boolean, default: false },
        sharedWashrooms: { type: Boolean, default: false },
        fireExit: { type: Boolean, default: false }
    },
    propertyDetails: {
        area: {
            totalArea: { type: Number },
            builtUpArea: { type: Number },
            carpetArea: { type: Number },
        },
        floor: {
            floorNumber: { type: Number },
            totalFloors: { type: Number },
        },
        facingDirection: { type: String },
        furnishingStatus: { type: String },
        propertyAmenities: [{ type: String }],
        wholeSpaceAmenities: [{ type: String }],
        electricitySupply: {
            powerLoad: { type: Number },
            backup: { type: Boolean, default: false },
        },
        waterAvailability: { type: String },
        propertyAge: { type: String },
        propertyCondition: { type: String },
    },
    leaseTerms: {
        leaseDetails: {
            leaseAmount: {
                amount: { type: Number },
                type: { type: String },
                duration: { type: Number },
                durationUnit: { type: String },
            },
        },
        tenureDetails: {
            minimumTenure: { type: String },
            minimumUnit: { type: String },
            lockInPeriod: { type: String },
            lockInUnit: { type: String },
            noticePeriod: { type: String },
            noticePeriodUnit: { type: String },
        },
        maintenanceAmount: {
            amount: { type: Number },
            frequency: { type: String },
        },
        otherCharges: {
            water: {
                amount: { type: Number },
                type: { type: String },
            },
            electricity: {
                amount: { type: Number },
                type: { type: String },
            },
            gas: {
                amount: { type: Number },
                type: { type: String },
            },
            others: {
                amount: { type: Number },
                type: { type: String },
            }
        },
        brokerage: {
            required: { type: String },
            amount: { type: Number }
        },
        availability: {
            date: { type: Date },
            availableImmediately: { type: Boolean },
            preferredSaleDuration: { type: String },
            noticePeriod: { type: String },
            isPetsAllowed: { type: Boolean },
            operatingHours: { type: Boolean },
        }
    },
    contactInformation: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
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
        intent: { type: String, default: 'Lease' },
        propertyName: { type: String, default: 'Retail' },
        status: { type: String, default: 'Available' }
    }
}, {
    timestamps: true
});
// Indexes
// CommercialLeaseRetailStoreSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialLeaseRetailStoreSchema.index({ 'basicInformation.city': 1 });
CommercialLeaseRetailStoreSchema.index({ 'basicInformation.state': 1 });
CommercialLeaseRetailStoreSchema.index({ 'metadata.createdAt': -1 });
exports.default = (0, mongoose_1.model)('CommercialLeaseRetail', CommercialLeaseRetailStoreSchema);
