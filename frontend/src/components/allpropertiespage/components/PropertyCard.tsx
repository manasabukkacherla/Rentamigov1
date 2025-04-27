import React from 'react';
import { Building2, MapPin, Bath, Square, Calendar, Users } from 'lucide-react';
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

  return (
    <div className="bg-white rounded border transition-all hover:shadow-lg border-gray-200 h-full flex flex-col">
      <div className="relative h-60">
        <img src={property.image} alt={property.title} className="w-full h-full object-cover rounded-t" />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-sm font-medium ${
            property.listingType === 'RentAmigo' ? 'bg-black text-white' : 'bg-white text-black'
          }`}>
            {property.listingType}
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