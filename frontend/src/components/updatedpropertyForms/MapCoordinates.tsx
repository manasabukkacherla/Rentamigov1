"use client"

import type React from "react"
import { MapPin } from "lucide-react"
import MapSelector from "./MapSelector"

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
  const handleLocationSelect = (lat: string, lng: string, addressData?: any) => {
    // Update using the new unified method if available
    if (onLocationChange) {
      const label = addressData?.formatted_address || `${lat}, ${lng}`
      onLocationChange({ latitude: lat, longitude: lng, label })
    } 
    // Otherwise use the separate methods for backward compatibility
    else {
      onLatitudeChange(lat)
      onLongitudeChange(lng)
    }
  }

  return (
    <div className="mb-6">
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
          Location
        </label>
        <MapSelector
          latitude={latitude}
          longitude={longitude}
          onLocationSelect={handleLocationSelect}
        />
        {latitude && longitude && (
          <p className="mt-2 text-xs text-gray-500">
            Coordinates: {latitude}, {longitude}
          </p>
        )}
      </div>
    </div>
  )
}

export default MapCoordinates

