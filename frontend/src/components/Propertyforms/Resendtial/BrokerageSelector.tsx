import React from 'react';

type BrokerageSelectorProps = {
  selected: string;
  onSelect: (type: string) => void;
};

export function BrokerageSelector({ selected, onSelect }: BrokerageSelectorProps) {
  const options = ['None', '15 Days', '30 Days', 'Custom'];

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Do you charge brokerage? <span className="text-red-500">*</span>
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