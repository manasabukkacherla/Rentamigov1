import { useState } from 'react';
import { ArrowRight, Store } from 'lucide-react';

interface ShopTypeProps {
  Type: string[],
  onShopTypeChange?: (types: string[]) => void;
}

const ShopType = ({ Type, onShopTypeChange }: ShopTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(Type);

  const handleTypeChange = (type: string, checked: boolean) => {
    const updatedTypes = checked 
      ? [...selectedTypes, type]
      : selectedTypes.filter(t => t !== type);
    
    setSelectedTypes(updatedTypes);
    onShopTypeChange?.(updatedTypes);
  };

  const shopTypes = [
    { value: 'retail', label: 'Retail Shop' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'clothing', label: 'Clothing & Apparel' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'grocery', label: 'Grocery Store' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'salon', label: 'Salon & Beauty' },
    { value: 'service', label: 'Service Shop' }
  ];

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Store className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Shop Type</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black">Select Shop Categories</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shopTypes.map(({ value, label }) => (
                <label 
                  key={value} 
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(value)}
                    onChange={(e) => handleTypeChange(value, e.target.checked)}
                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="text-black">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopType;
