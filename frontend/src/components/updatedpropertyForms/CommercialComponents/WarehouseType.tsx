import { useEffect, useState } from 'react';
import { ArrowRight, Warehouse, Snowflake, Truck, Factory, ShoppingBag, FileCheck } from 'lucide-react';

interface WarehouseTypeProps {
  onWarehouseTypeChange?: (types: string[]) => void;
}

const WarehouseType = ({ onWarehouseTypeChange }: WarehouseTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // ✅ This effect ensures updates happen after render
  useEffect(() => {
    onWarehouseTypeChange?.(selectedTypes);
  }, [selectedTypes]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const warehouseTypes = [
    { value: 'general', label: 'General Warehouse' },
    { value: 'cold-storage', label: 'Cold Storage Warehouse' },
    { value: 'distribution', label: 'Distribution Center' },
    { value: 'industrial', label: 'Industrial Warehouse' },
    { value: 'ecommerce', label: 'E-Commerce Fulfillment Center' },
    { value: 'bonded', label: 'Bonded Warehouse' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'cold-storage':
        return <Snowflake size={20} className="text-black/60" />;
      case 'distribution':
        return <Truck size={20} className="text-black/60" />;
      case 'industrial':
        return <Factory size={20} className="text-black/60" />;
      case 'ecommerce':
        return <ShoppingBag size={20} className="text-black/60" />;
      case 'bonded':
        return <FileCheck size={20} className="text-black/60" />;
      default:
        return <Warehouse size={20} className="text-black/60" />;
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-8">
        <Warehouse className="text-black mr-3" size={28} />
        <h3 className="text-2xl font-semibold text-black">Warehouse Type</h3>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Warehouse size={20} className="text-black/60" />
            <h4 className="text-lg font-medium text-black">Select Warehouse Type</h4>
          </div>

          <div className="space-y-2">
            {warehouseTypes.map(({ value, label }) => (
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
                <div className="flex items-center gap-2">
                  {getIcon(value)}
                  <span className="text-black">{label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseType;
