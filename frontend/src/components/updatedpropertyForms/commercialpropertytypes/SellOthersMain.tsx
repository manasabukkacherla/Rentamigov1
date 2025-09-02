"use client"

import { useState, useRef } from "react"
import PropertyName from "../PropertyName"
import OtherCommercialType from "../CommercialComponents/OtherCommercialType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import MapCoordinates from "../MapCoordinates"
import CornerProperty from "../CommercialComponents/CornerProperty"
import OtherPropertyDetails from "../CommercialComponents/OtherPropertyDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import PricePerSqft from "../sell/PricePerSqft"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"
import {
  MapPin,
  Building2,
  DollarSign,
  Calendar,
  User,
  Image,
  FileQuestion,
  ImageIcon,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import MapLocation from "../CommercialComponents/MapLocation"

// Define interface that matches backend model structure
interface FormData {
  propertyId?: string;
  basicInformation:{
  title: string;
  type: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  location: {
    latitude: string;
    longitude: string
  };
  isCornerProperty: boolean;
},
  propertyDetails: {
    area: {
      totalArea: number;
      carpetArea: number;
      builtUpArea: number;
    };
    floor: {
      floorNumber: number;
      totalFloors: number;
    };
    otherDetails: {
      propertyTypeDescription: string;
      specialFeatures: string;
      usageRecommendation: string;
      additionalRequirements: string;
    };
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };
  pricingDetails: {
    propertyPrice: number;
    pricetype: "fixed" | "negotiable";
  };
  registration: {
    chargestype: 'inclusive' | 'exclusive',
    registrationAmount?: number,
    stampDutyAmount?: number
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: 'immediate' | 'specific';
    date?: Date;
    preferredLeaseDuration?: string;
    noticePeriod?: string;
  };
  petsAllowed: boolean;
  operatingHoursRestrictions: boolean;
  contactDetails: {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    bestTimeToContact?: string;
  };
  media: {
    photos: {
      exterior: File[];
      interior: File[];
      floorPlan: File[];
      washrooms: File[];
      lifts: File[];
      emergencyExits: File[];
      others: File[];
    };
    videoTour: File | null;
    documents: File[];
  };
  metaData?: {
    createdBy: string;
    createdAt: Date;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
  };
}

const SellOthersMain = () => {
  const navigate = useNavigate()
  const formRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<FormData>({
    basicInformation:{
    title: "",
    type: [],
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    landmark: "",
    location: { latitude: "", longitude: "" },
    isCornerProperty: false,
  },
    propertyDetails: {
      area: {
        totalArea: 0,
        carpetArea: 0,
        builtUpArea: 0
      },
      floor: {
        floorNumber: 0,
        totalFloors: 0
      },
      otherDetails: {
        propertyTypeDescription: "",
        specialFeatures: "",
        usageRecommendation: "",
        additionalRequirements: ""
      },
      facingDirection: "",
      furnishingStatus: "",
      propertyAmenities: [],
      wholeSpaceAmenities: [],
      waterAvailability: "",
      propertyAge: "",
      propertyCondition: "",
      electricitySupply: {
        
        powerLoad: 0,
        backup: false
      }
    },
    pricingDetails: {
      propertyPrice: 0,
      pricetype: "fixed"
    },
    registration: {
      chargestype: 'inclusive',
      registrationAmount: 0,
      stampDutyAmount: 0
    },
    brokerage: {
      required: "No",
      amount: 0
    },
    availability: {
      type: "immediate"
    },
    petsAllowed: false,
    operatingHoursRestrictions: false,
    contactDetails: {
      name: "",
      email: "",
      phone: "",
      alternatePhone: "",
      bestTimeToContact: ""
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        lifts: [],
        emergencyExits: [],
        others: []
      },
      videoTour: null,
      documents: []
    }
  })

  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Basic Information",
      icon: <FileQuestion className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <div className="space-y-6">
            <PropertyName
              propertyName={formData.basicInformation.title}
              onPropertyNameChange={(name) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, title: name } }))}
            />

            <OtherCommercialType
              onCommercialTypeChange={(type) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, type: type as string[] } }))}
            />
          </div>

          <div className="space-y-6">
            <CommercialPropertyAddress address={formData.basicInformation.address} onAddressChange={(address) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, address } }))} />
            {/* <Landmark
                onLandmarkChange={(landmark) => setFormData((prev) => ({ ...prev, landmark }))}
                onLocationSelect={(location) => setFormData((prev) => ({
                  ...prev,
                  coordinates: {
                    latitude: location.latitude,
                    longitude: location.longitude
                  }
                }))}
              /> */}
            <MapLocation
              latitude={formData.basicInformation.location.latitude.toString()}
              longitude={formData.basicInformation.location.longitude.toString()}
              landmark={formData.basicInformation.landmark}
              onLocationChange={(location) => setFormData((prev) => ({
                ...prev,
                basicInformation: {
                  ...prev.basicInformation,
                  location: location
                }
              }))}
              onAddressChange={(address) => setFormData((prev) => ({
                ...prev,
                basicInformation: {
                  ...prev.basicInformation,
                  address
                }
              }))}
              onLandmarkChange={(landmark) => setFormData((prev) => ({
                ...prev,
                basicInformation: {
                  ...prev.basicInformation,
                  landmark
                }
              }))}
            />

            <CornerProperty
              isCornerProperty={formData.basicInformation.isCornerProperty}
              onCornerPropertyChange={(isCorner) =>
                setFormData((prev) => ({ ...prev, isCornerProperty: isCorner }))
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <OtherPropertyDetails
            onDetailsChange={(details) => {
              setFormData((prev) => ({
                ...prev,
                propertyDetails: {
                  ...prev.propertyDetails,
                  otherDetails: details as FormData['propertyDetails']['otherDetails']
                }
              }));
            }}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => {
              const updatedDetails = { ...formData.propertyDetails };
              // Merge the returned details with our existing propertyDetails
              // This preserves the otherDetails structure
              Object.assign(updatedDetails, details);
              setFormData((prev) => ({
                ...prev,
                propertyDetails: updatedDetails
              }));
            }}
          />
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <div className="space-y-4 text-black">
            <Price onPriceChange={(price) =>
              setFormData((prev) => ({
                ...prev,
                pricingDetails: {
                  propertyPrice: parseFloat(price.propertyPrice.toString()),
                  pricetype: price.pricetype
                }
              }))
            } />
          </div>

          <div className="space-y-4 text-black">
            <RegistrationCharges
              onRegistrationChargesChange={(charges) =>
                setFormData((prev) => ({
                  ...prev,
                  registration: {
                    chargestype: charges.chargestype,
                    registrationAmount: charges.registrationAmount,
                    stampDutyAmount: charges.stampDutyAmount
                  }
                }))
              }
            />
            <div className="text-black">
              <Brokerage
                bro={formData.brokerage}
                onBrokerageChange={(brokerage) =>
                  setFormData((prev) => ({
                    ...prev,
                    brokerage: brokerage as FormData['brokerage']
                  }))
                }
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CommercialAvailability
            onAvailabilityChange={(availability) => {
              setFormData((prev) => ({
                ...prev,
                availability: {
                  type: availability.type,
                  date: availability.date,
                  preferredLeaseDuration: availability.preferredLeaseDuration,
                  noticePeriod: availability.noticePeriod
                },
                petsAllowed: availability.petsAllowed || false,
                operatingHoursRestrictions: availability.operatingHoursRestrictions || false
              }));
            }}
          />
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CommercialContactDetails
            contactInformation={formData.contactDetails}
            onContactChange={(contact) => setFormData((prev) => ({
              ...prev,
              contactDetails: contact as FormData['contactDetails']
            }))}
          />
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CommercialMediaUpload
            Media={{
              photos: Object.entries(formData.media.photos).map(([category, files]) => ({
                category,
                files: files.map(file => ({ url: URL.createObjectURL(file), file }))
              })),
              videoTour: formData.media.videoTour || null,
              documents: formData.media.documents
            }}
            onMediaChange={(media) => {
              const photos: Record<string, File[]> = {};
              media.photos.forEach(({ category, files }: { category: string, files: { url: string, file: File }[] }) => {
                photos[category] = files.map(f => f.file);
              });

              setFormData(prev => ({
                ...prev,
                media: {
                  ...prev.media,
                  photos: {
                    ...prev.media.photos,
                    ...photos
                  },
                  videoTour: media.videoTour || null,
                  documents: media.documents
                }
              }));
            }}
          />
        </div>
      ),
    },
  ]

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of the form
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
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of the form
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
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate location before submitting
  const validateLocation = () => {
    const { latitude, longitude } = formData.basicInformation.location;
    return latitude && latitude.trim() !== '' && longitude && longitude.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLocation()) {
      toast.error('Please select a valid location on the map (latitude and longitude are required).');
      return;
    }
    console.log('Submitting payload:', formData);
    setIsSubmitting(true);

    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        toast.error('You must be logged in to create a property listing');
        setIsSubmitting(false);
        return;
      }

      const author = JSON.parse(user).id;

      // Convert uploaded files to base64 strings
      const convertedMedia = {
        photos: {
          exterior: await Promise.all((formData.media?.photos?.exterior || []).map(convertFileToBase64)),
          interior: await Promise.all((formData.media?.photos?.interior || []).map(convertFileToBase64)),
          floorPlan: await Promise.all((formData.media?.photos?.floorPlan || []).map(convertFileToBase64)),
          washrooms: await Promise.all((formData.media?.photos?.washrooms || []).map(convertFileToBase64)),
          lifts: await Promise.all((formData.media?.photos?.lifts || []).map(convertFileToBase64)),
          emergencyExits: await Promise.all((formData.media?.photos?.emergencyExits || []).map(convertFileToBase64)),
          others: await Promise.all((formData.media?.photos?.others || []).map(convertFileToBase64))
        },
        videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
        documents: await Promise.all((formData.media?.documents || []).map(convertFileToBase64))
      };

      // Create payload matching the backend model structure
      const transformedData = {
        ...formData,
        media: convertedMedia,
        metadata: {
          createdBy: author,
          propertyType: 'Commercial',
          propertyName: 'Other',
          intent: 'Sell',
          status: 'Available',
        }
      };

      // Send data to API
      const response = await axios.post('/api/commercial/sell/others', transformedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        toast.success('Commercial property successfully listed!');
        // Navigate to dashboard
        navigate('/updatePropertyform');
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || 'Failed to create property listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center cursor-pointer"
                  onClick={() => setCurrentStep(i)}
                >
                  <div className="flex flex-col items-center group">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                    >
                      {s.icon}
                    </div>
                    <span
                      className={`text-xs mt-1 font-medium transition-colors duration-200 ${i <= currentStep ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                        }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div
                        className={`w-12 h-1 transition-colors duration-200 ${i < currentStep ? "bg-black" : "bg-gray-200"
                          }`}
                      ></div>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Sale Commercial Others</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {steps[currentStep].component}
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
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={isSubmitting}
            className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Submitting...
              </>
            ) : (
              <>
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SellOthersMain

