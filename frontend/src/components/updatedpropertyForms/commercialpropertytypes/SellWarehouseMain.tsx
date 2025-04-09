"use client"

import { useState } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon } from "lucide-react"
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

interface FormData {
  propertyName: string;
  warehouseType: string[];
  address: Record<string, any>;
  landmark: string;
  coordinates: { latitude: string; longitude: string };
  isCornerProperty: boolean;
  warehouseDetails: Record<string, any>;
  propertyDetails: Record<string, any>;
  price: string;
  area: {
    superBuiltUpAreaSqft: string;
    builtUpAreaSqft: string;
    carpetAreaSqft: string;
  };
  registrationCharges: Record<string, any>;
  brokerage: Record<string, any>;
  availability: Record<string, any>;
  contactDetails: Record<string, any>;
  media: {
    images: Array<{
      category: string;
      files: Array<{ url: string; file: File }>;
    }>;
    video?: { url: string; file: File };
    documents: Array<{ type: string; file: File }>;
  };
}

const SellWarehouseMain = () => {
  const [formData, setFormData] = useState<FormData>({
    propertyName: "",
    warehouseType: [],
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
    media: {
      images: [],
      documents: [],
    },
  })

  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      content: (
        <>
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) => setFormData((prev) => ({ ...prev, propertyName: name }))}
          />
          <WarehouseType 
            onWarehouseTypeChange={(types: string[]) => setFormData((prev) => ({ ...prev, warehouseType: types }))} 
          />
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
      icon: <Building2 className="w-5 h-5" />,
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
      icon: <DollarSign className="w-5 h-5" />,
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
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <CommercialAvailability
          onAvailabilityChange={(availability) => setFormData((prev) => ({ ...prev, availability }))}
        />
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      content: (
        <CommercialContactDetails
          onContactChange={(contact) => setFormData((prev) => ({ ...prev, contactDetails: contact }))}
        />
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      content: <CommercialMediaUpload onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))} />,
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1)
  }

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log("Form Data:", formData)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Sell Commercial Warehouse</h1>
            <div className="mt-6 flex items-center space-x-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => handleStepClick(index)}
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

export default SellWarehouseMain

