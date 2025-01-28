import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropertyRegistrationForm from "../fullpages/Owner_registrationForm";

interface PropertyCardProps {
  propertyId: string;
}

const PropertyCardSkeleton = () => (
  <div className="w-full max-w-[380px] border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
    {/* Image skeleton */}
    <div className="w-full h-[230px] bg-gray-200 animate-pulse" />
    
    {/* Content skeleton */}
    <div className="p-4 space-y-3">
      {/* Title skeleton */}
      <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
      {/* Address skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
    </div>
    
    {/* Footer skeleton */}
    <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-gray-50">
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
      </div>
      {/* Button skeleton */}
      <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
    </div>
  </div>
);

const PropertyCard: React.FC<PropertyCardProps> = ({ propertyId }) => {
  const navigate = useNavigate();
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [propertyData, setPropertyData] = useState<{
    image: string;
    title: string;
    locality: string;
    area: string;
    rent: string;
  } | null>(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const propertiesBaseUrl = "https://api.rentamigo.in/api/properties";
        const photosBaseUrl = "https://api.rentamigo.in/api/photos";

        // Fetch locality and area
        const locationResponse = await axios.get(`${propertiesBaseUrl}/${propertyId}/locations`);
        const locationData = locationResponse.data[0]; // Assuming the first location is relevant

        let rent = "25000"; // Default rent if no commercials are found

        try {
          // Fetch monthly rent
          const commercialsResponse = await axios.get(`${propertiesBaseUrl}/${propertyId}/commercials`);
          const commercialsData = commercialsResponse.data[0]; // Assuming the first commercial is relevant
          if (commercialsData && commercialsData.monthlyRent) {
            rent = commercialsData.monthlyRent;
          }
        } catch (err) {
          console.warn("No commercials found for property", propertyId);
        }

        let coverImage = ""; // Default to an empty string if no cover image is found

        try {
          // Fetch cover image
          const photosResponse = await axios.get(`${photosBaseUrl}/${propertyId}/photos`);
          const photosData = photosResponse.data.photos;
          coverImage = photosData.coverImage || ""; // Use coverImage if available
        } catch (err) {
          console.warn("No photos found for property", propertyId);
        }

        // Set property data
        setPropertyData({
          image: coverImage || locationData.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80", // Fallback to default image
          title: locationData.propertyName || "Property Title",
          locality: locationData.locality || "Locality not available",
          area: locationData.area || "Area not available",
          rent, // Use fetched or default rent
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching property data for ID", propertyId, ":", error.message);
        } else {
          console.error("Unknown error fetching property data for ID", propertyId);
        }
        
        // Set fallback data in case of error
        setPropertyData({
          image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
          title: "Property Title",
          locality: "Locality not available",
          area: "Area not available",
          rent: "25000"
        });
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  const handleClick = () => {
    navigate(`/Fullpage/${propertyId}`);
  };

  const handleEnquiryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEnquiryForm(true);
  };

  if (!propertyData) {
    return <PropertyCardSkeleton />;
  }

  return (
    <>
      <div 
        onClick={handleClick} 
        className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
      >
        <div className="w-full max-w-[380px] border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
          {/* Image Section */}
          <img 
            src={propertyData.image} 
            alt={propertyData.title} 
            className="w-full h-[230px] object-cover"
          />

          {/* Content Section */}
          <div className="p-4">
            <h3 className="text-lg font-bold mb-1">{propertyData.title}</h3>
            <p className="text-sm text-gray-600">
              {propertyData.locality}, {propertyData.area}
            </p>
          </div>

          {/* Footer Section */}
          <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-gray-50">
            <div>
              <p className="text-sm text-gray-600">Rent Starting From</p>
              <p className="text-base font-bold text-gray-800">₹{propertyData.rent}/month</p>
            </div>
            <button
              className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200"
              onClick={handleEnquiryClick}
            >
              Enquiry
            </button>
          </div>
        </div>
      </div>

      {showEnquiryForm && (
        <PropertyRegistrationForm
          propertyTitle={propertyData.title}
          onClose={() => setShowEnquiryForm(false)}
        />
      )}
    </>
  );
};

export default PropertyCard;