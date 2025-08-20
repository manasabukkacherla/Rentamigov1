import { useState } from 'react';
import { ArrowRight, IndianRupee, Clock, Calendar } from 'lucide-react';

interface PriceDetailsProps {
  onPriceChange?: (price: Record<string, any>) => void;
}

const PriceDetails = ({ onPriceChange }: PriceDetailsProps) => {
  const [priceDetails, setPriceDetails] = useState({
    expectedPrice: '',
    priceNegotiable: false,
    maintenanceCharges: '',
    maintenancePeriod: 'monthly',
    securityDeposit: '',
    lockInPeriod: '',
    leaseTerms: ''
  });

  const handleChange = (field: string, value: any) => {
    const updatedPrice = { ...priceDetails, [field]: value };
    setPriceDetails(updatedPrice);
    onPriceChange?.(updatedPrice);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <IndianRupee className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Price Details</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          {/* Input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="expectedPrice" className="block text-gray-800 font-medium mb-2">
                Expected Price
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="expectedPrice"
                  value={priceDetails.expectedPrice}
                  onChange={(e) => handleChange('expectedPrice', e.target.value)}
                  placeholder="Enter expected price"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <IndianRupee className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label htmlFor="pricePerSqFt" className="block text-gray-800 font-medium mb-2">
                Price Per Sq.ft
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="pricePerSqFt"
                  value={priceDetails.maintenanceCharges}
                  onChange={(e) => handleChange('maintenanceCharges', e.target.value)}
                  placeholder="Enter price per sq.ft"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <IndianRupee className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* Negotiable checkbox */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={priceDetails.priceNegotiable}
                onChange={(e) => handleChange('priceNegotiable', e.target.checked)}
                className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="text-black">Price is negotiable</span>
            </label>
          </div>

          {/* Additional fields */}
          <div className="space-y-6">
            <div>
              <label htmlFor="additionalPriceDetails" className="block text-gray-800 font-medium mb-2">
                Additional Price Details
              </label>
              <textarea
                id="additionalPriceDetails"
                value={priceDetails.leaseTerms}
                onChange={(e) => handleChange('leaseTerms', e.target.value)}
                placeholder="Enter additional price details"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceDetails; 