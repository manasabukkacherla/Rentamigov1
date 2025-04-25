import React, { useState } from 'react';
import { Check, Bed, Users, Share2 } from 'lucide-react';

interface Amenity {
  id: string;
  label: string;
  isOptional?: boolean;
  isShared?: boolean;
}

const FiveShareRoomAmenities = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());

  const amenities: Amenity[] = [
    { id: 'bed-single-1', label: 'Single Bed (Occupant 1)' },
    { id: 'bed-single-2', label: 'Single Bed (Occupant 2)' },
    { id: 'bed-single-3', label: 'Single Bed (Occupant 3)' },
    { id: 'bed-single-4', label: 'Single Bed (Occupant 4)' },
    { id: 'bed-single-5', label: 'Single Bed (Occupant 5)' },
    { id: 'mattress-1', label: 'Mattress (Occupant 1)' },
    { id: 'mattress-2', label: 'Mattress (Occupant 2)' },
    { id: 'mattress-3', label: 'Mattress (Occupant 3)' },
    { id: 'mattress-4', label: 'Mattress (Occupant 4)' },
    { id: 'mattress-5', label: 'Mattress (Occupant 5)' },
    { id: 'pillow-1', label: 'Pillow (Occupant 1)' },
    { id: 'pillow-2', label: 'Pillow (Occupant 2)' },
    { id: 'pillow-3', label: 'Pillow (Occupant 3)' },
    { id: 'pillow-4', label: 'Pillow (Occupant 4)' },
    { id: 'pillow-5', label: 'Pillow (Occupant 5)' },
    { id: 'bedsheet-1', label: 'Bedsheet (Occupant 1)' },
    { id: 'bedsheet-2', label: 'Bedsheet (Occupant 2)' },
    { id: 'bedsheet-3', label: 'Bedsheet (Occupant 3)' },
    { id: 'bedsheet-4', label: 'Bedsheet (Occupant 4)' },
    { id: 'bedsheet-5', label: 'Bedsheet (Occupant 5)' },
    { id: 'blanket-1', label: 'Blanket (Occupant 1)' },
    { id: 'blanket-2', label: 'Blanket (Occupant 2)' },
    { id: 'blanket-3', label: 'Blanket (Occupant 3)' },
    { id: 'blanket-4', label: 'Blanket (Occupant 4)' },
    { id: 'blanket-5', label: 'Blanket (Occupant 5)' },
    { id: 'wardrobe-1', label: 'Wardrobe/Storage Unit (Occupant 1)' },
    { id: 'wardrobe-2', label: 'Wardrobe/Storage Unit (Occupant 2)' },
    { id: 'wardrobe-3', label: 'Wardrobe/Storage Unit (Occupant 3)' },
    { id: 'wardrobe-4', label: 'Wardrobe/Storage Unit (Occupant 4)' },
    { id: 'wardrobe-5', label: 'Wardrobe/Storage Unit (Occupant 5)' },
    { id: 'study-area', label: 'Common Study Area', isShared: true },
    { id: 'fan', label: 'Ceiling Fans', isShared: true },
    { id: 'lights', label: 'Lights', isShared: true },
    { id: 'ac', label: 'Air Conditioning (AC)', isOptional: true, isShared: true },
    { id: 'bathroom-attached', label: 'Attached Bathroom', isOptional: true, isShared: true },
    { id: 'bathroom-shared', label: 'Shared Bathroom', isOptional: true, isShared: true },
    { id: 'curtains', label: 'Curtains for Privacy', isShared: true },
    { id: 'charging-1', label: 'Personal Charging Points (Occupant 1)' },
    { id: 'charging-2', label: 'Personal Charging Points (Occupant 2)' },
    { id: 'charging-3', label: 'Personal Charging Points (Occupant 3)' },
    { id: 'charging-4', label: 'Personal Charging Points (Occupant 4)' },
    { id: 'charging-5', label: 'Personal Charging Points (Occupant 5)' },
    { id: 'mirror', label: 'Mirror', isShared: true }
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

  const personalAmenities = amenities.filter(a => !a.isShared);
  const sharedAmenities = amenities.filter(a => a.isShared);

  // Render a single amenity item
  const renderAmenityItem = (amenity: Amenity) => (
    <div 
      key={amenity.id} 
      onClick={() => handleAmenityChange(amenity.id)}
      className={`
        flex items-center p-3 rounded-md border cursor-pointer transition-colors
        ${selectedAmenities.has(amenity.id) 
          ? 'border-black bg-black/5 hover:bg-black/10' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
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
      
      <label htmlFor={amenity.id} className="ml-2 text-sm text-gray-900 flex-grow cursor-pointer">
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
          Select the amenities available in five sharing rooms
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
              const amenity = amenities.find(a => a.id === amenityId);
              return (
                <div key={amenityId} 
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs text-gray-800 ${amenity?.isShared ? 'bg-blue-50' : 'bg-black/5'}`}
                >
                  {amenity?.isShared ? 
                    <Share2 className="w-3 h-3 mr-1 text-blue-500" /> : 
                    <Check className="w-3 h-3 mr-1 text-black" />
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

export default FiveShareRoomAmenities;