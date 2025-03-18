import mongoose, { Document, Schema, Types } from "mongoose";

interface Comment extends Document {
    comment: string,
    createdAt: Date,
    author: Types.ObjectId,
    blogId: Types.ObjectId,
    likes: number
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
    likes: {
        type: Number,
        default: 0
    }
});

const commentModel = mongoose.models.Comment || mongoose.model<Comment>("Comment", commentSchema);

export default commentModel;