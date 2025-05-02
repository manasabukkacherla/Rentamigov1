"use client"

import { useState, useCallback, useRef } from "react"
import { Building2, MapPin, IndianRupee, Calendar, Image, Ruler, Home, Store, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import PropertyName from "../PropertyName"
import PropertyAddress from "../PropertyAddress"
import MapSelector from "../MapSelector"
import PropertySize from "../PropertySize"
import PropertyFeatures from "../PropertyFeatures"
import FlatAmenities from "../FlatAmenities"
import SocietyAmenities from "../SocietyAmenities"
import MediaUpload from "../MediaUpload"
import AvailabilityDate from "../AvailabilityDate"
import Restrictions from "../Restrictions"
import FinalSteps from "../FinalSteps"

interface ApartmentProps {
  propertyId: string
  onSubmit?: () => void
}

interface Address {
  street: string
  city: string
  state: string
  country: string
  pincode: string
  flatNo: string
}

interface Coordinates {
  lat: number
  lng: number
}

interface Size {
  builtUpArea: string
  carpetArea: string
  superBuiltUpArea: string
  unit: string
}

interface Features {
  bedrooms: string
  bathrooms: string
  balconies: string
  parking: string
  furnishing: string
  floor: string
  totalFloors: string
  facing: string
  age: string
  rent: string
  securityDeposit: string
  maintenanceCharges: string
  maintenancePeriod: string
  availableFrom: Date

  preferredTenants: string[]
  amenities: string[]
  propertyFeatures: string[]
  societyFeatures: string[]
  restrictions: string[]
  images: string[]
  videos: string[]
}

interface FormData {
  propertyName: string
  address: Address
  coordinates: Coordinates
  size: Size
  features: Features
}

interface PropertyNameProps {
  propertyName: string
  onPropertyNameChange: (name: string) => void
}

interface MapSelectorProps {
  latitude: string
  longitude: string
  onLocationSelect: (lat: string, lng: string, address?: any) => void
  initialShowMap?: boolean
}

interface PropertySizeProps {
  onPropertySizeChange: (size: string) => void
}

interface PropertyFeaturesProps {
  onFeaturesChange?: (features: Record<string, any>) => void
}

interface FlatAmenitiesProps {
  amenities: string[]
  onChange: (amenities: string[]) => void
}

interface SocietyAmenitiesProps {
  amenities: string[]
  onChange: (amenities: string[]) => void
}

interface RestrictionsProps {
  restrictions: string[]
  onChange: (restrictions: string[]) => void
}

interface AvailabilityDateProps {
  date: Date
  onChange: (date: Date) => void
}

interface PropertyAddressType {
  flatNo?: string
  floor?: string
  apartmentName?: string
  street?: string
  city?: string
  state?: string
  zipCode?: string
  coordinates?: {
    lat: number
    lng: number
  }
  locationLabel?: string
}

interface MediaUploadProps {
  images: string[]
  videos: string[]
  onImagesChange: (images: string[]) => void
  onVideosChange: (videos: string[]) => void
}

const Apartment = ({ propertyId, onSubmit }: ApartmentProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<FormData>({
    propertyName: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      flatNo: ""
    },
    coordinates: {
      lat: 0,
      lng: 0
    },
    size: {
      builtUpArea: "",
      carpetArea: "",
      superBuiltUpArea: "",
      unit: "sq-ft"
    },
    features: {
      bedrooms: "",
      bathrooms: "",
      balconies: "",
      parking: "",
      furnishing: "unfurnished",
      floor: "",
      totalFloors: "",
      facing: "",
      age: "",
      rent: "",
      securityDeposit: "",
      maintenanceCharges: "",
      maintenancePeriod: "monthly",
      availableFrom: new Date(),
      preferredTenants: [],
      amenities: [],
      propertyFeatures: [],
      societyFeatures: [],
      restrictions: [],
      images: [],
      videos: []
    }
  })

  const handleAddressChange = useCallback((newAddress: PropertyAddressType) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        street: newAddress.street || '',
        city: newAddress.city || '',
        state: newAddress.state || '',
        flatNo: newAddress.flatNo || '',
        pincode: newAddress.zipCode || ''
      }
    }))
  }, [])

  const handleLocationSelect = useCallback((lat: string, lng: string, address?: any) => {
    setFormData(prev => ({
      ...prev,
      coordinates: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      },
      address: {
        ...prev.address,
        street: address?.address || prev.address.street,
        city: address?.city || prev.address.city,
        state: address?.state || prev.address.state,
        country: address?.country || prev.address.country,
        pincode: address?.pinCode || prev.address.pincode
      }
    }))
  }, [])


  const formSections = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name: string) => setFormData(prev => ({ ...prev, propertyName: name }))}
          />
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>

              <PropertyAddress
                address={formData.propertyAddress}
                onAddressChange={handleAddressChange}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Size</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <PropertySize
                  onPropertySizeChange={(size: string) => setFormData(prev => ({
                    ...prev,
                    size: {
                      ...prev.size,
                      builtUpArea: size
                    }
                  }))}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Features</h3>
              </div>
              <PropertyFeatures
                onFeaturesChange={(features: Record<string, any>) => {
                  setFormData(prev => ({
                    ...prev,
                    features: {
                      ...prev.features,
                      ...features
                    }
                  }))
                }}
              />
            </div>


          </div>
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <Restrictions
              restrictions={formData.features.restrictions}
              onChange={(restrictions: string[]) => setFormData(prev => ({
                ...prev,
                features: { ...prev.features, restrictions }
              }))}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
              <div className="space-y-8">
                <div className="flex items-center mb-8">
                  <Building2 className="text-black mr-3" size={28} />
                  <h3 className="text-2xl font-semibold text-black">Amenities</h3>
                </div>

                <div className="space-y-12">
                  <FlatAmenities
                    amenities={formData.features.amenities}
                    onChange={(amenities: string[]) => setFormData(prev => ({
                      ...prev,
                      features: { ...prev.features, amenities }
                    }))}
                  />
                  <SocietyAmenities
                    amenities={formData.features.societyFeatures}
                    onChange={(amenities: string[]) => setFormData(prev => ({
                      ...prev,
                      features: { ...prev.features, societyFeatures: amenities }
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // {
    //   title: "Amenities",
    //   icon: <Building2 className="w-5 h-5" />,
    //   content: (

    //   ),
    // },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">

              <AvailabilityDate
                date={formData.features.availableFrom}
                onChange={(date: Date) => setFormData(prev => ({
                  ...prev,
                  features: { ...prev.features, availableFrom: date }
                }))}
              />

            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-8">

              <MediaUpload
                images={formData.features.images}
                videos={formData.features.videos}
                onImagesChange={(images: string[]) => setFormData(prev => ({
                  ...prev,
                  features: { ...prev.features, images }
                }))}
                onVideosChange={(videos: string[]) => setFormData(prev => ({
                  ...prev,
                  features: { ...prev.features, videos }
                }))}
              />
            </div>
          </div>
      ),
    },
  ];


  return (
    <div ref={formRef} className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setCurrentStep(index + 1);
                    setTimeout(() => {
                      if (formRef.current) {
                        window.scrollTo({
                          top: formRef.current.offsetTop - 100,
                          behavior: 'smooth'
                        });
                      } else {
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        });
                      }
                    }, 100);
                  }}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index + 1 <= currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index + 1 <= currentStep ? 'text-black' : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {section.title}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className={`w-12 h-1 transition-colors duration-200 ${index < currentStep - 1 ? 'bg-black' : 'bg-gray-200'
                        }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">List Your Apartment</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep - 1].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep - 1].content}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          <button
            onClick={() => {
              if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
                setTimeout(() => {
                  if (formRef.current) {
                    window.scrollTo({
                      top: formRef.current.offsetTop - 100,
                      behavior: 'smooth'
                    });
                  }
                }, 100);
              }
            }}
            disabled={currentStep === 1 || loading}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          <button
            onClick={() => {
              if (currentStep < formSections.length) {
                setCurrentStep(currentStep + 1);
                setTimeout(() => {
                  if (formRef.current) {
                    window.scrollTo({
                      top: formRef.current.offsetTop - 100,
                      behavior: 'smooth'
                    });
                  }
                }, 100);
              } else {
                onSubmit?.();
              }
            }}
            disabled={loading}
            className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Submitting...
              </>
            ) : (
              <>
                {currentStep === formSections.length ? 'Submit' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
          {success}
        </div>
      )}
    </div>
  );
};

export default Apartment;
