import React, { useState } from 'react';

type AccommodationType = 'boys' | 'girls' | 'both';

const PgFor = () => {
  const [selectedType, setSelectedType] = useState<AccommodationType>('both');

  const options = [
    { id: 'boys', label: 'Boys Only' },
    { id: 'girls', label: 'Girls Only' },
    { id: 'both', label: 'Both Boys & Girls' },
  ];

  return (
    <div className="p-6 bg-white text-black">
      <h1 className="text-2xl font-bold mb-6">PG Accommodation Type</h1>
      
      <div className="flex flex-col sm:flex-row gap-6">
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              type="radio"
              id={option.id}
              name="pgType"
              value={option.id}
              checked={selectedType === option.id}
              onChange={(e) => setSelectedType(e.target.value as AccommodationType)}
              className="h-5 w-5 border-black bg-white checked:bg-black focus:ring-black focus:ring-2"
            />
            <label htmlFor={option.id} className="ml-3 text-lg">
              {option.label}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-black">
        <p className="text-sm">
          Selected accommodation type: <span className="font-semibold">{options.find(opt => opt.id === selectedType)?.label}</span>
        </p>
      </div>
    </div>
  );
};

export default PgFor;