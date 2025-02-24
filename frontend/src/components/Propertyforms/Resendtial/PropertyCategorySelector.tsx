import React from 'react';
import { Building, Store, ShoppingBag, Warehouse, MapPin, MoreHorizontal } from 'lucide-react';

type PropertyCategorySelectorProps = {
  selected: string;
  onSelect: (category: string) => void;
  propertyType: string;
};

type PropertyAgeSelectorProps = {
  selected: string;
  onSelect: (age: string) => void;
};

const residentialCategories = [
  { icon: Building, label: 'Apartment' },
  { icon: Store, label: 'Independent Floor' },
  { icon: ShoppingBag, label: 'Independent House' },
  { icon: Warehouse, label: 'Villa' },
  { icon: MapPin, label: 'Plot' },
];

const commercialCategories = [
  { icon: Building, label: 'Office' },
  { icon: Store, label: 'Retail Shop' },
  { icon: ShoppingBag, label: 'Showroom' },
  { icon: Warehouse, label: 'Warehouse' },
  { icon: MapPin, label: 'Plot' },
  { icon: MoreHorizontal, label: 'Others' },
];

export function PropertyCategorySelector({ selected, onSelect, propertyType }: PropertyCategorySelectorProps) {
  const categories = propertyType === 'residential' ? residentialCategories : commercialCategories;

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Property Category <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {categories.map((item) => (
          <button
            key={item.label}
            onClick={() => onSelect(item.label)}
            className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-2 ${
              selected === item.label
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-200'
            }`}
          >
            <item.icon className={`w-6 h-6 ${
              selected === item.label
                ? 'text-purple-500'
                : 'text-gray-500'
            }`} />
            <span className="text-sm text-center text-gray-700">{item.label}</span>
          </button>
        ))}
      </div>
      {propertyType === 'residential' && <PropertyAgeSelector selected={selected} onSelect={onSelect} />}
    </div>
  );
}

export function PropertyAgeSelector({ selected, onSelect }: PropertyAgeSelectorProps) {
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      onSelect(value ? `${value} years` : '');
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-gray-700 mb-2">
        Age of Property <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={selected.replace(' years', '')}
          onChange={handleAgeChange}
          placeholder="Enter age in years"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <span className="text-gray-500">Years</span>
      </div>
    </div>
  );
}