import mongoose, { Schema, Document } from "mongoose";

interface ITaxGovtCharges extends Document {
  userId: mongoose.Types.ObjectId;
  isIncluded: boolean;
}

const TaxGovtChargesSchema = new Schema<ITaxGovtCharges>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isIncluded: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const TaxGovtCharges = mongoose.models.TaxGovtCharges || mongoose.model<ITaxGovtCharges>("TaxGovtCharges", TaxGovtChargesSchema);
export default TaxGovtCharges;
