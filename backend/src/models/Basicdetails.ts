import mongoose, { Schema, model, models, Document, CallbackError } from "mongoose";
import PropertySelection from "./PropertySelection"; // Ensure correct import

interface IBasicDetails extends Document {
  propertyName: string;
  propertyType: "apartment" | "independent-house" | "shared-space";
  latitude: string;
  longitude: string;
  addressDetails: {
    flatNo?: string;
    floor?: string;
    buildingName?: string;
    address: string;
    pinCode: string;
    city: string;
    showFlatNo?: boolean;
  };
  propertySize: "studio" | "1bhk" | "2bhk" | "3bhk" | "3plus" | "single-room-shared";
  propertyId: string; // Updated from generatedId to propertyId
}

const BasicDetailsSchema = new Schema<IBasicDetails>(
  {
    propertyName: {
      type: String,
      required: [true, "Property name is required"],
    },
    propertyType: {
      type: String,
      enum: ["apartment", "independent-house", "shared-space"],
      required: [true, "Property type is required"],
    },
    latitude: {
      type: String,
      required: [true, "Latitude is required"],
    },
    longitude: {
      type: String,
      required: [true, "Longitude is required"],
    },
    addressDetails: {
      flatNo: { type: String, default: "" },
      floor: { type: String, default: "" },
      buildingName: { type: String, default: "" },
      address: { type: String, required: [true, "Address is required"] },
      pinCode: { type: String, required: [true, "Pin Code is required"] },
      city: { type: String, required: [true, "City is required"] },
      showFlatNo: { type: Boolean, default: true },
    },
    propertySize: {
      type: String,
      enum: ["studio", "1bhk", "2bhk", "3bhk", "3plus", "single-room-shared"],
      required: [true, "Property size is required"],
    },
    propertyId: {
      type: String,
      required: [true, "Property ID is required"], // Updated field name
      unique: true,
    },
  },
  { timestamps: true }
);

// ✅ **Pre-Save Hook to Fetch the Latest Property ID from PropertySelection**
BasicDetailsSchema.pre("validate", async function (next: (err?: CallbackError) => void) {
  const basicDetails = this as IBasicDetails;

  if (!basicDetails.propertyId) {
    try {
      const lastPropertySelection = await PropertySelection.findOne()
        .sort({ createdAt: -1 })
        .select("propertyId");

      if (lastPropertySelection && lastPropertySelection.propertyId) {
        basicDetails.propertyId = lastPropertySelection.propertyId;
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
const BasicDetails =
  models.BasicDetails || model<IBasicDetails>("BasicDetails", BasicDetailsSchema);

export default BasicDetails;
