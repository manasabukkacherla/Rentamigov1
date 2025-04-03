import React, { useState } from 'react';

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
    <div className="p-6 bg-black text-white">
      <h1 className="text-2xl font-bold mb-6">Single Room Amenities</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
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

export default SingleRoomAmenities;