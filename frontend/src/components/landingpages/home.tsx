"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Header from "./headerr";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import BlogList from "../blogs/BlogList";
import { motion } from "framer-motion";
import axios from "axios";

// Update the LocationModal component to include a close button at the bottom
const LocationModal = ({
  isOpen,
  onClose,
  onSelectLocation,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
}) => {
  const locations = [
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl overflow-hidden mx-2 sm:mx-0">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold">Select Your Location</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Choose your city to find properties in your area
          </p>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-h-64 sm:max-h-80 overflow-y-auto">
            {locations.map((location) => (
              <button
                key={location}
                className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-left hover:border-black w-full text-sm sm:text-base"
                onClick={() => onSelectLocation(location)}
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  {location}
                </div>
              </button>
            ))}
          </div>

          {/* Add a prominent close button at the bottom */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Property Slider Component
const PropertySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const properties = [
    {
      id: 1,
      title: "Modern Apartment in Downtown",
      location: "Central District, City",
      price: "$1,200/month",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: 2,
      title: "Spacious Family Home",
      location: "Suburban Area, City",
      price: "$2,500/month",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: 3,
      title: "Luxury Penthouse with View",
      location: "Riverside, City",
      price: "$3,800/month",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: 4,
      title: "Cozy Studio Apartment",
      location: "Arts District, City",
      price: "$950/month",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [properties.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + properties.length) % properties.length
    );
  };

  return (
    <div className="relative h-[600px] overflow-hidden rounded-xl">
      {/* Slides */}
      <div className="relative h-full w-full">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">{property.title}</h3>
              <div className="flex items-center mb-4">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>{property.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{property.price}</span>
                <Link
                  to="/allproperties"
                  className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-6" : "bg-white bg-opacity-50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

// Stats Counter Component
const StatsCounter = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-4xl font-bold mb-2">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

// Testimonial Component
const Testimonial = ({
  quote,
  author,
  role,
  image,
}: {
  quote: string;
  author: string;
  role: string;
  image: string;
}) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-6">
        <img
          src={image || "/placeholder.svg"}
          alt={author}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-lg">{author}</h4>
          <p className="text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">"{quote}"</p>
      <div className="mt-4 flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
    </div>
  );
};

// Update the Homepage component to show the location modal on page load
const Homepage: React.FC = () => {
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const navigate = useNavigate();

  // Show location modal on page load
  useEffect(() => {
    // Check if location is already selected in session storage
    const savedLocation = sessionStorage.getItem("selectedLocation");
    if (!savedLocation) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsLocationModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setSelectedLocation(savedLocation);
    }
  }, []);

  // Fetch blogs data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/blog/");
        if (response.data.success) {
          setAllBlogs(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsLocationModalOpen(false);
    // Save selected location to session storage
    sessionStorage.setItem("selectedLocation", location);
    // Redirect to properties page with location parameter
    navigate(`/allproperties`);
  };

  // Animation variants for scroll animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Location Selection Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleLocationSelect}
      />

      {/* Hero Section with Property Slider */}
      <section className="pt-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 py-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Find Your <span className="text-gray-300">Perfect</span> Home
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discoverr thousands and lakhs of properties that match your
              preferences and budget
            </p>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300 flex items-center mx-auto"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              Select Your Location
            </button>
          </motion.div>

          <PropertySlider />

          {/* Search Bar */}
          {/* <div className="bg-white p-6 rounded-xl shadow-lg -mt-10 relative z-10 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black">
                  <option>Any Location</option>
                  <option>Downtown</option>
                  <option>Suburban Area</option>
                  <option>Riverside</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black">
                  <option>Any Type</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black">
                  <option>Any Price</option>
                  <option>$500 - $1000</option>
                  <option>$1000 - $2000</option>
                  <option>$2000+</option>
                </select>
              </div>
            </div>
            <button className="w-full mt-4 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition duration-300">
              Search Properties
            </button>
          </div> */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <StatsCounter value="5,000+" label="Properties Listed" />
            <StatsCounter value="10,000+" label="Happy Customers" />
            <StatsCounter value="15+" label="Years of Experience" />
            <StatsCounter value="100+" label="Cities Covered" />
          </motion.div>
        </div>
      </section>

      {/* Features Section with Creative Design */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gray-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gray-100 rounded-full opacity-50"></div>
<div className="container mx-auto px-4 relative z-10">
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
    className="text-center mb-16"
  >
    <h2 className="text-4xl font-bold mb-4">Why Choose Propamigo?</h2>
    <p className="text-gray-600 max-w-2xl mx-auto">
      Your one-stop platform for affordable rentals, property sales, and reliable support — made for everyone.
    </p>
  </motion.div>

  <div className="grid md:grid-cols-3 gap-8">
    {/* Card 1 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-black hover:transform hover:-translate-y-2 transition-all duration-300"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-4 text-center">
        Explore Rentals & Sales in One Place
      </h3>
      <p className="text-gray-600 text-center">
        Discover flats, homes, plots, PGs, commercial spaces, and more — all under one roof.
      </p>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-black hover:transform hover:-translate-y-2 transition-all duration-300"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-4 text-center">
        Verified Listings & Transparent Deals
      </h3>
      <p className="text-gray-600 text-center">
        Every listing is verified, and all transactions are safe, secure, and fully documented.
      </p>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-black hover:transform hover:-translate-y-2 transition-all duration-300"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-4 text-center">
        Help at Every Step, Anytime
      </h3>
      <p className="text-gray-600 text-center">
        From shortlisting to shifting — our team is ready 24/7 to support your rental or purchase journey.
      </p>
    </motion.div>
  </div>
</div>

      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied customers about their experience with
              Propamigo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Testimonial
                quote="Propamigo made finding my dream apartment so easy! The search tools are intuitive and the customer service is exceptional."
                author="Sarah Johnson"
                role="Tenant"
                image="https://randomuser.me/api/portraits/women/12.jpg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Testimonial
                quote="As a property owner, I've had great success listing my properties on Propamigo. The platform is user-friendly and attracts quality tenants."
                author="Michael Chen"
                role="Property Owner"
                image="https://randomuser.me/api/portraits/men/32.jpg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Testimonial
                quote="The virtual tours feature saved me so much time. I was able to narrow down my options before physically visiting properties."
                author="Emily Rodriguez"
                role="Tenant"
                image="https://randomuser.me/api/portraits/women/28.jpg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section with Enhanced Design */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-black">Latest Insights</h2>
              <p className="text-gray-600 mt-2">
                Stay updated with the latest trends and tips in real estate
              </p>
            </div>
            <Link
              to="/Blogs"
              className="text-black hover:text-gray-700 font-medium flex items-center group"
            >
              View All Articles
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
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
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <BlogList blogs={allBlogs} />
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section with Creative Design */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white opacity-20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white opacity-20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-white opacity-10 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl mb-10 text-gray-300">
              Join thousands of satisfied customers who found their perfect
              property with Propamigo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/Login"
                className="bg-white text-black hover:bg-gray-200 font-bold py-4 px-10 rounded-lg transition duration-300 text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/Contactus"
                className="bg-transparent hover:bg-white hover:text-black border-2 border-white font-bold py-4 px-10 rounded-lg transition duration-300 text-lg"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
