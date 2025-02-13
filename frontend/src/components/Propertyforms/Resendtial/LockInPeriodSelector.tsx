import React from 'react';

type LockInPeriodSelectorProps = {
  selected: string;
  onSelect: (type: string) => void;
};

export function LockInPeriodSelector({ selected, onSelect }: LockInPeriodSelectorProps) {
  const options = ['None', '1 month', '6 month', 'Custom'];

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Lock-in Period <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap gap-4">
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