import { useState } from 'react';
import { ArrowRight, Sprout, Trees as Tree, Milk, Leaf, Fish } from 'lucide-react';

interface AgriculturalLandTypeProps {
  onLandTypeChange?: (type: string) => void;
}

const AgriculturalLandType = ({ onLandTypeChange }: AgriculturalLandTypeProps) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onLandTypeChange?.(type);
  };

  const landTypes = [
    { value: 'farmland', label: 'Farmland' },
    { value: 'orchard', label: 'Orchard Land' },
    { value: 'dairy', label: 'Dairy Farm Land' },
    { value: 'organic', label: 'Organic Farming Land' },
    { value: 'aquaculture', label: 'Aquaculture Land' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'orchard':
        return <Tree size={20} className="text-white/60" />;
      case 'dairy':
        return <Milk size={20} className="text-white/60" />;
      case 'organic':
        return <Leaf size={20} className="text-white/60" />;
      case 'aquaculture':
        return <Fish size={20} className="text-white/60" />;
      default:
        return <Sprout size={20} className="text-white/60" />;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Agricultural Land Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Land Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Sprout size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Land Type</h4>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select a land type</option>
            {landTypes.map(({ value, label }) => (
              <option key={value} value={value} className="bg-black">
                {label}
              </option>
            ))}
          </select>

          {selectedType && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                {getIcon(selectedType)}
                <h5 className="font-medium">Overview</h5>
              </div>
              <p className="text-white/80">
                {selectedType === 'farmland' && 'Fertile agricultural land suitable for crop cultivation and farming activities.'}
                {selectedType === 'orchard' && 'Specialized land for fruit tree cultivation and orchard development.'}
                {selectedType === 'dairy' && 'Land setup for dairy farming operations with necessary infrastructure.'}
                {selectedType === 'organic' && 'Certified land for organic farming practices and sustainable agriculture.'}
                {selectedType === 'aquaculture' && 'Land suitable for fish farming and aquaculture operations.'}
              </p>
            </div>
          )}

          {selectedType && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Key Features</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'farmland' && (
                    <>
                      <li>• Fertile soil quality</li>
                      <li>• Irrigation facilities</li>
                      <li>• Farm equipment storage</li>
                      <li>• Crop storage facilities</li>
                    </>
                  )}
                  {selectedType === 'orchard' && (
                    <>
                      <li>• Established trees</li>
                      <li>• Drip irrigation</li>
                      <li>• Fruit storage</li>
                      <li>• Processing area</li>
                    </>
                  )}
                  {selectedType === 'dairy' && (
                    <>
                      <li>• Animal housing</li>
                      <li>• Milking facilities</li>
                      <li>• Feed storage</li>
                      <li>• Waste management</li>
                    </>
                  )}
                  {selectedType === 'organic' && (
                    <>
                      <li>• Organic certification</li>
                      <li>• Natural fertilizers</li>
                      <li>• Composting area</li>
                      <li>• Buffer zones</li>
                    </>
                  )}
                  {selectedType === 'aquaculture' && (
                    <>
                      <li>• Water resources</li>
                      <li>• Pond infrastructure</li>
                      <li>• Aeration systems</li>
                      <li>• Processing units</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Ideal For</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'farmland' && (
                    <>
                      <li>• Crop cultivation</li>
                      <li>• Commercial farming</li>
                      <li>• Agricultural research</li>
                      <li>• Farming cooperatives</li>
                    </>
                  )}
                  {selectedType === 'orchard' && (
                    <>
                      <li>• Fruit cultivation</li>
                      <li>• Horticulture</li>
                      <li>• Agro-tourism</li>
                      <li>• Export farming</li>
                    </>
                  )}
                  {selectedType === 'dairy' && (
                    <>
                      <li>• Dairy farming</li>
                      <li>• Milk production</li>
                      <li>• Animal breeding</li>
                      <li>• Dairy processing</li>
                    </>
                  )}
                  {selectedType === 'organic' && (
                    <>
                      <li>• Organic farmers</li>
                      <li>• Health food producers</li>
                      <li>• Sustainable agriculture</li>
                      <li>• Export markets</li>
                    </>
                  )}
                  {selectedType === 'aquaculture' && (
                    <>
                      <li>• Fish farming</li>
                      <li>• Seafood production</li>
                      <li>• Aquatic breeding</li>
                      <li>• Research facilities</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgriculturalLandType;