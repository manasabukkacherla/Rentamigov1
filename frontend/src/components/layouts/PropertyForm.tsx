import React from 'react';
import { Building2, LayoutGrid, Sofa, Compass } from 'lucide-react';
import { SelectField } from './SelectField';

export interface FormData {
  propertyType: string;
  propertyConfiguration: string;
  furnishingStatus: string;
  facing: string;
}

interface PropertyFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const PROPERTY_TYPES = [
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Standalone Building', label: 'Standalone Building' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Row House', label: 'Row House' },
];

const PROPERTY_CONFIGURATIONS = [
  { value: 'Studio Room (1 RK)', label: 'Studio Room (1 RK)' },
  { value: '1 BHK', label: '1 BHK' },
  { value: '2 BHK', label: '2 BHK' },
  { value: '3 BHK', label: '3 BHK' },
  { value: '3+ BHK', label: '3+ BHK' },
];

const FURNISHING_STATUS = [
  { value: 'Unfurnished', label: 'Unfurnished' },
  { value: 'Semi Furnished', label: 'Semi Furnished' },
  { value: 'Fully Furnished', label: 'Fully Furnished' },
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectField
        label="Property Type"
        icon={Building2}
        value={formData.propertyType}
        onChange={(value) => setFormData((prev) => ({ ...prev, propertyType: value }))}
        options={PROPERTY_TYPES}
      />

      <SelectField
        label="Property Configuration"
        icon={LayoutGrid}
        value={formData.propertyConfiguration}
        onChange={(value) => setFormData((prev) => ({ ...prev, propertyConfiguration: value }))}
        options={PROPERTY_CONFIGURATIONS}
      />

      <SelectField
        label="Furnishing Status"
        icon={Sofa}
        value={formData.furnishingStatus}
        onChange={(value) => setFormData((prev) => ({ ...prev, furnishingStatus: value }))}
        options={FURNISHING_STATUS}
      />

      <SelectField
        label="Facing"
        icon={Compass}
        value={formData.facing}
        onChange={(value) => setFormData((prev) => ({ ...prev, facing: value }))}
        options={FACING_OPTIONS}
      />
    </div>
  );
}