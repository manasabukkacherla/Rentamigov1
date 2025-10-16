import mongoose, { Schema, Document } from "mongoose";

export interface IAmenity extends Document {
  category: string;
  name: string;
  isAvailable: boolean;
}

const AmenitySchema = new Schema<IAmenity>({
  category: { type: String, required: true },
  name: { type: String, required: true },
  isAvailable: { type: Boolean, default: false }
});

export default mongoose.model<IAmenity>("Amenity", AmenitySchema);
