"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { FileText, ArrowRight, Eye, ThumbsUp } from "lucide-react"

interface Blog {
  _id: string
  title: string
  excerpt: string
  content: string
  media: {
    coverImage: string
    images?: string[]
  }
  tags: string[]
  category: string
  readTime: number
  author: User
  likes: number
  views: number
  shares: 0
  comments: Comment[]
  reviews: Review[]
  createdAt: Date
  updatedAt: Date
  userHasLiked: boolean
}

interface Comment {
  _id: string
  author: User
  comment: string
  createdAt: string
  likes: string[]
  userHasLiked?: boolean
}

interface User {
  _id: string
  fullName: string
}

interface Review {
  _id: string
  author: User
  comment: string
  rating: number
  createdAt: string
  likes: string[]
  userHasLiked?: boolean
}

interface RecentBlogsSectionProps {
  blogs: Blog[]
}

const RecentBlogsSection: React.FC<RecentBlogsSectionProps> = ({ blogs }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div className="flex items-center">
          <FileText className="h-6 w-6 text-gray-700 mr-2" />
          <h2 className="text-xl sm:text-2xl font-bold">Recent Blogs</h2>
        </div>
        <button
          onClick={() => {
            // This will trigger the parent component to switch to the blogs tab
            window.dispatchEvent(new CustomEvent("switchToBlogsTab"))
          }}
          className="text-black hover:text-gray-700 flex items-center cursor-pointer"
        >
          View all
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blogs/${blog._id}`}
            className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
          >
            <div className="relative w-full pt-[56.25%]">
              {" "}
              {/* 16:9 aspect ratio */}
              <img
                src={blog.media.coverImage || "/placeholder.svg"}
                alt={blog.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-1">{blog.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                {blog.excerpt || blog.content.substring(0, 120) + "..."}
              </p>
              <div className="flex justify-between text-sm text-gray-500 mt-auto">
                <span>{new Date(blog.updatedAt).toLocaleDateString()}</span>
                <div className="flex items-center space-x-3">
                  <span className="hidden sm:inline-flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {blog.views?.toLocaleString() || 0}
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {blog.likes}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No blogs found.</p>
        </div>
      )}
    </div>
  )
}

export default RecentBlogsSection

