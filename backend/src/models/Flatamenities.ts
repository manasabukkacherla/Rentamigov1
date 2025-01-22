import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for FlatAmenities
interface IFlatAmenities extends Document {
  property: Types.ObjectId; // Reference to the Property collection
  propertyName: string; // Name of the property from the Property collection
  selectedAmenities: string[]; // List of selected flat amenities
  createdAt: Date;
}

// Define the FlatAmenities schema
const FlatAmenitiesSchema = new Schema<IFlatAmenities>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property", // Reference to the Property collection
      required: [true, "Property reference is required"],
    },
    propertyName: {
      type: String,
      required: false, // Will be populated dynamically
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
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Middleware to populate `propertyName` before saving
FlatAmenitiesSchema.pre("save", async function (next) {
  const flatAmenities = this as IFlatAmenities;

  if (flatAmenities.property) {
    // Fetch the associated property document
    const property = await model("Property").findById(flatAmenities.property);
    if (property) {
      flatAmenities.propertyName = property.propertyName; // Dynamically assign propertyName
    }
  }
  next();
});

// Define and export the FlatAmenities model
const FlatAmenities =
  models.FlatAmenities || model<IFlatAmenities>("FlatAmenities", FlatAmenitiesSchema);

export default FlatAmenities;
