import { useState } from 'react';
import { Building, Ruler } from 'lucide-react';

interface CoveredOpenSpaceDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const CoveredOpenSpaceDetails = ({ onDetailsChange }: CoveredOpenSpaceDetailsProps) => {
  const [details, setDetails] = useState({
    totalArea: 0,
    areaUnit: 'sq.ft',
    coveredArea: 0,
    openArea: 0,
    roadWidth: 0,
    roadWidthUnit: 'ft',
    ceilingHeight: 0,
    ceilingHeightUnit: 'ft',
    openSides: 1,
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Building className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Space Details</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          {/* Total Area */}
          <div>
            <label htmlFor="totalArea" className="block text-gray-800 font-medium mb-2">
              Total Area
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  id="totalArea"
                  value={details.totalArea || ''}
                  onChange={(e) => handleChange('totalArea', parseFloat(e.target.value) || 0)}
                  placeholder="Enter total area"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <select
                value={details.areaUnit || ''}
                onChange={(e) => handleChange('areaUnit', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="sq.ft">Square Feet</option>
                <option value="sq.m">Square Meters</option>
                <option value="acres">Acres</option>
                <option value="hectares">Hectares</option>
              </select>
            </div>
          </div>

          {/* Covered Area */}
          <div>
            <label htmlFor="coveredArea" className="block text-gray-800 font-medium mb-2">
              Covered Area
            </label>
            <div className="relative">
              <input
                type="number"
                id="coveredArea"
                value={details.coveredArea || ''}
                onChange={(e) => handleChange('coveredArea', parseFloat(e.target.value) || 0)}
                placeholder="Enter covered area"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
              <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Open Area */}
          <div>
            <label htmlFor="openArea" className="block text-gray-800 font-medium mb-2">
              Open Area
            </label>
            <div className="relative">
              <input
                type="number"
                id="openArea"
                value={details.openArea || ''}
                onChange={(e) => handleChange('openArea', parseFloat(e.target.value) || 0)}
                placeholder="Enter open area"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
              <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Road Width */}
          <div>
            <label htmlFor="roadWidth" className="block text-gray-800 font-medium mb-2">
              Road Width
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  id="roadWidth"
                  value={details.roadWidth || ''}
                  onChange={(e) => handleChange('roadWidth', parseFloat(e.target.value) || 0)}
                  placeholder="Enter road width"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <select
                value={details.roadWidthUnit || ''}
                onChange={(e) => handleChange('roadWidthUnit', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="ft">Feet</option>
                <option value="m">Meters</option>
              </select>
            </div>
          </div>

          {/* Ceiling Height */}
          <div>
            <label htmlFor="ceilingHeight" className="block text-gray-800 font-medium mb-2">
              Ceiling Height
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  id="ceilingHeight"
                  value={details.ceilingHeight || ''}
                  onChange={(e) => handleChange('ceilingHeight', parseFloat(e.target.value) || 0)}
                  placeholder="Enter ceiling height"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <select
                value={details.ceilingHeightUnit || ''}
                onChange={(e) => handleChange('ceilingHeightUnit', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="ft">Feet</option>
                <option value="m">Meters</option>
              </select>
            </div>
          </div>

          {/* Open Sides */}
          <div>
            <label htmlFor="openSides" className="block text-gray-800 font-medium mb-2">
              Number of Open Sides
            </label>
            <select
              id="openSides"
              value={details.openSides}
                onChange={(e) => handleChange('openSides', parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoveredOpenSpaceDetails;