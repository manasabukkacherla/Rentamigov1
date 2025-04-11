import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import RetailStoreType from '../CommercialComponents/RetailStoreType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import RetailStoreDetails from '../CommercialComponents/RetailStoreDetails';
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
  retailStoreType: string[];
  address: Record<string, string>;
  landmark: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
  retailStoreDetails: Record<string, any>;
  propertyDetails: Record<string, any>;
  rent: {
    expectedRent: string;
    isNegotiable: boolean;
    rentType: string;
  };
  securityDeposit: Record<string, any>;
  maintenanceAmount: Record<string, any>;
  otherCharges: Record<string, any>;
  brokerage: Record<string, any>;
  availability: Record<string, any>;
  contactDetails: Record<string, string>;
  media: {
    images: Array<{ category: string; files: Array<{ url: string; file: File }> }>;
    video?: { url: string; file: File };
    documents: Array<{ type: string; file: File }>;
  };
}

const RentRetailStoreMain = () => {
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    retailStoreType: [],
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    retailStoreDetails: {},
    propertyDetails: {},
    rent: {
      expectedRent: '',
      isNegotiable: false,
      rentType: ''
    },
    securityDeposit: {},
    maintenanceAmount: {},
    otherCharges: {},
    brokerage: {},
    availability: {},
    contactDetails: {},
    media: {
      images: [],
      video: undefined,
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const formSections = [
    {
      title: 'Basic Information',
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Store className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Basic Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyName
                  propertyName={formData.propertyName}
                  onPropertyNameChange={(name) => setFormData({ ...formData, propertyName: name })}
                />
                <RetailStoreType
                  onRetailTypeChange={(type) => setFormData({ ...formData, retailStoreType: type })}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <CommercialPropertyAddress
                  onAddressChange={(address) => setFormData({ ...formData, address })}
                />
                <Landmark onLandmarkChange={(landmark) => setFormData({ ...formData, landmark })} />
                
                <CornerProperty
                  onCornerPropertyChange={(isCorner) => setFormData({ ...formData, isCornerProperty: isCorner })}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Property Details',
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building2 className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <RetailStoreDetails
                onDetailsChange={(details) => setFormData({ ...formData, retailStoreDetails: details })}
              />
              <CommercialPropertyDetails
                onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Rental Terms',
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building2 className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Rental Terms</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <Rent onRentChange={(rent) => {
                setFormData({ 
                  ...formData, 
                  rent: {
                    expectedRent: rent.expectedRent || "",
                    isNegotiable: rent.isNegotiable || false,
                    rentType: rent.rentType || ""
                  }
                })
              }} />
              {formData.rent.rentType === 'exclusive' && (
                <MaintenanceAmount onMaintenanceAmountChange={(maintenance) => setFormData({ ...formData, maintenanceAmount: maintenance })} />
              )}
              <SecurityDeposit onSecurityDepositChange={(deposit) => setFormData({ ...formData, securityDeposit: deposit })} />
              <OtherCharges onOtherChargesChange={(charges) => setFormData({ ...formData, otherCharges: charges })} />
              <Brokerage onBrokerageChange={(brokerage) => setFormData({ ...formData, brokerage })} />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Availability',
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Calendar className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Availability</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <AvailabilityDate onAvailabilityChange={(availability) => setFormData({ ...formData, availability })} />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Contact Information',
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <UserCircle className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Contact Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialContactDetails
                onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Property Media',
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <ImageIcon className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Media</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialMediaUpload
                onMediaChange={(media) => setFormData({ ...formData, media })}
              />
            </div>
          </div>
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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black">{formSections[currentStep].title}</h2>
        <div className="h-1 w-20 bg-black mt-2 rounded-full"></div>
      </div>

      <div className="space-y-8">{formSections[currentStep].content}</div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="px-6 py-2 border border-black/20 rounded-lg text-black hover:bg-black hover:text-white transition-all duration-200 flex items-center"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-1" size={18} />
          Previous
        </button>

        {currentStep < formSections.length - 1 ? (
          <button
            type="button"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center"
            onClick={handleNext}
          >
            Next
            <ChevronRight className="ml-1" size={18} />
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center"
          >
            List Property
            <ChevronRight className="ml-1" size={18} />
          </button>
        )}
      </div>
    </form>
  );
};

export default RentRetailStoreMain;
