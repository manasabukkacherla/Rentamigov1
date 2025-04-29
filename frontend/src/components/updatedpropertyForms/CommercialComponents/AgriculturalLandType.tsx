import { useState } from 'react';
import { Sprout, Droplets, Zap } from 'lucide-react';

interface AgriculturalLandTypeProps {
  onLandTypeChange?: (types: string[]) => void;
}

const AgriculturalLandType = ({ onLandTypeChange }: AgriculturalLandTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [waterSource, setWaterSource] = useState('');
  const [powerSupply, setPowerSupply] = useState<boolean | null>(null);

  const handleTypeChange = (type: string, checked: boolean) => {
    const updatedTypes = checked 
      ? [...selectedTypes, type]
      : selectedTypes.filter(t => t !== type);
    
    setSelectedTypes(updatedTypes);
    onLandTypeChange?.(updatedTypes);
  };

  const landTypes = [
    { value: 'farmland', label: 'Farmland', icon: <Sprout className="w-5 h-5" /> },
    { value: 'orchard', label: 'Orchard Land', icon: <Sprout className="w-5 h-5" /> },
    { value: 'dairy', label: 'Dairy Farm Land', icon: <Sprout className="w-5 h-5" /> },
    { value: 'organic', label: 'Organic Farming Land', icon: <Sprout className="w-5 h-5" /> },
    { value: 'aquaculture', label: 'Aquaculture Land', icon: <Sprout className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-gray-100 border border-black/10 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <Sprout className="text-black" size={28} />
          <h3 className="text-2xl font-semibold text-black">Agricultural Land Type</h3>
        </div>

        <div className="space-y-8">
          {/* Land Types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {landTypes.map((type) => (
              <label 
                key={type.value} 
                className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  selectedTypes.includes(type.value)
                    ? 'border-black bg-white'
                    : 'border-black/10 hover:border-black/20 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.value)}
                  onChange={(e) => handleTypeChange(type.value, e.target.checked)}
                  className="w-5 h-5 text-black border-black/20 rounded focus:ring-black bg-white"
                />
                <div className="flex items-center space-x-2">
                  {type.icon}
                  <span className="text-black">{type.label}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-black flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                Water Source
              </h4>
              <select
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="">Select water source</option>
                <option value="well">Well</option>
                <option value="borewell">Borewell</option>
                <option value="canal">Canal</option>
                <option value="river">River</option>
                <option value="lake">Lake</option>
              </select>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium text-black flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Power Supply
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="powerSupply"
                    checked={powerSupply === true}
                    onChange={() => setPowerSupply(true)}
                    className="text-black border-black/20 focus:ring-black"
                  />
                  <span className="text-black">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="powerSupply"
                    checked={powerSupply === false}
                    onChange={() => setPowerSupply(false)}
                    className="text-black border-black/20 focus:ring-black"
                  />
                  <span className="text-black">Not Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriculturalLandType;