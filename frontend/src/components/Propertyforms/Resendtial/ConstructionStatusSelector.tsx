import React from 'react';

type ConstructionStatusSelectorProps = {
  selected: string;
  onSelect: (status: string) => void;
};

export function ConstructionStatusSelector({ selected, onSelect }: ConstructionStatusSelectorProps) {
  const statuses = ['Ready to Move', 'Under Construction'];

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Construction Status <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onSelect(status)}
            className={`px-6 py-3 rounded-lg ${
              selected === status
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-50 text-gray-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}