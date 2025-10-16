"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Blog Schema
const BlogSchema = new mongoose_1.Schema({
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
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 }, // New: View count
    shares: { type: Number, default: 0 },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Review" }],
    status: {
        type: String,
        enum: ["published", "draft"],
    },
}, { timestamps: true });
// Method to increment views
BlogSchema.methods.incrementViews = async function () {
    this.views += 1;
    await this.save();
};
// Model
const Blog = mongoose_1.default.model("Blog", BlogSchema);
exports.default = Blog;
