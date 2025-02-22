import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import OtherCommercialType from '../CommercialComponents/OtherCommercialType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import OtherPropertyDetails from '../CommercialComponents/OtherPropertyDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

const RentOthers = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    commercialType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    otherDetails: {},
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
          <OtherCommercialType onCommercialTypeChange={handleCommercialTypeChange} />
          <CommercialPropertyAddress onAddressChange={handleAddressChange} />
          <Landmark onLandmarkChange={handleLandmarkChange} />
          <MapCoordinates
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            onLatitudeChange={handleLatitudeChange}
            onLongitudeChange={handleLongitudeChange}
          />
          <CornerProperty onCornerPropertyChange={handleCornerPropertyChange} />
        </>
      )
    },
    {
      title: 'Property Details',
      content: (
        <>
          <OtherPropertyDetails onDetailsChange={handleOtherDetailsChange} />
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
        <h2 className="text-3xl font-bold mb-8">{formSections[currentStep].title}</h2>
        <div className="space-y-8">{formSections[currentStep].content}</div>
      </div>

      <div className="sticky bottom-0 bg-black/80 backdrop-blur-sm p-4 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          <button
            type="button"
            className="px-6 py-3 rounded-lg border border-white/20 hover:border-white text-white transition-colors duration-200"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </button>

          {currentStep < formSections.length - 1 ? (
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200"
            >
              List Property
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default RentOthers;
function handlePropertyNameChange(name: string): void {
  throw new Error('Function not implemented.');
}

function handleCommercialTypeChange(type: string): void {
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

function handleOtherDetailsChange(details: Record<string, any>): void {
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

