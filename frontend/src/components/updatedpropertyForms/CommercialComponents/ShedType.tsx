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
        return <Factory size={20} className="text-black/60" />;
      case 'agricultural':
        return <Tractor size={20} className="text-black/60" />;
      case 'workshop':
        return <Wrench size={20} className="text-black/60" />;
      case 'automobile':
        return <Car size={20} className="text-black/60" />;
      default:
        return <Warehouse size={20} className="text-black/60" />;
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-8">
        <Warehouse className="text-black mr-3" size={28} />
        <h3 className="text-2xl font-semibold text-black">Shed Type</h3>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Warehouse size={20} className="text-black/60" />
            <h4 className="text-lg font-medium text-black">Select Shed Type</h4>
          </div>
          
          <div className="space-y-2">
            {shedTypes.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <input
                  type="checkbox"
                  value={value}
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

export default ShedType;
