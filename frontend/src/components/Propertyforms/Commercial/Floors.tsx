import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface FloorDetails {
  totalFloors: string;
  yourFloor: string;
}

export default function Floors() {
  const [formData, setFormData] = useState<FloorDetails>({
    totalFloors: '',
    yourFloor: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Floors</h2>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="space-y-6">
          {/* Total Floors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Floors <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="totalFloors"
                  value={formData.totalFloors}
                  onChange={handleInputChange}
                  min="0"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter total floors"
                />
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                Total Floors
              </span>
            </div>
          </div>

          {/* Your Floor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Floor <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="yourFloor"
                  value={formData.yourFloor}
                  onChange={handleInputChange}
                  min="0"
                  max={formData.totalFloors}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter your floor"
                />
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                Floor Number
              </span>
            </div>
            {formData.totalFloors && formData.yourFloor && parseInt(formData.yourFloor) > parseInt(formData.totalFloors) && (
              <p className="mt-2 text-sm text-red-600">
                Your floor cannot be greater than total floors
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}