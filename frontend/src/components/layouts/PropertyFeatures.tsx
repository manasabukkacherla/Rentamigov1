import React from 'react';
import { Bed, Bath, Home, Building2, Warehouse, Clock } from 'lucide-react';
import { InputField } from './InputField';

export interface FeaturesData {
  bedrooms: string;
  bathrooms: string;
  balconies: string;
  extraRooms: string[];
  floorNumber: string;
  totalFloors: string;
  superBuiltupArea: string;
  builtupArea: string;
  carpetArea: string;
  propertyAge: string;
}

interface PropertyFeaturesProps {
  featuresData: FeaturesData;
  setFeaturesData: React.Dispatch<React.SetStateAction<FeaturesData>>;
}

const EXTRA_ROOMS = [
  'Study Room',
  'Servant Room',
  'Puja Room',
  'Theater Room',
  'Gym Room',
];

const AGE_OPTIONS = [
  { value: '<5 Years', label: 'Less than 5 Years' },
  { value: '5-10 Years', label: '5-10 Years' },
  { value: '>10 Years', label: 'More than 10 Years' },
];

export function PropertyFeatures({ featuresData, setFeaturesData }: PropertyFeaturesProps) {
  const handleExtraRoomChange = (room: string) => {
    setFeaturesData(prev => ({
      ...prev,
      extraRooms: prev.extraRooms.includes(room)
        ? prev.extraRooms.filter(r => r !== room)
        : [...prev.extraRooms, room]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Number of Bedrooms"
          icon={Bed}
          value={featuresData.bedrooms}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, bedrooms: value }))}
          type="number"
          placeholder="Enter number of bedrooms"
          min="1"
          max="10"
        />

        <InputField
          label="Number of Bathrooms"
          icon={Bath}
          value={featuresData.bathrooms}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, bathrooms: value }))}
          type="number"
          placeholder="Enter number of bathrooms"
          min="1"
          max="10"
        />

        <InputField
          label="Number of Balconies"
          icon={Home}
          value={featuresData.balconies}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, balconies: value }))}
          type="number"
          placeholder="Enter number of balconies"
          min="0"
          max="10"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Extra Rooms Available</label>
          <div className="space-y-2">
            {EXTRA_ROOMS.map((room) => (
              <label key={room} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={featuresData.extraRooms.includes(room)}
                  onChange={() => handleExtraRoomChange(room)}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">{room}</span>
              </label>
            ))}
          </div>
        </div>

        <InputField
          label="Floor of the property"
          icon={Building2}
          value={featuresData.floorNumber}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, floorNumber: value }))}
          type="number"
          placeholder="Enter floor number"
          min="0"
        />

        <InputField
          label="Total No of floors"
          icon={Building2}
          value={featuresData.totalFloors}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, totalFloors: value }))}
          type="number"
          placeholder="Enter total floors"
          min="1"
        />

        <InputField
          label="Super Builtup Area (sq ft)"
          icon={Warehouse}
          value={featuresData.superBuiltupArea}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, superBuiltupArea: value }))}
          type="number"
          placeholder="Super Builtup Area"
        />

        <InputField
          label="Built Up Area (sq ft)"
          icon={Warehouse}
          value={featuresData.builtupArea}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, builtupArea: value }))}
          type="number"
          placeholder="Built Up Area"
        />

        <InputField
          label="Carpet Area (sq ft)"
          icon={Warehouse}
          value={featuresData.carpetArea}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, carpetArea: value }))}
          type="number"
          placeholder="Carpet Area"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline-block w-4 h-4 mr-2" />
            Age of the property
          </label>
          <div className="space-y-2">
            {AGE_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="propertyAge"
                  value={option.value}
                  checked={featuresData.propertyAge === option.value}
                  onChange={(e) => setFeaturesData(prev => ({ ...prev, propertyAge: e.target.value }))}
                  className="border-gray-300 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}