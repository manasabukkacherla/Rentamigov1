import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface PlotTypeProps {
  onPlotTypeChange?: (types: string[]) => void;
}

const PlotType = ({ onPlotTypeChange }: PlotTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const plotTypes = [
    'Commercial Plot',
    'Industrial Plot',
    'Agricultural Plot',
    'Mixed Use Plot',
    'Residential Plot'
  ];

  const handleTypeChange = (type: string) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    
    setSelectedTypes(updatedTypes);
    onPlotTypeChange?.(updatedTypes);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Building2 className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Plot Type</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plotTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-black">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotType;