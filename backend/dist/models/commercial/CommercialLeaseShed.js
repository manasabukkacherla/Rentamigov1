"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommercialLeaseShed = void 0;
const mongoose_1 = require("mongoose");
const CommercialLeaseShedSchema = new mongoose_1.Schema({
    propertyId: { type: String, unique: true },
    basicInformation: {
        title: { type: String },
        Type: [{ type: String }],
        address: {
            street: { type: String, },
            city: { type: String },
            state: { type: String },
            zipCode: { type: String }
        },
        landmark: { type: String },
        location: {
            latitude: { type: String },
            longitude: { type: String }
        },
        isCornerProperty: { type: Boolean, default: false }
    },
    shedDetails: {
        totalArea: { type: Number },
        carpetArea: { type: Number },
        height: { type: Number },
        entranceWidth: { type: Number },
        additionaldetails: { type: String }
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
        propertyAge: { type: Number },
        propertyCondition: { type: String }
    },
    leaseTerms: {
        leaseDetails: {
            leaseAmount: {
                amount: { type: Number },
                type: { type: String, enum: ['Fixed', 'Negotiable'], default: 'Fixed' },
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
            required: { type: String, enum: ['yes', 'no'], },
            amount: { type: Number }
        },
        availability: {
            availableFrom: { type: Date },
            availableImmediately: { type: Boolean, default: false },
            leaseDuration: { type: String },
            noticePeriod: { type: String },
            petsAllowed: { type: Boolean, default: false },
            operatingHours: {
                restricted: { type: Boolean, default: false },
                restrictions: { type: String }
            }
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
        propertyName: { type: String, default: 'Shed' },
        status: { type: String, default: 'Available' }
    }
}, { timestamps: true });
// Add indexes for better query performance
// CommercialLeaseShedSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialLeaseShedSchema.index({ 'basicInformation.city': 1 });
CommercialLeaseShedSchema.index({ 'basicInformation.state': 1 });
CommercialLeaseShedSchema.index({ 'metadata.createdAt': -1 });
exports.CommercialLeaseShed = (0, mongoose_1.model)('CommercialLeaseShed', CommercialLeaseShedSchema);
// export type { ICommercialLeaseShed, IBasicInformation, IShedDetails, IPropertyDetails, ILeaseTerms, IContactInformation, IMedia, IMetadata };
