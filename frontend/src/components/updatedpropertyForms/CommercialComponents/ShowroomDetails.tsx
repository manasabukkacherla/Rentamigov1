import { useState } from 'react';
import { ArrowRight, Ruler, Store, Lightbulb, Wind, Building2, Warehouse } from 'lucide-react';

interface ShowroomDetailsProps {
  onDetailsChange: (details: {
    totalSpace: number | null;
    frontageWidth: number | null;
    ceilingHeight: number | null;
    glassFrontage: boolean;
    lightingType: string;
    acInstalled: boolean;
    nearbyCompetitors: {
      present: boolean;
      brandNames: string;
    };
    displayRacks: boolean;
  }) => void;
}

const ShowroomDetails = ({ onDetailsChange }: ShowroomDetailsProps) => {
  const [details, setDetails] = useState({
    totalSpace: null as number | null,
    frontageWidth: null as number | null,
    ceilingHeight: null as number | null,
    glassFrontage: false,
    lightingType: '',
    acInstalled: false,
    nearbyCompetitors: {
      present: false,
      brandNames: ''
    },
    displayRacks: false
  });

  const handleChange = (field: string, value: string | boolean | { present: boolean; brandNames: string }) => {
    setDetails(prev => {
      const newDetails = {
        ...prev,
        [field]: value
      };
      // Call onDetailsChange with the updated state
      onDetailsChange(newDetails);
      return newDetails;
    });
  };

  const handleNumericChange = (field: string, value: string) => {
    const numericValue = value === '' ? null : Number(value);
    setDetails(prev => {
      const newDetails = {
        ...prev,
        [field]: numericValue
      };
      // Call onDetailsChange with the updated state
      onDetailsChange(newDetails);
      return newDetails;
    });
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Store className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Showroom Details</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="totalSpace" className="block text-gray-800 font-medium mb-2">
                Total Space (sq.ft)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="totalSpace"
                  value={details.totalSpace?.toString() || ''}
                  onChange={(e) => handleNumericChange('totalSpace', e.target.value)}
                  placeholder="Enter total space"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="frontageWidth" className="block text-gray-800 font-medium mb-2">
                Frontage Width (ft)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="frontageWidth"
                  value={details.frontageWidth?.toString() || ''}
                  onChange={(e) => handleNumericChange('frontageWidth', e.target.value)}
                  placeholder="Enter frontage width"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ceilingHeight" className="block text-gray-800 font-medium mb-2">
                Ceiling Height (ft)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="ceilingHeight"
                  value={details.ceilingHeight?.toString() || ''}
                  onChange={(e) => handleNumericChange('ceilingHeight', e.target.value)}
                  placeholder="Enter ceiling height"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="glassFrontage" className="block text-gray-800 font-medium mb-2">
                Glass Frontage
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.glassFrontage}
                    onChange={() => handleChange('glassFrontage', true)}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="text-black">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.glassFrontage}
                    onChange={() => handleChange('glassFrontage', false)}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="text-black">No</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="lightingType" className="block text-gray-800 font-medium mb-2">
                Lighting Type
              </label>
              <select
                value={details.lightingType}
                onChange={(e) => handleChange('lightingType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="" disabled>Select Lighting Type</option>
                <option value="warm">Warm</option>
                <option value="cool">Cool</option>
                <option value="natural">Natural</option>
              </select>
            </div>

            <div>
              <label htmlFor="acInstalled" className="block text-gray-800 font-medium mb-2">
                AC Installation
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.acInstalled}
                    onChange={() => handleChange('acInstalled', true)}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="text-black">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.acInstalled}
                    onChange={() => handleChange('acInstalled', false)}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="text-black">No</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="nearbyCompetitors" className="block text-gray-800 font-medium mb-2">
                Nearby Competitors
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.nearbyCompetitors.present}
                    onChange={() => handleChange('nearbyCompetitors', { ...details.nearbyCompetitors, present: true })}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="text-black">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.nearbyCompetitors.present}
                    onChange={() => handleChange('nearbyCompetitors', { ...details.nearbyCompetitors, present: false })}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="text-black">No</span>
                </label>
              </div>
            </div>

            {details.nearbyCompetitors.present && (
              <div>
                <label htmlFor="brandNames" className="block text-gray-800 font-medium mb-2">
                  Brand Names
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="brandNames"
                    value={details.nearbyCompetitors.brandNames}
                    onChange={(e) => handleChange('nearbyCompetitors', { ...details.nearbyCompetitors, brandNames: e.target.value })}
                    placeholder="Enter brand names"
                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="displayRacks" className="block text-gray-800 font-medium mb-2">
                Display Racks
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.displayRacks}
                    onChange={() => handleChange('displayRacks', true)}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="text-black">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.displayRacks}
                    onChange={() => handleChange('displayRacks', false)}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
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

export default ShowroomDetails;