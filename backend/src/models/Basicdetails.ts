import mongoose, { Schema, model, models, Document, CallbackError } from "mongoose";
import PropertySelection from "./PropertySelection"; // Ensure correct import

interface IBasicDetails extends Document {
  propertyName: string;
  propertyAddress: {
    flatNo?: string;
    floor?: string;
    houseName?: string;
    address: string;
    pinCode: string;
    city: string;
    street?: string;
    state: string;
    zipCode: string;
  };
  coordinates: {
    latitude: string;
    longitude: string;
  };
  propertySize: "studio" | "1bhk" | "2bhk" | "3bhk" | "3plus";
  plotType: string;
  landmark: string[];
  cornerProperty: boolean;
  propertyId: string;
}

const BasicDetailsSchema = new Schema<IBasicDetails>(
  {
    propertyName: {
      type: String,
      required: [true, "Property name is required"],
    },
    propertyAddress: {
      flatNo: { type: String, default: "" },
      floor: { type: String, default: "" },
      houseName: { type: String, default: "" },
      address: { type: String, required: [ "Address is required"] },
      pinCode: { type: String, required: [ "Pin Code is required"] },
      city: { type: String, required: [ "City is required"] },
      street: { type: String, default: "" },
      state: { type: String, required: [ "State is required"] },
      zipCode: { type: String, required: [ "Zip Code is required"] },
    },
    coordinates: {
      latitude: { type: String, required: [ "Latitude is required"] },
      longitude: { type: String, required: [ "Longitude is required"] },
    },
    propertySize: {
      type: String,
      enum: ["studio", "1bhk", "2bhk", "3bhk", "3plus"],
      
    },
    plotType: {
      type: String,
      
    },
    landmark: {
      type: [String],
      default: [],
    },
    cornerProperty: {
      type: Boolean,
      required: [false, "Corner property field is required"],
    },
    propertyId: {
      type: String,
      required: [false, "Property ID is required"],
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
const BasicDetails = models.BasicDetails || model<IBasicDetails>("BasicDetails", BasicDetailsSchema);

export default BasicDetails;
