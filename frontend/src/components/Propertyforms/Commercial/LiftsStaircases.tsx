import React, { useState } from 'react';
import { Stars as Stairs, ArrowUpDown } from 'lucide-react';

interface LiftsStaircasesDetails {
  staircaseCount: string;
  passengerLifts: string;
  serviceLifts: string;
}

export default function LiftsStaircases() {
  const [formData, setFormData] = useState<LiftsStaircasesDetails>({
    staircaseCount: '',
    passengerLifts: '',
    serviceLifts: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const NumberInput = ({ 
    label, 
    name,
    icon: Icon,
    required = true,
    placeholder = "Enter number",
    suffix
  }: { 
    label: string; 
    name: keyof LiftsStaircasesDetails;
    icon: React.ElementType;
    required?: boolean;
    placeholder?: string;
    suffix: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            min="0"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder={placeholder}
          />
        </div>
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {suffix}
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Lifts & Staircases</h2>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="space-y-6">
          <NumberInput 
            label="Number of Staircase" 
            name="staircaseCount"
            icon={Stairs}
            required={false}
            placeholder="Enter number"
            suffix="Staircases"
          />

          <NumberInput 
            label="Passengers Lifts" 
            name="passengerLifts"
            icon={ArrowUpDown}
            placeholder="Enter number"
            suffix="Lifts"
          />

          <NumberInput 
            label="Service Lifts" 
            name="serviceLifts"
            icon={ArrowUpDown}
            placeholder="Enter number"
            suffix="Lifts"
          />
        </div>
      </div>
    </div>
  );
}