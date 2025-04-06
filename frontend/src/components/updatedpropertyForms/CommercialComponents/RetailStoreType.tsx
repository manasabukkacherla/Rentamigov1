import { useState } from 'react';
import { Store } from 'lucide-react';

interface RetailStoreTypeProps {
  onRetailTypeChange?: (types: string[]) => void;
}

const RetailStoreType = ({ onRetailTypeChange }: RetailStoreTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type) 
        ? prev.filter((t) => t !== type) 
        : [...prev, type];
      onRetailTypeChange?.(updatedTypes);
      return updatedTypes;
    });
  };

  const retailTypes = [
    { value: 'standalone', label: 'Standalone Retail Store' },
    { value: 'shopping-complex', label: 'Retail Space in a Shopping Complex' },
    { value: 'hypermarket', label: 'Hypermarket Space' },
    { value: 'strip-mall', label: 'Strip Mall Unit' },
    { value: 'pop-up', label: 'Pop-Up Store' }
  ];

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Store className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Retail Store Type</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Store size={20} className="text-black/60" />
            <h4 className="text-lg font-medium text-black">Select Store Type</h4>
          </div>
          
          <div className="space-y-2">
            {retailTypes.map(({ value, label }) => (
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

export default RetailStoreType;
