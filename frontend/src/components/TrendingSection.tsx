"use client"

import type React from "react"
import { TrendingUp, Share2 } from "lucide-react"
import type { Blogpost } from "../types"
import { useNavigate } from "react-router-dom"

interface TrendingSectionProps {
  blogs: Blogpost[]
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ blogs }) => {
  const navigate = useNavigate()
  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-black mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Trending Now</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border-t-4 border-black"
          >
            <div className="relative">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 font-bold">#{index + 1}</div>
            </div>

            <div className="p-5 flex-grow">
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{blog.date}</span>
                <div className="flex items-center">
                  <Share2 className="h-4 w-4 mr-1" />
                  <span>{blog.shares} shares</span>
                </div>
              </div>

              <a
                onClick={() => navigate(`/blog/${blog.id}`)}
                style={{ cursor: "pointer" }}
                className="text-black hover:text-gray-700 font-medium text-sm"
              >
                Read article
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingSection

