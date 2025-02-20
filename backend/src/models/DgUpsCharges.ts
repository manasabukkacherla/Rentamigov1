import mongoose, { Schema, Document } from "mongoose";

interface IDgUpsCharges extends Document {
  propertyId: mongoose.Types.ObjectId; // Property reference
  dgUpsCharges: boolean;
}

const DgUpsChargesSchema = new Schema<IDgUpsCharges>({
  propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  dgUpsCharges: { type: Boolean, default: false },
}, { timestamps: true });

const DgUpsCharges = mongoose.model<IDgUpsCharges>("DgUpsCharges", DgUpsChargesSchema);
export default DgUpsCharges;
