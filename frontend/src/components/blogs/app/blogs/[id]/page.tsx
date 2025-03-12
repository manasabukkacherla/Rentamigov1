"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import BlogDetail from "@/components/BlogDetail"
import HomeFooter from "@/components/HomeFooter"
import { getBlogById } from "@/services/blogService"
import type { BlogPostType } from "@/types"

export default function BlogDetailPage() {
  const params = useParams()
  const [blog, setBlog] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const blogId = Number(params.id)
      const foundBlog = getBlogById(blogId)
      setBlog(foundBlog || null)
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-lg w-full mb-8"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          </div>
        </div>
        <HomeFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <BlogDetail />
      <HomeFooter />
    </div>
  )
}

