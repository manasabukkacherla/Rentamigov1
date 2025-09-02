import mongoose, { Schema, Document, model, models } from "mongoose";

// Define User Interface
interface IUser extends Document {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  password: string;
  role: "owner" | "agent" | "tenant" | "pg" | "employee" | "admin";
  acceptTerms: boolean;
  emailVerified: boolean;
  bio?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  linkedin?: string;
  image?: string;
}

// Define the User Schema
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "agent", "tenant", "pg", "employee","admin"],
      required: true,
    },
    acceptTerms: {
      type: Boolean,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      required: false,
      default: ""
    },
    website: {
      type: String,
      required: false,
      default: ""
    },
    twitter: {
      type: String,
      required: false,
      default: ""
    },
    instagram: {
      type: String,
      required: false,
      default: ""
    },
    linkedin: {
      type: String,
      required: false,
      default: ""
    },
    image: {
      type: String,
      required: false,
      default: ""
    }    
  },
  { timestamps: true }
);
// Export the User model
const User = models.User || model<IUser>("User", UserSchema);
export default User;