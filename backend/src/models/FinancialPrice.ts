import mongoose, { Schema, Document } from "mongoose";

interface IFinancialPrice extends Document {
  propertyId: mongoose.Types.ObjectId; // Reference to Property
  price: number;
}

const FinancialPriceSchema = new Schema<IFinancialPrice>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const FinancialPrice = mongoose.model<IFinancialPrice>("FinancialPrice", FinancialPriceSchema);
export default FinancialPrice;
