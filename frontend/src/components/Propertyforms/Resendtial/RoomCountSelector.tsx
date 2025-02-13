import React from 'react';

type RoomCountSelectorProps = {
  label: string;
  selected: number;
  onSelect: (count: number) => void;
  maxCount: number;
};

export function RoomCountSelector({ label, selected, onSelect, maxCount }: RoomCountSelectorProps) {
  const options = Array.from({ length: maxCount + 1 }, (_, i) => i);

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((count) => (
          <button
            key={count}
            onClick={() => onSelect(count)}
            className={`px-6 py-3 rounded-lg ${
              selected === count
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-50 text-gray-700'
            }`}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}