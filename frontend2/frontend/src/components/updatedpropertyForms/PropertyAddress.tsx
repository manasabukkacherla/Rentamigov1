import { ArrowRight, Building, MapPin } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface PropertyAddressProps {
  onPropertyNameChange: (name: string) => void;
  onPropertyTypeSelect: (type: string) => void;
  onLatitudeChange: (lat: string) => void;
  onLongitudeChange: (lng: string) => void;
  onAddressChange: (addressData: {
    flatNo?: string;
    floor?: string;
    houseName?: string;
    address: string;
    pinCode: string;
    city: string;
    street?: string;
    state: string;
    zipCode: string;
  }) => void;
}

const PropertyAddress = ({
  onPropertyNameChange,
  onPropertyTypeSelect,
  onLatitudeChange,
  onLongitudeChange,
  onAddressChange
}: PropertyAddressProps) => {
  const [propertyName, setPropertyName] = useState<string>('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');

  // Property Address States
  const [addressData, setAddressData] = useState({
    flatNo: '',
    floor: '',
    houseName: '',
    address: '',
    pinCode: '',
    city: '',
    street: '',
    state: '',
    zipCode: ''
  });

  const [showFlatNo, setShowFlatNo] = useState<boolean>(true);

  // Memoized Address Update Function
  const handleAddressChange = useCallback(
    (field: string, value: string) => {
      setAddressData((prev) => {
        const updatedAddress = { ...prev, [field]: value };
        onAddressChange(updatedAddress); // Update Parent State
        return updatedAddress;
      });
    },
    [onAddressChange]
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Property Address</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Location Details</span>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-white/80">
            <input
              type="checkbox"
              checked={showFlatNo}
              onChange={(e) => setShowFlatNo(e.target.checked)}
              className="rounded border-white/20 bg-transparent focus:ring-white text-white"
            />
            Show Flat No. in the Listing
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {showFlatNo && (
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Building size={20} className="text-white/40" />
              </div>
              <input
                type="text"
                value={addressData.flatNo}
                onChange={(e) => handleAddressChange('flatNo', e.target.value)}
                placeholder="Flat No / Block No"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Building size={20} className="text-white/40" />
            </div>
            <input
              type="text"
              value={addressData.floor}
              onChange={(e) => handleAddressChange('floor', e.target.value)}
              placeholder="Floor"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>

          <div className="relative sm:col-span-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Building size={20} className="text-white/40" />
            </div>
            <input
              type="text"
              value={addressData.houseName}
              onChange={(e) => handleAddressChange('houseName', e.target.value)}
              placeholder="Apartment / House Name"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>

          <div className="relative sm:col-span-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <MapPin size={20} className="text-white/40" />
            </div>
            <input
              type="text"
              value={addressData.address}
              onChange={(e) => handleAddressChange('address', e.target.value)}
              placeholder="Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={addressData.pinCode}
              onChange={(e) => handleAddressChange('pinCode', e.target.value)}
              placeholder="Pin Code"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={addressData.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              placeholder="City"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={addressData.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              placeholder="Street"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={addressData.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              placeholder="State"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={addressData.zipCode}
              onChange={(e) => handleAddressChange('zipCode', e.target.value)}
              placeholder="Zip Code"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAddress;
