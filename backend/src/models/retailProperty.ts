import mongoose, { Schema, Document } from "mongoose";

interface IRetailProperty extends Document {
  userId: mongoose.Types.ObjectId;
  suitableFor: string[];
  locationHub: string;
  otherLocationHub?: string;
  builtUpArea: string;
  carpetArea: string;
  entranceWidth: string;
  ceilingHeight: string;
  locatedNear: string[];
  ownership: string;
  expectedRent: string;
  securityDeposit: string;
}

const RetailPropertySchema = new Schema<IRetailProperty>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    suitableFor: { type: [String], required: true },
    locationHub: { type: String, required: true },
    otherLocationHub: { type: String, default: "" },
    builtUpArea: { type: String, required: true },
    carpetArea: { type: String, required: true },
    entranceWidth: { type: String, required: true },
    ceilingHeight: { type: String, required: true },
    locatedNear: { type: [String], required: true },
    ownership: { type: String, required: true },
    expectedRent: { type: String, required: true },
    securityDeposit: { type: String, required: false },
  },
  { timestamps: true }
);

const RetailProperty = mongoose.models.RetailProperty || mongoose.model<IRetailProperty>("RetailProperty", RetailPropertySchema);
export default RetailProperty;
