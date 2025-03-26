"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Sliders, X, Home, Building, CheckSquare } from "lucide-react"
// import { useAuth } from "../context/AuthContext"
// import Pagination from "./Pagination"
import Headerr from "./landingpages/headerr"

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
    imageUrl: "/placeholder.svg?height=200&width=300",
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
    imageUrl: "/placeholder.svg?height=200&width=300",
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
    imageUrl: "/placeholder.svg?height=200&width=300",
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
    imageUrl: "/placeholder.svg?height=200&width=300",
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
    imageUrl: "/placeholder.svg?height=200&width=300",
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
    imageUrl: "/placeholder.svg?height=200&width=300",
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
    imageUrl: "/placeholder.svg?height=200&width=300",
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
//   const { isAuthenticated, user } = useAuth()
  const [location, setLocation] = useState("New York, NY")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredProperties, setFilteredProperties] = useState(mockProperties)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Headerr />
    <br></br>
    <br></br>
    <br></br>
      {/* Hero Section with Location */}
      <div className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Find Your Perfect Rental</h1>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{location}</span>
                <button
                  className="ml-3 px-3 py-1 text-xs bg-white text-black rounded-full hover:bg-gray-200 transition"
                  onClick={() => {
                    const newLocation = prompt("Enter your location:", location)
                    if (newLocation) setLocation(newLocation)
                  }}
                >
                  Change Location
                </button>
              </div>
            </div>
            {/* {isAuthenticated && ( */}
              {/* <div className="mt-4 md:mt-0 bg-gray-800 p-4 rounded-lg">
                <p className="font-medium">Welcome, {user?.username || "Tenant"}</p>
                <p className="text-sm text-gray-300">Looking for a new place?</p>
              </div> */}
            {/* )} */}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by property name or address..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Sliders className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>

                {/* Property Type Filter */}
                <div>
                  <h3 className="font-medium mb-2">Property Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        className={`px-3 py-2 text-sm rounded-md flex items-center ${
                          selectedTypes.includes(type)
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                        onClick={() => togglePropertyType(type)}
                      >
                        {type === "apartment" && <Building className="h-4 w-4 mr-1" />}
                        {type === "house" && <Home className="h-4 w-4 mr-1" />}
                        {type !== "apartment" && type !== "house" && <CheckSquare className="h-4 w-4 mr-1" />}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities Filter */}
                <div>
                  <h3 className="font-medium mb-2">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {amenitiesOptions.map((amenity) => (
                      <button
                        key={amenity}
                        className={`px-3 py-2 text-sm rounded-md flex items-center ${
                          selectedAmenities.includes(amenity)
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                        onClick={() => toggleAmenity(amenity)}
                      >
                        <CheckSquare className="h-4 w-4 mr-1" />
                        {amenity
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"} Found
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
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={property.imageUrl || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.address}</span>
                  </div>
                  <div className="text-2xl font-bold mb-2 text-black">
                    {formatPrice(property.price)}
                    <span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-md">
                      {property.bedrooms} {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-md">
                      {property.bathrooms} {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-md">{property.area} sq ft</span>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-md capitalize">{property.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="px-2 py-1 bg-black text-white text-xs rounded-full capitalize">
                        {amenity.split("-").join(" ")}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  <button className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <X className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search filters to find more properties.</p>
            <button
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination
        {filteredProperties.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )} */}
      </div>
    </div>
  )
}

export default TenantProperties

