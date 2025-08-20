"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
// Schema
const CommercialLeaseShowroomSchema = new mongoose_1.Schema({
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
        isCornerProperty: { type: Boolean, default: false }
    },
    showroomDetails: {
        totalSpace: { type: Number },
        frontageWidth: { type: Number },
        ceilingHeight: { type: Number },
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
            totalArea: { type: Number },
            carpetArea: { type: Number },
            builtUpArea: { type: Number }
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
            powerLoad: { type: Number, default: null },
            backup: { type: Boolean, default: false }
        },
        waterAvailability: { type: String, default: '' },
        propertyAge: { type: String, default: '' },
        propertyCondition: { type: String, default: 'new' }
    },
    // leaseTerms: {
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
            minimumTenure: { type: Number },
            minimumUnit: { type: String },
            maximumTenure: { type: Number },
            maximumUnit: { type: String },
            lockInPeriod: { type: Number },
            lockInUnit: { type: String },
            noticePeriod: { type: Number },
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
            required: { type: String, default: 'no' },
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
        propertyName: { type: String, default: 'Showroom' },
        status: { type: String, default: 'Available' }
    }
}, {
    timestamps: false
});
// Indexes
// CommercialLeaseShowroomSchema.index({ propertyId: 1 }, { unique: false }); // Removed duplicate index
CommercialLeaseShowroomSchema.index({ 'basicInformation.city': 1 });
CommercialLeaseShowroomSchema.index({ 'basicInformation.state': 1 });
CommercialLeaseShowroomSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialLeaseShowroomSchema.index({ 'metadata.createdAt': -1 });
exports.default = (0, mongoose_1.model)('CommercialLeaseShowroom', CommercialLeaseShowroomSchema);
