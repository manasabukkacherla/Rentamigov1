import { useState } from 'react';
import { ArrowRight, Ruler, Store, Shield, Fence, Cloud, Zap, Lightbulb } from 'lucide-react';

interface CoveredOpenSpaceDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const CoveredOpenSpaceDetails = ({ onDetailsChange }: CoveredOpenSpaceDetailsProps) => {
  const [details, setDetails] = useState({
    totalArea: '',
    usageType: '',
    security: false,
    perimeter: false,
    rainShelter: false,
    powerBackup: false,
    lighting: false
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Covered/Open Space Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Space Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Area and Usage */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Total Area */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Ruler size={20} className="text-white/60" />
                Total Area
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

            {/* Usage Type */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Store size={20} className="text-white/60" />
                Usage Type
              </h4>
              <select
                value={details.usageType}
                onChange={(e) => handleChange('usageType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Usage Type</option>
                <option value="parking" className="bg-black">Parking</option>
                <option value="storage" className="bg-black">Storage</option>
                <option value="events" className="bg-black">Events</option>
                <option value="multipurpose" className="bg-black">Multipurpose</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security and Infrastructure */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Security */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Shield size={20} className="text-white/60" />
                Security Arrangements
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.security}
                    onChange={() => handleChange('security', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.security}
                    onChange={() => handleChange('security', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Perimeter Fencing */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Fence size={20} className="text-white/60" />
                Perimeter Fencing
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.perimeter}
                    onChange={() => handleChange('perimeter', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.perimeter}
                    onChange={() => handleChange('perimeter', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Rain Shelter */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Cloud size={20} className="text-white/60" />
                Rain Shelter
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.rainShelter}
                    onChange={() => handleChange('rainShelter', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.rainShelter}
                    onChange={() => handleChange('rainShelter', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Power Backup */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Zap size={20} className="text-white/60" />
                Power Backup
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.powerBackup}
                    onChange={() => handleChange('powerBackup', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.powerBackup}
                    onChange={() => handleChange('powerBackup', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Lighting Setup */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Lightbulb size={20} className="text-white/60" />
                Lighting Setup
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.lighting}
                    onChange={() => handleChange('lighting', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.lighting}
                    onChange={() => handleChange('lighting', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoveredOpenSpaceDetails;