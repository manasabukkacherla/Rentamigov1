"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {   useParams, Link } from 'react-router-dom';
import { Clock, ThumbsUp, MessageCircle, Share2, ArrowLeft, Star, Send } from "lucide-react"
import {  blogPosts as initialBlogPosts } from "../Blogs/data/blogData"
import type { BlogPostType, Comment, Review } from "../Blogs/types/type"
import Navbar from "./Navbar";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [newComment, setNewComment] = useState("")
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(5)
  const [activeTab, setActiveTab] = useState<"comments" | "reviews">("comments")

  useEffect(() => {
    if (id) {
      const foundPost = initialBlogPosts.find((post) => post.id === Number.parseInt(id))
      setPost(foundPost || null)
    }
  }, [id])

  const handleLike = () => {
    if (post) {
      setPost({
        ...post,
        likes: post.userHasLiked ? post.likes - 1 : post.likes + 1,
        userHasLiked: !post.userHasLiked,
      })
    }
  }

  const handleCommentLike = (commentId: number) => {
    if (post) {
      setPost({
        ...post,
        commentsList: post.commentsList.map((comment) =>
          comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment,
        ),
      })
    }
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (post && newComment.trim()) {
      const newCommentObj: Comment = {
        id: post.commentsList.length + 1,
        text: newComment,
        author: {
          name: "You",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
        },
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        likes: 0,
      }

      setPost({
        ...post,
        comments: post.comments + 1,
        commentsList: [newCommentObj, ...post.commentsList],
      })
      setNewComment("")
    }
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (post && newReview.trim()) {
      const newReviewObj: Review = {
        id: post.reviews.length + 1,
        rating: rating,
        text: newReview,
        author: {
          name: "You",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
        },
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      }

      setPost({
        ...post,
        reviews: [newReviewObj, ...post.reviews],
      })
      setNewReview("")
      setRating(5)
    }
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-12 w-full max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h2>
        <Link to="/blogs" className="text-black hover:text-grey-900 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
      <br /><br />
      <Navbar/>
      <Link to="/blogs" className="inline-flex items-center text-black hover:text-grey-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all posts
      </Link>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
        <img src={post.coverImage || "/placeholder.svg"} alt={post.title} className="w-full h-96 object-cover" />

        <div className="p-8">
          <div className="flex items-center mb-4">
            <span className="inline-block bg-indigo-100 text-grey-900 text-sm px-3 py-1 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center text-gray-500 text-sm ml-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime} min read</span>
            </div>
            <span className="text-gray-500 text-sm ml-4">{post.date}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>

          <div className="flex items-center mb-8">
            <img
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              className="h-12 w-12 rounded-full mr-4"
            />
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 mb-8">
            <p className="mb-4">{post.content}</p>
            <p className="mb-4">
              This beautiful property showcases modern architecture with spacious interiors and natural light
              throughout. The open floor plan creates a seamless flow between living spaces, perfect for both relaxation
              and entertaining.
            </p>
            <p className="mb-4">
              Located in a prime neighborhood, this home offers convenient access to local amenities, schools, and
              transportation. The property features high-quality finishes, energy-efficient appliances, and smart home
              technology for comfortable living.
            </p>
            <p>
              Whether you're looking for your dream home or an investment opportunity, this property deserves your
              attention. Contact us today to schedule a viewing and experience the exceptional quality and design
              firsthand.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                className={`flex items-center ${post.userHasLiked ? "text-black" : "text-gray-500 hover:text-black"}`}
                onClick={handleLike}
              >
                <ThumbsUp className={`h-5 w-5 mr-2 ${post.userHasLiked ? "fill-black" : ""}`} />
                <span>{post.likes} Likes</span>
              </button>
              <button
                className="flex items-center text-gray-500 hover:text-black"
                onClick={() => setActiveTab("comments")}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                <span>{post.comments} Comments</span>
              </button>
            </div>
            <button className="flex items-center text-gray-500 hover:text-black">
              <Share2 className="h-5 w-5 mr-2" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </article>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6 w-full" id="comments">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`pb-3 px-4 font-medium ${activeTab === "comments" ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("comments")}
          >
            Comments ({post.comments})
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
            <form onSubmit={handleAddComment} className="mb-8">
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
            <main className="max-w-full mx-auto py-8">
        
            </main>
            <div className="space-y-6">
              {post.commentsList.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <img
                    src={comment.author.avatar || "/placeholder.svg"}
                    alt={comment.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium text-gray-900">{comment.author.name}</span>
                          <span className="text-gray-500 text-sm ml-2">{comment.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <button
                        className="flex items-center hover:text-black"
                        onClick={() => handleCommentLike(comment.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{comment.likes} Likes</span>
                      </button>
                      <span className="mx-2">•</span>
                      <button className="hover:text-black">Reply</button>
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
              {post.reviews.map((review) => (
                <div key={review.id} className="flex space-x-4">
                  <img
                    src={review.author.avatar || "/placeholder.svg"}
                    alt={review.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium text-gray-900">{review.author.name}</span>
                          <span className="text-gray-500 text-sm ml-2">{review.date}</span>
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
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <br /><br /><br />
      <div className="mt-12 w-full">
        {/* <h3 className="text-xl font-bold text-gray-900 mb-6">Related Properties</h3> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
          {initialBlogPosts
            .filter((relatedPost) => relatedPost.id !== post.id && relatedPost.category === post.category)
            .slice(0, 3)
            .map((relatedPost) => (
              <Link to={`/blog/${relatedPost.id}`} key={relatedPost.id} className="block">
                <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <img
                    src={relatedPost.coverImage || "/placeholder.svg"}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-1">{relatedPost.title}</h4>
                    <p className="text-sm text-gray-500">{relatedPost.date}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
