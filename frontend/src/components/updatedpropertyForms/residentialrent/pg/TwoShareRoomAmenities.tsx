import React, { useState, useEffect } from 'react';
import { Check, Bed, Users, Share2 } from 'lucide-react';

interface Amenity {
  id: string;
  label: string;
  isOptional?: boolean;
  isShared?: boolean;
}

interface TwoShareRoomAmenitiesProps {
  amenities?: string[];
  onAmenitiesChange?: (amenities: string[]) => void;
}

const TwoShareRoomAmenities: React.FC<TwoShareRoomAmenitiesProps> = ({
  amenities = [],
  onAmenitiesChange
}) => {
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set(amenities));
  
  // Update local state when props change
  useEffect(() => {
    setSelectedAmenities(new Set(amenities));
  }, [amenities]);

  const amenitiesList: Amenity[] = [
    { id: 'beds', label: 'Two single beds or one bunk bed', isShared: true },
    { id: 'wardrobe-1', label: 'Separate wardrobe (Occupant 1)' },
    { id: 'wardrobe-2', label: 'Separate wardrobe (Occupant 2)' },
    { id: 'study-individual', label: 'Individual study tables', isShared: false },
    { id: 'study-shared', label: 'Shared study table', isShared: true },
    { id: 'bathroom', label: 'Shared attached bathroom', isShared: true },
    { id: 'charging-1', label: 'Charging point near bed (Occupant 1)' },
    { id: 'charging-2', label: 'Charging point near bed (Occupant 2)' },
    { id: 'fan', label: 'Fan', isShared: true },
    { id: 'ac', label: 'Air Conditioning (AC)', isShared: true }
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

  // Group amenities by category
  const personalAmenities = amenitiesList.filter(a => !a.isShared);
  const sharedAmenities = amenitiesList.filter(a => a.isShared);

  // Render a single amenity item
  const renderAmenityItem = (amenity: Amenity) => (
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
        w-4 h-4 flex-shrink-0 flex items-center justify-center border rounded-sm
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
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-1">
        <Users className="w-4 h-4 text-gray-500 mr-2" />
        <p className="text-sm text-gray-500">
          Select the amenities available in double occupancy rooms
        </p>
      </div>
      
      <div className="space-y-5">
        {/* Personal Amenities */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center mb-3">
            <Bed className="w-4 h-4 text-gray-700 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">Personal Amenities</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {personalAmenities.map(renderAmenityItem)}
          </div>
        </div>

        {/* Shared Amenities */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center mb-3">
            <Share2 className="w-4 h-4 text-gray-700 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">Shared Amenities</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sharedAmenities.map(renderAmenityItem)}
          </div>
        </div>
      </div>

      {selectedAmenities.size > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Selected Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedAmenities).map(amenityId => {
              const amenity = amenitiesList.find(a => a.id === amenityId);
              return (
                <div key={amenityId} 
                  className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/5 text-sm text-black"
                >
                  {amenity?.isShared ? 
                    <Share2 className="w-3 h-3 mr-1 text-blue-500" /> : 
                    <Check className="w-3 h-3 mr-1" />
                  }
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

export default TwoShareRoomAmenities;