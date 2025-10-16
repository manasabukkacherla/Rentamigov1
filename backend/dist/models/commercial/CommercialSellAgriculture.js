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
const CommercialSellAgricultureSchema = new mongoose_1.Schema({
    propertyId: { type: String, default: () => `CSA-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` },
    basicInformation: {
        title: { type: String, default: "Unnamed Property" },
        Type: [{ type: String, required: true }],
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
    Agriculturelanddetails: {
        totalArea: { type: Number, default: 0 },
        powersupply: { type: Boolean, default: false },
        soilType: { type: String },
        irrigation: { type: Boolean, default: false },
        fencing: { type: Boolean, default: false },
        cropSuitability: { type: String },
        waterSource: { type: String },
        legalClearances: { type: Boolean, default: false }
    },
    price: {
        expectedPrice: { type: Number, default: 0 },
        isNegotiable: { type: Boolean, default: false }
    },
    availability: {
        type: { type: String, enum: ['immediate', 'specific'], default: 'immediate' },
        date: { type: Date },
        preferredLeaseDuration: { type: String },
        noticePeriod: { type: String }
    },
    petsAllowed: { type: Boolean, default: false },
    operatingHoursRestrictions: { type: Boolean, default: false },
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
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Sell' },
        propertyName: { type: String, default: 'Agriculture' },
        status: { type: String, default: 'Available' }
    }
});
exports.default = mongoose_1.default.model('CommercialSellAgriculture', CommercialSellAgricultureSchema);
