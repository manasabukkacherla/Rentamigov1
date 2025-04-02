import { useState } from 'react';
import { ArrowRight, Store } from 'lucide-react';

interface ShopTypeProps {
  onShopTypeChange?: (types: string[]) => void;
}

const ShopType = ({ onShopTypeChange }: ShopTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type) 
        ? prev.filter((t) => t !== type) 
        : [...prev, type];
      onShopTypeChange?.(updatedTypes);
      return updatedTypes;
    });
  };

  const shopTypes = [
    { value: 'single-unit', label: 'Single Unit Shop' },
    { value: 'corner', label: 'Corner Shop' },
    { value: 'mall', label: 'Mall Shop' },
    { value: 'kiosk', label: 'Kiosk' },
    { value: 'multi-level', label: 'Multi-Level Shop' },
    { value: 'showroom', label: 'Showroom Shop' }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Shop Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Shop Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Store size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Shop Type</h4>
          </div>
          
          <div className="space-y-2">
            {shopTypes.map(({ value, label }) => (
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

export default ShopType;
