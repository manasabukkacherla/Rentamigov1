import express from "express"
import { Request, Response } from 'express';
import commentModel from "../../models/blogs/commentsModel";
import blogsModel from '../../models/blogs/blogsModel';
import { ParamsDictionary } from 'express-serve-static-core';

const commentsRouter = express.Router();

interface CustomRequest<T = {}, U = {}, V = {}> extends Request<T, U, V> {
  user?: {
    _id: string;
  };
}

interface CommentRequestBody {
    comment: string;
}

commentsRouter.post('/:id', async (
    req: CustomRequest<{ id: string }, {}, CommentRequestBody>,
    res: Response
  ): Promise<void> => {
    try {
      const blogId = req.params.id;
      const { comment } = req.body;
  
      // if (!req.user) {
      //   res.status(401).json({ success: false, message: 'Unauthorized' });
      //   return;
      // }
  
      const blog = await blogsModel.findById(blogId);
      console.log(blog)
  
      if (!blog) {
        res.status(404).json({ success: false, message: 'Blog not found' });
        return;
      }
  
      const newComment = new commentModel({
        comment,
        // author: req.user._id,
        blogId
      });
  
      console.log(newComment)
  
      await newComment.save();
  
      blog.comments.push(newComment._id);
      await blog.save();
  
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

  commentsRouter.put('/:id', async (
    req: CustomRequest<{ id: string }, {}, { comment: string; rating: number }>,
    res: Response
  ): Promise<void> => {
    try {
      const commentId = req.params.id;
      const { comment } = req.body;
  
      // if (!req.user) {
      //   res.status(401).json({ success: false, message: 'Unauthorized' });
      //   return;
      // }
  
      const Comment = await commentModel.findById(commentId);
      
      if (!Comment) {
        res.status(404).json({ success: false, message: 'Comment not found' });
        return;
      }
  
      // Verify if the authenticated user is the author
      // if (review.author.toString() !== req.user._id) {
      //   res.status(403).json({ success: false, message: 'Not authorized to update this review' });
      //   return;
      // }
  
      const updatedComment = await commentModel.findByIdAndUpdate(
        commentId,
        { comment },
        { new: true } // returns the updated document
      );
  
      res.status(200).json({
        success: true,
        review: updatedComment,
      });
    } catch (error) {
      console.error('Error updating comment:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
  
  commentsRouter.delete('/:id', async (
    req: CustomRequest<ParamsDictionary, {}, {}>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
  
      // if (!req.user) {
      //   res.status(401).json({ success: false, message: 'Unauthorized' });
      //   return;
      // }
  
      const Comment = await commentModel.findById(id);
  
      if (!Comment) {
        res.status(404).json({ success: false, message: 'Comment not found' });
        return;
      }
  
      // if (review.author.toString() !== req.user._id) {
      //   res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
      //   return;
      // }
  
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

export default commentsRouter