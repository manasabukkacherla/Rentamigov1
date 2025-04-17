"use client"

import { useState } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
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
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

interface IArea {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
}

interface IBasicInformation {
  title: string;
  showroomType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  location: {
    latitude: number;
    longitude: number;
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
  propertyName: string;
  showroomType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  isCornerProperty: boolean;
  basicInformation: IBasicInformation;
  showroomDetails: {
    frontageWidth: number | null;
    ceilingHeight: number | null;
    glassFrontage: boolean;
    lightingType: string;
    acInstalled: boolean;
    nearbyCompetitors: {
      present: boolean;
      brandNames: string;
    };
    displayRacks: boolean;
  };
  propertyDetails: {
    area: IArea;
    floor: IFloor;
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
      powerLoad: number | null;
      backup: boolean;
    };
    waterAvailability: string[];
    propertyAge: number | null;
    propertyCondition: string;
  };
  pricingDetails: IPricingDetails;
  registration: {
    chargestype: "inclusive" | "exclusive";
    registrationAmount?: number;
    stampDutyAmount?: number;
  };
  brokerage: {
    required: "yes" | "no";
    amount: number;
  };
  availability: IAvailability;
  contactInformation: IContactInformation;
  media: IMedia;
}

const SellShowroomMain = () => {
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    showroomType: [],
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    landmark: '',
    isCornerProperty: false,
    basicInformation: {
      title: '',
      showroomType: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      landmark: '',
      location: {
        latitude: 0,
        longitude: 0
      },
      isCornerProperty: false
    },
    showroomDetails: {
      frontageWidth: null,
      ceilingHeight: null,
      glassFrontage: false,
      lightingType: '',
      acInstalled: false,
      nearbyCompetitors: {
        present: false,
        brandNames: ''
      },
      displayRacks: false
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
        powerLoad: null,
        backup: false
      },
      waterAvailability: [],
      propertyAge: null,
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

  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()

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
            onTypeChange={(type) => setFormData(prev => ({
              ...prev,
              showroomType: Array.isArray(type) ? type : [type]
            }))}
          />
          <CommercialPropertyAddress
            onAddressChange={(address) => setFormData(prev => ({
              ...prev,
              address
            }))}
          />
          <Landmark
            onLandmarkChange={(landmark) => setFormData(prev => ({
              ...prev,
              landmark
            }))}
          />
          <CornerProperty
            onCornerPropertyChange={(isCorner) => setFormData(prev => ({
              ...prev,
              isCornerProperty: isCorner
            }))}
          />
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <div className="space-y-6">
            <ShowroomDetails
              onDetailsChange={(details) => setFormData(prev => ({
                ...prev,
                showroomDetails: { ...prev.showroomDetails, ...details }
              }))}
            />
            <CommercialPropertyDetails
              onDetailsChange={(details) => setFormData(prev => ({
                ...prev,
                propertyDetails: { ...prev.propertyDetails, ...details }
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Pricing Details</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Price Information</h4>
              <div className="space-y-4 text-black">
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
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Additional Charges</h4>
              <div className="space-y-4 text-black">
                <div className="text-black">
                  <RegistrationCharges
                    onRegistrationChargesChange={(charges) => setFormData(prev => ({
                      ...prev,
                      registration: { ...prev.registration, ...charges }
                    }))}
                  />
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="text-black">
                  <Brokerage
                    onBrokerageChange={(brokerage) => setFormData(prev => ({
                      ...prev,
                      brokerage: { ...prev.brokerage, ...brokerage }
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Availability</h3>
          </div>
          <div className="space-y-6">
            <CommercialAvailability
              onAvailabilityChange={(availability) => setFormData(prev => ({
                ...prev,
                availability: { ...prev.availability, ...availability }
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <UserCircle className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Contact Details</h3>
          </div>
          <div className="space-y-6">
            <CommercialContactDetails
              onContactChange={(contact) => setFormData(prev => ({
                ...prev,
                contactInformation: { ...prev.contactInformation, ...contact }
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Property Media</h3>
          </div>
          <div className="space-y-6">
            <CommercialMediaUpload
              onMediaChange={(media) => {
                const photos: Record<string, File[]> = {};
                media.images.forEach(({ category, files }) => {
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
                    videoTour: media.video?.file || null,
                    documents: media.documents.map(d => d.file)
                  }
                }));
              }}
            />
          </div>
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log("Form Data:", formData)
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
          ...formData,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date()
          }
        };


        console.log(transformedData);
        const response = await axios.post('/api/commercial-showrooms', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)

        if (response.data.success) {
          toast.success('Commercial showroom listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial showroom listing. Please try again.');
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
            <p className="text-gray-600">Please fill in the details for your property</p>
          </div>

          {steps[currentStep].component}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handlePrevious}
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
  );
}

export default SellShowroomMain;

