import { Schema, model, models, Document } from "mongoose";

// Define the interface for the Owner Interest Form document
interface IOwnerInterestForm extends Document {
  name: string;
  email: string;
  mobileNo: string; // Consistent with "mobileNo"
  propertyName: string;
  locality: string;
  city: string;
  isVerified: boolean; // Optional but defaults to true now
}

// Define the Owner Interest Form schema
const OwnerInterestFormSchema = new Schema<IOwnerInterestForm>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Valid email regex
      trim: true,
    },
    mobileNo: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^\+?\d{10,}$/, "Invalid phone number format"], // Valid international format
      trim: true,
    },
    propertyName: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
    },
    locality: {
      type: String,
      required: [true, "Locality is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      required: true, // Ensure that it is always submitted with the request
      default: true, // Default is true to avoid mandatory OTP verification
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Export the model, ensuring it is not recreated if already defined
const OwnerInterestForm =
  models.OwnerInterestForm ||
  model<IOwnerInterestForm>("OwnerInterestForm", OwnerInterestFormSchema);

export default OwnerInterestForm;
