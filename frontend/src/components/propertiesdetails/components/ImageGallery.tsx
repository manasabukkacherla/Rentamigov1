"use client"

import type React from "react"
import { useState } from "react"
import type { PropertyImage } from "../types"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGalleryProps {
  images: PropertyImage[]
  onImageSelect: (url: string) => void
  onClose: () => void
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "fullscreen">("grid")

  const categories = Array.from(new Set(images.map((img) => img.category)))

  const filteredImages = selectedCategory ? images.filter((img) => img.category === selectedCategory) : images

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm">
  <div className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-xl flex flex-col">
        {viewMode === "grid" ? (
          <div className="bg-white rounded-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Property Gallery</h2>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 flex-wrap">
              <button
                className={`px-4 py-2 rounded-lg ${
                  !selectedCategory ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[70vh] overflow-y-auto">
  {filteredImages.map((image, index) => (
    <div
      key={image.id}
      className="aspect-[4/3] cursor-pointer rounded-lg overflow-hidden group relative"
      onClick={() => {
        setCurrentImageIndex(index)
        setViewMode("fullscreen")
      }}
    >
      <img
        src={image.url || "/placeholder.svg"}
        alt={image.category}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
        <span className="text-white font-medium px-3 py-1 bg-black bg-opacity-50 rounded-lg capitalize">
          {image.category}
        </span>
      </div>
    </div>
  ))}
</div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={filteredImages[currentImageIndex].url || "/placeholder.svg"}
              alt={filteredImages[currentImageIndex].category}
              className="w-full h-[90vh] object-contain"
            />

            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute top-4 right-4 flex gap-3">
              <button
                onClick={() => setViewMode("grid")}
                className="bg-black/50 hover:bg-black/70 p-2 rounded-lg text-white transition-colors"
              >
                Back to Gallery
              </button>

              <button
                onClick={onClose}
                className="bg-black/50 hover:bg-black/70 p-2 rounded-lg text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-lg text-white">
              <span className="capitalize">{filteredImages[currentImageIndex].category}</span>
              <span className="mx-2">•</span>
              <span>
                {currentImageIndex + 1} of {filteredImages.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

