import mongoose, { Schema, Document } from "mongoose";

export interface IFlatAmenity extends Document {
  flatId: mongoose.Schema.Types.ObjectId; // Reference to a Flat (if applicable)
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
}

const FlatAmenitySchema = new Schema<IFlatAmenity>({
  flatId: { type: Schema.Types.ObjectId, ref: "Flat", required: false }, // Optional reference to a flat
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

export default mongoose.model<IFlatAmenity>("FlatAmenity", FlatAmenitySchema);
