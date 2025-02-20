import mongoose, { Schema, Document } from "mongoose";

interface IWaterCharges extends Document {
  userId: mongoose.Types.ObjectId;
  isIncluded: boolean;
}

const WaterChargesSchema = new Schema<IWaterCharges>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isIncluded: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const WaterCharges =
  mongoose.models.WaterCharges || mongoose.model<IWaterCharges>("WaterCharges", WaterChargesSchema);
export default WaterCharges;
