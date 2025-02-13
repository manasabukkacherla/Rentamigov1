import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface PossessionDetails {
  possessionStatus: 'ready' | 'construction' | '';
  availableFrom: string;
  ageOfProperty?: number;
}

export default function PossessionInfo() {
  const [formData, setFormData] = useState<PossessionDetails>({
    possessionStatus: '',
    availableFrom: '',
    ageOfProperty: undefined,
  });
  const [errors, setErrors] = useState<Partial<PossessionDetails>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset ageOfProperty when switching to construction
      ...(name === 'possessionStatus' && value === 'construction' && {
        ageOfProperty: undefined,
      }),
    }));
    // Clear error when user starts typing
    if (errors[name as keyof PossessionDetails]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Possession Info</h2>
      
      <div className="space-y-6">
        {/* Possession Status Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Possession Status <span className="text-red-500">*</span>
          </label>
          <div className="w-full sm:w-[360px]">
            <select
              name="possessionStatus"
              value={formData.possessionStatus}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            >
              <option value="">Select status</option>
              <option value="ready">Ready to move</option>
              <option value="construction">Under construction</option>
            </select>
          </div>
        </div>

        {/* Conditional Fields based on Possession Status */}
        {formData.possessionStatus && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available From <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full sm:w-[360px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>
        )}

        {/* Age of Property - Only show for Ready to Move */}
        {formData.possessionStatus === 'ready' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age of Property (in years) <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full sm:w-[360px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="ageOfProperty"
                value={formData.ageOfProperty || ''}
                onChange={handleChange}
                min="0"
                step="1"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Enter age in years"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}