"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { ArrowRight, Building, MapPin } from "lucide-react"

interface PropertyAddressProps {
  onAddressChange: (addressData: any) => void
  onLatitudeChange?: (lat: string) => void
  onLongitudeChange?: (lng: string) => void
  onPropertyNameChange?: (name: string) => void
  onPropertyTypeSelect?: (type: string) => void
}

const PropertyAddress: React.FC<PropertyAddressProps> = ({
  onAddressChange,
  onLatitudeChange,
  onLongitudeChange,
  onPropertyNameChange,
  onPropertyTypeSelect,
}) => {
  const [addressData, setAddressData] = useState({
    flatNo: "",
    floor: "",
    houseName: "",
    address: "",
    pinCode: "",
    city: "",
    street: "",
    state: "",
    zipCode: ""
  })

  const [showFlatNo, setShowFlatNo] = useState(true)

  const handleAddressChange = useCallback(
    (field: string, value: string) => {
      const updatedAddress = {
        ...addressData,
        [field]: value,
      }

      // If pinCode is updated, also update zipCode
      if (field === 'pinCode') {
        updatedAddress.zipCode = value
      }
      // If zipCode is updated, also update pinCode
      if (field === 'zipCode') {
        updatedAddress.pinCode = value
      }

      setAddressData(updatedAddress)
      onAddressChange(updatedAddress)
    },
    [addressData, onAddressChange]
  )

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold text-black">Property Address</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Location Details</span>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-black/80">
            <input
              type="checkbox"
              checked={showFlatNo}
              onChange={(e) => setShowFlatNo(e.target.checked)}
              className="rounded border-black/20 bg-transparent focus:ring-black text-black"
            />
            Show Flat No. in the Listing
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {showFlatNo && (
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Building size={20} className="text-black/40" />
              </div>
              <input
                type="text"
                value={addressData.flatNo}
                onChange={(e) => handleAddressChange("flatNo", e.target.value)}
                placeholder="Flat No / Block No"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Building size={20} className="text-black/40" />
            </div>
            <input
              type="text"
              value={addressData.floor}
              onChange={(e) => handleAddressChange("floor", e.target.value)}
              placeholder="Floor"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
          </div>

          <div className="relative sm:col-span-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Building size={20} className="text-black/40" />
            </div>
            <input
              type="text"
              value={addressData.houseName}
              onChange={(e) => handleAddressChange("houseName", e.target.value)}
              placeholder="Apartment / House Name"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
          </div>

          <div className="relative sm:col-span-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <MapPin size={20} className="text-black/40" />
            </div>
            <input
              type="text"
              value={addressData.address}
              onChange={(e) => handleAddressChange("address", e.target.value)}
              placeholder="Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={addressData.zipCode}
              onChange={(e) => handleAddressChange("zipCode", e.target.value)}
              placeholder="Zip Code"
              className="w-full pl-4 pr-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={addressData.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              placeholder="City"
              className="w-full pl-4 pr-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={addressData.street}
              onChange={(e) => handleAddressChange("street", e.target.value)}
              placeholder="Street"
              className="w-full pl-4 pr-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={addressData.state}
              onChange={(e) => handleAddressChange("state", e.target.value)}
              placeholder="State"
              className="w-full pl-4 pr-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyAddress

