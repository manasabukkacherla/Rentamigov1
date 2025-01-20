import { Schema } from "mongoose";

export const PropertyLocationSchema = new Schema({
  propertyName: { type: String, required: true },
  flatNo: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: { type: String },
    line3: { type: String },
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  locality: { type: String, required: true },
  area: { type: String, required: true },
  pinCode: { type: Number, required: true },
});
