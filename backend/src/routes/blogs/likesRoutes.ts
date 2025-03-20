import express from "express";
import { Request, Response } from "express";
import blogsModel from "../../models/blogs/blogsModel";
import { Types } from "mongoose";
import likeModel from "../../models/blogs/likeModel";

const likesRouter = express.Router();

interface CustomRequest<T = {}, U = {}, V = {}> extends Request<T, U, V> {
    user?: {
        _id: string;
    };
}

interface LikeRequestBody {
    userId: string;
}

// Add like to a blog
likesRouter.post("/:id", async (
    req: CustomRequest<{ id: string }, {}, LikeRequestBody>,
    res: Response
): Promise<void> => {
    try {
        const blogId = req.params.id;
        const { userId } = req.body;

        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        const blog = await blogsModel.findById(blogId);
        if (!blog) {
            res.status(404).json({ success: false, message: "Blog not found" });
            return;
        }

        // Check if user has already liked the blog
        const existingLike = await likeModel.findOne({ userId, blogId });

        if (existingLike) {
            res.status(400).json({ success: false, message: "Blog already liked by user" });
            return;
        }

        // Add a new like
        await likeModel.create({ userId, blogId, likes: 1 });

        // Increment blog likes count
        blog.likes += 1;
        await blog.save();

        res.status(200).json({ success: true, message: "Blog liked successfully" });
    } catch (error) {
        console.error("Error liking blog:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Remove like from a blog
likesRouter.delete("/:id/:userId", async (
    req: CustomRequest<{ id: string, userId: string }, {}, LikeRequestBody>,
    res: Response
): Promise<void> => {
    try {
        const blogId = req.params.id;
        const userId = req.params.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        const blog = await blogsModel.findById(blogId);
        if (!blog) {
            res.status(404).json({ success: false, message: "Blog not found" });
            return;
        }

        // Check if user has liked the blog
        const like = await likeModel.findOne({ userId, blogId });

        if (!like) {
            res.status(400).json({ success: false, message: "Blog not liked by user" });
            return;
        }

        // Remove like
        await likeModel.deleteOne({ userId, blogId });

        // Decrement blog likes count
        blog.likes = Math.max(0, blog.likes - 1);
        await blog.save();

        res.status(200).json({ success: true, message: "Like removed successfully" });
    } catch (error) {
        console.error("Error removing like from blog:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Get all users who liked a blog
likesRouter.get("/:id/likes", async (
    req: CustomRequest<{ id: string }, {}, {}>,
    res: Response
): Promise<void> => {
    try {
        const blogId = req.params.id;

        const blog = await blogsModel.findById(blogId);
        if (!blog) {
            res.status(404).json({ success: false, message: "Blog not found" });
            return;
        }

        // Get all likes for the blog
        const likes = await likeModel.find({ blogId }).populate("userId", "fullName avatar");

        res.status(200).json({
            success: true,
            likesCount: likes.length,
            likedBy: likes.map(like => like.userId),
        });
    } catch (error) {
        console.error("Error fetching blog likes:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

likesRouter.get("/:id/liked/:userId", async (
    req: Request<{ id: string; userId: string }, {}, {}>,
    res: Response
): Promise<void> => {
    try {
        const blogId = req.params.id;
        const userId = req.params.userId;

        // Check if blog exists
        const blog = await blogsModel.findById(blogId);
        if (!blog) {
            res.status(404).json({ success: false, message: "Blog not found" });
            return;
        }

        // Check if the user has liked the blog
        const existingLike = await likeModel.findOne({ userId, blogId });
        const liked = !existingLike ? false: true

        res.status(200).json({
            success: true,
            liked // true if liked, false otherwise
        });
    } catch (error) {
        console.error("Error checking if user liked the blog:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default likesRouter;