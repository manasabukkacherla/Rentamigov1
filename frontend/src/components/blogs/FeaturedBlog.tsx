"use client"

import type React from "react"

import { useNavigate } from "react-router-dom"
import type { Blogpost } from "./types"

interface FeaturedBlogProps {
  blog: Blogpost
}

const FeaturedBlog: React.FC<FeaturedBlogProps> = ({ blog }) => {
  const navigate = useNavigate()

  return (
    <div className="mb-12 bg-white rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Featured Blog</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img
            src={blog.coverImage || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-2/3">
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags.map((tag) => (
              <span key={tag} className="inline-block bg-gray-100 text-black text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{blog.title}</h3>
          <p className="text-gray-600 mb-4">{blog.excerpt}</p>
          <a
            onClick={() => navigate(`/blogs/${blog.id}`)}
            style={{ cursor: "pointer" }}
            className="inline-flex items-center text-black hover:text-gray-700 font-medium transition"
          >
            Read full article
          </a>
        </div>
      </div>
    </div>
  )
}

export default FeaturedBlog

