import { useState } from 'react';
import { ArrowRight, Warehouse, Factory, Tractor, Wrench, Car } from 'lucide-react';

interface ShedTypeProps {
  onShedTypeChange?: (types: string[]) => void;
}

const ShedType = ({ onShedTypeChange }: ShedTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type) 
        ? prev.filter((t) => t !== type) 
        : [...prev, type];
      onShedTypeChange?.(updatedTypes);
      return updatedTypes;
    });
  };

  const shedTypes = [
    { value: 'industrial', label: 'Industrial Shed' },
    { value: 'godown', label: 'Godown Shed' },
    { value: 'agricultural', label: 'Agricultural Shed' },
    { value: 'workshop', label: 'Workshop Shed' },
    { value: 'automobile', label: 'Automobile Shed' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'industrial':
        return <Factory size={20} className="text-white/60" />;
      case 'agricultural':
        return <Tractor size={20} className="text-white/60" />;
      case 'workshop':
        return <Wrench size={20} className="text-white/60" />;
      case 'automobile':
        return <Car size={20} className="text-white/60" />;
      default:
        return <Warehouse size={20} className="text-white/60" />;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Shed Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Shed Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Warehouse size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Shed Type</h4>
          </div>
          
          <div className="space-y-2">
            {shedTypes.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedTypes.includes(value)}
                  onChange={() => handleTypeChange(value)}
                  className="w-4 h-4 text-blue-500 bg-transparent border border-white/20 rounded focus:ring-2 focus:ring-white transition"
                />
                <span className="text-white">{label}</span>
              </label>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ShedType;
