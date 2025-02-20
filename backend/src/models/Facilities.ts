import mongoose, { Schema, Document } from "mongoose";

interface IFacilities extends Document {
  propertyId: mongoose.Types.ObjectId; // Reference to Property
  privateWashrooms: number;
  publicWashrooms: number;
}

const FacilitiesSchema = new Schema<IFacilities>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    privateWashrooms: { type: Number, required: true, min: 0 },
    publicWashrooms: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Facilities = mongoose.model<IFacilities>("Facilities", FacilitiesSchema);
export default Facilities;
