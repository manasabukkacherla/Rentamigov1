"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { MapPin, Search, Locate, X } from "lucide-react"

interface MapSelectorProps {
  latitude: string
  longitude: string
  onLocationSelect: (lat: string, lng: string, address?: any) => void
  initialShowMap?: boolean
}

// Declare google variable
declare global {
  interface Window {
    google: any
  }
}

const MapSelector: React.FC<MapSelectorProps> = ({ latitude, longitude, onLocationSelect, initialShowMap = true }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showMap, setShowMap] = useState(initialShowMap)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  // Initialize map when component mounts or when showMap changes to true
  useEffect(() => {
    if (!showMap || !mapRef.current) return

    const initMap = async () => {
      // Check if Google Maps API is already loaded
      if (window.google && window.google.maps) {
        createMap()
        return undefined
      }

      // Check if script is already being loaded
      if (scriptRef.current) {
        return undefined
      }

      // Load Google Maps API if not already loaded
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places,geocoding`
      script.async = true
      script.defer = true
      script.onload = () => {
        if (window.google && window.google.maps) {
          createMap()
        } else {
          setError("Failed to load Google Maps. Please try again later.")
        }
      }
      script.onerror = () => setError("Failed to load Google Maps. Please try again later.")
      document.head.appendChild(script)
      scriptRef.current = script

      return () => {
        if (scriptRef.current) {
          document.head.removeChild(scriptRef.current)
          scriptRef.current = null
        }
      }
    }

    const createMap = () => {
      try {
        // Clear any existing map
        if (mapInstanceRef.current) {
          window.google.maps.event.clearInstanceListeners(mapInstanceRef.current)
          mapInstanceRef.current = null
        }

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
          if (e.latLng) {
            marker.setPosition(e.latLng)
            updateLocationDetails(e.latLng.lat(), e.latLng.lng())
          }
        })

        // Initialize search box
        const searchInput = document.getElementById("map-search-input") as HTMLInputElement
        if (searchInput) {
          searchBoxRef.current = new window.google.maps.places.SearchBox(searchInput)
          map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(searchInput)

          // Bias the SearchBox results towards current map's viewport
          map.addListener("bounds_changed", () => {
            searchBoxRef.current?.setBounds(map.getBounds() as google.maps.LatLngBounds)
          })

          // Listen for the event fired when the user selects a prediction
          searchBoxRef.current?.addListener("places_changed", () => {
            const places = searchBoxRef.current?.getPlaces()

            if (!places || places.length === 0) {
              return
            }

            // For each place, get the location
            const bounds = new window.google.maps.LatLngBounds()
            places.forEach((place) => {
              if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry")
                return
              }

              // Create a marker for the place
              marker.setPosition(place.geometry.location)
              map.setCenter(place.geometry.location)
              map.setZoom(15)

              // Update location details
              updateLocationDetails(
                place.geometry.location.lat(),
                place.geometry.location.lng(),
                extractAddressComponents(place)
              )

              if (place.geometry.viewport) {
                // Only geocodes have viewport
                bounds.union(place.geometry.viewport)
              } else {
                bounds.extend(place.geometry.location)
              }
            })
            map.fitBounds(bounds)
          })
        }
      } catch (err) {
        console.error("Error creating map:", err)
        setError("Failed to initialize map. Please try again later.")
      }
    }

    const cleanup = initMap()

    // Cleanup function
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
        markerRef.current = null
      }
      if (mapInstanceRef.current) {
        window.google.maps.event.clearInstanceListeners(mapInstanceRef.current)
        mapInstanceRef.current = null
      }
      if (searchBoxRef.current) {
        window.google.maps.event.clearInstanceListeners(searchBoxRef.current)
        searchBoxRef.current = null
      }
      if (cleanup) {
        cleanup.then(cleanupFn => {
          if (cleanupFn) {
            cleanupFn()
          }
        })
      }
    }
  }, [showMap, latitude, longitude])

  // Add a cleanup effect to ensure proper cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
        markerRef.current = null
      }
      if (mapInstanceRef.current) {
        window.google.maps.event.clearInstanceListeners(mapInstanceRef.current)
        mapInstanceRef.current = null
      }
      if (searchBoxRef.current) {
        window.google.maps.event.clearInstanceListeners(searchBoxRef.current)
        searchBoxRef.current = null
      }
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current)
        scriptRef.current = null
      }
    }
  }, [])

  const extractAddressComponents = (place: google.maps.places.PlaceResult) => {
    const addressComponents: Record<string, string> = {}
    if (place.address_components) {
      place.address_components.forEach((component) => {
        const type = component.types[0]
        addressComponents[type] = component.long_name
      })
    }
    return addressComponents
  }

  const reverseGeocode = (lat: number, lng: number) => {
    if (!geocoderRef.current) return

    const latlng = { lat, lng }
    geocoderRef.current.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        updateLocationDetails(lat, lng, extractAddressComponents(results[0]))
      }
    })
  }

  const updateLocationDetails = (lat: number, lng: number, addressData?: any) => {
    const latStr = lat.toFixed(6)
    const lngStr = lng.toFixed(6)
    onLocationSelect(latStr, lngStr, addressData)
  }

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
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        if (mapInstanceRef.current && markerRef.current) {
          const latLng = new window.google.maps.LatLng(lat, lng)
          mapInstanceRef.current.setCenter(latLng)
          mapInstanceRef.current.setZoom(15)
          markerRef.current.setPosition(latLng)
          updateLocationDetails(lat, lng)
          reverseGeocode(lat, lng)
        }

        setIsLoading(false)
      },
      (error) => {
        console.error("Geolocation error:", error)
        setError("Unable to retrieve your location. Please try again or enter coordinates manually.")
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  }

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    if (!geocoderRef.current) {
      setError("Map services not initialized. Please try again.")
      return
    }

    setIsLoading(true)
    setError(null)

    geocoderRef.current.geocode({ address: searchQuery }, (results, status) => {
      setIsLoading(false)

      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location
        const lat = location.lat()
        const lng = location.lng()

        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setCenter(location)
          mapInstanceRef.current.setZoom(15)
          markerRef.current.setPosition(location)
          updateLocationDetails(lat, lng, extractAddressComponents(results[0]))
        }
      } else {
        setError("Location not found. Please try a different search term.")
      }
    })
  }

  return (
    <div className="w-full">
      {/* Map container */}
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
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-0 focus:border-black outline-none transition-all duration-200"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-gray-800 transition-colors"
            >
              <Search size={18} className="text-white" />
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

      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">{error}</div>}

      <div className="mt-4 text-sm text-gray-500">
        <p>Click on the map to set the property location or enter coordinates manually.</p>
      </div>
    </div>
  )
}

export default MapSelector