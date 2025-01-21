import React from 'react';
import { Bed, Bath, Home, Building2, Warehouse, Clock } from 'lucide-react';
import { SelectField } from './SelectField';
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

const ROOM_NUMBERS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];

const FLOOR_NUMBERS = Array.from({ length: 50 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

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
        <SelectField
          label="Bedrooms"
          icon={Bed}
          value={featuresData.bedrooms}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, bedrooms: value }))}
          options={ROOM_NUMBERS}
        />

        <SelectField
          label="Bathrooms"
          icon={Bath}
          value={featuresData.bathrooms}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, bathrooms: value }))}
          options={ROOM_NUMBERS}
        />

        <SelectField
          label="Balconies"
          icon={Home}
          value={featuresData.balconies}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, balconies: value }))}
          options={ROOM_NUMBERS}
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
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{room}</span>
              </label>
            ))}
          </div>
        </div>

        <SelectField
          label="Floor of the property"
          icon={Building2}
          value={featuresData.floorNumber}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, floorNumber: value }))}
          options={FLOOR_NUMBERS}
        />

        <SelectField
          label="Total No of floors"
          icon={Building2}
          value={featuresData.totalFloors}
          onChange={(value) => setFeaturesData(prev => ({ ...prev, totalFloors: value }))}
          options={FLOOR_NUMBERS}
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
                  className="border-gray-300 text-blue-500 focus:ring-blue-500"
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