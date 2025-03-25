import axios from "axios";
import {
  BarChart2,
  Eye,
  TrendingUp,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface StatisticsData {
  totalBlogs: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  viewsThisMonth: number;
  likesThisMonth: number;
  commentsThisMonth: number;
  previousViews: number;
  previousLikes: number;
  previousComments: number;
  growthRateViews: number;
  growthRateLikes: number;
  growthRateComments: number;
  mostViewedBlog: string;
  mostLikedBlog: string;
  mostCommentedBlog: string;
  publishedBlogs: number;
  drafts: number;
  averageWordCount: number;
}

const StatisticsSection: React.FC = () => {
  const [stats, setStats] = useState<StatisticsData | null>(null);

  useEffect(() => {
    // Replace the URL with your actual backend API endpoint
    const fetchStats = async () => {
      try {
        const user = sessionStorage.getItem("user");

        if (user) {
          const author = JSON.parse(user).id;
          const response = await axios.get(`/api/stats/${author}`);

          setStats(response.data); // Store the fetched data
          // console.log(stats)
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>; // Show loading message until data is fetched
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 lg:p-5">
      <div className="flex items-center mb-4 sm:mb-5">
        <BarChart2 className="h-5 w-5 text-gray-700 mr-2" />
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
          Statistics Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-5">
        {/* Views, Likes, Comments */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center mb-1.5">
            <Eye className="h-4 w-4 text-gray-700 mr-2" />
            <h3 className="text-base font-medium">Views</h3>
          </div>
          <p className="text-3xl font-bold mb-1">
            {stats.totalViews.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />+
            {stats.viewsThisMonth.toLocaleString()} this month
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center mb-1.5">
            <ThumbsUp className="h-4 w-4 text-gray-700 mr-2" />
            <h3 className="text-base font-medium">Likes</h3>
          </div>
          <p className="text-3xl font-bold mb-1">
            {stats.totalLikes.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />+
            {stats.likesThisMonth.toLocaleString()} this month
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center mb-1.5">
            <MessageCircle className="h-4 w-4 text-gray-700 mr-2" />
            <h3 className="text-base font-medium">Comments</h3>
          </div>
          <p className="text-3xl font-bold mb-1">
            {stats.totalComments.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />+
            {stats.commentsThisMonth.toLocaleString()} this month
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <h3 className="text-base font-medium mb-2">Top Performing Content</h3>
        <div className="space-y-2">
          <div>
            <p className="text-xs sm:text-sm text-gray-600">Most Viewed Blog</p>
            <p className="font-medium text-sm truncate">
              {stats.mostViewedBlog}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600">Most Liked Blog</p>
            <p className="font-medium text-sm truncate">
              {stats.mostLikedBlog}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600">
              Most Commented Blog
            </p>
            <p className="font-medium text-sm truncate">
              {stats.mostCommentedBlog}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
