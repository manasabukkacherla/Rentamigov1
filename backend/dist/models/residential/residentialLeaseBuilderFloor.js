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
    propertyId: { type: String, required: false, unique: false },
    basicInformation: {
        title: { type: String, required: false },
        // builderName: { type: String, required: false },
        floorNumber: { type: Number, required: false },
        totalFloors: { type: Number, required: false },
        address: {
            street: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            zipCode: { type: String, required: false },
            location: {
                latitude: { type: String },
                longitude: { type: String },
                locationLabel: { type: String }
            }
        }
    },
    propertyDetails: {
        propertysize: { type: Number, required: false },
        bedrooms: { type: Number, required: false },
        washrooms: { type: Number, required: false },
        bathrooms: { type: Number, required: false },
        balconies: { type: Number, required: false },
        parkingdetails: { type: String },
        ExtraRooms: [{ type: String }],
        utility: { type: String },
        Furnishingstatus: { type: String },
        totalfloors: { type: Number },
        floorNumber: { type: Number },
        propertyfacing: { type: String },
        propertyage: { type: String },
        superareasqft: { type: Number },
        superareasqmt: { type: Number },
        builtupareasqft: { type: Number },
        builtupareasqmt: { type: Number },
        carpetareasqft: { type: Number },
        carpetareasqmt: { type: Number },
        electricityavailability: { type: String },
        wateravailability: [{ type: String }],
        servantRoom: { type: Boolean },
        studyRoom: { type: Boolean },
        pooja: { type: Boolean }
    },
    availableitems: {
        availableitems: [{ type: String }],
        securityandsafety: [{ type: String }],
        powerutility: [{ type: String }],
        parkingtranspotation: [{ type: String }],
        recreationalsportsfacilities: [{ type: String }],
        childrenfamilyamenities: [{ type: String }],
        healthwellnessfacilities: [{ type: String }],
        shoppingconviencestores: [{ type: String }],
        ecofriendlysustainable: [{ type: String }],
        communityculturalspaces: [{ type: String }],
        smarthometechnology: [{ type: String }],
        otheritems: [{ type: String }]
    },
    floorAmenities: {
        lights: { type: Number },
        geysers: { type: Number },
        lofts: { type: Number },
        clothHanger: { type: Number },
        cotWithMattress: { type: Number },
        airConditioner: { type: Number },
        exhaustFan: { type: Number },
        ceilingFan: { type: Number },
        wardrobes: { type: Number },
        kitchenCabinets: { type: Number },
        diningTableWithChairs: { type: Number },
        sideTable: { type: Number },
        desertCooler: { type: Number }
    },
    leaseDetails: {
        monthlyRent: { type: Number, required: false },
        securityDeposit: { type: Number, required: false },
        maintenanceCharges: {
            amount: { type: Number },
            type: { type: String, enum: ['monthly', 'quarterly', 'yearly'] }
        },
        leaseDuration: {
            minimumDuration: { type: Number },
            maximumDuration: { type: Number },
            durationUnit: { type: String, enum: ['months', 'years'] }
        },
        rentNegotiable: { type: Boolean },
        additionalCharges: {
            waterCharges: {
                type: { type: String, enum: ['inclusive', 'exclusive'] },
                amount: { type: Number }
            },
            electricityCharges: {
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
            type: { type: String, enum: ['yes', 'no'] },
            amount: { type: Number }
        }
    },
    availability: {
        type: { type: String, enum: ['immediate', 'specific'], required: false },
        date: { type: String }
    },
    media: {
        photos: {
            exterior: [{ type: String }],
            interior: [{ type: String }],
            floorPlan: [{ type: String }],
            washrooms: [{ type: String }],
            bedrooms: [{ type: String }],
            halls: [{ type: String }],
            storerooms: [{ type: String }],
            kitchen: [{ type: String }],
            servantRoom: [{ type: String }],
            studyRoom: [{ type: String }],
            pooja: [{ type: String }],
            lifts: [{ type: String }],
            emergencyExits: [{ type: String }]
        },
        mediaItems: [{
                id: { type: String },
                type: { type: String, enum: ['photo', 'video'] },
                url: { type: String },
                title: { type: String },
                tags: [{ type: String }],
                roomType: { type: String },
                category: { type: String }
            }],
        videoTour: { type: String },
        documents: [{ type: String }]
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false },
        createdAt: { type: Date, default: Date.now }
    }
});
exports.default = mongoose_1.default.model('LeaseBuilderFloor', LeaseBuilderFloorSchema);
