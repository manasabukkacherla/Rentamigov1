import React, { useState } from 'react';
import { Store, Building2, Ruler, ArrowUpDown, IndianRupee } from 'lucide-react';

interface RetailPropertyDetails {
  suitableFor: string[];
  locationHub: string;
  otherLocationHub?: string;
  builtUpArea: string;
  carpetArea: string;
  entranceWidth: string;
  ceilingHeight: string;
  locatedNear: string[];
  ownership: string;
  expectedRent: string;
  securityDeposit: string;
}

export default function RetailPropertyDetail() {
  const [formData, setFormData] = useState<RetailPropertyDetails>({
    suitableFor: [],
    locationHub: '',
    otherLocationHub: '',
    builtUpArea: '',
    carpetArea: '',
    entranceWidth: '',
    ceilingHeight: '',
    locatedNear: [],
    ownership: '',
    expectedRent: '',
    securityDeposit: '',
  });

  const suitableForOptions = [
    'Jewellery', 'Gym', 'Grocery', 'Clinic', 'Footwear', 'Electronics', 'Clothing', 'Others'
  ];

  const locationHubOptions = [
    'Mall', 'Commercial Project', 'Residential Project', 'Retail Complex/Building', 'Market/High Street', 'Others'
  ];

  const locatedNearOptions = ['Entrance', 'Elevator', 'Stairs'];

  const ownershipOptions = [
    'Freehold', 'Leasehold', 'Cooperative society', 'Power of attorney'
  ];

  const handleMultiSelect = (field: 'suitableFor' | 'locatedNear', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleSingleSelect = (field: keyof RetailPropertyDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'locationHub' && value !== 'Others' && { otherLocationHub: '' }),
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const MultiSelectGroup = ({ 
    label, 
    field, 
    options,
    icon: Icon 
  }: { 
    label: string; 
    field: 'suitableFor' | 'locatedNear'; 
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
            onClick={() => handleMultiSelect(field, option)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${formData[field].includes(option)
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

  const SingleSelectGroup = ({ 
    label, 
    field, 
    options,
    icon: Icon 
  }: { 
    label: string; 
    field: keyof RetailPropertyDetails; 
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
    name: keyof RetailPropertyDetails;
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

  const MoneyInput = ({ 
    label, 
    name,
    required = true
  }: { 
    label: string; 
    name: 'expectedRent' | 'securityDeposit';
    required?: boolean;
  }) => (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <IndianRupee className="h-5 w-5 text-gray-400" />
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative w-full sm:w-[360px]">
        <input
          type="number"
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 text-sm">₹</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">About the Property</h2>

      <div className="space-y-6">
        <MultiSelectGroup
          label="Suitable For"
          field="suitableFor"
          options={suitableForOptions}
          icon={Store}
        />

        <SingleSelectGroup
          label="Location Hub"
          field="locationHub"
          options={locationHubOptions}
          icon={Building2}
        />

        {formData.locationHub === 'Others' && (
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Building2 className="h-5 w-5 text-gray-400" />
              Others (Location Hub) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="otherLocationHub"
              value={formData.otherLocationHub}
              onChange={handleInputChange}
              className="block w-full sm:w-[360px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter location hub"
            />
          </div>
        )}

        <MeasurementInput
          label="Built Up Area"
          name="builtUpArea"
          unit="sq. ft."
          icon={Ruler}
        />

        <MeasurementInput
          label="Carpet Area"
          name="carpetArea"
          unit="sq. ft."
          icon={Ruler}
        />

        <MeasurementInput
          label="Entrance Width"
          name="entranceWidth"
          unit="ft."
          icon={ArrowUpDown}
        />

        <MeasurementInput
          label="Ceiling Height"
          name="ceilingHeight"
          unit="ft."
          icon={ArrowUpDown}
        />

        <MultiSelectGroup
          label="Located Near"
          field="locatedNear"
          options={locatedNearOptions}
          icon={Building2}
        />

        <SingleSelectGroup
          label="Ownership"
          field="ownership"
          options={ownershipOptions}
          icon={Building2}
        />

        <MoneyInput
          label="Expected Rent"
          name="expectedRent"
        />

        <MoneyInput
          label="Security Deposit"
          name="securityDeposit"
          required={false}
        />
      </div>
    </div>
  );
}