import mongoose, { Document, Schema, Types } from "mongoose";

interface Comment extends Document {
    comment: string,
    createdAt: Date,
    author: Types.ObjectId,
    blogId: Types.ObjectId,
    likes: Types.ObjectId[];
}

const commentSchema = new Schema<Comment>({
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const commentModel = mongoose.models.Comment || mongoose.model<Comment>("Comment", commentSchema);

export default commentModel;