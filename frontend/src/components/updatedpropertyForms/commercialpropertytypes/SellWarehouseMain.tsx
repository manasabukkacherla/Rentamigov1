import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import WarehouseType from '../CommercialComponents/WarehouseType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import WarehouseDetails from '../CommercialComponents/WarehouseDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Price from '../sell/Price';
import PricePerSqft from '../sell/PricePerSqft';
import RegistrationCharges from '../sell/RegistrationCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

const SellWarehouseMain = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    warehouseType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    warehouseDetails: {},
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
  const steps = [
    'Basic Information',
    'Property Details',
    'Pricing Details',
    'Availability',
    'Contact Information',
    'Property Media'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <h2 className="text-3xl font-bold mb-8">{steps[currentStep]}</h2>
      {currentStep === 0 && (
        <>
          <PropertyName propertyName={formData.propertyName} onPropertyNameChange={(name) => setFormData(prev => ({ ...prev, propertyName: name }))} />
          <WarehouseType onWarehouseTypeChange={(type) => setFormData(prev => ({ ...prev, warehouseType: type }))} />
          <CommercialPropertyAddress onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))} />
          <Landmark onLandmarkChange={(landmark) => setFormData(prev => ({ ...prev, landmark }))} />
          <MapCoordinates
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            onLatitudeChange={(lat) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, latitude: lat } }))}
            onLongitudeChange={(lng) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, longitude: lng } }))}
          />
          <CornerProperty onCornerPropertyChange={(isCorner) => setFormData(prev => ({ ...prev, isCornerProperty: isCorner }))} />
        </>
      )}
      {currentStep === 1 && (
        <>
          <WarehouseDetails onDetailsChange={(details) => setFormData(prev => ({ ...prev, warehouseDetails: details }))} />
          <CommercialPropertyDetails onDetailsChange={(details) => setFormData(prev => ({ ...prev, propertyDetails: details }))} />
        </>
      )}
      {currentStep === 2 && (
        <>
          <Price onPriceChange={(price) => setFormData(prev => ({ ...prev, price: price.amount }))} />
          <PricePerSqft price={formData.price} area={formData.area} />
          <RegistrationCharges onRegistrationChargesChange={(charges) => setFormData(prev => ({ ...prev, registrationCharges: charges }))} />
          <Brokerage onBrokerageChange={(brokerage) => setFormData(prev => ({ ...prev, brokerage }))} />
        </>
      )}
      {currentStep === 3 && (
        <CommercialAvailability onAvailabilityChange={(availability) => setFormData(prev => ({ ...prev, availability }))} />
      )}
      {currentStep === 4 && (
        <CommercialContactDetails onContactChange={(contact) => setFormData(prev => ({ ...prev, contactDetails: contact }))} />
      )}
      {currentStep === 5 && (
        <CommercialMediaUpload onMediaChange={(media) => setFormData(prev => ({ ...prev, media }))} />
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="px-6 py-3 rounded-lg bg-gray-300"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-green-600 text-white"
          >
            List Property
          </button>
        )}
      </div>
    </form>
  );
};

export default SellWarehouseMain;
