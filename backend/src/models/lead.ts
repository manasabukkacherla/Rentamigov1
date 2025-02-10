import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for the Lead document
interface ILead extends Document {
  userId: Types.ObjectId;
  username: string;
  fullName: string;
  role: "owner" | "agent" | "tenant" | "pg" | "employee";
  name: string;
  email: string;
  phone: string;
  propertyId: Types.ObjectId;
  propertyName: string;
  flatNo: string;
  status: "New" | "Contacted" | "Interested" | "Not Interested" | "RNR" | "Call Back" | "No Requirement" | "Converted";
  createdAt: Date;
}

// Define the Lead schema
const LeadSchema = new Schema<ILead>(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      username: { type: String, required: true, trim: true },
      fullName: { type: String, required: true, trim: true },
      role: { type: String, enum: ["owner", "agent", "tenant", "pg", "employee"], required: true },
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
      propertyName: { type: String, required: true, trim: true },
      flatNo: { type: String, required: true, trim: true },
      status: {
        type: String,
        enum: ["New", "Contacted", "Interested", "Not Interested", "RNR", "Call Back", "No Requirement", "Converted"],
        default: "New",
      },
      createdAt: { type: Date, default: Date.now, immutable: true }, // ✅ This makes sure `createdAt` never changes
    },
    { timestamps: { createdAt: true } }
  );
  

const Lead = models.Lead || model<ILead>("Lead", LeadSchema);

export default Lead;
