import { Schema, model, models, Document, Types } from "mongoose";
import { CallbackError } from "mongoose";

// Define the interface for PhotoUpload
export interface IPhotoUpload extends Document {
  property: Types.ObjectId;
  userId: Types.ObjectId; // User ID who uploaded the photos
  username: string; // Username of the user
  fullName: string; // Full name of the user
  role: "owner" | "agent" | "tenant" | "pg" | "employee"; // User role
  propertyName: string;
  photos: {
    coverImage?: string | null;
    exteriorView?: string | null;
    livingRoom?: string | null;
    kitchen?: string | null;
    diningRoom?: string | null;
    utilityArea?: string | null;
    others?: string | null;
    propertyVideo?: string | null;
    bedrooms?: { [key: string]: string | null };
    bathrooms?: { [key: string]: string | null };
    balconies?: { [key: string]: string | null };
    extraRooms?: { [key: string]: string | null };
  };
  createdAt: Date;
  updatedAt: Date;
}

// Define the PhotoUpload schema
const PhotoUploadSchema = new Schema<IPhotoUpload>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property reference is required"],
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
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
    },
    role: {
      type: String,
      enum: ["owner", "agent", "tenant", "pg", "employee"],
      required: [true, "User role is required"],
    },
    propertyName: {
      type: String,
      required: false,
      trim: true,
    },
    photos: {
      coverImage: { type: String, default: null },
      exteriorView: { type: String, default: null },
      livingRoom: { type: String, default: null },
      kitchen: { type: String, default: null },
      diningRoom: { type: String, default: null },
      utilityArea: { type: String, default: null },
      others: { type: String, default: null },
      propertyVideo: { type: String, default: null },
      bedrooms: { type: Map, of: String, default: {} },
      bathrooms: { type: Map, of: String, default: {} },
      balconies: { type: Map, of: String, default: {} },
      extraRooms: { type: Map, of: String, default: {} },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to populate `propertyName` before saving
PhotoUploadSchema.pre("save", async function (next) {
  const photoUpload = this as IPhotoUpload;

  if (photoUpload.property) {
    try {
      const property = await model("Property").findById(photoUpload.property);
      if (property) {
        photoUpload.propertyName = property.propertyName;
      } else {
        console.error(`Property with ID ${photoUpload.property} not found.`);
      }
    } catch (error) {
      console.error(`Error fetching property: ${error}`);
      return next(error as CallbackError);
    }
  }
  next();
});

// Define and export the PhotoUpload model
const PhotoUpload =
  models.PhotoUpload || model<IPhotoUpload>("PhotoUpload", PhotoUploadSchema);

export default PhotoUpload;
