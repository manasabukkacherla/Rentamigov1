import { useState } from 'react';
import { ArrowRight, Warehouse, Snowflake, Truck, Factory, ShoppingBag, FileCheck } from 'lucide-react';

interface WarehouseTypeProps {
  onWarehouseTypeChange?: (types: string[]) => void;
}

const WarehouseType = ({ onWarehouseTypeChange }: WarehouseTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type) 
        ? prev.filter((t) => t !== type) 
        : [...prev, type];
      onWarehouseTypeChange?.(updatedTypes);
      return updatedTypes;
    });
  };

  const warehouseTypes = [
    { value: 'general', label: 'General Warehouse' },
    { value: 'cold-storage', label: 'Cold Storage Warehouse' },
    { value: 'distribution', label: 'Distribution Center' },
    { value: 'industrial', label: 'Industrial Warehouse' },
    { value: 'ecommerce', label: 'E-Commerce Fulfillment Center' },
    { value: 'bonded', label: 'Bonded Warehouse' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'cold-storage':
        return <Snowflake size={20} className="text-white/60" />;
      case 'distribution':
        return <Truck size={20} className="text-white/60" />;
      case 'industrial':
        return <Factory size={20} className="text-white/60" />;
      case 'ecommerce':
        return <ShoppingBag size={20} className="text-white/60" />;
      case 'bonded':
        return <FileCheck size={20} className="text-white/60" />;
      default:
        return <Warehouse size={20} className="text-white/60" />;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Warehouse Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Warehouse Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Warehouse size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Warehouse Type</h4>
          </div>
          
          <div className="space-y-2">
            {warehouseTypes.map(({ value, label }) => (
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

export default WarehouseType;
