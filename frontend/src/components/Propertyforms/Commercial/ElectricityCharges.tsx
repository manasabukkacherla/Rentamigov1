import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface ElectricityChargesDetails {
  isIncluded: boolean | null;
}

export default function ElectricityCharges() {
  const [formData, setFormData] = useState<ElectricityChargesDetails>({
    isIncluded: null,
  });

  const handleSelect = (value: boolean) => {
    setFormData({ isIncluded: value });
  };

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Electricity Charges</h2>

      <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-white">
        <Zap className="h-5 w-5 text-gray-400" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">
            Electricity charges included? <span className="text-red-500">*</span>
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleSelect(true)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors
              ${formData.isIncluded === true
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleSelect(false)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors
              ${formData.isIncluded === false
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}