import mongoose, { Schema, Document } from "mongoose";

interface IFloor extends Document {
  propertyId: mongoose.Types.ObjectId; // Reference to Property
  totalFloors: number;
  yourFloor: number;
}

const FloorSchema = new Schema<IFloor>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    totalFloors: { type: Number, required: true, min: 1 },
    yourFloor: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Floor = mongoose.model<IFloor>("Floor", FloorSchema);
export default Floor;
