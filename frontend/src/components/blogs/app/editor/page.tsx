"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import EditorMenuBar from "@/components/editor/EditorMenuBar"
import TagInput from "@/components/editor/TagInput"
import HomeFooter from "@/components/HomeFooter"
import { Upload, X } from "lucide-react"

export default function EditorPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <EditorMenuBar onSave={handleSubmit} isSaving={isSubmitting} onCancel={() => router.push("/dashboard")} />

            {/* Cover Image */}
            <div className="p-6 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              {coverImage ? (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={coverImage || "/placeholder.svg"}
                    alt="Cover preview"
                    className="w-full h-60 object-cover rounded-md"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={() => document.getElementById("image-upload")?.click()}
                      className="bg-white text-black p-2 rounded-full hover:bg-gray-100"
                    >
                      <Upload size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverImage(null)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => document.getElementById("image-upload")?.click()}
                  className="w-full h-60 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <Upload size={48} className="text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Click to upload cover image</p>
                </div>
              )}
              <input id="image-upload" type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
            </div>

            {/* Title */}
            <div className="p-6 border-b border-gray-200">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title..."
                className="w-full text-3xl font-bold border-none outline-none placeholder-gray-400"
              />
            </div>

            {/* Content */}
            <div className="p-6 border-b border-gray-200">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog content here..."
                className="w-full min-h-[400px] border-none outline-none resize-none placeholder-gray-400"
              />
            </div>

            {/* Tags */}
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <TagInput tags={tags} setTags={setTags} />
            </div>
          </div>
        </form>
      </div>

      <HomeFooter />
    </div>
  )
}

