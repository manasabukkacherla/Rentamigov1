"use client"

import type React from "react"
import { useState } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon } from "lucide-react"
import PropertyName from "../PropertyName"
import PlotType from "../CommercialComponents/PlotType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import MapCoordinates from "../MapCoordinates"
import CornerProperty from "../CommercialComponents/CornerProperty"
import PlotDetails from "../CommercialComponents/PlotDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import PricePerSqft from "../sell/PricePerSqft"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import MediaUpload from "../MediaUpload"

const SellPlotMain = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    plotType: "",
    address: {},
    landmark: "",
    coordinates: { latitude: "", longitude: "" },
    isCornerProperty: false,
    plotDetails: {},
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

  // Define form steps
  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      content: (
        <>
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) => setFormData({ ...formData, propertyName: name })}
          />
          <PlotType onPlotTypeChange={(type) => setFormData({ ...formData, plotType: type })} />
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
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <>
          <PlotDetails onDetailsChange={(details) => setFormData({ ...formData, plotDetails: details })} />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
          />
        </>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
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
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <CommercialAvailability onAvailabilityChange={(availability) => setFormData({ ...formData, availability })} />
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      content: (
        <CommercialContactDetails
          onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })}
        />
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      content: <MediaUpload onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))} />,
    },
  ]

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Sell Commercial Plot</h1>
            <div className="mt-6 flex items-center space-x-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className="flex items-center focus:outline-none"
                  >
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index <= currentStep ? 'bg-black text-white' : 'bg-gray-100 text-black'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${
                      index <= currentStep ? 'text-black' : 'text-black/70'
                    }`}>
                      {step.title}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-3 ${
                      index < currentStep ? 'bg-black' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white border border-black/10 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-xl font-semibold mb-6 text-black flex items-center gap-2">
                {steps[currentStep].icon}
                {steps[currentStep].title}
              </h2>
              <div className="space-y-6">{steps[currentStep].content}</div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`px-6 py-2.5 rounded-lg border transition-all duration-200 ${
                  currentStep === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-black/20 text-black hover:bg-black hover:text-white"
                }`}
              >
                Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
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

export default SellPlotMain

