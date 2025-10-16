import mongoose, { Schema, Document } from "mongoose";

interface Bugs extends Document {
  title: string;
  description: string;
  // email: string
  errorcode?: string;
  category?: string;
  imageUrl: string;
  status: "pending" | "in-progress" | "resolved";
  createdAt: Date;
  updatedAt: Date;
  author: mongoose.Types.ObjectId;
  isaccepted: boolean;
}

const BugsSchema = new Schema<Bugs>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // email: { type: String, required: true },
  errorcode: { type: String, required: false, default: "ERR123" },
  category: { type: String, required: false, default: "funtionality" },
  imageUrl: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isaccepted: { type: Boolean, default: false },
});

const Bug = mongoose.model<Bugs>("Bugs", BugsSchema);
export default Bug;
