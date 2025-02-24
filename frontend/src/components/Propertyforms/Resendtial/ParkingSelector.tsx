import React from 'react';

type ParkingSelectorProps = {
  selected: string;
  onSelect: (parking: string) => void;
};

export function ParkingSelector({ selected, onSelect }: ParkingSelectorProps) {
  const options = ['Two Wheeler', 'Four Wheeler', 'Both', 'None'];

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Parking <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4">
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