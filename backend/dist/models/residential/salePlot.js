"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema
const ResidentialSalePlotSchema = new mongoose_1.Schema({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String, required: true },
        plotType: { type: [String], required: true },
        address: { type: {
                street: { type: String, required: true },
                city: { type: String, required: true },
                state: { type: String, required: true },
                zipCode: { type: String, required: true },
            },
            required: true },
        landmark: { type: String },
        coordinates: { type: {
                latitude: { type: String, required: true },
                longitude: { type: String, required: true },
            },
            required: true },
        isCornerProperty: { type: Boolean, default: false }
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
        propertyAmenities: { type: [String] },
        wholeSpaceAmenities: { type: [String] }
    },
    plotDetails: {
        totalPlotArea: { type: Number, required: true },
        zoningType: { type: String, required: true },
        infrastructure: { type: [String] },
        roadAccess: { type: String, required: true },
        securityRoom: { type: Boolean, default: false },
        previousConstruction: { type: String, required: true }
    },
    leaseDetails: {
        leaseAmount: { type: Number, required: true },
        leaseduration: {
            duration: { type: Number, required: true },
            type: { type: String, enum: ['month', 'year'], required: true },
            amountType: { type: String, enum: ['fixed', 'negotiable'], required: true }
        },
        leasetenure: {
            minimumTenure: {
                duration: { type: Number, required: true },
                type: { type: String, enum: ['month', 'year'], required: true }
            },
            maximumTenure: {
                duration: { type: Number, required: true },
                type: { type: String, enum: ['month', 'year'], required: true }
            },
            lockInPeriod: {
                duration: { type: Number, required: true },
                type: { type: String, enum: ['month', 'year'], required: true }
            },
            noticePeriod: {
                duration: { type: Number, required: true },
                type: { type: String, enum: ['month', 'year'], required: true }
            }
        },
        maintenanceCharges: {
            amount: { type: Number, required: true },
            frequency: { type: String, enum: ['monthly', 'quarterly', 'half-yearly', 'yearly'] }
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
            otherCharges: { type: String, enum: ['inclusive', 'exclusive'] },
            amount: { type: Number }
        }
    },
    brokerage: {
        required: { type: Boolean },
        amount: { type: Number }
    },
    availability: {
        availableFrom: { type: Date },
        availableImmediately: { type: Boolean, default: false },
        availabilityStatus: { type: String, required: true },
        leaseDuration: { type: String },
        noticePeriod: { type: String },
        isPetsAllowed: { type: Boolean, default: false },
        operatingHours: { type: Boolean, default: false }
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
            exterior: [{ type: String }],
            interior: [{ type: String }],
            floorPlan: [{ type: String }],
            washroom: [{ type: String }],
            lift: [{ type: String }],
            emergencyExit: [{ type: String }]
        },
        videoTour: { type: String },
        documents: [{ type: String }]
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Residential' },
        intent: { type: String, default: 'Sale' },
        propertyName: { type: String, default: 'Plot' },
        status: { type: String, default: 'Available' },
        updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false },
        updatedAt: { type: Date, default: Date.now },
    }
}, {
    timestamps: true
});
// Indexes
// CommercialLeasePlotSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
ResidentialSalePlotSchema.index({ 'basicInformation.city': 1 });
ResidentialSalePlotSchema.index({ 'leaseDetails.leaseAmount': 1 });
ResidentialSalePlotSchema.index({ 'plotDetails.totalArea': 1 });
// Create and export model
const SalePlot = (0, mongoose_1.model)('ResidentialSalePlot', ResidentialSalePlotSchema);
exports.default = SalePlot;
// Export interfaces
// export {
//     IResidentialSalePlot,
//     IBasicInformation,
//     IPropertyDetails,
//     IArea,
//     IFloor,
//     IPlotDetails,
//     ILeaseDetails,
//     IBrokerage,
//     IAvailability,
//     IContactInformation,
//     IMedia,
//     IMetadata
// }; 
