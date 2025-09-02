import React from 'react';
import { Star, ThumbsUp, MessageSquare, Flag } from 'lucide-react';

const ReviewsRatings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Reviews & Ratings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Average Rating</h2>
            <Star className="h-6 w-6 text-gray-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">4.5/5</p>
          <p className="text-sm text-gray-500 mt-2">Based on 234 reviews</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Positive Reviews</h2>
            <ThumbsUp className="h-6 w-6 text-gray-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">92%</p>
          <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Reviews</h2>
            <MessageSquare className="h-6 w-6 text-gray-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">28</p>
          <p className="text-sm text-gray-500 mt-2">This week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Rating Distribution</h2>
          <div className="space-y-4">
            {[
              { stars: 5, percentage: 65, count: 152 },
              { stars: 4, percentage: 20, count: 47 },
              { stars: 3, percentage: 10, count: 23 },
              { stars: 2, percentage: 3, count: 7 },
              { stars: 1, percentage: 2, count: 5 }
            ].map((rating, index) => (
              <div key={index}>
                <div className="flex items-center">
                  <span className="w-12 text-sm text-gray-600">{rating.stars} star</span>
                  <div className="flex-1 h-2 mx-4 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-gray-900 rounded-full"
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-sm text-gray-600">{rating.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Review Categories</h2>
          <div className="space-y-4">
            {[
              { category: "Cleanliness", rating: 4.8 },
              { category: "Staff Behavior", rating: 4.6 },
              { category: "Food Quality", rating: 4.2 },
              { category: "Amenities", rating: 4.5 },
              { category: "Value for Money", rating: 4.3 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <span className="font-medium text-gray-700">{item.category}</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-gray-600 mr-1" />
                  <span>{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Reviews</h2>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option>Most Recent</option>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
          </select>
        </div>
        <div className="space-y-6">
          {[
            {
              name: "John Doe",
              pg: "Sunshine PG",
              rating: 5,
              date: "2024-03-10",
              comment: "Excellent facilities and very clean environment. The staff is very helpful and professional.",
              helpful: 12
            },
            {
              name: "Jane Smith",
              pg: "Green Valley",
              rating: 4,
              date: "2024-03-09",
              comment: "Good experience overall. The food could be better but everything else is great.",
              helpful: 8
            },
            {
              name: "Mike Johnson",
              pg: "City Living",
              rating: 5,
              date: "2024-03-08",
              comment: "Best PG I've stayed in. Great amenities and friendly staff.",
              helpful: 15
            }
          ].map((review, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.pg}</p>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gray-600" />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-gray-600">{review.comment}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{review.date}</span>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-600 hover:text-gray-900">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-gray-900">
                    <Flag className="h-4 w-4 mr-1" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsRatings;