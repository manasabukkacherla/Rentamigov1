"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import DashboardNavigation from "@/components/dashboard/DashboardNavigation"
import StatisticsSection from "@/components/dashboard/StatisticsSection"
import RecentBlogsSection from "@/components/dashboard/RecentBlogsSection"
import BlogManagementSection from "@/components/dashboard/BlogManagementSection"
import ProfileSection from "@/components/dashboard/ProfileSection"
import TopPicksSection from "@/components/dashboard/TopPicksSection"
import HomeFooter from "@/components/HomeFooter"
import { blogPosts } from "@/data/blogData"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Get recent blogs (last 5)
  const recentBlogs = [...blogPosts]
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 5)

  // Get top blogs (most views)
  const topBlogs = [...blogPosts]
    .filter((blog) => blog.views)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 shrink-0">
            <DashboardNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <ProfileSection className="mt-6 hidden md:block" />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
                <StatisticsSection />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  <RecentBlogsSection blogs={recentBlogs} />
                  <TopPicksSection blogs={topBlogs} />
                </div>
              </>
            )}

            {activeTab === "blogs" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Blog Management</h1>
                <BlogManagementSection blogs={blogPosts} />
              </>
            )}

            {activeTab === "profile" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
                <ProfileSection className="md:hidden mb-6" />
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                  <p className="text-gray-600 mb-4">Manage your account settings and preferences.</p>
                  {/* Additional profile settings would go here */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  )
}

