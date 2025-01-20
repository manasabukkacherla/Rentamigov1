import { Schema } from "mongoose";

export const AvailabilitySchema = new Schema({
  availableFrom: { type: Date, required: true },
});
