import React, { useState } from 'react';
import { Check, Bed, Users, Share2 } from 'lucide-react';

interface Amenity {
  id: string;
  label: string;
  isOptional?: boolean;
  isShared?: boolean;
}

const DoubleShareRoomAmenities = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());

  const amenities: Amenity[] = [
    { id: 'bed-single-1', label: 'Single Bed (Occupant 1)' },
    { id: 'bed-single-2', label: 'Single Bed (Occupant 2)' },
    { id: 'bed-double-1', label: 'Double Bed (Occupant 1)' },
    { id: 'bed-double-2', label: 'Double Bed (Occupant 2)' },
    { id: 'mattress-1', label: 'Mattress (Occupant 1)' },
    { id: 'mattress-2', label: 'Mattress (Occupant 2)' },
    { id: 'pillow-1', label: 'Pillow (Occupant 1)' },
    { id: 'pillow-2', label: 'Pillow (Occupant 2)' },
    { id: 'bedsheet-1', label: 'Bedsheet (Occupant 1)' },
    { id: 'bedsheet-2', label: 'Bedsheet (Occupant 2)' },
    { id: 'blanket-1', label: 'Blanket (Occupant 1)' },
    { id: 'blanket-2', label: 'Blanket (Occupant 2)' },
    { id: 'wardrobe-1', label: 'Wardrobe/Storage Unit (Occupant 1)' },
    { id: 'wardrobe-2', label: 'Wardrobe/Storage Unit (Occupant 2)' },
    { id: 'study-set-1', label: 'Study Table and Chair (Occupant 1)' },
    { id: 'study-set-2', label: 'Study Table and Chair (Occupant 2)' },
    { id: 'study-set-shared', label: 'Shared Study Table and Chair', isShared: true },
    { id: 'fan', label: 'Ceiling Fan', isShared: true },
    { id: 'lights', label: 'Lights', isShared: true },
    { id: 'ac', label: 'Air Conditioning (AC)', isOptional: true, isShared: true },
    { id: 'bathroom-attached', label: 'Attached Bathroom', isOptional: true, isShared: true },
    { id: 'bathroom-shared', label: 'Shared Bathroom', isOptional: true, isShared: true },
    { id: 'curtains', label: 'Curtains for Privacy', isShared: true },
    { id: 'charging-1', label: 'Personal Charging Points (Occupant 1)' },
    { id: 'charging-2', label: 'Personal Charging Points (Occupant 2)' },
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

  // Group amenities by category
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
          ? 'border-black bg-black/5 hover:text-white' 
          : 'border-gray-200 hover:border-black hover:text-white'
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
              const amenity = amenities.find(a => a.id === amenityId);
              return (
                <div key={amenityId} 
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs transition-colors bg-black/5 text-gray-800 hover:text-white"
                >
                  {amenity?.isShared ? 
                    <Share2 className="w-3 h-3 mr-1 text-blue-500 hover:text-white" /> : 
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

export default DoubleShareRoomAmenities; 