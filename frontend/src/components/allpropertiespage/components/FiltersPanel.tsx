import React, { useState } from 'react';
import { ListingType, PropertyType, FurnishingType, BHKType, SharingType, Filters } from '../types';
import { X } from 'lucide-react';

interface FiltersPanelProps {
  onFilterChange: (filters: Filters) => void;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ onFilterChange }) => {
  const listingTypes: ListingType[] = ['Owner', 'Agent', 'PG', 'RentAmigo'];
  const propertyTypes: PropertyType[] = ['Apartment', 'House', 'Villa', 'PG', 'Studio', 'Penthouse'];
  const furnishingTypes: FurnishingType[] = ['Fully Furnished', 'Semi Furnished', 'Partially Furnished', 'Unfurnished'];
  const bhkTypes: BHKType[] = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'];
  const sharingTypes: SharingType[] = ['1 Share', '2 Share', '3 Share', '4 Share', '4+ Share'];

  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    listingTypes: [],
    propertyTypes: [],
    furnishingTypes: [],
    bhkTypes: [],
    sharingTypes: [],
    priceRange: {
      min: null,
      max: null
    }
  });

  const handleCheckboxChange = (type: keyof Filters, value: string) => {
    setSelectedFilters(prev => {
      const array = prev[type] as string[];
      const newArray = array.includes(value)
        ? array.filter(item => item !== value)
        : [...array, value];
      
      // If selecting PG as property type, clear BHK types
      if (type === 'propertyTypes' && value === 'PG' && !array.includes(value)) {
        return {
          ...prev,
          [type]: newArray,
          bhkTypes: [],
          sharingTypes: [] // Reset sharing types when switching to PG
        };
      }
      
      // If selecting any other property type, clear sharing types
      if (type === 'propertyTypes' && value !== 'PG' && !array.includes(value)) {
        return {
          ...prev,
          [type]: newArray,
          sharingTypes: []
        };
      }

      return {
        ...prev,
        [type]: newArray
      };
    });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? null : Number(value);
    setSelectedFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: numValue
      }
    }));
  };

  const handleApplyFilters = () => {
    const { min, max } = selectedFilters.priceRange;
    if (min !== null && max !== null && min > max) {
      alert('Minimum price cannot be greater than maximum price');
      return;
    }
    onFilterChange(selectedFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters: Filters = {
      listingTypes: [],
      propertyTypes: [],
      furnishingTypes: [],
      bhkTypes: [],
      sharingTypes: [],
      priceRange: {
        min: null,
        max: null
      }
    };
    setSelectedFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const FilterSection = ({ title, items, type }: { title: string; items: string[]; type: keyof Filters }) => (
    <div className="mb-4">
      <h3 className="text-base font-semibold mb-2 text-gray-900">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <label
            key={item}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all
              ${selectedFilters[type].includes(item)
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedFilters[type].includes(item)}
              onChange={() => handleCheckboxChange(type, item)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );

  const isPGSelected = selectedFilters.propertyTypes.includes('PG');

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-bold">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-gray-500 hover:text-black flex items-center"
        >
          <X size={16} className="mr-1" />
          Clear All
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        <FilterSection title="Property Type" items={propertyTypes} type="propertyTypes" />
        
        {!isPGSelected && (
          <FilterSection title="BHK Type" items={bhkTypes} type="bhkTypes" />
        )}

        {isPGSelected && (
          <FilterSection title="Sharing Type" items={sharingTypes} type="sharingTypes" />
        )}

        <FilterSection title="Listing Type" items={listingTypes} type="listingTypes" />
        
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2 text-gray-900">Price Range</h3>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
              value={selectedFilters.priceRange.min || ''}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            <input
              type="number"
              placeholder="Max"
              value={selectedFilters.priceRange.max || ''}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <FilterSection title="Furnishing" items={furnishingTypes} type="furnishingTypes" />
      </div>

      <div className="sticky bottom-0 bg-white border-t p-4">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-black text-white py-2 rounded text-base font-medium hover:bg-gray-800 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};