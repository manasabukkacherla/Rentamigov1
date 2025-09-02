import { useState } from 'react';
import { ArrowRight, Ruler, ArrowUpDown, Store, Car, History } from 'lucide-react';

interface ShopDetailsProps {
  shopDetails: {
    frontageWidth: number;
    heightOfShop: number;
    displayWindow: boolean;
    attachedStorageRoom: boolean;
    averageFootTraffic: string;
    customerParking: boolean;
    previousBusiness: string;
  }
  onDetailsChange?: (details: Record<string, any>) => void;
}

const ShopDetails = ({ shopDetails, onDetailsChange }: ShopDetailsProps) => {
  const [details, setDetails] = useState(shopDetails);

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
          <h3 className="text-2xl font-semibold text-black">Shop Details</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          {/* Dimensions */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <Ruler size={20} className="text-black/60" />
              Shop Dimensions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={details.frontageWidth || ''}
                  onChange={(e) => handleChange('frontageWidth', parseFloat(e.target.value) || 0)}
                  placeholder="Frontage Width (Feet)"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={details.heightOfShop || ''}
                  onChange={(e) => handleChange('heightOfShop', parseFloat(e.target.value) || 0)}
                  placeholder="Height of Shop (Feet)"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <Store size={20} className="text-black/60" />
              Shop Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="text-black/80">Display Window</h5>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={details.displayWindow}
                      onChange={() => handleChange('displayWindow', true)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!details.displayWindow}
                      onChange={() => handleChange('displayWindow', false)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">No</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-black/80">Attached Storage Room</h5>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={details.attachedStorageRoom}
                      onChange={() => handleChange('attachedStorageRoom', true)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!details.attachedStorageRoom}
                      onChange={() => handleChange('attachedStorageRoom', false)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Traffic and Parking */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <Car size={20} className="text-black/60" />
              Traffic & Parking
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="text-black/80">Average Foot Traffic</h5>
                <select
                  value={details.averageFootTraffic}
                  onChange={(e) => handleChange('averageFootTraffic', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
                >
                  <option value="" disabled>Select foot traffic</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="space-y-4">
                <h5 className="text-black/80">Customer Parking</h5>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={details.customerParking}
                      onChange={() => handleChange('customerParking', true)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Available</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!details.customerParking}
                      onChange={() => handleChange('customerParking', false)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Not Available</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Business */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <History size={20} className="text-black/60" />
              Previous Business
            </h4>
            <textarea
              value={details.previousBusiness}
              onChange={(e) => handleChange('previousBusiness', e.target.value)}
              placeholder="Enter details about previous business (if any)"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;