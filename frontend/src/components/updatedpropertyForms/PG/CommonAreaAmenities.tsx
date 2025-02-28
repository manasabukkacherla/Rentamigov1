import React, { useState } from 'react';
import { Wifi, Tv, RefrigeratorIcon, WashingMachine, Microwave, UtensilsCrossed, Droplets } from 'lucide-react';

interface Amenity {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  isOptional?: boolean;
}

const CommonAreaAmenities = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());

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
    const newSelectedAmenities = new Set(selectedAmenities);
    if (newSelectedAmenities.has(amenityId)) {
      newSelectedAmenities.delete(amenityId);
    } else {
      newSelectedAmenities.add(amenityId);
    }
    setSelectedAmenities(newSelectedAmenities);
  };

  return (
    <div className="p-4 bg-black text-white">
      <h1 className="text-xl font-bold mb-4">Common Area Amenities</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <div 
            key={amenity.id} 
            className="bg-gray-900 rounded-lg p-3 flex items-start space-x-3 hover:bg-gray-800 transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5">
              {amenity.icon}
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <label htmlFor={amenity.id} className="text-sm font-medium flex items-center">
                  {amenity.label}
                  {amenity.isOptional && (
                    <span className="ml-1 text-xs text-gray-400">(Optional)</span>
                  )}
                </label>
                <input
                  type="checkbox"
                  id={amenity.id}
                  checked={selectedAmenities.has(amenity.id)}
                  onChange={() => handleAmenityChange(amenity.id)}
                  className="h-4 w-4 border-white rounded bg-black checked:bg-white checked:border-white focus:ring-1 focus:ring-white"
                />
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{amenity.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 mt-6 pt-4">
        <h2 className="text-base font-semibold mb-3">Selected Common Area Amenities:</h2>
        <div className="text-sm">
          <ul className="list-disc list-inside space-y-1">
            {Array.from(selectedAmenities).map(amenityId => (
              <li key={amenityId} className="text-gray-300 text-sm">
                {amenities.find(a => a.id === amenityId)?.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommonAreaAmenities;