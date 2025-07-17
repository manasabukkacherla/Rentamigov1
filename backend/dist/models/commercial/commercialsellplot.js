"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema
const CommercialPlotSchema = new mongoose_1.Schema({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        Type: [{ type: String, required: true }],
        address: { type: String, required: true },
        landmark: { type: String, required: true },
        location: { latitude: String, longitude: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        isCornerProperty: { type: Boolean, default: false }
    },
    plotDetails: {
        totalArea: { type: Number },
        zoningType: { type: String },
        boundaryWall: { type: Boolean },
        waterSewer: { type: Boolean },
        electricity: { type: Boolean },
        previousConstruction: [{ type: String }],
        roadAccess: { type: String },
        securityRoom: { type: Boolean },
    },
    pricingDetails: {
        propertyPrice: { type: Number, required: true },
        priceType: { type: String, enum: ['fixed', 'negotiable'], required: true },
        area: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        pricePerSqFt: { type: Number, required: true }
    },
    availability: {
        availableFrom: { type: Date },
        availableImmediately: { type: Boolean, default: false },
        availabilityStatus: { type: String, required: true },
        possessionDate: { type: String, required: true },
        leaseDuration: { type: String },
        noticePeriod: { type: String },
        petsAllowed: { type: Boolean, default: false },
        operatingHours: { type: mongoose_1.Schema.Types.Mixed },
        bookingAmount: { type: Number }
    },
    contactInformation: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        alternatePhone: { type: String },
        preferredContactTime: { type: String },
        bestTimeToContact: { type: String }
    },
    media: {
        photos: {
            plot: [{ type: String }],
            surroundings: [{ type: String }],
            documents: [{ type: String }]
        },
        videoTour: { type: String }
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Sell' },
        propertyName: { type: String, default: 'Plot' },
        status: { type: String, default: 'Available' }
    }
}, {
    timestamps: true
});
// Indexes
// CommercialPlotSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialPlotSchema.index({ 'basicInformation.city': 1 });
CommercialPlotSchema.index({ 'basicInformation.state': 1 });
CommercialPlotSchema.index({ 'pricingDetails.propertyPrice': 1 });
CommercialPlotSchema.index({ 'plotDetails.totalArea': 1 });
CommercialPlotSchema.index({ 'metadata.createdAt': -1 });
exports.default = (0, mongoose_1.model)('CommercialSellPlot', CommercialPlotSchema);
