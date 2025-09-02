import express from "express";
import { Request, Response } from 'express';
import commentModel from "../../models/blogs/commentsModel";
import blogsModel from '../../models/blogs/blogsModel';
import mongoose from "mongoose";

const commentsRouter = express.Router();

interface CustomRequest<T = {}, U = {}, V = {}> extends Request<T, U, V> {
  user?: {
    _id: string;
  };
}

interface CommentRequestBody {
  comment: string;
  author: string;
}

commentsRouter.get('/:id', async (req: CustomRequest<{ id: string }, {}, CommentRequestBody>, res: Response): Promise<void> => {
  try {
    const blogId = req.params.id;
    // Validate if the blogId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      res.status(400).json({ success: false, message: "Invalid blog ID" });
      return;
    }

    const comments = await commentModel.find({ blogId: blogId });
    res.json({
      success: true,
      message: "Data fetched successfully",
      data: comments
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
});

commentsRouter.post('/:id', async (req: CustomRequest<{ id: string }, {}, CommentRequestBody>, res: Response) => {
  try {
    const { id } = req.params; // Blog ID
    const { comment, author } = req.body;

    if (!author) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if(!comment) {
      return res.status(401).json({ success: false, message: 'Comment is required' });
    }

    // Validate if the blogId is a valid ObjectId
    const blogId = new mongoose.Types.ObjectId(id);
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: 'Invalid blog ID' });
    }

    const blog = await blogsModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Create a new comment
    const newComment = new commentModel({
      comment,
      author,
      blogId: blogId,  // Save the ObjectId
    });

    // Save the new comment
    await newComment.save();

    // Add the new comment's ObjectId to the blog's comments array
    blog.comments.push(newComment._id);
    await blog.save();

    // Populate the blog after adding the new comment
    const updatedBlog = await blogsModel.findById(blogId).populate({
      path: 'comments',
      populate: { path: 'author', select: 'name email' },
    });

    res.status(201).json({
      success: true,
      comment: newComment,
      updatedBlog,
    });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

commentsRouter.put('/:id', async (req: CustomRequest<{ id: string }, {}, { like: number; author: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;  // Comment ID
    const { like, author } = req.body;

    // Validate if the commentId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid comment ID' });
      return
    }

    const existingComment = await commentModel.findById(id);

    if (!existingComment) {
      res.status(404).json({ success: false, message: 'Comment not found' });
      return 
    }

    if (existingComment.author.toString() !== author) {
      res.status(403).json({ success: false, message: 'Not authorized to update this comment' });
      return 
    }

    // Update the comment
    existingComment.likes = like;
    const updatedComment = await existingComment.save();

    res.status(200).json({
      success: true,
      comment: updatedComment,
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

commentsRouter.delete('/:id', async (req: CustomRequest<{ id: string }, {}, { author: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;  // Comment ID
    const { author } = req.body;

    // Validate if the commentId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid comment ID' });
      return 
    }

    const comment = await commentModel.findById(id);

    if (!comment) {
      res.status(404).json({ success: false, message: 'Comment not found' });
      return 
    }

    if (comment.author.toString() !== author) {
      res.status(403).json({ success: false, message: 'Not authorized to delete this comment' });
      return 
    }

    await commentModel.findByIdAndDelete(id);

    await blogsModel.updateOne(
      { comments: id },
      { $pull: { comments: id } }
    );

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

commentsRouter.post("/:commentId/likes", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const comment = await commentModel.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    if (!comment.likes.includes(userId)) {
      comment.likes.push(userId);
      await comment.save();
    }

    res.json({ success: true, message: "Comment liked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

commentsRouter.delete("/:commentId/likes/:userId", async (req: Request, res: Response) => {
  try {
    const { commentId, userId } = req.params;
    const comment = await commentModel.findById(commentId);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    comment.likes = comment.likes.filter((id: { toString: () => string; }) => id.toString() !== userId);
    await comment.save();

    res.json({ success: true, message: "Comment unliked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

commentsRouter.get("/:commentId/liked/:userId", async (req: Request, res: Response) => {
  try {
    const { commentId, userId } = req.params;
    const comment = await commentModel.findById(commentId);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    const liked = comment.likes.includes(userId);
    res.json({ success: true, liked });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});


export default commentsRouter;