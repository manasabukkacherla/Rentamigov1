import mongoose, { Schema, Document } from "mongoose";

interface ILiftsStaircases extends Document {
  propertyId: mongoose.Types.ObjectId; // Reference to Property
  staircaseCount: number;
  passengerLifts: number;
  serviceLifts: number;
}

const LiftsStaircasesSchema = new Schema<ILiftsStaircases>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    staircaseCount: { type: Number, required: true, min: 0 },
    passengerLifts: { type: Number, required: true, min: 0 },
    serviceLifts: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const LiftsStaircases = mongoose.model<ILiftsStaircases>(
  "LiftsStaircases",
  LiftsStaircasesSchema
);
export default LiftsStaircases;
