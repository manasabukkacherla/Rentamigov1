"use client"

import { useState } from "react"
import PropertyName from "../PropertyName"
import WarehouseType from "../CommercialComponents/WarehouseType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import MapCoordinates from "../MapCoordinates"
import CornerProperty from "../CommercialComponents/CornerProperty"
import WarehouseDetails from "../CommercialComponents/WarehouseDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import PricePerSqft from "../sell/PricePerSqft"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"

const SellWarehouseMain = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    warehouseType: "",
    address: {},
    landmark: "",
    coordinates: { latitude: "", longitude: "" },
    isCornerProperty: false,
    warehouseDetails: {},
    propertyDetails: {},
    price: "",
    area: {
      superBuiltUpAreaSqft: "",
      builtUpAreaSqft: "",
      carpetAreaSqft: "",
    },
    registrationCharges: {},
    brokerage: {},
    availability: {},
    contactDetails: {},
    media: { photos: [], video: null },
  })

  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    {
      title: "Basic Information",
      content: (
        <>
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) => setFormData((prev) => ({ ...prev, propertyName: name }))}
          />
          <WarehouseType onWarehouseTypeChange={(type) => setFormData((prev) => ({ ...prev, warehouseType: type }))} />
          <CommercialPropertyAddress onAddressChange={(address) => setFormData((prev) => ({ ...prev, address }))} />
          <Landmark onLandmarkChange={(landmark) => setFormData((prev) => ({ ...prev, landmark }))} />
          <MapCoordinates
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            onLatitudeChange={(lat) =>
              setFormData((prev) => ({ ...prev, coordinates: { ...prev.coordinates, latitude: lat } }))
            }
            onLongitudeChange={(lng) =>
              setFormData((prev) => ({ ...prev, coordinates: { ...prev.coordinates, longitude: lng } }))
            }
          />
          <CornerProperty
            onCornerPropertyChange={(isCorner) => setFormData((prev) => ({ ...prev, isCornerProperty: isCorner }))}
          />
        </>
      ),
    },
    {
      title: "Property Details",
      content: (
        <>
          <WarehouseDetails
            onDetailsChange={(details) => setFormData((prev) => ({ ...prev, warehouseDetails: details }))}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData((prev) => ({ ...prev, propertyDetails: details }))}
          />
        </>
      ),
    },
    {
      title: "Pricing Details",
      content: (
        <>
          <Price onPriceChange={(price) => setFormData((prev) => ({ ...prev, price: price.amount }))} />
          <PricePerSqft price={formData.price} area={formData.area} />
          <RegistrationCharges
            onRegistrationChargesChange={(charges) =>
              setFormData((prev) => ({ ...prev, registrationCharges: charges }))
            }
          />
          <Brokerage onBrokerageChange={(brokerage) => setFormData((prev) => ({ ...prev, brokerage }))} />
        </>
      ),
    },
    {
      title: "Availability",
      content: (
        <CommercialAvailability
          onAvailabilityChange={(availability) => setFormData((prev) => ({ ...prev, availability }))}
        />
      ),
    },
    {
      title: "Contact Information",
      content: (
        <CommercialContactDetails
          onContactChange={(contact) => setFormData((prev) => ({ ...prev, contactDetails: contact }))}
        />
      ),
    },
    {
      title: "Property Media",
      content: <CommercialMediaUpload onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))} />,
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log("Form Data:", formData)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sell Commercial Warehouse</h1>
            <div className="mt-2 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">{steps[currentStep].title}</h2>
              <div className="space-y-6">{steps[currentStep].content}</div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`px-6 py-2.5 rounded-lg border ${
                  currentStep === 0
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                } transition-colors duration-200`}
              >
                Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                >
                  List Property
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SellWarehouseMain

