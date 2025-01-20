import { Schema } from "mongoose";

export const PropertyDetailsSchema = new Schema({
  propertyType: {
    type: String,
    enum: ["Apartment", "Standalone Building", "Villa", "Row House", "Studio Room (1 RK)"],
    required: true,
  },
  propertyConfiguration: {
    type: String,
    enum: ["1 BHK", "2 BHK", "3 BHK", "3+ BHK"],
    required: true,
  },
  furnishingStatus: {
    type: String,
    enum: ["Unfurnished", "Semi Furnished", "Fully Furnished"],
    required: true,
  },
  facing: {
    type: String,
    enum: ["North", "East", "South", "West", "North-East", "South-East", "North-West", "South-West"],
    required: true,
  },
  propertyName: { type: String, required: true },
  noOfBedrooms: { type: Number, required: true },
  noOfBathrooms: { type: Number, required: true },
  noOfBalconies: { type: Number, required: true },
});