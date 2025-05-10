import { useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';

interface OfficeSpaceTypeProps {
  onOfficeTypeChange?: (types: string[]) => void;
}

const OfficeSpaceType = ({ onOfficeTypeChange }: OfficeSpaceTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type) 
        ? prev.filter((t) => t !== type) 
        : [...prev, type];
      onOfficeTypeChange?.(updatedTypes);
      return updatedTypes;
    });
  };

  const officeTypes = [
    { value: 'business-center', label: 'Business Center' },
    { value: 'corporate', label: 'Corporate Office' },
    { value: 'coworking', label: 'Co-working Space' },
    { value: 'it-park', label: 'IT Park Office' },
    { value: 'commercial-complex', label: 'Commercial Complex' }
  ];

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-8">
        <Building2 className="text-black mr-3" size={28} />
        <h3 className="text-2xl font-semibold text-black">Office Space Type</h3>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={20} className="text-black/60" />
            <h4 className="text-lg font-medium text-black">Select Office Type</h4>
          </div>
          
          <div className="space-y-2">
            {officeTypes.map(({ value, label }) => (
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
                <span className="text-black">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeSpaceType;