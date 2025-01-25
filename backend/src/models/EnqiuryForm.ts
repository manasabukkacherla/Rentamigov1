import { Schema, model, models, Document } from "mongoose";

// Define the interface for the Enquiry Form document
interface IEnquiryForm extends Document {
  name: string;
  email: string;
  mobileNo: string;
  isOtpVerified: boolean; // To track OTP verification status
  selectedServices: string[]; // List of selected services
}

// Define the Enquiry Form schema
const EnquiryFormSchema = new Schema<IEnquiryForm>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: false, // Emails can repeat across different submissions
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Email validation
      trim: true,
    },
    mobileNo: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^\+?\d{10,}$/, "Invalid phone number format"], // Ensures valid phone format
      trim: true,
    },
    isOtpVerified: {
      type: Boolean,
      required: true,
      default: false, // Default to not verified
    },
    selectedServices: {
      type: [String], // Array of strings representing selected service names
      required: true,
      validate: {
        validator: (services: string[]) => services.length > 0,
        message: "At least one service must be selected",
      },
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Export the model, ensuring it is not recreated if already defined
const EnquiryForm =
  models.EnquiryForm || model<IEnquiryForm>("EnquiryForm", EnquiryFormSchema);

export default EnquiryForm;
