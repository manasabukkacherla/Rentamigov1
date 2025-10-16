"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema
const CommercialSellRetailStoreSchema = new mongoose_1.Schema({
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
    retailStoreDetails: {
        location: { type: String, required: true },
        anchorStores: { type: Boolean, default: false },
        footfallData: { type: String, required: true },
        signageAllowed: { type: Boolean, default: false },
        sharedWashrooms: { type: Boolean, default: false },
        fireExit: { type: Boolean, default: false }
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
        facingDirection: { type: String, required: true },
        furnishingStatus: { type: String, required: true },
        propertyAmenities: [{ type: String }],
        wholeSpaceAmenities: [{ type: String }],
        electricitySupply: {
            powerLoad: { type: Number },
            backup: { type: Boolean, default: false }
        },
        waterAvailability: [{ type: String }],
        propertyAge: { type: String, required: true }, // Accepts range values like "10-15"
        propertyCondition: { type: String, required: true },
        ownershipType: { type: String, required: true },
        possessionStatus: { type: String, required: true }
    },
    priceDetails: {
        propertyPrice: { type: Number, default: 0, required: true },
        pricetype: { type: String, enum: ['fixed', 'negotiable'] },
    },
    registration: {
        chargestype: { type: String, enum: ['inclusive', 'exclusive'] },
        registrationAmount: { type: Number },
        stampDutyAmount: { type: Number },
    },
    brokerage: {
        required: { type: String, enum: ['Yes', 'No'], required: true },
        amount: { type: Number }
    },
    availability: {
        type: { type: String, enum: ['Ready to Move', 'Under Construction', 'Soon',
                'Specific Date', 'Available', 'Not Available', 'immediate'] },
        date: { type: String }
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
        propertyName: { type: String, default: 'Retail Store' },
        status: { type: String, default: 'Available' }
    }
}, {
    timestamps: true
});
// Add indexes for common query fields
// CommercialSellRetailStoreSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialSellRetailStoreSchema.index({ 'basicInformation.city': 1 });
CommercialSellRetailStoreSchema.index({ 'basicInformation.state': 1 });
CommercialSellRetailStoreSchema.index({ 'metadata.createdAt': -1 });
CommercialSellRetailStoreSchema.index({ 'priceDetails.price': 1 });
CommercialSellRetailStoreSchema.index({ 'propertyDetails.area.totalArea': 1 });
// Export model and interfaces
exports.default = (0, mongoose_1.model)('CommercialSellRetailStore', CommercialSellRetailStoreSchema);
