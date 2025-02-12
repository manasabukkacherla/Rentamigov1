import { Schema, model, models, Document, Types } from "mongoose";

// Define the interface for the Report document
interface IReport extends Document {
  leadId: Types.ObjectId;
  name: string;
  number: string;
  userId: Types.ObjectId;
  type: "agent" | "fraud" | "other";
  description: string;
  timestamp: Date;
}

// Define the Report schema
const ReportSchema = new Schema<IReport>(
  {
    leadId: { type: Schema.Types.ObjectId, ref: "Lead", required: true },
    name: { type: String, required: true, trim: true },
    number: { type: String, required: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["agent", "fraud", "other"], required: true },
    description: { type: String, required: true, trim: true },
    timestamp: { type: Date, default: Date.now, immutable: true },
  },
  { timestamps: { createdAt: true } }
);

const Report = models.Report || model<IReport>("Report", ReportSchema);

export default Report;