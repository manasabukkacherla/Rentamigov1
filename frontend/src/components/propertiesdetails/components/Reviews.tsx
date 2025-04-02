"use client"

import type React from "react"
import { useState } from "react"
import { Star, User, ThumbsUp, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    date: "2024-02-15",
    comment:
      "Amazing property with great amenities. The location is perfect for IT professionals. The security is excellent and the staff is very helpful. I would highly recommend this property to anyone looking for a comfortable living experience.",
    helpful: 12,
    replies: [
      {
        id: 101,
        name: "Property Manager",
        date: "2024-02-16",
        comment: "Thank you for your positive feedback, John! We're glad you're enjoying your stay with us.",
        isOfficial: true,
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    date: "2024-02-10",
    comment:
      "Very well maintained property. The security is excellent. Only issue is the traffic during peak hours, but that's expected in this area. Overall, a great place to live.",
    helpful: 8,
    replies: [],
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    date: "2024-02-05",
    comment:
      "Best apartment complex in the area. The gym and swimming pool are top-notch. The maintenance team is very responsive and addresses issues promptly.",
    helpful: 15,
    replies: [],
  },
  {
    id: 4,
    name: "Sarah Williams",
    rating: 3,
    date: "2024-01-28",
    comment:
      "The property is good but the water pressure is a bit low. The management has been notified but the issue persists. Otherwise, the location and amenities are great.",
    helpful: 5,
    replies: [
      {
        id: 102,
        name: "Property Manager",
        date: "2024-01-30",
        comment:
          "Hi Sarah, we apologize for the inconvenience. Our maintenance team is working on resolving the water pressure issue. We appreciate your patience.",
        isOfficial: true,
      },
    ],
  },
]

export const Reviews: React.FC = () => {
  const [expandedReview, setExpandedReview] = useState<number | null>(null)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2)

  const toggleReview = (id: number) => {
    if (expandedReview === id) {
      setExpandedReview(null)
    } else {
      setExpandedReview(id)
    }
  }

  const calculateAverageRating = () => {
    const sum = reviews.reduce((total, review) => total + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const getRatingPercentage = (rating: number) => {
    const count = reviews.filter((review) => review.rating === rating).length
    return Math.round((count / reviews.length) * 100)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">{calculateAverageRating()}</div>
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(Number.parseFloat(calculateAverageRating()))
                    ? "text-amber-500 fill-amber-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">{reviews.length} reviews</p>
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${getRatingPercentage(rating)}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-10">{getRatingPercentage(rating)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <div className="flex gap-3 items-center text-sm text-gray-500">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span>
                        {new Date(review.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleReview(review.id)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {expandedReview === review.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>

              <p className={`text-gray-700 ${expandedReview === review.id ? "" : "line-clamp-2"}`}>{review.comment}</p>

              <div className="flex items-center gap-4 mt-4">
                <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">Helpful ({review.helpful})</span>
                </button>

                <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">Reply</span>
                </button>
              </div>
            </div>

            {review.replies.length > 0 && expandedReview === review.id && (
              <div className="bg-gray-50 p-5 border-t border-gray-200">
                {review.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{reply.name}</h4>
                        {reply.isOfficial && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            Official
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        {new Date(reply.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-gray-700">{reply.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {reviews.length > 2 && (
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="mt-6 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
        >
          {showAllReviews ? "Show Less Reviews" : `Show All Reviews (${reviews.length})`}
        </button>
      )}
    </div>
  )
}

