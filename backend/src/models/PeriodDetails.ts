import mongoose, { Schema, Document } from "mongoose";

interface IPeriodDetails extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User who owns the property
  lockInPeriod: number; // Lock-in period in months
  rentIncrease: number; // Rent increase in percentage
}

const PeriodDetailsSchema = new Schema<IPeriodDetails>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
    lockInPeriod: { type: Number, required: true },
    rentIncrease: { type: Number, required: true },
  },
  { timestamps: true }
);

const PeriodDetails = mongoose.model<IPeriodDetails>("PeriodDetails", PeriodDetailsSchema);
export default PeriodDetails;
