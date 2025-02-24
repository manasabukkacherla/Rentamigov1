import React, { useState } from 'react';

interface AdditionalFinancialsDetails {
  negotiable: boolean;
  dgUpsCharges: boolean;
  electricityCharges: boolean;
  waterCharges: boolean;
}

export default function AdditionalFinancials() {
  const [formData, setFormData] = useState<AdditionalFinancialsDetails>({
    negotiable: false,
    dgUpsCharges: false,
    electricityCharges: false,
    waterCharges: false,
  });

  const handleToggle = (field: keyof AdditionalFinancialsDetails) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const ToggleButton = ({ 
    label, 
    field,
    required = true 
  }: { 
    label: string; 
    field: keyof AdditionalFinancialsDetails;
    required?: boolean;
  }) => (
    <div className="flex items-center justify-between w-full sm:w-[360px]">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={() => handleToggle(field)}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        style={{
          backgroundColor: formData[field] ? '#2563eb' : '#e5e7eb'
        }}
      >
        <span
          className={`${
            formData[field] ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
        <span className="sr-only">Toggle {label}</span>
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Additional Financial Details</h2>

      <div className="space-y-4">
        <ToggleButton
          label="Negotiable"
          field="negotiable"
        />

        <ToggleButton
          label="DG & UPS Charge included?"
          field="dgUpsCharges"
        />

        <ToggleButton
          label="Electricity charges included?"
          field="electricityCharges"
        />

        <ToggleButton
          label="Water charges included?"
          field="waterCharges"
        />
      </div>
    </div>
  );
}