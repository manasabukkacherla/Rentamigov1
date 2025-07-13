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
const CommercialLeaseAgriculture = new mongoose_1.Schema({
    propertyId: { type: String },
    basicInformation: {
        title: { type: String, default: "Unnamed Property" },
        Type: { type: [String], default: ["Agricultural"] },
        powerSupply: { type: String, enum: ['Available', 'Not Available'], default: "Available" },
        address: {
            street: { type: String, default: "Not Specified" },
            city: { type: String, default: "Not Specified" },
            state: { type: String, default: "Not Specified" },
            zipCode: { type: String, default: "00000" }
        },
        landmark: { type: String },
        location: {
            latitude: { type: String, required: false },
            longitude: { type: String, required: false }
        },
        isCornerProperty: { type: Boolean, default: false },
    },
    Agriculturelanddetails: {
        totalArea: { type: Number, required: true },
        soilType: { type: String },
        irrigation: { type: Boolean, default: false },
        fencing: { type: Boolean, default: false },
        cropSuitability: { type: String },
        waterSource: { type: String },
        legalClearances: { type: Boolean, default: false }
    },
    leaseTerms: {
        leaseAmount: {
            amount: { type: Number, default: 0 },
            duration: { type: Number, default: 0 },
            durationType: { type: String, default: "months" },
            isNegotiable: { type: Boolean, default: false },
        },
        leaseTenure: {
            minimumTenure: { type: String, default: "" },
            minimumUnit: { type: String, default: "months" },
            maximumTenure: { type: String, default: "" },
            maximumUnit: { type: String, default: "months" },
            lockInPeriod: { type: String, default: "" },
            lockInUnit: { type: String, default: "months" },
            noticePeriod: { type: String, default: "" },
            noticePeriodUnit: { type: String, default: "months" },
        },
    },
    availability: {
        availableFrom: { type: Date },
        availableImmediately: { type: Boolean, default: false },
        availabilityStatus: { type: String },
        leaseDuration: { type: String },
        noticePeriod: { type: String },
        isPetsAllowed: { type: Boolean, default: false },
        operatingHours: { type: Boolean, default: false },
    },
    contactInformation: {
        name: { type: String, default: "Not Specified" },
        email: { type: String, default: "not.specified@example.com" },
        phone: { type: String, default: "0000000000" },
        alternatePhone: { type: String },
        bestTimeToContact: { type: String }
    },
    media: {
        photos: {
            exterior: { type: [String], default: [] },
        },
        videoTour: { type: String },
        documents: { type: [String], default: [] }
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Lease' },
        propertyName: { type: String, default: 'Agriculture' },
        status: { type: String, default: 'Available' }
    }
});
exports.default = mongoose_1.default.model('CommercialLeaseAgriculture', CommercialLeaseAgriculture);
