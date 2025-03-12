"use client"

import type React from "react"

import { Award, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Blogpost } from "@/types"

interface TopPicksSectionProps {
  blogs: Blogpost[]
  className?: string
}

const TopPicksSection: React.FC<TopPicksSectionProps> = ({ blogs, className = "" }) => {
  const navigate = useNavigate()

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Award className="h-5 w-5 text-yellow-500 mr-2" />
          <h2 className="text-xl font-bold">Top Performing Blogs</h2>
        </div>
        <button onClick={() => navigate("/blogs")} className="text-sm text-black hover:text-gray-700 flex items-center">
          View all <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {blogs.map((blog, index) => (
          <div
            key={blog.id}
            className="flex items-center p-3 hover:bg-gray-50 rounded-md transition cursor-pointer"
            onClick={() => navigate(`/blogs/${blog.id}`)}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-gray-500">#{index + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">{blog.title}</h3>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">{blog.views?.toLocaleString() || 0} views</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-xs text-gray-500">{blog.likes} likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopPicksSection

