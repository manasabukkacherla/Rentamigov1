"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Image, X, Plus, Check, Upload, Camera, Video, FileText, Clock } from 'lucide-react'

interface MediaCategory {
  id: string
  title: string
  description: string
  maxPhotos: number
  photos: { url: string; file: File }[]
}

interface MediaUploadProps {
  onMediaChange?: (media: {
    categories: MediaCategory[]
    video?: { url: string; file: File } | null
    documents?: { url: string; file: File; name: string; type: string }[]
  }) => void
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onMediaChange }) => {
  const [mediaCategories, setMediaCategories] = useState<MediaCategory[]>([
    {
      id: "exterior",
      title: "Exterior Views",
      description: "Add your exterior photos in any way you prefer",
      maxPhotos: 5,
      photos: [],
    },
    {
      id: "interior",
      title: "Interior Views",
      description: "Add your interior photos in any way you prefer",
      maxPhotos: 5,
      photos: [],
    },
    {
      id: "washrooms",
      title: "Washrooms",
      description: "Add your washrooms photos in any way you prefer",
      maxPhotos: 5,
      photos: [],
    },
    {
      id: "floorPlan",
      title: "Floor Plan",
      description: "Add your floor plan photos in any way you prefer",
      maxPhotos: 5,
      photos: [],
    },
    {
      id: "lifts",
      title: "Lifts",
      description: "Add your lifts photos in any way you prefer",
      maxPhotos: 5,
      photos: [],
    },
    {
      id: "emergencyExits",
      title: "Emergency Exits",
      description: "Add your emergency exits photos in any way you prefer",
      maxPhotos: 5,
      photos: [],
    },
  ])

  const [video, setVideo] = useState<{ url: string; file: File } | null>(null)
  const [documents, setDocuments] = useState<{ url: string; file: File; name: string; type: string }[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [dragActive, setDragActive] = useState<string | null>(null)

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const videoInputRef = useRef<HTMLInputElement | null>(null)
  const documentInputRef = useRef<HTMLInputElement | null>(null)

  // Handle file selection for photos
  const handlePhotoSelect = (categoryId: string, files: FileList | null) => {
    if (!files || files.length === 0) return

    const category = mediaCategories.find((cat) => cat.id === categoryId)
    if (!category) return

    const remainingSlots = category.maxPhotos - category.photos.length
    if (remainingSlots <= 0) return

    const newFiles = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remainingSlots)
      .map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }))

    if (newFiles.length === 0) return

    const updatedCategories = mediaCategories.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          photos: [...cat.photos, ...newFiles],
        }
      }
      return cat
    })

    setMediaCategories(updatedCategories)

    // Initialize progress for new photos
    const newProgress = { ...uploadProgress }
    newFiles.forEach((_, index) => {
      const key = `${categoryId}-${category.photos.length + index}`
      newProgress[key] = 0

      // Simulate upload progress
      simulateUploadProgress(key)
    })

    setUploadProgress(newProgress)

    // Notify parent component
    if (onMediaChange) {
      onMediaChange({
        categories: updatedCategories,
        video,
        documents,
      })
    }
  }

  // Handle drag events
  const handleDrag = (e: React.DragEvent, categoryId: string | null, isDragActive: boolean) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(isDragActive ? categoryId : null)
  }

  // Handle drop event
  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(null)

    const files = e.dataTransfer.files
    handlePhotoSelect(categoryId, files)
  }

  // Handle video selection
  const handleVideoSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    if (!file.type.startsWith("video/")) return

    const videoUrl = URL.createObjectURL(file)
    const newVideo = { url: videoUrl, file }

    setVideo(newVideo)

    // Initialize progress for video
    const newProgress = { ...uploadProgress }
    newProgress["video"] = 0
    setUploadProgress(newProgress)

    // Simulate upload progress
    simulateUploadProgress("video")

    // Notify parent component
    if (onMediaChange) {
      onMediaChange({
        categories: mediaCategories,
        video: newVideo,
        documents,
      })
    }
  }

  // Handle document selection
  const handleDocumentSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, DOC, or DOCX file")
      return
    }

    const docUrl = URL.createObjectURL(file)
    const newDoc = {
      url: docUrl,
      file,
      name: file.name,
      type: file.type,
    }

    const updatedDocs = [...documents, newDoc]
    setDocuments(updatedDocs)

    // Initialize progress for document
    const newProgress = { ...uploadProgress }
    newProgress[`doc-${documents.length}`] = 0
    setUploadProgress(newProgress)

    // Simulate upload progress
    simulateUploadProgress(`doc-${documents.length}`)

    // Notify parent component
    if (onMediaChange) {
      onMediaChange({
        categories: mediaCategories,
        video,
        documents: updatedDocs,
      })
    }
  }

  // Simulate upload progress
  const simulateUploadProgress = (key: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
      }

      setUploadProgress((prev) => ({
        ...prev,
        [key]: progress,
      }))
    }, 300)
  }

  // Remove photo
  const removePhoto = (categoryId: string, index: number) => {
    const updatedCategories = mediaCategories.map((cat) => {
      if (cat.id === categoryId) {
        const updatedPhotos = [...cat.photos]
        updatedPhotos.splice(index, 1)
        return {
          ...cat,
          photos: updatedPhotos,
        }
      }
      return cat
    })

    setMediaCategories(updatedCategories)

    // Remove progress for deleted photo
    const newProgress = { ...uploadProgress }
    delete newProgress[`${categoryId}-${index}`]
    setUploadProgress(newProgress)

    // Notify parent component
    if (onMediaChange) {
      onMediaChange({
        categories: updatedCategories,
        video,
        documents,
      })
    }
  }

  // Remove video
  const removeVideo = () => {
    setVideo(null)

    // Remove progress for video
    const newProgress = { ...uploadProgress }
    delete newProgress["video"]
    setUploadProgress(newProgress)

    // Notify parent component
    if (onMediaChange) {
      onMediaChange({
        categories: mediaCategories,
        video: null,
        documents,
      })
    }
  }

  // Remove document
  const removeDocument = (index: number) => {
    const updatedDocs = [...documents]
    updatedDocs.splice(index, 1)
    setDocuments(updatedDocs)

    // Remove progress for deleted document
    const newProgress = { ...uploadProgress }
    delete newProgress[`doc-${index}`]
    setUploadProgress(newProgress)

    // Notify parent component
    if (onMediaChange) {
      onMediaChange({
        categories: mediaCategories,
        video,
        documents: updatedDocs,
      })
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8">Media Upload</h1>
        <div className="space-y-8">
          {/* Photo Categories */}
          {mediaCategories.map((category) => (
            <section key={category.id}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                {category.title}
                <span className="text-sm font-normal text-gray-500">
                  {category.photos.length}/{category.maxPhotos} photos uploaded
                </span>
              </h2>
              <div 
                className={`border-2 border-dashed border-gray-300 rounded-lg p-8 ${
                  dragActive === category.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onDragEnter={(e) => handleDrag(e, category.id, true)}
                onDragLeave={(e) => handleDrag(e, category.id, false)}
                onDragOver={(e) => handleDrag(e, category.id, true)}
                onDrop={(e) => handleDrop(e, category.id)}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-lg mb-4">{category.description}</p>
                  <div className="flex gap-4 mb-4">
                    <button 
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      onClick={() => fileInputRefs.current[category.id]?.click()}
                    >
                      <Upload className="w-4 h-4" />
                      Choose Files
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      <Camera className="w-4 h-4" />
                      Take Photo
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Or drag and drop your files here • Supported formats: JPG, PNG, WEBP (Max {category.maxPhotos} photos)
                  </p>
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[category.id] = el)}
                    onChange={(e) => handlePhotoSelect(category.id, e.target.files)}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </div>

                {/* Photo Grid */}
                {category.photos.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {category.photos.map((photo, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img
                          src={photo.url}
                          alt={`${category.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removePhoto(category.id, index)}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                        {uploadProgress[`${category.id}-${index}`] !== undefined && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                            <div
                              className="h-full bg-blue-500 transition-all duration-300"
                              style={{ width: `${uploadProgress[`${category.id}-${index}`]}%` }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

          {/* Video Upload */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Video className="w-5 h-5" />
              Property Video Tour (Optional)
              <span className="text-sm font-normal text-gray-500">
                {video ? '1/1 video uploaded' : '0/1 video uploaded'}
              </span>
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <Video className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg mb-4">Click to upload a video tour</p>
                <div className="flex gap-4 mb-4">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    onClick={() => videoInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    Choose Video
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Supported formats: MP4, WEBM (Max 100MB)
                </p>
                <input
                  type="file"
                  ref={videoInputRef}
                  onChange={(e) => handleVideoSelect(e.target.files)}
                  accept="video/*"
                  className="hidden"
                />
              </div>

              {video && (
                <div className="mt-6 relative">
                  <video
                    src={video.url}
                    controls
                    className="w-full aspect-video rounded-lg"
                  />
                  <button
                    onClick={removeVideo}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                  {uploadProgress["video"] !== undefined && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${uploadProgress["video"]}%` }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Legal Documents */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Legal Documents
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <FileText className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg mb-4">Click to upload legal documents</p>
                <div className="flex gap-4 mb-4">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    onClick={() => documentInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    Choose Files
                  </button>
                </div>
                <div className="text-sm text-gray-500 space-y-2">
                  <p>Upload ownership proof, property tax documents, etc.</p>
                  <p>Supported formats: PDF, DOC, DOCX</p>
                </div>
                <input
                  type="file"
                  ref={documentInputRef}
                  onChange={(e) => handleDocumentSelect(e.target.files)}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                />
              </div>

              {documents.length > 0 && (
                <div className="mt-6 space-y-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <span className="text-sm">{doc.name}</span>
                      </div>
                      <button
                        onClick={() => removeDocument(index)}
                        className="p-1 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                      {uploadProgress[`doc-${index}`] !== undefined && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                          <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${uploadProgress[`doc-${index}`]}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Upload Guidelines */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upload Guidelines:
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Upload clear, high-resolution images for each category</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Ensure proper lighting and angles in all photos</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Video tour should showcase the property comprehensively</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Maximum video size: 100MB</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Legal documents should be clear and complete</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Supported document formats: PDF, DOC, DOCX</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default MediaUpload

