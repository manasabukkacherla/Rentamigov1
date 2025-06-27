"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, MapPin, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
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
import MapLocation from '../CommercialComponents/MapLocation'

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
  }
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
  title: string;
  Type: string[];
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
    required: "yes" | "no";
    amount?: number;
  };
  availability: IAvailability;
  contactInformation: IContactInformation;
  media: IMedia;
}

const SellShowroomMain = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    Type: [],
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
      propertyAge: '',
      propertyCondition: ''
    },
    pricingDetails: {
      propertyPrice: 0,
      pricetype: "fixed",
      area: 0,
      totalprice: 0,
      pricePerSqft: 0,
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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
      component: (
        <div className="space-y-8">
          <div className="space-y-6">
            <PropertyName
              propertyName={formData.title}
              onPropertyNameChange={(name) => setFormData({ ...formData, title: name })}
            />
            <ShowroomType
              onTypeChange={(Type) => setFormData(prev => ({
                ...prev,
                Type: Array.isArray(Type) ? Type : [Type],
                basicInformation: {
                  ...prev.basicInformation,
                  Type: Array.isArray(Type) ? Type : [Type],
                },
              }))}
            />
          </div>
          <CommercialPropertyAddress
            address={formData.basicInformation.address}
            onAddressChange={(address) => setFormData(prev => ({
              ...prev,
              basicInformation: {
                ...prev.basicInformation,
                address
              }
            }))}
          />
          {/* <Landmark
            onLandmarkChange={(landmark) => setFormData(prev => ({
              ...prev,
              landmark
            }))}
          /> */}
          <MapLocation
            latitude={formData.basicInformation.location.latitude}
            longitude={formData.basicInformation.location.longitude}
            landmark={formData.basicInformation.landmark}
            onLocationChange={(location) => setFormData(prev => ({
              ...prev,
              basicInformation: {
                ...prev.basicInformation,
                location: {
                  latitude: location.latitude,
                  longitude: location.longitude
                }
              }
            }))}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
          />
          <CornerProperty
            isCornerProperty={formData.basicInformation.isCornerProperty}
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
        <div className="space-y-6">
          <ShowroomDetails
            onDetailsChange={(details) => setFormData(prev => ({
              ...prev,
              showroomDetails: { ...prev.showroomDetails, ...details }
            }))}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => {
              const modifiedDetails = {
                ...details,
                waterAvailability: Array.isArray(details.waterAvailability)
                  ? details.waterAvailability
                  : details.waterAvailability ? [details.waterAvailability] : []
              };

              setFormData(prev => {
                const propertyDetails = {
                  ...prev.propertyDetails,
                  ...modifiedDetails,
                  propertyAge: modifiedDetails.propertyAge // Convert to number
                };
                return {
                  ...prev,
                  propertyDetails
                };
              })
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

          <div className="text-black">
            <RegistrationCharges
              onRegistrationChargesChange={(charges) => setFormData(prev => ({
                ...prev,
                registration: { ...prev.registration, ...charges }
              }))}
            />
          </div>
          <div className="text-black">
            <Brokerage bro={formData.brokerage}
              onBrokerageChange={(brokerage) => setFormData(prev => ({
                ...prev,
                brokerage: {
                  required: brokerage.required as "yes" | "no",
                  amount: brokerage.amount
                }
              }))}
            />
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
      component: (
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
          basicInformation: {
            title: formData.basicInformation?.title || formData.title || 'Commercial Showroom',
            Type: Array.isArray(formData.basicInformation?.Type) ? formData.basicInformation?.Type : [],
            address: {
              street: formData.basicInformation?.address?.street || formData.address?.street || '',
              city: formData.basicInformation?.address?.city || formData.address?.city || '',
              state: formData.basicInformation?.address?.state || formData.address?.state || '',
              zipCode: formData.basicInformation?.address?.zipCode || formData.address?.zipCode || ''
            },
            landmark: formData.basicInformation?.landmark || formData.landmark || '',
            location: {
              latitude: typeof formData.basicInformation?.location?.latitude === 'string'
                ? formData.basicInformation.location.latitude : '',
              longitude: typeof formData.basicInformation?.location?.longitude === 'string'
                ? formData.basicInformation.location.longitude : ''
            },
            isCornerProperty: formData.basicInformation?.isCornerProperty || formData.isCornerProperty || false
          },
          propertyDetails: {
            ...formData.propertyDetails,
            propertyAge: typeof formData.propertyDetails?.propertyAge === 'string'
              ? formData.propertyDetails.propertyAge
              : formData.propertyDetails?.propertyAge || ''
          },
          showroomDetails: formData.showroomDetails,
          pricingDetails: formData.pricingDetails,
          registration: formData.registration,
          brokerage: {
            required: typeof formData.brokerage?.required === 'boolean'
              ? (formData.brokerage.required ? 'yes' : 'no')
              : formData.brokerage?.required || 'no',
            amount: formData.brokerage?.amount || 0
          },
          availability: {
            availableImmediately: formData.availability?.availableImmediately === true,
            availableFrom: formData.availability?.availableFrom
              ? new Date(formData.availability.availableFrom)
              : new Date(),
            leaseDuration: formData.availability?.leaseDuration || 'Not Specified',
            noticePeriod: formData.availability?.noticePeriod || 'Not Specified',
            petsAllowed: formData.availability?.petsAllowed === true,
            operatingHours: {
              restricted: formData.availability?.operatingHours?.restricted === true,
              restrictions: formData.availability?.operatingHours?.restrictions || 'No restrictions'
            }
          },
          contactInformation: formData.contactInformation,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date(),
            propertyType: 'Commercial',
            propertyName: 'Showroom',
            intent: 'Sell',
            status: 'Available',
          }
        };

        console.log(transformedData);
        const response = await axios.post('/api/commercial/sell/showrooms', transformedData, {
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

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((step, i) => (
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
                      {step.icon}
                    </div>
                    <span
                      className={`text-xs mt-1 font-medium transition-colors duration-200 ${i <= currentStep ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                        }`}
                    >
                      {step.title}
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Rent Commercial Shop</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {steps[currentStep].component}
      </div>
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
  );
}

export default SellShowroomMain;