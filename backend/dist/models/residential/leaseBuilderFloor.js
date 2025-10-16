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
const LeaseBuilderFloorSchema = new mongoose_1.Schema({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        propertyName: { type: String },
        address: {
            flatNo: Number,
            showFlatNo: Boolean,
            floor: Number,
            apartmentName: String,
            street: String,
            city: String,
            state: String,
            zipCode: String,
            location: {
                latitude: Number,
                longitude: Number
            }
        }
    },
    propertySize: Number,
    propertyDetails: {
        bedrooms: Number,
        washrooms: Number,
        balconies: Number,
        hasParking: Boolean,
        parkingDetails: {
            twoWheeler: Number,
            fourWheeler: Number
        },
        extraRooms: {
            servant: Boolean,
            puja: Boolean,
            store: Boolean,
            others: Boolean
        },
        utilityArea: String,
        furnishingStatus: String,
        totalFloors: Number,
        propertyOnFloor: Number,
        facing: String,
        propertyAge: String,
        superBuiltUpAreaSqft: Number,
        superBuiltUpAreaSqmt: Number,
        builtUpAreaSqft: Number,
        builtUpAreaSqmt: Number,
        carpetAreaSqft: Number,
        carpetAreaSqmt: Number,
        electricityAvailability: String,
        waterAvailability: {
            borewell: Boolean,
            governmentSupply: Boolean,
            tankerSupply: Boolean
        }
    },
    restrictions: {
        foodPreference: String,
        petsAllowed: String,
        tenantType: String
    },
    flatAmenities: mongoose_1.Schema.Types.Mixed,
    societyAmenities: mongoose_1.Schema.Types.Mixed,
    rentalTerms: {
        rentDetails: {
            expectedRent: Number,
            isNegotiable: Boolean,
            rentType: String
        },
        securityDeposit: {
            amount: Number
        },
        maintenanceAmount: {
            amount: Number,
            frequency: String
        },
        otherCharges: mongoose_1.Schema.Types.Mixed,
        brokerage: {
            required: String,
            amount: Number
        }
    },
    availability: {
        type: { type: String },
        date: { type: String }
    },
    media: {
        photos: mongoose_1.Schema.Types.Mixed,
        mediaItems: [mongoose_1.Schema.Types.Mixed],
        videoTour: String,
        documents: [String]
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Residential' },
        intent: { type: String, default: 'Lease' },
        propertyName: { type: String, default: 'Builder Floor' },
        status: { type: String, default: 'Available' },
        updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false },
        updatedAt: { type: Date, default: Date.now },
    }
});
exports.default = mongoose_1.default.model('ResidentialLeaseBuilderFloor', LeaseBuilderFloorSchema);
