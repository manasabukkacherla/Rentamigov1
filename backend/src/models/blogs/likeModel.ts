import mongoose, { Document, Schema, Types } from "mongoose";

interface Like extends Document {
    userId: Types.ObjectId; // User who liked
    blogId: Types.ObjectId; // Blog that is liked
    likes: number; // Total number of likes
}

const likeSchema = new Schema<Like>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    likes: { type: Number, default: 0 }, // Track the number of likes
});

export default mongoose.model<Like>("Like", likeSchema);