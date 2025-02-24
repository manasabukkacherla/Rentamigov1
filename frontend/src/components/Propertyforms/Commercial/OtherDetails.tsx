import React, { useState } from 'react';
import { Building2, IndianRupee, Clock, Percent } from 'lucide-react';

interface OtherDetailsData {
  isPreLeased: boolean | null;
  currentRent?: string;
  leaseYears?: string;
  expectedRoi?: string;
}

export default function OtherDetails() {
  const [formData, setFormData] = useState<OtherDetailsData>({
    isPreLeased: null,
    currentRent: '',
    leaseYears: '',
    expectedRoi: '',
  });

  const handleSelect = (value: boolean) => {
    setFormData(prev => ({
      ...prev,
      isPreLeased: value,
      // Reset fields when switching
      currentRent: value ? '' : undefined,
      leaseYears: value ? '' : undefined,
      expectedRoi: !value ? '' : undefined,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const MoneyInput = ({ 
    label,
    name,
    required = true,
  }: { 
    label: string;
    name: 'currentRent';
    required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative w-full sm:w-[360px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IndianRupee className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="number"
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          placeholder="Enter amount"
        />
      </div>
    </div>
  );

  const YearInput = ({ 
    label,
    name,
    icon: Icon,
  }: { 
    label: string;
    name: 'leaseYears';
    icon: React.ElementType;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
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
          placeholder="Enter years"
        />
      </div>
    </div>
  );

  const RoiInput = ({ 
    label,
    name,
    icon: Icon,
  }: { 
    label: string;
    name: 'expectedRoi';
    icon: React.ElementType;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
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
          placeholder="Enter percentage"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500">%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Other Details</h2>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Building2 className="h-5 w-5 text-gray-400" />
            Is it pre-leased/pre-rented? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleSelect(true)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                ${formData.isPreLeased === true
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleSelect(false)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                ${formData.isPreLeased === false
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Conditional Fields */}
        {formData.isPreLeased === true && (
          <div className="space-y-6">
            <MoneyInput 
              label="Current Rent per month"
              name="currentRent"
            />
            <YearInput
              label="Lease years"
              name="leaseYears"
              icon={Clock}
            />
          </div>
        )}

        {formData.isPreLeased === false && (
          <RoiInput
            label="Expected Return on Investment"
            name="expectedRoi"
            icon={Percent}
          />
        )}
      </div>
    </div>
  );
}