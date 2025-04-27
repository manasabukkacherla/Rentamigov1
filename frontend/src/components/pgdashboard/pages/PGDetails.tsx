import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Users, IndianRupee, Wifi, Car, Dumbbell, Bed, Bath, DoorClosed, UtensilsCrossed, Tv, Fan, Snowflake, Sofa, Laptop, Lock, Zap, Clock, Calculator as Elevator, Coffee, Utensils, Stars as Stairs, Warehouse, Shirt, Droplets, Flame, Refrigerator, BookOpen, Cctv, Fingerprint, Phone, Loader2 } from 'lucide-react';

const pgData = {
  '1': {
    id: '1',
    name: 'Sunshine PG',
    location: 'Koramangala',
    area: 'Koramangala',
    mainImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    address: '123, 5th Block, Koramangala, Bangalore - 560034',
    description: 'Premium PG accommodation with modern amenities and comfortable living spaces. Located in the heart of Koramangala with easy access to tech parks and shopping areas.',
    facilities: {
      lift: {
        title: 'Modern Lifts',
        description: '2 high-speed elevators with power backup',
        images: [
          'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1590824116506-8e9d5fc9a494?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
      },
      dining: {
        title: 'Dining Hall',
        description: 'Spacious dining area with modern kitchen facilities',
        images: [
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1505826759037-406b40feb4cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
      },
      stairs: {
        title: 'Wide Staircases',
        description: 'Well-lit and spacious staircases with safety railings',
        images: [
          'https://images.unsplash.com/photo-1520536237849-cf56d5799135?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
      },
      warehouse: {
        title: 'Storage Area',
        description: 'Secure storage facilities for extra belongings',
        images: [
          'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
      }
    },
    sharingTypes: [
      {
        type: 'Single Sharing',
        rent: 15000,
        rooms: 10,
        amenities: ['AC', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'TV', '24/7 Power Backup', 'Premium Furniture', 'Hot Water', 'Balcony'],
        images: [
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
      },
      {
        type: 'Double Sharing',
        rent: 10000,
        rooms: 8,
        amenities: ['AC', 'Attached Bathroom', 'Study Table', 'Wardrobe', '24/7 Power Backup', 'Hot Water'],
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
      },
      {
        type: 'Triple Sharing',
        rent: 8000,
        rooms: 6,
        amenities: ['Non-AC', 'Common Bathroom', 'Study Table', 'Wardrobe', '24/7 Power Backup', 'Hot Water'],
        images: [
          'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
      },
      {
        type: 'Four Sharing',
        rent: 6000,
        rooms: 4,
        amenities: ['Non-AC', 'Common Bathroom', 'Study Table', 'Wardrobe', 'Basic Furniture', 'Hot Water'],
        images: [
          'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
      },
      {
        type: 'Five Sharing',
        rent: 5000,
        rooms: 3,
        amenities: ['Non-AC', 'Common Bathroom', 'Study Table', 'Basic Furniture', 'Hot Water', 'Common TV'],
        images: [
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1596276020587-8044fe049813?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
      }
    ],
    commonAmenities: [
      {
        category: 'Basic Amenities',
        items: [
          { name: 'WiFi', icon: Wifi },
          { name: 'Power Backup', icon: Zap },
          { name: 'Water Purifier', icon: Droplets },
          { name: 'Hot Water', icon: Flame }
        ]
      },
      {
        category: 'Security',
        items: [
          { name: 'CCTV Surveillance', icon: Cctv },
          { name: 'Biometric Access', icon: Fingerprint },
          { name: '24/7 Security', icon: Lock },
          { name: 'Emergency Response', icon: Phone }
        ]
      },
      {
        category: 'Facilities',
        items: [
          { name: 'Modern Kitchen', icon: UtensilsCrossed },
          { name: 'Laundry Service', icon: Shirt },
          { name: 'Study Room', icon: BookOpen },
          { name: 'Refrigerator', icon: Refrigerator }
        ]
      },
      {
        category: 'Recreation',
        items: [
          { name: 'TV Room', icon: Tv },
          { name: 'Gym', icon: Dumbbell },
          { name: 'Common Area', icon: Sofa },
          { name: 'Indoor Games', icon: Users }
        ]
      }
    ]
  }
};

const PGDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSharing, setSelectedSharing] = useState<number | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const pg = pgData[id as keyof typeof pgData];

  if (!pg) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">PG not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-6 sm:px-8 lg:px-10 pt-10">

<div className="flex items-center justify-between flex-wrap gap-4">
  <div>
    <h1 className="text-3xl font-bold text-gray-900">{pg.name}</h1>
    <div className="flex items-center text-gray-600 mt-1">
      <MapPin className="h-5 w-5 mr-1" />
      <span>{pg.location}, {pg.area}</span>
    </div>
  </div>

  {/* Rating Section */}
  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
    <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.39 6.97H21l-5.8 4.22L16.6 21 12 16.97 7.4 21l1.4-7.81L3 8.97h6.61z" />
    </svg>
    <span className="font-semibold text-gray-900 mr-1">4.8</span>
    <span className="text-gray-500">(42 reviews)</span>
  </div>
</div>

      {/* Main Image and Basic Info */}
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <img
          src={pg.mainImage}
          alt={pg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
          <h1 className="text-4xl font-semibold text-white">{pg.name}</h1>
          <div className="flex items-center mt-2 text-white/90">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{pg.address}</span>
          </div>
          <p className="mt-2 text-white/80 max-w-3xl">{pg.description}</p>
        </div>
      </div>

      {/* Common Amenities */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Common Amenities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y md:divide-y-0">
          {pg.commonAmenities.map((category, index) => (
            <div key={index} className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{category.category}</h3>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center">
                    <item.icon className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Facilities</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(pg.facilities).map(([key, facility]) => (
            <div
              key={key}
              className={`rounded-lg border transition-all cursor-pointer ${
                selectedFacility === key
                  ? 'border-indigo-600 ring-2 ring-indigo-600'
                  : 'border-gray-200 hover:border-indigo-600'
              }`}
              onClick={() => setSelectedFacility(selectedFacility === key ? null : key)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={facility.images[0]}
                  alt={facility.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{facility.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Facility Details */}
      {selectedFacility && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {pg.facilities[selectedFacility as keyof typeof pg.facilities].title} Details
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {pg.facilities[selectedFacility as keyof typeof pg.facilities].images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Facility ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sharing Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pg.sharingTypes.map((sharing, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-lg border transition-all cursor-pointer ${
              selectedSharing === index 
                ? 'border-indigo-600 ring-2 ring-indigo-600' 
                : 'border-gray-200 hover:border-indigo-600'
            }`}
            onClick={() => setSelectedSharing(selectedSharing === index ? null : index)}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">{sharing.type}</h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-gray-900">
                  <IndianRupee className="h-5 w-5 mr-2" />
                  <span className="text-lg font-medium">₹{sharing.rent.toLocaleString()}/month</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Bed className="h-5 w-5 mr-2" />
                  <span>{sharing.rooms} rooms available</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Sharing Details */}
      {selectedSharing !== null && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {pg.sharingTypes[selectedSharing].type} Details
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Room Images */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Room Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {pg.sharingTypes[selectedSharing].images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Room ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Room Amenities */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Room Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {pg.sharingTypes[selectedSharing].amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    {amenity === 'AC' && <Snowflake className="h-5 w-5 text-blue-600 mr-3" />}
                    {amenity === 'TV' && <Tv className="h-5 w-5 text-gray-600 mr-3" />}
                    {amenity === 'Study Table' && <Laptop className="h-5 w-5 text-indigo-600 mr-3" />}
                    {amenity === 'Wardrobe' && <DoorClosed className="h-5 w-5 text-brown-600 mr-3" />}
                    {amenity === 'Hot Water' && <Droplets className="h-5 w-5 text-blue-600 mr-3" />}
                    {amenity === 'Attached Bathroom' && <Bath className="h-5 w-5 text-gray-600 mr-3" />}
                    {amenity === 'Common Bathroom' && <Bath className="h-5 w-5 text-gray-600 mr-3" />}
                    {amenity === '24/7 Power Backup' && <Zap className="h-5 w-5 text-yellow-600 mr-3" />}
                    {amenity === 'Premium Furniture' && <Sofa className="h-5 w-5 text-purple-600 mr-3" />}
                    {amenity === 'Basic Furniture' && <Sofa className="h-5 w-5 text-gray-600 mr-3" />}
                    {amenity === 'Balcony' && <Sofa className="h-5 w-5 text-green-600 mr-3" />}
                    <span className="text-gray-900">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PGDetails;