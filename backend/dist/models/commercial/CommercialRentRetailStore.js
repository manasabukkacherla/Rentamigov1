"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema
const CommercialRentRetailStoreSchema = new mongoose_1.Schema({
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
            builtUpArea: { type: Number, required: true },
        },
        floor: {
            floorNumber: { type: Number, required: true },
            totalFloors: { type: Number, required: true },
        },
        facingDirection: { type: String, required: true },
        furnishingStatus: { type: String, required: true },
        propertyAmenities: { type: [String], required: true },
        wholeSpaceAmenities: { type: [String], required: true },
        electricitySupply: {
            powerLoad: { type: Number, required: true },
            backup: { type: Boolean, required: true },
        },
        waterAvailability: { type: String },
        propertyAge: { type: String },
        propertyCondition: { type: String },
    },
    rentalTerms: {
        rentDetails: {
            expectedRent: { type: Number },
            isNegotiable: { type: Boolean, default: false },
            rentType: { type: String },
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
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Rent' },
        propertyName: { type: String, default: 'Retail Store' },
        status: { type: String, default: 'Available' }
    }
}, {
    timestamps: true
});
// Indexes
// CommercialRentRetailStoreSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialRentRetailStoreSchema.index({ 'basicInformation.city': 1 });
CommercialRentRetailStoreSchema.index({ 'basicInformation.state': 1 });
CommercialRentRetailStoreSchema.index({ 'metadata.createdAt': -1 });
// Export model and interfaces
// export { ICommercialrentShop, IBasicInformation, IAvailability, IContactInformation, IMedia, IMetadata };
exports.default = (0, mongoose_1.model)('CommercialRentRetailStore', CommercialRentRetailStoreSchema);
