import React from 'react';

type SecurityDepositSelectorProps = {
  selected: string;
  onSelect: (type: string) => void;
};

export function SecurityDepositSelector({ selected, onSelect }: SecurityDepositSelectorProps) {
  const options = ['None', '1 month', '2 month', 'Custom'];

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Security Deposit <span className="text-red-500">*</span>
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