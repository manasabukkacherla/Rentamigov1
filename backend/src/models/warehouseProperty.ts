import mongoose, { Schema, Document } from "mongoose";

interface IWarehouseProperty extends Document {
  userId: mongoose.Types.ObjectId;
  zoneType: string;
  locationHub: string;
  otherLocationHub?: string;
  builtUpArea: string;
  carpetArea: string;
  ownership: string;
  expectedRent: string;
  securityDeposit: string;
}

const WarehousePropertySchema = new Schema<IWarehouseProperty>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    zoneType: { type: String, required: true },
    locationHub: { type: String, required: true },
    otherLocationHub: { type: String, default: "" },
    builtUpArea: { type: String, required: true },
    carpetArea: { type: String, required: true },
    ownership: { type: String, required: true },
    expectedRent: { type: String, required: true },
    securityDeposit: { type: String, default: "" },
  },
  { timestamps: true }
);

const WarehouseProperty =
  mongoose.models.WarehouseProperty || mongoose.model<IWarehouseProperty>("WarehouseProperty", WarehousePropertySchema);
export default WarehouseProperty;
