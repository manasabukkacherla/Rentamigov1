import { useState } from 'react';
import { Ruler, Building2, Fence, Droplets, Zap, Loader as Road, Shield, History } from 'lucide-react';

interface PlotDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const PlotDetails = ({ onDetailsChange }: PlotDetailsProps) => {
  const [details, setDetails] = useState({
    totalArea: '',
    zoningType: '',
    boundaryWall: false,
    waterSewer: false,
    electricity: false,
    roadAccess: '',
    securityRoom: false,
    previousConstruction: {
      exists: false,
      details: ''
    }
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  const handleConstructionChange = (field: string, value: any) => {
    const updatedConstruction = { ...details.previousConstruction, [field]: value };
    handleChange('previousConstruction', updatedConstruction);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Building2 className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Plot Details</h3>
        </div>

        {/* Area and Zoning */}
        <div className="bg-white p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Total Area */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-black">
                <Ruler size={20} className="text-black" />
                Total Plot Area
              </h4>
              <input
                type="number"
                min="0"
                value={details.totalArea}
                onChange={(e) => handleChange('totalArea', e.target.value)}
                placeholder="Area in sq.ft"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>

            {/* Zoning Type */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-black">
                <Building2 size={20} className="text-black" />
                Zoning Type
              </h4>
              <select
                value={details.zoningType}
                onChange={(e) => handleChange('zoningType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="" disabled className="text-black bg-white">Select Zoning Type</option>
                <option value="commercial" className="text-black bg-white">Commercial</option>
                <option value="industrial" className="text-black bg-white">Industrial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Infrastructure */}
        <div className="bg-white p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Shield size={20} className="text-black" />
            Infrastructure
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={details.boundaryWall}
                  onChange={(e) => handleChange('boundaryWall', e.target.checked)}
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-black">Boundary Wall</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={details.waterSewer}
                  onChange={(e) => handleChange('waterSewer', e.target.checked)}
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-black">Water & Sewer Connection</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={details.electricity}
                  onChange={(e) => handleChange('electricity', e.target.checked)}
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-black">Electricity Connection</span>
              </label>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-black">
                <Road size={20} className="text-black" />
                Road Access
              </h4>
              <select
                value={details.roadAccess}
                onChange={(e) => handleChange('roadAccess', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="" disabled className="text-black bg-white">Select Road Access</option>
                <option value="main" className="text-black bg-white">Main Road</option>
                <option value="internal" className="text-black bg-white">Internal Road</option>
                <option value="both" className="text-black bg-white">Both</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Shield size={20} className="text-black" />
            Security
          </h4>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={details.securityRoom}
              onChange={(e) => handleChange('securityRoom', e.target.checked)}
              className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
            />
            <span className="text-black">Security Room Available</span>
          </label>
        </div>

        {/* Previous Construction */}
        <div className="bg-white p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <History size={20} className="text-black" />
            Previous Construction
          </h4>
          <div className="space-y-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={details.previousConstruction.exists}
                onChange={(e) => handleConstructionChange('exists', e.target.checked)}
                className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="text-black">Had Previous Construction</span>
            </label>
            {details.previousConstruction.exists && (
              <textarea
                value={details.previousConstruction.details}
                onChange={(e) => handleConstructionChange('details', e.target.value)}
                placeholder="Enter details of previous construction"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                rows={3}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotDetails;