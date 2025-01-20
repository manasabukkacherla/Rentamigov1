import { Schema } from "mongoose";

export const PropertyIdentificationSchema = new Schema({
  propertyId: { type: String, required: true },
  leaseNo: { type: String, required: false },
});
