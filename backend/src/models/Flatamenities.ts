import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for FlatAmenities
interface IFlatAmenities extends Document {
  property: Types.ObjectId; // Reference to the Property collection
  userId: Types.ObjectId; // User ID who added the amenities
  username: string; // Username of the user
  fullName: string; // Full name of the user
  role: "owner" | "agent" | "tenant" | "pg" | "employee"; // User role
  propertyName: string;
  selectedAmenities: string[]; // List of selected flat amenities
  createdAt: Date;
}

// Define the FlatAmenities schema
const FlatAmenitiesSchema = new Schema<IFlatAmenities>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property reference is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
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
    selectedAmenities: {
      type: [String],
      validate: {
        validator: (value: string[]) =>
          value.every((amenity) =>
            [
              "Air Conditioner",
              "Bed",
              "Wardrobe",
              "TV",
              "Refrigerator",
              "Washing Machine",
              "Microwave",
              "Sofa",
              "Dining Table",
              "Gas Connection",
              "Play Station",
            ].includes(amenity)
          ),
        message: "Invalid amenity provided",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to populate `propertyName` before saving
FlatAmenitiesSchema.pre("save", async function (next) {
  const flatAmenities = this as IFlatAmenities;

  if (flatAmenities.property) {
    const property = await model("Property").findById(flatAmenities.property);
    if (property) {
      flatAmenities.propertyName = property.propertyName;
    }
  }
  next();
});

// Define and export the FlatAmenities model
const FlatAmenities =
  models.FlatAmenities || model<IFlatAmenities>("FlatAmenities", FlatAmenitiesSchema);

export default FlatAmenities;
