"use client"

import { useState, useRef } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, ChevronRight, ChevronLeft } from "lucide-react"
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
import { useNavigate } from "react-router-dom"
import MapLocation from "../CommercialComponents/MapLocation"



interface IArea {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
}

interface IBasicInformation {
  title: string;
  Type: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  location: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
}

interface IPricingDetails {
  propertyPrice: number;
  pricetype: "fixed" | "negotiable";
  area: number;
  totalprice: number;
  pricePerSqft: number;
}

interface IAvailability {
  availableFrom?: string;
  availableImmediately: boolean;
  leaseDuration: string;
  noticePeriod: string;
  petsAllowed: boolean;
  operatingHours: {
    restricted: boolean;
    restrictions: string;
  };
}

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
}

interface IMedia {
  photos: {
    exterior: File[];
    interior: File[];
    floorPlan: File[];
    washrooms: File[];
    lifts: File[];
    emergencyExits: File[];
  };
  videoTour: File | null;
  documents: File[];
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

interface FormData {
  basicInformation: IBasicInformation;
  warehouseDetails: {
    ceilingHeight: number;
    totalArea: number;
    docks: {
      count: number;
      height: number;
    };
    floorLoadCapacity: number;
    fireSafety: boolean;
    securityPersonnel: boolean;
    access24x7: boolean;
    truckParking: boolean;
  };
  propertyDetails: {
    area: IArea;
    floor: IFloor;
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
    waterAvailability: string[];
    propertyAge: string;
    propertyCondition: string;
  };
  pricingDetails: IPricingDetails;
  registration: {
    chargestype: "inclusive" | "exclusive";
    registrationAmount?: number;
    stampDutyAmount?: number;
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: IAvailability;
  contactInformation: IContactInformation;
  media: IMedia;
}

const SellWarehouseMain = () => {
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
      Type: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      landmark: '',
      location: {
        latitude: '',
        longitude: ''
      },
      isCornerProperty: false 
    },
    warehouseDetails: {
      ceilingHeight: 0,
      totalArea: 0,
      docks: {
        count: 0,
        height: 0
      },
      floorLoadCapacity: 0,
      fireSafety: false,
      securityPersonnel: false,
      access24x7: false,
      truckParking: false
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
      facingDirection: '',
      furnishingStatus: '',
      propertyAmenities: [],
      wholeSpaceAmenities: [],
      electricitySupply: {
        powerLoad: 0,
        backup: false
      },
      waterAvailability: [],
      propertyAge: '',
      propertyCondition: ''
    },
    pricingDetails: {
      propertyPrice: 0,
      pricetype: "fixed",
      area: 0,
      totalprice: 0,
      pricePerSqft: 0
    },
    registration: {
      chargestype: "inclusive",
      registrationAmount: 0,
      stampDutyAmount: 0
    },
    brokerage: {
      required: "no",
      amount: 0
    },
    availability: {
      availableFrom: new Date().toISOString(),
      availableImmediately: false,
      leaseDuration: '',
      noticePeriod: '',
      petsAllowed: false,
      operatingHours: {
        restricted: false,
        restrictions: ''
      }
    },
    contactInformation: {
      name: '',
      email: '',
      phone: '',
      alternatePhone: '',
      bestTimeToContact: ''
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        lifts: [],
        emergencyExits: []
      },
      videoTour: null,
      documents: []
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [, setSubmitError] = useState<string | null>(null)

  const [currentStep, setCurrentStep] = useState(0)
  const formRef = useRef<HTMLDivElement>(null)

  const handleChange = (key: string, value: any) => {
    setFormData(prev => {
      const keys = key.split('.');
      if (keys.length > 1) {
        const newData = { ...prev };
        let current: any = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
      }
      return { ...prev, [key]: value };
    });
  };

  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, title: name }
            }))}
          />
          <WarehouseType
            onWarehouseTypeChange={(types: string[]) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, Type: types }
            }))}
          />
          <CommercialPropertyAddress
            address={formData.basicInformation.address}
            onAddressChange={(address) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, address }
            }))}
          />
          {/* <Landmark
            onLandmarkChange={(landmark) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, landmark }
            }))}
            onLocationSelect={(location) => setFormData(prev => ({
              ...prev,
              basicInformation: {
                ...prev.basicInformation,
                location: {
                  latitude: parseFloat(location.latitude),
                  longitude: parseFloat(location.longitude)
                }
              }
            }))}
          /> */}
          <MapLocation
            latitude={formData.basicInformation.location.latitude.toString()}
            longitude={formData.basicInformation.location.longitude.toString()}
            landmark={formData.basicInformation.landmark}
            onLocationChange={(location) => handleChange('basicInformation.location', location)}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
          />
          <CornerProperty
            isCornerProperty={formData.basicInformation.isCornerProperty}
            onCornerPropertyChange={(isCorner) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <WarehouseDetails
            onDetailsChange={(details) => setFormData(prev => ({
              ...prev,
              warehouseDetails: { ...prev.warehouseDetails, ...details }
            }))}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => {
              // Ensure waterAvailability is treated as string array
              const modifiedDetails = {
                ...details,
                waterAvailability: Array.isArray(details.waterAvailability)
                  ? details.waterAvailability
                  : details.waterAvailability ? [details.waterAvailability] : []
              };

              setFormData(prev => ({
                ...prev,
                propertyDetails: {
                  ...prev.propertyDetails,
                  ...modifiedDetails,
                  electricitySupply: {
                    ...prev.propertyDetails.electricitySupply,
                    powerLoad: details.electricitySupply?.powerLoad ?? prev.propertyDetails.electricitySupply.powerLoad
                  },
                  propertyAge: typeof details.propertyAge === 'string'
                    ? details.propertyAge
                    : prev.propertyDetails.propertyAge
                }
              }))
            }}
          />
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Price
            onPriceChange={(price) => setFormData(prev => ({
              ...prev,
              pricingDetails: { ...prev.pricingDetails, ...price }
            }))}
          />
          <PricePerSqft
            propertyPrice={formData.pricingDetails.propertyPrice}
            Area={formData.propertyDetails.area}
            onPricePerSqftChange={(data) => setFormData(prev => ({
              ...prev,
              pricingDetails: {
                ...prev.pricingDetails,
                area: data.area,
                totalprice: data.totalprice,
                pricePerSqft: data.pricePerSqft
              }
            }))}
          />
          <RegistrationCharges
            onRegistrationChargesChange={(charges) => setFormData(prev => ({
              ...prev,
              registration: { ...prev.registration, ...charges }
            }))}
          />
          <Brokerage
            bro={formData.brokerage}
            onBrokerageChange={(brokerage) => setFormData(prev => ({
              ...prev,
              brokerage: { ...prev.brokerage, ...brokerage }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <CommercialAvailability
            onAvailabilityChange={(availability) => setFormData(prev => ({
              ...prev,
              availability: { ...prev.availability, ...availability }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <CommercialContactDetails
            contactInformation={formData.contactInformation}
            onContactChange={(contact) => setFormData(prev => ({
              ...prev,
              contactInformation: { ...prev.contactInformation, ...contact }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      content: (
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

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
  }

  const navigate = useNavigate();

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    console.log(formData)

    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

        const convertedMedia = {
          photos: {
            exterior: await Promise.all((formData.media?.photos?.exterior ?? []).map(convertFileToBase64)),
            interior: await Promise.all((formData.media?.photos?.interior ?? []).map(convertFileToBase64)),
            floorPlan: await Promise.all((formData.media?.photos?.floorPlan ?? []).map(convertFileToBase64)),
            washrooms: await Promise.all((formData.media?.photos?.washrooms ?? []).map(convertFileToBase64)),
            lifts: await Promise.all((formData.media?.photos?.lifts ?? []).map(convertFileToBase64)),
            emergencyExits: await Promise.all((formData.media?.photos?.emergencyExits ?? []).map(convertFileToBase64))
          },
          videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
          documents: await Promise.all((formData.media?.documents ?? []).map(convertFileToBase64))
        };
        console.log(formData)

        const transformedData = {
          basicInformation: {
            ...formData.basicInformation
          },
          warehouseDetails: {
            ...formData.warehouseDetails
          },
          propertyDetails: {
            ...formData.propertyDetails,
            waterAvailability: Array.isArray(formData.propertyDetails.waterAvailability)
              ? formData.propertyDetails.waterAvailability[0] || 'scheduled'
              : formData.propertyDetails.waterAvailability,
            propertyAge: typeof formData.propertyDetails.propertyAge === 'string'
              ? formData.propertyDetails.propertyAge
              : formData.propertyDetails.propertyAge
          },
          pricingDetails: {
            ...formData.pricingDetails
          },
          registration: {
            ...formData.registration
          },
          brokerage: {
            ...formData.brokerage
          },
          availability: {
            ...formData.availability,
            leaseDuration: formData.availability.leaseDuration || 'Not Specified',
            noticePeriod: formData.availability.noticePeriod || 'Not Specified',
            petsAllowed: formData.availability.petsAllowed === true
          },
          contactInformation: {
            ...formData.contactInformation
          },
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date(),
            propertyType: 'Commercial',
            propertyName: 'Warehouse',
            intent: 'Sell',
            status: 'Available',
          }
        };


        console.log(transformedData);
        const response = await axios.post('/api/commercial/sell/warehouses', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)

        if (response.data.success) {
          toast.success('Commercial warehouses listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial wareshouses listing. Please try again.');
    } finally {
      // setIsSubmitting(false)
    }
  }

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setCurrentStep(index);
                    // Scroll to top of the form when clicking on progress indicators
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
                  {index < steps.length - 1 && (
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

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Sale Commercial Warehouse</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {steps[currentStep].content}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0 || isSubmitting}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 0 || isSubmitting
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-black hover:text-white"
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          <button
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={isSubmitting}
            className={`flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isSubmitting ? "Submitting..." : currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SellWarehouseMain

