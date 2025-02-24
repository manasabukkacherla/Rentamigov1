import { useState } from 'react';
import { ArrowRight, Home } from 'lucide-react';

interface PropertySizeProps {
  onPropertySizeChange?: (size: string) => void;
  propertyType?: string;
}

const PropertySize = ({ onPropertySizeChange, propertyType }: PropertySizeProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');

  const getPropertySizes = () => {
    const baseSizes = [
      { id: 'studio', label: 'Studio Room', description: 'Single room apartment with attached bathroom' },
      { id: '1bhk', label: '1 BHK', description: '1 Bedroom, Hall, Kitchen' },
      { id: '2bhk', label: '2 BHK', description: '2 Bedrooms, Hall, Kitchen' },
      { id: '3bhk', label: '3 BHK', description: '3 Bedrooms, Hall, Kitchen' },
      { id: '3plus', label: '3+ BHK', description: 'More than 3 Bedrooms' }
    ];

    // Add Single Room - Shared option only for shared space property type
    if (propertyType === 'shared-space') {
      return [
        { 
          id: 'single-room-shared', 
          label: 'Single Room - Shared', 
          description: 'Single room in a shared accommodation' 
        },
        ...baseSizes
      ];
    }

    return baseSizes;
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    onPropertySizeChange?.(size);
  };

  const propertySizes = getPropertySizes();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Property Size</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Configuration</span>
      </div>

      <div className="space-y-4 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {propertySizes.map(({ id, label, description }) => (
            <button
              key={id}
              onClick={() => handleSizeSelect(id)}
              className={`flex flex-col p-4 rounded-lg border transition-all duration-200 ${
                selectedSize === id
                  ? 'bg-white text-black border-white'
                  : 'border-white/20 hover:border-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Home
                  size={20}
                  className={selectedSize === id ? 'text-black' : 'text-white/80'}
                />
                <h4 className="font-medium">{label}</h4>
              </div>
              <p
                className={`text-sm ${
                  selectedSize === id ? 'text-black/70' : 'text-white/60'
                }`}
              >
                {description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertySize;