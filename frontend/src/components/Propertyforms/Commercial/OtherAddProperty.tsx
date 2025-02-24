import React, { useState } from 'react';
import { Building2, MapPin } from 'lucide-react';

interface OtherAddPropertyDetails {
  building: string;
  locality: string;
  propertyName: string;
}

export default function OtherAddProperty() {
  const [formData, setFormData] = useState<OtherAddPropertyDetails>({
    building: '',
    locality: '',
    propertyName: '',
  });
  const [errors, setErrors] = useState<Partial<OtherAddPropertyDetails>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof OtherAddPropertyDetails]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Add Property Details</h2>
      
      <div className="space-y-6">
        {/* Building/Project/Society Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Building/Project/Society
            <span className="text-gray-500 text-sm ml-1">(Optional)</span>
          </label>
          <div className="relative w-full sm:w-[360px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="building"
              value={formData.building}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter building name"
            />
          </div>
        </div>

        {/* Locality Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Locality <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full sm:w-[360px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.locality ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm`}
              placeholder="Please select a valid locality"
            />
          </div>
          {errors.locality && (
            <p className="mt-2 text-sm text-red-600">{errors.locality}</p>
          )}
        </div>

        {/* Property Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Name <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full sm:w-[360px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.propertyName ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm`}
              placeholder="Enter property name"
            />
          </div>
          {errors.propertyName && (
            <p className="mt-2 text-sm text-red-600">{errors.propertyName}</p>
          )}
        </div>
      </div>
    </div>
  );
}