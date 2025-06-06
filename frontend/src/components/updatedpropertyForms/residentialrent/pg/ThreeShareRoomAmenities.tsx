import React, { useState, useEffect } from 'react';
import { Check, Share2, Bed, Users } from 'lucide-react';

interface AmenityItem {
  id: string;
  label: string;
  isOptional?: boolean;
  isShared?: boolean;
}

interface ThreeShareRoomAmenitiesProps {
  amenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
}

const allAmenities: AmenityItem[] = [
  { id: 'beds', label: 'Three single/bunk beds', isShared: true },
  { id: 'wardrobe-1', label: 'Individual wardrobe (Occupant 1)' },
  { id: 'wardrobe-2', label: 'Individual wardrobe (Occupant 2)' },
  { id: 'wardrobe-3', label: 'Individual wardrobe (Occupant 3)' },
  { id: 'lockers', label: 'Individual lockers', isShared: true },
  { id: 'study-desk', label: 'Shared study desk', isShared: true },
  { id: 'mirror', label: 'Shared mirror', isShared: true },
  { id: 'charging-1', label: 'Charging port (Occupant 1)' },
  { id: 'charging-2', label: 'Charging port (Occupant 2)' },
  { id: 'charging-3', label: 'Charging port (Occupant 3)' },
  { id: 'fan', label: 'Fan', isShared: true },
  { id: 'ac', label: 'Air Conditioning (AC)', isShared: true }
];

const ThreeShareRoomAmenities: React.FC<ThreeShareRoomAmenitiesProps> = ({
  amenities = [],
  onAmenitiesChange
}) => {
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set(amenities));

  useEffect(() => {
    setSelectedAmenities(new Set(amenities));
  }, [amenities]);

  const handleAmenityChange = (amenityId: string) => {
    const newSelected = new Set(selectedAmenities);
    if (newSelected.has(amenityId)) {
      newSelected.delete(amenityId);
    } else {
      newSelected.add(amenityId);
    }
    setSelectedAmenities(newSelected);
    onAmenitiesChange(Array.from(newSelected));
  };

  const findAmenityById = (id: string): AmenityItem | undefined => {
    return allAmenities.find(a => a.id === id);
  };

  const personalAmenities = allAmenities.filter(a => !a.isShared);
  const sharedAmenities = allAmenities.filter(a => a.isShared);

  const renderAmenityItem = (amenity: AmenityItem) => (
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
          Select the amenities available in three-sharing rooms
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
              const amenity = findAmenityById(amenityId);
              if (!amenity) return null;
              
              return (
                <div key={amenityId} 
                  className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/5 text-sm text-black"
                >
                  {amenity.isShared ? 
                    <Share2 className="w-3 h-3 mr-1 text-blue-500" /> : 
                    <Check className="w-3 h-3 mr-1" />
                  }
                  <span>{amenity.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeShareRoomAmenities;
