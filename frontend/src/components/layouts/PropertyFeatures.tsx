import React, { useState } from 'react';
import { Bed, Bath, Home, Building2, Warehouse, Clock, FileText } from 'lucide-react';
import { InputField } from './InputField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface FeaturesData {
  _id: any;
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
  propertyDescription: string; // New field for property description
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

export function PropertyFeatures({
  featuresData,
  setFeaturesData,
}: PropertyFeaturesProps) {
  const [isValid, setIsValid] = useState({
    bedrooms: true,
    bathrooms: true,
    balconies: true,
    floorNumber: true,
    totalFloors: true,
    superBuiltupArea: true,
    builtupArea: true,
    carpetArea: true,
    propertyAge: true,
    propertyDescription: true,
  });

  const validateField = (field: keyof FeaturesData, value: string) => {
    if (!value) {
      setIsValid((prev) => ({ ...prev, [field]: false }));
      toast.error(`${field.replace(/([A-Z])/g, ' $1')} is required`);
    } else {
      setIsValid((prev) => ({ ...prev, [field]: true }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Number of Bedrooms"
          icon={Bed}
          value={featuresData.bedrooms}
          onChange={(value) => {
            setFeaturesData((prev) => ({ ...prev, bedrooms: value }));
            validateField('bedrooms', value);
          }}
          type="number"
          placeholder="Enter number of bedrooms"
          min="1"
          max="10"
          className={!isValid.bedrooms ? 'border-red-500' : ''}
        />

        <InputField
          label="Number of Bathrooms"
          icon={Bath}
          value={featuresData.bathrooms}
          onChange={(value) => {
            setFeaturesData((prev) => ({ ...prev, bathrooms: value }));
            validateField('bathrooms', value);
          }}
          type="number"
          placeholder="Enter number of bathrooms"
          min="1"
          max="10"
          className={!isValid.bathrooms ? 'border-red-500' : ''}
        />

        <InputField
          label="Number of Balconies"
          icon={Home}
          value={featuresData.balconies}
          onChange={(value) => {
            setFeaturesData((prev) => ({ ...prev, balconies: value }));
            validateField('balconies', value);
          }}
          type="number"
          placeholder="Enter number of balconies"
          min="0"
          max="10"
          className={!isValid.balconies ? 'border-red-500' : ''}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Extra Rooms Available</label>
          <div className="space-y-2">
            {EXTRA_ROOMS.map((room) => (
              <label key={room} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={featuresData.extraRooms.includes(room)}
                  onChange={() =>
                    setFeaturesData((prev) => ({
                      ...prev,
                      extraRooms: prev.extraRooms.includes(room)
                        ? prev.extraRooms.filter((r) => r !== room)
                        : [...prev.extraRooms, room],
                    }))
                  }
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
          onChange={(value) => {
            setFeaturesData((prev) => ({ ...prev, floorNumber: value }));
            validateField('floorNumber', value);
          }}
          type="number"
          placeholder="Enter floor number"
          min="0"
          className={!isValid.floorNumber ? 'border-red-500' : ''}
        />

        <InputField
          label="Total No of floors"
          icon={Building2}
          value={featuresData.totalFloors}
          onChange={(value) => {
            setFeaturesData((prev) => ({ ...prev, totalFloors: value }));
            validateField('totalFloors', value);
          }}
          type="number"
          placeholder="Enter total floors"
          min="1"
          className={!isValid.totalFloors ? 'border-red-500' : ''}
        />

        <InputField
          label="Super Builtup Area (sq ft)"
          icon={Warehouse}
          value={featuresData.superBuiltupArea}
          onChange={(value) => {
            setFeaturesData((prev) => ({ ...prev, superBuiltupArea: value }));
            validateField('superBuiltupArea', value);
          }}
          type="number"
          placeholder="Super Builtup Area"
          className={!isValid.superBuiltupArea ? 'border-red-500' : ''}
        />

        <InputField
          label="Built Up Area (sq ft)"
          icon={Warehouse}
          value={featuresData.builtupArea}
          onChange={(value) => {
            setFeaturesData((prev) => ({ ...prev, builtupArea: value }));
            validateField('builtupArea', value);
          }}
          type="number"
          placeholder="Built Up Area"
          className={!isValid.builtupArea ? 'border-red-500' : ''}
        />

        <InputField
          label="Carpet Area (sq ft)"
          icon={Warehouse}
          value={featuresData.carpetArea}
          onChange={(value) => {
            setFeaturesData((prev) => ({ ...prev, carpetArea: value }));
            validateField('carpetArea', value);
          }}
          type="number"
          placeholder="Carpet Area"
          className={!isValid.carpetArea ? 'border-red-500' : ''}
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
                  onChange={(e) => {
                    setFeaturesData((prev) => ({
                      ...prev,
                      propertyAge: e.target.value,
                    }));
                    validateField('propertyAge', e.target.value);
                  }}
                  className="border-gray-300 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Property Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="inline-block w-4 h-4 mr-2" />
          Property Description
        </label>
        <textarea
          value={featuresData.propertyDescription}
          onChange={(e) => {
            setFeaturesData((prev) => ({
              ...prev,
              propertyDescription: e.target.value,
            }));
            validateField('propertyDescription', e.target.value);
          }}
          rows={4}
          placeholder="Enter a detailed description of the property"
          className={`block w-full border ${
            !isValid.propertyDescription ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm`}
        ></textarea>
        {!isValid.propertyDescription && (
          <p className="text-sm text-red-500 mt-1">
            Property Description is required.
          </p>
        )}
      </div>
    </div>
  );
}
