import React from 'react';

type DateSelectorProps = {
  label: string;
  selected: string;
  onSelect: (date: string) => void;
};

export function DateSelector({ label, selected, onSelect }: DateSelectorProps) {
  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
}