import React from 'react';

type MonthlyRentInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function MonthlyRentInput({ value, onChange }: MonthlyRentInputProps) {
  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Monthly Rent <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <span className="absolute left-3 top-2 text-gray-500">₹</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter monthly rent"
          className="pl-8 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}