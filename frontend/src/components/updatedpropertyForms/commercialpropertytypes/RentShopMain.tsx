"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
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
import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon, Calendar, DollarSign } from "lucide-react"

const globalStyles = `
  input::placeholder,
  textarea::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
  
  /* Make radio button and checkbox text black */
  input[type="radio"] + label,
  input[type="checkbox"] + label {
    color: black;
  }
  
  /* Make select placeholder text black */
  select {
    color: black;
  }
  
  /* Make all form labels black */
  label {
    color: black;
  }
  
  /* Make all input text black */
  input,
  textarea,
  select {
    color: black;
  }
`;

interface FormData {
  propertyName: string
  shopType: string
  address: Record<string, string>
  landmark: string
  coordinates: {
    latitude: string
    longitude: string
  }
  isCornerProperty: boolean
  shopDetails: Record<string, any>
  propertyDetails: {
    expectedRent: string
    isNegotiable: boolean
    rentType: string
  }
  securityDeposit: Record<string, any>
  maintenanceAmount: Record<string, any>
  otherCharges: Record<string, any>
  brokerage: Record<string, any>
  availabilityDate: Record<string, any>
  contactDetails: Record<string, string>
  media: {
    images: { category: string; files: { url: string; file: File }[] }[]
    video?: { url: string; file: File }
    documents: { type: string; file: File }[]
  }
}

// Error display component for validation errors
const ErrorDisplay = ({ errors }: { errors: Record<string, string> }) => {
  if (Object.keys(errors).length === 0) return null;
  
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <div className="flex items-center">
        <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-red-800 font-medium">Please fix the following errors:</h3>
      </div>
      <ul className="mt-2 list-disc list-inside text-red-600">
        {Object.values(errors).map((error, index) => (
          <li key={index} className="text-sm">{error}</li>
        ))}
      </ul>
    </div>
  );
};

const RentShopMain = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    propertyName: "",
    shopType: "",
    address: {},
    landmark: "",
    coordinates: {
      latitude: "",
      longitude: ""
    },
    isCornerProperty: false,
    shopDetails: {},
    propertyDetails: {
      expectedRent: "",
      isNegotiable: false,
      rentType: ""
    },
    securityDeposit: {},
    maintenanceAmount: {},
    otherCharges: {},
    brokerage: {},
    availabilityDate: {},
    contactDetails: {},
    media: {
      images: [],
      documents: []
    }
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Check login status on component mount
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  // Function to update coordinates
  const handleLocationSelect = (latitude: string, longitude: string) => {
    setFormData({
      ...formData,
      coordinates: { latitude, longitude },
    })
  }

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};
    // Add validation logic here if needed
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderFormSection = (content: React.ReactNode) => (
    <div className="space-y-4">
      <ErrorDisplay errors={formErrors} />
      {content}
    </div>
  );

  const formSections = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Store className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Shop Details</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="propertyName" className="block text-black font-medium mb-2">
                Property Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="propertyName"
                  placeholder="Enter shop name"
                  value={formData.propertyName}
                  onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-0 focus:border-black outline-none transition-all duration-200 text-black placeholder:text-black bg-white"
                />
                <Store className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-black font-medium mb-2">Shop Type</label>
              <select
                value={formData.shopType}
                onChange={(e) => setFormData({ ...formData, shopType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-0 focus:border-black outline-none transition-all duration-200 bg-white text-black [&_option]:text-black [&_option]:bg-white"
              >
                <option value="" className="text-black bg-white">Select shop type</option>
                <option value="retail" className="text-black bg-white">Retail Shop</option>
                <option value="commercial" className="text-black bg-white">Commercial Shop</option>
                <option value="food" className="text-black bg-white">Food & Beverage</option>
                <option value="service" className="text-black bg-white">Service Shop</option>
              </select>
            </div>

            <div>
              <label htmlFor="address" className="block text-black font-medium mb-2">
                Address
              </label>
              <textarea
                id="address"
                placeholder="Enter complete address"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-0 focus:border-black outline-none transition-all duration-200 min-h-[100px] text-black placeholder:text-black bg-white"
              />
            </div>

            <div>
              <label htmlFor="landmark" className="block text-black font-medium mb-2">
                Landmark
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="landmark"
                  placeholder="Enter nearby landmark"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-0 focus:border-black outline-none transition-all duration-200 text-black placeholder:text-black bg-white"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
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
                <span className="text-black">This is a corner property</span>
              </label>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <div className="space-y-6">
            <ShopDetails onDetailsChange={(details) => setFormData({ ...formData, shopDetails: details })} />
          </div>
        </div>
      ),
    },
    {
      title: "Rental Terms",
      icon: <DollarSign className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Rental Terms</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Rent Information</h4>
              <div className="space-y-4 text-black">
                <Rent onRentChange={(rent) => setFormData({ ...formData, propertyDetails: { ...formData.propertyDetails, ...rent } })} />
                <SecurityDeposit onSecurityDepositChange={(deposit) => setFormData({ ...formData, securityDeposit: deposit })} />
                <MaintenanceAmount onMaintenanceAmountChange={(maintenance) => setFormData({ ...formData, maintenanceAmount: maintenance })} />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Additional Charges</h4>
              <div className="space-y-4 text-black">
                <OtherCharges onOtherChargesChange={(charges) => setFormData({ ...formData, otherCharges: charges })} />
                <div className="border-t border-gray-200 my-4"></div>
                <Brokerage onBrokerageChange={(brokerage) => setFormData({ ...formData, brokerage: brokerage })} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Availability</h3>
          </div>
          <AvailabilityDate onAvailabilityChange={(date) => setFormData({ ...formData, availabilityDate: date })} />
        </div>
      ),
    },
    {
      title: "Location Details",
      icon: <MapPin className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Location Details</h3>
          </div>
          <MapSelector 
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            onLocationSelect={(lat, lng, address) => {
              setFormData({
                ...formData,
                coordinates: { latitude: lat, longitude: lng },
                address: address || {}
              })
            }}
          />
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <UserCircle className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Contact Information</h3>
          </div>
          <CommercialContactDetails onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })} />
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Media</h3>
          </div>
          <CommercialMediaUpload onMediaChange={(media) => setFormData({ ...formData, media })} />
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < formSections.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Add API submission logic here
    console.log("Form Data:", formData)
    toast.success('Form submitted successfully!')
    setIsSubmitting(false)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to continue</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{globalStyles}</style>

      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index <= currentStep
                      ? 'text-black'
                      : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {section.title}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className={`w-12 h-1 transition-colors duration-200 ${index < currentStep ? 'bg-black' : 'bg-gray-200'
                        }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep].content}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          <button
            onClick={currentStep === formSections.length - 1 ? handleSubmit : handleNext}
            className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            disabled={isSubmitting}
          >
            {currentStep === formSections.length - 1 ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RentShopMain

