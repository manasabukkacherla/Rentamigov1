import { useState } from 'react';
import { Building } from 'lucide-react';

interface AgricultureLandTypeProps {
  onTypeChange?: (type: Record<string, any>) => void;
}

const AgricultureLandType = ({ onTypeChange }: AgricultureLandTypeProps) => {
  const [landType, setLandType] = useState({
    type: '',
    irrigationAvailable: false,
    waterSource: '',
    powerSupply: false,
  });

  const handleChange = (field: string, value: any) => {
    const updatedType = { ...landType, [field]: value };
    setLandType(updatedType);
    onTypeChange?.(updatedType);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Building className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Agriculture Land Type</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          {/* Land Type */}
          <div>
            <label htmlFor="landType" className="block text-gray-800 font-medium mb-2">
              Land Type
            </label>
            <select
              id="landType"
              value={landType.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
            >
              <option value="">Select land type</option>
              <option value="agricultural">Agricultural Land</option>
              <option value="farmland">Farmland</option>
              <option value="plantation">Plantation</option>
              <option value="orchard">Orchard</option>
            </select>
          </div>

          {/* Irrigation */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={landType.irrigationAvailable}
                onChange={(e) => handleChange('irrigationAvailable', e.target.checked)}
                className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="text-black">Irrigation Available</span>
            </label>
          </div>

          {/* Water Source */}
          {landType.irrigationAvailable && (
            <div>
              <label htmlFor="waterSource" className="block text-gray-800 font-medium mb-2">
                Water Source
              </label>
              <select
                id="waterSource"
                value={landType.waterSource}
                onChange={(e) => handleChange('waterSource', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="">Select water source</option>
                <option value="well">Well</option>
                <option value="borewell">Borewell</option>
                <option value="canal">Canal</option>
                <option value="river">River</option>
                <option value="lake">Lake</option>
              </select>
            </div>
          )}

          {/* Power Supply */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={landType.powerSupply}
                onChange={(e) => handleChange('powerSupply', e.target.checked)}
                className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="text-black">Power Supply Available</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgricultureLandType; 