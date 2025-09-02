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
const ResidentialLeaseIndependentHouseSchema = new mongoose_1.Schema({
    propertyId: { type: String },
    basicInformation: {
        title: { type: String },
        propertyAddress: {
            houseName: { type: String },
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipCode: { type: String },
            pinCode: { type: String },
            location: {
                latitude: { type: String },
                longitude: { type: String }
            }
        }
    },
    propertySize: { type: Number },
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
        flooring: String,
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
    flatAmenities: { type: mongoose_1.Schema.Types.Mixed },
    societyAmenities: {
        powerutility: [String],
        parkingtranspotation: [String],
        recreationalsportsfacilities: [String],
        childrenfamilyamenities: [String],
        healthwellnessfacilities: [String],
        shoppingconviencestores: [String],
        ecofriendlysustainable: [String],
        communityculturalspaces: [String],
        smarthometechnology: [String],
        otheritems: [String]
    },
    leaseTerms: {
        leaseDetails: {
            leaseAmount: {
                amount: { type: Number },
                type: { type: String },
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
            frequency: { type: String }
        },
        otherCharges: {
            water: {
                amount: { type: Number },
                type: { type: String }
            },
            electricity: {
                amount: { type: Number },
                type: { type: String }
            },
            gas: {
                amount: { type: Number },
                type: { type: String }
            },
            others: {
                amount: { type: Number },
                type: { type: String }
            }
        },
        brokerage: {
            required: { type: String },
            amount: { type: Number }
        }
    },
    availability: {
        type: { type: String },
        date: { type: String }
    },
    media: {
        photos: {
            exterior: [String],
            interior: [String],
            floorPlan: [String],
            washrooms: [String],
            garden: [String],
            basement: [String],
            bedrooms: [String],
            halls: [String],
            storerooms: [String],
            kitchen: [String],
            servantQuarters: [String]
        },
        videoTour: { type: String },
        documents: [String]
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Residential' },
        propertyName: { type: String, default: 'Independent House' },
        intent: { type: String, default: 'Lease' },
        status: {
            type: String,
            enum: ['Available', 'Leased', 'Under Maintenance'],
            default: 'Available'
        }
    }
}, {
    timestamps: false
});
exports.default = mongoose_1.default.models.ResidentialLeaseIndependentHouse ||
    mongoose_1.default.model('ResidentialLeaseIndependentHouse', ResidentialLeaseIndependentHouseSchema);
