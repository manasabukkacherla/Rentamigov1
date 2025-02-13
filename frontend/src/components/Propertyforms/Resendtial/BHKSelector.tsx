import React from 'react';

type BHKSelectorProps = {
  selected: string;
  onSelect: (bhk: string) => void;
};

export function BHKSelector({ selected, onSelect }: BHKSelectorProps) {
  const bhkOptions = [
    '1 RK', '1 BHK', '1.5 BHK', '2 BHK', '2.5 BHK',
    '3 BHK', '3.5 BHK', '4 BHK', '4.5 BHK', '5 BHK', '5+ BHK'
  ];

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        BHK <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap gap-4">
        {bhkOptions.map((option) => (
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