import React, { useState, useEffect, useCallback } from 'react';
import { ListingType, PropertyType, FurnishingType, SharingType } from '../types';
import { Filters, FilterSectionProps } from '../types';
import debounce from 'lodash.debounce';
import { X } from 'lucide-react';
interface FiltersPanelProps {
  onFilterChange: (filters: Filters) => void;
  onClose: () => void;
}

export const FiltersPanel = ({ onFilterChange, onClose }: FiltersPanelProps): JSX.Element => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    listingTypes: [],
    propertyTypes: [],
    furnishingTypes: [],
    sharingTypes: [],
    priceRange: {
      min: null,
      max: null
    },
    category: []
  });

  // Debounced filter update to prevent excessive re-renders
  const debouncedFilterUpdate = useCallback(
    debounce((filters: Filters) => {
      onFilterChange(filters);
    }, 300),
    []
  );

  // Update parent when selectedFilters change
  useEffect(() => {
    debouncedFilterUpdate(selectedFilters);
    return () => debouncedFilterUpdate.cancel();
  }, [selectedFilters, debouncedFilterUpdate]);

  const handleCheckboxChange = (type: keyof Filters, item: string, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!Array.isArray(selectedFilters[type])) return;

    const updatedFilters = { ...selectedFilters };
    const currentArray = [...selectedFilters[type] as string[]];
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
  };

  const handlePriceChange = (field: 'min' | 'max', value: string, e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e) e.stopPropagation();
    const numericValue = value ? parseInt(value) : null;
    setSelectedFilters((prev: Filters) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: numericValue
      }
    }));
  };

  const handleSliderChange = (values: number[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      priceRange: {
        min: values[0],
        max: values[1]
      }
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedFilters);
  };

  const clearAllFilters = (e: React.MouseEvent) => {
    e.stopPropagation();
    const clearedFilters = {
      listingTypes: [],
      propertyTypes: [],
      furnishingTypes: [],
      sharingTypes: [],
      priceRange: {
        min: null,
        max: null
      },
      category: []
    };
    setSelectedFilters(clearedFilters);
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
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'}`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={(selectedFilters[currentType] as string[]).includes(item)}
                onChange={(e) => handleCheckboxChange(currentType, item, e)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const isPGSelected = selectedFilters.propertyTypes.includes('PG');

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };
  
  // Stop propagation for all interactive elements
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Prevent clicks inside the panel from closing it
  const handlePanelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="bg-white rounded-lg shadow p-4 h-full overflow-y-auto"
      onClick={handlePanelClick}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => clearAllFilters(e)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear All
          </button>
          <button
            onClick={handleCloseClick}
            onMouseDown={stopPropagation}
            className="text-gray-500 hover:text-gray-700 p-1 -mr-1"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <FilterSection
          title="Listing Type"
          items={['Owner', 'Agent', 'PG', 'RentAmigo']}
          type="listingTypes"
        />
        
        <FilterSection
          title="Residential - For Sale"
          items={[
            'Apartment',
            'Builder Floor',
            'Independent House',
            'Villa',
            'Plot',
            'Penthouse',
            'Studio'
          ]}
          type="propertyTypes"
        />

        <FilterSection
          title="Residential - For Rent"
          items={[
            'Apartment',
            'Builder Floor',
            'Independent House',
            'Villa',
            'PG',
            'Studio',
            'Penthouse'
          ]}
          type="propertyTypes"
        />

        <FilterSection
          title="Residential - For Lease"
          items={[
            'Apartment',
            'Builder Floor',
            'Independent House',
            'Villa',
            'Studio'
          ]}
          type="propertyTypes"
        />
        
        <FilterSection
          title="Commercial - For Sale"
          items={[
            'Office Space',
            'Retail Space',
            'Shop',
            'Showroom',
            'Warehouse',
            'Industrial Shed',
            'Commercial Land',
            'Agricultural Land',
            'Hotel/Resort',
            'Hospitality',
            'Healthcare',
            'Education',
            'Storage',
            'Others'
          ]}
          type="propertyTypes"
        />

        <FilterSection
          title="Commercial - For Rent"
          items={[
            'Office Space',
            'Retail Space',
            'Shop',
            'Showroom',
            'Warehouse',
            'Co-working Space',
            'Industrial Shed',
            'Commercial Land',
            'Agricultural Land',
            'Hotel/Resort',
            'Hospitality',
            'Healthcare',
            'Education',
            'Storage',
            'Others'
          ]}
          type="propertyTypes"
        />

        <FilterSection
          title="Commercial - For Lease"
          items={[
            'Office Space',
            'Retail Space',
            'Shop',
            'Showroom',
            'Warehouse',
            'Co-working Space',
            'Industrial Shed',
            'Commercial Land',
            'Agricultural Land',
            'Hotel/Resort',
            'Hospitality',
            'Healthcare',
            'Education',
            'Storage',
            'Others'
          ]}
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

        <div className="mb-6">
          <h3 className="text-base font-semibold mb-4 text-gray-900">Price Range</h3>
          <div className="px-1">
            {/* Price display */}
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>₹{selectedFilters.priceRange.min?.toLocaleString() || '0'}</span>
              <span>₹{selectedFilters.priceRange.max?.toLocaleString() || '100,000'}</span>
            </div>
            
            {/* Range Slider */}
            <div className="relative h-2">
              {/* Track */}
              <div className="absolute w-full h-1 bg-gray-200 rounded-full top-1/2 -translate-y-1/2"></div>
              
              {/* Selected Range */}
              <div 
                className="absolute h-1 bg-blue-600 rounded-full"
                style={{
                  left: `${((selectedFilters.priceRange.min || 0) / 100000) * 100}%`,
                  right: `${100 - ((selectedFilters.priceRange.max || 100000) / 100000) * 100}%`,
                }}
              ></div>
              
              {/* Thumb for min price */}
              <div 
                className="absolute w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-md -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:shadow-lg transition-shadow"
                style={{
                  left: `${((selectedFilters.priceRange.min || 0) / 100000) * 100}%`,
                  top: '50%',
                }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  ₹{selectedFilters.priceRange.min?.toLocaleString() || '0'}
                </div>
              </div>
              
              {/* Thumb for max price */}
              <div 
                className="absolute w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-md -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:shadow-lg transition-shadow"
                style={{
                  left: `${((selectedFilters.priceRange.max || 100000) / 100000) * 100}%`,
                  top: '50%',
                }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  ₹{selectedFilters.priceRange.max?.toLocaleString() || '100,000'}
                </div>
              </div>
              
              {/* Hidden range inputs for actual functionality */}
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={selectedFilters.priceRange.min || 0}
                onChange={(e) => handlePriceChange('min', e.target.value, e)}
                className="absolute w-full h-4 opacity-0 cursor-pointer top-1/2 -translate-y-1/2"
              />
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={selectedFilters.priceRange.max || 100000}
                onChange={(e) => handlePriceChange('max', e.target.value, e)}
                className="absolute w-full h-4 opacity-0 cursor-pointer top-1/2 -translate-y-1/2"
              />
            </div>
            
            {/* Price inputs */}
            <div className="flex justify-between gap-4 mt-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Min</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                    value={selectedFilters.priceRange.min || ''}
                    onChange={(e) => handlePriceChange('min', e.target.value, e)}
                    placeholder="0"
                    min="0"
                    max={selectedFilters.priceRange.max || 100000}
                  />
                </div>
              </div>
              <div className="flex items-end pb-4 text-gray-400">
                <span className="text-sm">to</span>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Max</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                    value={selectedFilters.priceRange.max || ''}
                    onChange={(e) => handlePriceChange('max', e.target.value, e)}
                    placeholder="100000"
                    min={selectedFilters.priceRange.min || 0}
                    max="1000000"
                  />
                </div>
              </div>
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