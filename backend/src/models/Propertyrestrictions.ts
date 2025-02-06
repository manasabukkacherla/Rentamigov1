import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for PropertyRestrictions
interface IPropertyRestrictions extends Document {
  property: Types.ObjectId; // Reference to the Property collection
  userId: Types.ObjectId; // User ID who added the restrictions
  username: string; // Username of the user
  fullName: string; // Full name of the user
  role: "owner" | "agent" | "tenant" | "pg" | "employee"; // User role
  propertyName: string; // Name of the property from the Property collection
  bachelorTenants: string;
  nonVegTenants: string;
  tenantWithPets: string;
  propertyOverlooking: string;
  carParking: string;
  carParkingCount?: string;
  twoWheelerParking: string;
  twoWheelerParkingCount?: string;
  flooringType: string;
  createdAt: Date;
}

// Define the PropertyRestrictions schema
const PropertyRestrictionsSchema = new Schema<IPropertyRestrictions>(
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
    bachelorTenants: {
      type: String,
      required: [true, "Bachelor tenants preference is required"],
      enum: ["Yes", "No", "Doesn't Matter"],
    },
    nonVegTenants: {
      type: String,
      required: [true, "Non-veg tenants preference is required"],
      enum: ["Yes", "No", "Doesn't Matter"],
    },
    tenantWithPets: {
      type: String,
      required: [true, "Tenant with pets preference is required"],
      enum: ["Yes", "No", "Doesn't Matter", "NA"],
    },
    propertyOverlooking: {
      type: String,
      enum: ["Garden / Park", "Pool", "Main Road"],
      required: [true, "Property overlooking preference is required"],
    },
    carParking: {
      type: String,
      required: [true, "Car parking availability is required"],
      enum: ["Yes", "No"],
    },
    carParkingCount: {
      type: String,
      required: function () {
        return this.carParking === "Yes";
      },
    },
    twoWheelerParking: {
      type: String,
      required: [true, "Two-wheeler parking availability is required"],
      enum: ["Yes", "No"],
    },
    twoWheelerParkingCount: {
      type: String,
      required: function () {
        return this.twoWheelerParking === "Yes";
      },
    },
    flooringType: {
      type: String,
      required: [true, "Flooring type is required"],
      enum: [
        "Ceramic Tiles",
        "Marble",
        "Vitrified",
        "Mosaic",
        "Wooden",
        "Granite",
        "Normal Tiles",
      ],
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
PropertyRestrictionsSchema.pre("save", async function (next) {
  const propertyRestrictions = this as IPropertyRestrictions;

  if (propertyRestrictions.property) {
    // Fetch the associated property document
    const property = await model("Property").findById(propertyRestrictions.property);
    if (property) {
      propertyRestrictions.propertyName = property.propertyName; // Dynamically assign propertyName
    }
  }
  next();
});

// Define and export the PropertyRestrictions model
const PropertyRestrictions =
  models.PropertyRestrictions ||
  model<IPropertyRestrictions>("PropertyRestrictions", PropertyRestrictionsSchema);

export default PropertyRestrictions;
