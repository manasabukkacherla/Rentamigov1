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
const residentialRentBuilderFloorSchema = new mongoose_1.default.Schema({
    propertyId: {
        type: String,
        required: false,
        unique: false,
    },
    basicInformation: {
        title: { type: String, required: false },
        address: {
            flatNo: { type: Number, required: false },
            showFlatNo: { type: Boolean, required: false },
            floor: { type: Number, required: false },
            apartmentName: { type: String, required: false },
            street: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            zipCode: { type: String, required: false },
            location: {
                latitude: { type: Number, required: false },
                longitude: { type: Number, required: false },
            },
        },
    },
    propertySize: { type: Number, required: false },
    propertyDetails: {
        bedrooms: { type: Number, required: false },
        washrooms: { type: Number, required: false },
        balconies: { type: Number, required: false },
        hasParking: { type: Boolean, required: false },
        parkingDetails: {
            twoWheeler: { type: Number, required: false },
            fourWheeler: { type: Number, required: false },
        },
        extraRooms: {
            servant: { type: Boolean, required: false },
            puja: { type: Boolean, required: false },
            store: { type: Boolean, required: false },
            others: { type: Boolean, required: false },
        },
        utilityArea: { type: String, required: false },
        furnishingStatus: { type: String, required: false },
        totalFloors: { type: Number, required: false },
        propertyOnFloor: { type: Number, required: false },
        facing: { type: String, required: false },
        propertyAge: { type: String, required: false },
        superBuiltUpAreaSqft: { type: Number, required: false },
        superBuiltUpAreaSqmt: { type: Number, required: false },
        builtUpAreaSqft: { type: Number, required: false },
        builtUpAreaSqmt: { type: Number, required: false },
        carpetAreaSqft: { type: Number, required: false },
        carpetAreaSqmt: { type: Number, required: false },
        electricityAvailability: { type: String, required: false },
        waterAvailability: {
            borewell: { type: Boolean, required: false },
            governmentSupply: { type: Boolean, required: false },
            tankerSupply: { type: Boolean, required: false },
        },
    },
    restrictions: {
        foodPreference: { type: String, required: false },
        petsAllowed: { type: String, required: false },
        tenantType: { type: String, required: false },
    },
    flatAmenities: {
        lights: { type: Number, required: false },
        ceilingFan: { type: Number, required: false },
        geysers: { type: Number, required: false },
        chimney: { type: Boolean, required: false },
        callingBell: { type: Boolean, required: false },
        wardrobes: { type: Number, required: false },
        lofts: { type: Number, required: false },
        kitchenCabinets: { type: Number, required: false },
        clothHanger: { type: Number, required: false },
        pipedGasConnection: { type: Boolean, required: false },
        gasStoveWithCylinder: { type: Boolean, required: false },
        ironingStand: { type: Boolean, required: false },
        bathtub: { type: Boolean, required: false },
        shower: { type: Boolean, required: false },
        sofa: { type: Boolean, required: false },
        coffeeTable: { type: Boolean, required: false },
        tvUnit: { type: Boolean, required: false },
        diningTableWithChairs: { type: Number, required: false },
        cotWithMattress: { type: Number, required: false },
        sideTable: { type: Number, required: false },
        studyTableWithChair: { type: Number, required: false },
        television: { type: Boolean, required: false },
        refrigerator: { type: Boolean, required: false },
        washingMachine: { type: Boolean, required: false },
        dishwasher: { type: Boolean, required: false },
        waterPurifier: { type: Boolean, required: false },
        microwaveOven: { type: Boolean, required: false },
        inductionCooktop: { type: Boolean, required: false },
        gasStove: { type: Boolean, required: false },
        airConditioner: { type: Number, required: false },
        desertCooler: { type: Number, required: false },
        ironBox: { type: Boolean, required: false },
        exhaustFan: { type: Number, required: false },
    },
    societyAmenities: {
        powerutility: { type: [String], required: false },
        parkingtranspotation: { type: [String], required: false },
        recreationalsportsfacilities: { type: [String], required: false },
        childrenfamilyamenities: { type: [String], required: false },
        healthwellnessfacilities: { type: [String], required: false },
        shoppingconviencestores: { type: [String], required: false },
        ecofriendlysustainable: { type: [String], required: false },
        communityculturalspaces: { type: [String], required: false },
        smarthometechnology: { type: [String], required: false },
        otheritems: { type: [String], required: false },
    },
    rentalTerms: {
        rentDetails: {
            expectedRent: { type: Number, required: false },
            isNegotiable: { type: Boolean, default: false },
            rentType: { type: String, required: false },
        },
        securityDeposit: {
            amount: { type: Number, required: false },
        },
        maintenanceAmount: {
            amount: { type: Number },
            frequency: { type: String },
        },
        otherCharges: {
            water: {
                amount: { type: Number },
                type: { type: String, required: false },
            },
            electricity: {
                amount: { type: Number },
                type: { type: String, required: false },
            },
            gas: {
                amount: { type: Number },
                type: { type: String, required: false },
            },
            others: {
                amount: { type: Number },
                type: { type: String, required: false },
            }
        },
        brokerage: {
            required: { type: String, required: false },
            amount: { type: Number },
        },
    },
    availability: {
        type: { type: String, required: false },
        date: { type: String },
    },
    media: {
        photos: {
            exterior: [{ type: String, required: false }],
            interior: [{ type: String, required: false }],
            floorPlan: [{ type: String, required: false }],
            washrooms: [{ type: String, required: false }],
            lifts: [{ type: String, required: false }],
            emergencyExits: [{ type: String, required: false }],
            bedrooms: [{ type: String, required: false }],
            halls: [{ type: String, required: false }],
            storerooms: [{ type: String, required: false }],
            kitchen: [{ type: String, required: false }]
        },
        mediaItems: [{
                id: { type: String },
                type: { type: String },
                url: { type: String },
                title: { type: String },
                tags: [{ type: String }],
                roomType: { type: String },
                category: { type: String },
            }],
        videoTour: { type: String, required: false, default: '' },
        documents: [{ type: String, required: false }]
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Residential' },
        intent: { type: String, default: 'Rent' },
        propertyName: { type: String, default: 'Builder Floor' },
        status: { type: String, default: 'Available' },
        updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false },
        updatedAt: { type: Date, default: Date.now },
    }
}, {
    timestamps: false
});
const ResidentialRentBuilderFloor = mongoose_1.default.model('ResidentialRentBuilderFloor', residentialRentBuilderFloorSchema);
exports.default = ResidentialRentBuilderFloor;
