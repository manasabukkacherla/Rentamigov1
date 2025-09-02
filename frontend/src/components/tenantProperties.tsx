"use client"

import { useState, useEffect, useRef } from "react"
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
  Clock,
  Calendar,
  User,
  BookOpen,
  ChevronLeft,
  Share2,
  MessageSquare,
  ThumbsUp,
  Eye,
  IndianRupee,
} from "lucide-react"
import Headerr from "./landingpages/headerr"
import { useNavigate } from "react-router-dom"
import { mockBlogs } from "./blogs/data/mockData"

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
    price: 12000,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    amenities: ["parking", "gym", "pool", "furnished"],
    imageUrl: "https://luxuryproperties.in/wp-content/uploads/2019/07/Prestige-Golfshire-Villa-1.jpg.svg?height=200&width=300",
    rating: 4.8,
    featured: true,
    new: false,
    location: "Bangalore, Karnataka",
    furnished: "fully",
    availability: "immediate",
    tenantPreference: "family",
  },
  {
    id: 2,
    title: "Spacious Family House",
    address: "456 Oak Ave, Westside",
    price: 21000,
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    amenities: ["parking", "garden", "pet-friendly"],
    imageUrl: "https://th.bing.com/th/id/OIP.vkh96gUiS6bRIwcgd-4fNwHaEa?w=316&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7.svg?height=200&width=300",
    rating: 4.5,
    featured: false,
    new: true,
    location: "Mumbai, Maharashtra",
    furnished: "semi",
    availability: "15-days",
    tenantPreference: "family",
  },
  {
    id: 3,
    title: "Luxury Condo with View",
    address: "789 Tower Rd, Eastside",
    price: 18000,
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    amenities: ["parking", "gym", "security", "furnished"],
    imageUrl:  "https://luxuryproperties.in/wp-content/uploads/2019/07/Prestige-Golfshire-Villa-1.jpg?height=200&width=300",
    rating: 4.9,
    featured: true,
    new: false,
    location: "Delhi, NCR",
    furnished: "fully",
    availability: "immediate",
    tenantPreference: "any",
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    address: "101 College Blvd, University District",
    price: 8500,
    type: "apartment",
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    amenities: ["furnished", "utilities-included"],
    imageUrl: "https://th.bing.com/th/id/OIP.1I2zYo5S_GDAeNuxp0qX7gHaFj?rs=1&pid=ImgDetMain.svg?height=200&width=300",
    rating: 4.2,
    featured: false,
    new: true,
    location: "Hyderabad, Telangana",
    furnished: "fully",
    availability: "immediate",
    tenantPreference: "bachelor",
  },
  {
    id: 5,
    title: "Suburban Townhouse",
    address: "222 Maple Dr, Northside",
    price: 16500,
    type: "townhouse",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1300,
    amenities: ["parking", "garden", "pet-friendly"],
    imageUrl: "https://th.bing.com/th/id/OIP.O9nIGE4tMlRXgNs7GmFFLgHaE8?w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2.svg?height=200&width=300",
    rating: 4.7,
    featured: false,
    new: false,
    location: "Chennai, Tamil Nadu",
    furnished: "semi",
    availability: "30-days",
    tenantPreference: "family",
  },
  {
    id: 6,
    title: "Renovated Historic Apartment",
    address: "333 Heritage Ln, Old Town",
    price: 14000,
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 750,
    amenities: ["furnished", "utilities-included"],
    imageUrl: "https://th.bing.com/th/id/OIP.0iDclZaB1rPeNjmC-hpg7wHaEj?rs=1&pid=ImgDetMain.svg?height=200&width=300",
    rating: 4.4,
    featured: false,
    new: false,
    location: "Pune, Maharashtra",
    furnished: "fully",
    availability: "15-days",
    tenantPreference: "any",
  },
  {
    id: 7,
    title: "Modern Loft Apartment",
    address: "444 Industrial Way, Arts District",
    price: 16000,
    type: "loft",
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    amenities: ["parking", "gym", "furnished"],
    imageUrl: "https://luxuryproperties.in/wp-content/uploads/2019/07/Prestige-Golfshire-Villa-1.jpg.svg?height=200&width=300",
    rating: 4.6,
    featured: false,
    new: true,
    location: "Kolkata, West Bengal",
    furnished: "fully",
    availability: "immediate",
    tenantPreference: "bachelor",
  },
  {
    id: 8,
    title: "Waterfront Condo",
    address: "555 Harbor Dr, Marina",
    price: 22000,
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    amenities: ["parking", "gym", "pool", "security"],
    imageUrl: "https://th.bing.com/th/id/OIP.vkh96gUiS6bRIwcgd-4fNwHaEa?w=316&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7.svg?height=200&width=300",
    rating: 4.9,
    featured: true,
    new: false,
    location: "Goa",
    furnished: "fully",
    availability: "immediate",
    tenantPreference: "any",
  },
  {
    id: 9,
    title: "Garden Apartment",
    address: "666 Green St, Parkside",
    price: 13000,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 800,
    amenities: ["garden", "pet-friendly"],
    imageUrl:  "https://luxuryproperties.in/wp-content/uploads/2019/07/Prestige-Golfshire-Villa-1.jpg?height=200&width=300",
    rating: 4.3,
    featured: false,
    new: false,
    location: "Ahmedabad, Gujarat",
    furnished: "unfurnished",
    availability: "30-days",
    tenantPreference: "family",
  },
  {
    id: 10,
    title: "Luxury Penthouse",
    address: "777 Skyline Ave, Downtown",
    price: 35000,
    type: "penthouse",
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    amenities: ["parking", "gym", "pool", "security", "furnished"],
    imageUrl: "https://th.bing.com/th/id/OIP.1I2zYo5S_GDAeNuxp0qX7gHaFj?rs=1&pid=ImgDetMain.svg?height=200&width=300",
    rating: 5.0,
    featured: true,
    new: false,
    location: "Bangalore, Karnataka",
    furnished: "fully",
    availability: "immediate",
    tenantPreference: "any",
  },
  {
    id: 11,
    title: "Student Apartment",
    address: "888 Campus Way, University District",
    price: 9000,
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    amenities: ["furnished", "utilities-included"],
    imageUrl: "https://th.bing.com/th/id/OIP.O9nIGE4tMlRXgNs7GmFFLgHaE8?w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2.svg?height=200&width=300",
    rating: 4.1,
    featured: false,
    new: true,
    location: "Pune, Maharashtra",
    furnished: "fully",
    availability: "immediate",
    tenantPreference: "bachelor",
  },
  {
    id: 12,
    title: "Family-Friendly House",
    address: "999 Family Rd, Suburbs",
    price: 20000,
    type: "house",
    bedrooms: 4,
    bathrooms: 2,
    area: 1800,
    amenities: ["parking", "garden", "pet-friendly"],
    imageUrl: "https://th.bing.com/th/id/OIP.1I2zYo5S_GDAeNuxp0qX7gHaFj?rs=1&pid=ImgDetMain.svg?height=200&width=300",
    rating: 4.7,
    featured: false,
    new: false,
    location: "Mumbai, Maharashtra",
    furnished: "semi",
    availability: "30-days",
    tenantPreference: "family",
  },
]

// Mock data for blogs


const TenantProperties = () => {
  const navigate = useNavigate()
  const [location, setLocation] = useState("Bangalore, Karnataka")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredProperties, setFilteredProperties] = useState(mockProperties)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOption, setSortOption] = useState<string>("recommended")
  const [savedProperties, setSavedProperties] = useState<number[]>([])
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [locationSearch, setLocationSearch] = useState("")
  const [recentLocations, setRecentLocations] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedFurnishing, setSelectedFurnishing] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [selectedTenantPreference, setSelectedTenantPreference] = useState<string[]>([])
  const [showBlogSection, setShowBlogSection] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<any>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([])

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
  const furnishingOptions = ["fully", "semi", "unfurnished"]
  const availabilityOptions = ["immediate", "15-days", "30-days"]
  const tenantPreferenceOptions = ["family", "bachelor", "any"]

  // Load recent locations from localStorage on component mount
  useEffect(() => {
    const savedLocations = localStorage.getItem("recentLocations")
    if (savedLocations) {
      setRecentLocations(JSON.parse(savedLocations))
    }

    // Load saved properties from localStorage
    const savedProps = localStorage.getItem("savedProperties")
    if (savedProps) {
      setSavedProperties(JSON.parse(savedProps))
    }
  }, [])

  // Save recent locations to localStorage when they change
  useEffect(() => {
    localStorage.setItem("recentLocations", JSON.stringify(recentLocations))
  }, [recentLocations])

  // Save bookmarked properties to localStorage
  useEffect(() => {
    localStorage.setItem("savedProperties", JSON.stringify(savedProperties))
  }, [savedProperties])

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

  // Set related blogs when a blog is selected
 , [selectedBlog]

  // Apply filters to properties
  useEffect(() => {
    let results = mockProperties.filter((property) => {
      // Search query filter
      if (
        searchQuery &&
        !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.amenities.some((amenity) => amenity.toLowerCase().includes(searchQuery.toLowerCase()))
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

      // Location filter
      if (selectedLocations.length > 0 && !selectedLocations.includes(property.location)) {
        return false
      }

      // Furnishing filter
      if (selectedFurnishing.length > 0 && !selectedFurnishing.includes(property.furnished)) {
        return false
      }

      // Availability filter
      if (selectedAvailability.length > 0 && !selectedAvailability.includes(property.availability)) {
        return false
      }

      // Tenant preference filter
      if (selectedTenantPreference.length > 0 && !selectedTenantPreference.includes(property.tenantPreference)) {
        return false
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
  }, [
    searchQuery,
    priceRange,
    selectedTypes,
    selectedAmenities,
    sortOption,
    selectedLocations,
    selectedFurnishing,
    selectedAvailability,
    selectedTenantPreference,
  ])

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

  const toggleLocation = (loc: string) => {
    if (selectedLocations.includes(loc)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== loc))
    } else {
      setSelectedLocations([...selectedLocations, loc])
    }
  }

  const toggleFurnishing = (furnish: string) => {
    if (selectedFurnishing.includes(furnish)) {
      setSelectedFurnishing(selectedFurnishing.filter((f) => f !== furnish))
    } else {
      setSelectedFurnishing([...selectedFurnishing, furnish])
    }
  }

  const toggleAvailability = (avail: string) => {
    if (selectedAvailability.includes(avail)) {
      setSelectedAvailability(selectedAvailability.filter((a) => a !== avail))
    } else {
      setSelectedAvailability([...selectedAvailability, avail])
    }
  }

  const toggleTenantPreference = (pref: string) => {
    if (selectedTenantPreference.includes(pref)) {
      setSelectedTenantPreference(selectedTenantPreference.filter((p) => p !== pref))
    } else {
      setSelectedTenantPreference([...selectedTenantPreference, pref])
    }
  }

  const resetFilters = () => {
    setPriceRange([0, 50000])
    setSelectedTypes([])
    setSelectedAmenities([])
    setSelectedLocations([])
    setSelectedFurnishing([])
    setSelectedAvailability([])
    setSelectedTenantPreference([])
    setSearchQuery("")
    setSortOption("recommended")
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

  const toggleSaveProperty = (id: number) => {
    setSavedProperties((prev) => (prev.includes(id) ? prev.filter((propId) => propId !== id) : [...prev, id]))
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

  // Function to view a blog
  const viewBlog = (blog: any) => {
    setSelectedBlog(blog)
    setShowBlogSection(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Function to go back to property listings
  const backToProperties = () => {
    setShowBlogSection(false)
    setSelectedBlog(null)
  }

  // Function to handle navigation to property details
  const handleViewDetails = () => {
    navigate(`/propertypage`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Headerr />
      <div className="pt-16"></div>

      {showBlogSection ? (
        <div className="container mx-auto px-4 py-8">
          {/* Blog Header */}
          <div className="mb-6">
            <button onClick={backToProperties} className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Properties
            </button>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{selectedBlog.title}</h1>

            <div className="flex flex-wrap items-center text-gray-500 gap-4 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{selectedBlog.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{selectedBlog.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{selectedBlog.readTime} min read</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{selectedBlog.views.toLocaleString()} views</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedBlog.tags.map((tag: string, index: number) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={selectedBlog.imageUrl || "/placeholder.svg"}
              alt={selectedBlog.title}
              className="w-full h-auto rounded-xl object-cover max-h-96"
            />
          </div>

          {/* Blog Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div
                className="prose prose-lg max-w-none bg-white p-6 rounded-xl shadow-sm"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />

              {/* Engagement Section */}
              <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <ThumbsUp className="h-5 w-5" />
                    <span>{selectedBlog.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <MessageSquare className="h-5 w-5" />
                    <span>{selectedBlog.comments}</span>
                  </button>
                </div>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Author Info */}
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-4">About the Author</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedBlog.author}</h4>
                    <p className="text-gray-500 text-sm">Content Writer</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Expert in real estate trends and rental market analysis with over 5 years of experience in the Indian
                  property market.
                </p>
              </div>

              {/* Related Articles */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedBlogs.map((blog) => (
                    <div key={blog.id} className="group cursor-pointer" onClick={() => viewBlog(blog)}>
                      <h4 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors mb-1">
                        {blog.title}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-2">{blog.excerpt}</p>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{blog.readTime} min read</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="mt-6 w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setShowBlogSection(false)
                    setSelectedBlog(null)
                  }}
                >
                  View All Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section with Location */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Home</h1>
                <p className="text-xl text-gray-300 mb-8">Discover the best properties in {location}</p>

                <div className="flex items-center justify-center mb-6">
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 max-w-xs">
                    <MapPin className="h-5 w-5 text-gray-300" />
                    <span className="text-gray-100 truncate">{location}</span>
                    <button
                      className="ml-2 p-1 hover:bg-white/10 rounded-full transition"
                      onClick={() => setShowLocationModal(true)}
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
    className="w-full pl-12 pr-4 py-4 border-0 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
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


                {/* Blog Section Teaser */}
              
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

          

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100 animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Advanced Filters</h2>
                  <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Price Range Filter */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <IndianRupee className="h-4 w-4" />
                      Price Range (Monthly)
                    </h3>
                    <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="h-1 w-full bg-gray-200 rounded-full"></div>
                      </div>
                      <div
                        className="absolute inset-0 flex items-center"
                        style={{
                          left: `${(priceRange[0] / 50000) * 100}%`,
                          right: `${100 - (priceRange[1] / 50000) * 100}%`,
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
                          max="50000"
                          step="1000"
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
                          max="50000"
                          step="1000"
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

                  {/* Location Filter */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {popularLocations.slice(0, 8).map((loc) => (
                        <button
                          key={loc}
                          className={`px-4 py-3 text-sm rounded-lg flex items-center gap-2 transition-all ${
                            selectedLocations.includes(loc)
                              ? "bg-gray-900 text-white shadow-md"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                          onClick={() => toggleLocation(loc)}
                        >
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{loc.split(",")[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Furnishing Filter */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Furnishing
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {furnishingOptions.map((furnish) => (
                        <button
                          key={furnish}
                          className={`px-4 py-3 text-sm rounded-lg flex items-center gap-2 transition-all ${
                            selectedFurnishing.includes(furnish)
                              ? "bg-gray-900 text-white shadow-md"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                          onClick={() => toggleFurnishing(furnish)}
                        >
                          <CheckSquare className="h-4 w-4" />
                          <span className="capitalize">{furnish}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability Filter */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Availability
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {availabilityOptions.map((avail) => (
                        <button
                          key={avail}
                          className={`px-4 py-3 text-sm rounded-lg flex items-center gap-2 transition-all ${
                            selectedAvailability.includes(avail)
                              ? "bg-gray-900 text-white shadow-md"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                          onClick={() => toggleAvailability(avail)}
                        >
                          <CheckSquare className="h-4 w-4" />
                          <span className="capitalize">{avail}</span>
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
                                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                                aria-label={isSaved ? "Remove from saved" : "Save property"}
                              >
                                {isSaved ? (
                                  <BookmarkCheck className="w-5 h-5 text-gray-900" />
                                ) : (
                                  <Bookmark className="w-5 h-5 text-gray-900" />
                                )}
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
                              onClick={() => handleViewDetails()}
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
                                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                                aria-label={isSaved ? "Remove from saved" : "Save property"}
                              >
                                {isSaved ? (
                                  <BookmarkCheck className="w-5 h-5 text-gray-900" />
                                ) : (
                                  <Bookmark className="w-5 h-5 text-gray-900" />
                                )}
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
                                onClick={() => handleViewDetails()}
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
                            currentPage === page
                              ? "bg-gray-900 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
        </>
      )}
    </div>
  )
}

export default TenantProperties
