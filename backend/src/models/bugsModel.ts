import mongoose, { Schema, Document } from "mongoose";

export interface Bugs extends Document {
  title: string;
  description: string;
  errorcode?: string;
  category?: string;
  imageUrl: string;
  status: "pending" | "in-progress" | "resolved";
  createdAt: Date;
  updatedAt: Date;
  author: mongoose.Types.ObjectId;
  isaccepted: boolean;
}

const BugsSchema = new Schema<Bugs>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    errorcode: { type: String, default: "ERR123" },
    category: { type: String, default: "functionality" },
    imageUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isaccepted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // ✅ This auto-adds createdAt & updatedAt fields
  }
);

const Bug = mongoose.model<Bugs>("Bugs", BugsSchema);
export default Bug;
