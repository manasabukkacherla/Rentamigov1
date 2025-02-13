import React from 'react';

type ListingTypeSelectorProps = {
  selected: string;
  onSelect: (type: string) => void;
  hidePGColiving?: boolean; // New prop to conditionally hide PG/Co-living
};

export function ListingTypeSelector({ selected, onSelect, hidePGColiving }: ListingTypeSelectorProps) {
  const listingOptions = ['rent', 'sell', 'pg'].filter(
    (type) => !(hidePGColiving && type === 'pg') // Remove PG/Co-living if hidePGColiving is true
  );

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Looking to <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4">
        {listingOptions.map((type) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`px-6 py-3 rounded-lg ${
              selected === type
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-50 text-gray-700'
            }`}
          >
            {type === 'pg' ? 'PG/Co-living' : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
