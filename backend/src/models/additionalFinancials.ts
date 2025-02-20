import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Additional Financials document
interface IAdditionalFinancials extends Document {
  propertyId: mongoose.Types.ObjectId;
  negotiable: boolean;
  dgUpsCharges: boolean;
  electricityCharges: boolean;
  waterCharges: boolean;
}

// Define the schema
const AdditionalFinancialsSchema = new Schema<IAdditionalFinancials>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true }, // Linking to Property
    negotiable: { type: Boolean, required: true, default: false },
    dgUpsCharges: { type: Boolean, required: true, default: false },
    electricityCharges: { type: Boolean, required: true, default: false },
    waterCharges: { type: Boolean, required: true, default: false },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const AdditionalFinancials = mongoose.model<IAdditionalFinancials>("AdditionalFinancials", AdditionalFinancialsSchema);
export default AdditionalFinancials;
