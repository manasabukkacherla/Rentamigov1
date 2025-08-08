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
const CommercialSellOthersSchema = new mongoose_1.Schema({
    propertyId: { type: String, default: () => `CSO-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` },
    basicInformation: {
        title: { type: String, default: "Unnamed Property" },
        type: { type: [String], default: ["Other"] },
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
        otherDetails: {
            propertyTypeDescription: { type: String },
            specialFeatures: { type: String },
            usageRecommendation: { type: String },
            additionalRequirements: { type: String }
        },
        facingDirection: { type: String },
        furnishingStatus: { type: String },
        propertyAmenities: { type: [String], default: [] },
        wholeSpaceAmenities: { type: [String], default: [] },
        waterAvailability: { type: String },
        propertyAge: { type: String },
        propertyCondition: { type: String },
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
            emergencyExits: { type: [String], default: [] },
            others: { type: [String], default: [] }
        },
        videoTour: { type: String },
        documents: { type: [String], default: [] }
    },
    metaData: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Sell' },
        propertyName: { type: String, default: 'Others' },
        status: { type: String, default: 'Available' }
    }
});
exports.default = mongoose_1.default.model('CommercialSellOthers', CommercialSellOthersSchema);
