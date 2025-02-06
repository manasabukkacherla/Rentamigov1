import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for PropertyAvailability
interface IPropertyAvailability extends Document {
  property: Types.ObjectId; // Reference to the Property collection
  userId: Types.ObjectId; // User ID who added the availability
  username: string; // Username of the user
  fullName: string; // Full name of the user
  role: "owner" | "agent" | "tenant" | "pg" | "employee"; // User role
  propertyName: string; // Name of the property from the Property collection
  availableFrom: Date; // Availability date
  createdAt: Date;
}

// Define the PropertyAvailability schema
const PropertyAvailabilitySchema = new Schema<IPropertyAvailability>(
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
      required: false, // Will be populated dynamically
      trim: true,
    },
    availableFrom: {
      type: Date,
      required: [true, "Availability date is required"],
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
PropertyAvailabilitySchema.pre("save", async function (next) {
  const propertyAvailability = this as IPropertyAvailability;

  if (propertyAvailability.property) {
    // Fetch the associated property document
    const property = await model("Property").findById(propertyAvailability.property);
    if (property) {
      propertyAvailability.propertyName = property.propertyName; // Dynamically assign propertyName
    }
  }
  next();
});

// Define and export the PropertyAvailability model
const PropertyAvailability =
  models.PropertyAvailability ||
  model<IPropertyAvailability>("PropertyAvailability", PropertyAvailabilitySchema);

export default PropertyAvailability;
