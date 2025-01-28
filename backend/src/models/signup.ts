import { Schema, model, Document, models } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  username: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  password: string;
  role: "owner" | "agent" | "tenant" | "pg" | "employee";
  acceptTerms: boolean;
}

// Define the User schema
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
      match: [/^[a-zA-Z0-9]{8,20}$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address format"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\+?\d{10,}$/, "Invalid phone number format"], // Supports international numbers
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["owner", "agent", "tenant", "pg", "employee"],
      required: [true, "Role is required"],
    },
    acceptTerms: {
      type: Boolean,
      required: [true, "You must accept the terms and conditions"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model, ensuring it is not recreated if already defined
const User = models.User || model<IUser>("User", UserSchema);

export default User;
