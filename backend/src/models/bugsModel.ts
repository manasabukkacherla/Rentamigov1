import mongoose, { Schema, Document } from "mongoose";

interface Bugs extends Document {
  title: string
  description: string
  // email: string
  errorcode: string
  category: string
  imageUrl?: string
  status: "pending" | "in-progress" | "resolved"
  createdAt: Date
  author: mongoose.Types.ObjectId
}

const BugsSchema = new Schema<Bugs>({
    title: { type: String, required: true },
  description: { type: String, required: true },
  // email: { type: String, required: true },
  errorcode: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
})

const Bug = mongoose.model<Bugs>("Bugs", BugsSchema);
export default Bug;