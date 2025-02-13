import React from 'react';

type TransactionTypeSelectorProps = {
  selected: string;
  onSelect: (type: string) => void;
};

export function TransactionTypeSelector({ selected, onSelect }: TransactionTypeSelectorProps) {
  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Transaction Type <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4">
        {['New Booking', 'Resale'].map((type) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`px-6 py-3 rounded-lg ${
              selected === type
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-50 text-gray-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}