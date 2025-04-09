import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import CoveredOpenSpaceType from '../CommercialComponents/CoveredOpenSpaceType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import CoveredOpenSpaceDetails from '../CommercialComponents/CoveredOpenSpaceDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

const RentCoveredSpace = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    spaceType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    spaceDetails: {},
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
    media: { photos: [], video: null }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const formSections = [
    {
      title: 'Basic Information',
      content: (
        <>
          <PropertyName propertyName={formData.propertyName} onPropertyNameChange={handlePropertyNameChange} />
          <CoveredOpenSpaceType onSpaceTypeChange={handleSpaceTypeChange} />
          <CommercialPropertyAddress onAddressChange={handleAddressChange} />
          <Landmark onLandmarkChange={handleLandmarkChange} />
          
          <CornerProperty onCornerPropertyChange={handleCornerPropertyChange} />
        </>
      )
    },
    {
      title: 'Property Details',
      content: (
        <>
          <CoveredOpenSpaceDetails onDetailsChange={handleSpaceDetailsChange} />
          <CommercialPropertyDetails onDetailsChange={handlePropertyDetailsChange} />
        </>
      )
    },
    {
      title: 'Rental Terms',
      content: (
        <>
          <Rent onRentChange={handleRentChange} />
          {formData.rent.rentType === 'exclusive' && (
            <MaintenanceAmount onMaintenanceAmountChange={handleMaintenanceAmountChange} />
          )}
          <SecurityDeposit onSecurityDepositChange={handleSecurityDepositChange} />
          <OtherCharges onOtherChargesChange={handleOtherChargesChange} />
          <Brokerage onBrokerageChange={handleBrokerageChange} />
        </>
      )
    },
    {
      title: 'Availability',
      content: <AvailabilityDate onAvailabilityChange={handleAvailabilityChange} />
    },
    {
      title: 'Contact Information',
      content: <CommercialContactDetails onContactChange={handleContactChange} />
    },
    {
      title: 'Property Media',
      content: <CommercialMediaUpload onMediaChange={handleMediaChange} />
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
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {formSections.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center ${i <= currentStep ? "text-black" : "text-gray-400"}`}
                onClick={() => i < currentStep && setCurrentStep(i)}
                style={{ cursor: i < currentStep ? "pointer" : "default" }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-xs font-medium">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-1 rounded-full">
            <div
              className="bg-black h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (formSections.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black">{formSections[currentStep].title}</h2>
        </div>

        <div className="space-y-8">{formSections[currentStep].content}</div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="flex items-center px-6 py-3 text-black border-2 border-gray-300 rounded-lg hover:border-black transition-colors duration-200"
          >
            Previous
          </button>
        )}
        {currentStep < formSections.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto"
          >
            List Property
          </button>
        )}
      </div>
    </form>
  );
};

export default RentCoveredSpace;

function handlePropertyNameChange(name: string): void {
  throw new Error('Function not implemented.');
}

function handleSpaceTypeChange(type: string): void {
  throw new Error('Function not implemented.');
}

function handleAddressChange(address: { street: string; city: string; state: string; zipCode: string; }): void {
  throw new Error('Function not implemented.');
}

function handleLandmarkChange(landmark: string): void {
  throw new Error('Function not implemented.');
}

function handleLatitudeChange(lat: string): void {
  throw new Error('Function not implemented.');
}

function handleLongitudeChange(lng: string): void {
  throw new Error('Function not implemented.');
}

function handleCornerPropertyChange(isCorner: boolean): void {
  throw new Error('Function not implemented.');
}

function handleSpaceDetailsChange(details: Record<string, any>): void {
  throw new Error('Function not implemented.');
}

function handlePropertyDetailsChange(details: Record<string, any>): void {
  throw new Error('Function not implemented.');
}

function handleRentChange(rent: Record<string, any>): void {
  throw new Error('Function not implemented.');
}

function handleMaintenanceAmountChange(maintenance: Record<string, any>): void {
  throw new Error('Function not implemented.');
}

function handleSecurityDepositChange(deposit: Record<string, any>): void {
  throw new Error('Function not implemented.');
}

function handleOtherChargesChange(charges: Record<string, any>): void {
  throw new Error('Function not implemented.');
}

function handleBrokerageChange(brokerage: Record<string, any>): void {
  throw new Error('Function not implemented.');
}

function handleAvailabilityChange(availability: { type: 'immediate' | 'specific'; date?: string | undefined; }): void {
  throw new Error('Function not implemented.');
}

function handleContactChange(contact: Record<string, any>): void {
  throw new Error('Function not implemented.');
}

function handleMediaChange(media: { images: { category: string; files: { url: string; file: File; }[]; }[]; video?: { url: string; file: File; } | undefined; documents: { type: string; file: File; }[]; }): void {
  throw new Error('Function not implemented.');
}

