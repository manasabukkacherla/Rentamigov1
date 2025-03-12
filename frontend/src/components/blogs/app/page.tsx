"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import BlogList from "@/components/BlogList"
import TrendingSection from "@/components/TrendingSection"
import FeaturedBlog from "@/components/FeaturedBlog"
import TopicPicks from "@/components/TopicPicks"
import Pagination from "@/components/Pagination"
import HomeFooter from "@/components/HomeFooter"
import { blogPosts } from "@/data/blogData"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const blogsPerPage = 6

  // Filter blogs based on search and tags
  const filteredBlogs = blogPosts.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => blog.tags.some((blogTag) => blogTag.toLowerCase().includes(tag.toLowerCase())))

    return matchesSearch && matchesTags
  })

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

  // Get popular topics
  const allTags = blogPosts.flatMap((blog) => blog.tags)
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const popularTopics = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag]) => tag)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        {/* Search and filtering */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        <div className="container mx-auto px-4 py-8">
          {/* Featured Blog */}
          <FeaturedBlog blog={featuredBlog} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
              <BlogList blogs={currentBlogs} />

              {/* Pagination */}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>

            <div className="space-y-8">
              {/* Trending Section */}
              <TrendingSection blogs={trendingBlogs} />

              {/* Topic Picks */}
              <TopicPicks topics={popularTopics} />
            </div>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  )
}

