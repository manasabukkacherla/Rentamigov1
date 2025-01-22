// models/Property.ts
import { Schema, model, models, Document } from "mongoose";

// Define the interface for the Property document
interface IProperty extends Document {
  propertyName: string; // Name of the property
  ownerName: string; // Owner's name
  ownerNumber: string; // Owner's contact number
  propertyType?: string; // Type of property (optional, as not provided in the form directly)
  propertyConfiguration: string; // E.g., 1 BHK, 2 BHK, etc.
  furnishingStatus: "Unfurnished" | "Semi Furnished" | "Fully Furnished" | "Partially Furnished"; // Furnishing status
  facing: string; // Facing direction (e.g., North, East, etc.)
  amenities: string[]; // List of selected amenities
  createdAt?: Date; // Timestamp for document creation
  updatedAt?: Date; // Timestamp for document updates
}

// Define the Mongoose schema for Property
const PropertySchema = new Schema<IProperty>(
  {
    propertyName: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
    },
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
    },
    ownerNumber: {
      type: String,
      required: [true, "Owner contact number is required"],
      match: [/^\d{10}$/, "Please provide a valid 10-digit contact number"], // Adjust regex if needed
      trim: true,
    },
    propertyType: {
      type: String,
      enum: ["Residential", "Commercial", "Industrial", "Agricultural"], // You can add more property types
    },
    propertyConfiguration: {
      type: String,
      required: [true, "Property configuration is required"],
      enum: ["Studio Room (1 RK)", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"], // List of configurations
    },
    furnishingStatus: {
      type: String,
      required: [true, "Furnishing status is required"],
      enum: ["Unfurnished", "Semi Furnished", "Fully Furnished", "Partially Furnished"],
    },
    facing: {
      type: String,
      required: [true, "Facing direction is required"],
      enum: [
        "North",
        "East",
        "South",
        "West",
        "North-East",
        "South-East",
        "North-West",
        "South-West",
      ],
    },
    amenities: {
      type: [String], // Array of amenity IDs
      validate: {
        validator: (value: string[]) => Array.isArray(value),
        message: "Amenities must be an array of strings",
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Property model
const Property = models.Property || model<IProperty>("Property", PropertySchema);

export default Property;
