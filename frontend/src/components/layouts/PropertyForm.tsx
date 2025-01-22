import React from 'react';
import { Home, User, Phone, LayoutGrid, Sofa, Compass } from 'lucide-react';
import { InputField } from './InputField';
import { SelectField } from './SelectField';

export interface FormData {
  propertyName: string;
  ownerName: string;
  ownerNumber: string;
  propertyType: string;
  propertyConfiguration: string;
  furnishingStatus: string;
  facing: string;
}

interface PropertyFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const PROPERTY_CONFIGURATIONS = [
  { value: 'Studio Room (1 RK)', label: 'Studio Room (1 RK)' },
  { value: '1 BHK', label: '1 BHK' },
  { value: '2 BHK', label: '2 BHK' },
  { value: '3 BHK', label: '3 BHK' },
  { value: '4 BHK', label: '4 BHK' },
  { value: '4+ BHK', label: '4+ BHK' },
];

const FURNISHING_STATUS = [
  { value: 'Unfurnished', label: 'Unfurnished' },
  { value: 'Semi Furnished', label: 'Semi Furnished' },
  { value: 'Fully Furnished', label: 'Fully Furnished' },
  { value: 'Partially Furnished', label: 'Partially Furnished' },
];

const FACING_OPTIONS = [
  { value: 'North', label: 'North' },
  { value: 'East', label: 'East' },
  { value: 'South', label: 'South' },
  { value: 'West', label: 'West' },
  { value: 'North-East', label: 'North-East' },
  { value: 'South-East', label: 'South-East' },
  { value: 'North-West', label: 'North-West' },
  { value: 'South-West', label: 'South-West' },
];

export function PropertyForm({ formData, setFormData }: PropertyFormProps) {
  const updateField = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Property Name Field */}
      <InputField
        label="Property Name"
        icon={Home}
        value={formData.propertyName}
        onChange={updateField('propertyName')}
        placeholder="Enter property name"
      />

      {/* Owner Name Field */}
      <InputField
        label="Owner Name"
        icon={User}
        value={formData.ownerName}
        onChange={updateField('ownerName')}
        placeholder="Enter the owner's name"
      />

      {/* Owner Number Field */}
      <InputField
        label="Owner Number"
        icon={Phone}
        value={formData.ownerNumber}
        onChange={updateField('ownerNumber')}
        type="tel"
        placeholder="Enter the contact number"
      />

      {/* Property Configuration Dropdown */}
      <SelectField
        label="Property Configuration"
        icon={LayoutGrid}
        value={formData.propertyConfiguration}
        onChange={updateField('propertyConfiguration')}
        options={PROPERTY_CONFIGURATIONS}
      />

      {/* Furnishing Status Dropdown */}
      <SelectField
        label="Furnishing Status"
        icon={Sofa}
        value={formData.furnishingStatus}
        onChange={updateField('furnishingStatus')}
        options={FURNISHING_STATUS}
      />

      {/* Facing Dropdown */}
      <SelectField
        label="Facing"
        icon={Compass}
        value={formData.facing}
        onChange={updateField('facing')}
        options={FACING_OPTIONS}
      />
    </div>
  );
}
