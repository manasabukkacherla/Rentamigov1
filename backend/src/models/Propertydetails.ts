import mongoose, { Schema, model, models, Document, CallbackError } from "mongoose";
import PropertySelection from "./PropertySelection"; // Ensure correct import

interface IPropertyDetails extends Document {
  propertyId: string;
  propertyFeatures: {
    noOfBedrooms: number;
    noOfWashrooms: number;
    noOfBalconies: number;
  };
  parkingDetails: {
    hasParking: boolean;
    twoWheelerParking?: number;
    fourWheelerParking?: number;
  };
  extraRooms: {
    servantRoom: boolean;
    pujaRoom: boolean;
    storeRoom: boolean;
    others: boolean;
  };
  utilityArea: boolean;
  propertyConfiguration: {
    furnishingStatus: string;
    flooringType: "Marble" | "Ceramic" | "Vitrified" | "Wooden" | "Mosaic" | "Others";
  };
  propertyFacing: "North" | "South" | "East" | "West" | "North-East" | "North-West" | "South-East" | "South-West";
  propertyAge: number;
  areaDetails: {
    superBuiltUpArea: number;
    builtUpArea: number;
    carpetArea: number;
  };
  electricityAvailability: "24 hours" | "Partial power cuts" | "No power";
  waterAvailability: "Bore well" | "Government Supply" | "Tanker supply";
  propertyRestrictions: {
    foodPreference: "Veg Only" | "Veg & Non-Veg";
    pets: "Allowed" | "Not Allowed";
    tenantType: "Bachelors" | "Family" | "Company Lease";
  };
}

const PropertyDetailsSchema = new Schema<IPropertyDetails>(
  {
    propertyId: {
      type: String,
      required: true,
      unique: true,
    },
    propertyFeatures: {
      noOfBedrooms: { type: Number, required: true },
      noOfWashrooms: { type: Number, required: true },
      noOfBalconies: { type: Number, required: true },
    },
    parkingDetails: {
      hasParking: { type: Boolean, required: true },
      twoWheelerParking: { type: Number, default: 0 },
      fourWheelerParking: { type: Number, default: 0 },
    },
    extraRooms: {
      servantRoom: { type: Boolean, default: false },
      pujaRoom: { type: Boolean, default: false },
      storeRoom: { type: Boolean, default: false },
      others: { type: Boolean, default: false },
    },
    utilityArea: { type: Boolean, required: true },
    propertyConfiguration: {
      furnishingStatus: { type: String, required: true },
      flooringType: {
        type: String,
        enum: ["Marble", "Ceramic", "Vitrified", "Wooden", "Mosaic", "Others"],
        required: true,
      },
    },
    propertyFacing: {
      type: String,
      enum: [
        "North",
        "South",
        "East",
        "West",
        "North-East",
        "North-West",
        "South-East",
        "South-West",
      ],
      required: true,
    },
    propertyAge: { type: Number, required: true },
    areaDetails: {
      superBuiltUpArea: { type: Number, required: true },
      builtUpArea: { type: Number, required: true },
      carpetArea: { type: Number, required: true },
    },
    electricityAvailability: {
      type: String,
      enum: ["24 hours", "Partial power cuts", "No power"],
      required: true,
    },
    waterAvailability: {
      type: String,
      enum: ["Bore well", "Government Supply", "Tanker supply"],
      required: true,
    },
    propertyRestrictions: {
      foodPreference: {
        type: String,
        enum: ["Veg Only", "Veg & Non-Veg"],
        required: true,
      },
      pets: {
        type: String,
        enum: ["Allowed", "Not Allowed"],
        required: true,
      },
      tenantType: {
        type: String,
        enum: ["Bachelors", "Family", "Company Lease"],
        required: true,
      },
    },
  },
  { timestamps: true }
);

// ✅ **Pre-Save Hook to Fetch the Latest Property ID from PropertySelection**
PropertyDetailsSchema.pre("validate", async function (next: (err?: CallbackError) => void) {
  const propertyDetails = this as IPropertyDetails;

  if (!propertyDetails.propertyId) {
    try {
      const lastPropertySelection = await PropertySelection.findOne()
        .sort({ createdAt: -1 })
        .select("propertyId");

      if (lastPropertySelection && lastPropertySelection.propertyId) {
        propertyDetails.propertyId = lastPropertySelection.propertyId;
      } else {
        return next(new Error("No property ID found in PropertySelection") as CallbackError);
      }
    } catch (error) {
      return next(error as CallbackError);
    }
  }

  next();
});

// ✅ **Check if the model already exists to prevent re-compilation**
const PropertyDetails =
  models.PropertyDetails || model<IPropertyDetails>("PropertyDetails", PropertyDetailsSchema);

export default PropertyDetails;
    