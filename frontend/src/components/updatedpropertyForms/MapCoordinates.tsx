"use client"

import type React from "react"
import { MapPin } from "lucide-react"

interface MapCoordinatesProps {
  latitude: string
  longitude: string
  onLatitudeChange: (latitude: string) => void
  onLongitudeChange: (longitude: string) => void
}

const MapCoordinates: React.FC<MapCoordinatesProps> = ({
  latitude,
  longitude,
  onLatitudeChange,
  onLongitudeChange,
}) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-gray-700 font-medium mb-2">
            Latitude
          </label>
          <div className="relative">
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={(e) => onLatitudeChange(e.target.value)}
              placeholder="Enter latitude"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <div>
          <label htmlFor="longitude" className="block text-gray-700 font-medium mb-2">
            Longitude
          </label>
          <div className="relative">
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={(e) => onLongitudeChange(e.target.value)}
              placeholder="Enter longitude"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-500">
        <p>You can find coordinates by right-clicking on Google Maps and selecting "What's here?"</p>
      </div>
    </div>
  )
}

export default MapCoordinates

