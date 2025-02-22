import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import RetailStoreType from '../CommercialComponents/RetailStoreType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import RetailStoreDetails from '../CommercialComponents/RetailStoreDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Price from '../sell/Price';
import PricePerSqft from '../sell/PricePerSqft';
import RegistrationCharges from '../sell/RegistrationCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

const SellRetailShopMain = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    retailStoreType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    retailStoreDetails: {},
    propertyDetails: {},
    price: '',
    area: {
      superBuiltUpAreaSqft: '',
      builtUpAreaSqft: '',
      carpetAreaSqft: ''
    },
    registrationCharges: {},
    brokerage: {},
    availability: {},
    contactDetails: {},
    media: { photos: [], video: null }
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Define form steps
  const steps = [
    {
      title: 'Basic Information',
      content: (
        <>
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) => setFormData({ ...formData, propertyName: name })}
          />
          <RetailStoreType
            onRetailTypeChange={(type) => setFormData({ ...formData, retailStoreType: type })}
          />
          <CommercialPropertyAddress
            onAddressChange={(address) => setFormData({ ...formData, address })}
          />
          <Landmark
            onLandmarkChange={(landmark) => setFormData({ ...formData, landmark })}
          />
          <MapCoordinates
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            onLatitudeChange={(lat) => setFormData({ ...formData, coordinates: { ...formData.coordinates, latitude: lat } })}
            onLongitudeChange={(lng) => setFormData({ ...formData, coordinates: { ...formData.coordinates, longitude: lng } })}
          />
          <CornerProperty
            onCornerPropertyChange={(isCorner) => setFormData({ ...formData, isCornerProperty: isCorner })}
          />
        </>
      )
    },
    {
      title: 'Property Details',
      content: (
        <>
          <RetailStoreDetails
            onDetailsChange={(details) => setFormData({ ...formData, retailStoreDetails: details })}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
          />
        </>
      )
    },
    {
      title: 'Pricing Details',
      content: (
        <>
          <Price
            onPriceChange={(price) => setFormData({ ...formData, price: price.amount })}
          />
          <PricePerSqft
            price={formData.price}
            area={formData.area}
          />
          <RegistrationCharges
            onRegistrationChargesChange={(charges) => setFormData({ ...formData, registrationCharges: charges })}
          />
          <Brokerage
            onBrokerageChange={(brokerage) => setFormData({ ...formData, brokerage })}
          />
        </>
      )
    },
    {
      title: 'Availability',
      content: (
        <CommercialAvailability
          onAvailabilityChange={(availability) => setFormData({ ...formData, availability })}
        />
      )
    },
    {
      title: 'Contact Information',
      content: (
        <CommercialContactDetails
          onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })}
        />
      )
    },
    {
      title: 'Property Media',
      content: (
        <CommercialMediaUpload
          onMediaChange={(media) => setFormData({ ...formData, media })}
        />
      )
    }
  ];

  // Navigation handlers
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-12">
        <h2 className="text-3xl font-bold mb-8">{steps[currentStep].title}</h2>
        <div className="space-y-8">{steps[currentStep].content}</div>
      </div>

      <div className="sticky bottom-0 bg-black/80 backdrop-blur-sm p-4 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          <button
            type="button"
            className={`px-6 py-3 rounded-lg border ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'border-white/20 hover:border-white'} text-white transition-colors duration-200`}
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
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

export default SellRetailShopMain;
