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
const CommercialLeasePlot = new mongoose_1.Schema({
    propertyId: { type: String, required: false, unique: false },
    basicInformation: {
        title: { type: String, required: false, default: '' },
        plotType: [{ type: String, required: false }],
        address: {
            street: { type: String, required: false, default: '' },
            city: { type: String, required: false, default: '' },
            state: { type: String, required: false, default: '' },
            zipCode: { type: String, required: false, default: '' },
        },
        landmark: { type: String, default: '' },
        location: {
            latitude: { type: String, required: false, default: '' },
            longitude: { type: String, required: false, default: '' },
        },
        isCornerProperty: { type: Boolean, default: false }
    },
    plotDetails: {
        totalPlotArea: { type: Number, required: false, default: 0 },
        zoningType: { type: String, required: false, default: 'commercial' },
        boundaryWall: { type: Boolean, default: false },
        waterSewer: { type: Boolean, default: false },
        electricity: { type: Boolean, default: false },
        roadAccess: { type: String, required: false, default: '' },
        securityRoom: { type: Boolean, default: false },
        previousConstruction: { type: String, required: false, default: '' }
    },
    leaseTerms: {
        leaseAmount: {
            amount: { type: Number, required: true, default: 0 },
            duration: { type: Number, required: true, default: 0 },
            durationType: { type: String, enum: ['month', 'year'], required: true, default: 'month' },
            amountType: { type: String, enum: ['fixed', 'negotiable'], required: true, default: 'fixed' },
        },
        leaseTenure: {
            minimumTenure: { type: String, default: "0" },
            minimumUnit: { type: String, default: "months" },
            maximumTenure: { type: String, default: "0" },
            maximumUnit: { type: String, default: "months" },
            lockInPeriod: { type: String, default: "0" },
            lockInUnit: { type: String, default: "months" },
            noticePeriod: { type: String, default: "0" },
            noticePeriodUnit: { type: String, default: "months" },
        },
    },
    availability: {
        availableFrom: { type: Date, default: Date.now },
        availableImmediately: { type: Boolean, default: false },
        availabilityStatus: { type: String, required: false, default: 'later' },
        leaseDuration: { type: String, default: '' },
        noticePeriod: { type: String, default: '' },
        isPetsAllowed: { type: Boolean, default: false },
        operatingHours: { type: Boolean, default: false }
    },
    contactInformation: {
        name: { type: String, required: false, default: '' },
        email: { type: String, required: false, default: '' },
        phone: { type: String, required: false, default: '' },
        alternatePhone: { type: String, default: '' },
        bestTimeToContact: { type: String, default: '' }
    },
    media: {
        photos: {
            exterior: [{ type: String }],
        },
        videoTour: { type: String },
        documents: [{ type: String }]
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Rent' },
        propertyName: { type: String, default: 'Plot' },
        status: { type: String, default: 'Available' }
    }
});
// Create and export model
exports.default = mongoose_1.default.model('CommercialLeasePlot', CommercialLeasePlot);
// export defult LeasePlot;
// Export interfaces
