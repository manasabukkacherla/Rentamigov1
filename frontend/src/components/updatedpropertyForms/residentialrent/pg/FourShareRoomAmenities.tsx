import React, { useState } from 'react';

interface Amenity {
  id: string;
  label: string;
  isOptional?: boolean;
  isShared?: boolean;
}

const FourShareRoomAmenities = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());

  const amenities: Amenity[] = [
    { id: 'bed-single-1', label: 'Single Bed (Occupant 1)' },
    { id: 'bed-single-2', label: 'Single Bed (Occupant 2)' },
    { id: 'bed-single-3', label: 'Single Bed (Occupant 3)' },
    { id: 'bed-single-4', label: 'Single Bed (Occupant 4)' },
    { id: 'mattress-1', label: 'Mattress (Occupant 1)' },
    { id: 'mattress-2', label: 'Mattress (Occupant 2)' },
    { id: 'mattress-3', label: 'Mattress (Occupant 3)' },
    { id: 'mattress-4', label: 'Mattress (Occupant 4)' },
    { id: 'pillow-1', label: 'Pillow (Occupant 1)' },
    { id: 'pillow-2', label: 'Pillow (Occupant 2)' },
    { id: 'pillow-3', label: 'Pillow (Occupant 3)' },
    { id: 'pillow-4', label: 'Pillow (Occupant 4)' },
    { id: 'bedsheet-1', label: 'Bedsheet (Occupant 1)' },
    { id: 'bedsheet-2', label: 'Bedsheet (Occupant 2)' },
    { id: 'bedsheet-3', label: 'Bedsheet (Occupant 3)' },
    { id: 'bedsheet-4', label: 'Bedsheet (Occupant 4)' },
    { id: 'blanket-1', label: 'Blanket (Occupant 1)' },
    { id: 'blanket-2', label: 'Blanket (Occupant 2)' },
    { id: 'blanket-3', label: 'Blanket (Occupant 3)' },
    { id: 'blanket-4', label: 'Blanket (Occupant 4)' },
    { id: 'wardrobe-1', label: 'Wardrobe/Storage Unit (Occupant 1)' },
    { id: 'wardrobe-2', label: 'Wardrobe/Storage Unit (Occupant 2)' },
    { id: 'wardrobe-3', label: 'Wardrobe/Storage Unit (Occupant 3)' },
    { id: 'wardrobe-4', label: 'Wardrobe/Storage Unit (Occupant 4)' },
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

  return (
    <div className="p-6 bg-black text-white">
      <h1 className="text-2xl font-bold mb-6">Four Share Room Amenities</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Personal Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {personalAmenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={amenity.id}
                  checked={selectedAmenities.has(amenity.id)}
                  onChange={() => handleAmenityChange(amenity.id)}
                  className="h-5 w-5 border-white rounded bg-black checked:bg-white checked:border-white focus:ring-white focus:ring-2"
                />
                <label htmlFor={amenity.id} className="ml-3 text-white flex items-center">
                  {amenity.label}
                  {amenity.isOptional && (
                    <span className="ml-2 text-sm text-gray-400">(Optional)</span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Shared Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sharedAmenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={amenity.id}
                  checked={selectedAmenities.has(amenity.id)}
                  onChange={() => handleAmenityChange(amenity.id)}
                  className="h-5 w-5 border-white rounded bg-black checked:bg-white checked:border-white focus:ring-white focus:ring-2"
                />
                <label htmlFor={amenity.id} className="ml-3 text-white flex items-center">
                  {amenity.label}
                  {amenity.isOptional && (
                    <span className="ml-2 text-sm text-gray-400">(Optional)</span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white mt-6 pt-4">
        <h2 className="text-lg font-semibold mb-2">Selected Amenities:</h2>
        <div className="text-sm">
          <ul className="list-disc list-inside">
            {Array.from(selectedAmenities).map(amenityId => (
              <li key={amenityId}>
                {amenities.find(a => a.id === amenityId)?.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FourShareRoomAmenities;