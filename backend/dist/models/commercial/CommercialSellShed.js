"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Schema
const CommercialSellShedSchema = new mongoose_1.Schema({
    propertyId: { type: String, default: () => `CSS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` },
    basicInformation: {
        title: { type: String, default: "Unnamed Property" },
        Type: { type: [String], default: [] },
        address: {
            street: { type: String, default: "Not Specified" },
            city: { type: String, default: "Not Specified" },
            state: { type: String, default: "Not Specified" },
            zipCode: { type: String, default: "00000" }
        },
        landmark: { type: String },
        location: {
            latitude: { type: String, required: true },
            longitude: { type: String, required: true }
        },
        isCornerProperty: { type: Boolean, default: false },
    },
    shedDetails: {
        totalArea: { type: Number, required: true },
        builtUpArea: { type: Number },
        carpetArea: { type: Number, required: true },
        entranceWidth: { type: Number, required: true },
        ceilingHeight: {
            type: mongoose_1.Schema.Types.Mixed,
            validate: {
                validator: function (v) {
                    return typeof v === 'number' || (typeof v === 'object' && v.hasOwnProperty('value') && v.hasOwnProperty('unit'));
                },
                message: 'ceilingHeight must be either a number or an object with value and unit properties'
            }
        },
        additionalDetails: { type: String }
    },
    propertyDetails: {
        area: {
            superBuiltUpAreaSqft: { type: Number },
            builtUpAreaSqft: { type: Number },
            carpetAreaSqft: { type: Number }
        },
        facingDetails: {
            floorNumber: { type: Number },
            totalFloors: { type: Number }
        },
        facingDirection: { type: String },
        furnishingStatus: { type: String },
        propertyAge: { type: String },
        propertyCondition: { type: String },
        propertyAmenities: { type: [String], default: [] },
        wholeSpaceAmenities: { type: [String], default: [] },
        waterAvailability: { type: [String], default: [] },
        electricitySupply: {
            powerLoad: { type: Number },
            backup: { type: Boolean, default: false }
        }
    },
    pricingDetails: {
        propertyPrice: { type: Number, required: true },
        pricetype: { type: String, enum: ['fixed', 'negotiable'], default: 'fixed' }
    },
    registration: {
        chargestype: { type: String, enum: ['inclusive', 'exclusive'], default: 'inclusive' },
        registrationAmount: { type: Number },
        stampDutyAmount: { type: Number }
    },
    brokerage: {
        required: { type: String },
        amount: { type: Number }
    },
    availability: {
        type: { type: String, enum: ['immediate', 'specific'], default: 'immediate' },
        date: { type: Date },
        preferredSaleDuration: { type: String },
        noticePeriod: { type: String },
        isPetsAllowed: { type: Boolean, default: false },
        operatingHours: {
            restricted: { type: Boolean, default: false },
            restrictions: { type: String, default: '' }
        }
    },
    contactDetails: {
        name: { type: String, default: "Not Specified" },
        email: { type: String, default: "not.specified@example.com" },
        phone: { type: String, default: "0000000000" },
        alternatePhone: { type: String },
        bestTimeToContact: { type: String }
    },
    media: {
        photos: {
            exterior: { type: [String], default: [] },
            interior: { type: [String], default: [] },
            floorPlan: { type: [String], default: [] },
            washrooms: { type: [String], default: [] },
            lifts: { type: [String], default: [] },
            emergencyExits: { type: [String], default: [] }
        },
        videoTour: { type: String },
        documents: { type: [String], default: [] }
    },
    metaData: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Sell' },
        propertyName: { type: String, default: 'Shed' },
        status: { type: String, default: 'Available' }
    }
});
// Indexes
CommercialSellShedSchema.index({ propertyId: 1 }, { unique: true });
CommercialSellShedSchema.index({ 'address.city': 1 });
CommercialSellShedSchema.index({ 'address.state': 1 });
CommercialSellShedSchema.index({ 'propertyDetails.area.superBuiltUpAreaSqft': 1 });
CommercialSellShedSchema.index({ 'metaData.createdAt': -1 });
exports.default = mongoose_1.default.model('CommercialSellShed', CommercialSellShedSchema);
