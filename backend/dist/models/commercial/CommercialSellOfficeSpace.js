"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema definition
const CommercialSellOfficeSpaceSchema = new mongoose_1.Schema({
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
    officeDetails: {
        seatingCapacity: { type: Number, required: true },
        cabins: {
            available: { type: Boolean, required: true },
            count: { type: Number }
        },
        conferenceRoom: { type: Boolean, required: true },
        meetingRoom: { type: Boolean, required: true },
        receptionArea: { type: Boolean, required: true },
        wifiSetup: { type: Boolean, required: true },
        serverRoom: { type: Boolean, required: true },
        coworkingFriendly: { type: Boolean, required: true }
    },
    propertyDetails: {
        area: {
            totalArea: { type: Number, required: true },
            builtUpArea: { type: Number, required: true },
            carpetArea: { type: Number, required: true }
        },
        floor: {
            floorNumber: { type: Number, required: true },
            totalFloors: { type: Number, required: true }
        },
        facingDirection: { type: String, required: true },
        furnishingStatus: { type: String, required: true },
        propertyAmenities: [{ type: String }],
        wholeSpaceAmenities: [{ type: String }],
        electricitySupply: {
            powerLoad: { type: Number, required: true },
            backup: { type: Boolean, required: true }
        },
        waterAvailability: [{ type: String, required: true }],
        propertyAge: { type: String, required: true },
        propertyCondition: { type: String, required: true }
    },
    pricingDetails: {
        propertyPrice: { type: Number, required: true },
        pricetype: { type: String, enum: ['fixed', 'negotiable'], default: 'fixed' }
    },
    registration: {
        chargestype: { type: String, enum: ['inclusive', 'exclusive'], default: 'inclusive' },
        registrationAmount: { type: Number },
        stampDutyAmount: { type: Number },
    },
    brokerage: {
        required: { type: String, required: true },
        amount: { type: Number }
    },
    availability: {
        type: { type: String, required: true, enum: ['immediate', 'specific'] },
        date: { type: Date }
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
        intent: { type: String, default: 'Sell' },
        propertyName: { type: String, default: 'Office Space' },
        status: { type: String, default: 'Available' }
    }
}, {
    timestamps: true
});
const CommercialSellOfficeSpace = (0, mongoose_1.model)('CommercialSellOfficeSpace', CommercialSellOfficeSpaceSchema);
exports.default = CommercialSellOfficeSpace;
