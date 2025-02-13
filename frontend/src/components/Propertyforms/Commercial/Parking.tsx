import React, { useState } from 'react';
import { Car } from 'lucide-react';

interface ParkingDetails {
  privateParking: boolean;
  publicParking: boolean;
}

export default function Parking() {
  const [formData, setFormData] = useState<ParkingDetails>({
    privateParking: false,
    publicParking: false,
  });

  const handleToggle = (field: keyof ParkingDetails) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const ToggleButton = ({ 
    label,
    field,
    icon: Icon
  }: { 
    label: string;
    field: keyof ParkingDetails;
    icon: React.ElementType;
  }) => (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-white">
      <Icon className="h-5 w-5 text-gray-400" />
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>
      </div>
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
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Parking</h2>

      <div className="space-y-4">
        <ToggleButton
          label="Private Parking"
          field="privateParking"
          icon={Car}
        />

        <ToggleButton
          label="Public Parking"
          field="publicParking"
          icon={Car}
        />
      </div>
    </div>
  );
}