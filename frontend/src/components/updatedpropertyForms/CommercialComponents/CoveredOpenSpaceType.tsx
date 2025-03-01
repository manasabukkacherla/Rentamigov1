import { useState } from 'react';
import { ArrowRight, Warehouse } from 'lucide-react';

interface CoveredOpenSpaceTypeProps {
  onSpaceTypeChange?: (types: string[]) => void;
}

const CoveredOpenSpaceType = ({ onSpaceTypeChange }: CoveredOpenSpaceTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string, checked: boolean) => {
    const updatedTypes = checked 
      ? [...selectedTypes, type]
      : selectedTypes.filter(t => t !== type);
    
    setSelectedTypes(updatedTypes);
    onSpaceTypeChange?.(updatedTypes);
  };

  const spaceTypes = [
    { value: 'open-yard', label: 'Open Yard' },
    { value: 'container-yard', label: 'Container Yard' },
    { value: 'event-space', label: 'Event Space' },
    { value: 'truck-parking', label: 'Truck Parking Lot' },
    { value: 'fenced-land', label: 'Fenced Open Land' }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Covered/Open Space Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Space Categories</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Warehouse size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Space Types</h4>
          </div>
          
          <div className="space-y-3">
            {spaceTypes.map(({ value, label }) => (
              <label 
                key={value} 
                className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(value)}
                  onChange={(e) => handleTypeChange(value, e.target.checked)}
                  className="rounded border-white/20 bg-transparent focus:ring-white text-white"
                />
                <span className="text-white/80">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoveredOpenSpaceType;