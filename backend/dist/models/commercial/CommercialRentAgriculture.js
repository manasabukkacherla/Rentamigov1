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
const CommercialRentAgricultureSchema = new mongoose_1.Schema({
    propertyId: { type: String, required: false },
    basicInformation: {
        title: { type: String, required: false },
        Type: [{ type: String, required: false }],
        powerSupply: { type: String, enum: ['Available', 'Not Available'], required: false },
        address: {
            street: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            zipCode: { type: String, required: false }
        },
        location: {
            latitude: { type: String, required: false },
            longitude: { type: String, required: false }
        },
        landmark: { type: String },
        isCornerProperty: { type: Boolean, default: false },
    },
    Agriculturelanddetails: {
        totalArea: { type: Number, required: false },
        soilType: { type: String },
        irrigation: { type: Boolean, default: false },
        fencing: { type: Boolean, default: false },
        cropSuitability: { type: String },
        waterSource: { type: String },
        legalClearances: { type: Boolean, default: false }
    },
    rent: {
        expectedRent: { type: Number, required: false },
        isNegotiable: { type: Boolean, default: false },
        maintenanceType: { type: String, enum: ['inclusive', 'exclusive'] }
    },
    availability: {
        type: { type: String, enum: ['immediate', 'specific'], required: false },
        date: { type: Date }
    },
    contactDetails: {
        name: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
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
        intent: { type: String, default: 'Rent' },
        propertyName: { type: String, default: 'Agriculture' },
        status: { type: String, default: 'Available' }
    }
});
exports.default = mongoose_1.default.model('CommercialRentAgriculture', CommercialRentAgricultureSchema);
