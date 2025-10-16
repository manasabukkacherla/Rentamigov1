import React, { useState, useEffect } from 'react';
import { Check, Bed, Armchair } from 'lucide-react';

interface Amenity {
  id: string;
  label: string;
  isOptional?: boolean;
}

interface SingleRoomAmenitiesProps {
  amenities?: string[];
  onAmenitiesChange?: (amenities: string[]) => void;
}

const SingleRoomAmenities: React.FC<SingleRoomAmenitiesProps> = ({ 
  amenities = [], 
  onAmenitiesChange 
}) => {
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set(amenities));

  // Update local state when props change
  useEffect(() => {
    setSelectedAmenities(new Set(amenities));
  }, [amenities]);

  const amenityOptions: Amenity[] = [
    { id: 'premium-mattress', label: 'Personal bed with premium mattress' },
    { id: 'private-wardrobe', label: 'Private wardrobe' },
    { id: 'study-set', label: 'Individual study table and chair' },
    { id: 'private-bathroom', label: 'Attached private bathroom' },
    { id: 'charging-ports', label: 'Personal charging ports' },
    { id: 'fan', label: 'Fan' },
    { id: 'ac', label: 'Air Conditioning (AC)' }
  ];

  const handleAmenityChange = (amenityId: string) => {
    const newSelectedAmenities = new Set(selectedAmenities);
    if (newSelectedAmenities.has(amenityId)) {
      newSelectedAmenities.delete(amenityId);
    } else {
      newSelectedAmenities.add(amenityId);
    }
    setSelectedAmenities(newSelectedAmenities);
    
    // Notify parent component of changes
    if (onAmenitiesChange) {
      onAmenitiesChange(Array.from(newSelectedAmenities));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-2">
        <Bed className="w-4 h-4 text-gray-500 mr-2" />
        <p className="text-sm text-gray-500">
          Select the amenities available in single occupancy rooms
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {amenityOptions.map((amenity) => (
          <div 
            key={amenity.id} 
            onClick={() => handleAmenityChange(amenity.id)}
            className={`
              flex items-center p-3 rounded-md border cursor-pointer transition-colors
              ${selectedAmenities.has(amenity.id) 
                ? 'border-black bg-black/5' 
                : 'border-gray-200 hover:border-black'
              }
            `}
          >
            <div className={`
              w-4 h-4 flex-shrink-0 flex items-center justify-center border rounded-sm transition-colors
              ${selectedAmenities.has(amenity.id) 
                ? 'bg-black border-black text-white' 
                : 'border-gray-300'
              }
            `}>
              {selectedAmenities.has(amenity.id) && <Check className="w-3 h-3" />}
            </div>
            
            <label htmlFor={amenity.id} className="ml-2 text-sm flex-grow cursor-pointer text-black">
              {amenity.label}
              {amenity.isOptional && (
                <span className="ml-1 text-xs text-gray-500">(Optional)</span>
              )}
            </label>
          </div>
        ))}
      </div>

      {selectedAmenities.size > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center mb-3">
            <Armchair className="w-4 h-4 text-gray-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">Selected Amenities</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedAmenities).map(amenityId => {
              const amenity = amenityOptions.find(a => a.id === amenityId);
              return (
                <div key={amenityId} className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/5 text-sm text-black">
                  <Check className="w-3 h-3 mr-1" />
                  <span>{amenity?.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRoomAmenities;