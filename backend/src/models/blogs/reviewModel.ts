import mongoose, { Document, Schema, Types } from "mongoose";

interface Review extends Document {
    comment: string,
    rating: number,
    createdAt: Date,
    author: Types.ObjectId,
    blogId: Types.ObjectId,
    likes: number
}

const reviewSchema = new Schema<Review>({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
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

const reviewModel = mongoose.models.Review || mongoose.model<Review>("Review", reviewSchema);

export default reviewModel;