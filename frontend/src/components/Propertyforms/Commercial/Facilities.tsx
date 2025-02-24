import React, { useState } from 'react';
import { Bath } from 'lucide-react';

interface FacilitiesDetails {
  privateWashrooms: string;
  publicWashrooms: string;
}

export default function Facilities() {
  const [formData, setFormData] = useState<FacilitiesDetails>({
    privateWashrooms: '',
    publicWashrooms: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const WashroomInput = ({ 
    label, 
    name,
  }: { 
    label: string; 
    name: keyof FacilitiesDetails;
  }) => (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <Bath className="h-5 w-5 text-gray-400" />
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative w-full sm:w-[360px]">
        <input
          type="number"
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          min="0"
          className="block w-full pr-16 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder={`Enter number of ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Facilities</h2>

      <div className="space-y-6">
        <WashroomInput
          label="Private Washrooms"
          name="privateWashrooms"
        />

        <WashroomInput
          label="Public Washrooms"
          name="publicWashrooms"
        />
      </div>
    </div>
  );
}