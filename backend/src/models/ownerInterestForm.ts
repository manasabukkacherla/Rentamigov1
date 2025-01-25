import { Schema, model, models, Document } from "mongoose";

// Define the interface for the Owner Interest Form document
interface IOwnerInterestForm extends Document {
  name: string;
  email: string;
  contactNumber: string; // Matches `contactNumber` from the form
  propertyName: string;
  locality: string;
  city: string;
  isVerified: boolean; // To track OTP verification status
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
      unique: true, // To ensure no duplicate email submissions
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Email validation
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^\+?\d{10,}$/, "Invalid phone number format"], // Ensures valid international phone format
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
      required: true,
      default: false, // Initially not verified
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Export the model, ensuring it is not recreated if already defined
const OwnerInterestForm =
  models.OwnerInterestForm ||
  model<IOwnerInterestForm>("OwnerInterestForm", OwnerInterestFormSchema);

export default OwnerInterestForm;
