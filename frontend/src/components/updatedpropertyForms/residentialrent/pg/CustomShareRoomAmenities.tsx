import React, { useState } from 'react';

interface Amenity {
  id: string;
  label: string;
  isOptional?: boolean;
  isShared?: boolean;
}

interface Props {
  occupantCount: number;
}

const CustomShareRoomAmenities: React.FC<Props> = ({ occupantCount }) => {
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());

  const generateAmenities = (count: number): Amenity[] => {
    const amenities: Amenity[] = [];
    
    // Generate personal amenities for each occupant
    for (let i = 1; i <= count; i++) {
      amenities.push(
        { id: `bed-single-${i}`, label: `Single Bed (Occupant ${i})` },
        { id: `mattress-${i}`, label: `Mattress (Occupant ${i})` },
        { id: `pillow-${i}`, label: `Pillow (Occupant ${i})` },
        { id: `bedsheet-${i}`, label: `Bedsheet (Occupant ${i})` },
        { id: `blanket-${i}`, label: `Blanket (Occupant ${i})` },
        { id: `wardrobe-${i}`, label: `Wardrobe/Storage Unit (Occupant ${i})` },
        { id: `charging-${i}`, label: `Personal Charging Points (Occupant ${i})` }
      );
    }

    // Add shared amenities
    amenities.push(
      { id: 'study-area', label: 'Common Study Area', isShared: true },
      { id: 'fan', label: 'Ceiling Fans', isShared: true },
      { id: 'lights', label: 'Lights', isShared: true },
      { id: 'ac', label: 'Air Conditioning (AC)', isOptional: true, isShared: true },
      { id: 'bathroom-attached', label: 'Attached Bathroom', isOptional: true, isShared: true },
      { id: 'bathroom-shared', label: 'Shared Bathroom', isOptional: true, isShared: true },
      { id: 'curtains', label: 'Curtains for Privacy', isShared: true },
      { id: 'mirror', label: 'Mirror', isShared: true }
    );

    return amenities;
  };

  const amenities = generateAmenities(occupantCount);

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
      <h1 className="text-2xl font-bold mb-6">{occupantCount} Share Room Amenities</h1>
      
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

export default CustomShareRoomAmenities;