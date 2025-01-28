import { Schema, model, models, Document } from "mongoose";

// Define the interface for the Property Enquiry Form document
interface IPropertyEnquiry extends Document {
  name: string;
  email: string;
  contactNumber: string;
  isVerified: boolean; // To track OTP verification status
}

// Define the Property Enquiry schema
const PropertyEnquirySchema = new Schema<IPropertyEnquiry>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
       // Ensure no duplicate email submissions
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Email validation
      trim: true,
    },
    contactNumber: {
      
      type: String,
      required: [true, "Contact number is required"],
      match: [/^\+?\d{10,}$/, "Invalid phone number format"], // Ensures valid international phone format
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // Initially not verified
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Export the model, ensuring it is not recreated if already defined
const PropertyEnquiry =
  models.PropertyEnquiry ||
  model<IPropertyEnquiry>("PropertyEnquiry", PropertyEnquirySchema);

export default PropertyEnquiry;
