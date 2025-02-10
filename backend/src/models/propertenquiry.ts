import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for the Property Enquiry Form document
interface IPropertyEnquiry extends Document {
  name: string;
  email: string;
  contactNumber: string;
  isVerified: boolean; // To track OTP verification status
  propertyId: Types.ObjectId; // Reference to Property document
  propertyName: string; // Storing property name for quick lookup
  userId: Types.ObjectId; // Reference to the user who added the property
  username: string; // Username of the user
  fullName?: string; // ✅ Made optional
  role: "owner" | "agent" | "tenant" | "pg" | "employee"; // Role of the user
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
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property", // Establishes a reference to the Property model
      required: [true, "Property ID is required"],
    },
    propertyName: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: [true, "User ID is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
      default: "", // ✅ Default empty string if not provided
    },
    role: {
      type: String,
      enum: ["owner", "agent", "tenant", "pg", "employee"],
      required: [true, "Role is required"],
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
