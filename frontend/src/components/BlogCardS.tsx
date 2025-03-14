"use client"

import type React from "react"
import { useState } from "react"
import { Clock, ArrowRight, Award, ThumbsUp, MessageCircle, Share2 } from "lucide-react"
import type { Blogpost } from "../types"
import { Link, useNavigate } from "react-router-dom"

interface BlogCardProps {
  blog: Blogpost
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  // Determine if this is a popular blog (for badge display)
  const isPopular = blog.views && blog.views > 2000

  // const handleLike = (e: React.MouseEvent) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     onLike(post.id);
  //   };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />

        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-3 right-3 bg-black text-white rounded-full p-1 shadow-md">
            <Award className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="p-6 flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.map((tag) => (
            <span key={tag} className="inline-block bg-gray-100 text-black text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>

        <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{blog.date}</span>
          </div>

          {blog.views && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{blog.views.toLocaleString()} views</span>
          )}
        </div>

        <p className="text-gray-600 mb-4">{blog.excerpt}</p>
      </div>

      <div className="px-6 pb-6">
        <a
          onClick={() => navigate(`/blog/${blog.id}`)}
          style={{ cursor: "pointer" }}
          className="inline-flex items-center text-black hover:text-gray-700 font-medium transition"
        >
          Read more
          <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${isHovered ? "translate-x-1" : ""}`} />
        </a>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 px-6 pb-6">
        <div className="flex items-center">
          <img src={blog.author.avatar} alt={blog.author.name} className="h-8 w-8 rounded-full mr-2" />
          <span className="text-sm font-medium text-gray-900">{blog.author.name}</span>
        </div>

        <div className="flex space-x-3 text-gray-500">
          <button className={`flex items-center ${blog.userHasLiked ? "text-indigo-600" : "hover:text-indigo-600"}`}>
            <ThumbsUp className={`h-4 w-4 mr-1 ${blog.userHasLiked ? "fill-indigo-600" : ""}`} />
            <span className="text-xs">{blog.likes}</span>
          </button>
          <Link to={`/blog/${blog.id}#comments`} className="flex items-center hover:text-indigo-600">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span className="text-xs">{blog.comments}</span>
          </Link>
          <button className="flex items-center hover:text-indigo-600">
            <Share2 className="h-4 w-4" />
            <span className="text-xs">{blog.shares}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogCard

