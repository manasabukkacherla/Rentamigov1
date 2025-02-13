import React from 'react';
import { Check } from 'lucide-react';

type AmenitiesListProps = {
  selectedAmenities: string[];
  onToggleAmenity: (amenity: string) => void;
  furnishType: string;
};

const fullyFurnishedAmenities = [
  'Air Conditioner',
  'TV',
  'Bed',
  'Wardrobe',
  'Washing Machine',
  'Sofa',
  'Dining Table',
  'Microwave',
  'Fridge',
  'Gas Connection',
  'Water Purifier',
  'Curtains',
  'Exhaust Fan',
  'Modular Kitchen',
  'Geyser',
];

const semiFurnishedAmenities = [
  'Air Conditioner',
  'Wardrobe',
  'Modular Kitchen',
  'Gas Connection',
  'Geyser',
  'Exhaust Fan',
  'Curtains',
  'Fan',
  'Light',
];

export function AmenitiesList({ selectedAmenities, onToggleAmenity, furnishType }: AmenitiesListProps) {
  const amenities = furnishType === 'Fully Furnished' ? fullyFurnishedAmenities : semiFurnishedAmenities;

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      {amenities.map((amenity) => (
        <button
          key={amenity}
          onClick={() => onToggleAmenity(amenity)}
          className={`flex items-center gap-2 p-3 rounded-lg border ${
            selectedAmenities.includes(amenity)
              ? 'border-purple-500 bg-purple-50 text-purple-700'
              : 'border-gray-200 hover:border-purple-200'
          }`}
        >
          <div className={`w-4 h-4 rounded flex items-center justify-center ${
            selectedAmenities.includes(amenity)
              ? 'bg-purple-600'
              : 'border border-gray-300'
          }`}>
            {selectedAmenities.includes(amenity) && (
              <Check className="w-3 h-3 text-white" />
            )}
          </div>
          <span className="text-sm">{amenity}</span>
        </button>
      ))}
    </div>
  );
}