"use client"

import type React from "react"
import { useState } from "react"
import { Star, User, ThumbsUp, MessageSquare, Filter, ChevronDown, Search } from "lucide-react"

interface Review {
  id: number
  name: string
  rating: number
  date: string
  comment: string
  helpful?: number
  avatar?: string
  verified?: boolean
  images?: string[]
  replies?: {
    id: number
    name: string
    date: string
    comment: string
    avatar?: string
  }[]
}

const reviews: Review[] = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    date: "2024-02-15",
    comment:
      "Amazing property with great amenities. The location is perfect for IT professionals. The security is top-notch and the maintenance staff is very responsive. I've been living here for 6 months and have had zero issues.",
    helpful: 12,
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=500",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=500",
    ],
    replies: [
      {
        id: 101,
        name: "Property Manager",
        date: "2024-02-16",
        comment: "Thank you for your positive feedback, John! We're glad you're enjoying your stay with us.",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    date: "2024-02-10",
    comment:
      "Very well maintained property. The security is excellent. Only issue is the traffic during peak hours, but that's expected in this area. The amenities are great, especially the gym and swimming pool.",
    helpful: 8,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    verified: true,
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    date: "2024-02-05",
    comment:
      "Best apartment complex in the area. The gym and swimming pool are top-notch. The staff is very friendly and helpful. The location is convenient with easy access to shopping centers and restaurants.",
    helpful: 15,
    verified: true,
    images: ["https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500"],
  },
  {
    id: 4,
    name: "Sarah Williams",
    rating: 3,
    date: "2024-01-28",
    comment:
      "The property is good but the maintenance could be better. Sometimes it takes days to get issues resolved. The location and amenities are great though.",
    helpful: 5,
  },
]

export const Reviews: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  // Rating distribution
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const rating = 5 - i
    const count = reviews.filter((review) => review.rating === rating).length
    const percentage = (count / reviews.length) * 100
    return { rating, count, percentage }
  })

  // Filter reviews based on active filter and search query
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.name.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false

    if (activeFilter === "all") return true
    if (activeFilter === "5star" && review.rating === 5) return true
    if (activeFilter === "4star" && review.rating === 4) return true
    if (activeFilter === "3star" && review.rating === 3) return true
    if (activeFilter === "2star" && review.rating === 2) return true
    if (activeFilter === "1star" && review.rating === 1) return true
    if (activeFilter === "withPhotos" && review.images && review.images.length > 0) return true

    return false
  })

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Reviews & Ratings</h2>
      </div>

      {/* Rating summary */}
      <div className="p-8 bg-gray-50 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Average rating display - increased height */}
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-900 mb-4">4.3</div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">{reviews.length} reviews</div>
          </div>

          {/* Rating distribution - increased gap */}
          <div className="flex-1">
            <div className="space-y-4 max-w-md">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center gap-3">
                  <div className="w-8 text-sm font-medium text-gray-700 flex items-center">
                    {item.rating} <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 ml-0.5" />
                  </div>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <div className="w-12 text-xs text-gray-500 text-right">{item.percentage.toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and filters - positioned below the rating display */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 block w-full pl-10 p-2.5"
              placeholder="Search in reviews"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              className="flex items-center justify-between w-full sm:w-auto px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>
                  {activeFilter === "all"
                    ? "All Reviews"
                    : activeFilter === "withPhotos"
                      ? "With Photos"
                      : activeFilter === "5star"
                        ? "5 Star"
                        : activeFilter === "4star"
                          ? "4 Star"
                          : activeFilter === "3star"
                            ? "3 Star"
                            : activeFilter === "2star"
                              ? "2 Star"
                              : "1 Star"}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ml-2 ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {showFilters && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="py-1 text-sm">
                  {[
                    { id: "all", label: "All Reviews" },
                    { id: "5star", label: "5 Star" },
                    { id: "4star", label: "4 Star" },
                    { id: "3star", label: "3 Star" },
                    { id: "2star", label: "2 Star" },
                    { id: "1star", label: "1 Star" },
                    { id: "withPhotos", label: "With Photos" },
                  ].map((filter) => (
                    <li key={filter.id}>
                      <button
                        className={`block px-4 py-2 w-full text-left hover:bg-gray-100 ${activeFilter === filter.id ? "bg-gray-50 font-medium" : ""}`}
                        onClick={() => {
                          setActiveFilter(filter.id)
                          setShowFilters(false)
                        }}
                      >
                        {filter.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="divide-y divide-gray-100">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                  {review.avatar ? (
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-600" />
                  )}
                </div>

                {/* Review content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    {review.verified && (
                      <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">Verified Stay</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  {/* Review images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                      {review.images.map((image, index) => (
                        <div key={index} className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Review image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful {review.helpful ? `(${review.helpful})` : ""}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm">
                      <MessageSquare className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>

                  {/* Replies */}
                  {review.replies && review.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-100">
                      {review.replies.map((reply) => (
                        <div key={reply.id} className="mb-3 last:mb-0">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                              {reply.avatar ? (
                                <img
                                  src={reply.avatar || "/placeholder.svg"}
                                  alt={reply.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-4 h-4 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-gray-900 text-sm">{reply.name}</h4>
                                <span className="text-xs text-gray-500">
                                  {new Date(reply.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No reviews match your criteria.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <button className="w-full py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  )
}
