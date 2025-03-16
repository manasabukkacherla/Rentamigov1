"use client"

import type React from "react"
import { useEffect, useState } from "react"
import type { Blog } from "../types"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageSliderProps {
  blogs: Blog[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ blogs }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [blogs.length])

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? blogs.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === blogs.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  if (!blogs.length) return null

  return (
    <div className="relative w-full h-[600px] group">
      <div
        className="w-full h-full bg-center bg-cover duration-500 relative"
        style={{ backgroundImage: `url(${blogs[currentIndex].imageUrl})` }}
      >
        {/* Overlay with text */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8">
          <h2 className="text-white text-3xl font-bold mb-2">{blogs[currentIndex].title}</h2>
          <p className="text-white text-lg mb-4 line-clamp-2">{blogs[currentIndex].content}</p>
          <div className="flex items-center text-white mb-2">
            <span className="mr-4">By {blogs[currentIndex].author.name}</span>
            <span className="mr-4">• {new Date(blogs[currentIndex].createdAt).toLocaleDateString()}</span>
            <span>• {blogs[currentIndex].rating.toFixed(1)} ★</span>
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-md w-fit hover:bg-gray-100 transition">
            Read More
          </button>
        </div>
      </div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeft onClick={goToPrevious} size={30} />
      </div>

      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRight onClick={goToNext} size={30} />
      </div>

      {/* Dots/Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {blogs.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer h-3 w-3 rounded-full ${
              slideIndex === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider

