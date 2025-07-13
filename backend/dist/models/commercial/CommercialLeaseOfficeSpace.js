"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema definitions
const CommercialLeaseOfficeSpaceSchema = new mongoose_1.Schema({
    propertyId: { type: String, required: false, unique: false },
    basicInformation: {
        title: { type: String, required: false },
        type: { type: [String], required: false },
        address: {
            street: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            zipCode: { type: String, required: false },
        },
        landmark: { type: String },
        location: {
            latitude: { type: String },
            longitude: { type: String },
        },
        isCornerProperty: { type: Boolean, default: false },
    },
    propertyDetails: {
        officeSpaceDetails: {
            seatingcapacity: { type: Number, required: false },
            cabins: {
                type: String,
                enum: ['Available', 'Not Available'],
                required: false,
            },
            meetingrooms: {
                type: String,
                enum: ['Available', 'Not Available'],
                required: false,
            },
            conferenceRooms: {
                type: String,
                enum: ['Available', 'Not Available'],
                required: false,
            },
            receptionarea: {
                type: String,
                enum: ['Available', 'Not Available'],
                required: false,
            },
            wifi: {
                type: String,
                enum: ['Available', 'Not Available'],
                required: false,
            },
            serverroom: {
                type: String,
                enum: ['Available', 'Not Available'],
                required: false,
            },
            coworkingfriendly: {
                type: String,
                enum: ['Available', 'Not Available'],
                required: false,
            },
            cabinsDetails: {
                count: { type: Number },
            },
        },
        area: {
            totalArea: { type: Number, required: false },
            builtUpArea: { type: Number, required: false },
            carpetArea: { type: Number, required: false },
        },
        floor: {
            floorNumber: { type: Number, required: false },
            totalFloors: { type: Number, required: false },
        },
        facingDirection: { type: String },
        furnishingStatus: { type: String },
        propertyAmenities: { type: [String] },
        wholeSpaceAmenities: { type: [String] },
        electricitySupply: {
            powerLoad: { type: Number },
            backup: { type: Boolean, default: false },
        },
        propertyAge: { type: String },
        propertyCondition: { type: String },
        waterAvailability: { type: String },
    },
    leaseTerms: {
        leaseAmount: {
            amount: { type: Number, required: false },
            type: { type: String, enum: ['Fixed', 'Negotiable'] },
            duration: { type: Number, required: false },
            durationUnit: { type: String, required: false },
        },
        leaseTenure: {
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
            frequency: { type: String, enum: ['Monthly', 'Quarterly', 'Yearly', 'Half-Yearly'] },
        },
        otherCharges: {
            electricityCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number },
            },
            waterCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number },
            },
            gasCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number },
            },
            otherCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number },
            },
        },
        brokerage: {
            required: { type: String, enum: ['yes', 'no'] },
            amount: { type: Number },
        },
        availability: {
            availableFrom: { type: Date },
            availableImmediately: { type: Boolean, default: false },
            leaseDuration: { type: String },
            noticePeriod: { type: String },
            petsAllowed: { type: Boolean, default: false },
            operatingHours: { type: Boolean, default: false },
        },
    },
    contactInformation: {
        name: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        alternatePhone: { type: String },
        bestTimeToContact: { type: String },
    },
    media: {
        photos: {
            exterior: { type: [String] },
            interior: { type: [String] },
            floorPlan: { type: [String] },
            washrooms: { type: [String] },
            lifts: { type: [String] },
            emergencyExits: { type: [String] },
        },
        videoTour: { type: String },
        documents: { type: [String] },
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Lease' },
        propertyName: { type: String, default: 'Office Space' },
        status: { type: String, default: 'Available' },
    },
});
const CommercialLeaseOfficeSpace = (0, mongoose_1.model)('CommercialLeaseOfficeSpace', CommercialLeaseOfficeSpaceSchema);
exports.default = CommercialLeaseOfficeSpace;
