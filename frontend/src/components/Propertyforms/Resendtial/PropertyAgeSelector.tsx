import React from 'react';

type PropertyAgeSelectorProps = {
  selected: string;
  onSelect: (age: string) => void;
};

export function PropertyAgeSelector({ selected, onSelect }: PropertyAgeSelectorProps) {
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      onSelect(value ? `${value} years` : '');
    }
  };

  return (
    <div className="mb-8">
      <label className="block text-gray-700 mb-2">
        Age of Property <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={selected.replace(' years', '')}
          onChange={handleAgeChange}
          placeholder="Enter age in years"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <span className="text-gray-500">Years</span>
      </div>
    </div>
  );
}