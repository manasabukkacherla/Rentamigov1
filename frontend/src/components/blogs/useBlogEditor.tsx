"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBlogById, createBlog, updateBlog } from "../Blogs/blogService1"
import type { Blogpost } from "../Blogs/types"

interface BlogFormData {
  title: string
  content: string
  excerpt: string
  tags: string[]
  coverImage: string | null
  category: string
  readTime: number
}

interface UseBlogEditorProps {
  isEditing?: boolean
}

export const useBlogEditor = ({ isEditing = false }: UseBlogEditorProps = {}) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const blogId = id ? Number.parseInt(id) : undefined

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    excerpt: "",
    tags: [],
    coverImage: null,
    category: "Lifestyle",
    readTime: 5,
  })

  const [currentTag, setCurrentTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")

  // Load blog data if editing
  useEffect(() => {
    if (isEditing && blogId) {
      const blog = getBlogById(blogId)
      if (blog) {
        setFormData({
          title: blog.title,
          content: blog.content,
          excerpt: blog.excerpt || "",
          tags: blog.tags,
          coverImage: blog.coverImage,
          category: blog.category,
          readTime: blog.readTime,
        })
      }
    }
  }, [isEditing, blogId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }))

    // Clear error when content is edited
    if (errors.content) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.content
        return newErrors
      })
    }
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, coverImage: reader.result as string }))

      // Clear error when image is uploaded
      if (errors.coverImage) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.coverImage
          return newErrors
        })
      }
    }
    reader.readAsDataURL(file)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required"
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required"
    }

    if (!formData.coverImage) {
      newErrors.coverImage = "Cover image is required"
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "At least one tag is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create author object (in a real app, this would come from auth context)
      const author = {
        name: "Alex Johnson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      }

      const blogData: Omit<Blogpost, "id"> = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        tags: formData.tags,
        coverImage: formData.coverImage || "",
        category: formData.category,
        readTime: formData.readTime,
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        author,
        likes: 0,
        comments: 0,
        commentsList: [],
        reviews: [],
        shares: 0,
      }

      if (isEditing && blogId) {
        // Update existing blog
        const updated = updateBlog(blogId, blogData)
        if (updated) {
          setSuccessMessage("Blog updated successfully!")
          setTimeout(() => {
            navigate(`/blog/${blogId}`)
          }, 1500)
        }
      } else {
        // Create new blog
        const newBlog = createBlog(blogData)
        setSuccessMessage("Blog created successfully!")
        setTimeout(() => {
          navigate(`/blog/${newBlog.id}`)
        }, 1500)
      }
    } catch (error) {
      console.error("Error saving blog:", error)
      setErrors({ submit: "Failed to save blog. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    currentTag,
    setCurrentTag,
    errors,
    isSubmitting,
    successMessage,
    handleInputChange,
    handleContentChange,
    handleAddTag,
    handleRemoveTag,
    handleImageUpload,
    handleSubmit,
  }
}

