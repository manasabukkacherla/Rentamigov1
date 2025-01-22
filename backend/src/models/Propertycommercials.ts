import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for PropertyCommercials
interface IPropertyCommercials extends Document {
  property: Types.ObjectId; // Reference to the Property collection
  propertyName: string; // Name of the property from the Property collection
  monthlyRent: string; // Monthly rent for the property
  maintenance: string; // Maintenance status (Included or Excluded)
  maintenanceAmount?: string; // Maintenance amount if Excluded
  securityDeposit: string; // Security deposit amount
  createdAt: Date;
}

// Define the PropertyCommercials schema
const PropertyCommercialsSchema = new Schema<IPropertyCommercials>(
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
    monthlyRent: {
      type: String,
      required: [true, "Monthly rent is required"],
    },
    maintenance: {
      type: String,
      required: [true, "Maintenance status is required"],
      enum: ["Included", "Excluded"],
    },
    maintenanceAmount: {
      type: String,
      required: function () {
        return this.maintenance === "Excluded";
      },
    },
    securityDeposit: {
      type: String,
      required: [true, "Security deposit is required"],
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
PropertyCommercialsSchema.pre("save", async function (next) {
  const propertyCommercials = this as IPropertyCommercials;

  if (propertyCommercials.property) {
    // Fetch the associated property document
    const property = await model("Property").findById(propertyCommercials.property);
    if (property) {
      propertyCommercials.propertyName = property.propertyName; // Dynamically assign propertyName
    }
  }
  next();
});

// Define and export the PropertyCommercials model
const PropertyCommercials =
  models.PropertyCommercials ||
  model<IPropertyCommercials>("PropertyCommercials", PropertyCommercialsSchema);

export default PropertyCommercials;
