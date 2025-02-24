import React from 'react';
import { AmenitiesList } from './AmenitiesList';

type FurnishingStatusSelectorProps = {
  selected: string;
  onSelect: (status: string) => void;
  selectedAmenities: string[];
  onToggleAmenity: (amenity: string) => void;
};

export function FurnishingStatusSelector({
  selected,
  onSelect,
  selectedAmenities,
  onToggleAmenity
}: FurnishingStatusSelectorProps) {
  const options = ['Fully Furnished', 'Semi Furnished', 'Unfurnished'];

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Furnishing Status <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-6 py-3 rounded-lg ${
              selected === option
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-50 text-gray-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {(selected === 'Fully Furnished' || selected === 'Semi Furnished') && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-700 font-medium">
              Add Furnishings / Amenities
            </h3>
            <span className="text-sm text-gray-500">
              {selectedAmenities.length} selected
            </span>
          </div>
          <AmenitiesList
            selectedAmenities={selectedAmenities}
            onToggleAmenity={onToggleAmenity}
            furnishType={selected}
          />
        </div>
      )}
    </div>
  );
}