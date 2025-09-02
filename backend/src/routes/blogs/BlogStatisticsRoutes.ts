import express, { Request, Response } from 'express';
import Blog from '../../models/blogs/blogsModel';
import BlogStatistics from '../../models/blogs/BlogStatisticsModel';

// Function to calculate growth percentage
const calculateGrowth = (current: number, previous: number): number => {
  if (previous === 0) {
    return current === 0 ? 0 : 100; // If there was no previous data, assume 100% growth if current is not zero
  }
  return ((current - previous) / previous) * 100;
};

// Function to update statistics and calculate growth
const updateStatistics = async (author: string): Promise<void> => {
  try {
    // Get the count of published blogs and other statistics
    const publishedBlogs = await Blog.find({ status: 'published', author });
    const drafts = await Blog.find({ status: 'draft', author });
    // console.log(publishedBlogs.length)
    
    // Get all blogs to calculate total views, likes, comments
    const allBlogs = await Blog.find({ author });
    // console.log(allBlogs)
    const totalViews = allBlogs.reduce((sum, blog) => sum + blog.views, 0);
    const totalLikes = allBlogs.reduce((sum, blog) => sum + blog.likes, 0);
    const totalComments = allBlogs.reduce((sum, blog) => sum + blog.comments.length, 0);

    // Get aggregated statistics for views, likes, and comments this month
    const viewsThisMonth = await Blog.aggregate([
      { $match: { author, createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } } },
      { $group: { _id: null, views: { $sum: "$views" } } }
    ]);
    const likesThisMonth = await Blog.aggregate([
      { $match: { author, createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } } },
      { $group: { _id: null, likes: { $sum: "$likes" } } }
    ]);
    const commentsThisMonth = await Blog.aggregate([
      { $match: { author, createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } } },
      { $group: { _id: null, comments: { $sum: "$comments" } } }
    ]);

    // Find the existing statistics document
    let stats = await BlogStatistics.findOne({ userId: author });

    if (!stats) {
      // throw new Error('Statistics not found');
      stats = new BlogStatistics({
        userId: author
      })
      await stats.save()
      
    }

    // Calculate growth based on current and previous values
    const growthRateViews = calculateGrowth(viewsThisMonth[0]?.views || 0, stats.previousViews);
    const growthRateLikes = calculateGrowth(likesThisMonth[0]?.likes || 0, stats.previousLikes);
    const growthRateComments = calculateGrowth(commentsThisMonth[0]?.comments || 0, stats.previousComments);

    // Update statistics with the new values
    // stats.totalBlogs = publishedBlogs.length + drafts.length;
    stats.totalBlogs = allBlogs.length
    stats.totalViews = totalViews;
    stats.totalLikes = totalLikes;
    stats.totalComments = totalComments;
    stats.viewsThisMonth = viewsThisMonth[0]?.views || 0;
    stats.likesThisMonth = likesThisMonth[0]?.likes || 0;
    stats.commentsThisMonth = commentsThisMonth[0]?.comments || 0;
    stats.previousViews = stats.viewsThisMonth;
    stats.previousLikes = stats.likesThisMonth;
    stats.previousComments = stats.commentsThisMonth;
    stats.growthRateViews = growthRateViews;
    stats.growthRateLikes = growthRateLikes;
    stats.growthRateComments = growthRateComments;
    stats.publishedBlogs = publishedBlogs.length;
    stats.drafts = drafts.length

    // Save the updated statistics document
    await stats.save();
  } catch (error) {
    console.error('Error updating statistics:', error);
  }
};

// Route to fetch statistics
const getStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params; // Correctly destructure author from params

    // Asynchronously update statistics but don't block the response
    updateStatistics(userId); 

    const stats = await BlogStatistics.findOne({ userId });
    if (!stats) {
      res.status(404).json({ message: 'Statistics not found' });
      return;
    }
    res.status(201).json(stats); // Send the statistics to the client
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Initialize router
const BlogStats = express.Router();

// Define routes
BlogStats.get('/:userId', getStatistics);

// Export BlogStats router
export default BlogStats;