import mongoose, { Schema, Document } from "mongoose";

// Define an interface for SocietyAmenities
export interface ISocietyAmenities extends Document {
  propertyId: mongoose.Schema.Types.ObjectId; // Reference to the BasicDetails model
  amenities: Record<string, boolean>; // Dynamic field to store amenities
}

// Define the schema for society amenities
const SocietyAmenitiesSchema: Schema<ISocietyAmenities> = new Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BasicDetails",
      required: true
    },
    amenities: {
      type: Map,
      of: Boolean, // This allows dynamic boolean values for amenities
      default: {}
    }
  },
  { timestamps: true }
);

// Create and export the SocietyAmenities model
const SocietyAmenitiesModel = mongoose.model<ISocietyAmenities>(
  "SocietyAmenities",
  SocietyAmenitiesSchema
);
export default SocietyAmenitiesModel;
