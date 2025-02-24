import React, { useState } from 'react';

interface NegotiableDetails {
  negotiable: boolean;
}

export default function Negotiable() {
  const [formData, setFormData] = useState<NegotiableDetails>({
    negotiable: false,
  });

  const handleToggle = () => {
    setFormData(prev => ({
      negotiable: !prev.negotiable,
    }));
  };

  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Negotiable</h2>

      <div className="flex items-center justify-between w-full sm:w-[360px] p-4 rounded-lg border border-gray-100 bg-white">
        <label className="text-sm font-medium text-gray-700">
          Negotiable <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          onClick={handleToggle}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          style={{
            backgroundColor: formData.negotiable ? '#2563eb' : '#e5e7eb'
          }}
        >
          <span
            className={`${
              formData.negotiable ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
          <span className="sr-only">Toggle Negotiable</span>
        </button>
      </div>
    </div>
  );
}