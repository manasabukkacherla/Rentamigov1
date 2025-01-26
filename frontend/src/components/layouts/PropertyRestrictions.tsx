import React, { useState } from 'react';
import { Users, Utensils, Dog, TreePine, Car, Bike, Grid } from 'lucide-react';

export interface RestrictionsData {
  _id: any;
  bachelorTenants: string;
  nonVegTenants: string;
  tenantWithPets: string;
  propertyOverlooking: string;
  carParking: string;
  carParkingCount: string;
  twoWheelerParking: string;
  twoWheelerParkingCount: string;
  flooringType: string;
}

interface PropertyRestrictionsProps {
  restrictionsData: RestrictionsData;
  setRestrictionsData: React.Dispatch<React.SetStateAction<RestrictionsData>>;
  onValidationError: (message: string) => void; // Callback for validation errors
}

const OVERLOOKING_OPTIONS = ['Garden / Park', 'Pool', 'Main Road'];
const FLOORING_OPTIONS = ['Ceramic Tiles', 'Marble', 'Vitrified', 'Mosaic', 'Wooden', 'Granite', 'Normal Tiles'];

export function PropertyRestrictions({ restrictionsData, setRestrictionsData, onValidationError }: PropertyRestrictionsProps) {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof RestrictionsData) => (value: string) => {
    setRestrictionsData((prev) => ({ ...prev, [field]: value }));
  };

  const validateFields = () => {
    const errors: Record<string, string> = {};

    if (!restrictionsData.bachelorTenants) {
      errors.bachelorTenants = 'Please select an option for Bachelor Tenants.';
    }
    if (!restrictionsData.nonVegTenants) {
      errors.nonVegTenants = 'Please select an option for Non Veg Tenants.';
    }
    if (!restrictionsData.tenantWithPets) {
      errors.tenantWithPets = 'Please select an option for Tenant with Pets.';
    }
    if (!restrictionsData.propertyOverlooking) {
      errors.propertyOverlooking = 'Please select a Property Overlooking option.';
    }
    if (restrictionsData.carParking === 'Yes' && !restrictionsData.carParkingCount) {
      errors.carParkingCount = 'Please specify the number of car parking spaces.';
    }
    if (restrictionsData.twoWheelerParking === 'Yes' && !restrictionsData.twoWheelerParkingCount) {
      errors.twoWheelerParkingCount = 'Please specify the number of two-wheeler parking spaces.';
    }
    if (!restrictionsData.flooringType) {
      errors.flooringType = 'Please select a Flooring Type.';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      onValidationError('Please fill in all required fields.');
      return false;
    }

    return true;
  };

  return (
    <div className="space-y-8">
      {/* Tenant Restrictions */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4" />
              Bachelor Tenants
            </label>
            <div className="flex gap-4">
              {['Yes', 'No', "Doesn't Matter"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="bachelorTenants"
                    value={option}
                    checked={restrictionsData.bachelorTenants === option}
                    onChange={(e) => handleChange('bachelorTenants')(e.target.value)}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {validationErrors.bachelorTenants && <p className="text-sm text-red-500">{validationErrors.bachelorTenants}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Utensils className="w-4 h-4" />
              Non Veg Tenants
            </label>
            <div className="flex gap-4">
              {['Yes', 'No', "Doesn't Matter"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="nonVegTenants"
                    value={option}
                    checked={restrictionsData.nonVegTenants === option}
                    onChange={(e) => handleChange('nonVegTenants')(e.target.value)}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {validationErrors.nonVegTenants && <p className="text-sm text-red-500">{validationErrors.nonVegTenants}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Dog className="w-4 h-4" />
              Tenant with Pets
            </label>
            <div className="flex gap-4">
              {['Yes', 'No', "Doesn't Matter", 'NA'].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tenantWithPets"
                    value={option}
                    checked={restrictionsData.tenantWithPets === option}
                    onChange={(e) => handleChange('tenantWithPets')(e.target.value)}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {validationErrors.tenantWithPets && <p className="text-sm text-red-500">{validationErrors.tenantWithPets}</p>}
          </div>
        </div>
      </div>

      {/* Property Overlooking */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <TreePine className="w-4 h-4" />
          Property Overlooking
        </label>
        <div className="flex gap-4">
          {OVERLOOKING_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="propertyOverlooking"
                value={option}
                checked={restrictionsData.propertyOverlooking === option}
                onChange={(e) => handleChange('propertyOverlooking')(e.target.value)}
                className="text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        {validationErrors.propertyOverlooking && <p className="text-sm text-red-500">{validationErrors.propertyOverlooking}</p>}
      </div>

      {/* Parking */}
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Car className="w-4 h-4" />
            Car Parking
          </label>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              {['Yes', 'No'].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="carParking"
                    value={option}
                    checked={restrictionsData.carParking === option}
                    onChange={(e) => handleChange('carParking')(e.target.value)}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {restrictionsData.carParking === 'Yes' && (
              <input
                type="number"
                min="1"
                placeholder="How many"
                value={restrictionsData.carParkingCount}
                onChange={(e) => handleChange('carParkingCount')(e.target.value)}
                className="w-32 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
          {validationErrors.carParkingCount && <p className="text-sm text-red-500">{validationErrors.carParkingCount}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Bike className="w-4 h-4" />
            Two Wheeler Parking
          </label>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              {['Yes', 'No'].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="twoWheelerParking"
                    value={option}
                    checked={restrictionsData.twoWheelerParking === option}
                    onChange={(e) => handleChange('twoWheelerParking')(e.target.value)}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {restrictionsData.twoWheelerParking === 'Yes' && (
              <input
                type="number"
                min="1"
                placeholder="How many"
                value={restrictionsData.twoWheelerParkingCount}
                onChange={(e) => handleChange('twoWheelerParkingCount')(e.target.value)}
                className="w-32 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
          {validationErrors.twoWheelerParkingCount && <p className="text-sm text-red-500">{validationErrors.twoWheelerParkingCount}</p>}
        </div>
      </div>

           {/* Flooring Type */}
           <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Grid className="w-4 h-4" />
          Flooring Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {FLOORING_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="flooringType"
                value={option}
                checked={restrictionsData.flooringType === option}
                onChange={(e) => handleChange('flooringType')(e.target.value)}
                className="text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        {validationErrors.flooringType && (
          <p className="text-sm text-red-500">{validationErrors.flooringType}</p>
        )}
      </div>
    </div>
  );
}