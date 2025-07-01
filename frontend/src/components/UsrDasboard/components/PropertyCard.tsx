import React from 'react';
import { format } from 'date-fns';
import { MapPin, Ruler, Bed, Calendar, Home, Building2, Hotel, Warehouse } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  matchedFields?: Set<string>;
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (id: string) => void;
  onStatusUpdate?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  matchedFields = new Set(),
}) => {
  // Helper function to safely get property values with defaults
  const getPropertyValue = <T,>(value: T | undefined, defaultValue: T): T => {
    return value !== undefined ? value : defaultValue;
  };

  // Safely get property values with defaults
  const {
    id = '',
    title = property.name || property.propertyName || 'Untitled Property',
    imageUrl = property.image || '',
    price = property.rent || 0,
    location = 'Location not specified',
    area,
    furnishing = 'Furnishing not specified',
    postedDate = new Date().toISOString(),
    status = 'Available',
    type = 'Unknown',
    propertyId = id,
    listingType = 'Standard',
    intent = 'rent',
  } = property;

  // Format values for display
  const displayArea = area ? `${area} sq.ft.` : 'Area not specified';
  
  // Safely parse the date with fallback to current date
  const parseDate = (dateString: string | Date): Date => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? new Date() : date;
    } catch (e) {
      return new Date();
    }
  };
  
  const displayDate = parseDate(postedDate);
  const displayListingType = String(listingType || '').charAt(0).toUpperCase() + String(listingType || '').slice(1);
  const displayIntent = String(intent || '').toLowerCase();

  // Function to highlight matched fields
  const highlightIfMatched = (field: string, content: React.ReactNode) => {
    if (!matchedFields || !matchedFields.has(field)) return content;
    return <span className="bg-gray-100">{content}</span>;
  };

  // Function to determine status color
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rented':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Function to determine intent color
  const getIntentColor = (intent: string) => {
    return intent === 'sale' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-purple-100 text-purple-800 border-purple-200';
  };

  // Function to render property type icon
  const renderPropertyTypeIcon = () => {
    const typeLower = type?.toLowerCase() || '';
    switch (typeLower) {
      case 'apartment':
        return <Building2 className="w-4 h-4 mr-1" />;
      case 'house':
      case 'villa':
        return <Home className="w-4 h-4 mr-1" />;
      case 'hotel':
        return <Hotel className="w-4 h-4 mr-1" />;
      case 'warehouse':
        return <Warehouse className="w-4 h-4 mr-1" />;
      default:
        return <Home className="w-4 h-4 mr-1" />;
    }
  };

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

  const propertyTypeCode = propertyId ? Object.entries(subCategoryCodes).find(([_, code]) => code === propertyId.slice(8, 10))?.[0] : '';

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full">
      {/* Property Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(status)}`}>
            {status}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium border ${getIntentColor(displayIntent)}`}>
            {displayIntent}
          </span>
        </div>
        
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded text-xs font-medium border ${
              listingType === 'RentAmigo' ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {displayListingType}
          </span>
        </div>
      </div>
      
      {/* Property Details */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {highlightIfMatched('title', title)}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            {renderPropertyTypeIcon()}
            <span>{type}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{highlightIfMatched('location', location)}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Ruler size={14} className="mr-1" />
            <span>{highlightIfMatched('area', displayArea)}</span>
          </div>
          <div className="flex items-center">
            <Bed size={14} className="mr-1" />
            <span>{highlightIfMatched('furnishing', furnishing)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t pt-3 mt-auto">
          <span className="text-xl font-bold">
            ₹{price ? price.toLocaleString() : 'Price on request'}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={14} className="mr-1" />
            {isNaN(displayDate.getTime()) ? 'Date not available' : format(displayDate, 'MMM d, yyyy')}
          </div>
        </div>
      </div>
    </div>
  );
};
