"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Sliders, X, Home, Building, CheckSquare } from "lucide-react"
// import { useAuth } from "../context/AuthContext"
// import Pagination from "./Pagination"
import Headerr from "./landingpages/headerr"
import { useNavigate } from "react-router-dom"

// Popular locations for dropdown
const popularLocations = [
  "Bangalore, Karnataka",
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Pune, Maharashtra",
  "Kolkata, West Bengal",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Kochi, Kerala",
  "Goa",
  "Chandigarh",
  "Lucknow, Uttar Pradesh",
  "Bhubaneswar, Odisha",
  "Indore, Madhya Pradesh",
]

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    address: "123 Main St, Downtown",
    price: 1200,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    amenities: ["parking", "gym", "pool", "furnished"],
    imageUrl: "https://th.bing.com/th/id/OIP.0iDclZaB1rPeNjmC-hpg7wHaEj?rs=1&pid=ImgDetMain.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Spacious Family House",
    address: "456 Oak Ave, Westside",
    price: 2100,
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    amenities: ["parking", "garden", "pet-friendly"],
    imageUrl:
      "https://th.bing.com/th/id/OIP.O9nIGE4tMlRXgNs7GmFFLgHaE8?w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Luxury Condo with View",
    address: "789 Tower Rd, Eastside",
    price: 1800,
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    amenities: ["parking", "gym", "security", "furnished"],
    imageUrl:
      "https://th.bing.com/th/id/OIP.xyhbDUfNyJecmSZvJxzYDAHaHI?w=254&h=245&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    address: "101 College Blvd, University District",
    price: 850,
    type: "apartment",
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    amenities: ["furnished", "utilities-included"],
    imageUrl: "https://th.bing.com/th/id/OIP.1I2zYo5S_GDAeNuxp0qX7gHaFj?rs=1&pid=ImgDetMain.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Suburban Townhouse",
    address: "222 Maple Dr, Northside",
    price: 1650,
    type: "townhouse",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1300,
    amenities: ["parking", "garden", "pet-friendly"],
    imageUrl:
      "https://luxuryproperties.in/wp-content/uploads/2019/07/Prestige-Golfshire-Villa-1.jpg?height=200&width=300",
  },
  {
    id: 6,
    title: "Renovated Historic Apartment",
    address: "333 Heritage Ln, Old Town",
    price: 1400,
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 750,
    amenities: ["furnished", "utilities-included"],
    imageUrl:
      "https://th.bing.com/th/id/OIP.vkh96gUiS6bRIwcgd-4fNwHaEa?w=316&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "Modern Loft Apartment",
    address: "444 Industrial Way, Arts District",
    price: 1600,
    type: "loft",
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    amenities: ["parking", "gym", "furnished"],
    imageUrl:
      "https://luxuryproperties.in/wp-content/uploads/2019/07/Prestige-Golfshire-Villa-1.jpg.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "Waterfront Condo",
    address: "555 Harbor Dr, Marina",
    price: 2200,
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    amenities: ["parking", "gym", "pool", "security"],
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 9,
    title: "Garden Apartment",
    address: "666 Green St, Parkside",
    price: 1300,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 800,
    amenities: ["garden", "pet-friendly"],
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 10,
    title: "Luxury Penthouse",
    address: "777 Skyline Ave, Downtown",
    price: 3500,
    type: "penthouse",
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    amenities: ["parking", "gym", "pool", "security", "furnished"],
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 11,
    title: "Student Apartment",
    address: "888 Campus Way, University District",
    price: 900,
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    amenities: ["furnished", "utilities-included"],
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 12,
    title: "Family-Friendly House",
    address: "999 Family Rd, Suburbs",
    price: 2000,
    type: "house",
    bedrooms: 4,
    bathrooms: 2,
    area: 1800,
    amenities: ["parking", "garden", "pet-friendly"],
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
]

const TenantProperties = () => {
  const navigate = useNavigate()
  //   const { isAuthenticated, user } = useAuth()
  const [location, setLocation] = useState("Bangalore, Karnataka")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredProperties, setFilteredProperties] = useState(mockProperties)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [locationSearch, setLocationSearch] = useState("")
  const [recentLocations, setRecentLocations] = useState<string[]>([])
  const propertiesPerPage = 6

  const propertyTypes = ["apartment", "house", "condo", "townhouse", "loft", "penthouse"]
  const amenitiesOptions = [
    "parking",
    "gym",
    "pool",
    "furnished",
    "pet-friendly",
    "garden",
    "security",
    "utilities-included",
  ]

  // Load recent locations from localStorage on component mount
  useEffect(() => {
    const savedLocations = localStorage.getItem("recentLocations")
    if (savedLocations) {
      setRecentLocations(JSON.parse(savedLocations))
    }
  }, [])

  // Save recent locations to localStorage when they change
  useEffect(() => {
    localStorage.setItem("recentLocations", JSON.stringify(recentLocations))
  }, [recentLocations])

  // Apply filters to properties
  useEffect(() => {
    const results = mockProperties.filter((property) => {
      // Search query filter
      if (
        searchQuery &&
        !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.address.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Price range filter
      if (property.price < priceRange[0] || property.price > priceRange[1]) {
        return false
      }

      // Property type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(property.type)) {
        return false
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        for (const amenity of selectedAmenities) {
          if (!property.amenities.includes(amenity)) {
            return false
          }
        }
      }

      return true
    })

    setFilteredProperties(results)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, priceRange, selectedTypes, selectedAmenities])

  // Get current properties for pagination
  const indexOfLastProperty = currentPage * propertiesPerPage
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty)
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const togglePropertyType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  const resetFilters = () => {
    setPriceRange([0, 5000])
    setSelectedTypes([])
    setSelectedAmenities([])
    setSearchQuery("")
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`
  }

  // Function to handle navigation to property details
  const handleViewDetails = () => {
    navigate(`/propertypage`)
  }

  // Function to handle location change
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation)

    // Add to recent locations if not already there
    if (!recentLocations.includes(newLocation)) {
      const updatedLocations = [newLocation, ...recentLocations.slice(0, 4)]
      setRecentLocations(updatedLocations)
    }

    setShowLocationModal(false)
  }

  // Filter locations based on search
  const filteredLocations = popularLocations.filter((loc) => loc.toLowerCase().includes(locationSearch.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50">
      <Headerr />
      <br></br>
      <br></br>
      <br></br>
      {/* Hero Section with Location */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Rental</h1>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <MapPin className="h-5 w-5 mr-2 text-gray-300" />
                <span className="font-medium">{location}</span>
                <button
                  className="ml-3 px-3 py-1 text-xs bg-white text-gray-900 rounded-full hover:bg-gray-100 transition"
                  onClick={() => setShowLocationModal(true)}
                >
                  Change Location
                </button>
              </div>
            </div>
            <div className="mt-6 md:mt-0 bg-white/10 backdrop-blur-sm p-5 rounded-lg max-w-md">
              <h2 className="text-xl font-semibold mb-2">Looking for a new place?</h2>
              <p className="text-gray-300 mb-4">
                Browse our curated selection of properties in {location} and find your perfect home.
              </p>
              <div className="flex gap-3">
                <button
                  className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  onClick={() =>
                    window.scrollTo({
                      top: document.getElementById("properties-section")?.offsetTop || 0,
                      behavior: "smooth",
                    })
                  }
                >
                  Browse Properties
                </button>
                <button className="bg-transparent border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  Get Assistance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Selection Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Select Location</h2>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for a city..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
            </div>

            {recentLocations.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Locations</h3>
                <div className="space-y-2">
                  {recentLocations.map((loc, index) => (
                    <button
                      key={index}
                      onClick={() => handleLocationChange(loc)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{loc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Popular Locations</h3>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {filteredLocations.map((loc, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationChange(loc)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{loc}</span>
                  </button>
                ))}
                {filteredLocations.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No locations found. Try a different search.</p>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  const customLocation = locationSearch.trim()
                  if (customLocation) {
                    handleLocationChange(customLocation)
                  }
                }}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Use Custom Location
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div id="properties-section" className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by property name or address..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="flex items-center justify-center px-5 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Sliders className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range Filter */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-4">Price Range</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-white px-3 py-1 rounded-md shadow-sm text-gray-700">${priceRange[0]}</span>
                    <span className="bg-white px-3 py-1 rounded-md shadow-sm text-gray-700">${priceRange[1]}</span>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                      className="w-full accent-gray-900"
                    />
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                      className="w-full accent-gray-900"
                    />
                  </div>
                </div>

                {/* Property Type Filter */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-4">Property Type</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          selectedTypes.includes(type)
                            ? "bg-gray-900 text-white"
                            : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
                        }`}
                        onClick={() => togglePropertyType(type)}
                      >
                        {type === "apartment" && <Building className="h-4 w-4" />}
                        {type === "house" && <Home className="h-4 w-4" />}
                        {type !== "apartment" && type !== "house" && <CheckSquare className="h-4 w-4" />}
                        <span className="capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities Filter */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {amenitiesOptions.map((amenity) => (
                      <button
                        key={amenity}
                        className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          selectedAmenities.includes(amenity)
                            ? "bg-gray-900 text-white"
                            : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
                        }`}
                        onClick={() => toggleAmenity(amenity)}
                      >
                        <CheckSquare className="h-4 w-4" />
                        <span className="capitalize">{amenity.split("-").join(" ")}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="px-5 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"} in {location}
          </h2>
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstProperty + 1}-
            {indexOfLastProperty > filteredProperties.length ? filteredProperties.length : indexOfLastProperty} of{" "}
            {filteredProperties.length}
          </div>
        </div>

        {/* Property Listings */}
        {currentProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={property.imageUrl || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-gray-900 font-medium text-sm">
                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="text-sm">{property.address}</span>
                  </div>
                  <div className="text-2xl font-bold mb-4 text-gray-900">
                    {formatPrice(property.price)}
                    <span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <span className="block text-sm text-gray-500">Beds</span>
                      <span className="font-medium text-gray-900">{property.bedrooms}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <span className="block text-sm text-gray-500">Baths</span>
                      <span className="font-medium text-gray-900">{property.bathrooms}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <span className="block text-sm text-gray-500">Area</span>
                      <span className="font-medium text-gray-900">{property.area} ft²</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full capitalize"
                      >
                        {amenity.split("-").join(" ")}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  <button
                    className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    onClick={() => handleViewDetails()}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <X className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search filters to find more properties.</p>
            <button
              className="px-5 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredProperties.length > propertiesPerPage && (
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg ${
                    currentPage === page
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TenantProperties

