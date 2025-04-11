"use client"

import { useState } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon } from "lucide-react"
import PropertyName from "../PropertyName"
import WarehouseType from "../CommercialComponents/WarehouseType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
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
import { toast } from "react-hot-toast"
import axios from "axios"

interface MediaDocument {
  type: string;
  file: File;
  url?: string;
}

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
    documents: Array<MediaDocument>;
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
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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
      content: <CommercialMediaUpload 
        onMediaChange={(mediaData) => {
          // Create URL for documents if needed
          const enhancedMedia = {
            ...mediaData,
            documents: mediaData.documents.map(doc => {
              // Use type assertion to handle the document
              const document = doc as unknown as { type: string; file: File; url?: string };
              return {
                type: document.type,
                file: document.file,
                url: document.url || URL.createObjectURL(document.file)
              } as MediaDocument;
            })
          };
          setFormData(prev => ({ ...prev, media: enhancedMedia }));
        }} 
      />,
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

  // Transform the form data into the format expected by the backend
  const transformFormData = () => {
    // Convert frontend form data to backend schema format
    const {
      propertyName,
      warehouseType,
      address,
      landmark,
      coordinates,
      isCornerProperty,
      warehouseDetails,
      propertyDetails,
      price,
      registrationCharges,
      brokerage,
      availability,
      contactDetails,
      media
    } = formData

    // Map image categories to backend format
    const photos: Record<string, string[]> = {
      exterior: [],
      interior: [],
      floorPlan: [],
      loadingArea: [],
      storage: [],
      officeSpace: []
    }

    // Process images
    media.images.forEach(imageCategory => {
      const category = imageCategory.category.toLowerCase()
      const categoryKey = category === 'floor plan' ? 'floorPlan' :
                         category === 'loading area' ? 'loadingArea' :
                         category === 'office space' ? 'officeSpace' : category
      
      if (categoryKey in photos) {
        photos[categoryKey] = imageCategory.files.map(file => file.url)
      }
    })

    // Process documents
    const documents = media.documents.map(doc => doc.url)

    // Build the final payload
    return {
      basicInformation: {
        propertyName,
        warehouseType,
        address: {
          address: address.address || '',
          landmark: landmark,
          city: address.city || '',
          state: address.state || '',
          zipCode: address.zipCode || ''
        },
        coordinates: {
          latitude: parseFloat(coordinates.latitude),
          longitude: parseFloat(coordinates.longitude)
        },
        isCornerProperty
      },
      warehouseDetails: {
        ceilingHeight: parseFloat(warehouseDetails.ceilingHeight || '0'),
        totalArea: parseFloat(warehouseDetails.totalArea || '0'),
        dockHeight: parseFloat(warehouseDetails.dockHeight || '0'),
        numberOfDocks: parseInt(warehouseDetails.numberOfDocks || '0'),
        floorLoadCapacity: parseFloat(warehouseDetails.floorLoadCapacity || '0'),
        securityFeatures: warehouseDetails.securityFeatures || [],
        additionalFeatures: warehouseDetails.additionalFeatures || []
      },
      propertyDetails: {
        area: {
          superBuiltUpArea: parseFloat(formData.area.superBuiltUpAreaSqft || '0'),
          builtUpArea: parseFloat(formData.area.builtUpAreaSqft || '0'),
          carpetArea: parseFloat(formData.area.carpetAreaSqft || '0')
        },
        floor: {
          floorNumber: parseInt(propertyDetails.floorNumber || '0'),
          totalFloors: parseInt(propertyDetails.totalFloors || '0')
        },
        facingDirection: propertyDetails.facingDirection || '',
        furnishing: propertyDetails.furnishing || '',
        propertyAge: parseInt(propertyDetails.propertyAge || '0'),
        propertyCondition: propertyDetails.propertyCondition || '',
        propertyAmenities: propertyDetails.propertyAmenities || [],
        wholeSpaceAmenities: propertyDetails.wholeSpaceAmenities || [],
        electricitySupply: parseInt(propertyDetails.electricitySupply || '0'),
        backupPower: !!propertyDetails.backupPower,
        waterAvailability: propertyDetails.waterAvailability || ''
      },
      pricingDetails: {
        price: parseFloat(price || '0'),
        priceType: 'negotiable' // Adjust based on your form data
      },
      registration: {
        chargesType: registrationCharges.chargesType || 'exclusive',
        registrationCharges: parseFloat(registrationCharges.registrationCharges || '0'),
        stampDutyCharges: parseFloat(registrationCharges.stampDutyCharges || '0'),
        brokerageDetails: {
          hasBrokerage: !!brokerage.hasBrokerage,
          amount: parseFloat(brokerage.amount || '0'),
          percentage: parseFloat(brokerage.percentage || '0')
        }
      },
      availability: {
        availabilityStatus: availability.availabilityStatus || 'available',
        preferredLeaseDuration: availability.preferredLeaseDuration || '',
        noticePeriod: availability.noticePeriod || '',
        isPetsAllowed: !!availability.isPetsAllowed,
        operatingHoursRestrictions: !!availability.operatingHoursRestrictions
      },
      contactInformation: {
        name: contactDetails.name || '',
        email: contactDetails.email || '',
        phone: contactDetails.phone || '',
        alternatePhone: contactDetails.alternatePhone || '',
        preferredContactTime: contactDetails.preferredContactTime || ''
      },
      media: {
        photos,
        videoTour: media.video?.url || '',
        documents
      },
      metadata: {
        createdBy: "65f2d6f35714c7f89c4e7537", // Replace with actual user ID from auth context
        createdAt: new Date().toISOString()
      }
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const transformedData = transformFormData()
      console.log("Submitting data:", transformedData)
      
      // Submit data to API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/commercial-warehouses`,
        transformedData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      
      // Handle success
      toast.success("Warehouse listing created successfully!")
      console.log("Response:", response)
      
      // Optionally redirect or reset form
      // router.push('/dashboard/properties')
      
    } catch (error: any) {
      // Handle error
      setSubmitError(error.message || 'Failed to create listing')
      toast.error(error.message || 'Failed to create listing')
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Sell Commercial Warehouse</h1>
            <div className="mt-6 flex items-center space-x-6 overflow-x-auto pb-2">
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
                    <span className={`ml-3 text-sm font-medium whitespace-nowrap ${
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

            {submitError && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {submitError}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0 || isSubmitting}
                className={`px-6 py-2.5 rounded-lg border transition-all duration-200 ${
                  currentStep === 0 || isSubmitting
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
                  disabled={isSubmitting}
                  className={`px-6 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "List Property"}
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

