"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  MapPin,
  Sliders,
  X,
  Home,
  Building,
  CheckSquare,
  ChevronDown,
  ArrowUpDown,
  Filter,
  Grid3X3,
  List,
  Star,
  ChevronRight,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Bell,
  Check,
} from "lucide-react"
import Headerr from "./landingpages/headerr"
import { IndianRupee } from "lucide-react"

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
    rating: 4.8,
    featured: true,
    new: false,
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
    rating: 4.5,
    featured: false,
    new: true,
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
    rating: 4.9,
    featured: true,
    new: false,
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
    rating: 4.2,
    featured: false,
    new: true,
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
    rating: 4.7,
    featured: false,
    new: false,
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
    rating: 4.4,
    featured: false,
    new: false,
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
    rating: 4.6,
    featured: false,
    new: true,
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
    rating: 4.9,
    featured: true,
    new: false,
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
    rating: 4.3,
    featured: false,
    new: false,
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
    rating: 5.0,
    featured: true,
    new: false,
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
    rating: 4.1,
    featured: false,
    new: true,
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
    rating: 4.7,
    featured: false,
    new: false,
  },
]

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-20 right-4 z-50 animate-slideIn">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          type === "success"
            ? "bg-green-50 text-green-800 border border-green-200"
            : type === "error"
              ? "bg-red-50 text-red-800 border border-red-200"
              : "bg-gray-50 text-gray-800 border border-gray-200"
        }`}
      >
        {type === "success" && <Check className="w-5 h-5 text-green-600" />}
        {type === "error" && <X className="w-5 h-5 text-red-600" />}
        {type === "info" && <Bell className="w-5 h-5 text-blue-600" />}
        <p className="font-medium">{message}</p>
        <button onClick={onClose} className="ml-2 text-gray-500 hover:text-gray-700">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

const TenantProperties = () => {
  const navigate = useNavigate()
  const [location, setLocation] = useState("New York, NY")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredProperties, setFilteredProperties] = useState(mockProperties)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOption, setSortOption] = useState<string>("recommended")
  const [savedProperties, setSavedProperties] = useState<number[]>([])
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [toast, setToast] = useState<{ show: boolean; message: string; type: string }>({
    show: false,
    message: "",
    type: "info",
  })

  const sortRef = useRef<HTMLDivElement>(null)
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

  // Handle clicks outside the sort dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Apply filters to properties
  useEffect(() => {
    let results = mockProperties.filter((property) => {
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

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        results = results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results = results.sort((a, b) => b.price - a.price)
        break
      case "newest":
        results = results.sort((a, b) => (a.new === b.new ? 0 : a.new ? -1 : 1))
        break
      case "rating":
        results = results.sort((a, b) => b.rating - a.rating)
        break
      case "recommended":
      default:
        // Sort featured properties first, then by rating
        results = results.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        })
    }

    setFilteredProperties(results)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, priceRange, selectedTypes, selectedAmenities, sortOption])

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
    setSortOption("recommended")
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`
  }

  const toggleSaveProperty = (id: number) => {
    if (savedProperties.includes(id)) {
      setSavedProperties(savedProperties.filter((propId) => propId !== id))
      setToast({
        show: true,
        message: "Property removed from saved list",
        type: "info",
      })
    } else {
      setSavedProperties([...savedProperties, id])
      setToast({
        show: true,
        message: "Property saved successfully",
        type: "success",
      })
    }
  }

  const handleViewDetails = (propertyId: number) => {
    // Pass the property ID to the property details page
    navigate(`/property/${propertyId}`)

    // Store the selected property in localStorage for retrieval on the details page
    const selectedProperty = mockProperties.find((p) => p.id === propertyId)
    if (selectedProperty) {
      localStorage.setItem("selectedProperty", JSON.stringify(selectedProperty))
    }
  }

  const getSortLabel = () => {
    switch (sortOption) {
      case "price-low":
        return "Price: Low to High"
      case "price-high":
        return "Price: High to Low"
      case "newest":
        return "Newest First"
      case "rating":
        return "Highest Rated"
      case "recommended":
        return "Recommended"
      default:
        return "Sort"
    }
  }

  const closeToast = () => {
    setToast({ ...toast, show: false })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Headerr />
      </div>
      <div className="pt-16"></div>

      {/* Toast notification */}
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      {/* Hero Section with Location */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Home</h1>
            <p className="text-xl text-gray-300 mb-8">Discover the best properties in your area</p>

            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 max-w-xs">
                <MapPin className="h-5 w-5 text-gray-300" />
                <span className="text-gray-100 truncate">{location}</span>
                <button
                  className="ml-2 p-1 hover:bg-white/10 rounded-full transition"
                  onClick={() => {
                    const newLocation = prompt("Enter your location:", location)
                    if (newLocation) setLocation(newLocation)
                  }}
                >
                  <ChevronDown className="h-4 w-4 text-gray-300" />
                </button>
              </div>
            </div>

            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by property name, address, or amenities..."
                className="w-full pl-12 pr-4 py-4 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Sliders className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  Price Range
                </h3>
                <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="h-1 w-full bg-gray-200 rounded-full"></div>
                  </div>
                  <div
                    className="absolute inset-0 flex items-center"
                    style={{
                      left: `${(priceRange[0] / 5000) * 100}%`,
                      right: `${100 - (priceRange[1] / 5000) * 100}%`,
                    }}
                  >
                    <div className="h-1 w-full bg-gray-900 rounded-full"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                      className="w-full accent-gray-900"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
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
              </div>

              {/* Property Type Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Property Type
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      className={`px-4 py-3 text-sm rounded-lg flex items-center gap-2 transition-all ${
                        selectedTypes.includes(type)
                          ? "bg-gray-900 text-white shadow-md"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
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
              <div>
                <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <CheckSquare className="h-4 w-4" />
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {amenitiesOptions.map((amenity) => (
                    <button
                      key={amenity}
                      className={`px-4 py-3 text-sm rounded-lg flex items-center gap-2 transition-all ${
                        selectedAmenities.includes(amenity)
                          ? "bg-gray-900 text-white shadow-md"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
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

            <div className="mt-8 flex justify-end">
              <button
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"} Found
            </h2>
            <p className="text-sm text-gray-500">
              Showing {indexOfFirstProperty + 1}-
              {indexOfLastProperty > filteredProperties.length ? filteredProperties.length : indexOfLastProperty} of{" "}
              {filteredProperties.length}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative" ref={sortRef}>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
                <span>{getSortLabel()}</span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-10 py-1">
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortOption === "recommended" ? "bg-gray-50 font-medium" : ""}`}
                    onClick={() => {
                      setSortOption("recommended")
                      setShowSortDropdown(false)
                    }}
                  >
                    Recommended
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortOption === "price-low" ? "bg-gray-50 font-medium" : ""}`}
                    onClick={() => {
                      setSortOption("price-low")
                      setShowSortDropdown(false)
                    }}
                  >
                    Price: Low to High
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortOption === "price-high" ? "bg-gray-50 font-medium" : ""}`}
                    onClick={() => {
                      setSortOption("price-high")
                      setShowSortDropdown(false)
                    }}
                  >
                    Price: High to Low
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortOption === "newest" ? "bg-gray-50 font-medium" : ""}`}
                    onClick={() => {
                      setSortOption("newest")
                      setShowSortDropdown(false)
                    }}
                  >
                    Newest First
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortOption === "rating" ? "bg-gray-50 font-medium" : ""}`}
                    onClick={() => {
                      setSortOption("rating")
                      setShowSortDropdown(false)
                    }}
                  >
                    Highest Rated
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                className={`p-2 ${viewMode === "grid" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                className={`p-2 ${viewMode === "list" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            <button
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Toggle filters"
            >
              <Filter className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Property Listings */}
        {currentProperties.length > 0 ? (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProperties.map((property) => {
                  const isSaved = savedProperties.includes(property.id)

                  return (
                    <div
                      key={property.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group border border-gray-100"
                    >
                      <div className="relative">
                        <img
                          src={property.imageUrl || "/placeholder.svg"}
                          alt={property.title}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleSaveProperty(property.id)
                            }}
                            className={`p-2 rounded-full shadow-md transition-colors ${
                              isSaved ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"
                            }`}
                            aria-label={isSaved ? "Remove from saved" : "Save property"}
                          >
                            {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                          </button>
                        </div>

                        {property.featured && (
                          <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
                            Featured
                          </div>
                        )}

                        {property.new && (
                          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                            New
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{property.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">{property.address}</span>
                        </div>

                        <div className="flex items-center gap-1 text-2xl font-bold text-gray-900 mb-4">
                          {formatPrice(property.price)}
                          <span className="text-sm font-normal text-gray-500">/month</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="bg-gray-50 p-2 rounded-lg text-center">
                            <p className="text-xs text-gray-500 mb-1">Beds</p>
                            <p className="font-medium text-gray-900">
                              {property.bedrooms === 0 ? "Studio" : property.bedrooms}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-2 rounded-lg text-center">
                            <p className="text-xs text-gray-500 mb-1">Baths</p>
                            <p className="font-medium text-gray-900">{property.bathrooms}</p>
                          </div>

                          <div className="bg-gray-50 p-2 rounded-lg text-center">
                            <p className="text-xs text-gray-500 mb-1">Area</p>
                            <p className="font-medium text-gray-900">{property.area} ft²</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {property.amenities.slice(0, 3).map((amenity) => (
                            <span
                              key={amenity}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize"
                            >
                              {amenity.split("-").join(" ")}
                            </span>
                          ))}
                          {property.amenities.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{property.amenities.length - 3} more
                            </span>
                          )}
                        </div>

                        <button
                          className="w-full py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 group-hover:gap-3"
                          onClick={() => handleViewDetails(property.id)}
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4 transition-all" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-6">
                {currentProperties.map((property) => {
                  const isSaved = savedProperties.includes(property.id)

                  return (
                    <div
                      key={property.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group border border-gray-100 flex flex-col md:flex-row"
                    >
                      <div className="relative md:w-1/3">
                        <img
                          src={property.imageUrl || "/placeholder.svg"}
                          alt={property.title}
                          className="w-full h-56 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleSaveProperty(property.id)
                            }}
                            className={`p-2 rounded-full shadow-md transition-colors ${
                              isSaved ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"
                            }`}
                            aria-label={isSaved ? "Remove from saved" : "Save property"}
                          >
                            {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                          </button>
                        </div>

                        {property.featured && (
                          <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
                            Featured
                          </div>
                        )}

                        {property.new && (
                          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                            New
                          </div>
                        )}
                      </div>

                      <div className="p-5 md:p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{property.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span>{property.address}</span>
                        </div>

                        <div className="flex items-center gap-1 text-2xl font-bold text-gray-900 mb-4">
                          {formatPrice(property.price)}
                          <span className="text-sm font-normal text-gray-500">/month</span>
                        </div>

                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                          <div className="bg-gray-50 p-2 rounded-lg text-center">
                            <p className="text-xs text-gray-500 mb-1">Beds</p>
                            <p className="font-medium text-gray-900">
                              {property.bedrooms === 0 ? "Studio" : property.bedrooms}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-2 rounded-lg text-center">
                            <p className="text-xs text-gray-500 mb-1">Baths</p>
                            <p className="font-medium text-gray-900">{property.bathrooms}</p>
                          </div>

                          <div className="bg-gray-50 p-2 rounded-lg text-center">
                            <p className="text-xs text-gray-500 mb-1">Area</p>
                            <p className="font-medium text-gray-900">{property.area} ft²</p>
                          </div>

                          <div className="bg-gray-50 p-2 rounded-lg text-center">
                            <p className="text-xs text-gray-500 mb-1">Type</p>
                            <p className="font-medium text-gray-900 capitalize">{property.type}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {property.amenities.map((amenity) => (
                            <span
                              key={amenity}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize"
                            >
                              {amenity.split("-").join(" ")}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <span className="capitalize">{property.type}</span> • Available Now
                          </div>
                          <button
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2 group-hover:gap-3"
                            onClick={() => handleViewDetails(property.id)}
                          >
                            <span>View Details</span>
                            <ChevronRight className="w-4 h-4 transition-all" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === page ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <X className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search filters to find more properties.</p>
            <button
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TenantProperties






// "use client"

// import { useState, useEffect } from "react"
// import { Search, MapPin, Sliders, X, Home, Building, CheckSquare } from "lucide-react"
// // import { useAuth } from "../context/AuthContext"
// // import Pagination from "./Pagination"
// import Headerr from "./landingpages/headerr"

// // Mock data for properties
// const mockProperties = [
//   {
//     id: 1,
//     title: "Modern Downtown Apartment",
//     address: "123 Main St, Downtown",
//     price: 1200,
//     type: "apartment",
//     bedrooms: 2,
//     bathrooms: 1,
//     area: 850,
//     amenities: ["parking", "gym", "pool", "furnished"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 2,
//     title: "Spacious Family House",
//     address: "456 Oak Ave, Westside",
//     price: 2100,
//     type: "house",
//     bedrooms: 3,
//     bathrooms: 2,
//     area: 1500,
//     amenities: ["parking", "garden", "pet-friendly"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 3,
//     title: "Luxury Condo with View",
//     address: "789 Tower Rd, Eastside",
//     price: 1800,
//     type: "condo",
//     bedrooms: 2,
//     bathrooms: 2,
//     area: 1100,
//     amenities: ["parking", "gym", "security", "furnished"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 4,
//     title: "Cozy Studio Apartment",
//     address: "101 College Blvd, University District",
//     price: 850,
//     type: "apartment",
//     bedrooms: 0,
//     bathrooms: 1,
//     area: 500,
//     amenities: ["furnished", "utilities-included"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 5,
//     title: "Suburban Townhouse",
//     address: "222 Maple Dr, Northside",
//     price: 1650,
//     type: "townhouse",
//     bedrooms: 3,
//     bathrooms: 2.5,
//     area: 1300,
//     amenities: ["parking", "garden", "pet-friendly"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 6,
//     title: "Renovated Historic Apartment",
//     address: "333 Heritage Ln, Old Town",
//     price: 1400,
//     type: "apartment",
//     bedrooms: 1,
//     bathrooms: 1,
//     area: 750,
//     amenities: ["furnished", "utilities-included"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 7,
//     title: "Modern Loft Apartment",
//     address: "444 Industrial Way, Arts District",
//     price: 1600,
//     type: "loft",
//     bedrooms: 1,
//     bathrooms: 1,
//     area: 900,
//     amenities: ["parking", "gym", "furnished"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 8,
//     title: "Waterfront Condo",
//     address: "555 Harbor Dr, Marina",
//     price: 2200,
//     type: "condo",
//     bedrooms: 2,
//     bathrooms: 2,
//     area: 1200,
//     amenities: ["parking", "gym", "pool", "security"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 9,
//     title: "Garden Apartment",
//     address: "666 Green St, Parkside",
//     price: 1300,
//     type: "apartment",
//     bedrooms: 2,
//     bathrooms: 1,
//     area: 800,
//     amenities: ["garden", "pet-friendly"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 10,
//     title: "Luxury Penthouse",
//     address: "777 Skyline Ave, Downtown",
//     price: 3500,
//     type: "penthouse",
//     bedrooms: 3,
//     bathrooms: 3,
//     area: 2000,
//     amenities: ["parking", "gym", "pool", "security", "furnished"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 11,
//     title: "Student Apartment",
//     address: "888 Campus Way, University District",
//     price: 900,
//     type: "apartment",
//     bedrooms: 1,
//     bathrooms: 1,
//     area: 600,
//     amenities: ["furnished", "utilities-included"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 12,
//     title: "Family-Friendly House",
//     address: "999 Family Rd, Suburbs",
//     price: 2000,
//     type: "house",
//     bedrooms: 4,
//     bathrooms: 2,
//     area: 1800,
//     amenities: ["parking", "garden", "pet-friendly"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
// ]

// const TenantProperties = () => {
// //   const { isAuthenticated, user } = useAuth()
//   const [location, setLocation] = useState("New York, NY")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [showFilters, setShowFilters] = useState(false)
//   const [priceRange, setPriceRange] = useState([0, 5000])
//   const [selectedTypes, setSelectedTypes] = useState<string[]>([])
//   const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [filteredProperties, setFilteredProperties] = useState(mockProperties)
//   const propertiesPerPage = 6

//   const propertyTypes = ["apartment", "house", "condo", "townhouse", "loft", "penthouse"]
//   const amenitiesOptions = [
//     "parking",
//     "gym",
//     "pool",
//     "furnished",
//     "pet-friendly",
//     "garden",
//     "security",
//     "utilities-included",
//   ]

//   // Apply filters to properties
//   useEffect(() => {
//     const results = mockProperties.filter((property) => {
//       // Search query filter
//       if (
//         searchQuery &&
//         !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
//         !property.address.toLowerCase().includes(searchQuery.toLowerCase())
//       ) {
//         return false
//       }

//       // Price range filter
//       if (property.price < priceRange[0] || property.price > priceRange[1]) {
//         return false
//       }

//       // Property type filter
//       if (selectedTypes.length > 0 && !selectedTypes.includes(property.type)) {
//         return false
//       }

//       // Amenities filter
//       if (selectedAmenities.length > 0) {
//         for (const amenity of selectedAmenities) {
//           if (!property.amenities.includes(amenity)) {
//             return false
//           }
//         }
//       }

//       return true
//     })

//     setFilteredProperties(results)
//     setCurrentPage(1) // Reset to first page when filters change
//   }, [searchQuery, priceRange, selectedTypes, selectedAmenities])

//   // Get current properties for pagination
//   const indexOfLastProperty = currentPage * propertiesPerPage
//   const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage
//   const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty)
//   const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber)
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   const togglePropertyType = (type: string) => {
//     if (selectedTypes.includes(type)) {
//       setSelectedTypes(selectedTypes.filter((t) => t !== type))
//     } else {
//       setSelectedTypes([...selectedTypes, type])
//     }
//   }

//   const toggleAmenity = (amenity: string) => {
//     if (selectedAmenities.includes(amenity)) {
//       setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
//     } else {
//       setSelectedAmenities([...selectedAmenities, amenity])
//     }
//   }

//   const resetFilters = () => {
//     setPriceRange([0, 5000])
//     setSelectedTypes([])
//     setSelectedAmenities([])
//     setSearchQuery("")
//   }

//   const formatPrice = (price: number) => {
//     return `$${price.toLocaleString()}`
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Headerr />
//     <br></br>
//     <br></br>
//     <br></br>
//       {/* Hero Section with Location */}
//       <div className="bg-black text-white py-10">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">Find Your Perfect Rental</h1>
//               <div className="flex items-center">
//                 <MapPin className="h-5 w-5 mr-2" />
//                 <span>{location}</span>
//                 <button
//                   className="ml-3 px-3 py-1 text-xs bg-white text-black rounded-full hover:bg-gray-200 transition"
//                   onClick={() => {
//                     const newLocation = prompt("Enter your location:", location)
//                     if (newLocation) setLocation(newLocation)
//                   }}
//                 >
//                   Change Location
//                 </button>
//               </div>
//             </div>
//             {/* {isAuthenticated && ( */}
//               {/* <div className="mt-4 md:mt-0 bg-gray-800 p-4 rounded-lg">
//                 <p className="font-medium">Welcome, {user?.username || "Tenant"}</p>
//                 <p className="text-sm text-gray-300">Looking for a new place?</p>
//               </div> */}
//             {/* )} */}
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="container mx-auto px-4 py-6">
//         <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-grow relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by property name or address..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <button
//               className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               <Sliders className="h-5 w-5 mr-2" />
//               Filters
//             </button>
//           </div>

//           {showFilters && (
//             <div className="mt-4 border-t pt-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Price Range Filter */}
//                 <div>
//                   <h3 className="font-medium mb-2">Price Range</h3>
//                   <div className="flex items-center justify-between mb-2">
//                     <span>${priceRange[0]}</span>
//                     <span>${priceRange[1]}</span>
//                   </div>
//                   <input
//                     type="range"
//                     min="0"
//                     max="5000"
//                     step="100"
//                     value={priceRange[0]}
//                     onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
//                     className="w-full"
//                   />
//                   <input
//                     type="range"
//                     min="0"
//                     max="5000"
//                     step="100"
//                     value={priceRange[1]}
//                     onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
//                     className="w-full"
//                   />
//                 </div>

//                 {/* Property Type Filter */}
//                 <div>
//                   <h3 className="font-medium mb-2">Property Type</h3>
//                   <div className="grid grid-cols-2 gap-2">
//                     {propertyTypes.map((type) => (
//                       <button
//                         key={type}
//                         className={`px-3 py-2 text-sm rounded-md flex items-center ${
//                           selectedTypes.includes(type)
//                             ? "bg-black text-white"
//                             : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//                         }`}
//                         onClick={() => togglePropertyType(type)}
//                       >
//                         {type === "apartment" && <Building className="h-4 w-4 mr-1" />}
//                         {type === "house" && <Home className="h-4 w-4 mr-1" />}
//                         {type !== "apartment" && type !== "house" && <CheckSquare className="h-4 w-4 mr-1" />}
//                         {type.charAt(0).toUpperCase() + type.slice(1)}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Amenities Filter */}
//                 <div>
//                   <h3 className="font-medium mb-2">Amenities</h3>
//                   <div className="grid grid-cols-2 gap-2">
//                     {amenitiesOptions.map((amenity) => (
//                       <button
//                         key={amenity}
//                         className={`px-3 py-2 text-sm rounded-md flex items-center ${
//                           selectedAmenities.includes(amenity)
//                             ? "bg-black text-white"
//                             : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//                         }`}
//                         onClick={() => toggleAmenity(amenity)}
//                       >
//                         <CheckSquare className="h-4 w-4 mr-1" />
//                         {amenity
//                           .split("-")
//                           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                           .join(" ")}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4 flex justify-end">
//                 <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800" onClick={resetFilters}>
//                   Reset Filters
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Results Count */}
//         <div className="mb-4 flex justify-between items-center">
//           <h2 className="text-xl font-semibold">
//             {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"} Found
//           </h2>
//           <div className="text-sm text-gray-500">
//             Showing {indexOfFirstProperty + 1}-
//             {indexOfLastProperty > filteredProperties.length ? filteredProperties.length : indexOfLastProperty} of{" "}
//             {filteredProperties.length}
//           </div>
//         </div>

//         {/* Property Listings */}
//         {currentProperties.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentProperties.map((property) => (
//               <div
//                 key={property.id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
//               >
//                 <img
//                   src={property.imageUrl || "/placeholder.svg"}
//                   alt={property.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
//                   <div className="flex items-center text-gray-500 mb-2">
//                     <MapPin className="h-4 w-4 mr-1" />
//                     <span className="text-sm">{property.address}</span>
//                   </div>
//                   <div className="text-2xl font-bold mb-2 text-black">
//                     {formatPrice(property.price)}
//                     <span className="text-sm font-normal text-gray-500">/month</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2 mb-3">
//                     <span className="px-2 py-1 bg-gray-100 text-xs rounded-md">
//                       {property.bedrooms} {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
//                     </span>
//                     <span className="px-2 py-1 bg-gray-100 text-xs rounded-md">
//                       {property.bathrooms} {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
//                     </span>
//                     <span className="px-2 py-1 bg-gray-100 text-xs rounded-md">{property.area} sq ft</span>
//                     <span className="px-2 py-1 bg-gray-100 text-xs rounded-md capitalize">{property.type}</span>
//                   </div>
//                   <div className="flex flex-wrap gap-1 mb-3">
//                     {property.amenities.slice(0, 3).map((amenity) => (
//                       <span key={amenity} className="px-2 py-1 bg-black text-white text-xs rounded-full capitalize">
//                         {amenity.split("-").join(" ")}
//                       </span>
//                     ))}
//                     {property.amenities.length > 3 && (
//                       <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
//                         +{property.amenities.length - 3} more
//                       </span>
//                     )}
//                   </div>
//                   <button className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <X className="h-12 w-12 mx-auto text-gray-400 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">No properties found</h3>
//             <p className="text-gray-500 mb-4">Try adjusting your search filters to find more properties.</p>
//             <button
//               className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
//               onClick={resetFilters}
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}

//         {/* Pagination
//         {filteredProperties.length > 0 && (
//           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//         )} */}
//       </div>
//     </div>
//   )
// }

// export default TenantProperties

