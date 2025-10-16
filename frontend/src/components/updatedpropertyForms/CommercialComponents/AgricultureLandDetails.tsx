import { useState } from 'react';
import { ArrowRight, Ruler, Building } from 'lucide-react';

interface AgricultureLandDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const AgricultureLandDetails = ({ onDetailsChange }: AgricultureLandDetailsProps) => {
  const [details, setDetails] = useState({
    plotArea: '',
    plotAreaUnit: 'sq.ft',
    plotLength: '',
    plotWidth: '',
    roadWidth: '',
    roadWidthUnit: 'ft',
    openSides: '1',
    cornerPlot: false,
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8 bg-gray-100">
        <div className="flex items-center mb-8">
          <Building className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Agriculture Land Details</h3>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg space-y-6">
          {/* Plot Area */}
          <div>
            <label htmlFor="plotArea" className="block text-gray-800 font-medium mb-2">
              Plot Area
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  id="plotArea"
                  value={details.plotArea}
                  onChange={(e) => handleChange('plotArea', e.target.value)}
                  placeholder="Enter plot area"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <select
                value={details.plotAreaUnit}
                onChange={(e) => handleChange('plotAreaUnit', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="sq.ft">Square Feet</option>
                <option value="sq.m">Square Meters</option>
                <option value="acres">Acres</option>
                <option value="hectares">Hectares</option>
              </select>
            </div>
          </div>

          {/* Plot Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="plotLength" className="block text-gray-800 font-medium mb-2">
                Plot Length
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="plotLength"
                  value={details.plotLength}
                  onChange={(e) => handleChange('plotLength', e.target.value)}
                  placeholder="Enter length"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div>
              <label htmlFor="plotWidth" className="block text-gray-800 font-medium mb-2">
                Plot Width
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="plotWidth"
                  value={details.plotWidth}
                  onChange={(e) => handleChange('plotWidth', e.target.value)}
                  placeholder="Enter width"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
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
                  type="text"
                  id="roadWidth"
                  value={details.roadWidth}
                  onChange={(e) => handleChange('roadWidth', e.target.value)}
                  placeholder="Enter road width"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <select
                value={details.roadWidthUnit}
                onChange={(e) => handleChange('roadWidthUnit', e.target.value)}
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
              onChange={(e) => handleChange('openSides', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          {/* Corner Plot */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={details.cornerPlot}
                onChange={(e) => handleChange('cornerPlot', e.target.checked)}
                className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="text-black">This is a corner plot</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgricultureLandDetails; 