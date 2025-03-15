import { useState } from 'react';
import { ArrowRight, Ruler, Store, Lightbulb, Wind, Building2, Warehouse } from 'lucide-react';

interface ShowroomDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const ShowroomDetails = ({ onDetailsChange }: ShowroomDetailsProps) => {
  const [details, setDetails] = useState({
    totalSpace: '',
    frontageWidth: '',
    ceilingHeight: '',
    glassFrontage: false,
    lightingType: '',
    acInstalled: false,
    nearbyCompetitors: {
      present: false,
      brandNames: ''
    },
    displayRacks: false
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  const handleCompetitorChange = (field: string, value: any) => {
    const updatedCompetitors = { ...details.nearbyCompetitors, [field]: value };
    handleChange('nearbyCompetitors', updatedCompetitors);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Showroom Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Showroom Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Dimensions */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Ruler size={20} className="text-white/60" />
            Showroom Dimensions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="number"
                min="0"
                value={details.totalSpace}
                onChange={(e) => handleChange('totalSpace', e.target.value)}
                placeholder="Total Space (Sq Ft)"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={details.frontageWidth}
                onChange={(e) => handleChange('frontageWidth', e.target.value)}
                placeholder="Frontage Width (Feet)"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={details.ceilingHeight}
                onChange={(e) => handleChange('ceilingHeight', e.target.value)}
                placeholder="Ceiling Height (Feet)"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Glass Frontage */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Store size={20} className="text-white/60" />
                Glass Frontage
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.glassFrontage}
                    onChange={() => handleChange('glassFrontage', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.glassFrontage}
                    onChange={() => handleChange('glassFrontage', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">No</span>
                </label>
              </div>
            </div>

            {/* Lighting Type */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Lightbulb size={20} className="text-white/60" />
                Lighting Type
              </h4>
              <select
                value={details.lightingType}
                onChange={(e) => handleChange('lightingType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Lighting Type</option>
                <option value="warm" className="bg-black">Warm</option>
                <option value="cool" className="bg-black">Cool</option>
                <option value="natural" className="bg-black">Natural</option>
              </select>
            </div>
          </div>
        </div>

        {/* AC and Display */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* AC Installation */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Wind size={20} className="text-white/60" />
                AC Installation
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.acInstalled}
                    onChange={() => handleChange('acInstalled', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Installed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.acInstalled}
                    onChange={() => handleChange('acInstalled', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Installed</span>
                </label>
              </div>
            </div>

            {/* Display Racks */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Building2 size={20} className="text-white/60" />
                Display Racks
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.displayRacks}
                    onChange={() => handleChange('displayRacks', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.displayRacks}
                    onChange={() => handleChange('displayRacks', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Competitors */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Warehouse size={20} className="text-white/60" />
            Nearby Competitor Showrooms
          </h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={details.nearbyCompetitors.present}
                  onChange={() => handleCompetitorChange('present', true)}
                  className="text-white border-white/20 bg-transparent focus:ring-white"
                />
                <span className="text-white/80">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!details.nearbyCompetitors.present}
                  onChange={() => handleCompetitorChange('present', false)}
                  className="text-white border-white/20 bg-transparent focus:ring-white"
                />
                <span className="text-white/80">No</span>
              </label>
            </div>
            {details.nearbyCompetitors.present && (
              <input
                type="text"
                value={details.nearbyCompetitors.brandNames}
                onChange={(e) => handleCompetitorChange('brandNames', e.target.value)}
                placeholder="Enter competitor brand names"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowroomDetails;