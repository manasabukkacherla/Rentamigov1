import mongoose, { Schema, Document } from "mongoose";

interface IFinancials extends Document {
  propertyId: mongoose.Types.ObjectId; // Reference to Property
  expectedRent: number;
  securityDeposit?: number;
}

const FinancialsSchema = new Schema<IFinancials>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    expectedRent: { type: Number, required: true, min: 0 },
    securityDeposit: { type: Number, min: 0 },
  },
  { timestamps: true }
);

const Financials = mongoose.model<IFinancials>("Financials", FinancialsSchema);
export default Financials;
