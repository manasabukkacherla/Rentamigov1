import type { Blogpost } from "../Blogs/types";
import { blogPosts as initialBlogPosts } from "../blogs/data/blogData";

// Initialize blogs from localStorage or use initial data
const initializeBlogs = (): Blogpost[] => {
  const storedBlogs = localStorage.getItem("blogs");

  if (storedBlogs) {
    try {
      return JSON.parse(storedBlogs) as Blogpost[];
    } catch (error) {
      console.error("Failed to parse blogs from localStorage:", error);
      localStorage.removeItem("blogs");
    }
  }

  const blogsWithStatus = initialBlogPosts.map((blog) => ({
    ...blog,
    status: "published",
    likes: blog.likes || 0,
    comments: blog.comments || 0,
    commentsList: blog.commentsList || [],
    reviews: blog.reviews || [],
    shares: blog.shares || 0,
    userHasLiked: blog.userHasLiked || false,
    views: blog.views || 0,
  }));

  localStorage.setItem("blogs", JSON.stringify(blogsWithStatus));
  return blogsWithStatus;
};

// Get all blogs
export const getAllBlogs = (): Blogpost[] => initializeBlogs();

// Toggle blog status between published and draft
export const toggleBlogStatus = (id: number): Blogpost | undefined => {
  const blogs = getAllBlogs();
  const blogIndex = blogs.findIndex((blog) => blog.id === id);

  if (blogIndex === -1) return undefined;

  blogs[blogIndex].status = blogs[blogIndex].status === "published" ? "draft" : "published";

  localStorage.setItem("blogs", JSON.stringify(blogs));
  return blogs[blogIndex];
};

// Delete a blog
export const deleteBlog = (id: number): boolean => {
  const blogs = getAllBlogs();
  const newBlogs = blogs.filter((blog) => blog.id !== id);

  if (newBlogs.length === blogs.length) return false;

  localStorage.setItem("blogs", JSON.stringify(newBlogs));
  return true;
};
