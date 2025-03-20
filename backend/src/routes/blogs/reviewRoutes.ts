import express from 'express';
import { Request, Response } from 'express';
import reviewModel from '../../models/blogs/reviewModel';
import blogsModel from '../../models/blogs/blogsModel';
import authBlog from '../../middleware/authBlog';
import { ParamsDictionary } from 'express-serve-static-core';
import mongoose from 'mongoose';

const reviewRouter = express.Router();

interface CustomRequest<T = {}, U = {}, V = {}> extends Request<T, U, V> {
  user?: {
    _id: string;
  };
}

interface ReviewRequestBody {
  comment: string;
  rating: number;
  author: string
}

reviewRouter.post('/:id', async (
  req: CustomRequest<{ id: string }, {}, ReviewRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const blogId = req.params.id;
    const { comment, rating, author } = req.body;

    if (!author) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const blog = await blogsModel.findById(blogId);
    console.log(blog)

    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    const newReview = new reviewModel({
      comment,
      rating,
      author,
      blogId
    });

    console.log(newReview)

    await newReview.save();

    blog.reviews.push(newReview._id);
    await blog.save();

    const updatedBlog = await blogsModel.findById(blogId).populate({
      path: 'reviews',
      populate: { path: 'author', select: 'name email' },
    });

    res.status(201).json({
      success: true,
      review: newReview,
      updatedBlog,
    });
  } catch (error) {
    console.error('Error posting review:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

reviewRouter.put(
  '/:id',
  async (
    req: CustomRequest<{ id: string }, {}, { comment: string; rating: number; author: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { comment, rating, author } = req.body;

      if (!author) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const existingReview = await reviewModel.findById(id);

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
      const updatedReview = await reviewModel.findByIdAndUpdate(
        id,
        { comment, rating },
        { new: true } // Return the updated document
      );

      res.status(200).json({
        success: true,
        review: updatedReview,
      });
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
);



reviewRouter.delete(
  '/:id',
  async (
    req: CustomRequest<{ id: string }, {}, { author: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { author } = req.body;

      if (!author) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const existingReview = await reviewModel.findById(id);

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
      await reviewModel.findByIdAndDelete(id);

      // Remove the reference from the related blog post
      await blogsModel.updateOne(
        { reviews: id },
        { $pull: { reviews: id } }
      );

      res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
);

reviewRouter.post("/:reviewId/likes", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const review = await reviewModel.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    if (!review.likes.includes(userId)) {
      review.likes.push(userId);
      await review.save();
    }

    res.json({ success: true, message: "Review liked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

reviewRouter.delete("/:reviewId/likes/:userId", async (req: Request, res: Response) => {
  try {
    const { reviewId, userId } = req.params;
    const review = await reviewModel.findById(reviewId);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    review.likes = review.likes.filter((id: { toString: () => string; }) => id.toString() !== userId);
    await review.save();

    res.json({ success: true, message: "Review unliked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

reviewRouter.get("/:reviewId/liked/:userId", async (req: Request, res: Response) => {
  try {
    const { reviewId, userId } = req.params;
    const review = await reviewModel.findById(reviewId);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    const liked = review.likes.includes(userId);
    res.json({ success: true, liked });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

export default reviewRouter;
