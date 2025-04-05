"use client"

import type React from "react"
import { useState } from "react"
import MapSelector from "../MapSelector"
import ShopDetails from "../CommercialComponents/ShopDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Rent from "../residentialrent/Rent"
import SecurityDeposit from "../residentialrent/SecurityDeposit"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import OtherCharges from "../residentialrent/OtherCharges"
import Brokerage from "../residentialrent/Brokerage"
import AvailabilityDate from "../AvailabilityDate"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"
import { Store, MapPin, ChevronRight, ChevronLeft } from "lucide-react"

const RentShopMain = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    shopType: "",
    address: {},
    landmark: "",
    coordinates: { latitude: "", longitude: "" },
    isCornerProperty: false,
    shopDetails: {},
    propertyDetails: {},
    rent: {
      expectedRent: "",
      isNegotiable: false,
      rentType: "",
    },
    securityDeposit: {},
    maintenanceAmount: {},
    otherCharges: {},
    brokerage: {},
    availability: {},
    contactDetails: {},
    media: { photos: [], video: null },
  })

  const [currentStep, setCurrentStep] = useState(0)

  // Function to update coordinates
  const handleLocationSelect = (latitude: string, longitude: string) => {
    setFormData({
      ...formData,
      coordinates: { latitude, longitude },
    })
  }

  const formSections = [
    {
      title: "Basic Information",
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <Store className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Shop Details</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="propertyName" className="block text-gray-700 font-medium mb-2">
                Property Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="propertyName"
                  placeholder="Enter shop name"
                  value={formData.propertyName}
                  onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                />
                <Store className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Shop Type</label>
              <select
                value={formData.shopType}
                onChange={(e) => setFormData({ ...formData, shopType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 bg-white"
              >
                <option value="">Select shop type</option>
                <option value="retail">Retail Shop</option>
                <option value="commercial">Commercial Shop</option>
                <option value="food">Food & Beverage</option>
                <option value="service">Service Shop</option>
              </select>
            </div>

            <div>
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <textarea
                id="address"
                placeholder="Enter complete address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 min-h-[100px]"
              />
            </div>

            <div>
              <label htmlFor="landmark" className="block text-gray-700 font-medium mb-2">
                Landmark
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="landmark"
                  placeholder="Enter nearby landmark"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <MapSelector
              latitude={formData.coordinates.latitude}
              longitude={formData.coordinates.longitude}
              onLocationSelect={handleLocationSelect}
            />

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCornerProperty}
                  onChange={(e) => setFormData({ ...formData, isCornerProperty: e.target.checked })}
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-gray-700">This is a corner property</span>
              </label>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <ShopDetails onDetailsChange={(details) => setFormData({ ...formData, shopDetails: details })} />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
          />
        </div>
      ),
    },
    {
      title: "Rental Terms",
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <Rent onRentChange={(rent) => setFormData({ ...formData, rent })} />
          {formData.rent.rentType === "exclusive" && (
            <MaintenanceAmount
              onMaintenanceAmountChange={(maintenance) => setFormData({ ...formData, maintenanceAmount: maintenance })}
            />
          )}
          <SecurityDeposit
            onSecurityDepositChange={(deposit) => setFormData({ ...formData, securityDeposit: deposit })}
          />
          <OtherCharges onOtherChargesChange={(charges) => setFormData({ ...formData, otherCharges: charges })} />
          <Brokerage onBrokerageChange={(brokerage) => setFormData({ ...formData, brokerage })} />
        </div>
      ),
    },
    {
      title: "Availability",
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <AvailabilityDate onAvailabilityChange={(availability) => setFormData({ ...formData, availability })} />
        </div>
      ),
    },
    {
      title: "Contact Information",
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <CommercialContactDetails
            onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })}
          />
        </div>
      ),
    },
    {
      title: "Property Media",
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <CommercialMediaUpload onMediaChange={(media) => setFormData({ ...formData, media })} />
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{formSections[currentStep].title}</h2>
        <div className="h-1 w-20 bg-black mt-2 rounded-full"></div>
      </div>

      <div className="space-y-8">{formSections[currentStep].content}</div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-1" size={18} />
          Previous
        </button>

        {currentStep < formSections.length - 1 ? (
          <button
            type="button"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center"
            onClick={handleNext}
          >
            Next
            <ChevronRight className="ml-1" size={18} />
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center"
          >
            List Property
            <ChevronRight className="ml-1" size={18} />
          </button>
        )}
      </div>
    </form>
  )
}

export default RentShopMain

