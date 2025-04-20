import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import ShedType from '../CommercialComponents/ShedType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShedDetails from '../CommercialComponents/ShedDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon, Calendar, DollarSign } from "lucide-react"

interface FormData {
  propertyName: string;
  shedType: string;
  address: Record<string, string>;
  landmark: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
  shedDetails: {
    entranceWidth: number;
    ceilingHeight: number;
    washroomAvailable: boolean;
    numberOfWashrooms?: number;
    pantryAvailable: boolean;
    powerBackup: boolean;
    parkingAvailable: boolean;
    dedicatedParkingSpots?: number;
  };
  propertyDetails: {
    area: {
      totalArea: string;
      builtUpArea: string;
      carpetArea: string;
    };
    facingDirection: string;
    floorNumber: number;
    totalFloors: number;
    furnishingStatus: string;
    propertyAge: number;
    propertyCondition: string;
    amenities: string[];
    waterAvailability: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };
  rentalTerms: {
    expectedRent: string;
    isNegotiable: boolean;
    securityDeposit: string;
    maintenanceAmount: string;
    maintenanceFrequency: string;
    otherCharges: string;
    brokerage: string;
  };
  availability: {
    type: 'immediate' | 'specific';
    date?: string;
  };
  contactDetails: {
    name: string;
    email: string;
    phone: string;
    alternatePhone: string;
    bestTimeToContact: string;
  };
  media: {
    photos: File[];
    video?: File;
  };
}

const RentShed = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    shedType: '',
    address: {},
    landmark: '',
    coordinates: {
      latitude: '',
      longitude: ''
    },
    isCornerProperty: false,
    shedDetails: {
      entranceWidth: 0,
      ceilingHeight: 0,
      washroomAvailable: false,
      pantryAvailable: false,
      powerBackup: false,
      parkingAvailable: false
    },
    propertyDetails: {
      area: {
        totalArea: '',
        builtUpArea: '',
        carpetArea: ''
      },
      facingDirection: '',
      floorNumber: 0,
      totalFloors: 0,
      furnishingStatus: '',
      propertyAge: 0,
      propertyCondition: '',
      amenities: [],
      waterAvailability: '',
      electricitySupply: {
        powerLoad: 0,
        backup: false
      }
    },
    rentalTerms: {
      expectedRent: '',
      isNegotiable: false,
      securityDeposit: '',
      maintenanceAmount: '',
      maintenanceFrequency: 'monthly',
      otherCharges: '',
      brokerage: ''
    },
    availability: {
      type: 'immediate'
    },
    contactDetails: {
      name: '',
      email: '',
      phone: '',
      alternatePhone: '',
      bestTimeToContact: ''
    },
    media: {
      photos: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const formSections = [
    {
      title: 'Basic Information',
      icon: <Store className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Store className="w-6 h-6 text-black" />
              <h3 className="text-xl font-semibold text-black">Property Details</h3>
            </div>
            <PropertyName 
              propertyName={formData.propertyName}
              onPropertyNameChange={(name: string) => setFormData({ ...formData, propertyName: name })}
            />
            <ShedType
              onShedTypeChange={(types: string[]) => setFormData({ ...formData, shedType: types[0] || '' })}
            />
            <CommercialPropertyAddress
              onAddressChange={(address: Record<string, string>) => setFormData({ ...formData, address })}
            />
            <Landmark
              onLandmarkChange={(landmark: string) => setFormData({ ...formData, landmark })}
            />
            <CornerProperty
              onCornerPropertyChange={(isCorner: boolean) => setFormData({ ...formData, isCornerProperty: isCorner })}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <ShedDetails
            onDetailsChange={(details: any) => setFormData({ ...formData, shedDetails: details })}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details: any) => {
              setFormData({ 
                ...formData, 
                propertyDetails: {
                  ...formData.propertyDetails,
                  ...details
                } 
              });
            }}
          />
        </div>
      )
    },
    {
      title: 'Rental Terms',
      icon: <DollarSign className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Rental Terms</h3>
          </div>
          <div className="space-y-6">
            <Rent
              onRentChange={(rent: Record<string, any>) => {
                setFormData({
                  ...formData,
                  rentalTerms: {
                    ...formData.rentalTerms,
                    expectedRent: rent.amount || '',
                    isNegotiable: !!rent.isNegotiable
                  }
                });
              }}
            />
            <SecurityDeposit
              onSecurityDepositChange={(deposit: Record<string, any>) => {
                setFormData({
                  ...formData,
                  rentalTerms: {
                    ...formData.rentalTerms,
                    securityDeposit: deposit.amount || ''
                  }
                });
              }}
            />
            <MaintenanceAmount
              onMaintenanceAmountChange={(maintenance: Record<string, any>) => {
                setFormData({
                  ...formData,
                  rentalTerms: {
                    ...formData.rentalTerms,
                    maintenanceAmount: maintenance.amount || '',
                    maintenanceFrequency: maintenance.frequency || 'monthly'
                  }
                });
              }}
            />
            <OtherCharges
              onOtherChargesChange={(charges: Record<string, any>) => {
                setFormData({
                  ...formData,
                  rentalTerms: {
                    ...formData.rentalTerms,
                    otherCharges: charges.amount || ''
                  }
                });
              }}
            />
            <Brokerage
              onBrokerageChange={(brokerage: any) => {
                setFormData({
                  ...formData,
                  rentalTerms: {
                    ...formData.rentalTerms,
                    brokerage: brokerage.required
                  }
                });
              }}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Availability</h3>
          </div>
          <AvailabilityDate
            onAvailabilityChange={(availability: { type: 'immediate' | 'specific'; date?: string }) => {
              setFormData({ ...formData, availability });
            }}
          />
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <UserCircle className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <UserCircle className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Contact Information</h3>
          </div>
          <CommercialContactDetails
            onContactChange={(contact: any) => {
              setFormData({ ...formData, contactDetails: contact });
            }}
          />
        </div>
      )
    },
    {
      title: 'Property Media',
      icon: <ImageIcon className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Media</h3>
          </div>
          <CommercialMediaUpload
            onMediaChange={(media: any) => {
              setFormData({ ...formData, media });
            }}
          />
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Submit to backend API
      const response = await axios.post('/api/commercial-rent-sheds', formData);
      
      if (response.status === 201) {
        toast.success("Property listed successfully!");
        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      console.error('Form Data:', formData);
      console.error('Error submitting form:', error);
      toast.error("Failed to list property. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {formSections.map((section, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {section.icon}
                  </div>
                  {index < formSections.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      index < currentStep ? 'bg-black' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>
        
        {formSections[currentStep].content}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${
              currentStep === 0 
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
          >
            {currentStep === formSections.length - 1 ? 'Submit' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentShed;
