import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import ShopType from '../CommercialComponents/ShopType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShopDetails from '../CommercialComponents/ShopDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Price from '../sell/Price';
import PricePerSqft from '../sell/PricePerSqft';
import RegistrationCharges from '../sell/RegistrationCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

const SellShopMain = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    shopType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    shopDetails: {},
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
    'Review & Submit'
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (key: string, value: string | boolean | Record<string, any>) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <PropertyName propertyName={formData.propertyName} onPropertyNameChange={(name) => handleChange('propertyName', name)} />
            <ShopType onShopTypeChange={(type) => handleChange('shopType', type)} />
            <CommercialPropertyAddress onAddressChange={(address) => handleChange('address', address)} />
            <Landmark onLandmarkChange={(landmark) => handleChange('landmark', landmark)} />
            <MapCoordinates
              latitude={formData.coordinates.latitude}
              longitude={formData.coordinates.longitude}
              onLatitudeChange={(lat) => handleChange('coordinates', { ...formData.coordinates, latitude: lat })}
              onLongitudeChange={(lng) => handleChange('coordinates', { ...formData.coordinates, longitude: lng })}
            />
            <CornerProperty onCornerPropertyChange={(isCorner) => handleChange('isCornerProperty', isCorner)} />
          </>
        );
      case 1:
        return (
          <>
            <ShopDetails onDetailsChange={(details) => handleChange('shopDetails', details)} />
            <CommercialPropertyDetails onDetailsChange={(details) => handleChange('propertyDetails', details)} />
          </>
        );
      case 2:
        return (
          <>
            <Price onPriceChange={(price) => handleChange('price', price.amount)} />
            <PricePerSqft price={formData.price} area={formData.area} />
            <RegistrationCharges onRegistrationChargesChange={(charges) => handleChange('registrationCharges', charges)} />
            <Brokerage onBrokerageChange={(brokerage) => handleChange('brokerage', brokerage)} />
          </>
        );
      case 3:
        return <CommercialAvailability onAvailabilityChange={(availability) => handleChange('availability', availability)} />;
      case 4:
        return (
          <>
            <CommercialContactDetails onContactChange={(contact) => handleChange('contactDetails', contact)} />
           
          </>
        );
      case 5:
        return (
          <CommercialMediaUpload onMediaChange={(media) => handleChange('media', media)} />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <h2 className="text-3xl font-bold mb-8">{steps[currentStep]}</h2>
      <div className="space-y-8">{renderStepContent()}</div>

      <div className="sticky bottom-0 bg-black/80 backdrop-blur-sm p-4 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-lg border border-white/20 hover:border-white text-white transition-colors duration-200"
            >
              Previous
            </button>
          )}

          {currentStep < steps.length - 1 ? (
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
              className="px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SellShopMain;
