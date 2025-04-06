"use client"

import React from "react"
import { Building, MapPin } from "lucide-react"

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
  };
  onAddressChange: (address: any) => void;
  showFlatNo?: boolean;
}

const PropertyAddress: React.FC<PropertyAddressProps> = ({
  address,
  onAddressChange,
  showFlatNo = true,
}) => {
  const handleChange = (field: string, value: any) => {
    onAddressChange({
      ...address,
      [field]: value,
    })
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

          {/* Line 4: Latitude and Longitude */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  Latitude
                </span>
              </label>
              <input
                type="text"
                value={address.coordinates?.lat || ""}
                onChange={(e) => handleChange("coordinates", { ...address.coordinates, lat: Number(e.target.value) })}
                placeholder="Property latitude"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  Longitude
                </span>
              </label>
              <input
                type="text"
                value={address.coordinates?.lng || ""}
                onChange={(e) => handleChange("coordinates", { ...address.coordinates, lng: Number(e.target.value) })}
                placeholder="Property longitude"
                className={inputClasses}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyAddress

