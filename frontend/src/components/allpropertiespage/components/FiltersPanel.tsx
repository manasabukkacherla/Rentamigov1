import React, { useState } from 'react';
import { ListingType, PropertyType, FurnishingType, SharingType } from '../types';
import { Filters, FilterSectionProps } from '../types';

interface FiltersPanelProps {
  onFilterChange: (filters: Filters) => void;
}

export const FiltersPanel = ({ onFilterChange }: FiltersPanelProps): JSX.Element => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    listingTypes: [],
    propertyTypes: [],
    furnishingTypes: [],
    sharingTypes: [],
    priceRange: {
      min: null,
      max: null
    }
  });

  const handleCheckboxChange = (type: keyof Filters, item: string) => {
    if (!Array.isArray(selectedFilters[type])) return;

    const updatedFilters = { ...selectedFilters };
    const currentArray = selectedFilters[type] as string[];
    const index = currentArray.indexOf(item);
    
    if (index === -1) {
      currentArray.push(item);
    } else {
      currentArray.splice(index, 1);
    }
    
    // Handle propertyTypes specially
    if (type === 'propertyTypes') {
      const newPropertyTypes = currentArray as PropertyType[];
      
      if (item === 'PG' && !currentArray.includes(item)) {
        updatedFilters.sharingTypes = [];
      } else if (item !== 'PG' && !currentArray.includes(item)) {
        updatedFilters.sharingTypes = [];
      }
      
      updatedFilters.propertyTypes = newPropertyTypes;
    } else {
      // Cast to the appropriate type based on the key
      if (type === 'listingTypes') {
        updatedFilters[type] = currentArray as ListingType[];
      } else if (type === 'furnishingTypes') {
        updatedFilters[type] = currentArray as FurnishingType[];
      } else if (type === 'sharingTypes') {
        updatedFilters[type] = currentArray as SharingType[];
      }
    }
    
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceChange = (field: 'min' | 'max', value: string) => {
    const numericValue = value ? parseInt(value) : null;
    setSelectedFilters((prev: Filters) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: numericValue
      }
    }));
    onFilterChange({
      ...selectedFilters,
      priceRange: {
        ...selectedFilters.priceRange,
        [field]: numericValue
      }
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedFilters);
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      listingTypes: [],
      propertyTypes: [],
      furnishingTypes: [],
      sharingTypes: [],
      priceRange: {
        min: null,
        max: null
      }
    });
    onFilterChange({
      listingTypes: [],
      propertyTypes: [],
      furnishingTypes: [],
      sharingTypes: [],
      priceRange: {
        min: null,
        max: null
      }
    });
  };

  const FilterSection: React.FC<FilterSectionProps> = ({ title, items, type }) => {
    const currentType = type as keyof Filters;
    return (
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2 text-gray-900">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {items.map((item: string) => (
            <label
              key={item}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all
                ${(selectedFilters[currentType] as string[]).includes(item)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={(selectedFilters[currentType] as string[]).includes(item)}
                onChange={(e) => handleCheckboxChange(currentType, item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const isPGSelected = selectedFilters.propertyTypes.includes('PG');

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <FilterSection
          title="Listing Type"
          items={['Owner', 'Agent', 'PG', 'RentAmigo']}
          type="listingTypes"
        />
        
        <FilterSection
          title="Property Type"
          items={['Apartment', 'House', 'Villa', 'PG', 'Studio', 'Penthouse']}
          type="propertyTypes"
        />
        
        {!isPGSelected && (
          <FilterSection
            title="Sharing Type"
            items={['1 Share', '2 Share', '3 Share', '4 Share', '4+ Share']}
            type="sharingTypes"
          />
        )}
        
        <FilterSection
          title="Furnishing Type"
          items={['Fully Furnished', 'Semi Furnished', 'Partially Furnished', 'Unfurnished']}
          type="furnishingTypes"
        />

        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2 text-gray-900">Price Range</h3>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                value={selectedFilters.priceRange.min || ''}
                onChange={(e) => handlePriceChange('min', e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                value={selectedFilters.priceRange.max || ''}
                onChange={(e) => handlePriceChange('max', e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleApplyFilters}
          className="w-full bg-black text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};