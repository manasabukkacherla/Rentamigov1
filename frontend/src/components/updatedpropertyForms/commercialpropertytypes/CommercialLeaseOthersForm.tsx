"use client"

import { useState } from "react";
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import PropertyName from '../PropertyName';
import OtherCommercialType from '../CommercialComponents/OtherCommercialType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import OtherPropertyDetails from '../CommercialComponents/OtherPropertyDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

interface FormData {
  title: string;
  commercialType: string[];
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
  
  otherDetails: {
    propertyTypeDescription: string;
    specialFeatures: string;
    usageRecommendation: string;
    additionalRequirements: string;
  };
  
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
  
  leaseAmount: {
    amount: number;    
    type: string;
    duration: number,
    durationUnit: string;
  };
  leaseTenure: {
    minimumTenure: number;
    minimumUnit: string;
    maximumTenure: number;
    maximumUnit: string;
    lockInPeriod: number;
    lockInUnit:string;
    noticePeriod: number;
    noticePeriodUnit: string;
  };
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  otherCharges: {
    water: {
      amount: number;
      type: string;
    };
    electricity: {
      amount: number;
      type:string;
    };
    gas: {
      amount: number;
      type: string;
    };
    others: {
      amount: number;
      type: string;
    };
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  
  availability: {
    type: string;
    date?: Date;
    leaseDuration: string;
    noticePeriod: string;
    isPetsAllowed: boolean;
    operatingHours: {   
      restricted: boolean;
      restrictions: string;
    };
  };
  
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
    };
    videoTour: File | null;
    documents: File[];
  };
}

const CommercialLeaseOthersForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    commercialType: [],
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
    otherDetails: {
      propertyTypeDescription: '',
      specialFeatures: '',
      usageRecommendation: '',
      additionalRequirements: ''
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
      waterAvailability: '',
      propertyAge: '',
      propertyCondition: '',
      electricitySupply: {
        powerLoad: 0,
        backup: false
      }
    },
    leaseAmount: {
      amount: 0,
      type: 'fixed',
  duration: 0,
  durationUnit: 'years'
    },
    leaseTenure: {
      minimumTenure: 0,
      minimumUnit: "years",
      maximumTenure: 0,
      maximumUnit: "years",
      lockInPeriod: 0,
      lockInUnit: "years",
      noticePeriod: 0,
      noticePeriodUnit: "months",
    },
    maintenanceAmount: {
      amount: 0,
      frequency: "monthly",
    },
    otherCharges: {
      water: { amount: 0, type: "inclusive" },
      electricity: { amount: 0, type: "inclusive" },
      gas: { amount: 0, type: "inclusive" },
      others: { amount: 0, type: "inclusive" },
    },
    brokerage: {
      required: "no",
      amount: 0,
    },
    availability: {
      type: 'immediate',
      date: new Date(),
      leaseDuration: '',
      noticePeriod: '',
      isPetsAllowed: false,
      operatingHours: {
        restricted: false,
        restrictions: ''
      }
    },
    contactDetails: {
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
        emergencyExits: [],
        washrooms: [],
        lifts: [],
      },
      videoTour: null,
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Store className="text-black w-6 h-6" />
              <h3 className="text-xl font-semibold text-black">Basic Details</h3>
            </div>
            <div className="space-y-6">
              <PropertyName
                propertyName={formData.title}
                onPropertyNameChange={(name) => setFormData(prev => ({
                  ...prev,
                  title: name
                }))}
              />
              <OtherCommercialType
                onCommercialTypeChange={(types) => setFormData(prev => ({
                  ...prev,
                  commercialType: types
                }))}
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-black w-6 h-6" />
              <h3 className="text-xl font-semibold text-black">Location Details</h3>
            </div>
            <div className="space-y-6">
              <CommercialPropertyAddress
                address={formData.address}
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
                onLocationSelect={(location) => setFormData(prev => ({
                  ...prev,
                  location: {
                    latitude: location.latitude,
                    longitude: location.longitude
                  }
                }))}
              />
              <CornerProperty
                isCornerProperty={formData.isCornerProperty}
                onCornerPropertyChange={(isCorner) => setFormData(prev => ({
                  ...prev,
                  isCornerProperty: isCorner
                }))}
              />
            </div>
          </div>
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
            <OtherPropertyDetails
              onDetailsChange={(details) => setFormData(prev => ({
                ...prev,
                otherDetails: { ...prev.otherDetails, ...details }
              }))}
            />
            <CommercialPropertyDetails
              onDetailsChange={(details) => {
                const updatedDetails = details as Partial<typeof formData.propertyDetails>;
                setFormData(prev => ({
                  ...prev,
                  propertyDetails: { ...prev.propertyDetails, ...updatedDetails }
                }));
              }}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Lease Terms</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Lease Information</h4>
              <div className="space-y-4">
                <LeaseAmount 
                  onLeaseAmountChange={(amount) => setFormData(prev => ({
                    ...prev,
                    leaseAmount: { ...prev.leaseAmount, ...amount }
                  }))} 
                />
                <LeaseTenure 
                  onLeaseTenureChange={(tenure) => {
                    // Create a compatible object structure for leaseTenure
                    const updatedTenure: Partial<typeof formData.leaseTenure> = {};
                    
                    // Map complex values to the expected string format
                    if (tenure.minimumTenure) {
                      updatedTenure.minimumTenure = tenure.minimumTenure.duration || 0;
                      updatedTenure.minimumUnit = tenure.minimumTenure.durationType || 'years';
                    }
                    
                    if (tenure.maximumTenure) {
                      updatedTenure.maximumTenure = tenure.maximumTenure.duration || 0;
                      updatedTenure.maximumUnit = tenure.maximumTenure.durationType || 'years';
                    }
                    
                    if (tenure.lockInPeriod) {
                      updatedTenure.lockInPeriod = tenure.lockInPeriod.duration || 0;
                      updatedTenure.lockInUnit = tenure.lockInPeriod.durationType || 'years';
                    }
                    
                    if (tenure.noticePeriod) {
                      updatedTenure.noticePeriod = tenure.noticePeriod.duration || 0;
                      updatedTenure.noticePeriodUnit = tenure.noticePeriod.durationType || 'months';
                    }
                    
                    setFormData(prev => ({
                      ...prev,
                      leaseTenure: { ...prev.leaseTenure, ...updatedTenure }
                    }));
                  }} 
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Additional Charges</h4>
              <div className="space-y-4">
                <MaintenanceAmount 
                  maintenanceAmount={formData.maintenanceAmount}
                  onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({
                    ...prev,
                    maintenanceAmount: { ...prev.maintenanceAmount, ...maintenance }
                  }))} 
                />
                <div className="border-t border-gray-200 my-4"></div>
                <OtherCharges 
                  otherCharges={formData.otherCharges}
                  onOtherChargesChange={(charges) => setFormData(prev => ({
                    ...prev,
                    otherCharges: { ...prev.otherCharges, ...charges }
                  }))} 
                />
                <div className="border-t border-gray-200 my-4"></div>
                <Brokerage 
                  bro={formData.brokerage}
                  onBrokerageChange={(brokerage) => setFormData(prev => ({
                    ...prev,
                    brokerage: { ...prev.brokerage, ...brokerage }
                  }))} 
                />
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
      title: "Contact Details",
      icon: <UserCircle className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <UserCircle className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Contact Details</h3>
          </div>
          <div className="space-y-6">
            <CommercialContactDetails 
            contactInformation={formData.contactDetails}
              onContactChange={(contactDetails) => {
                const updatedContactDetails = contactDetails as Partial<typeof formData.contactDetails>;
                setFormData(prev => ({
                  ...prev,
                  contactDetails: { ...prev.contactDetails, ...updatedContactDetails }
                }));
              }} 
            />
          </div>
        </div>
      ),
    },
    {
      title: "Media Upload",
      icon: <ImageIcon className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Media Upload</h3>
          </div>
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
              const photosByCategory: Record<string, File[]> = {
                exterior: [],
                interior: [],
                floorPlan: [],
                washrooms: [],
                lifts: [],
                emergencyExits: []
              };

              media.photos.forEach(({ category, files }) => {
                if (category in photosByCategory) {
                  photosByCategory[category] = files.map(f => f.file);
                }
              });

              setFormData(prev => ({
                ...prev,
                media: {
                  photos: {
                    exterior: photosByCategory.exterior,
                    interior: photosByCategory.interior,
                    floorPlan: photosByCategory.floorPlan,
                    washrooms: photosByCategory.washrooms,
                    lifts: photosByCategory.lifts,
                    emergencyExits: photosByCategory.emergencyExits
                  },
                  videoTour: media.videoTour || null,
                  documents: media.documents
                }
              }));
            }}
          />
          </div>
        </div>
      ),
    }
  ];

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      // Convert files to base64 strings for API submission
      const convertedMedia = {
        photos: {
          exterior: await Promise.all(formData.media.photos.exterior.map(convertFileToBase64)),
          interior: await Promise.all(formData.media.photos.interior.map(convertFileToBase64)),
          floorPlan: await Promise.all(formData.media.photos.floorPlan.map(convertFileToBase64)),
          washrooms: await Promise.all(formData.media.photos.washrooms.map(convertFileToBase64)),
          lifts: await Promise.all(formData.media.photos.lifts.map(convertFileToBase64)),
          emergencyExits: await Promise.all(formData.media.photos.emergencyExits.map(convertFileToBase64))
        },
        videoTour: formData.media.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
        documents: await Promise.all(formData.media.documents.map(convertFileToBase64))
      };
      
      // Prepare the final data object for submission
      const submissionData = {
        ...formData,
        media: convertedMedia
      };
      
      // Submit the form data to backend API
      const response = await axios.post('/api/commercial/lease/others', submissionData);
      
      if (response.data.success) {
        toast.success("Property listed successfully!");
      } else {
        toast.error("Error listing property. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
    }
  };

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
    <div className="max-w-5xl mx-auto py-10 px-4">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-4 rounded-lg mb-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Store className="w-5 h-5 text-black" />
              <h1 className="text-2xl font-bold text-black">Commercial Property Lease - Other Type</h1>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center ${index === currentStep ? 'text-blue-600' : 'text-gray-400'}`}
                style={{ width: `${100 / steps.length}%` }}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${index === currentStep ? 'bg-blue-600 text-white' : index < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {index < currentStep ? '✓' : step.icon}
                </div>
                <span className="text-sm text-center">{step.title}</span>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-full mt-2 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        {steps[currentStep].component}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          
          {currentStep === steps.length - 1 ? (
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Listing
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommercialLeaseOthersForm; 