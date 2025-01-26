import React, { useState } from 'react';
import { IndianRupee, Wrench, Shield } from 'lucide-react';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface CommercialsData {
  _id: any;
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

export function PropertyCommercials({
  commercialsData,
  setCommercialsData,
}: PropertyCommercialsProps) {
  const [isValid, setIsValid] = useState({
    monthlyRent: true,
    maintenanceAmount: true,
    securityDeposit: true,
  });

  const handleChange = (field: keyof CommercialsData) => (value: string) => {
    setCommercialsData((prev) => ({ ...prev, [field]: value }));

    // Validate field
    if (!value) {
      setIsValid((prev) => ({ ...prev, [field]: false }));
      toast.error(`Please fill out ${field.replace(/([A-Z])/g, ' $1')}`);
    } else {
      setIsValid((prev) => ({ ...prev, [field]: true }));
    }
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
          className={!isValid.monthlyRent ? 'border-red-500' : ''}
        />
        {!isValid.monthlyRent && (
          <p className="text-sm text-red-500 mt-1">Monthly Rent is required.</p>
        )}

        <SelectField
          label="Maintenance"
          icon={Wrench}
          value={commercialsData.maintenance}
          onChange={handleChange('maintenance')}
          options={MAINTENANCE_OPTIONS}
        />

        {commercialsData.maintenance === 'Excluded' && (
          <>
            <InputField
              label="Maintenance Amount / Month"
              icon={Wrench}
              value={commercialsData.maintenanceAmount}
              onChange={handleChange('maintenanceAmount')}
              type="number"
              placeholder="Maintenance amount to be paid"
              className={!isValid.maintenanceAmount ? 'border-red-500' : ''}
            />
            {!isValid.maintenanceAmount && (
              <p className="text-sm text-red-500 mt-1">
                Maintenance Amount is required.
              </p>
            )}
          </>
        )}

        <InputField
          label="Security Deposit"
          icon={Shield}
          value={commercialsData.securityDeposit}
          onChange={handleChange('securityDeposit')}
          type="number"
          placeholder="Deposit for the property"
          className={!isValid.securityDeposit ? 'border-red-500' : ''}
        />
        {!isValid.securityDeposit && (
          <p className="text-sm text-red-500 mt-1">
            Security Deposit is required.
          </p>
        )}
      </div>
    </div>
  );
}
