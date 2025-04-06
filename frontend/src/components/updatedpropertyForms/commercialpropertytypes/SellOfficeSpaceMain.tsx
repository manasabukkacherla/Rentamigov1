"use client"

import { useState } from "react"
import PropertyName from "../PropertyName"
import OfficeSpaceType from "../CommercialComponents/OfficeSpaceType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import MapCoordinates from "../MapCoordinates"
import CornerProperty from "../CommercialComponents/CornerProperty"
import OfficeSpaceDetails from "../CommercialComponents/OfficeSpaceDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import PricePerSqft from "../sell/PricePerSqft"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"
import { MapPin, Building2, DollarSign, Calendar, User, Image, Briefcase, ImageIcon, UserCircle } from "lucide-react"

const SellOfficeSpaceMain = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    officeType: "",
    address: {},
    landmark: "",
    coordinates: { latitude: "", longitude: "" },
    isCornerProperty: false,
    officeDetails: {},
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
      icon: <MapPin className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Briefcase className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Basic Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyName
                  propertyName={formData.propertyName}
                  onPropertyNameChange={(name) => setFormData((prev) => ({ ...prev, propertyName: name }))}
                />
                <OfficeSpaceType
                  onOfficeTypeChange={(type) => setFormData((prev) => ({ ...prev, officeType: type }))}
                />
              </div>
            </div>
          </div>

          <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <CommercialPropertyAddress
                  onAddressChange={(address) => setFormData((prev) => ({ ...prev, address }))}
                />
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
                  onCornerPropertyChange={(isCorner) =>
                    setFormData((prev) => ({ ...prev, isCornerProperty: isCorner }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-6 h-6" />,
      component: (
        <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building2 className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <OfficeSpaceDetails
                onDetailsChange={(details) => setFormData((prev) => ({ ...prev, officeDetails: details }))}
              />
              <CommercialPropertyDetails
                onDetailsChange={(details) => setFormData((prev) => ({ ...prev, propertyDetails: details }))}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-6 h-6" />,
      component: (
        <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <DollarSign className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Pricing Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <Price onPriceChange={(price) => setFormData((prev) => ({ ...prev, price: price.amount }))} />
              <PricePerSqft price={formData.price} area={formData.area} />
              <RegistrationCharges
                onRegistrationChargesChange={(charges) =>
                  setFormData((prev) => ({ ...prev, registrationCharges: charges }))
                }
              />
              <Brokerage onBrokerageChange={(brokerage) => setFormData((prev) => ({ ...prev, brokerage }))} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: (
        <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Calendar className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Availability</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialAvailability
                onAvailabilityChange={(availability) => setFormData((prev) => ({ ...prev, availability }))}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <User className="w-6 h-6" />,
      component: (
        <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <UserCircle className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Contact Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialContactDetails
                onContactChange={(contact) => setFormData((prev) => ({ ...prev, contactDetails: contact }))}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-6 h-6" />,
      component: (
        <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <ImageIcon className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Media</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialMediaUpload onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))} />
            </div>
          </div>
        </div>
      ),
    },
  ]

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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log("Form Data:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto text-black">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center ${i <= currentStep ? "text-black" : "text-gray-400"}`}
              onClick={() => i < currentStep && setCurrentStep(i)}
              style={{ cursor: i < currentStep ? "pointer" : "default" }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {s.icon}
              </div>
              <span className="text-xs font-medium">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-1 rounded-full">
          <div
            className="bg-black h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-black">{steps[currentStep].title}</h2>

      {steps[currentStep].component}

      <div className="mt-8 flex justify-between">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="px-6 py-3 rounded-lg border border-black/20 hover:border-black text-black transition-colors duration-200 flex items-center"
          >
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="ml-auto px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-200 flex items-center"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="ml-auto px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-200"
          >
            List Property
          </button>
        )}
      </div>
    </form>
  )
}

export default SellOfficeSpaceMain

