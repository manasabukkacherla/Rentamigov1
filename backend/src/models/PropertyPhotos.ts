import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for PhotoUpload
interface IPhotoUpload extends Document {
  property: Types.ObjectId; // Reference to the Property collection
  propertyName: string; // Name of the property from the Property collection
  photos: {
    coverImage?: string;
    exteriorView?: string;
    livingRoom?: string;
    kitchen?: string;
    diningRoom?: string;
    utilityArea?: string;
    others?: string;
    propertyVideo?: string;
    bedrooms?: { [key: string]: string }; // Dynamic fields for bedroom images
    bathrooms?: { [key: string]: string }; // Dynamic fields for bathroom images
    balconies?: { [key: string]: string }; // Dynamic fields for balcony images
    extraRooms?: { [key: string]: string }; // Dynamic fields for extra room images
  };
  createdAt: Date;
  updatedAt: Date;
}

// Define the PhotoUpload schema
const PhotoUploadSchema = new Schema<IPhotoUpload>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property", // Reference to the Property collection
      required: [true, "Property reference is required"],
    },
    propertyName: {
      type: String,
      required: false, // Will be dynamically populated
      trim: true,
    },
    photos: {
      coverImage: { type: String },
      exteriorView: { type: String },
      livingRoom: { type: String },
      kitchen: { type: String },
      diningRoom: { type: String },
      utilityArea: { type: String },
      others: { type: String },
      propertyVideo: { type: String },
      bedrooms: { type: Map, of: String }, // Dynamic bedroom fields
      bathrooms: { type: Map, of: String }, // Dynamic bathroom fields
      balconies: { type: Map, of: String }, // Dynamic balcony fields
      extraRooms: { type: Map, of: String }, // Dynamic extra room fields
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
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Middleware to populate `propertyName` before saving
PhotoUploadSchema.pre("save", async function (next) {
  const photoUpload = this as IPhotoUpload;

  if (photoUpload.property) {
    // Fetch the associated property document
    const property = await model("Property").findById(photoUpload.property);
    if (property) {
      photoUpload.propertyName = property.propertyName; // Assign propertyName dynamically
    }
  }
  next();
});

// Define and export the PhotoUpload model
const PhotoUpload =
  models.PhotoUpload || model<IPhotoUpload>("PhotoUpload", PhotoUploadSchema);

export default PhotoUpload;
