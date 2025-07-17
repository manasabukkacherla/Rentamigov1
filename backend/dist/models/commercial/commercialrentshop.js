"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema
const CommercialrentShopSchema = new mongoose_1.Schema({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        Type: [{ type: String }],
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
    shopDetails: {
        frontageWidth: { type: Number, required: true },
        heightOfShop: { type: Number, required: true },
        displayWindow: { type: Boolean, default: false },
        attachedStorageRoom: { type: Boolean, default: false },
        averageFootTraffic: { type: String, enum: ['low', 'medium', 'high'] },
        customerParking: { type: Boolean, default: false },
        previousBusiness: { type: String }
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
            }
        },
    },
    brokerage: {
        required: { type: String, required: true },
        amount: { type: Number },
    },
    availability: {
        type: { type: String, required: true },
        date: { type: String },
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
        intent: { type: String, default: 'Rent' },
        propertyName: { type: String, default: 'Shop' },
        status: { type: String, default: 'Available' }
    }
}, {
    timestamps: true
});
// Indexes
// CommercialrentShopSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
// CommercialrentShopSchema.index({ 'basicInformation.city': 1 });
// CommercialrentShopSchema.index({ 'basicInformation.state': 1 });
CommercialrentShopSchema.index({ 'metadata.createdAt': -1 });
// Export model and interfaces
// export { ICommercialrentShop, IBasicInformation, IAvailability, IContactInformation, IMedia, IMetadata };
exports.default = (0, mongoose_1.model)('CommercialrentShop', CommercialrentShopSchema);
