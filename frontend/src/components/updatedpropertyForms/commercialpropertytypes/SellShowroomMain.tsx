"use client"

import { useState } from "react"
import PropertyName from "../PropertyName"
import ShowroomType from "../CommercialComponents/ShowroomType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import MapCoordinates from "../MapCoordinates"
import CornerProperty from "../CommercialComponents/CornerProperty"
import ShowroomDetails from "../CommercialComponents/ShowroomDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import PricePerSqft from "../sell/PricePerSqft"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"

const SellShowroomMain = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    showroomType: "",
    address: {},
    landmark: "",
    coordinates: { latitude: "", longitude: "" },
    isCornerProperty: false,
    showroomDetails: {},
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
            onPropertyNameChange={(name) => setFormData({ ...formData, propertyName: name })}
          />
          <ShowroomType onShowroomTypeChange={(type) => setFormData({ ...formData, showroomType: type })} />
          <CommercialPropertyAddress onAddressChange={(address) => setFormData({ ...formData, address })} />
          <Landmark onLandmarkChange={(landmark) => setFormData({ ...formData, landmark })} />
          <MapCoordinates
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            onLatitudeChange={(lat) =>
              setFormData({ ...formData, coordinates: { ...formData.coordinates, latitude: lat } })
            }
            onLongitudeChange={(lng) =>
              setFormData({ ...formData, coordinates: { ...formData.coordinates, longitude: lng } })
            }
          />
          <CornerProperty
            onCornerPropertyChange={(isCorner) => setFormData({ ...formData, isCornerProperty: isCorner })}
          />
        </>
      ),
    },
    {
      title: "Property Details",
      content: (
        <>
          <ShowroomDetails onDetailsChange={(details) => setFormData({ ...formData, showroomDetails: details })} />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
          />
        </>
      ),
    },
    {
      title: "Pricing Details",
      content: (
        <>
          <Price onPriceChange={(price) => setFormData({ ...formData, price: price.amount })} />
          <PricePerSqft price={formData.price} area={formData.area} />
          <RegistrationCharges
            onRegistrationChargesChange={(charges) => setFormData({ ...formData, registrationCharges: charges })}
          />
          <Brokerage onBrokerageChange={(brokerage) => setFormData({ ...formData, brokerage })} />
        </>
      ),
    },
    {
      title: "Availability",
      content: (
        <CommercialAvailability onAvailabilityChange={(availability) => setFormData({ ...formData, availability })} />
      ),
    },
    {
      title: "Contact Information",
      content: (
        <CommercialContactDetails
          onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })}
        />
      ),
    },
    {
      title: "Property Media",
      content: <CommercialMediaUpload onMediaChange={(media) => setFormData({ ...formData, media })} />,
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sell Commercial Showroom</h1>
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
                onClick={prevStep}
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
                  onClick={nextStep}
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

export default SellShowroomMain

