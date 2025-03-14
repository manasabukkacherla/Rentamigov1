"use client"

import { useState } from "react"
import BlogList from "./BlogList"
import SearchBar from "./SearchBar"
import TrendingSection from "./TrendingSection"
import FeaturedBlog from "./FeaturedBlog"
import Pagination from "./Pagination"
import { blogPosts } from "./data/blogData"
import Navbar from "../Navbar"
const BlogsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const blogsPerPage = 6

  // Filter blogs based on search and tags
  const filteredBlogs = blogPosts.filter((blog) => {
    // Temporarily removing filtering logic to display all blogs
    console.log("Filtering blogs with searchQuery:", searchQuery);
    console.log("Selected tags:", selectedTags);
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => blog.tags.some((blogTag) => blogTag.toLowerCase().includes(tag.toLowerCase())))

    return matchesSearch && matchesTags
  }) // End of filtering logic

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)

  // Get trending blogs (sorted by shares)
  const trendingBlogs = [...blogPosts].sort((a, b) => b.shares - a.shares).slice(0, 3)

  // Get a random featured blog
  const randomIndex = Math.floor(Math.random() * blogPosts.length)
  const featuredBlog = blogPosts[randomIndex]

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Navbar/>
        {/* Search and filtering */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        <div className="my-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Posts</h2>
          <p className="text-gray-600">Discover the latest thoughts, ideas, and stories from our community.</p>
          <div className="mt-6">
            <BlogList blogs={currentBlogs} />
          </div>
        </div>

        {/* Featured Blog */}
        <FeaturedBlog blog={featuredBlog} />

        {/* Trending Section */}
        <TrendingSection blogs={trendingBlogs} />

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>
    </div>
  )
}

export default BlogsPage
