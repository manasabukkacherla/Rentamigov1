import { useState } from 'react';
import { ArrowRight, Ruler, Sprout, Droplets, Fence, Plane as Plant, FileCheck } from 'lucide-react';

interface AgriculturalLandDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const AgriculturalLandDetails = ({ onDetailsChange }: AgriculturalLandDetailsProps) => {
  const [details, setDetails] = useState({
    totalArea: '',
    soilType: '',
    irrigation: false,
    fencing: false,
    cropSuitability: '',
    waterSource: '',
    legalClearances: false
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Agricultural Land Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Land Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Area and Soil */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Total Area */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Ruler size={20} className="text-white/60" />
                Total Land Area
              </h4>
              <input
                type="number"
                min="0"
                value={details.totalArea}
                onChange={(e) => handleChange('totalArea', e.target.value)}
                placeholder="Area in acres"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>

            {/* Soil Type */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Sprout size={20} className="text-white/60" />
                Soil Type
              </h4>
              <select
                value={details.soilType}
                onChange={(e) => handleChange('soilType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Soil Type</option>
                <option value="fertile" className="bg-black">Fertile</option>
                <option value="barren" className="bg-black">Barren</option>
                <option value="rocky" className="bg-black">Rocky</option>
              </select>
            </div>
          </div>
        </div>

        {/* Water and Fencing */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Irrigation System */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Droplets size={20} className="text-white/60" />
                Irrigation System
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.irrigation}
                    onChange={() => handleChange('irrigation', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.irrigation}
                    onChange={() => handleChange('irrigation', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Fencing */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Fence size={20} className="text-white/60" />
                Fencing
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.fencing}
                    onChange={() => handleChange('fencing', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Done</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.fencing}
                    onChange={() => handleChange('fencing', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Done</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Crop and Water Source */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Crop Suitability */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Plant size={20} className="text-white/60" />
                Crop Suitability
              </h4>
              <textarea
                value={details.cropSuitability}
                onChange={(e) => handleChange('cropSuitability', e.target.value)}
                placeholder="Enter types of crops suitable for cultivation"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40 min-h-[100px]"
              />
            </div>

            {/* Water Source */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Droplets size={20} className="text-white/60" />
                Water Source
              </h4>
              <select
                value={details.waterSource}
                onChange={(e) => handleChange('waterSource', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Water Source</option>
                <option value="borewell" className="bg-black">Borewell</option>
                <option value="canal" className="bg-black">Canal</option>
                <option value="river" className="bg-black">River</option>
                <option value="rainwater" className="bg-black">Rainwater</option>
              </select>
            </div>
          </div>
        </div>

        {/* Legal Clearances */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <FileCheck size={20} className="text-white/60" />
            Legal Clearances for Commercial Use
          </h4>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={details.legalClearances}
                onChange={() => handleChange('legalClearances', true)}
                className="text-white border-white/20 bg-transparent focus:ring-white"
              />
              <span className="text-white/80">Available</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!details.legalClearances}
                onChange={() => handleChange('legalClearances', false)}
                className="text-white border-white/20 bg-transparent focus:ring-white"
              />
              <span className="text-white/80">Not Available</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriculturalLandDetails;