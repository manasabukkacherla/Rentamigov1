"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogById = exports.deleteBlog = exports.editBlog = exports.createBlog = void 0;
const express_1 = __importDefault(require("express"));
const blogsModel_1 = __importDefault(require("../../models/blogs/blogsModel"));
const createBlog = async (req, res) => {
    try {
        const { title, excerpt, content, media, tags, category, readTime, author, status } = req.body;
        // console.log(author)
        if (!title || !excerpt || !content || !media?.coverImage || !tags?.length || !category || !readTime || !status) {
            res.status(400).json({ error: 'All required fields must be filled.' });
            return;
        }
        if (!author) {
            res.status(401).json({ error: 'Unauthorized: User not authenticated.' });
            return;
        }
        const newBlog = new blogsModel_1.default({
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
            status
        });
        const message = status === "published" ? "Blog created succesfully!" : "Blog drafted successfully";
        await newBlog.save();
        res.status(201).json({ success: true, blog: newBlog, message });
    }
    catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Failed to create blog post' });
    }
};
exports.createBlog = createBlog;
const editBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, excerpt, content, media, tags, category, readTime, status } = req.body;
        const blog = await blogsModel_1.default.findById(id);
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        // Update fields
        if (title)
            blog.title = title;
        if (excerpt)
            blog.excerpt = excerpt;
        if (content)
            blog.content = content;
        if (media?.coverImage)
            blog.media.coverImage = media.coverImage;
        if (media?.images)
            blog.media.images = media.images;
        if (tags)
            blog.tags = tags;
        if (category)
            blog.category = category;
        if (readTime)
            blog.readTime = readTime;
        blog.status = status;
        await blog.save();
        res.status(200).json({ success: true, blog });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to update blog post" });
    }
};
exports.editBlog = editBlog;
// ✅ Delete Blog
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogsModel_1.default.findByIdAndDelete(id);
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to delete blog post" });
    }
};
exports.deleteBlog = deleteBlog;
// ✅ Increment Views
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogsModel_1.default.findById(id)
            .populate({ path: "reviews", populate: { path: "author" } })
            .populate({ path: "comments", populate: { path: "author" } })
            .populate("author");
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        await blog.incrementViews(); // Increment views count
        res.status(200).json({ success: true, blog });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getBlogById = getBlogById;
const listBlogs = async (req, res) => {
    try {
        const blogs = await blogsModel_1.default.find({ status: "published" }).sort({ createdAt: -1 })
            .populate({ path: "reviews", populate: { path: "author" } })
            .populate({ path: "comments", populate: { path: "author" } })
            .populate("author");
        res.json({
            success: true,
            message: "Data fetched successfully",
            data: blogs
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error",
        });
    }
};
//user's blog
const getUsersBlogs = async (req, res) => {
    try {
        const { userId } = req.params;
        const blogs = await blogsModel_1.default.find({ author: userId }).sort({ createdAt: -1 })
            .populate({ path: "reviews", populate: { path: "author" } })
            .populate({ path: "comments", populate: { path: "author" } });
        if (!blogs) {
            res.status(404).json({ message: "Blogs not found" });
            return;
        }
        res.status(200).json({ success: true, blogs });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// ✅ Blog Router
const blogRouter = express_1.default.Router();
blogRouter.post("/add", exports.createBlog);
blogRouter.get("/", listBlogs);
blogRouter.put("/edit/:id", exports.editBlog);
blogRouter.delete("/delete/:id", exports.deleteBlog);
blogRouter.get("/myBlogs/:userId", getUsersBlogs);
blogRouter.get("/:id", exports.getBlogById);
exports.default = blogRouter;
