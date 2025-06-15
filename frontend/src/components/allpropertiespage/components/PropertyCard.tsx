import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Bath, Square, Calendar, Users, Home } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  matchedFields?: Set<string>;
}

export interface PropertyMedia {
  image: PropertyImage;
}

export interface PropertyImage {
  id: string;
  url: string;
  title?: string;
}

// Format a single image URL into a PropertyImage object
function formatImage(url: string): PropertyImage {
  return {
    id: `main-${Date.now()}`,
    url,
    title: 'Property main image'
  };
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  matchedFields = new Set()
}) => {
  const [propertyMedia, setPropertyMedia] = useState<PropertyMedia | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const highlightIfMatched = (field: string, content: string) => {
    return matchedFields.has(field) ? (
      <span className="bg-gray-100">{content}</span>
    ) : content;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Rented':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Under Maintenance':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'Rent':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Sale':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Lease':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  useEffect(() => {
    if (!property.image) {
      setError('No image provided');
      setIsLoading(false);
      return;
    }

    try {
      const formattedImage = formatImage(property.image);
      setPropertyMedia({ image: formattedImage });
      setIsLoading(false);
    } catch (err) {
      setError('Failed to format image');
      setIsLoading(false);
    }
  }, [property]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!propertyMedia) return null;

  const categoryCodes: Record<string, string> = {
    residential: "RES",
    commercial: "COM",
    other: "OT",
  };

  const listingCodes: Record<string, string> = {
    rent: "RE",
    sell: "SE",
    lease: "LE",
    "pg/co-living": "PG",
  };

// Normalize Property Type Mapping
const subCategoryCodes: Record<string, string> = {
  shops: "SH",
  "retail-store": "RS",
  showrooms: "SR",
  "office-space": "OS",
  warehouses: "WH",
  sheds: "SD",
  "covered-space": "CS",
  plots: "PL",
  agriculture: "AG",
  others: "OT",
  apartment: "AP",
  "independent-house": "IH",
  "builder-floor": "BF",
  "shared-space": "SS",
};
if (!property.propertyId) {
  return null;
}

const categoryCode = property.propertyId.slice(3, 6);
const listingCode = property.propertyId.slice(6, 8);
const typeCode = property.propertyId.slice(8, 10);
const category = Object.entries(categoryCodes).find(([_, code]) => code === categoryCode)?.[0] || '';
const listing = Object.entries(listingCodes).find(([_, code]) => code === listingCode)?.[0] || '';
const type = Object.entries(subCategoryCodes).find(([_, code]) => code === typeCode)?.[0] || '';

return (
  <div className="bg-white rounded border transition-all hover:shadow-lg border-gray-200 h-full flex flex-col">
    <div className="relative h-60">
      <img 
        src={propertyMedia.image.url} 
        alt={property.title} 
        className="w-full h-full object-cover rounded-t"
        // onError={(e) => {
        //   const img = e.target as HTMLImageElement;
        //   // No fallback needed since we're using the property's image directly
        //   console.error('Image failed to load:', e);
        // }}
      />
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <span className={`px-2 py-1 rounded text-sm font-medium ${
          property.listingType === 'RentAmigo' ? 'bg-black text-white' : 'bg-white text-black'
        }`}>
          {property.listingType}
        </span>
        <span className={`px-2 py-1 rounded text-sm font-medium border ${getStatusColor(property.status)}`}>
          <Home size={14} className="inline-block mr-1" />
          {property.status}
        </span>
        <span className={`px-2 py-1 rounded text-sm font-medium border ${getIntentColor(property.intent)}`}>
          For {listing}
        </span>
      </div>
    </div>
    <div className="p-3 flex-1 flex flex-col">
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
        {highlightIfMatched('propertyType', property.title)}
      </h3>
      <div className="flex items-center text-gray-600 mb-2">
        <MapPin size={16} className="mr-1 flex-shrink-0" />
        <span className="text-base truncate">
          {highlightIfMatched('location', property.location)}
        </span>
      </div>
        {/* <div className="grid grid-cols-2 gap-2 mb-3">
          {property.type === 'PG' && property.sharing ? (
            <div className="flex items-center text-gray-600">
              <Users size={16} className="mr-1 flex-shrink-0" />
              <span className="text-sm">{highlightIfMatched('sharing', property.sharing)}</span>
            </div>
          ) : (
            // <div className="flex items-center text-gray-600">
            //   <Building2 size={16} className="mr-1 flex-shrink-0" />
            //   <span className="text-sm">{highlightIfMatched('Type', property.Type)}</span>
            // </div>
          )} */}
          {/* <div className="flex items-center text-gray-600">
            <Bath size={16} className="mr-1 flex-shrink-0" />
            <span className="text-sm">{highlightIfMatched('bathrooms', `${property.bathrooms} Baths`)}</span>
          </div> */}
          <div className="flex items-center text-gray-600">
            <Square size={16} className="mr-1 flex-shrink-0" />
            <span className="text-sm">{highlightIfMatched('area', `${property.area} sq.ft`)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className={`px-2 py-0.5 rounded text-sm ${
              matchedFields.has('furnishing') ? 'bg-gray-100' : 'bg-gray-50'
            }`}>
              {property.furnishing}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-3 mt-auto">
          <span className={`text-xl font-bold ${
            matchedFields.has('price') ? 'text-black' : ''
          }`}>
            ₹{property.price.toLocaleString()}
          </span>
          <div className="flex items-center text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span className="text-sm">{property.postedDate}</span>
          </div>
        </div>
      </div>
    // </div>
  );
};