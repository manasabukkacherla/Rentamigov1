import React from 'react';

type MaintenanceChargesSelectorProps = {
  selected: string;
  onSelect: (type: string) => void;
};

export function MaintenanceChargesSelector({ selected, onSelect }: MaintenanceChargesSelectorProps) {
  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Maintenance Charges <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4">
        <button
          onClick={() => onSelect('include')}
          className={`px-6 py-3 rounded-lg ${
            selected === 'include'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-gray-50 text-gray-700'
          }`}
        >
          Include in rent
        </button>
        <button
          onClick={() => onSelect('separate')}
          className={`px-6 py-3 rounded-lg ${
            selected === 'separate'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-gray-50 text-gray-700'
          }`}
        >
          Separate
        </button>
      </div>
    </div>
  );
}