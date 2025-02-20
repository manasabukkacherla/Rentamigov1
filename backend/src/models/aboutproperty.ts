import mongoose, { Schema, Document } from "mongoose";

// Define the interface for AboutProperty
interface IAboutProperty extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the user who owns the property
  zoneType: string;
  locationHub: string;
  otherLocationHub?: string;
  propertyCondition: string;
  builtUpArea: number;
  carpetArea?: number;
  ownership: string;
  constructionStatus?: string;
  flooring?: string;
}

// Define the schema
const AboutPropertySchema = new Schema<IAboutProperty>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User reference
    zoneType: { type: String, required: true },
    locationHub: { type: String, required: true },
    otherLocationHub: { type: String, default: "" },
    propertyCondition: { type: String, required: true },
    builtUpArea: { type: Number, required: true },
    carpetArea: { type: Number },
    ownership: { type: String, required: true },
    constructionStatus: { type: String, default: "" },
    flooring: { type: String, default: "" },
  },
  { timestamps: true }
);

const AboutProperty = mongoose.model<IAboutProperty>("AboutProperty", AboutPropertySchema);

export default AboutProperty;
