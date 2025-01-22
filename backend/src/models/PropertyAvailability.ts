import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for PropertyAvailability
interface IPropertyAvailability extends Document {
  property: Types.ObjectId; // Reference to the Property collection
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
