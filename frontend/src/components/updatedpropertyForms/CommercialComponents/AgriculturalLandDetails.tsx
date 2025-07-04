import { useState } from 'react';
import { Ruler, Sprout, Droplets, Fence, Plane, FileCheck } from 'lucide-react';

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
    <div className="bg-white border border-black/10 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <Sprout className="text-black" size={28} />
          <h3 className="text-2xl font-semibold text-black">Agricultural Land Details</h3>
        </div>

        <div className="space-y-8">
          {/* Area and Soil */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Total Area */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-black flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                Total Land Area
              </h4>
              <input
                type="number"
                min="0"
                value={details.totalArea}
                onChange={(e) => handleChange('totalArea', e.target.value)}
                placeholder="Area in acres"
                className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>

            {/* Soil Type */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-black flex items-center gap-2">
                <Sprout className="w-5 h-5" />
                Soil Type
              </h4>
              <select
                value={details.soilType}
                onChange={(e) => handleChange('soilType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="" disabled>Select Soil Type</option>
                <option value="fertile">Fertile</option>
                <option value="barren">Barren</option>
                <option value="rocky">Rocky</option>
              </select>
            </div>
          </div>

          {/* Water and Fencing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Irrigation System */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-black flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                Irrigation System
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.irrigation}
                    onChange={() => handleChange('irrigation', true)}
                    className="text-black border-black/20 focus:ring-black"
                  />
                  <span className="text-black">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.irrigation}
                    onChange={() => handleChange('irrigation', false)}
                    className="text-black border-black/20 focus:ring-black"
                  />
                  <span className="text-black">Not Available</span>
                </label>
              </div>
            </div>

            {/* Fencing */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-black flex items-center gap-2">
                <Fence className="w-5 h-5" />
                Fencing
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.fencing}
                    onChange={() => handleChange('fencing', true)}
                    className="text-black border-black/20 focus:ring-black"
                  />
                  <span className="text-black">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.fencing}
                    onChange={() => handleChange('fencing', false)}
                    className="text-black border-black/20 focus:ring-black"
                  />
                  <span className="text-black">Not Available</span>
                </label>
              </div>
            </div>
          </div>

          {/* Crop Suitability and Water Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Crop Suitability */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-black flex items-center gap-2">
                <Plane className="w-5 h-5" />
                Crop Suitability
              </h4>
              <textarea
                value={details.cropSuitability}
                onChange={(e) => handleChange('cropSuitability', e.target.value)}
                placeholder="Enter types of crops suitable for cultivation"
                className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40 min-h-[100px]"
              />
            </div>

            {/* Water Source */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-black flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                Water Source
              </h4>
              <select
                value={details.waterSource}
                onChange={(e) => handleChange('waterSource', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="" disabled>Select Water Source</option>
                <option value="borewell">Borewell</option>
                <option value="canal">Canal</option>
                <option value="river">River</option>
                <option value="rainwater">Rainwater</option>
              </select>
            </div>
          </div>

          {/* Legal Clearances */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <FileCheck className="w-5 h-5" />
              Legal Clearances for Commercial Use
            </h4>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={details.legalClearances}
                  onChange={() => handleChange('legalClearances', true)}
                  className="text-black border-black/20 focus:ring-black"
                />
                <span className="text-black">Available</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!details.legalClearances}
                  onChange={() => handleChange('legalClearances', false)}
                  className="text-black border-black/20 focus:ring-black"
                />
                <span className="text-black">Not Available</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriculturalLandDetails;