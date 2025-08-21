import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Property {
  id: string;
  propertyId: string;
  title: string;
  location: string;
  propertyName: string;
  type: string;
  listingType: string;
  price: number;
  area: number;
  image: string;
  postedDate: string;
  status: string;
  intent: string;
  furnishing: string;
  createdBy: string;
}

interface FormattedProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  intent: string;
}

const PropertySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [properties, setProperties] = useState<FormattedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties from API
useEffect(() => {
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/allproperties/all');

      const rentApartments = response.data?.residentialRent?.apartment || [];
      const saleApartments = response.data?.residentialSale?.apartment || [];

      // Combine both and limit to 6
      const combined = [...rentApartments, ...saleApartments].slice(0, 6);

      const formattedProperties: FormattedProperty[] = combined.map((property: Property) => ({
        id: property.id,
        title: property.title || property.propertyName || "Untitled",
        location: property.location || "Unknown",
        price:
          property.intent === 'Rent'
            ? `₹${property.price.toLocaleString()}/month`
            : `₹${property.price.toLocaleString()}`,
        image: property.image.startsWith('http')
          ? property.image
          : `data:image/jpeg;base64,${property.image}`,
        intent: property.intent || "Rent",
      }));

      setProperties(formattedProperties);
      setError(null);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties');
      // Optional: set fallback data here
    } finally {
      setLoading(false);
    }
  };

  fetchProperties();
}, []);

  // Auto-advance slider
  useEffect(() => {
    if (properties.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [properties.length]);

  const nextSlide = () => {
    if (properties.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
    }
  };

  const prevSlide = () => {
    if (properties.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + properties.length) % properties.length
      );
    }
  };

  if (loading) {
    return (
      <div className="relative h-[600px] overflow-hidden rounded-xl bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
          <p className="text-gray-600 text-lg">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error || properties.length === 0) {
    return (
      <div className="relative h-[600px] overflow-hidden rounded-xl bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <p className="text-gray-600 text-lg mb-2">No properties available</p>
          <p className="text-gray-500 text-sm">Please check back later</p>
        </div>
      </div>
    );
  }

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
              src={property.image}
              alt={property.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";
              }}
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
                <div>
                  <span className="text-2xl font-bold">{property.price}</span>
                  <span className="ml-2 bg-white/20 px-2 py-1 rounded-lg text-sm">
                    {property.intent}
                  </span>
                </div>
                <Link
                  to="/allproperties"
                  className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition duration-300 font-semibold"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {properties.length > 1 && (
        <>
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
        </>
      )}

      {/* Dots Indicator */}
      {properties.length > 1 && (
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
      )}
    </div>
  );
};

export default PropertySlider;