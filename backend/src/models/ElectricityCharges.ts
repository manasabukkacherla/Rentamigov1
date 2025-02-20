import mongoose, { Schema, Document } from "mongoose";

interface IElectricityCharges extends Document {
  propertyId: mongoose.Types.ObjectId; // Reference to Property
  isIncluded: boolean;
}

const ElectricityChargesSchema = new Schema<IElectricityCharges>({
  propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  isIncluded: { type: Boolean, required: true },
}, { timestamps: true });

const ElectricityCharges = mongoose.model<IElectricityCharges>("ElectricityCharges", ElectricityChargesSchema);
export default ElectricityCharges;
