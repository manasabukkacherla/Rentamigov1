"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentsModel_1 = __importDefault(require("../../models/blogs/commentsModel"));
const blogsModel_1 = __importDefault(require("../../models/blogs/blogsModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const commentsRouter = express_1.default.Router();
commentsRouter.get('/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        // Validate if the blogId is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(blogId)) {
            res.status(400).json({ success: false, message: "Invalid blog ID" });
            return;
        }
        const comments = await commentsModel_1.default.find({ blogId: blogId });
        res.json({
            success: true,
            message: "Data fetched successfully",
            data: comments
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error",
        });
    }
});
commentsRouter.post('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Blog ID
        const { comment, author } = req.body;
        if (!author) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        if (!comment) {
            return res.status(401).json({ success: false, message: 'Comment is required' });
        }
        // Validate if the blogId is a valid ObjectId
        const blogId = new mongoose_1.default.Types.ObjectId(id);
        if (!mongoose_1.default.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ success: false, message: 'Invalid blog ID' });
        }
        const blog = await blogsModel_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        // Create a new comment
        const newComment = new commentsModel_1.default({
            comment,
            author,
            blogId: blogId, // Save the ObjectId
        });
        // Save the new comment
        await newComment.save();
        // Add the new comment's ObjectId to the blog's comments array
        blog.comments.push(newComment._id);
        await blog.save();
        // Populate the blog after adding the new comment
        const updatedBlog = await blogsModel_1.default.findById(blogId).populate({
            path: 'comments',
            populate: { path: 'author', select: 'name email' },
        });
        res.status(201).json({
            success: true,
            comment: newComment,
            updatedBlog,
        });
    }
    catch (error) {
        console.error('Error posting comment:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
commentsRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Comment ID
        const { like, author } = req.body;
        // Validate if the commentId is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ success: false, message: 'Invalid comment ID' });
            return;
        }
        const existingComment = await commentsModel_1.default.findById(id);
        if (!existingComment) {
            res.status(404).json({ success: false, message: 'Comment not found' });
            return;
        }
        if (existingComment.author.toString() !== author) {
            res.status(403).json({ success: false, message: 'Not authorized to update this comment' });
            return;
        }
        // Update the comment
        existingComment.likes = like;
        const updatedComment = await existingComment.save();
        res.status(200).json({
            success: true,
            comment: updatedComment,
        });
    }
    catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
commentsRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Comment ID
        const { author } = req.body;
        // Validate if the commentId is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ success: false, message: 'Invalid comment ID' });
            return;
        }
        const comment = await commentsModel_1.default.findById(id);
        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment not found' });
            return;
        }
        if (comment.author.toString() !== author) {
            res.status(403).json({ success: false, message: 'Not authorized to delete this comment' });
            return;
        }
        await commentsModel_1.default.findByIdAndDelete(id);
        await blogsModel_1.default.updateOne({ comments: id }, { $pull: { comments: id } });
        res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
commentsRouter.post("/:commentId/likes", async (req, res) => {
    try {
        const { userId } = req.body;
        const comment = await commentsModel_1.default.findById(req.params.commentId);
        if (!comment)
            return res.status(404).json({ success: false, message: "Comment not found" });
        if (!comment.likes.includes(userId)) {
            comment.likes.push(userId);
            await comment.save();
        }
        res.json({ success: true, message: "Comment liked successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});
commentsRouter.delete("/:commentId/likes/:userId", async (req, res) => {
    try {
        const { commentId, userId } = req.params;
        const comment = await commentsModel_1.default.findById(commentId);
        if (!comment)
            return res.status(404).json({ success: false, message: "Comment not found" });
        comment.likes = comment.likes.filter((id) => id.toString() !== userId);
        await comment.save();
        res.json({ success: true, message: "Comment unliked successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});
commentsRouter.get("/:commentId/liked/:userId", async (req, res) => {
    try {
        const { commentId, userId } = req.params;
        const comment = await commentsModel_1.default.findById(commentId);
        if (!comment)
            return res.status(404).json({ success: false, message: "Comment not found" });
        const liked = comment.likes.includes(userId);
        res.json({ success: true, liked });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});
exports.default = commentsRouter;
