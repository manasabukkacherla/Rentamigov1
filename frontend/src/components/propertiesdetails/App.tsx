"use client"

import { useState, useEffect } from "react"
import { ImageGallery } from "./components/ImageGallery"
import { BasicInfo } from "./components/BasicInfo"
import { AmenitiesTabs } from "./components/AmenitiesTabs"
import { PricingCard } from "./components/PricingCard"
import { LocationMap } from "./components/LocationMap"
import { NearbyPlaces } from "./components/NearbyPlaces"
import { SimilarProperties } from "./components/SimilarProperties"
import { LatestInsights } from "./components/LatestInsights"
import { Reviews } from "./components/Reviews"
import { Footer } from "./components/Footer"
import { PropertyDetails } from "../detailproperty/types"
import { PropertyImage } from "./types"
import { propertyData } from "./data"
import { ChevronLeft, ChevronRight, MapPin, Heart, Share2, ArrowLeft, Star } from "lucide-react"

function Propertydetail() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAllImages, setShowAllImages] = useState(false)
  const allMedia = [propertyData.video, ...propertyData.images.map((img: PropertyImage) => img.url)];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full transition-colors ${isFavorite ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
            </button>

            <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Property Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prestige Lake Ridge</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <p>Electronic City Phase 1, Bangalore</p>
            <div className="flex items-center ml-4 bg-gray-100 px-2 py-1 rounded-md">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
              <span className="font-medium">4.8</span>
              <span className="text-sm text-gray-500 ml-1">(42 reviews)</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl overflow-hidden">
            <div className="md:col-span-2 aspect-[4/3] relative group">
              {allMedia[currentIndex].includes("vimeo.com") ? (
                <iframe
                  src={allMedia[currentIndex]}
                  className="w-full h-full rounded-xl"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <img
                  src={allMedia[currentIndex] || "/placeholder.svg"}
                  alt="Property"
                  className="w-full h-full object-cover rounded-xl"
                />
              )}

              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-gray-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-gray-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-2">
              {propertyData.images.slice(0, 8).map((image: PropertyImage, index: number) => (
                <div
                  key={image.id}
                  className="aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => setCurrentIndex(allMedia.indexOf(image.url))}
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={`Property ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAllImages(true)}
              className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md text-gray-800 font-medium hover:bg-gray-50 transition-colors"
            >
              View All Photos
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-[65%] space-y-8">
            <BasicInfo details={propertyData} />
            <AmenitiesTabs details={propertyData} />
            <LocationMap />
            <NearbyPlaces />
            <Reviews />
            <SimilarProperties propertyType="Apartment" />
            <LatestInsights />
          </div>
          <div className="lg:w-[35%]">
            <div className="sticky top-24">
              <PricingCard />
            </div>
          </div>
        </div>
      </div>

      {showAllImages && (
        <ImageGallery
          images={propertyData.images}
          onImageSelect={(url) => {
            setCurrentIndex(allMedia.indexOf(url))
            setShowAllImages(false)
          }}
          onClose={() => setShowAllImages(false)}
        />
      )}

      <Footer />
    </div>
  )
}

export default Propertydetail

