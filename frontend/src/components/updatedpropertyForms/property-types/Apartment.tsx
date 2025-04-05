"use client"

import { useState, useCallback } from "react"
import PropertyName from "../PropertyName"
import PropertyAddress from "../PropertyAddress"
import MapSelector from "../MapSelector"
import PropertySize from "../PropertySize"
import PropertyFeatures from "../PropertyFeatures"
import Rent from "../residentialrent/Rent"
import Restrictions from "../Restrictions"
import SecurityDeposit from "../residentialrent/SecurityDeposit"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import Brokerage from "../residentialrent/Brokerage"
import AvailabilityDate from "../AvailabilityDate"
import OtherCharges from "../residentialrent/OtherCharges"
import MediaUpload from "../MediaUpload"
import FlatAmenities from "../FlatAmenities"
import SocietyAmenities from "../SocietyAmenities"
import { Building, ChevronRight, ArrowLeft } from "lucide-react"

interface ApartmentProps {
  propertyId: string // Property ID passed as a prop
  onSubmit?: (formData: any) => void
}

const Apartment = ({ propertyId, onSubmit }: ApartmentProps) => {
  const [formData, setFormData] = useState({
    propertyId: propertyId || localStorage.getItem("propertyId") || "",
    propertyName: "",
    propertyAddress: {
      flatNo: "",
      floor: "",
      houseName: "",
      address: "",
      pinCode: "",
      city: "",
      street: "",
      state: "",
      zipCode: "",
    },
    coordinates: { latitude: "", longitude: "" },
    size: "",
    features: {},
    rent: { expectedRent: "", isNegotiable: false, rentType: "" },
    securityDeposit: {},
    maintenanceAmount: {},
    brokerage: {},
    availability: {},
    otherCharges: {},
    media: {
      categories: [],
      video: null,
      documents: [],
    },
    flatAmenities: {},
    societyAmenities: {},
    restrictions: {
      foodPreference: "",
      petsAllowed: "",
      tenantType: "",
    },
    propertyConfiguration: {
      furnishingStatus: "",
      flooringType: "",
    },
    areaDetails: {
      superBuiltUpArea: "",
      builtUpArea: "",
      carpetArea: "",
    },
    waterAvailability: "",
    electricityAvailability: "",
    propertyFacing: "",
    propertyAge: "",
    utilityArea: "",
  })

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Function to update property address details
  const handleAddressChange = useCallback((addressData: any) => {
    setFormData((prev) => ({
      ...prev,
      propertyAddress: {
        ...prev.propertyAddress,
        ...addressData,
        zipCode: addressData.pinCode || addressData.zipCode || prev.propertyAddress.zipCode,
        pinCode: addressData.zipCode || addressData.pinCode || prev.propertyAddress.pinCode
      }
    }))
  }, [])

  // Function to update coordinates and address
  const handleLocationSelect = useCallback((latitude: string, longitude: string, addressData?: any) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: { latitude, longitude },
      propertyAddress: addressData ? {
        ...prev.propertyAddress,
        ...addressData,
        zipCode: addressData.postal_code || addressData.pinCode || prev.propertyAddress.zipCode,
        city: addressData.city || addressData.locality || prev.propertyAddress.city,
        state: addressData.state || addressData.administrative_area_level_1 || prev.propertyAddress.state,
        street: addressData.street || addressData.route || prev.propertyAddress.street,
      } : prev.propertyAddress,
    }))
  }, [])

  // Function to handle media changes
  const handleMediaChange = useCallback((media: any) => {
    setFormData((prev) => ({
      ...prev,
      media,
    }))
  }, [])

  const steps = [
    {
      title: "Basic Information",
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black">
          <div className="flex items-center mb-8">
            <Building className="text-black mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-black">Apartment Details</h3>
          </div>

          <div className="space-y-8">
            <PropertyName
              propertyName={formData.propertyName}
              onPropertyNameChange={(name) => setFormData((prev) => ({ ...prev, propertyName: name }))}
            />

            <PropertyAddress onAddressChange={handleAddressChange} />

            <MapSelector
              latitude={formData.coordinates.latitude}
              longitude={formData.coordinates.longitude}
              onLocationSelect={handleLocationSelect}
            />

            <PropertySize onPropertySizeChange={(size) => setFormData((prev) => ({ ...prev, size }))} />
          </div>
        </div>
      ),
    },

    {
      title: "Property Details",
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black [&_path]:text-black [&_circle]:text-black [&_rect]:text-black [&_polygon]:text-black [&_line]:text-black [&_polyline]:text-black [&_g]:text-black">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Details</h3>
            </div>
            <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_svg]:text-black [&_path]:text-black [&_circle]:text-black [&_rect]:text-black [&_polygon]:text-black [&_line]:text-black [&_polyline]:text-black [&_g]:text-black [&_input[type=number]]:text-black [&_input[type=number]]:placeholder:text-black [&_input[type=number]]:bg-white [&_input[type=number]]:[-webkit-inner-spin-button]:appearance-auto [&_input[type=number]]:[-webkit-inner-spin-button]:opacity-100 [&_input[type=number]]:[-webkit-inner-spin-button]:text-black [&_input[type=number]]:[-webkit-outer-spin-button]:appearance-auto [&_input[type=number]]:[-webkit-outer-spin-button]:opacity-100 [&_input[type=number]]:[-webkit-outer-spin-button]:text-black [&_input[type=number]]:[-webkit-inner-spin-button]:bg-white [&_input[type=number]]:[-webkit-outer-spin-button]:bg-white [&_input[type=number]]:[-webkit-inner-spin-button]:hover:bg-black [&_input[type=number]]:[-webkit-inner-spin-button]:hover:text-white [&_input[type=number]]:[-webkit-outer-spin-button]:hover:bg-black [&_input[type=number]]:[-webkit-outer-spin-button]:hover:text-white">
              <PropertyFeatures onFeaturesChange={(features) => setFormData((prev) => ({ ...prev, features }))} />
            </div>
            <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_svg]:text-black [&_path]:text-black [&_circle]:text-black [&_rect]:text-black [&_polygon]:text-black [&_line]:text-black [&_polyline]:text-black [&_g]:text-black">
              <FlatAmenities onAmenitiesChange={(amenities) => setFormData((prev) => ({ ...prev, flatAmenities: amenities }))} />
            </div>
            <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_svg]:text-black [&_path]:text-black [&_circle]:text-black [&_rect]:text-black [&_polygon]:text-black [&_line]:text-black [&_polyline]:text-black [&_g]:text-black">
              <SocietyAmenities onAmenitiesChange={(amenities) => setFormData((prev) => ({ ...prev, societyAmenities: amenities }))} />
            </div>
            <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_svg]:text-black [&_path]:text-black [&_circle]:text-black [&_rect]:text-black [&_polygon]:text-black [&_line]:text-black [&_polyline]:text-black [&_g]:text-black">
              <Restrictions onRestrictionsChange={(restrictions) => setFormData((prev) => ({ ...prev, restrictions }))} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Rental Terms",
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Rental Terms</h3>
            </div>
            <Rent onRentChange={(rent) => setFormData((prev) => ({ ...prev, rent }))} />
            {formData.rent.rentType === "exclusive" && (
              <MaintenanceAmount
                onMaintenanceAmountChange={(maintenance) =>
                  setFormData((prev) => ({
                    ...prev,
                    maintenanceAmount: maintenance,
                  }))
                }
              />
            )}
            <SecurityDeposit onSecurityDepositChange={(deposit) => setFormData((prev) => ({ ...prev, securityDeposit: deposit }))} />
            <OtherCharges onOtherChargesChange={(charges) => setFormData((prev) => ({ ...prev, otherCharges: charges }))} />
            <Brokerage onBrokerageChange={(brokerage) => setFormData((prev) => ({ ...prev, brokerage }))} />
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Availability</h3>
            </div>
            <AvailabilityDate onAvailabilityChange={(availability) => setFormData((prev) => ({ ...prev, availability }))} />
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Media</h3>
            </div>
            <MediaUpload onMediaChange={handleMediaChange} />
          </div>
        </div>
      ),
    },
  ]

  // Function to save data at each step
  const saveStepData = async () => {
    setLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    // Generate a new property ID if we don't have one
    if (step === 0 && !formData.propertyId) {
      const newPropertyId = 'PROP_' + Date.now()
      setFormData(prev => ({
        ...prev,
        propertyId: newPropertyId
      }))
      localStorage.setItem("propertyId", newPropertyId)
    }

    const endpoint = step === 0 ? "basicdetails" : "properties"

    try {
      const payload = {
        ...formData,
        propertyId: formData.propertyId || propertyId || localStorage.getItem("propertyId"),
        propertyType: "apartment",
        listingType: "rent"
      }

      console.log('Request payload:', JSON.stringify(payload, null, 2))

      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      console.log('API Response:', JSON.stringify(result, null, 2))

      if (!response.ok) {
        const errorMessage = result.message || result.error || 'Failed to save data'
        console.error('Server Error:', errorMessage)
        throw new Error(errorMessage)
      }

      // Validate required fields in the response
      if (!result.data && !result.propertyId) {
        console.error('Invalid server response:', result)
        throw new Error('Invalid response from server')
      }

      setSuccessMessage("Step saved successfully! ✅")

      // Handle property ID from different possible response structures
      const responsePropertyId = result.data?.propertyId || result.propertyId

      if (responsePropertyId) {
        setFormData(prev => ({
          ...prev,
          propertyId: responsePropertyId
        }))
        localStorage.setItem("propertyId", responsePropertyId)
        return responsePropertyId
      }

      return formData.propertyId

    } catch (error) {
      console.error("Error saving step:", error)
      const errorMsg = error instanceof Error ? error.message : "Failed to save step. Please check your connection and try again."
      setErrorMessage(errorMsg)
      throw error // Re-throw to prevent proceeding to next step
    } finally {
      setLoading(false)
    }
  }

  // Function to handle Next button click
  const handleNext = async () => {
    if (step === 0) {
      // Validate property name
      if (!formData.propertyName.trim()) {
        setErrorMessage("Please enter a property name")
        return
      }

      // Validate address fields
      if (!formData.propertyAddress.address.trim()) {
        setErrorMessage("Please enter a property address")
        return
      }

      if (!formData.propertyAddress.zipCode.trim()) {
        setErrorMessage("Please enter a zip code")
        return
      }

      if (!formData.propertyAddress.city.trim()) {
        setErrorMessage("Please enter a city")
        return
      }

      if (!formData.propertyAddress.state.trim()) {
        setErrorMessage("Please enter a state")
        return
      }
    }

    const savedPropertyId = await saveStepData()

    if (!savedPropertyId) {
      return // Error message is already set by saveStepData
    }

    setStep((prev) => prev + 1)
  }

  // Progress indicator
  const progress = ((step + 1) / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-black">{steps[step].title}</h2>
          <span className="text-sm font-medium text-black">
            Step {step + 1} of {steps.length}
          </span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {steps[step].component}

      {/* Success & Error Messages */}
      {successMessage && (
        <div className="p-4 mt-6 bg-green-50 border border-green-200 text-green-800 rounded-xl text-center flex items-center justify-center transition-all duration-300 animate-fadeIn">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-4 mt-6 bg-red-50 border border-red-200 text-red-800 rounded-xl text-center flex items-center justify-center transition-all duration-300 animate-fadeIn">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errorMessage}
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className="px-6 py-3 border border-gray-300 rounded-xl text-black hover:bg-gray-100 transition-all duration-300 flex items-center group"
          >
            <ArrowLeft size={18} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Previous
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={loading}
          className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 flex items-center ml-auto group disabled:opacity-70 disabled:hover:bg-black"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              {step < steps.length - 1 ? "Next" : "List Property"}
              <ChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default Apartment

