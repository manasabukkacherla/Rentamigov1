"use client"

import { useNavigate } from "react-router-dom"
import ImageSlider from "../components/ImageSlider"
import { mockBlogs } from "../data/mockData"
import SearchBar from "../components/SearchBar"
import { useState } from "react"
import BlogList from "../components/BlogList"
import { blogPosts } from "../data/blogData"
import type { Blogpost } from "../types"
import TrendingSection from "../components/TrendingSection"
import TopicPicks from "../components/TopicPicks"
import BlogCard from "../components/BlogCard"
import Pagination from "../components/Pagination"
import HomeFooter from "../components/HomeFooter"

const HomePage = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [randomBlog, setRandomBlog] = useState<Blogpost | null>(null)
  const blogsPerPage = 6

  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = mockBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
  const totalPages = Math.ceil(mockBlogs.length / blogsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRandomBlog = () => {
    const randomIndex = Math.floor(Math.random() * blogPosts.length)
    setRandomBlog(blogPosts[randomIndex])
  }

  if (!randomBlog) {
    handleRandomBlog()
  }

  const filteredBlogs = blogPosts.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => blog.tags.some((blogTag: string) => blogTag.toLowerCase().includes(tag.toLowerCase())))

    return matchesSearch && matchesTags
  })

  const trendingBlogs = [...blogPosts].sort((a, b) => b.shares ?? 0 - (a.shares ?? 0)).slice(0, 3)

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
        <section>
          <ImageSlider blogs={mockBlogs.slice(0, 5)} />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </section>
        <br />
        <br />
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 pl-4">Latest Posts</h2>
          <p className="text-gray-600 pl-4">Discover the latest thoughts, ideas, and stories from our community.</p>

          <br />
          <BlogList blogs={filteredBlogs} />
        </div>

        {/* Random Blog Feature */}
        {randomBlog && (
          <div className="mb-12 bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Featured Blog</h2>
              <button
                onClick={handleRandomBlog}
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition flex items-center"
              >
                <span>Pick Random Blog</span>
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={randomBlog.coverImage}
                  alt={randomBlog.title}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-2/3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {randomBlog.tags.map((tag) => (
                    <span key={tag} className="inline-block bg-gray-100 text-black text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{randomBlog.title}</h3>
                <p className="text-gray-600 mb-4">{randomBlog.excerpt}</p>
                <a
                  onClick={() => navigate(`/blog/${randomBlog.id}`)}
                  style={{ cursor: "pointer" }}
                  className="inline-flex items-center text-black hover:text-gray-700 font-medium transition"
                >
                  Read full article
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Trending Section */}
        <TrendingSection blogs={trendingBlogs} />

        {/* Topic Picks Section */}
        <TopicPicks blogs={mockBlogs.slice(0, 3)} />

        {/* All Blogs Section with Pagination */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">All Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  )
}

export default HomePage

