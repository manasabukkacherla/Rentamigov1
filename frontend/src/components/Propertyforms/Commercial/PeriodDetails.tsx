import React, { useState } from 'react';
import { Clock, Percent } from 'lucide-react';

interface PeriodDetailsData {
  lockInPeriod: string;
  rentIncrease: string;
}

export default function PeriodDetails() {
  const [formData, setFormData] = useState<PeriodDetailsData>({
    lockInPeriod: '',
    rentIncrease: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const PeriodInput = ({ 
    label, 
    name,
    placeholder,
    icon: Icon
  }: { 
    label: string; 
    name: keyof PeriodDetailsData;
    placeholder: string;
    icon: React.ElementType;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative w-full sm:w-[360px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="number"
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Period Details</h2>

      <div className="space-y-6">
        <PeriodInput
          label="Lock-in Period"
          name="lockInPeriod"
          placeholder="Enter period in months"
          icon={Clock}
        />

        <PeriodInput
          label="Expected Rent Increase"
          name="rentIncrease"
          placeholder="Enter percentage"
          icon={Percent}
        />
      </div>
    </div>
  );
}