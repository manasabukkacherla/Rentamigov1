"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Heart, Share, MapPin, Bed, Bath, Square, Check, Star, ArrowLeft } from "lucide-react"
import Headerr from "./landingpages/headerr"
import Footer from "./landingpages/Footer"

// Mock property data - in a real app, you would fetch this from an API
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
    description:
      "This beautiful modern apartment is located in the heart of downtown. It features an open floor plan, stainless steel appliances, and a private balcony with city views. The building offers a fitness center, rooftop terrace, and 24-hour security.",
    amenities: [
      "parking",
      "gym",
      "pool",
      "furnished",
      "air conditioning",
      "heating",
      "washer/dryer",
      "dishwasher",
      "pet-friendly",
      "high-speed internet",
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah.johnson@realestate.com",
      photo: "/placeholder.svg?height=100&width=100",
    },
    yearBuilt: 2018,
    availableFrom: "2023-12-01",
    leaseTerms: "12 months minimum",
    petsAllowed: true,
    furnished: true,
    parkingIncluded: true,
    nearbyPlaces: [
      { name: "Central Park", distance: "0.3 miles", type: "park" },
      { name: "Downtown Mall", distance: "0.5 miles", type: "shopping" },
      { name: "City Hospital", distance: "1.2 miles", type: "hospital" },
      { name: "Metro Station", distance: "0.2 miles", type: "transportation" },
    ],
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
    description:
      "Beautiful family home in a quiet neighborhood with excellent schools. Features a large backyard, updated kitchen with granite countertops, and a two-car garage. The master bedroom includes an en-suite bathroom and walk-in closet.",
    amenities: [
      "parking",
      "garden",
      "pet-friendly",
      "central air",
      "fireplace",
      "basement",
      "garage",
      "dishwasher",
      "washer/dryer",
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    agent: {
      name: "Michael Brown",
      phone: "(555) 987-6543",
      email: "michael.brown@realestate.com",
      photo: "/placeholder.svg?height=100&width=100",
    },
    yearBuilt: 2005,
    availableFrom: "2023-11-15",
    leaseTerms: "12-24 months",
    petsAllowed: true,
    furnished: false,
    parkingIncluded: true,
    nearbyPlaces: [
      { name: "Westside Elementary", distance: "0.4 miles", type: "school" },
      { name: "Community Park", distance: "0.7 miles", type: "park" },
      { name: "Grocery Store", distance: "1.0 miles", type: "shopping" },
    ],
  },
  // Add more properties as needed
]

const PropertyDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the property data from an API
    // For this example, we'll use the mock data
    const propertyId = Number.parseInt(id || "0")
    const foundProperty = mockProperties.find((p) => p.id === propertyId)

    if (foundProperty) {
      setProperty(foundProperty)
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate("/tenantProperties")}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Back to Properties
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Headerr />
      <div className="pt-20">
        {/* Back button */}
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/tenantProperties")}
            className="flex items-center text-gray-600 hover:text-black transition"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Properties
          </button>
        </div>

        {/* Property Images */}
        <div className="container mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img
                  src={property.images[activeImage] || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
                    <Share className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.images.slice(0, 4).map((image: string, index: number) => (
                <div
                  key={index}
                  className={`h-[190px] rounded-lg overflow-hidden cursor-pointer ${activeImage === index ? "ring-2 ring-black" : ""}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${property.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="container mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.address}</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-black">
                    ${property.price}
                    <span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6 border-b pb-6">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-gray-500" />
                    <span>
                      <strong>{property.bedrooms}</strong> {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-gray-500" />
                    <span>
                      <strong>{property.bathrooms}</strong> {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2 text-gray-500" />
                    <span>
                      <strong>{property.area}</strong> sq ft
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Property Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <span className="font-medium w-32">Property Type:</span>
                      <span className="capitalize">{property.type}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-32">Year Built:</span>
                      <span>{property.yearBuilt}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-32">Available From:</span>
                      <span>{property.availableFrom}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-32">Lease Terms:</span>
                      <span>{property.leaseTerms}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-32">Pets Allowed:</span>
                      <span>{property.petsAllowed ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-32">Furnished:</span>
                      <span>{property.furnished ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-32">Parking:</span>
                      <span>{property.parkingIncluded ? "Included" : "Not included"}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span className="capitalize">{amenity.split("-").join(" ")}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Nearby Places</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.nearbyPlaces.map((place: any, index: number) => (
                      <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
                        <div className="mr-3 p-2 bg-gray-200 rounded-full">
                          {place.type === "park" && <span className="text-green-600">🌳</span>}
                          {place.type === "school" && <span className="text-blue-600">🏫</span>}
                          {place.type === "shopping" && <span className="text-purple-600">🛒</span>}
                          {place.type === "hospital" && <span className="text-red-600">🏥</span>}
                          {place.type === "transportation" && <span className="text-yellow-600">🚇</span>}
                        </div>
                        <div>
                          <div className="font-medium">{place.name}</div>
                          <div className="text-sm text-gray-500">{place.distance}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-24">
                <div className="flex items-center mb-4">
                  <img
                    src={property.agent.photo || "/placeholder.svg"}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{property.agent.name}</h3>
                    <div className="flex items-center text-yellow-400 mb-1">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-gray-600 text-sm ml-1">5.0</span>
                    </div>
                    <p className="text-sm text-gray-500">Property Agent</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-gray-600 mr-2">📱</span>
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">✉️</span>
                    <span>{property.agent.email}</span>
                  </div>
                </div>

                {!showContactForm ? (
                  <button
                    className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition mb-4"
                    onClick={() => setShowContactForm(true)}
                  >
                    Contact Agent
                  </button>
                ) : (
                  <form className="mb-4">
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Your Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Message</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        rows={4}
                        placeholder="I'm interested in this property..."
                        defaultValue={`Hi ${property.agent.name}, I'm interested in ${property.title} at ${property.address}. Please contact me with more information.`}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
                    >
                      Send Message
                    </button>
                  </form>
                )}

                <div className="flex justify-between">
                  <button className="flex-1 mr-2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center justify-center">
                    <Heart className="h-5 w-5 mr-1" />
                    Save
                  </button>
                  <button className="flex-1 ml-2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center justify-center">
                    <Share className="h-5 w-5 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PropertyDetailPage

