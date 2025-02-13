import React, { useState } from 'react';
import { Building2, Ruler } from 'lucide-react';

interface PlotPropertyDetails {
  zoneType: string;
  plotArea: string;
  ownership: string;
}

export default function PlotProperty() {
  const [formData, setFormData] = useState<PlotPropertyDetails>({
    zoneType: '',
    plotArea: '',
    ownership: '',
  });

  const zoneTypeOptions = [
    'Industrial',
    'Commercial',
    'Residential',
    'Special economic zone',
    'Open Spaces',
    'Agricultural zone',
    'Others'
  ];

  const ownershipOptions = [
    'Freehold',
    'Leasehold',
    'Cooperative society',
    'Power of attorney'
  ];

  const handleSingleSelect = (field: keyof PlotPropertyDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const SingleSelectGroup = ({ 
    label, 
    field, 
    options,
    icon: Icon 
  }: { 
    label: string; 
    field: keyof PlotPropertyDetails; 
    options: string[];
    icon: React.ElementType;
  }) => (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon className="h-5 w-5 text-gray-400" />
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSingleSelect(field, option)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${formData[field] === option
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const MeasurementInput = ({ 
    label, 
    name,
    unit,
    icon: Icon
  }: { 
    label: string; 
    name: keyof PlotPropertyDetails;
    unit: string;
    icon: React.ElementType;
  }) => (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <Icon className="h-5 w-5 text-gray-400" />
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative w-full sm:w-[360px]">
        <input
          type="number"
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="block w-full pr-16 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 text-sm">{unit}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">About the Property</h2>

      <div className="space-y-6">
        <SingleSelectGroup
          label="Zone Type"
          field="zoneType"
          options={zoneTypeOptions}
          icon={Building2}
        />

        <MeasurementInput
          label="Plot Area"
          name="plotArea"
          unit="sq. ft."
          icon={Ruler}
        />

        <SingleSelectGroup
          label="Ownership"
          field="ownership"
          options={ownershipOptions}
          icon={Building2}
        />
      </div>
    </div>
  );
}