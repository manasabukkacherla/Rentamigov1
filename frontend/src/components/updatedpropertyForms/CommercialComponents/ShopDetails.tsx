import { useState } from 'react';
import { ArrowRight, Ruler, ArrowUpDown, Store, Car, History } from 'lucide-react';

interface ShopDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const ShopDetails = ({ onDetailsChange }: ShopDetailsProps) => {
  const [details, setDetails] = useState({
    frontageWidth: '',
    height: '',
    displayWindow: false,
    storageRoom: false,
    footTraffic: '',
    customerParking: false,
    previousBusiness: ''
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Shop Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Shop Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Dimensions */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Ruler size={20} className="text-white/60" />
            Shop Dimensions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                value={details.height}
                onChange={(e) => handleChange('height', e.target.value)}
                placeholder="Height of Shop (Feet)"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Store size={20} className="text-white/60" />
            Shop Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h5 className="text-white/80">Display Window</h5>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.displayWindow}
                    onChange={() => handleChange('displayWindow', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.displayWindow}
                    onChange={() => handleChange('displayWindow', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">No</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-white/80">Attached Storage Room</h5>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.storageRoom}
                    onChange={() => handleChange('storageRoom', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.storageRoom}
                    onChange={() => handleChange('storageRoom', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic and Parking */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <ArrowUpDown size={20} className="text-white/60" />
                Foot Traffic Details
              </h4>
              <select
                value={details.footTraffic}
                onChange={(e) => handleChange('footTraffic', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Traffic Level</option>
                <option value="high" className="bg-black">High</option>
                <option value="medium" className="bg-black">Medium</option>
                <option value="low" className="bg-black">Low</option>
              </select>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Car size={20} className="text-white/60" />
                Customer Parking
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.customerParking}
                    onChange={() => handleChange('customerParking', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.customerParking}
                    onChange={() => handleChange('customerParking', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Business */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <History size={20} className="text-white/60" />
            Previous Business Type
          </h4>
          <input
            type="text"
            value={details.previousBusiness}
            onChange={(e) => handleChange('previousBusiness', e.target.value)}
            placeholder="Enter previous business type (if applicable)"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;