import mongoose, { Schema, Document } from "mongoose";

interface IPropertyDetails extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User who owns the property
  building?: string; // Building name (optional)
  locality: string; // Locality name (required)
}

const PropertyDetailsFormSchema = new Schema<IPropertyDetails>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    building: { type: String, default: "" }, // Optional
    locality: { type: String, required: true }, // Required
  },
  { timestamps: true }
);

const PropertyDetailsForm = mongoose.models.PropertyDetails || mongoose.model<IPropertyDetails>("PropertyDetails", PropertyDetailsFormSchema);

export default PropertyDetailsForm;
