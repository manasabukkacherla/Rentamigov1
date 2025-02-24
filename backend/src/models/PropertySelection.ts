import { Schema, model, models, Document } from "mongoose";

// Interface for Property Selection
interface IPropertySelection extends Document {
  category: string;
  listingType: string;
  subCategory: string;
  generatedId: string;
  createdAt: Date;
}

// Schema Definition
const PropertySelectionSchema = new Schema<IPropertySelection>(
  {
    category: { type: String, required: true },
    listingType: { type: String, required: true },
    subCategory: { type: String, required: true },
    generatedId: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ **Auto-Generate Unique ID Before Saving**
PropertySelectionSchema.pre("validate", async function (next) {
  const selection = this as IPropertySelection;

  // Normalize Inputs (Convert to Lowercase & Trim Extra Spaces)
  selection.category = selection.category.trim().toLowerCase();
  selection.listingType = selection.listingType.trim().toLowerCase();
  selection.subCategory = selection.subCategory.trim().toLowerCase();

  // Mapping for ID Generation (Use Lowercase Keys)
  const categoryCodes: Record<string, string> = {
    residential: "RES",
    commercial: "COM",
    other: "OT",
  };

  const listingCodes: Record<string, string> = {
    rent: "RE",
    sell: "SE",
    lease: "LE",
    "pg/co-living": "PG",
  };

  // Normalize Property Type Mapping
  const subCategoryCodes: Record<string, string> = {
    shop: "SH",
    "retail store space": "RS",
    showroom: "SR",
    "office space": "OS",
    warehouse: "WH",
    shed: "SD",
    "covered/open space": "CS",
    plot: "PL",
    "agricultural land": "AL",
    others: "OT",
    apartment: "AP",
    "independent house": "IH",
    "builder floor": "BF",
    "shared space": "SS",
  };

  // Get the corresponding codes (Handle missing values gracefully)
  const categoryCode = categoryCodes[selection.category] || "OT";
  const listingCode = listingCodes[selection.listingType] || "XX";
  const subCategoryCode = subCategoryCodes[selection.subCategory] || "OT";

  // **Separate Counting for Each Listing Type & Property Type**
  const lastEntry = await PropertySelection.findOne({
    category: selection.category,
    listingType: selection.listingType,
    subCategory: selection.subCategory, // Now it resets per property type
  }).sort({ createdAt: -1 });

  let nextNumber = 1;
  if (lastEntry && lastEntry.generatedId) {
    const lastId = lastEntry.generatedId;
    const lastNumber = parseInt(lastId.slice(-2), 10); // Get last 2 digits
    nextNumber = lastNumber + 1;
  }

  // Format the number (e.g., 01, 02, 03, ...)
  const formattedNumber = nextNumber.toString().padStart(2, "0");

  // ✅ Fix: Ensure the hyphen is only after "RA"
  selection.generatedId = `RA-${categoryCode}${listingCode}${subCategoryCode}${formattedNumber}`;

  next(); // Proceed with saving the document
});

// Export Model
const PropertySelection =
  models.PropertySelection || model<IPropertySelection>("PropertySelection", PropertySelectionSchema);

export default PropertySelection;
