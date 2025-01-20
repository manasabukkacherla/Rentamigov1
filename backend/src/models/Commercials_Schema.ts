import { Schema } from "mongoose";

export const CommercialsSchema = new Schema({
  monthlyRent: { type: Number, required: false },
  maintenance: {
    type: String,
    enum: ["Included", "Excluded"],
    required: true,
  },
  maintenanceAmount: { type: Number, required: false },
  securityDeposit: { type: Number, required: true },
});
