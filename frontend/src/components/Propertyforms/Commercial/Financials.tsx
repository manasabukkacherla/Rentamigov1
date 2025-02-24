import React, { useState } from 'react';
import { IndianRupee } from 'lucide-react';

interface FinancialsDetails {
  expectedRent: string;
  securityDeposit: string;
}

export default function Financials() {
  const [formData, setFormData] = useState<FinancialsDetails>({
    expectedRent: '',
    securityDeposit: '',
  });

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
    placeholder = "Enter amount"
  }: { 
    label: string; 
    name: keyof FinancialsDetails;
    required?: boolean;
    placeholder?: string;
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
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Basic Financials</h2>

      <div className="space-y-6">
        <MoneyInput 
          label="Expected Rent" 
          name="expectedRent"
          placeholder="Enter expected rent"
        />

        <MoneyInput 
          label="Security Deposit" 
          name="securityDeposit"
          required={false}
          placeholder="Enter security deposit"
        />
      </div>
    </div>
  );
}