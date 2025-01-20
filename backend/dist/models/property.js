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
const propertySchema = new mongoose_1.Schema({
    // Personal Details
    ownerType: {
        type: String,
        enum: ["Owner", "Agent", "Builder"],
        required: true,
    },
    // name: {
    //   type: String,
    //   required: true,
    // },
    // whatsappNumber: {
    //   type: String,
    //   required: true,
    // },
    // email: {
    //   type: String,
    //   required: true,
    // },
    // Property Details
    listingType: {
        type: String,
        enum: ["Sale", "Rent/Lease", "PG/Hostel"],
        required: true,
    },
    propertyType: {
        type: String,
        enum: [
            "Apartment",
            "Standalone Building",
            "Villa",
            "Row House",
            "Studio Room",
        ],
        required: true,
    },
    societySize: {
        type: String,
        enum: ["<50", "50-100", ">100"],
    },
    city: {
        type: String,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    // Property Features
    bedrooms: {
        type: String,
        enum: ["Studio Room", "1 BHK", "2 BHK", "3 BHK", "3+ BHK", "4 BHK"],
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    balconies: {
        type: Number,
        required: true,
    },
    studyRoom: {
        type: String,
        // required: true,
    },
    servantRoom: {
        type: String,
        // required: true,
    },
    pujaRoom: {
        type: String,
        // required: true,
    },
    theaterRoom: {
        type: String,
        // required: true,
    },
    gymRoom: {
        type: String,
        // required: true,
    },
    floorOfTheProperty: {
        type: Number,
        required: true,
    },
    totalNoOfFloors: {
        type: Number,
        required: true,
    },
    superBuiltUp: {
        type: Number,
        required: true,
    },
    builtUp: {
        type: Number,
        required: true,
    },
    carpetArea: {
        type: Number,
        required: true,
    },
    ageOfTheProperty: {
        type: String,
        enum: ["<5 Years", "5-10 Years", ">10 Years"],
        required: true,
    },
    furnishingStatus: {
        type: String,
        enum: ["Unfurnished", "Semi Furnished", "Fully Furnished"],
        required: true,
    },
    facing: {
        type: String,
        enum: [
            "North",
            "East",
            "South",
            "West",
            "North-East",
            "South-East",
            "North-West",
            "South-West",
        ],
        required: true,
    },
    // Society Amenities
    lift: { type: Boolean, required: true },
    powerBackup: { type: Boolean, required: true },
    security: { type: Boolean, required: true },
    cctv: { type: Boolean, required: true },
    gym: { type: Boolean, required: true },
    swimmingPool: { type: Boolean, required: true },
    kidsPool: { type: Boolean, required: true },
    jacuzzi: { type: Boolean, required: true },
    clubHouse: { type: Boolean, required: true },
    joggingTrack: { type: Boolean, required: true },
    childrenPlayArea: { type: Boolean, required: true },
    badmintonCourt: { type: Boolean, required: true },
    lawnTennisCourt: { type: Boolean, required: true },
    tableTennis: { type: Boolean, required: true },
    squashCourt: { type: Boolean, required: true },
    foosball: { type: Boolean, required: true },
    steamRoom: { type: Boolean, required: true },
    carrom: { type: Boolean, required: true },
    chessBoard: { type: Boolean, required: true },
    multipurposeHall: { type: Boolean, required: true },
    yogaMeditationCenter: { type: Boolean, required: true },
    flowerPark: { type: Boolean, required: true },
    dayToUtilityStores: { type: Boolean, required: true },
    thaiMassageParlor: { type: Boolean, required: true },
    salon: { type: Boolean, required: true },
    // Flat Amenities
    airConditioner: { type: Boolean, required: true },
    bed: { type: Boolean, required: true },
    wardrobe: { type: Boolean, required: true },
    tv: { type: Boolean, required: true },
    refrigerator: { type: Boolean, required: true },
    washingMachine: { type: Boolean, required: true },
    microwave: { type: Boolean, required: true },
    sofa: { type: Boolean, required: true },
    diningTable: { type: Boolean, required: true },
    gasConnection: { type: Boolean, required: true },
    playStation: { type: Boolean, required: true },
    // Photos organized by category
    photos: {
        exteriorView: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        livingRoom: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        kitchen: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        diningRoom: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        bedroom1: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        bedroom2: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        bedroom3: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        bedroom4: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        bathroom1: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        bathroom2: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        bathroom3: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        bathroom4: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        balcony1: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        balcony2: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        balcony3: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        balcony4: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        studyRoom: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        pujaRoom: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        theaterRoom: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        gymRoom: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        utilityArea: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
        others: [{ type: String, match: /\.(jpg|jpeg|gif|bmp|png)$/i }],
    },
    // Additional Details
    propertyName: {
        type: String,
        required: true,
    },
    flatNo: {
        type: String,
        required: true,
    },
    address: {
        line1: { type: String, required: true },
        line2: { type: String },
        line3: { type: String },
    },
    availability: {
        date: { type: Date, required: true },
        status: {
            type: String,
            enum: ["Available", "Unavailable"],
            required: true,
        },
    },
    exteriorView: { type: String, required: true },
    livingRoom: {
        type: String,
        //  required: true
    },
    kitchen: { type: String, required: true },
    diningRoom: { type: String },
    bedroom1: { type: String, required: true },
    bedroom2: {
        type: String,
        //  required: true
    },
    bedroom3: { type: String },
    bedroom4: { type: String },
    bathroom1: { type: String, required: true },
    bathroom2: { type: String },
    bathroom3: { type: String },
    bathroom4: { type: String },
    balcony1: { type: String },
    balcony2: { type: String },
    balcony3: { type: String },
    balcony4: { type: String },
    utilityArea: { type: String },
    propertyVideo: { type: String },
    // Property Location
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    locality: { type: String, required: true },
    area: { type: String, required: true },
    pinCode: { type: Number, required: true },
    // Commercials
    monthlyRent: { type: Number },
    maintenance: { type: String },
    maintenanceAmount: { type: Number },
    maintenanceFrequency: {
        type: String,
        enum: ["Monthly", "Quarterly", "Yearly"],
    },
    // Restrictions
    bachelorTenants: {
        type: String,
        enum: ["Yes", "No", "Doesn't Matter"],
        required: true,
    },
    nonVegTenants: {
        type: String,
        enum: ["Yes", "No", "Doesn't Matter"],
        required: true,
    },
    tenantWithPets: {
        type: String,
        enum: ["Yes", "No", "Doesn't Matter", "NA"],
        required: true,
    },
    propertyOverlooking: {
        type: String,
        enum: ["Garden / Park", "Pool", "Main Road"],
        required: true,
    },
    carParking: {
        type: String,
        enum: ["Yes / No", "If Yes How many"],
        required: true,
    },
    twoWheelerParking: {
        type: String,
        enum: ["Yes / No", "If Yes How many"],
        required: true,
    },
    flooringType: {
        type: String,
        enum: [
            "Ceramic Tiles",
            "Marble",
            "Vitrified",
            "Mosaic",
            "Wooden",
            "Granite",
            "Normal Tile",
        ],
        required: true,
    },
}, 
// Timestamps
{
    timestamps: true,
});
const Property = mongoose_1.default.models.Property ||
    mongoose_1.default.model("Property", propertySchema);
exports.default = Property;
