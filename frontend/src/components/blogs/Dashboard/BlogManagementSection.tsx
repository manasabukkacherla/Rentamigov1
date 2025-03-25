"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  PenSquare,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  media: {
    coverImage: string;
    images?: string[];
  };
  tags: string[];
  category: string;
  readTime: number;
  author: User;
  likes: number;
  views: number;
  shares: 0;
  comments: Comment[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
  status: "published" | "draft";
}

interface Comment {
  _id: string;
  author: User;
  comment: string;
  createdAt: string;
  likes: string[];
}

interface User {
  _id: string;
  fullName: string;
}

interface Review {
  _id: string;
  author: User;
  comment: string;
  rating: number;
  createdAt: string;
  likes: string[];
}

const BlogManagementSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");
  const [sortBy, setSortBy] = useState<"date" | "views" | "likes" | "comments">(
    "date"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const user = sessionStorage.getItem("user");
      if (!user) {
        toast.error("Login First!!");
        navigate("/login");
        return;
      }
      const author = JSON.parse(user).id;

      const response = await axios.get(`/api/blog/myBlogs/${author}`);
      console.log(response.data);
      setBlogs(response.data.blogs);
    } catch (error) {
      toast.error("Failed to load blogs");
      console.error("Error loading blogs:", error);
    }
  };

  // Filter and sort blogs
  const filteredBlogs = blogs
    .filter(
      (blog) =>
        (statusFilter === "all" || blog.status === statusFilter) &&
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else if (sortBy === "views") {
        return sortOrder === "asc"
          ? (a.views || 0) - (b.views || 0)
          : (b.views || 0) - (a.views || 0);
      } else if (sortBy === "likes") {
        return sortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes;
      } else {
        return sortOrder === "asc"
          ? a.comments.length - b.comments.length
          : b.comments.length - a.comments.length;
      }
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      const response = await axios.delete(`/api/blog/delete/${id}`);
      if (response.data.success) {
        toast.success("Blog deleted successfully!");
        // Refresh the blog list
        loadBlogs();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      toast.error("Error deleting blog");
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = (blogId: string) => {
    navigate(`/blogs/edit/${blogId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center">
          <FileText className="h-6 w-6 text-gray-700 mr-2" />
          <h2 className="text-xl sm:text-2xl font-bold">Manage Blogs</h2>
        </div>
        <Link
          to="/blogs/Create"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition flex items-center justify-center sm:justify-start"
        >
          <PenSquare className="h-4 w-4 mr-2" />
          Create New Blog
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex flex-col gap-4 mb-4 sm:flex-row">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search blogs..."
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition flex items-center justify-center sm:justify-start"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {showFilters ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as "all" | "published" | "draft"
                    )
                  }
                >
                  <option value="all">All</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "date" | "views" | "likes" | "comments"
                    )
                  }
                >
                  <option value="date">Date</option>
                  <option value="views">Views</option>
                  <option value="likes">Likes</option>
                  <option value="comments">Comments</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <button
                  onClick={toggleSortOrder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black flex items-center justify-between"
                >
                  <span>
                    {sortOrder === "asc" ? "Ascending" : "Descending"}
                  </span>
                  {sortOrder === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blog
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Engagement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Edited
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBlogs.map((blog) => (
              <tr key={blog._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={blog.media.coverImage || "/placeholder.svg"}
                      alt={blog.title}
                      className="h-10 w-10 rounded-md object-cover mr-3"
                    />
                    <div className="text-sm font-medium text-gray-900">
                      {blog.title}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.views?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {blog.likes}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {blog.comments.length}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="text-gray-600 hover:text-gray-900"
                      title="View"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleEdit(blog._id)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No blogs found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogManagementSection;
