import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import ShedType from '../CommercialComponents/ShedType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShedDetails from '../CommercialComponents/ShedDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Price from '../sell/Price';
import PricePerSqft from '../sell/PricePerSqft';
import RegistrationCharges from '../sell/RegistrationCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

const SellShedMain = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    shedType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    shedDetails: {},
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

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleFormChange = (key: string, value: string | boolean | Record<string, any>) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <PropertyName propertyName={formData.propertyName} onPropertyNameChange={value => handleFormChange('propertyName', value)} />
            <ShedType onShedTypeChange={value => handleFormChange('shedType', value)} />
            <CommercialPropertyAddress onAddressChange={value => handleFormChange('address', value)} />
            <Landmark onLandmarkChange={value => handleFormChange('landmark', value)} />
            <MapCoordinates latitude={formData.coordinates.latitude} longitude={formData.coordinates.longitude} onLatitudeChange={lat => handleFormChange('coordinates', { ...formData.coordinates, latitude: lat })} onLongitudeChange={lng => handleFormChange('coordinates', { ...formData.coordinates, longitude: lng })} />
            <CornerProperty onCornerPropertyChange={value => handleFormChange('isCornerProperty', value)} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <ShedDetails onDetailsChange={value => handleFormChange('shedDetails', value)} />
            <CommercialPropertyDetails onDetailsChange={value => handleFormChange('propertyDetails', value)} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <Price onPriceChange={value => handleFormChange('price', value.amount)} />
            <PricePerSqft price={formData.price} area={formData.area} />
            <RegistrationCharges onRegistrationChargesChange={value => handleFormChange('registrationCharges', value)} />
            <Brokerage onBrokerageChange={value => handleFormChange('brokerage', value)} />
          </div>
        );
      case 4:
        return (
          <CommercialAvailability onAvailabilityChange={value => handleFormChange('availability', value)} />
        );
      case 5:
        return (
          <CommercialContactDetails onContactChange={value => handleFormChange('contactDetails', value)} />
        );
      case 6:
        return (
          <CommercialMediaUpload onMediaChange={value => handleFormChange('media', value)} />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-12">
        <h2 className="text-3xl font-bold mb-8">Step {currentStep} of 6</h2>
        {renderStep()}
      </div>
      <div className="sticky bottom-0 bg-black/80 backdrop-blur-sm p-4 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-lg border border-white/20 hover:border-white text-white transition-colors duration-200"
            >
              Previous
            </button>
          )}
          {currentStep < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SellShedMain;
