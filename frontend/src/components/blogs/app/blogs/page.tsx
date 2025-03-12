"use client"
import Navbar from "@/components/Navbar"
import BlogsPage from "@/components/BlogsPage"
import HomeFooter from "@/components/HomeFooter"

export default function BlogsListPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <BlogsPage />
      <HomeFooter />
    </div>
  )
}

