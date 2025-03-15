import { useState } from 'react';
import { ArrowRight, Ruler, Building2, Fence, Droplets, Zap, Loader as Road, Shield, History } from 'lucide-react';

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
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Plot Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Plot Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Area and Zoning */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Total Area */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Ruler size={20} className="text-white/60" />
                Total Plot Area
              </h4>
              <input
                type="number"
                min="0"
                value={details.totalArea}
                onChange={(e) => handleChange('totalArea', e.target.value)}
                placeholder="Area in sq.ft"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>

            {/* Zoning Type */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Building2 size={20} className="text-white/60" />
                Zoning Type
              </h4>
              <select
                value={details.zoningType}
                onChange={(e) => handleChange('zoningType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Zoning Type</option>
                <option value="commercial" className="bg-black">Commercial</option>
                <option value="industrial" className="bg-black">Industrial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Infrastructure */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Boundary Wall */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Fence size={20} className="text-white/60" />
                Boundary Wall
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.boundaryWall}
                    onChange={() => handleChange('boundaryWall', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Constructed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.boundaryWall}
                    onChange={() => handleChange('boundaryWall', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Constructed</span>
                </label>
              </div>
            </div>

            {/* Water & Sewer */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Droplets size={20} className="text-white/60" />
                Water & Sewer Connection
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.waterSewer}
                    onChange={() => handleChange('waterSewer', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.waterSewer}
                    onChange={() => handleChange('waterSewer', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Electricity */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Zap size={20} className="text-white/60" />
                Electricity Connection
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.electricity}
                    onChange={() => handleChange('electricity', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.electricity}
                    onChange={() => handleChange('electricity', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Access and Security */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Road Access */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Road size={20} className="text-white/60" />
                Road Access Type
              </h4>
              <select
                value={details.roadAccess}
                onChange={(e) => handleChange('roadAccess', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Road Type</option>
                <option value="paved" className="bg-black">Paved</option>
                <option value="gravel" className="bg-black">Gravel</option>
                <option value="dirt" className="bg-black">Dirt</option>
              </select>
            </div>

            {/* Security Room */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Shield size={20} className="text-white/60" />
                Security Room
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.securityRoom}
                    onChange={() => handleChange('securityRoom', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.securityRoom}
                    onChange={() => handleChange('securityRoom', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Construction */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <History size={20} className="text-white/60" />
            Previous Construction
          </h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={details.previousConstruction.exists}
                  onChange={() => handleConstructionChange('exists', true)}
                  className="text-white border-white/20 bg-transparent focus:ring-white"
                />
                <span className="text-white/80">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!details.previousConstruction.exists}
                  onChange={() => handleConstructionChange('exists', false)}
                  className="text-white border-white/20 bg-transparent focus:ring-white"
                />
                <span className="text-white/80">No</span>
              </label>
            </div>
            {details.previousConstruction.exists && (
              <textarea
                value={details.previousConstruction.details}
                onChange={(e) => handleConstructionChange('details', e.target.value)}
                placeholder="Provide details about previous construction"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40 min-h-[100px]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotDetails;