import { useState, useEffect } from 'react';
import { MapPin, Building, Home } from 'lucide-react';

interface CommercialPropertyAddressProps {
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  onAddressChange?: (address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }) => void;
}

const CommercialPropertyAddress = ({ address, onAddressChange }: CommercialPropertyAddressProps) => {
  const [localAddress, setLocalAddress] = useState(address);

  // Update local state if the address prop changes
  useEffect(() => {
    setLocalAddress(address);
  }, [address]);

  const handleChange = (field: string, value: string) => {
    const updatedAddress = { ...localAddress, [field]: value };
    setLocalAddress(updatedAddress);
    onAddressChange?.(updatedAddress);  // Pass the updated address back to the parent
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <MapPin className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Property Address</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-4">
          {/* Street Address */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Home size={20} className="text-black" />
            </div>
            <input
              type="text"
              value={localAddress.street}
              onChange={(e) => handleChange('street', e.target.value)}
              placeholder="Street Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* City */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Building size={20} className="text-black" />
              </div>
              <input
                type="text"
                value={localAddress.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="City"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>

            {/* State */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <MapPin size={20} className="text-black" />
              </div>
              <input
                type="text"
                value={localAddress.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="State"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>

            {/* Zip Code */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <MapPin size={20} className="text-black" />
              </div>
              <input
                type="text"
                value={localAddress.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                placeholder="Zip Code"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialPropertyAddress;