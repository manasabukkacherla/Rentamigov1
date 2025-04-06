import { useState } from 'react';
import { ArrowRight, Warehouse } from 'lucide-react';

interface CoveredOpenSpaceTypeProps {
  onSpaceTypeChange?: (types: string[]) => void;
}

const CoveredOpenSpaceType = ({ onSpaceTypeChange }: CoveredOpenSpaceTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type) 
        ? prev.filter((t) => t !== type) 
        : [...prev, type];
      onSpaceTypeChange?.(updatedTypes);
      return updatedTypes;
    });
  };

  const spaceTypes = [
    { value: 'open-yard', label: 'Open Yard' },
    { value: 'container-yard', label: 'Container Yard' },
    { value: 'event-space', label: 'Event Space' },
    { value: 'truck-parking', label: 'Truck Parking Lot' },
    { value: 'fenced-land', label: 'Fenced Open Land' }
  ];

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-8">
        <Warehouse className="text-black mr-3" size={28} />
        <h3 className="text-2xl font-semibold text-black">Covered/Open Space Type</h3>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Warehouse size={20} className="text-black/60" />
            <h4 className="text-lg font-medium text-black">Select Space Types</h4>
          </div>
          
          <div className="space-y-2">
            {spaceTypes.map(({ value, label }) => (
              <label 
                key={value} 
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(value)}
                  onChange={() => handleTypeChange(value)}
                  className="w-4 h-4 text-black bg-white border-2 border-gray-300 rounded focus:ring-black transition"
                />
                <span className="text-black">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoveredOpenSpaceType;