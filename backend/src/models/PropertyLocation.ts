// models/PropertyLocation.ts
import { Schema, model, models, Document } from "mongoose";

interface IPropertyLocation extends Document {
  property: string; // Reference to the Property collection
  propertyName: string;
  flatNo: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  latitude: string;
  longitude: string;
  locality: string;
  area?: string;
  pinCode: string;
  createdAt: Date;
}

const PropertyLocationSchema = new Schema<IPropertyLocation>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property", // Reference to the Property collection
      required: [true, "Property reference is required"],
    },
    propertyName: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
    },
    flatNo: {
      type: String,
      required: [true, "Flat number is required"],
      trim: true,
    },
    addressLine1: {
      type: String,
      required: [true, "Address Line 1 is required"],
      trim: true,
    },
    addressLine2: {
      type: String,
      trim: true,
    },
    addressLine3: {
      type: String,
      trim: true,
    },
    latitude: {
      type: String,
      required: [true, "Latitude is required"],
      validate: {
        validator: (value: string) => /^-?\d+(\.\d+)?$/.test(value),
        message: "Please enter a valid latitude",
      },
    },
    longitude: {
      type: String,
      required: [true, "Longitude is required"],
      validate: {
        validator: (value: string) => /^-?\d+(\.\d+)?$/.test(value),
        message: "Please enter a valid longitude",
      },
    },
    locality: {
      type: String,
      required: [true, "Locality is required"],
      trim: true,
    },
    area: {
      type: String,
      trim: true,
    },
    pinCode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [/^\d{6}$/, "Please enter a valid 6-digit pincode"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const PropertyLocation =
  models.PropertyLocation ||
  model<IPropertyLocation>("PropertyLocation", PropertyLocationSchema);

export default PropertyLocation;
