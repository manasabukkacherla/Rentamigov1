import { useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';

interface PlotTypeProps {
  onPlotTypeChange?: (types: string[]) => void;
}

const PlotType = ({ onPlotTypeChange }: PlotTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string, checked: boolean) => {
    const updatedTypes = checked 
      ? [...selectedTypes, type]
      : selectedTypes.filter(t => t !== type);
    
    setSelectedTypes(updatedTypes);
    onPlotTypeChange?.(updatedTypes);
  };

  const plotTypes = [
    { value: 'industrial', label: 'Industrial Plot' },
    { value: 'commercial', label: 'Commercial Plot' },
    { value: 'logistics', label: 'Logistics Park' },
    { value: 'retail', label: 'High-Street Retail Plot' }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Plot Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Plot Categories</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Plot Types</h4>
          </div>
          
          <div className="space-y-3">
            {plotTypes.map(({ value, label }) => (
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

export default PlotType;