import mongoose, { Schema, Document } from 'mongoose';
import { Types } from 'twilio/lib/rest/content/v1/content';

// Define an interface for the Statistics model
interface IStatistics extends Document {
  totalBlogs: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  viewsThisMonth: number;
  likesThisMonth: number;
  commentsThisMonth: number;
  previousViews: number;
  previousLikes: number;
  previousComments: number;
  growthRateViews: number;
  growthRateLikes: number;
  growthRateComments: number;
  mostViewedBlog: string;
  mostLikedBlog: string;
  mostCommentedBlog: string;
  publishedBlogs: number;
  drafts: number;
  averageWordCount: number;
  userId: mongoose.Types.ObjectId
}

// Create the schema for Statistics
const statisticsSchema = new Schema<IStatistics>(
  {
    totalBlogs: {
      type: Number,
      required: true,
      default: 0,
    },
    totalViews: {
      type: Number,
      required: true,
      default: 0,
    },
    totalLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    totalComments: {
      type: Number,
      required: true,
      default: 0,
    },
    viewsThisMonth: {
      type: Number,
      required: true,
      default: 0,
    },
    likesThisMonth: {
      type: Number,
      required: true,
      default: 0,
    },
    commentsThisMonth: {
      type: Number,
      required: true,
      default: 0,
    },
    previousViews: {
      type: Number,
      required: true,
      default: 0,
    },
    previousLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    previousComments: {
      type: Number,
      required: true,
      default: 0,
    },
    growthRateViews: {
      type: Number,
      required: true,
      default: 0,
    },
    growthRateLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    growthRateComments: {
      type: Number,
      required: true,
      default: 0,
    },
    mostViewedBlog: {
      type: String,
      required: true,
      default: 'No Data',
    },
    mostLikedBlog: {
      type: String,
      required: true,
      default: 'No Data',
    },
    mostCommentedBlog: {
      type: String,
      required: true,
      default: 'No Data',
    },
    publishedBlogs: {
      type: Number,
      required: true,
      default: 0,
    },
    drafts: {
      type: Number,
      required: true,
      default: 0,
    },
    averageWordCount: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Statistics model
const BlogStatistics = mongoose.model<IStatistics>('BlogStatistics', statisticsSchema);

export default BlogStatistics;