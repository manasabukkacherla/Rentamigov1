"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewModel_1 = __importDefault(require("../../models/blogs/reviewModel"));
const blogsModel_1 = __importDefault(require("../../models/blogs/blogsModel"));
const reviewRouter = express_1.default.Router();
reviewRouter.post('/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const { comment, rating, author } = req.body;
        if (!author) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const blog = await blogsModel_1.default.findById(blogId);
        console.log(blog);
        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog not found' });
            return;
        }
        const newReview = new reviewModel_1.default({
            comment,
            rating,
            author,
            blogId
        });
        console.log(newReview);
        await newReview.save();
        blog.reviews.push(newReview._id);
        await blog.save();
        const updatedBlog = await blogsModel_1.default.findById(blogId).populate({
            path: 'reviews',
            populate: { path: 'author', select: 'name email' },
        });
        res.status(201).json({
            success: true,
            review: newReview,
            updatedBlog,
        });
    }
    catch (error) {
        console.error('Error posting review:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
reviewRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { comment, rating, author } = req.body;
        if (!author) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const existingReview = await reviewModel_1.default.findById(id);
        if (!existingReview) {
            res.status(404).json({ success: false, message: 'Review not found' });
            return;
        }
        // Check if the provided author matches the original review author
        if (existingReview.author.toString() !== author) {
            res.status(403).json({ success: false, message: 'Not authorized to update this review' });
            return;
        }
        // Update the review
        const updatedReview = await reviewModel_1.default.findByIdAndUpdate(id, { comment, rating }, { new: true } // Return the updated document
        );
        res.status(200).json({
            success: true,
            review: updatedReview,
        });
    }
    catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
reviewRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { author } = req.body;
        if (!author) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const existingReview = await reviewModel_1.default.findById(id);
        if (!existingReview) {
            res.status(404).json({ success: false, message: 'Review not found' });
            return;
        }
        // Check if the provided author matches the original review author
        if (existingReview.author.toString() !== author) {
            res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
            return;
        }
        // Delete the review
        await reviewModel_1.default.findByIdAndDelete(id);
        // Remove the reference from the related blog post
        await blogsModel_1.default.updateOne({ reviews: id }, { $pull: { reviews: id } });
        res.status(200).json({ success: true, message: 'Review deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
reviewRouter.post("/:reviewId/likes", async (req, res) => {
    try {
        const { userId } = req.body;
        const review = await reviewModel_1.default.findById(req.params.reviewId);
        if (!review)
            return res.status(404).json({ success: false, message: "Review not found" });
        if (!review.likes.includes(userId)) {
            review.likes.push(userId);
            await review.save();
        }
        res.json({ success: true, message: "Review liked successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});
reviewRouter.delete("/:reviewId/likes/:userId", async (req, res) => {
    try {
        const { reviewId, userId } = req.params;
        const review = await reviewModel_1.default.findById(reviewId);
        if (!review)
            return res.status(404).json({ success: false, message: "Review not found" });
        review.likes = review.likes.filter((id) => id.toString() !== userId);
        await review.save();
        res.json({ success: true, message: "Review unliked successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});
reviewRouter.get("/:reviewId/liked/:userId", async (req, res) => {
    try {
        const { reviewId, userId } = req.params;
        const review = await reviewModel_1.default.findById(reviewId);
        if (!review)
            return res.status(404).json({ success: false, message: "Review not found" });
        const liked = review.likes.includes(userId);
        res.json({ success: true, liked });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});
exports.default = reviewRouter;
