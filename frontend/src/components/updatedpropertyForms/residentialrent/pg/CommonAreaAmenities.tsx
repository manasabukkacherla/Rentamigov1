import React, { useState } from 'react';
import { Wifi, Tv, RefrigeratorIcon, WashingMachine, Microwave, UtensilsCrossed, Droplets, Check } from 'lucide-react';

interface Amenity {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  isOptional?: boolean;
}

interface CommonAreaAmenitiesProps {
  selectedAmenities: string[];
  onChange: (selected: string[]) => void;
}

const CommonAreaAmenities: React.FC<CommonAreaAmenitiesProps> = ({ selectedAmenities, onChange }) => {
  const [localSelected, setLocalSelected] = useState<Set<string>>(new Set(selectedAmenities));

  React.useEffect(() => {
    setLocalSelected(new Set(selectedAmenities));
  }, [selectedAmenities]);

  const amenities: Amenity[] = [
    {
      id: 'wifi',
      label: 'Wi-Fi/High-Speed Internet',
      description: 'High-speed internet access throughout the building',
      icon: <Wifi className="w-5 h-5" />
    },
    {
      id: 'tv',
      label: 'Television',
      description: 'Available in common area or specific rooms',
      icon: <Tv className="w-5 h-5" />,
      isOptional: true
    },
    {
      id: 'refrigerator',
      label: 'Refrigerator',
      description: 'Shared refrigerator for all residents',
      icon: <RefrigeratorIcon className="w-5 h-5" />
    },
    {
      id: 'washing-machine',
      label: 'Washing Machine',
      description: 'Self-service or paid laundry facilities',
      icon: <WashingMachine className="w-5 h-5" />
    },
    {
      id: 'kitchen',
      label: 'Microwave and Kitchen Access',
      description: 'Access to kitchen facilities and microwave',
      icon: <Microwave className="w-5 h-5" />,
      isOptional: true
    },
    {
      id: 'dining',
      label: 'Common Dining Area',
      description: 'Shared space for dining and socializing',
      icon: <UtensilsCrossed className="w-5 h-5" />
    },
    {
      id: 'water',
      label: 'Filtered Drinking Water',
      description: 'RO system for clean drinking water',
      icon: <Droplets className="w-5 h-5" />
    }
  ];

  const handleAmenityChange = (amenityId: string) => {
    const newSelected = new Set(localSelected);
    if (newSelected.has(amenityId)) {
      newSelected.delete(amenityId);
    } else {
      newSelected.add(amenityId);
    }
    setLocalSelected(newSelected);
    onChange(Array.from(newSelected));
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 mb-4 border-b border-gray-200">
        <p className="text-sm text-gray-500">
          Select the amenities available in common areas of your PG accommodation
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            onClick={() => handleAmenityChange(amenity.id)}
            className={`
              flex items-start p-4 rounded-lg border cursor-pointer transition-colors
              ${localSelected.has(amenity.id)
                ? 'border-black bg-black/5 hover:bg-black/10'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
            `}
          >
            <div className={`
              flex-shrink-0 p-1.5 rounded-md mr-3
              ${localSelected.has(amenity.id) ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}
            `}>
              {amenity.icon}
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <label htmlFor={amenity.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                  {amenity.label}
                  {amenity.isOptional && (
                    <span className="ml-1 text-xs text-gray-500">(Optional)</span>
                  )}
                </label>
                <div className={`
                  w-5 h-5 flex items-center justify-center rounded-md border
                  ${localSelected.has(amenity.id)
                    ? 'bg-black border-black text-white'
                    : 'border-gray-300'}
                `}>
                  {localSelected.has(amenity.id) && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{amenity.description}</p>
            </div>
          </div>
        ))}
      </div>
      {localSelected.size > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Selected Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(localSelected).map(amenityId => {
              const amenity = amenities.find(a => a.id === amenityId);
              return (
                <div key={amenityId} className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/5 text-sm text-gray-800">
                  <span className="mr-1.5">{amenity?.icon}</span>
                  <span>{amenity?.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonAreaAmenities;