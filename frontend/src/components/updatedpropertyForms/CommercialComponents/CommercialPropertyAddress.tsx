import { ArrowRight, MapPin, Building, Home } from 'lucide-react';
import { useState } from 'react';

interface CommercialPropertyAddressProps {
  onAddressChange?: (address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }) => void;
}

const CommercialPropertyAddress = ({ onAddressChange }: CommercialPropertyAddressProps) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleChange = (field: string, value: string) => {
    const updatedAddress = { ...address, [field]: value };
    setAddress(updatedAddress);
    onAddressChange?.(updatedAddress);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Property Address</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Location Details</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          {/* Street Address */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Home size={20} className="text-white/40" />
            </div>
            <input
              type="text"
              value={address.street}
              onChange={(e) => handleChange('street', e.target.value)}
              placeholder="Street Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* City */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Building size={20} className="text-white/40" />
              </div>
              <input
                type="text"
                value={address.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="City"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>

            {/* State */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <MapPin size={20} className="text-white/40" />
              </div>
              <input
                type="text"
                value={address.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="State"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>

            {/* Zip Code */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <MapPin size={20} className="text-white/40" />
              </div>
              <input
                type="text"
                value={address.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                placeholder="Zip Code"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialPropertyAddress;