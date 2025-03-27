import { useState } from 'react';
import { ArrowRight, Sprout } from 'lucide-react';

interface AgriculturalLandTypeProps {
  onLandTypeChange?: (types: string[]) => void;
}

const AgriculturalLandType = ({ onLandTypeChange }: AgriculturalLandTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string, checked: boolean) => {
    const updatedTypes = checked 
      ? [...selectedTypes, type]
      : selectedTypes.filter(t => t !== type);
    
    setSelectedTypes(updatedTypes);
    onLandTypeChange?.(updatedTypes);
  };

  const landTypes = [
    { value: 'farmland', label: 'Farmland' },
    { value: 'orchard', label: 'Orchard Land' },
    { value: 'dairy', label: 'Dairy Farm Land' },
    { value: 'organic', label: 'Organic Farming Land' },
    { value: 'aquaculture', label: 'Aquaculture Land' }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Agricultural Land Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Land Categories</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Sprout size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Land Types</h4>
          </div>
          
          <div className="space-y-3">
            {landTypes.map(({ value, label }) => (
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

export default AgriculturalLandType;