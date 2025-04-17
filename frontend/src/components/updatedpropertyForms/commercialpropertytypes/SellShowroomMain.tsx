"use client"

import { useState } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon } from "lucide-react"
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

interface FormData {
  propertyName: string;
  showroomType: string;
  address: Record<string, any>;
  landmark: string;
  coordinates: { latitude: string; longitude: string };
  isCornerProperty: boolean;
  showroomDetails: Record<string, any>;
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

const SellShowroomMain = () => {
  const [formData, setFormData] = useState<FormData>({
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
        <div className="space-y-6">
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) => setFormData({ ...formData, propertyName: name })}
          />
          <ShowroomType
            onTypeChange={(type) => setFormData({ ...formData, showroomType: type })}
          />
          <CommercialPropertyAddress onAddressChange={(address) => setFormData({ ...formData, address })} />
          <Landmark onLandmarkChange={(landmark) => setFormData({ ...formData, landmark })} />

          <CornerProperty
            onCornerPropertyChange={(isCorner) => setFormData({ ...formData, isCornerProperty: isCorner })}
          />
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <ShowroomDetails onDetailsChange={(details) => setFormData({ ...formData, showroomDetails: details })} />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
          />
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Price onPriceChange={(price) => setFormData({ ...formData, price: price.amount })} />
          <PricePerSqft price={formData.price} area={formData.area} />
          <RegistrationCharges
            onRegistrationChargesChange={(charges) => setFormData({ ...formData, registrationCharges: charges })}
          />
          <Brokerage onBrokerageChange={(brokerage) => setFormData({ ...formData, brokerage })} />
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <CommercialAvailability onAvailabilityChange={(availability) => setFormData({ ...formData, availability })} />
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <CommercialContactDetails
            onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })}
          />
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <CommercialMediaUpload onMediaChange={(media) => setFormData({ ...formData, media })} />
        </div>
      ),
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Sell Commercial Showroom</h1>
            <div className="mt-6 flex items-center space-x-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-black text-white' : 'bg-gray-100 text-black'
                      }`}
                  >
                    {step.icon}
                  </div>
                  <span className={`ml-3 text-sm font-medium ${index <= currentStep ? 'text-black' : 'text-black/70'
                    }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-3 ${index < currentStep ? 'bg-black' : 'bg-gray-200'
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
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-6 py-2.5 rounded-lg border transition-all duration-200 ${currentStep === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-black/20 text-black hover:bg-black hover:text-white"
                  }`}
              >
                Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
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

export default SellShowroomMain

