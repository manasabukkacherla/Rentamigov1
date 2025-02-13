import React from 'react';

type ParkingCountSelectorProps = {
  label: string;
  selected: number;
  onSelect: (count: number) => void;
};

export function ParkingCountSelector({ label, selected, onSelect }: ParkingCountSelectorProps) {
  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          value={selected}
          onChange={(e) => onSelect(parseInt(e.target.value) || 0)}
          placeholder="Enter number of parking spots"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <span className="text-gray-500 whitespace-nowrap">Spots</span>
      </div>
    </div>
  );
}