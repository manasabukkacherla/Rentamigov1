import { Schema, model, models, Document } from "mongoose";

// Define the interface for User document
interface IUser extends Document {
  email: string;
  username: string;
  image?: string;
  phone: string; // Added phone field
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true, // Set unique to true
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required !"],
    match: [
      /^[a-zA-Z0-9._]{5,20}$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number"], // Basic phone validation
  },
});

UserSchema.index({ username: 1 }, { unique: true });

// Check if the model exists, if not create a new one
const User = models.User || model<IUser>("User", UserSchema);

export default User;
