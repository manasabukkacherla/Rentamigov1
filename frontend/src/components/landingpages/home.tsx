"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import Header from "./headerr"
import Footer from "./Footer"
import BlogList from "../blogs/BlogList"
import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  HomeIcon,
  Users,
  Search,
  Shield,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react"

// Interactive Property Card Component
const PropertyCard = ({ property, index }: { property: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center text-white mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white font-bold">{property.price}</span>
            <Link
              to="/Tenanthome"
              className="bg-white text-black px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
            >
              View
            </Link>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 group-hover:text-black transition-colors">{property.title}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <div className="flex items-center mr-3">
            <HomeIcon className="w-4 h-4 mr-1" />
            <span>{property.type}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{property.beds} beds</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < property.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({property.reviews} reviews)</span>
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
        {property.isNew ? "NEW" : `${property.daysAgo}d ago`}
      </div>
    </motion.div>
  )
}

// Animated Counter Component
const AnimatedCounter = ({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) => {
  const counterRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(counterRef, { once: true })

  return (
    <motion.div
      ref={counterRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-4 text-white">{icon}</div>
      <h3 className="text-4xl font-bold mb-1">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  )
}

// Interactive Feature Card
const FeatureCard = ({
  icon,
  title,
  description,
  delay,
}: { icon: React.ReactNode; title: string; description: string; delay: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-black"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gray-100 opacity-20"></div>
      <div className="relative z-10">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">{icon}</div>
        <h3 className="mb-3 text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

// Testimonial Card with Animation
const TestimonialCard = ({
  quote,
  author,
  role,
  image,
  rating,
  index,
}: { quote: string; author: string; role: string; image: string; rating: number; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-6 rounded-xl shadow-lg relative"
    >
      <div className="absolute top-6 right-6 text-gray-200">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.6667 6.66669H6.66675V20.0001H16.6667V6.66669ZM36.6667 6.66669H26.6667V20.0001H36.6667V6.66669ZM16.6667 26.6667H6.66675V33.3334H16.6667V26.6667ZM36.6667 26.6667H26.6667V33.3334H36.6667V26.6667Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <p className="text-gray-700 italic mb-6 relative z-10">{quote}</p>
      <div className="flex items-center">
        <img src={image || "/placeholder.svg"} alt={author} className="w-12 h-12 rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-bold">{author}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      <div className="mt-4 flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
        ))}
      </div>
    </motion.div>
  )
}

// Interactive Search Form
const InteractiveSearchForm = () => {
  const formRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(formRef, { once: true })

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-2xl relative z-20 max-w-5xl mx-auto"
    >
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-black rounded-full"></div>
      <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-black rounded-full"></div>

      <h3 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Home</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all">
              <option>Any Location</option>
              <option>Downtown</option>
              <option>Suburban Area</option>
              <option>Riverside</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Property Type</label>
          <div className="relative">
            <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all">
              <option>Any Type</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
            <select className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all">
              <option>Any Price</option>
              <option>$500 - $1000</option>
              <option>$1000 - $2000</option>
              <option>$2000+</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition duration-300 flex items-center justify-center">
          <Search className="mr-2 h-5 w-5" />
          Search Properties
        </button>
      </div>

      <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-500">
        <span className="flex items-center">
          <HomeIcon className="mr-1 h-4 w-4" />
          1000+ Properties
        </span>
        <span className="flex items-center">
          <MapPin className="mr-1 h-4 w-4" />
          100+ Locations
        </span>
      </div>
    </motion.div>
  )
}

// Main Homepage Component
const Homepage: React.FC = () => {
  const [allBlogs, setAllBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  // Refs for scroll animations
  const featuredPropertiesRef = useRef<HTMLDivElement>(null)
  const featuredPropertiesInView = useInView(featuredPropertiesRef, { once: true, amount: 0.2 })

  // Property data
  const properties = [
    {
      id: 1,
      title: "Modern Apartment with City View",
      location: "Downtown, City Center",
      price: "$1,200/month",
      type: "Apartment",
      beds: 2,
      rating: 4.8,
      reviews: 24,
      isNew: true,
      daysAgo: 0,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: 2,
      title: "Spacious Family Home with Garden",
      location: "Suburban Area, Green Valley",
      price: "$2,500/month",
      type: "House",
      beds: 4,
      rating: 4.6,
      reviews: 18,
      isNew: false,
      daysAgo: 3,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: 3,
      title: "Luxury Penthouse with Panoramic View",
      location: "Riverside, East End",
      price: "$3,800/month",
      type: "Penthouse",
      beds: 3,
      rating: 5.0,
      reviews: 32,
      isNew: false,
      daysAgo: 5,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: 4,
      title: "Cozy Studio in Arts District",
      location: "Arts District, West Side",
      price: "$950/month",
      type: "Studio",
      beds: 1,
      rating: 4.5,
      reviews: 15,
      isNew: true,
      daysAgo: 0,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: 5,
      title: "Elegant Townhouse with Terrace",
      location: "Historic District, Old Town",
      price: "$2,100/month",
      type: "Townhouse",
      beds: 3,
      rating: 4.7,
      reviews: 21,
      isNew: false,
      daysAgo: 7,
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: 6,
      title: "Modern Villa with Pool",
      location: "Beachside, Coast Road",
      price: "$4,500/month",
      type: "Villa",
      beds: 5,
      rating: 4.9,
      reviews: 28,
      isNew: false,
      daysAgo: 2,
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
  ]

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      quote:
        "Rentamigo made finding my dream apartment so easy! The search tools are intuitive and the customer service is exceptional.",
      author: "Sarah Johnson",
      role: "Tenant",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "As a property owner, I've had great success listing my properties on Rentamigo. The platform is user-friendly and attracts quality tenants.",
      author: "Michael Chen",
      role: "Property Owner",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
    },
    {
      id: 3,
      quote:
        "The virtual tours feature saved me so much time. I was able to narrow down my options before physically visiting properties.",
      author: "Emily Rodriguez",
      role: "Tenant",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
    },
    {
      id: 4,
      quote:
        "I've been using Rentamigo for all my rental needs for the past 3 years. Their customer support is unmatched!",
      author: "David Wilson",
      role: "Tenant",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
    },
  ]

  useEffect(() => {
    // Use mock data with proper image URLs for blogs
    const mockBlogs = [
      {
        _id: "1",
        title: "Finding Your Perfect Rental Property",
        excerpt: "Tips and tricks for finding the ideal rental home that fits your needs and budget.",
        content: "Lorem ipsum dolor sit amet...",
        media: {
          coverImage:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        },
        tags: ["Rental", "Property Search"],
        category: "Rental Tips",
        readTime: 5,
        author: {
          name: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        likes: 24,
        dislikes: 2,
        rating: 4.8,
        views: 2156,
        shares: 12,
        comments: [],
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      },
      {
        _id: "2",
        title: "Understanding Rental Agreements",
        excerpt: "Everything you need to know about rental contracts and what to look for before signing.",
        content: "Lorem ipsum dolor sit amet...",
        media: {
          coverImage:
            "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        },
        tags: ["Legal", "Contracts"],
        category: "Legal Advice",
        readTime: 7,
        author: {
          name: "Jane Smith",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        likes: 32,
        dislikes: 3,
        rating: 4.6,
        views: 3203,
        shares: 18,
        comments: [],
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl:
          "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      },
      {
        _id: "3",
        title: "Decorating Your Rental Home",
        excerpt: "Creative ways to personalize your rental space without breaking lease agreements.",
        content: "Lorem ipsum dolor sit amet...",
        media: {
          coverImage:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80",
        },
        tags: ["Decor", "DIY"],
        category: "Home Improvement",
        readTime: 4,
        author: {
          name: "Alex Johnson",
          avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        },
        likes: 45,
        dislikes: 1,
        rating: 4.9,
        views: 2778,
        shares: 24,
        comments: [],
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80",
      },
    ]

    setAllBlogs(mockBlogs)
    setLoading(false)

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      <Header />

      {/* Hero Section with Parallax Effect */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video/Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Animated Shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              transition: { duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="absolute -top-20 -right-20 w-96 h-96 border border-white opacity-10 rounded-full"
          ></motion.div>
          <motion.div
            animate={{
              rotate: -360,
              transition: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] border border-white opacity-10 rounded-full"
          ></motion.div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Find Your{" "}
              <span className="text-white relative">
                Perfect
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-1 bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.span>
              </span>{" "}
              Home
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
              Discover thousands of properties that match your preferences and budget with our intelligent matching
              system
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/Tenanthome"
                className="bg-white text-black hover:bg-gray-200 font-bold py-4 px-8 rounded-lg transition duration-300 text-lg flex items-center justify-center"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Properties
              </Link>
              <Link
                to="/owner-page"
                className="bg-transparent hover:bg-white hover:text-black border-2 border-white text-white font-bold py-4 px-8 rounded-lg transition duration-300 text-lg"
              >
                List Your Property
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
              transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
            }}
            className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center p-1"
          >
            <motion.div
              animate={{
                y: [0, 6, 0],
                transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 },
              }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            ></motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Interactive Search Section */}
      <section className="py-20 bg-gray-100 relative">
        <div className="container mx-auto px-4">
          <InteractiveSearchForm />
        </div>
      </section>

      {/* Featured Properties Section */}
      <section ref={featuredPropertiesRef} className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gray-100 transform -skew-y-2"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gray-100 rounded-full opacity-50"></div>

        <div className="container mx-auto px-4 pt-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuredPropertiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Properties</h2>
              <p className="text-gray-600 max-w-xl">
                Discover our handpicked selection of premium properties available for rent
              </p>
            </div>
            <Link
              to="/Tenanthome"
              className="mt-4 md:mt-0 inline-flex items-center text-black font-medium hover:text-gray-700 transition-colors group"
            >
              View All Properties
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              transition: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="absolute top-10 left-10 w-40 h-40 bg-white opacity-5 rounded-full blur-xl"
          ></motion.div>
          <motion.div
            animate={{
              x: [0, -100, 0],
              transition: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-5 rounded-full blur-xl"
          ></motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <AnimatedCounter value="5,000+" label="Properties Listed" icon={<HomeIcon className="h-8 w-8" />} />
            <AnimatedCounter value="10,000+" label="Happy Customers" icon={<Users className="h-8 w-8" />} />
            <AnimatedCounter value="15+" label="Years of Experience" icon={<Clock className="h-8 w-8" />} />
            <AnimatedCounter value="100+" label="Cities Covered" icon={<MapPin className="h-8 w-8" />} />
          </div>
        </div>
      </section>

      {/* Features Section with Interactive Cards */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Rentamigo?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best rental experience with our comprehensive services and dedicated support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Search className="h-6 w-6 text-black" />}
              title="Smart Search"
              description="Find your ideal property with our powerful search tools and filters that match your exact requirements."
              delay={0.1}
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-black" />}
              title="Secure Transactions"
              description="Our platform ensures safe and transparent rental transactions with verified listings and secure payment options."
              delay={0.2}
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6 text-black" />}
              title="24/7 Support"
              description="Our dedicated team is always available to assist you with any issues or questions you might have."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section with Carousel */}
      <section className="py-20 bg-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-20 bg-white transform skew-y-2"></div>

        <div className="container mx-auto px-4 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied customers about their experience with Rentamigo.
            </p>
          </motion.div>

          <div className="relative">
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonialIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <TestimonialCard
                    quote={testimonials[activeTestimonialIndex].quote}
                    author={testimonials[activeTestimonialIndex].author}
                    role={testimonials[activeTestimonialIndex].role}
                    image={testimonials[activeTestimonialIndex].image}
                    rating={testimonials[activeTestimonialIndex].rating}
                    index={activeTestimonialIndex}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonialIndex ? "bg-black w-8" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>

            <button
              onClick={() =>
                setActiveTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
              }
              className="absolute top-1/2 -left-4 md:left-0 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-black" />
            </button>

            <button
              onClick={() => setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
              className="absolute top-1/2 -right-4 md:right-0 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-black" />
            </button>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section with Enhanced Design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-black mb-2">Latest Insights</h2>
              <p className="text-gray-600">Stay updated with the latest trends and tips in real estate</p>
            </div>
            <Link
              to="/Blogs"
              className="mt-4 md:mt-0 inline-flex items-center text-black font-medium hover:text-gray-700 transition-colors group"
            >
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
              <p className="text-gray-500 mt-4">Loading latest articles...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <BlogList blogs={allBlogs} />
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section with Interactive Elements */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              transition: { duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="absolute -top-40 -right-40 w-[500px] h-[500px] border border-white opacity-10 rounded-full"
          ></motion.div>
          <motion.div
            animate={{
              rotate: -360,
              transition: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="absolute -bottom-60 -left-60 w-[600px] h-[600px] border border-white opacity-10 rounded-full"
          ></motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
            <p className="text-xl mb-10 text-gray-300">
              Join thousands of satisfied customers who found their perfect property with Rentamigo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/Login"
                  className="bg-white text-black hover:bg-gray-200 font-bold py-4 px-10 rounded-lg transition duration-300 text-lg flex items-center justify-center"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/Contactus"
                  className="bg-transparent hover:bg-white hover:text-black border-2 border-white font-bold py-4 px-10 rounded-lg transition duration-300 text-lg"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Homepage

