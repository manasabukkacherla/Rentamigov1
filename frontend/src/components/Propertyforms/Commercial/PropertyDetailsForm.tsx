import React, { useState } from 'react';
import { Building2, MapPin, ArrowLeft } from 'lucide-react';

interface PropertyDetails {
  building: string;
  locality: string;
}

export default function PropertyDetailsForm() {
  const [formData, setFormData] = useState<PropertyDetails>({
    building: '',
    locality: '',
  });
  const [errors, setErrors] = useState<Partial<PropertyDetails>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof PropertyDetails]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBack = () => {
    // Handle back navigation
    console.log('Going back');
  };

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Add Property Details</h2>
      </div>
      
      <div className="space-y-6">
        {/* Building/Project/Society Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Building/Project/Society
            <span className="text-gray-500 text-sm">(Optional)</span>
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
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
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base`}
              placeholder="Enter locality"
            />
          </div>
          {errors.locality && (
            <p className="mt-2 text-sm text-red-600">{errors.locality}</p>
          )}
        </div>
      </div>
    </div>
  );
}