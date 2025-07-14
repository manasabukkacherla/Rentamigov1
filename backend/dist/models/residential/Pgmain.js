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
const PgMainSchema = new mongoose_1.Schema({
    propertyId: { type: String, required: true, unique: true },
    pgDetails: {
        name: { type: String, default: '' },
        accommodationType: { type: String, enum: ["boys", "girls", "both boys and girls"], default: "both boys and girls" },
        address: { type: String, default: '' },
    },
    location: {
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 },
    },
    roomConfiguration: {
        totalRooms: { type: Number, default: 0 },
        sharingTypes: { type: [String], default: [] },
        customShare: { type: String },
        roomSize: { type: Number },
        singleRoomAmenities: { type: [String], default: [] },
        doubleShareRoomAmenities: { type: [String], default: [] },
        tripleShareRoomAmenities: { type: [String], default: [] },
        fourShareRoomAmenities: { type: [String], default: [] },
        fiveShareRoomAmenities: { type: [String], default: [] },
        customShareRoomAmenities: { type: [String], default: [] },
    },
    commonAreaAmenitiesAndServices: { type: [String], default: [] },
    otherFeaturesAndRestrictions: {
        otherFeatures: { type: [String], default: [] },
        restrictions: { type: [String], default: [] },
    },
    foodServices: {
        available: { type: Boolean, default: false },
        includeSnacks: { type: Boolean, default: false },
        weekMeals: { type: mongoose_1.Schema.Types.Mixed, default: {} },
        mealTimesState: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    },
    pricing: {
        rent: { type: Number, default: 0 },
        deposit: { type: Number },
        maintenance: { type: Number },
        includedUtilities: { type: [String], default: [] },
        terms: { type: String },
        roomSharePricing: {
            singleShare: {
                monthlyRent: { type: String },
                advancePaymentMonths: { type: String },
                lockInPeriod: { type: String },
                noticePeriod: { type: String },
            },
            doubleShare: {
                monthlyRent: { type: String },
                advancePaymentMonths: { type: String },
                lockInPeriod: { type: String },
                noticePeriod: { type: String },
            },
            tripleShare: {
                monthlyRent: { type: String },
                advancePaymentMonths: { type: String },
                lockInPeriod: { type: String },
                noticePeriod: { type: String },
            },
            fourShare: {
                monthlyRent: { type: String },
                advancePaymentMonths: { type: String },
                lockInPeriod: { type: String },
                noticePeriod: { type: String },
            },
            fiveShare: {
                monthlyRent: { type: String },
                advancePaymentMonths: { type: String },
                lockInPeriod: { type: String },
                noticePeriod: { type: String },
            },
            multiShare: {
                monthlyRent: { type: String },
                advancePaymentMonths: { type: String },
                lockInPeriod: { type: String },
                noticePeriod: { type: String },
                numberOfPersons: { type: String },
            },
        },
    },
    media: {
        photos: { type: [String], default: [] }, // Base64 encoded strings or URLs
        videos: { type: [String], default: [] }, // Base64 encoded strings or URLs
        mediaItems: [
            {
                id: { type: String },
                type: { type: String, enum: ["photo", "video"] },
                url: { type: String }, // Base64 encoded string or URL
                title: { type: String },
                tags: { type: [String], default: [] },
                roomType: { type: String },
            }
        ],
    },
    metadata: {
        userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
        userName: { type: String, default: 'Not Specified' },
        createdAt: { type: Date, default: Date.now },
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('PgMain', PgMainSchema);
