import React from 'react';
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
}

const OVERLOOKING_OPTIONS = ['Garden / Park', 'Pool', 'Main Road'];
const FLOORING_OPTIONS = ['Ceramic Tiles', 'Marble', 'Vitrified', 'Mosaic', 'Wooden', 'Granite', 'Normal Tiles'];

export function PropertyRestrictions({ restrictionsData, setRestrictionsData }: PropertyRestrictionsProps) {
  const handleChange = (field: keyof RestrictionsData) => (value: string) => {
    setRestrictionsData(prev => ({ ...prev, [field]: value }));
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
      </div>
    </div>
  );
}