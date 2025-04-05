import { useState } from 'react';
import { ArrowRight, Building2, Users, ArrowUpDown, Store, File as Toilet, Shield } from 'lucide-react';

interface RetailStoreDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const RetailStoreDetails = ({ onDetailsChange }: RetailStoreDetailsProps) => {
  const [details, setDetails] = useState({
    location: '',
    anchorStores: false,
    footfallData: '',
    signageAllowed: false,
    sharedWashrooms: false,
    fireExit: false
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Retail Store Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Store Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Location Type */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Building2 size={20} className="text-white/60" />
            Location Type
          </h4>
          <select
            value={details.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select Location Type</option>
            <option value="mall" className="bg-black">Mall</option>
            <option value="highStreet" className="bg-black">High Street</option>
            <option value="marketComplex" className="bg-black">Market Complex</option>
            <option value="standalone" className="bg-black">Standalone</option>
          </select>
        </div>

        {/* Anchor Stores and Footfall */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Store size={20} className="text-white/60" />
                Anchor Stores Nearby
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.anchorStores}
                    onChange={() => handleChange('anchorStores', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.anchorStores}
                    onChange={() => handleChange('anchorStores', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">No</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <ArrowUpDown size={20} className="text-white/60" />
                Footfall Traffic Data
              </h4>
              <input
                type="text"
                value={details.footfallData}
                onChange={(e) => handleChange('footfallData', e.target.value)}
                placeholder="Enter footfall data (if available)"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Signage/Branding */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Store size={20} className="text-white/60" />
                Signage/Branding Space
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.signageAllowed}
                    onChange={() => handleChange('signageAllowed', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Allowed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.signageAllowed}
                    onChange={() => handleChange('signageAllowed', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Allowed</span>
                </label>
              </div>
            </div>

            {/* Shared Washrooms */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Toilet size={20} className="text-white/60" />
                Shared Washrooms
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.sharedWashrooms}
                    onChange={() => handleChange('sharedWashrooms', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.sharedWashrooms}
                    onChange={() => handleChange('sharedWashrooms', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Fire Exit */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Shield size={20} className="text-white/60" />
                Fire Exit Provisions
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.fireExit}
                    onChange={() => handleChange('fireExit', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.fireExit}
                    onChange={() => handleChange('fireExit', false)}
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

export default RetailStoreDetails;