import express, { Response } from 'express';
import Blog from '../../models/blogs/blogsModel';
import { ParamsDictionary } from 'express-serve-static-core';

interface CustomRequest<T = ParamsDictionary, U = any, V = any> extends express.Request<T, U, V> {
  user?: {
    _id: string;
  };
}

export const createBlog = async (
  req: CustomRequest<ParamsDictionary, {}, {
    title: string;
    excerpt: string;
    content: string;
    media: { coverImage: string; images?: string[] };
    tags: string[];
    category: string;
    readTime: number;
    author: string
  }>,
  res: Response
): Promise<void> => {
  try {
    const { title, excerpt, content, media, tags, category, readTime, author } = req.body;
    console.log(author)

    if (!title || !excerpt || !content || !media?.coverImage || !tags?.length || !category || !readTime) {
      res.status(400).json({ error: 'All required fields must be filled.' });
      return;
    }

    if (!author) {
      res.status(401).json({ error: 'Unauthorized: User not authenticated.' });
      return;
    }

    const newBlog = new Blog({
      title,
      excerpt,
      content,
      media: {
        coverImage: media.coverImage,
        images: media.images || [],
      },
      tags,
      category,
      readTime,
      author,
    });

    await newBlog.save();
    res.status(201).json({ success: true, blog: newBlog, message: "Blog created succesfully!" });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
};

export const editBlog = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, excerpt, content, media, tags, category, readTime } = req.body;
  
      const blog = await Blog.findById(id);
      if (!blog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }
  
      // Update fields
      if (title) blog.title = title;
      if (excerpt) blog.excerpt = excerpt;
      if (content) blog.content = content;
      if (media?.coverImage) blog.media.coverImage = media.coverImage;
      if (media?.images) blog.media.images = media.images;
      if (tags) blog.tags = tags;
      if (category) blog.category = category;
      if (readTime) blog.readTime = readTime;
  
      await blog.save();
      res.status(200).json({ success: true, blog });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  };
  
  // ✅ Delete Blog
  export const deleteBlog = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }
  
      res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  };
  
  // ✅ Increment Views
  export const getBlogById = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate({ path: "comments", populate: { path: "author" } });
  
      if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
      }
  
      await blog.incrementViews(); // Increment views count
      res.status(200).json({ success: true, blog});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const listBlogs = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const blogs = await Blog.find({});
        res.json({
            success: true,
            message: "Data fetched successfully",
            data: blogs
        })
    } catch(error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error",
        })
    }
}
  
  // ✅ Blog Router
  const blogRouter = express.Router();
  blogRouter.post("/add", createBlog);
  blogRouter.get("/", listBlogs);
  blogRouter.put("/edit/:id", editBlog);
  blogRouter.delete("/delete/:id", deleteBlog);
  blogRouter.get("/:id", getBlogById);
  
export default blogRouter;
