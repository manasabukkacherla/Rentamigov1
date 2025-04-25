import React, { useState } from 'react';
import { Check, Bed, Armchair } from 'lucide-react';

interface Amenity {
  id: string;
  label: string;
  isOptional?: boolean;
}

const SingleRoomAmenities = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());

  const amenities: Amenity[] = [
    { id: 'bed-single', label: 'Single Bed' },
    { id: 'bed-double', label: 'Double Bed' },
    { id: 'mattress', label: 'Mattress' },
    { id: 'pillow', label: 'Pillow' },
    { id: 'bedsheet', label: 'Bedsheet' },
    { id: 'blanket', label: 'Blanket' },
    { id: 'wardrobe', label: 'Wardrobe/Closet for Personal Storage' },
    { id: 'study-set', label: 'Study Table and Chair' },
    { id: 'fan', label: 'Fan' },
    { id: 'lights', label: 'Lights' },
    { id: 'ac', label: 'Air Conditioning (AC)', isOptional: true },
    { id: 'bathroom', label: 'Attached Bathroom' },
    { id: 'curtains', label: 'Curtains' },
    { id: 'charging-points', label: 'Charging Points' },
    { id: 'mirror', label: 'Mirror' }
  ];

  const handleAmenityChange = (amenityId: string) => {
    const newSelectedAmenities = new Set(selectedAmenities);
    if (newSelectedAmenities.has(amenityId)) {
      newSelectedAmenities.delete(amenityId);
    } else {
      newSelectedAmenities.add(amenityId);
    }
    setSelectedAmenities(newSelectedAmenities);
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
        {amenities.map((amenity) => (
          <div 
            key={amenity.id} 
            onClick={() => handleAmenityChange(amenity.id)}
            className={`
              flex items-center p-3 rounded-md border cursor-pointer transition-colors
              ${selectedAmenities.has(amenity.id) 
                ? 'border-black bg-black/5  hover:text-white' 
                : 'border-gray-200 hover:border-black  hover:text-white'
              }
            `}
          >
            <div className={`
              w-4 h-4 flex-shrink-0 flex items-center justify-center border rounded-sm transition-colors
              ${selectedAmenities.has(amenity.id) 
                ? 'bg-black border-black text-white' 
                : 'border-gray-300'
              }
              group-hover:border-white
            `}>
              {selectedAmenities.has(amenity.id) && <Check className="w-3 h-3" />}
            </div>
            
            <label htmlFor={amenity.id} className="ml-2 text-sm flex-grow cursor-pointer">
              {amenity.label}
              {amenity.isOptional && (
                <span className={`ml-1 text-xs ${selectedAmenities.has(amenity.id) ? 'text-gray-500' : 'text-gray-500'} hover:text-white`}>(Optional)</span>
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
              const amenity = amenities.find(a => a.id === amenityId);
              return (
                <div key={amenityId} className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/5 text-sm text-gray-800 hover:text-white transition-colors">
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