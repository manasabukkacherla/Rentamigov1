import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for SocietyAmenities
interface ISocietyAmenities extends Document {
  property: Types.ObjectId; // Reference to the Property collection
  propertyName: string; // Name of the property from the Property collection
  selectedAmenities: string[]; // List of selected amenities
  powerBackupType?: "Partially" | "Fully"; // Power backup type
  createdAt: Date;
}

// Define the SocietyAmenities schema
const SocietyAmenitiesSchema = new Schema<ISocietyAmenities>(
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
              "Lift",
              "Power Backup",
              "Security",
              "CCTV",
              "Gym",
              "Swimming Pool",
              "Kids Pool",
              "Jacuzzi",
              "Club House",
              "Jogging Track",
              "Children Play Area",
              "Badminton Court",
              "Lawn Tennis Court",
              "Table Tennis",
              "Squash Court",
              "Football",
              "Steam Room",
              "Carrom",
              "Chess Board",
              "Multipurpose Hall",
              "Yoga / Meditation Center",
              "Flower Park",
              "Day-to-Day Utility Stores",
              "Salon",
            ].includes(amenity)
          ),
        message: "Invalid amenity provided",
      },
    },
    powerBackupType: {
      type: String,
      enum: ["Partially", "Fully"],
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
SocietyAmenitiesSchema.pre("save", async function (next) {
  const societyAmenities = this as ISocietyAmenities;

  if (societyAmenities.property) {
    // Fetch the associated property document
    const property = await model("Property").findById(societyAmenities.property);
    if (property) {
      societyAmenities.propertyName = property.propertyName; // Dynamically assign propertyName
    }
  }
  next();
});

// Define and export the SocietyAmenities model
const SocietyAmenities =
  models.SocietyAmenities ||
  model<ISocietyAmenities>("SocietyAmenities", SocietyAmenitiesSchema);

export default SocietyAmenities;
