import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Wifi, Zap, Car, Dumbbell, Tv, Bed, IndianRupee, Lock, Fingerprint, Cctv, Droplets, Snowflake, Sofa, Laptop, DoorClosed, Bath, Flame, WashingMachine, Clock, Beer } from 'lucide-react';
import ContactModal from '../components/ContactModal';

interface Facility {
  url: string;
  title: string;
  description: string;
  images: string[];
}

interface SharingType {
  type: string;
  rent: number;
  rooms: number;
  amenities: string[];
  images: string[];
}

interface PG {
  roomConfiguration: any;
  mediaItems: any;
  pricing: any;
  foodServices: any;
  otherFeaturesAndRestrictions: any;
  commonAreaAmenitiesAndServices: any;
  media: any;
  pgDetails: any;
  propertyId: string;
  name: string;
  location: string;
  area: string;
  mainImage: string;
  address: string;
  description: string;
  facilities: Record<string, Facility>;
  sharingTypes: SharingType[];
  commonAmenities: { 
    category: string; 
    items: { name: string, icon: React.ComponentType<any> }[]; 
  }[];
  coordinates: { 
    latitude: number;
    longitude: number; 
  };
}

const PGDetails: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [selectedSharing, setSelectedSharing] = useState<number | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [pg, setPg] = useState<PG | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch PG details based on the propertyId
  useEffect(() => {
    const fetchPGDetails = async () => {
      try {
        const response = await axios.get(`/api/residential/pgmain/${propertyId}`);
        if (response.data.success) {
          setPg(response.data.data);  // Set the PG data
        } else {
          setError('PG not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch PG data');
        setLoading(false);
      }
    };

    fetchPGDetails();
  }, [propertyId]);

  // Error handling if the data is not found or failed to fetch
  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (!pg) {
    return <div className="text-center py-12 text-gray-500">PG not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-6 sm:px-8 lg:px-10 pt-10">
      {/* Header with Name and Rating */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pg.pgDetails.name}</h1>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{pg.pgDetails.address}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.39 6.97H21l-5.8 4.22L16.6 21 12 16.97 7.4 21l1.4-7.81L3 8.97h6.61z" />
            </svg>
            <span className="font-semibold text-gray-900 mr-1">4.8</span>
            <span className="text-gray-500">(42 reviews)</span>
          </div>
        </div>
      </div>

      {/* Main Image and Description */}
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <img
          src={pg.media.photos && pg.media.photos.length > 0 ? pg.media.photos[0] : "default-image.jpg"}  // If there are no photos, use a fallback image
          alt={pg.pgDetails.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
          <h1 className="text-4xl font-semibold text-white">{pg.pgDetails.name}</h1>
          <div className="flex items-center mt-2 text-white/90">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{pg.pgDetails.address}</span>
          </div>
        
        </div>
      </div>

      {/* Common Amenities */}
{/* Common Amenities */}
<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
  <div className="p-6 border-b border-gray-200">
    <h2 className="text-xl font-semibold text-gray-900">Common Amenities</h2>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y md:divide-y-0">
    {/* Basic Amenities */}
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Amenities</h3>
      <div className="space-y-4">
        {pg.commonAreaAmenitiesAndServices?.map((amenity, index) => (
          <div key={index} className="flex items-center">
            {/* Render icons dynamically based on amenity */}
            <span className="text-gray-700 capitalize">{amenity.replace('-', ' ')}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Other Features */}
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Other Features</h3>
      <div className="space-y-4">
        {pg.otherFeaturesAndRestrictions?.otherFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center">
            {/* Render icons dynamically based on feature */}
            <span className="text-gray-700 capitalize">{feature.replace('-', ' ')}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Restrictions */}
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Restrictions</h3>
      <div className="space-y-4">
        {pg.otherFeaturesAndRestrictions?.restrictions?.map((restriction, index) => (
          <div key={index} className="flex items-center">
            {/* Render icons dynamically based on restriction */}
            <span className="text-gray-700 capitalize">{restriction.replace('-', ' ')}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Accommodation Type */}
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Accommodation Type</h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="text-gray-700">{pg.pgDetails?.accommodationType || 'Not available'}</span>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Food Services */}
{pg.foodServices?.available && (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-6">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">Food Services</h2>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Meals Offered</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Loop through the week and display meals */}
        {Object.entries(pg.foodServices.weekMeals).map(([day, meals]) => (
          <div key={day} className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-xl font-semibold text-gray-900">{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
            <div className="mt-2 space-y-2">
              {Object.entries(meals).map(([mealType, meal]) => (
                <div key={mealType} className="flex items-center">
                  <span className="font-medium text-gray-700 capitalize">{mealType}:</span>
                  <span className="text-gray-600 ml-2">{meal.name || 'Not available'}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
{/* Facilities */}
<div className="bg-white rounded-lg border border-gray-200">
  <div className="p-6 border-b border-gray-200">
    <h2 className="text-xl font-semibold text-gray-900">Facilities</h2>
  </div>
  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {pg.media.mediaItems &&
      ["lifts", "dining", "staircases", "kitchen"].map((roomType) => {
        // Filter media items by roomType
        const roomImages = pg.media.mediaItems.filter(
          (item) => item.roomType === roomType
        );

        return roomImages.length > 0 ? (
          <div
            key={roomType}
            className={`rounded-lg border transition-all cursor-pointer ${
              selectedFacility === roomType
                ? "border-gray-900 ring-2 ring-gray-900"
                : "border-gray-200 hover:border-gray-900"
            }`}
            onClick={() =>
              setSelectedFacility(
                selectedFacility === roomType ? null : roomType
              )
            }
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={roomImages[0].url} // Display the first image for the facility
                alt={roomType}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">
                {roomType.charAt(0).toUpperCase() + roomType.slice(1)} Facility
              </h3>
            </div>
          </div>
        ) : null;
      })}
  </div>
</div>

{/* Selected Facility Details */}
{selectedFacility && (
  <div className="bg-white rounded-lg border border-gray-200">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">
        {selectedFacility.charAt(0).toUpperCase() + selectedFacility.slice(1)}{" "}
        Facility Details
      </h2>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Filter images based on selected room type */}
        {pg.media.mediaItems
          .filter((item) => item.roomType === selectedFacility)
          .map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Facility Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
      </div>
    </div>
  </div>
)}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
  {[
    { type: 'Single Sharing', pricing: pg.pricing.roomSharePricing.singleShare },
    { type: 'Double Sharing', pricing: pg.pricing.roomSharePricing.doubleShare },
    { type: 'Triple Sharing', pricing: pg.pricing.roomSharePricing.tripleShare },
    { type: 'Four Sharing', pricing: pg.pricing.roomSharePricing.fourShare },
    { type: 'Five Sharing', pricing: pg.pricing.roomSharePricing.fiveShare },
    { type: 'Custom Sharing', pricing: null } // Add Custom Sharing here
  ].map((sharing, index) => (
    <div
      key={index}
      className={`bg-white rounded-lg border transition-all cursor-pointer ${
        selectedSharing === index ? 'border-gray-900 ring-2 ring-gray-900' : 'border-gray-200 hover:border-gray-900'
      }`}
      onClick={() => setSelectedSharing(selectedSharing === index ? null : index)}
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">{sharing.type}</h2>
        <div className="mt-4 space-y-3">
          {sharing.pricing ? (
            <>
              <div className="flex items-center text-gray-900">
                <IndianRupee className="h-5 w-5 mr-2" />
                <span className="text-lg font-medium">
                  ₹{sharing.pricing.monthlyRent.toLocaleString()}/month
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Bed className="h-5 w-5 mr-2" />
                <span>{sharing.pricing.roomsAvailable} rooms available</span>
              </div>
            </>
          ) : (
            <div className="text-gray-600">Custom room sharing, no pricing available</div> // Show a custom message for "Custom Sharing"
          )}
        </div>
      </div>
    </div>
  ))}
</div>
{selectedSharing !== null && (
  <div className="bg-white rounded-lg border border-gray-200">
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {pg.roomConfiguration.customShare ? 'Custom Share' : 'Room Configuration'} Details
        </h2>
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Enquire Now
        </button>
      </div>
    </div>

    <div className="p-6 space-y-8">

  {/* Room Videos */}
 <h3 className="text-lg font-medium text-gray-900 mb-4">Room Videos</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {pg.media.mediaItems
    .filter(item =>
      item.type === "video" &&
      (
        (selectedSharing === 0 && item.roomType === 'single') ||
        (selectedSharing === 1 && item.roomType === 'double') ||
        (selectedSharing === 2 && item.roomType === 'triple') ||
        (selectedSharing === 3 && item.roomType === 'four') ||
        (selectedSharing === 4 && item.roomType === 'five') ||
        (selectedSharing === 5 && item.roomType === 'custom')
      )
    )
    .map((video, index) => (
      <video
        key={`${selectedSharing}-${index}`}
        controls
        className="w-full h-64 object-cover rounded-lg"
      >
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ))}
</div>


  {/* Room Images & Amenities */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* Room Images */}
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Room Images</h3>
      <div className="grid grid-cols-2 gap-4">
        {pg.media.mediaItems
          .filter(item =>
            item.type === "photo" &&
            (
              (selectedSharing === 0 && item.roomType === 'single') ||
              (selectedSharing === 1 && item.roomType === 'double') ||
              (selectedSharing === 2 && item.roomType === 'triple') ||
              (selectedSharing === 3 && item.roomType === 'four') ||
              (selectedSharing === 4 && item.roomType === 'five') ||
              (selectedSharing === 5 && item.roomType === 'custom')
            )
          )
          .map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.title || `Room Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          ))}
      </div>
    </div>

    {/* Room Amenities */}
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Room Amenities</h3>
      <div className="grid grid-cols-2 gap-4">
        {selectedSharing === 0 && pg.roomConfiguration.singleRoomAmenities?.map((amenity, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg text-gray-900">{amenity.replace(/-/g, ' ')}</div>
        ))}
        {selectedSharing === 1 && pg.roomConfiguration.doubleShareRoomAmenities?.map((amenity, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg text-gray-900">{amenity.replace(/-/g, ' ')}</div>
        ))}
        {selectedSharing === 2 && pg.roomConfiguration.tripleShareRoomAmenities?.map((amenity, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg text-gray-900">{amenity.replace(/-/g, ' ')}</div>
        ))}
        {selectedSharing === 3 && pg.roomConfiguration.fourShareRoomAmenities?.map((amenity, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg text-gray-900">{amenity.replace(/-/g, ' ')}</div>
        ))}
        {selectedSharing === 4 && pg.roomConfiguration.fiveShareRoomAmenities?.map((amenity, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg text-gray-900">{amenity.replace(/-/g, ' ')}</div>
        ))}
        {selectedSharing === 5 && pg.roomConfiguration.customShareRoomAmenities?.map((amenity, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg text-gray-900">{amenity.replace(/-/g, ' ')}</div>
        ))}
      </div>
    </div>

  </div>
</div>

  </div>
)}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        pgName={pg.name}
      />
    </div>
  );
};

export default PGDetails;
