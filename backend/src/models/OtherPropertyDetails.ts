import mongoose, { Schema, Document } from "mongoose";

interface IOtherPropertyDetails extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User who posted the property
  isPreLeased: boolean;
  currentRent?: number;
  leaseYears?: number;
  expectedRoi?: number;
}

const OtherPropertyDetailsSchema = new Schema<IOtherPropertyDetails>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
    isPreLeased: { type: Boolean, required: true },
    currentRent: { type: Number, default: null },
    leaseYears: { type: Number, default: null },
    expectedRoi: { type: Number, default: null },
  },
  { timestamps: true }
);

const OtherPropertyDetails = mongoose.model<IOtherPropertyDetails>("OtherPropertyDetails", OtherPropertyDetailsSchema);
export default OtherPropertyDetails;
