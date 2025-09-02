import type React from "react"
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  Clock,
  ThumbsUp,
  MessageCircle,
  Share2,
  ArrowLeft,
  Star,
  Send,
  Mail,
  Linkedin,
  LinkIcon,
  Twitter,
} from "lucide-react"
import Navbar from "./Navbar"
import axios from "axios"
import { toast } from "react-toastify"

interface Blog {
  _id: string
  title: string
  excerpt: string
  content: string
  media: {
    coverImage: string
    images?: string[]
  }
  tags: string[]
  category: string
  readTime: number
  author: User
  likes: number
  views: number
  shares: number
  comments: Comment[]
  reviews: Review[]
  createdAt: Date
  updatedAt: Date
  userHasLiked: boolean
}

interface Comment {
  _id: string
  author: User
  comment: string
  createdAt: string
  likes: string[]
  userHasLiked?: boolean
}

interface User {
  _id: string
  fullName: string
}

interface Review {
  _id: string
  author: User
  comment: string
  rating: number
  createdAt: string
  likes: string[]
  userHasLiked?: boolean
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Blog | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [newComment, setNewComment] = useState("")
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(5)
  const [activeTab, setActiveTab] = useState<"comments" | "reviews">("comments")
  const [isLoading, setIsloading] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/blog/${id}`)
          if (response.data.success) {
            const blog = response.data.blog;
            let userHasLiked = false;

            const user = sessionStorage.getItem("user")
            if (user) {
              const owner = JSON.parse(user).id
              const res = await axios.get(`http://localhost:8000/api/likes/${id}/liked/${owner}`)

              if (res.data.success) {
                userHasLiked = res.data.liked
              }

              // Check likes for comments and reviews
              const commentsWithLikes = await Promise.all(
                blog.comments.map(async (comment: Comment) => {
                  const likeRes = await axios.get(`http://localhost:8000/api/comments/${comment._id}/liked/${owner}`)
                  return {
                    ...comment,
                    userHasLiked: likeRes.data.liked,
                  }
                }),
              )

              const reviewsWithLikes = await Promise.all(
                blog.reviews.map(async (review: Review) => {
                  const likeRes = await axios.get(`http://localhost:8000/api/reviews/${review._id}/liked/${owner}`)
                  return {
                    ...review,
                    userHasLiked: likeRes.data.liked,
                  }
                }),
              )

              setComments(commentsWithLikes)
              setReviews(reviewsWithLikes)
            }

            setPost({
              ...blog,
              userHasLiked,
            })
          } else {
            setPost(null)
          }
        } catch (error) {
          console.error("Error fetching blog:", error)
          toast.error("Something went wrong")
          setPost(null)
        } finally {
          setIsloading(false)
        }
      }
    }

    fetchBlog()
  }, [id])

  const handleLike = async () => {
    if (id) {
      try {
        const user = sessionStorage.getItem("user")
        if (user) {
          const owner = JSON.parse(user).id
          const response = await axios.post(`http://localhost:8000/api/likes/${id}`, { userId: owner })
          if (response.data.success) {
            if (post) {
              setPost({
                ...post,
                likes: post.userHasLiked ? post.likes - 1 : post.likes + 1,
                userHasLiked: !post.userHasLiked,
              })
            }
          }
        }
      } catch (error) {
        toast.error("Something went wrong")
      }
    }
  }

  const handleDislike = async () => {
    if (id) {
      try {
        const user = sessionStorage.getItem("user")
        if (user) {
          const owner = JSON.parse(user).id
          const response = await axios.delete(`http://localhost:8000/api/likes/${id}/${owner}`)
          if (response.data.success) {
            if (post) {
              setPost({
                ...post,
                likes: post.userHasLiked ? post.likes - 1 : post.likes + 1,
                userHasLiked: !post.userHasLiked,
              })
            }
          }
        }
      } catch (error) {
        toast.error("Something went wrong")
      }
    }
  }

  const handleCommentLike = async (commentId: string) => {
    try {
      const user = sessionStorage.getItem("user")
      if (!user) {
        toast.error("Please login first")
        return
      }

      const owner = JSON.parse(user).id
      const comment = comments.find((c) => c._id === commentId)

      if (comment?.userHasLiked) {
        const response = await axios.delete(`http://localhost:8000/api/comments/${commentId}/likes/${owner}`)
        if (response.data.success) {
          setComments(
            comments.map((c) =>
              c._id === commentId ? { ...c, likes: c.likes.filter((id) => id !== owner), userHasLiked: false } : c,
            ),
          )
        }
      } else {
        const response = await axios.post(`http://localhost:8000/api/comments/${commentId}/likes`, { userId: owner })
        if (response.data.success) {
          setComments(
            comments.map((c) => (c._id === commentId ? { ...c, likes: [...c.likes, owner], userHasLiked: true } : c)),
          )
        }
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const handleReviewLike = async (reviewId: string) => {
    try {
      const user = sessionStorage.getItem("user")
      if (!user) {
        toast.error("Please login first")
        return
      }

      const owner = JSON.parse(user).id
      const review = reviews.find((r) => r._id === reviewId)

      if (review?.userHasLiked) {
        const response = await axios.delete(`http://localhost:8000/api/reviews/${reviewId}/likes/${owner}`)
        if (response.data.success) {
          setReviews(
            reviews.map((r) =>
              r._id === reviewId ? { ...r, likes: r.likes.filter((id) => id !== owner), userHasLiked: false } : r,
            ),
          )
        }
      } else {
        const response = await axios.post(`http://localhost:8000/api/reviews/${reviewId}/likes`, { userId: owner })
        if (response.data.success) {
          setReviews(
            reviews.map((r) => (r._id === reviewId ? { ...r, likes: [...r.likes, owner], userHasLiked: true } : r)),
          )
        }
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = sessionStorage.getItem("user")

      if (user) {
        const owner = JSON.parse(user).id
        const Comment = {
          author: owner,
          comment: newComment,
        }

        const response = await axios.post(`http://localhost:8000/api/comments/${id}`, Comment)
        if (response.data.success) {
          setNewComment("")
          setComments([...comments, { ...response.data.comment, likes: [], userHasLiked: false }])
          if (post) {
            setPost({
              ...post,
              comments: comments,
            })
          }
          toast.success("Comment added successfully!")
          navigate(`/blogs/${id}`)
        } else {
          setNewComment("")
        }
      } else {
        toast.error("Login first")
        navigate("/Login")
      }
    } catch (error) {
      console.error("Error adding comment:", error)
      toast.error("Something went wrong")
      setNewComment("")
    }
  }

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = sessionStorage.getItem("user")

      if (user) {
        const owner = JSON.parse(user).id
        const Review = {
          author: owner,
          comment: newReview,
          rating: rating,
        }

        const response = await axios.post(`http://localhost:8000/api/reviews/${id}`, Review)
        if (response.data.success) {
          setNewReview("")
          setReviews([...reviews, { ...response.data.review, likes: [], userHasLiked: false }])
          if (post) {
            setPost({
              ...post,
              reviews: reviews,
            })
          }
          toast.success("Review added successfully!")
          navigate(`/blogs/${id}`)
        } else {
          setNewReview("")
        }
      } else {
        toast.error("Login first")
        navigate("/Login")
      }
    } catch (error) {
      console.error("Error adding review:", error)
      toast.error("Something went wrong")
      setNewReview("")
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      const user = sessionStorage.getItem("user")
      if (!user) {
        toast.error("Please login first")
        return
      }

      const author = JSON.parse(user).id

      const response = await axios.delete(`http://localhost:8000/api/comments/${commentId}`, {
        data: { author },
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.data.success) {
        toast.success("Comment deleted successfully")
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId))
      } else {
        toast.error(response.data.message || "Failed to delete comment")
      }
    } catch (error) {
      console.error("Error deleting comment:", error)
      toast.error("Something went wrong")
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const user = sessionStorage.getItem("user")
      if (!user) {
        toast.error("Please login first")
        return
      }

      const author = JSON.parse(user).id

      const response = await axios.delete(`http://localhost:8000/api/reviews/${reviewId}`, {
        data: { author },
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.data.success) {
        toast.success("Review deleted successfully")
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId))
      } else {
        toast.error(response.data.message || "Failed to delete review")
      }
    } catch (error) {
      console.error("Error deleting review:", error)
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showShareOptions && !(event.target as Element).closest(".share-dropdown")) {
        setShowShareOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showShareOptions])

  const handleShare = async (platform: string) => {
    if (!post) return

    const url = window.location.href
    const title = post.title

    try {
      let shared = false;

      switch (platform) {
        case "email":
          window.open(
            `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this blog post: ${url}`)}`,
          )
          shared = true
          break
        case "whatsapp":
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`)
          shared = true
          break
        case "linkedin":
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
          shared = true
          break
        case "twitter":
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)
          shared = true
          break
        case "copy":
          try {
            await navigator.clipboard.writeText(url)
            toast.success("Link copied to clipboard!")
            shared = true
          } catch (err) {
            console.error("Error copying to clipboard:", err)
            toast.error("Failed to copy link")
          }
          break
      }

      if (shared) {
        try {
          const response = await axios.post(`http://localhost:8000/api/blog/${id}/share`)
          if (response.data.success && post) {
            setPost({
              ...post,
              shares: (post.shares || 0) + 1,
            })
            setShowShareOptions(false)
          }
        } catch (error) {
          console.error("Error updating share count:", error)
          // Don't show error toast here since sharing still worked
        }
      }
    } catch (error) {
      console.error("Error sharing:", error)
      toast.error("Failed to share")
    }
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-12 w-full max-w-7xl mx-auto px-4">
        {isLoading ? (
          <>
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Blog</h2>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h2>
            <Link to="/blogs" className="text-black hover:text-grey-900 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </>
        )}
      </div>
    )
  }

  const plainText = post.content.replace(/<\/?[^>]+(>|$)/g, "")

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
      <Navbar />
      <br />
      <br />
      <Link to="/blogs" className="inline-flex items-center text-black hover:text-grey-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all posts
      </Link>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
        <img src={post.media.coverImage || "/placeholder.svg"} alt={post.title} className="w-full h-96 object-cover" />

        <div className="p-8">
          <div className="flex items-center mb-4">
            <span className="inline-block bg-indigo-100 text-grey-900 text-sm px-3 py-1 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center text-gray-500 text-sm ml-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime} min read</span>
            </div>
            <span className="text-gray-500 text-sm ml-4">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>

          <div className="flex items-center mb-8">
            <img className="h-12 w-12 rounded-full mr-4" />
            <div>
              <p className="font-medium text-gray-900">{post.author.fullName}</p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 mb-8">
            <p className="mb-4">{plainText}</p>
          </div>

          <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                className={`flex items-center ${post.userHasLiked ? "text-black" : "text-gray-500 hover:text-black"}`}
                onClick={!post.userHasLiked ? handleLike : handleDislike}
              >
                <ThumbsUp className={`h-5 w-5 mr-2 ${post.userHasLiked ? "fill-black" : ""}`} />
                <span>{post.likes} Likes</span>
              </button>
              <button
                className="flex items-center text-gray-500 hover:text-black"
                onClick={() => setActiveTab("comments")}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                <span>{post.comments.length} Comments</span>
              </button>
            </div>
            <div className="share-dropdown">
              <button
                className="flex items-center text-gray-500 hover:text-black"
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Share2 className="h-5 w-5 mr-2" />
                <span>Share ({post.shares || 0})</span>
              </button>
              {showShareOptions && (
                <div className="share-options">
                  <div className="py-1">
                    <button
                      onClick={() => handleShare("email")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Mail className="h-4 w-4 mr-3" />
                      Email
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-3"
                      >
                        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                        <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                        <path d="M9.5 13.5c.5 1 1.5 1 2.5 1s2-.5 2.5-1" />
                      </svg>
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Linkedin className="h-4 w-4 mr-3" />
                      LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Twitter className="h-4 w-4 mr-3" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare("copy")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LinkIcon className="h-4 w-4 mr-3" />
                      Copy Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6 w-full" id="comments">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`pb-3 px-4 font-medium ${activeTab === "comments" ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("comments")}
          >
            Comments ({post.comments.length})
          </button>
          <button
            className={`pb-3 px-4 font-medium ${activeTab === "reviews" ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({post.reviews.length})
          </button>
        </div>

        {activeTab === "comments" ? (
          <>
            <form className="mb-8" onSubmit={handleAddComment}>
              <div className="flex items-start space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
                  alt="Your avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={!newComment.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <main className="max-w-full mx-auto py-8"></main>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment._id} className="flex space-x-4">
                  <img className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium text-gray-900">{comment.author.fullName}</span>
                          <span className="text-gray-500 text-sm ml-2">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700">{comment.comment}</p>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <button
                        className={`flex items-center hover:text-black ${comment.userHasLiked ? "text-black" : ""}`}
                        onClick={() => handleCommentLike(comment._id)}
                      >
                        <ThumbsUp className={`h-4 w-4 mr-1 ${comment.userHasLiked ? "fill-black" : ""}`} />
                        <span>{comment.likes.length} Likes</span>
                      </button>
                      {comment.author._id === JSON.parse(sessionStorage.getItem("user") || "{}").id && (
                        <button
                          className="ml-4 px-3 py-1 text-sm font-medium text-black-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition duration-200"
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleAddReview} className="mb-8">
              <div className="flex items-start space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
                  alt="Your avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                        <Star
                          className={`h-6 w-6 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-gray-700">{rating} out of 5 stars</span>
                  </div>
                  <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={!newReview.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Post Review
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="flex space-x-4">
                  <img className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium text-gray-900">{review.author.fullName}</span>
                          <span className="text-gray-500 text-sm ml-2">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <button
                        className={`flex items-center hover:text-black ${review.userHasLiked ? "text-black" : ""}`}
                        onClick={() => handleReviewLike(review._id)}
                      >
                        <ThumbsUp className={`h-4 w-4 mr-1 ${review.userHasLiked ? "fill-black" : ""}`} />
                        <span>{review.likes.length} Likes</span>
                      </button>
                      {review.author._id === JSON.parse(sessionStorage.getItem("user") || "{}").id && (
                        <button
                          className="ml-4 px-3 py-1 text-sm font-medium text-black-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition duration-200"
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <br />
      <br />
      <br />
    </div>
  )
}

export default BlogDetail