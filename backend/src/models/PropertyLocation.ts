import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for PropertyLocation
interface IPropertyLocation extends Document {
  property: Types.ObjectId; // Reference to the Property collection
  userId: Types.ObjectId; // User ID who added the location
  username: string; // Username of the user
  fullName: string; // Full name of the user
  role: "owner" | "agent" | "tenant" | "pg" | "employee"; // User role
  propertyName: string; // Name of the property from the Property collection
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

// Define the PropertyLocation schema
const PropertyLocationSchema = new Schema<IPropertyLocation>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property", // Reference to the Property collection
      required: [true, "Property reference is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
      required: [true, "User ID is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["owner", "agent", "tenant", "pg", "employee"],
      required: [true, "User role is required"],
    },
    propertyName: {
      type: String,
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

// Middleware to populate `propertyName` before saving
PropertyLocationSchema.pre("save", async function (next) {
  const propertyLocation = this as IPropertyLocation;

  if (propertyLocation.property) {
    // Fetch the associated property document
    const property = await model("Property").findById(propertyLocation.property);
    if (property) {
      propertyLocation.propertyName = property.propertyName; // Assign propertyName dynamically
    }
  }
  next();
});

// Define and export the PropertyLocation model
const PropertyLocation =
  models.PropertyLocation ||
  model<IPropertyLocation>("PropertyLocation", PropertyLocationSchema);

export default PropertyLocation;
