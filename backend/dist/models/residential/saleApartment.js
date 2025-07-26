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
;
const ResidentailSaleApartmentSchema = new mongoose_1.Schema({
    propertyId: { type: String, unique: true },
    basicInformation: {
        title: { type: String },
        address: {
            flatNo: { type: Number },
            showFlatNo: { type: Boolean },
            floor: { type: Number },
            apartmentName: { type: String },
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipCode: { type: String },
            location: {
                latitude: { type: Number },
                longitude: { type: Number },
            },
        },
    },
    propertySize: { type: Number },
    propertyDetails: {
        bedrooms: { type: Number },
        washrooms: { type: Number },
        balconies: { type: Number },
        hasParking: { type: Boolean },
        parkingDetails: {
            twoWheeler: { type: Number },
            fourWheeler: { type: Number },
        },
        extraRooms: {
            servant: { type: Boolean },
            puja: { type: Boolean },
            store: { type: Boolean },
            others: { type: Boolean },
        },
        utilityArea: { type: String },
        furnishingStatus: { type: String },
        totalFloors: { type: Number },
        propertyOnFloor: { type: Number },
        facing: { type: String },
        propertyAge: { type: String },
        superBuiltUpAreaSqft: { type: Number },
        superBuiltUpAreaSqmt: { type: Number },
        builtUpAreaSqft: { type: Number },
        builtUpAreaSqmt: { type: Number },
        carpetAreaSqft: { type: Number },
        carpetAreaSqmt: { type: Number },
        electricityAvailability: { type: String },
        waterAvailability: {
            borewell: { type: Boolean },
            governmentSupply: { type: Boolean },
            tankerSupply: { type: Boolean },
        },
    },
    restrictions: {
        foodPreference: { type: String },
        petsAllowed: { type: String },
        tenantType: { type: String },
    },
    flatAmenities: {
        lights: { type: Number },
        ceilingFan: { type: Number },
        geysers: { type: Number },
        chimney: { type: Boolean },
        callingBell: { type: Boolean },
        wardrobes: { type: Number },
        lofts: { type: Number },
        kitchenCabinets: { type: Number },
        clothHanger: { type: Number },
        pipedGasConnection: { type: Boolean },
        gasStoveWithCylinder: { type: Boolean },
        ironingStand: { type: Boolean },
        bathtub: { type: Boolean },
        shower: { type: Boolean },
        sofa: { type: Boolean },
        coffeeTable: { type: Boolean },
        tvUnit: { type: Boolean },
        diningTableWithChairs: { type: Number },
        cotWithMattress: { type: Number },
        sideTable: { type: Number },
        studyTableWithChair: { type: Number },
        television: { type: Boolean },
        refrigerator: { type: Boolean },
        washingMachine: { type: Boolean },
        dishwasher: { type: Boolean },
        waterPurifier: { type: Boolean },
        microwaveOven: { type: Boolean },
        inductionCooktop: { type: Boolean },
        gasStove: { type: Boolean },
        airConditioner: { type: Number },
        desertCooler: { type: Number },
        ironBox: { type: Boolean },
        exhaustFan: { type: Number },
    },
    societyAmenities: {
        powerutility: { type: [String] },
        parkingtranspotation: { type: [String] },
        recreationalsportsfacilities: { type: [String] },
        childrenfamilyamenities: { type: [String] },
        healthwellnessfacilities: { type: [String] },
        shoppingconviencestores: { type: [String] },
        ecofriendlysustainable: { type: [String] },
        communityculturalspaces: { type: [String] },
        smarthometechnology: { type: [String] },
        otheritems: { type: [String] },
    },
    priceDetails: {
        propertyPrice: { type: Number },
        pricetype: { type: String },
    },
    registration: {
        chargestype: { type: String },
        registrationAmount: { type: Number },
        stampDutyAmount: { type: Number },
    },
    brokerage: {
        required: { type: String },
        amount: { type: Number },
    },
    availability: {
        type: { type: String },
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
        videoTour: { type: String },
        documents: [{ type: String, required: false }]
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Residential' },
        intent: { type: String, default: 'Sale' },
        propertyName: { type: String, default: 'Appartment' },
        status: { type: String, default: 'Available' },
        updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false },
        updatedAt: { type: Date, default: Date.now },
    }
}, {
    timestamps: true
});
const ResidentialSaleApartment = mongoose_1.default.model('ResidentialSaleApartment', ResidentailSaleApartmentSchema);
exports.default = ResidentialSaleApartment;
