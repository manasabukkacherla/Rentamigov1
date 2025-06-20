"use client"

import { useRef, useState } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, MapPin, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import PropertyName from "../PropertyName"
import AgriculturalLandType from "../CommercialComponents/AgriculturalLandType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"

import CornerProperty from "../CommercialComponents/CornerProperty"
import AgriculturalLandDetails from "../CommercialComponents/AgriculturalLandDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import LeaseAmount from "../lease/LeaseAmount"
import LeaseTenure from "../lease/LeaseTenure"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import OtherCharges from "../residentialrent/OtherCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import MediaUploadforagriplot from "../Mediauploadforagriplot"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import MapLocation from "../CommercialComponents/MapLocation"

interface FormData {
  basicInformation: {
    title: string;
    landType: string[];
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    location: {
      latitude: string;
      longitude: string;
    };
    landmark: string;
    isCornerProperty: boolean;
    powerSupply: string;

  };
 
  Agriculturelanddetails: {
    totalArea?:Number;
    soilType: string;
    irrigation: boolean;
    fencing: boolean;
    cropSuitability: string;
    waterSource: string;
    legalClearances: boolean;
  };

  
  leaseTerms: {
  leaseAmount: {
    amount: number;
    duration: number;
    durationType: string;
    isNegotiable: boolean;
  };
  leaseTenure: {
    minimumTenure: string;
    minimumUnit: string;
    maximumTenure: string;
    maximumUnit: string;
    lockInPeriod: string;
    lockInUnit: string;
    noticePeriod: string;
    noticePeriodUnit: string;
  };
  
};

  availability: {
    availableFrom: Date;
    availableImmediately: boolean;
    availabilityStatus: string;
    leaseDuration: string;
    noticePeriod: string;
    isPetsAllowed: boolean;
    operatingHours: boolean;
  };
  contactInformation: {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    bestTimeToContact?: string;
  };
  media: {
    photos: {
      exterior: File[];
    };
    videoTour: File | null;
    documents: File[];
  };
  metadata?: {
    createdBy: string;
    createdAt: Date;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
  };
}

const LeaseAgricultureMain = () => {
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
      landType: [] as string[],
      powerSupply: 'Available',
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
      isCornerProperty: false,
    },
    Agriculturelanddetails: {
      totalArea: 0,
      soilType: '',
      irrigation: false,
      fencing: false,
      cropSuitability: '',
      waterSource: '',
      legalClearances: false
    },
    leaseTerms: {
    leaseAmount: {
      amount: 0,
      duration: 0,
      durationType: 'months',
      isNegotiable: false
    },
    leaseTenure: {
      minimumTenure: '',
      minimumUnit: 'months',
      maximumTenure: '',
      maximumUnit: 'months',
      lockInPeriod: '',
      lockInUnit: 'months',
      noticePeriod: '',
      noticePeriodUnit: 'months'
    },
    

  },
    
    availability: {
      availableFrom: new Date(),
      availableImmediately: false,
      availabilityStatus: '',
      leaseDuration: '',
      noticePeriod: '',
      isPetsAllowed: false,
      operatingHours: false,
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
      },
      videoTour: null,
        documents: []
      },
     
      
    
  });

  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()
  
  const formRef = useRef<HTMLDivElement>(null);

  // Adapter function to convert from component output to FormData structure
  const handleLandTypeChange = (types: string[]) => {
    setFormData(prev => ({ ...prev, landType: types }));
  };
  const handleLeaseTenureChange = (tenure: any) => {
    setFormData(prev => ({
      ...prev,
        leaseTenure: {
        minimumTenure: String(tenure.minimumTenure?.duration || ''),
        minimumUnit: tenure.minimumTenure?.durationType || 'months',
        maximumTenure: String(tenure.maximumTenure?.duration || ''),
        maximumUnit: tenure.maximumTenure?.durationType || 'months',
        lockInPeriod: String(tenure.lockInPeriod?.duration || ''),
        lockInUnit: tenure.lockInPeriod?.durationType || 'months',
        noticePeriod: String(tenure.noticePeriod?.duration || ''),
        noticePeriodUnit: tenure.noticePeriod?.durationType || 'months'
      }
    }
    ));
  };

  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <div className="space-y-6">
              <PropertyName
                propertyName={formData.basicInformation.title}
                onPropertyNameChange={(name) => setFormData(prev => ({
                  ...prev,
                  basicInformation: {
                    ...prev.basicInformation,
                    title: name
                  }
                }))}
              />
              
              <AgriculturalLandType onLandTypeChange={handleLandTypeChange}
                
              />
            </div>

          <div className="space-y-6">
              <CommercialPropertyAddress
                address={formData.basicInformation.address}
                onAddressChange={(address) => setFormData(prev => ({
                  ...prev,
                  basicInformation: {
                    ...prev.basicInformation,
                    address: address
                  }
                }))}
              />
              <MapLocation
                latitude={formData.basicInformation.location.latitude}
                longitude={formData.basicInformation.location.longitude}
                landmark={formData.basicInformation.landmark}
                onLocationChange={(location) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, location } }))}
                onAddressChange={(address) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, address } }))}
                onLandmarkChange={(landmark) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, landmark } }))}
              />
              <CornerProperty
                isCornerProperty={formData.basicInformation.isCornerProperty}
                onCornerPropertyChange={(isCorner) => setFormData(prev => ({
                  ...prev,
                  basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner }
                }))}
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
            <AgriculturalLandDetails
             onDetailsChange={(details) =>
              setFormData(prev => ({
                ...prev,
                Agriculturelanddetails: { ...prev.Agriculturelanddetails, ...details }
              }))
            }
            />
           
          </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
            <div className="space-y-4">
                <LeaseAmount
                  onLeaseAmountChange={(amount) => setFormData(prev => ({
                    ...prev,
                    leaseTerms: { ...prev.leaseTerms, leaseAmount: { ...prev.leaseTerms.leaseAmount, ...amount } }
                  }))}
                />
                <LeaseTenure
                  onLeaseTenureChange={(tenure) => setFormData(prev => ({
                    ...prev,
                    leaseTerms: { ...prev.leaseTerms, leaseTenure: { ...prev.leaseTerms.leaseTenure, ...tenure } }
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
            <MediaUploadforagriplot
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
                      exterior: photos.exterior || [],
                    },
                   
                  }
                }));
              }}
            />
          </div>
      ),
    },
  ];

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;
        const convertedMedia = {
          photos: {
            exterior: await Promise.all((formData.media?.photos?.exterior ?? []).map(convertFileToBase64)),
          },
          videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
          documents: await Promise.all((formData.media?.documents ?? []).map(convertFileToBase64))
        };

        const metadata = {
          createdBy: author,
          createdAt: new Date(),
          propertyType: 'Commercial',
          propertyName: 'Agricultural Land',
          intent: 'Lease',
          status: 'Available',
        };

        const transformedData = {
          ...formData,
      basicInformation:{
        ...formData.basicInformation,
        title: formData.basicInformation.title,
        landType: formData.basicInformation.landType,
        address: {
          street: formData.basicInformation.address.street,
          city: formData.basicInformation.address.city,
          state: formData.basicInformation.address.state,
          zipCode: formData.basicInformation.address.zipCode
        },
        landmark: formData.basicInformation.landmark,
        location: {
          latitude: formData.basicInformation.location.latitude,
          longitude: formData.basicInformation.location.longitude
        },
        isCornerProperty: formData.basicInformation.isCornerProperty,
      },
      Agriculturelanddetails:{
        ...formData.Agriculturelanddetails,
        totalArea: formData.Agriculturelanddetails.totalArea,
        soilType: formData.Agriculturelanddetails.soilType,
        irrigation: formData.Agriculturelanddetails.irrigation,
        fencing: formData.Agriculturelanddetails.fencing,
        cropSuitability: formData.Agriculturelanddetails.cropSuitability,
        waterSource: formData.Agriculturelanddetails.waterSource,
        legalClearances: formData.Agriculturelanddetails.legalClearances
      },
      leaseTerms:{
        ...formData.leaseTerms,
        leaseAmount: {
          amount: formData.leaseTerms.leaseAmount.amount,
          duration: formData.leaseTerms.leaseAmount.duration,
          durationType: formData.leaseTerms.leaseAmount.durationType,
          isNegotiable: formData.leaseTerms.leaseAmount.isNegotiable
        },
        leaseTenure: {
          minimumTenure: formData.leaseTerms.leaseTenure.minimumTenure,
          minimumUnit: formData.leaseTerms.leaseTenure.minimumUnit,
          maximumTenure: formData.leaseTerms.leaseTenure.maximumTenure,
          maximumUnit: formData.leaseTerms.leaseTenure.maximumUnit,
          lockInPeriod: formData.leaseTerms.leaseTenure.lockInPeriod,
          lockInUnit: formData.leaseTerms.leaseTenure.lockInUnit,
          noticePeriod: formData.leaseTerms.leaseTenure.noticePeriod,
          noticePeriodUnit: formData.leaseTerms.leaseTenure.noticePeriodUnit
        }
      },
      availability:{
        ...formData.availability,
        availableFrom: formData.availability.availableFrom,
        availableImmediately: formData.availability.availableImmediately,
        availabilityStatus: formData.availability.availabilityStatus,
        leaseDuration: formData.availability.leaseDuration,
        noticePeriod: formData.availability.noticePeriod,
        isPetsAllowed: formData.availability.isPetsAllowed,
        operatingHours: formData.availability.operatingHours
      },
      contactInformation:{
        ...formData.contactInformation,
        name: formData.contactInformation.name,
        email: formData.contactInformation.email,
        phone: formData.contactInformation.phone,
        alternatePhone: formData.contactInformation.alternatePhone,
        bestTimeToContact: formData.contactInformation.bestTimeToContact
      },
      media:convertedMedia,
      metadata: metadata
      

        };

        const response = await axios.post('/api/commercial/lease/agriculture', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          toast.success('Agricultural land lease listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create agricultural land lease listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Lease Agricultural Land</h1>
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
  );
};

export default LeaseAgricultureMain;