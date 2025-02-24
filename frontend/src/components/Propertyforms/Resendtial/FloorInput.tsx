import React from 'react';

type FloorInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function FloorInput({ value, onChange }: FloorInputProps) {
  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Floor No. <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter floor number"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
}