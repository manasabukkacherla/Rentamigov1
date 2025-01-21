import React from 'react';
import { IndianRupee, Wrench, Shield } from 'lucide-react';
import { InputField } from './InputField';
import { SelectField } from './SelectField';

export interface CommercialsData {
  monthlyRent: string;
  maintenance: string;
  maintenanceAmount: string;
  securityDeposit: string;
}

interface PropertyCommercialsProps {
  commercialsData: CommercialsData;
  setCommercialsData: React.Dispatch<React.SetStateAction<CommercialsData>>;
}

const MAINTENANCE_OPTIONS = [
  { value: 'Included', label: 'Included' },
  { value: 'Excluded', label: 'Excluded' },
];

export function PropertyCommercials({ commercialsData, setCommercialsData }: PropertyCommercialsProps) {
  const handleChange = (field: keyof CommercialsData) => (value: string) => {
    setCommercialsData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Monthly Rent"
          icon={IndianRupee}
          value={commercialsData.monthlyRent}
          onChange={handleChange('monthlyRent')}
          type="number"
          placeholder="Rent for the property per month"
        />

        <SelectField
          label="Maintenance"
          icon={Wrench}
          value={commercialsData.maintenance}
          onChange={handleChange('maintenance')}
          options={MAINTENANCE_OPTIONS}
        />

        {commercialsData.maintenance === 'Excluded' && (
          <InputField
            label="Maintenance Amount / Month"
            icon={Wrench}
            value={commercialsData.maintenanceAmount}
            onChange={handleChange('maintenanceAmount')}
            type="number"
            placeholder="Maintenance amount to be paid"
          />
        )}

        <InputField
          label="Security Deposit"
          icon={Shield}
          value={commercialsData.securityDeposit}
          onChange={handleChange('securityDeposit')}
          type="number"
          placeholder="Deposit for the property"
        />
      </div>
    </div>
  );
}