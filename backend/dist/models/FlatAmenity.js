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
const FlatAmenitySchema = new mongoose_1.Schema({
    flatId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Flat", required: false }, // Optional reference to a flat
    lights: { type: Number, default: 0 },
    ceilingFan: { type: Number, default: 0 },
    geysers: { type: Number, default: 0 },
    chimney: { type: Boolean, default: false },
    callingBell: { type: Boolean, default: false },
    wardrobes: { type: Number, default: 0 },
    lofts: { type: Number, default: 0 },
    kitchenCabinets: { type: Number, default: 0 },
    clothHanger: { type: Number, default: 0 },
    pipedGasConnection: { type: Boolean, default: false },
    gasStoveWithCylinder: { type: Boolean, default: false },
    ironingStand: { type: Boolean, default: false },
    bathtub: { type: Boolean, default: false },
    shower: { type: Boolean, default: false },
    sofa: { type: Boolean, default: false },
    coffeeTable: { type: Boolean, default: false },
    tvUnit: { type: Boolean, default: false },
    diningTableWithChairs: { type: Number, default: 0 },
    cotWithMattress: { type: Number, default: 0 },
    sideTable: { type: Number, default: 0 },
    studyTableWithChair: { type: Number, default: 0 },
    television: { type: Boolean, default: false },
    refrigerator: { type: Boolean, default: false },
    washingMachine: { type: Boolean, default: false },
    dishwasher: { type: Boolean, default: false },
    waterPurifier: { type: Boolean, default: false },
    microwaveOven: { type: Boolean, default: false },
    inductionCooktop: { type: Boolean, default: false },
    gasStove: { type: Boolean, default: false },
    airConditioner: { type: Number, default: 0 },
    desertCooler: { type: Number, default: 0 },
    ironBox: { type: Boolean, default: false },
    exhaustFan: { type: Number, default: 0 },
});
exports.default = mongoose_1.default.model("FlatAmenity", FlatAmenitySchema);
