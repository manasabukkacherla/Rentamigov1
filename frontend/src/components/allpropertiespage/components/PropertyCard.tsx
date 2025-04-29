import React from 'react';
import { Building2, MapPin, Bath, Square, Calendar, Users, Home } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  matchedFields?: Set<string>;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  matchedFields = new Set()
}) => {
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

  return (
    <div className="bg-white rounded border transition-all hover:shadow-lg border-gray-200 h-full flex flex-col">
      <div className="relative h-60">
        <img src={property.image} alt={property.title} className="w-full h-full object-cover rounded-t" />
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
            For {property.intent}
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
        <div className="grid grid-cols-2 gap-2 mb-3">
          {property.type === 'PG' && property.sharing ? (
            <div className="flex items-center text-gray-600">
              <Users size={16} className="mr-1 flex-shrink-0" />
              <span className="text-sm">{highlightIfMatched('sharing', property.sharing)}</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-600">
              <Building2 size={16} className="mr-1 flex-shrink-0" />
              <span className="text-sm">{highlightIfMatched('bhkType', property.bhkType)}</span>
            </div>
          )}
          <div className="flex items-center text-gray-600">
            <Bath size={16} className="mr-1 flex-shrink-0" />
            <span className="text-sm">{highlightIfMatched('bathrooms', `${property.bathrooms} Baths`)}</span>
          </div>
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
    </div>
  );
};