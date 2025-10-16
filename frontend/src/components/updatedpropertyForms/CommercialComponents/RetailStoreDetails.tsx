import { useState } from 'react';
import { ArrowRight, Building2, Store, Users, DoorOpen } from 'lucide-react';

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
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Store className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Retail Store Details</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          {/* Location Type */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <Building2 size={20} className="text-black/60" />
              Location Type
            </h4>
            <select
              value={details.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
            >
              <option value="" disabled>Select Location Type</option>
              <option value="mall">Mall</option>
              <option value="highStreet">High Street</option>
              <option value="marketComplex">Market Complex</option>
              <option value="standalone">Standalone</option>
            </select>
          </div>

          {/* Anchor Stores and Footfall */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <Users size={20} className="text-black/60" />
              Store Environment
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="text-black/80">Anchor Stores Nearby</h5>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={details.anchorStores}
                      onChange={() => handleChange('anchorStores', true)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!details.anchorStores}
                      onChange={() => handleChange('anchorStores', false)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">No</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-black/80">Average Footfall</h5>
                <select
                  value={details.footfallData}
                  onChange={(e) => handleChange('footfallData', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
                >
                  <option value="" disabled>Select footfall range</option>
                  <option value="low">Low (0-100 daily)</option>
                  <option value="medium">Medium (100-500 daily)</option>
                  <option value="high">High (500+ daily)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <DoorOpen size={20} className="text-black/60" />
              Additional Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Signage/Branding */}
              <div className="space-y-4">
                <h5 className="text-black/80">Signage/Branding Space</h5>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={details.signageAllowed}
                      onChange={() => handleChange('signageAllowed', true)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Allowed</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!details.signageAllowed}
                      onChange={() => handleChange('signageAllowed', false)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Not Allowed</span>
                  </label>
                </div>
              </div>

              {/* Shared Washrooms */}
              <div className="space-y-4">
                <h5 className="text-black/80">Shared Washrooms</h5>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={details.sharedWashrooms}
                      onChange={() => handleChange('sharedWashrooms', true)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Available</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!details.sharedWashrooms}
                      onChange={() => handleChange('sharedWashrooms', false)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Not Available</span>
                  </label>
                </div>
              </div>

              {/* Fire Exit */}
              <div className="space-y-4">
                <h5 className="text-black/80">Fire Exit</h5>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={details.fireExit}
                      onChange={() => handleChange('fireExit', true)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Available</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!details.fireExit}
                      onChange={() => handleChange('fireExit', false)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Not Available</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailStoreDetails;