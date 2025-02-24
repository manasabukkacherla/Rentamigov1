import { useState } from 'react';
import { ArrowRight, Store } from 'lucide-react';

interface ShopTypeProps {
  onShopTypeChange?: (type: string) => void;
}

const ShopType = ({ onShopTypeChange }: ShopTypeProps) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onShopTypeChange?.(type);
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
          
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select a shop type</option>
            {shopTypes.map(({ value, label }) => (
              <option key={value} value={value} className="bg-black">
                {label}
              </option>
            ))}
          </select>

          {selectedType && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <p className="text-white/80">
                {selectedType === 'single-unit' && 'A standalone shop unit ideal for individual retail businesses.'}
                {selectedType === 'corner' && 'Prime location shop with visibility from multiple sides.'}
                {selectedType === 'mall' && 'Shop space within a shopping mall complex with high foot traffic.'}
                {selectedType === 'kiosk' && 'Small, standalone retail space perfect for quick service businesses.'}
                {selectedType === 'multi-level' && 'Shop spanning multiple floors for expanded retail space.'}
                {selectedType === 'showroom' && 'Large format retail space ideal for product display and sales.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopType;