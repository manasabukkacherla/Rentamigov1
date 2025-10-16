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
const CommercialLeaseOthersSchema = new mongoose_1.Schema({
    propertyId: { type: String, default: () => `CLO-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` },
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
            latitude: { type: String },
            longitude: { type: String }
        },
        isCornerProperty: { type: Boolean, default: false },
    },
    propertyDetails: {
        otherPropertyDetails: {
            propertyTypeDescription: { type: String },
            specialFeatures: { type: String },
            usageRecommendation: { type: String },
            additionalRequirements: { type: String }
        },
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
    leaseTerms: {
        leaseAmount: {
            amount: { type: Number, default: 0 },
            duration: { type: Number, default: 1 },
            durationType: { type: String, default: 'years' },
            isNegotiable: { type: Boolean, default: false }
        },
        leaseTenure: {
            minimumTenure: { type: String, default: '1' },
            minimumUnit: { type: String, default: 'years' },
            maximumTenure: { type: String, default: '1' },
            maximumUnit: { type: String, default: 'years' },
            lockInPeriod: { type: String, default: '1' },
            lockInUnit: { type: String, default: 'years' },
            noticePeriod: { type: String, default: '1' },
            noticePeriodUnit: { type: String, default: 'years' }
        },
        maintenanceAmount: {
            amount: { type: Number },
            frequency: { type: String, enum: ["monthly", "quarterly", "half-yearly", "yearly"] }
        },
        otherCharges: {
            electricityCharges: {
                type: { type: String, enum: ["inclusive", "exclusive"] },
                amount: { type: Number }
            },
            waterCharges: {
                type: { type: String, enum: ["inclusive", "exclusive"] },
                amount: { type: Number }
            },
            gasCharges: {
                type: { type: String, enum: ["inclusive", "exclusive"] },
                amount: { type: Number }
            },
            otherCharges: {
                type: { type: String, enum: ["inclusive", "exclusive"] },
                amount: { type: Number }
            }
        },
        brokerage: {
            required: { type: String },
            amount: { type: Number }
        }
    },
    availability: {
        availableFrom: { type: Date },
        availableImmediately: { type: Boolean, default: false },
        availabilityStatus: { type: String },
        leaseDuration: { type: String },
        noticePeriod: { type: String },
        isPetsAllowed: { type: Boolean, default: false },
        operatingHours: {
            restricted: { type: Boolean, default: false },
            restrictions: { type: String }
        }
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
            interior: { type: [String], default: [] },
            floorPlan: { type: [String], default: [] },
            aerial: { type: [String], default: [] },
            surroundings: { type: [String], default: [] },
            documents: { type: [String], default: [] }
        },
        videoTour: { type: String },
        documents: { type: [String], default: [] }
    },
    metaData: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Commercial' },
        intent: { type: String, default: 'Lease' },
        propertyName: { type: String, default: 'Others' },
        status: { type: String, default: 'Available' }
    }
});
exports.default = mongoose_1.default.model('CommercialLeaseOthers', CommercialLeaseOthersSchema);
