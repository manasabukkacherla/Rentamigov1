import mongoose, { Schema, Document } from "mongoose";

interface INegotiable extends Document {
  propertyId: mongoose.Types.ObjectId; // Reference to Property
  negotiable: boolean;
}

const NegotiableSchema = new Schema<INegotiable>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    negotiable: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Negotiable = mongoose.model<INegotiable>("Negotiable", NegotiableSchema);
export default Negotiable;
