import React from 'react';

type AreaInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export function AreaInput({ label, value, onChange, required = false }: AreaInputProps) {
  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter area"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <span className="text-gray-500">Sq. ft.</span>
      </div>
    </div>
  );
}