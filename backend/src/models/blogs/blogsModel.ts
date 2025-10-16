import mongoose, { Schema, Document } from "mongoose";

interface IBlog extends Document {
    title: string;
    excerpt: string;
    content: string;
    media: {
        coverImage: string;
        images?: string[];
    };
    tags: string[];
    category: string;
    readTime: number;
    author: mongoose.Types.ObjectId;
    likes: number;
    views: number; // New: View count
    shares: number,
    comments: mongoose.Types.ObjectId[];
    reviews: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    status: "published" | "draft";
    incrementViews: () => Promise<void>; // Method to increase views
}

// Blog Schema
const BlogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true, trim: true },
        excerpt: { type: String, required: true, trim: true, maxlength: 200 },
        content: { type: String, required: true },
        media: {
            coverImage: { type: String, required: true },
            images: { type: [String], default: [] },
        },
        tags: { type: [String], required: true },
        category: { type: String, required: true },
        readTime: { type: Number, required: true, min: 1 },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        likes: { type: Number, default: 0 },
        views: { type: Number, default: 0 }, // New: View count
        shares: { type: Number, default: 0}, 
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
        status: { 
            type: String, 
            enum: ["published", "draft"],
        },
    },
    { timestamps: true }
);

// Method to increment views
BlogSchema.methods.incrementViews = async function () {
    this.views += 1;
    await this.save();
};

// Model
const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
export default Blog;