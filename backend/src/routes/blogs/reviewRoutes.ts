import express from 'express';
import { Request, Response } from 'express';
import reviewModel from '../../models/blogs/reviewModel';
import blogsModel from '../../models/blogs/blogsModel';
import authBlog from '../../middleware/authBlog';
import { ParamsDictionary } from 'express-serve-static-core';

const reviewRouter = express.Router();

interface CustomRequest<T = {}, U = {}, V = {}> extends Request<T, U, V> {
  user?: {
    _id: string;
  };
}

interface ReviewRequestBody {
  comment: string;
  rating: number;
}

reviewRouter.post('/:id', async (
  req: CustomRequest<{ id: string }, {}, ReviewRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const blogId = req.params.id;
    const { comment, rating } = req.body;

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

    const newReview = new reviewModel({
      comment,
      rating,
      // author: req.user._id,
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

reviewRouter.put('/:id', async (
  req: CustomRequest<{ id: string }, {}, { comment: string; rating: number }>,
  res: Response
): Promise<void> => {
  try {
    const reviewId = req.params.id;
    const { comment, rating } = req.body;

    // if (!req.user) {
    //   res.status(401).json({ success: false, message: 'Unauthorized' });
    //   return;
    // }

    const review = await reviewModel.findById(reviewId);
    
    if (!review) {
      res.status(404).json({ success: false, message: 'Review not found' });
      return;
    }

    // Verify if the authenticated user is the author
    // if (review.author.toString() !== req.user._id) {
    //   res.status(403).json({ success: false, message: 'Not authorized to update this review' });
    //   return;
    // }

    const updatedReview = await reviewModel.findByIdAndUpdate(
      reviewId,
      { comment, rating },
      { new: true } // returns the updated document
    );

    res.status(200).json({
      success: true,
      review: updatedReview,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


reviewRouter.delete('/:id', async (
  req: CustomRequest<ParamsDictionary, {}, {}>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // if (!req.user) {
    //   res.status(401).json({ success: false, message: 'Unauthorized' });
    //   return;
    // }

    const review = await reviewModel.findById(id);

    if (!review) {
      res.status(404).json({ success: false, message: 'Review not found' });
      return;
    }

    // if (review.author.toString() !== req.user._id) {
    //   res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    //   return;
    // }

    await reviewModel.findByIdAndDelete(id);

    await blogsModel.updateOne(
      { reviews: id },
      { $pull: { reviews: id } }
    );

    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default reviewRouter;
