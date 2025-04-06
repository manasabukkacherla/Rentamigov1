"use client"

import React, { useState } from "react"
import { Building, MapPin, Navigation } from "lucide-react"
import MapSelector from "./MapSelector"

interface PropertyAddressProps {
  address: {
    flatNo?: string;
    floor?: string;
    apartmentName?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    locationLabel?: string;
  };
  onAddressChange: (address: any) => void;
  showFlatNo?: boolean;
}

const PropertyAddress: React.FC<PropertyAddressProps> = ({
  address,
  onAddressChange,
  showFlatNo = true,
}) => {
  const [showMap, setShowMap] = useState(false);
  
  const handleChange = (field: string, value: any) => {
    onAddressChange({
      ...address,
      [field]: value,
    })
  }

  const handleLocationSelect = (lat: string, lng: string, addressData?: any) => {
    // Create a readable location label from coordinates or address data
    let locationLabel = `${lat}, ${lng}`;
    
    if (addressData) {
      const components = [];
      if (addressData.route) components.push(addressData.route);
      if (addressData.sublocality_level_1) components.push(addressData.sublocality_level_1);
      if (addressData.locality) components.push(addressData.locality);
      
      if (components.length > 0) {
        locationLabel = components.join(', ');
      }
    }
    
    onAddressChange({
      ...address,
      coordinates: { lat: Number(lat), lng: Number(lng) },
      locationLabel: locationLabel
    });
  }

  const inputClasses = "w-full h-12 px-4 rounded-lg border border-black/10 bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black shadow-sm transition-all duration-200"

  return (
    <div className="bg-white rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/5 mb-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-black/5 pb-6">
          <Building className="h-6 w-6 text-black/70" />
          <h2 className="text-xl font-medium text-black/80">Property Address</h2>
        </div>

        {/* Show Flat No Toggle */}
        {showFlatNo && (
          <label className="flex items-center gap-2.5 text-sm text-black/70 bg-black/5 px-4 py-3 rounded-lg w-fit">
            <input
              type="checkbox"
              checked={!!address.flatNo}
              onChange={(e) => handleChange("showFlatNo", e.target.checked ? "true" : "")}
              className="rounded border-black/10 text-black focus:ring-black/5"
            />
            Show Flat No. in the Listing
          </label>
        )}

        {/* Address Fields in Three Lines */}
        <div className="space-y-6">
          {/* Line 1: Apartment Name, Flat No, Floor */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                Apartment / House Name
              </label>
              <input
                type="text"
                value={address.apartmentName || ""}
                onChange={(e) => handleChange("apartmentName", e.target.value)}
                placeholder="Enter apartment/house name"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                Flat No / Block No
              </label>
              <input
                type="text"
                value={address.flatNo || ""}
                onChange={(e) => handleChange("flatNo", e.target.value)}
                placeholder="Enter flat/block number"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                Floor
              </label>
              <input
                type="text"
                value={address.floor || ""}
                onChange={(e) => handleChange("floor", e.target.value)}
                placeholder="Enter floor"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Line 2: City, State, ZIP Code */}
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

          {/* Line 3: Street Address */}
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

          {/* Line 4: Location with Map */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                <span className="flex items-center gap-1.5">
                  <Navigation className="h-4 w-4" />
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
              {address.coordinates && (
                <p className="mt-2 text-xs text-gray-500">
                  Coordinates: {address.coordinates.lat}, {address.coordinates.lng}
                </p>
              )}
            </div>

            {showMap && (
              <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                <MapSelector
                  latitude={address.coordinates?.lat.toString() || ""}
                  longitude={address.coordinates?.lng.toString() || ""}
                  onLocationSelect={handleLocationSelect}
                />
                <div className="bg-gray-50 p-2 text-right">
                  <button 
                    onClick={() => setShowMap(false)} 
                    className="text-sm text-black/70 hover:text-black px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyAddress

