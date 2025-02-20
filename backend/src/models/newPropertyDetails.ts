import mongoose, { Schema, Document } from "mongoose";

interface IPropertyDetails extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User who posted the property
  building?: string;
  locality: string;
  propertyName: string;
}

const PropertyDetailsSchema = new Schema<IPropertyDetails>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
    building: { type: String, trim: true },
    locality: { type: String, required: true, trim: true },
    propertyName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const PropertyDetails = mongoose.model<IPropertyDetails>("PropertyDetails", PropertyDetailsSchema);
export default PropertyDetails;
