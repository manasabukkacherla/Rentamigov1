import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface DgUpsChargesDetails {
  dgUpsCharges: boolean;
}

export default function DgUpsCharges() {
  const [formData, setFormData] = useState<DgUpsChargesDetails>({
    dgUpsCharges: false,
  });

  const handleToggle = () => {
    setFormData(prev => ({
      dgUpsCharges: !prev.dgUpsCharges,
    }));
  };

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">DG & UPS Charges</h2>

      <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-white">
        <Zap className="h-5 w-5 text-gray-400" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">
            DG & UPS Charges included? <span className="text-red-500">*</span>
          </h3>
        </div>
        <button
          type="button"
          onClick={handleToggle}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          style={{
            backgroundColor: formData.dgUpsCharges ? '#2563eb' : '#e5e7eb'
          }}
        >
          <span
            className={`${
              formData.dgUpsCharges ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
          <span className="sr-only">Toggle DG & UPS Charges</span>
        </button>
      </div>
    </div>
  );
}