import type React from "react"
import { BarChart2, Eye, ThumbsUp, MessageCircle, TrendingUp } from "lucide-react"

interface StatisticsProps {
  stats: {
    totalBlogs: number
    totalViews: number
    totalLikes: number
    totalComments: number
    viewsThisMonth: number
    likesThisMonth: number
    commentsThisMonth: number
    mostViewedBlog: string
    mostLikedBlog: string
    mostCommentedBlog: string
  }
}

const StatisticsSection: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <BarChart2 className="h-6 w-6 text-gray-700 mr-2" />
        <h2 className="text-2xl font-bold">Statistics Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Eye className="h-5 w-5 text-gray-700 mr-2" />
            <h3 className="text-lg font-medium">Views</h3>
          </div>
          <p className="text-3xl font-bold mb-1">{stats.totalViews.toLocaleString()}</p>
          <p className="text-sm text-green-600 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />+{stats.viewsThisMonth.toLocaleString()} this month
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <ThumbsUp className="h-5 w-5 text-gray-700 mr-2" />
            <h3 className="text-lg font-medium">Likes</h3>
          </div>
          <p className="text-3xl font-bold mb-1">{stats.totalLikes.toLocaleString()}</p>
          <p className="text-sm text-green-600 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />+{stats.likesThisMonth} this month
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <MessageCircle className="h-5 w-5 text-gray-700 mr-2" />
            <h3 className="text-lg font-medium">Comments</h3>
          </div>
          <p className="text-3xl font-bold mb-1">{stats.totalComments.toLocaleString()}</p>
          <p className="text-sm text-green-600 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />+{stats.commentsThisMonth} this month
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Top Performing Content</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Most Viewed Blog</p>
            <p className="font-medium">{stats.mostViewedBlog}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Most Liked Blog</p>
            <p className="font-medium">{stats.mostLikedBlog}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Most Commented Blog</p>
            <p className="font-medium">{stats.mostCommentedBlog}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsSection

