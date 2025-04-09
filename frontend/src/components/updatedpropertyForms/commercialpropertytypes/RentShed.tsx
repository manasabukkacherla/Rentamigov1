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

import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon, Calendar } from "lucide-react"

interface FormData {
  propertyName: string;
  address: Record<string, string>;
  size: {
    totalArea: string;
    builtUpArea: string;
    carpetArea: string;
  };
  features: {
    propertyType: string;
    propertyAge: string;
    propertyCondition: string;
    propertyDescription: string;
  };
  rentalTerms: {
    expectedRent: string;
    isNegotiable: boolean;
    rentType: string;
    maintenanceAmount?: string;
    securityDeposit: string;
    otherCharges: string;
    brokerage: string;
  };
  availabilityDate: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
  };
  media: {
    images: File[];
    videoTour: File | null;
  };
}

interface PropertyNameProps {
  value: string;
  onChange: (value: string) => void;
}

interface CommercialPropertyAddressProps {
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}

interface PropertySizeProps {
  value: {
    totalArea: string;
    builtUpArea: string;
    carpetArea: string;
  };
  onChange: (value: {
    totalArea: string;
    builtUpArea: string;
    carpetArea: string;
  }) => void;
}

interface PropertyFeaturesProps {
  value: {
    propertyType: string;
    propertyAge: string;
    propertyCondition: string;
    propertyDescription: string;
  };
  onChange: (value: {
    propertyType: string;
    propertyAge: string;
    propertyCondition: string;
    propertyDescription: string;
  }) => void;
}

interface RentalTermsProps {
  value: {
    expectedRent: string;
    isNegotiable: boolean;
    rentType: string;
    maintenanceAmount?: string;
    securityDeposit: string;
    otherCharges: string;
    brokerage: string;
  };
  onChange: (value: {
    expectedRent: string;
    isNegotiable: boolean;
    rentType: string;
    maintenanceAmount?: string;
    securityDeposit: string;
    otherCharges: string;
    brokerage: string;
  }) => void;
}

interface AvailabilityDateProps {
  value: string;
  onChange: (value: string) => void;
}

interface ContactInformationProps {
  value: {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
  };
  onChange: (value: {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
  }) => void;
}

interface MediaUploadProps {
  value: {
    images: File[];
    videoTour: File | null;
  };
  onChange: (value: {
    images: File[];
    videoTour: File | null;
  }) => void;
}

const RentShed = () => {
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    address: {},
    size: {
      totalArea: '',
      builtUpArea: '',
      carpetArea: ''
    },
    features: {
      propertyType: '',
      propertyAge: '',
      propertyCondition: '',
      propertyDescription: ''
    },
    rentalTerms: {
      expectedRent: '',
      isNegotiable: false,
      rentType: '',
      maintenanceAmount: undefined,
      securityDeposit: '',
      otherCharges: '',
      brokerage: ''
    },
    availabilityDate: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      whatsapp: ''
    },
    media: {
      images: [],
      videoTour: null
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
              value={formData.propertyName}
              onChange={(value) => setFormData({ ...formData, propertyName: value })}
            />
            <CommercialPropertyAddress
              value={formData.address}
              onChange={(value) => setFormData({ ...formData, address: value })}
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
          <PropertySize
            value={formData.size}
            onChange={(value) => setFormData({ ...formData, size: value })}
          />
          <PropertyFeatures
            value={formData.features}
            onChange={(value) => setFormData({ ...formData, features: value })}
          />
        </div>
      )
    },
    {
      title: 'Rental Terms',
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Rental Terms</h3>
          </div>
          <RentalTerms
            value={formData.rentalTerms}
            onChange={(value) => setFormData({ ...formData, rentalTerms: value })}
          />
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
            value={formData.availabilityDate}
            onChange={(value) => setFormData({ ...formData, availabilityDate: value })}
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
          <ContactInformation
            value={formData.contactInfo}
            onChange={(value) => setFormData({ ...formData, contactInfo: value })}
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
          <MediaUpload
            value={formData.media}
            onChange={(value) => setFormData({ ...formData, media: value })}
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
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
