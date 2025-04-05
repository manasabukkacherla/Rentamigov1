"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { MapPin, Search, Locate, X } from "lucide-react"

interface MapSelectorProps {
  latitude: string
  longitude: string
  onLocationSelect: (lat: string, lng: string, address?: any) => void
}

// Declare google variable
declare global {
  interface Window {
    google: any
  }
}

const MapSelector: React.FC<MapSelectorProps> = ({ latitude, longitude, onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showMap, setShowMap] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null)

  // Initialize map when component mounts or when showMap changes to true
  useEffect(() => {
    if (!showMap || !mapRef.current) return

    const initMap = async () => {
      // Check if Google Maps API is loaded
      if (!window.google || !window.google.maps) {
        // Load Google Maps API if not already loaded
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,geocoding`
        script.async = true
        script.defer = true
        script.onload = () => createMap()
        script.onerror = () => setError("Failed to load Google Maps. Please try again later.")
        document.head.appendChild(script)
      } else {
        createMap()
      }
    }

    const createMap = () => {
      try {
        // Default to a central location if no coordinates are provided
        const initialLat = latitude ? Number.parseFloat(latitude) : 20.5937
        const initialLng = longitude ? Number.parseFloat(longitude) : 78.9629

        // Create the map
        const mapOptions: google.maps.MapOptions = {
          center: { lat: initialLat, lng: initialLng },
          zoom: 12,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        }

        const map = new window.google.maps.Map(mapRef.current!, mapOptions)
        mapInstanceRef.current = map

        // Initialize geocoder
        geocoderRef.current = new window.google.maps.Geocoder()

        // Add a marker at the initial position
        const marker = new window.google.maps.Marker({
          position: { lat: initialLat, lng: initialLng },
          map: map,
          draggable: true,
          animation: window.google.maps.Animation.DROP,
          title: "Property Location",
        })
        markerRef.current = marker

        // Update coordinates and address when marker is dragged
        marker.addListener("dragend", () => {
          const position = marker.getPosition()
          if (position) {
            updateLocationDetails(position.lat(), position.lng())
          }
        })

        // Update marker position and address when map is clicked
        map.addListener("click", (e: google.maps.MapMouseEvent) => {
          const position = e.latLng
          if (position && marker) {
            marker.setPosition(position)
            updateLocationDetails(position.lat(), position.lng())
          }
        })

        // Initialize the search box if Places library is available
        if (window.google.maps.places) {
          const input = document.getElementById("map-search-input") as HTMLInputElement
          const searchBox = new window.google.maps.places.SearchBox(input)
          searchBoxRef.current = searchBox

          // Bias the SearchBox results towards current map's viewport
          map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds)
          })

          searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces()
            if (!places || places.length === 0) return

            const place = places[0]
            if (!place.geometry || !place.geometry.location) return

            // Update marker and map
            marker.setPosition(place.geometry.location)
            map.setCenter(place.geometry.location)
            map.setZoom(17)

            // Update form fields with location details
            updateLocationDetails(
              place.geometry.location.lat(),
              place.geometry.location.lng(),
              extractAddressComponents(place),
            )
          })
        }

        // If we have coordinates, try to get the address
        if (latitude && longitude) {
          reverseGeocode(Number.parseFloat(latitude), Number.parseFloat(longitude))
        }
      } catch (err) {
        console.error("Error initializing map:", err)
        setError("Failed to initialize map. Please try again later.")
      }
    }

    initMap()
  }, [showMap, latitude, longitude])

  // Extract address components from place
  const extractAddressComponents = (place: google.maps.places.PlaceResult) => {
    const addressComponents = place.address_components || []
    const addressData: any = {}

    // Extract address components
    addressComponents.forEach((component) => {
      const types = component.types

      if (types.includes("street_number")) {
        addressData.streetNumber = component.long_name
      } else if (types.includes("route")) {
        addressData.street = component.long_name
      } else if (types.includes("locality")) {
        addressData.city = component.long_name
      } else if (types.includes("administrative_area_level_1")) {
        addressData.state = component.long_name
      } else if (types.includes("postal_code")) {
        addressData.pinCode = component.long_name
      } else if (types.includes("country")) {
        addressData.country = component.long_name
      }
    })

    // Combine street number and street name if both exist
    if (addressData.streetNumber && addressData.street) {
      addressData.street = `${addressData.streetNumber} ${addressData.street}`
      delete addressData.streetNumber
    }

    // Format the full address
    addressData.address = place.formatted_address || ""

    return addressData
  }

  // Reverse geocode to get address from coordinates
  const reverseGeocode = (lat: number, lng: number) => {
    if (!geocoderRef.current) return

    geocoderRef.current.geocode(
      { location: { lat, lng } },
      (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
        if (status === "OK" && results[0]) {
          const place = {
            address_components: results[0].address_components,
            formatted_address: results[0].formatted_address,
          }

          updateLocationDetails(lat, lng, extractAddressComponents(place as any))
        }
      },
    )
  }

  // Update location details (coordinates and address)
  const updateLocationDetails = (lat: number, lng: number, addressData?: any) => {
    // Update coordinates
    onLocationSelect(lat.toString(), lng.toString(), addressData)

    // If no address data was provided and geocoder is available, try to get it
    if (!addressData && geocoderRef.current) {
      reverseGeocode(lat, lng)
    }
  }

  // Use current location
  const handleUseCurrentLocation = () => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        // Update map and marker if map is initialized
        if (mapInstanceRef.current && markerRef.current) {
          const latLng = new window.google.maps.LatLng(latitude, longitude)
          markerRef.current.setPosition(latLng)
          mapInstanceRef.current.setCenter(latLng)
          mapInstanceRef.current.setZoom(17)

          // Update location details
          updateLocationDetails(latitude, longitude)
        } else {
          // Just update the coordinates if map is not initialized
          onLocationSelect(latitude.toString(), longitude.toString())
        }

        setIsLoading(false)
      },
      (error) => {
        console.error("Error getting current location:", error)
        setError("Unable to retrieve your location. Please ensure location services are enabled.")
        setIsLoading(false)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    )
  }

  // Handle search query change
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim() || !searchBoxRef.current) return

    // Trigger the search box places_changed event programmatically
    // This is a workaround since we can't directly trigger the event
    const input = document.getElementById("map-search-input") as HTMLInputElement
    input.focus()
    // Simulate pressing Enter
    const event = new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, which: 13 })
    input.dispatchEvent(event)
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <label className="block text-gray-800 font-medium">Property Location</label>
        <button
          type="button"
          onClick={() => setShowMap(!showMap)}
          className="text-sm flex items-center text-black hover:text-gray-700 transition-colors"
        >
          {showMap ? (
            <>
              <X size={16} className="mr-1" />
              Hide Map
            </>
          ) : (
            <>
              <MapPin size={16} className="mr-1" />
              Show Map
            </>
          )}
        </button>
      </div>

      {showMap && (
        <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-[400px] w-full">
            {/* Search form */}
            <form
              onSubmit={handleSearchSubmit}
              className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 w-[calc(100%-20px)] max-w-md flex"
            >
              <input
                id="map-search-input"
                type="text"
                placeholder="Search for a location"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-gray-800 transition-colors"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Map container */}
            <div ref={mapRef} className="h-full w-full"></div>

            {/* Map controls */}
            <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isLoading}
                className="flex items-center justify-center bg-white text-black px-3 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Locating...
                  </span>
                ) : (
                  <>
                    <Locate size={16} className="mr-1" />
                    Use Current Location
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-gray-800 font-medium mb-2">
            Latitude
          </label>
          <div className="relative">
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={(e) => onLocationSelect(e.target.value, longitude)}
              placeholder="Enter latitude"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200"
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <div>
          <label htmlFor="longitude" className="block text-gray-800 font-medium mb-2">
            Longitude
          </label>
          <div className="relative">
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={(e) => onLocationSelect(latitude, e.target.value)}
              placeholder="Enter longitude"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200"
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        <p>Click on the map to set the property location or enter coordinates manually.</p>
      </div>
    </div>
  )
}

export default MapSelector

