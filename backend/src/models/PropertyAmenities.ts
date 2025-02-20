import mongoose, { Schema, Document } from "mongoose";

interface IPropertyAmenities extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User who owns the property
  propertyId: mongoose.Types.ObjectId; // Reference to the Property
  selectedAmenities: string[]; // List of selected amenities
}

const PropertyAmenitiesSchema = new Schema<IPropertyAmenities>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    selectedAmenities: { type: [String], required: true },
  },
  { timestamps: true }
);

const PropertyAmenities = mongoose.model<IPropertyAmenities>("PropertyAmenities", PropertyAmenitiesSchema);
export default PropertyAmenities;
