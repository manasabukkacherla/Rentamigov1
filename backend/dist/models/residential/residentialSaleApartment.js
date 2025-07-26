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
const ResidentialSaleApartmentSchema = new mongoose_1.Schema({
    propertyId: { type: String, required: true, unique: true },
    basicInformation: {
        title: { type: String },
        showflat: { type: Boolean },
        apartmentType: { type: String },
        flatno: { type: Number },
        floor: { type: Number },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipCode: { type: String },
            location: {
                longitude: { type: String },
                latitude: { type: String },
                locationLabel: { type: String },
            }
        },
    },
    propertyDetails: {
        propertysize: { type: Number },
        bedrooms: { type: Number },
        washrooms: { type: Number },
        bathrooms: { type: Number },
        balconies: { type: Number },
        parkingdetails: { type: String },
        ExtraRooms: [{ type: String }],
        utility: { type: String },
        Furnishingstatus: { type: String },
        totalfloors: { type: Number },
        propertyonfloor: { type: Number },
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
    },
    priceDetails: {
        propertyprice: { type: Number },
        pricetype: { type: String },
        stampcharges: {
            chargestype: { type: String },
            registrationcharges: { type: Number },
            stampdutycharges: { type: Number },
            othercharges: {
                water: {
                    amount: { type: Number },
                    type: { type: String },
                },
                electricity: {
                    amount: { type: Number },
                    type: { type: String },
                },
                gas: {
                    amount: { type: Number },
                    type: { type: String },
                },
                others: {
                    amount: { type: Number },
                    type: { type: String },
                }
            },
            brokerage: {
                required: { type: String },
                amount: { type: Number }
            },
        },
    },
    availability: {
        availablefrom: { type: String },
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
                id: String,
                type: String,
                url: String,
                title: String,
                tags: [String],
                roomType: String,
                category: String
            }],
        videoTour: { type: String, required: false, default: '' },
        documents: [{ type: String, required: false }]
    },
    metadata: {
        createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        propertyType: { type: String, default: 'Residential' },
        intent: { type: String, default: 'Sale' },
        propertyName: { type: String, default: 'Apartment' },
        status: { type: String, default: 'Available' },
        updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false },
        updatedAt: { type: Date, default: Date.now },
    }
}, {
    timestamps: true
});
// Check if the model exists before compiling it
exports.default = mongoose_1.default.models.ResidentialSaleApartment || mongoose_1.default.model('ResidentialSaleApartment', ResidentialSaleApartmentSchema);
