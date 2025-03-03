import mongoose, { Schema, Document } from "mongoose";

// Define an interface for Flat Amenities
export interface IFlatAmenities extends Document {
  propertyId: string;
  amenities: {
    lights: number;
    ceilingFan: number;
    geysers: number;
    chimney: boolean;
    callingBell: boolean;
    wardrobes: number;
    lofts: number;
    kitchenCabinets: number;
    clothHanger: number;
    pipedGasConnection: boolean;
    gasStoveWithCylinder: boolean;
    ironingStand: boolean;
    bathtub: boolean;
    shower: boolean;
    sofa: boolean;
    coffeeTable: boolean;
    tvUnit: boolean;
    diningTableWithChairs: number;
    cotWithMattress: number;
    sideTable: number;
    studyTableWithChair: number;
    television: boolean;
    refrigerator: boolean;
    washingMachine: boolean;
    dishwasher: boolean;
    waterPurifier: boolean;
    microwaveOven: boolean;
    inductionCooktop: boolean;
    gasStove: boolean;
    airConditioner: number;
    desertCooler: number;
    ironBox: boolean;
    exhaustFan: number;
  };
}

// Define the schema for Flat Amenities
const FlatAmenitiesSchema: Schema<IFlatAmenities> = new Schema(
  {
    propertyId: {
      type: String,
      required: true,
      unique: true
    },
    amenities: {
      lights: { type: Number, required: true },
      ceilingFan: { type: Number, required: true },
      geysers: { type: Number, required: true },
      chimney: { type: Boolean, required: true },
      callingBell: { type: Boolean, required: true },
      wardrobes: { type: Number, required: true },
      lofts: { type: Number, required: true },
      kitchenCabinets: { type: Number, required: true },
      clothHanger: { type: Number, required: true },
      pipedGasConnection: { type: Boolean, required: true },
      gasStoveWithCylinder: { type: Boolean, required: true },
      ironingStand: { type: Boolean, required: true },
      bathtub: { type: Boolean, required: true },
      shower: { type: Boolean, required: true },
      sofa: { type: Boolean, required: true },
      coffeeTable: { type: Boolean, required: true },
      tvUnit: { type: Boolean, required: true },
      diningTableWithChairs: { type: Number, required: true },
      cotWithMattress: { type: Number, required: true },
      sideTable: { type: Number, required: true },
      studyTableWithChair: { type: Number, required: true },
      television: { type: Boolean, required: true },
      refrigerator: { type: Boolean, required: true },
      washingMachine: { type: Boolean, required: true },
      dishwasher: { type: Boolean, required: true },
      waterPurifier: { type: Boolean, required: true },
      microwaveOven: { type: Boolean, required: true },
      inductionCooktop: { type: Boolean, required: true },
      gasStove: { type: Boolean, required: true },
      airConditioner: { type: Number, required: true },
      desertCooler: { type: Number, required: true },
      ironBox: { type: Boolean, required: true },
      exhaustFan: { type: Number, required: true }
    }
  },
  { timestamps: true }
);

// Create and export the FlatAmenities model
const FlatAmenitiesModel = mongoose.model<IFlatAmenities>(
  "FlatAmenities",
  FlatAmenitiesSchema
);
export default FlatAmenitiesModel;
