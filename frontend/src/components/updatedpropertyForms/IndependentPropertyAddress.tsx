import { ArrowRight, Building, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import MapSelector from "./MapSelector";

interface IndependentPropertyAddressProps {
  address?: {
    houseName?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    pinCode?: string;
    coordinates?: { lat: number; lng: number };
    locationLabel?: string;
  };
  onAddressChange: (address: any) => void;
}

const inputClasses = "w-full h-12 px-4 rounded-lg border border-black/10 bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black shadow-sm transition-all duration-200";

const IndependentPropertyAddress: React.FC<IndependentPropertyAddressProps> = ({
  address = {},
  onAddressChange,
}) => {
  const [showMap, setShowMap] = useState(false);

  const handleChange = (field: string, value: any) => {
    onAddressChange({
      ...address,
      [field]: value,
    });
  };

  const handleLocationSelect = (lat: string, lng: string, addressData?: any) => {
    let locationLabel = `${lat}, ${lng}`;
    if (addressData) {
      const components = [];
      if (addressData.route) components.push(addressData.route);
      if (addressData.sublocality_level_1) components.push(addressData.sublocality_level_1);
      if (addressData.locality) components.push(addressData.locality);
      if (components.length > 0) {
        locationLabel = components.join(", ");
      }
    }
    onAddressChange({
      ...address,
      coordinates: { lat: Number(lat), lng: Number(lng) },
      locationLabel,
    });
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/5 mb-8">
      <div className="space-y-8">
        <div className="flex items-center gap-3 border-b border-black/5 pb-6">
          <Building className="h-6 w-6 text-black/70" />
          <h2 className="text-xl font-medium text-black/80">Property Address</h2>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                House Name
              </label>
              <input
                type="text"
                value={address.houseName || ""}
                onChange={(e) => handleChange("houseName", e.target.value)}
                placeholder="Enter house name"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                Pin Code
              </label>
              <input
                type="text"
                value={address.pinCode || ""}
                onChange={(e) => handleChange("pinCode", e.target.value)}
                placeholder="Enter pin code"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                ZIP Code
              </label>
              <input
                type="text"
                value={address.zipCode || ""}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                placeholder="Enter ZIP code"
                className={inputClasses}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                City
              </label>
              <input
                type="text"
                value={address.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Enter city"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                State
              </label>
              <input
                type="text"
                value={address.state || ""}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="Enter state"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                Street Address
              </label>
              <input
                type="text"
                value={address.street || ""}
                onChange={(e) => handleChange("street", e.target.value)}
                placeholder="Enter street address"
                className={inputClasses}
              />
            </div>
          </div>
          {/* Location with Map */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  Location
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={address.locationLabel || (address.coordinates ? `${address.coordinates.lat}, ${address.coordinates.lng}` : "")}
                  readOnly
                  onClick={() => setShowMap(true)}
                  placeholder="Click to select location on map"
                  className={`${inputClasses} cursor-pointer`}
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {showMap && (
                <div className="mt-4">
                  <MapSelector
                    latitude={address.coordinates?.lat?.toString() || ""}
                    longitude={address.coordinates?.lng?.toString() || ""}
                    onLocationSelect={handleLocationSelect}
                    initialShowMap={true}
                  />
                  <button
                    type="button"
                    className="mt-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80"
                    onClick={() => setShowMap(false)}
                  >
                    Close Map
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndependentPropertyAddress;
