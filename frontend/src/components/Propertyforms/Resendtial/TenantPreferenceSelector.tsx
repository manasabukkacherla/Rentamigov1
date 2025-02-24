import React from 'react';

type TenantPreferenceSelectorProps = {
  selected: string;
  onSelect: (preference: string) => void;
};

export function TenantPreferenceSelector({ selected, onSelect }: TenantPreferenceSelectorProps) {
  const options = ['Family', 'Bachelor', 'Company', 'Any'];

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Preferred Tenant <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-6 py-3 rounded-lg ${
              selected === option
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-50 text-gray-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}