"use client"

import type React from "react"
import { MapPin, Navigation } from "lucide-react"

interface MapCoordinatesProps {
  latitude: string
  longitude: string
  onLatitudeChange: (latitude: string) => void
  onLongitudeChange: (longitude: string) => void
  locationLabel?: string
  onLocationChange?: (location: { latitude: string; longitude: string, label: string }) => void
}

const MapCoordinates: React.FC<MapCoordinatesProps> = ({
  latitude,
  longitude,
  onLatitudeChange,
  onLongitudeChange,
  locationLabel = "",
  onLocationChange,
}) => {
  // Legacy handlers for backward compatibility
  const handleLocationChange = (newLocationLabel: string, lat: string, lng: string) => {
    // Update using the new unified method if available
    if (onLocationChange) {
      onLocationChange({ latitude: lat, longitude: lng, label: newLocationLabel });
    } 
    // Otherwise use the separate methods for backward compatibility
    else {
      onLatitudeChange(lat);
      onLongitudeChange(lng);
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
          Location
        </label>
        <div className="relative">
          <input
            type="text"
            id="location"
            value={locationLabel || `${latitude}, ${longitude}`}
            readOnly
            placeholder="Select location on map"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
          />
          <Navigation className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" size={18} />
        </div>
        {/* {latitude && longitude && (
          <p className="mt-2 text-xs text-gray-500">
            Coordinates: {latitude}, {longitude}
          </p>
        )} */}
      </div>
      
      {/* Hidden fields for compatibility with existing code */}
      <div className="hidden grid grid-cols-1 md:grid-cols-2 gap-4">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
            />
            {/* <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /> */}
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-500">
        <p>You can select your location directly on the map above to set these coordinates.</p>
      </div>
    </div>
  )
}

export default MapCoordinates

