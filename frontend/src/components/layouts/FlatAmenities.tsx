import React from 'react';
import { Wind, Bed as BedIcon, DoorClosed, Tv, Refrigerator, Waves, Microwave, Sofa as SofaIcon, UtensilsCrossed, Flame, Gamepad2 } from 'lucide-react';

export interface FlatAmenitiesData {
  _id: any;
  selectedAmenities: string[];
}

interface FlatAmenitiesProps {
  amenitiesData: FlatAmenitiesData;
  setAmenitiesData: React.Dispatch<React.SetStateAction<FlatAmenitiesData>>;
}

const AMENITIES = [
  { name: 'Air Conditioner', icon: Wind },
  { name: 'Bed', icon: BedIcon },
  { name: 'Wardrobe', icon: DoorClosed },
  { name: 'TV', icon: Tv },
  { name: 'Refrigerator', icon: Refrigerator },
  { name: 'Washing Machine', icon: Waves },
  { name: 'Microwave', icon: Microwave },
  { name: 'Sofa', icon: SofaIcon },
  { name: 'Dining Table', icon: UtensilsCrossed },
  { name: 'Gas Connection', icon: Flame },
  { name: 'Play Station', icon: Gamepad2 },
];

export function FlatAmenities({ amenitiesData, setAmenitiesData }: FlatAmenitiesProps) {
  const handleAmenityChange = (amenity: string) => {
    setAmenitiesData(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter(a => a !== amenity)
        : [...prev.selectedAmenities, amenity]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {AMENITIES.map(({ name, icon: Icon }) => (
          <label
            key={name}
            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={amenitiesData.selectedAmenities.includes(name)}
              onChange={() => handleAmenityChange(name)}
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <div className="flex items-center space-x-2">
              <Icon className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{name}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}