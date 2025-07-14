"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema
const CommercialLeaseWarehouseSchema = new mongoose_1.Schema({
    propertyId: { type: String, unique: false },
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
    coveredSpaceDetails: {
        totalArea: { type: Number },
        ceilingHeight: { type: Number },
        loadingDocks: { type: Number, default: 0 },
        dockHeight: { type: Number },
        floorload: { type: Number },
        firesafety: { type: Boolean, default: false },
        security: { type: Boolean, default: false },
        access247: { type: Boolean, default: false },
        truckparking: { type: Boolean, default: false },
        parking: { type: Boolean, default: false }
    },
    propertyDetails: {
        area: {
            totalArea: { type: Number },
            builtUpArea: { type: Number },
            carpetArea: { type: Number }
        },
        floor: {
            floorNumber: { type: Number },
            totalFloors: { type: Number }
        },
        facingDirection: { type: String },
        furnishingStatus: { type: String },
        propertyAmenities: [{ type: String }],
        wholeSpaceAmenities: [{ type: String }],
        electricitySupply: {
            powerLoad: { type: Number },
            backup: { type: Boolean, default: false }
        },
        propertyAge: { type: String },
        propertyCondition: { type: String }
    },
    leaseTerms: {
        leaseDetails: {
            leaseAmount: {
                amount: { type: Number },
                type: { type: String, enum: ['Fixed', 'Negotiable'] },
                duration: { type: Number },
                durationUnit: { type: String }
            }
        },
        tenureDetails: {
            minimumTenure: { type: Number },
            minimumUnit: { type: String },
            maximumTenure: { type: Number },
            maximumUnit: { type: String },
            lockInPeriod: { type: Number },
            lockInUnit: { type: String },
            noticePeriod: { type: Number },
            noticePeriodUnit: { type: String }
        },
        maintenanceAmount: {
            amount: { type: Number },
            frequency: { type: String, enum: ['Monthly', 'Quarterly', 'Yearly', 'Half-Yearly'] }
        },
        otherCharges: {
            electricityCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number }
            },
            waterCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number }
            },
            gasCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number }
            },
            otherCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number }
            }
        },
        brokerage: {
            required: { type: String, enum: ['yes', 'no'] },
            amount: { type: Number }
        },
        availability: {
            availableFrom: { type: Date },
            availableImmediately: { type: Boolean, default: false },
            leaseDuration: { type: String },
            noticePeriod: { type: String },
            petsAllowed: { type: Boolean, default: false },
            operatingHours: { type: Boolean, default: false }
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
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Lease' },
        propertyName: { type: String, default: 'Warehouse' },
        status: { type: String, default: 'Available' }
    }
});
exports.default = (0, mongoose_1.model)('CommercialLeaseWarehouse', CommercialLeaseWarehouseSchema);
