import type { Blogpost } from "../Blogs/types"
import { blogPosts as initialBlogPosts } from "../Blogs/data/blogData";

// Initialize blogs from localStorage or use initial data
const initializeBlogs = (): Blogpost[] => {
  const storedBlogs = localStorage.getItem("blogs")
  if (storedBlogs) {
    return JSON.parse(storedBlogs)
  }

  // Store initial blogs in localStorage
  localStorage.setItem("blogs", JSON.stringify(initialBlogPosts))
  return initialBlogPosts
}

// Get all blogs
export const getAllBlogs = (): Blogpost[] => {
  return initializeBlogs()
}

// Get blog by ID
export const getBlogById = (id: number): Blogpost | undefined => {
  const blogs = getAllBlogs()
  return blogs.find((blog) => blog.id === id)
}

// Create a new blog
export const createBlog = (blog: Omit<Blogpost, "id">): Blogpost => {
  const blogs = getAllBlogs()

  // Generate a new ID (highest ID + 1)
  const newId = blogs.length > 0 ? Math.max(...blogs.map((b) => b.id)) + 1 : 1

  const newBlog: Blogpost = {
    ...blog,
    id: newId,
    likes: 0,
    comments: 0,
    commentsList: [],
    reviews: [],
    shares: 0,
    userHasLiked: false,
    views: 0,
  }

  const updatedBlogs = [...blogs, newBlog]
  localStorage.setItem("blogs", JSON.stringify(updatedBlogs))

  return newBlog
}

// Update an existing blog
export const updateBlog = (id: number, updatedBlog: Partial<Blogpost>): Blogpost | undefined => {
  const blogs = getAllBlogs()
  const index = blogs.findIndex((blog) => blog.id === id)

  if (index === -1) return undefined

  const updated = { ...blogs[index], ...updatedBlog }
  blogs[index] = updated

  localStorage.setItem("blogs", JSON.stringify(blogs))
  return updated
}

// Delete a blog
export const deleteBlog = (id: number): boolean => {
  const blogs = getAllBlogs()
  const filteredBlogs = blogs.filter((blog) => blog.id !== id)

  if (filteredBlogs.length === blogs.length) return false

  localStorage.setItem("blogs", JSON.stringify(filteredBlogs))
  return true
}

// Increment view count
// export const incrementViews = (id: number): void => {
//   const blogs = getAllBlogs()
//   const blog = blogs.find((blog) => blog.id === id)

//   if (blog) {
//     blog.views = (blog.views || 0) + 1
//     localStorage.setItem("blogs", JSON.stringify(blogs))
//   }
// }

// Toggle like
export const toggleLike = (id: number): Blogpost | undefined => {
  const blogs = getAllBlogs()
  const blog = blogs.find((blog) => blog.id === id)

  if (blog) {
    blog.userHasLiked = !blog.userHasLiked
    blog.likes = blog.userHasLiked ? blog.likes + 1 : blog.likes - 1
    localStorage.setItem("blogs", JSON.stringify(blogs))
    return blog
  }

  return undefined
}

// Add comment
export const addComment = (
  blogId: number,
  comment: { text: string; author: { name: string; avatar: string } },
): Blogpost | undefined => {
  const blogs = getAllBlogs()
  const blog = blogs.find((blog) => blog.id === blogId)

  if (blog) {
    const newComment = {
      id: blog.commentsList.length + 1,
      text: comment.text,
      author: comment.author,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      likes: 0,
    }

    blog.commentsList = [newComment, ...blog.commentsList]
    blog.comments = blog.commentsList.length

    localStorage.setItem("blogs", JSON.stringify(blogs))
    return blog
  }

  return undefined
}

