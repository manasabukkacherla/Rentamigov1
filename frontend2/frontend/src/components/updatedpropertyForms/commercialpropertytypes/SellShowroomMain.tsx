import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import ShowroomType from '../CommercialComponents/ShowroomType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShowroomDetails from '../CommercialComponents/ShowroomDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Price from '../sell/Price';
import PricePerSqft from '../sell/PricePerSqft';
import RegistrationCharges from '../sell/RegistrationCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

const SellShowroomMain = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    showroomType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    showroomDetails: {},
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

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <PropertyName propertyName={formData.propertyName} onPropertyNameChange={(name) => setFormData({ ...formData, propertyName: name })} />
            <ShowroomType onShowroomTypeChange={(type) => setFormData({ ...formData, showroomType: type })} />
            <CommercialPropertyAddress onAddressChange={(address) => setFormData({ ...formData, address })} />
            <Landmark onLandmarkChange={(landmark) => setFormData({ ...formData, landmark })} />
            <MapCoordinates latitude={formData.coordinates.latitude} longitude={formData.coordinates.longitude} onLatitudeChange={(lat) => setFormData({ ...formData, coordinates: { ...formData.coordinates, latitude: lat } })} onLongitudeChange={(lng) => setFormData({ ...formData, coordinates: { ...formData.coordinates, longitude: lng } })} />
            <CornerProperty onCornerPropertyChange={(isCorner) => setFormData({ ...formData, isCornerProperty: isCorner })} />
          </>
        );
      case 1:
        return (
          <>
            <ShowroomDetails onDetailsChange={(details) => setFormData({ ...formData, showroomDetails: details })} />
            <CommercialPropertyDetails onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })} />
          </>
        );
      case 2:
        return (
          <>
            <Price onPriceChange={(price) => setFormData({ ...formData, price: price.amount })} />
            <PricePerSqft price={formData.price} area={formData.area} />
            <RegistrationCharges onRegistrationChargesChange={(charges) => setFormData({ ...formData, registrationCharges: charges })} />
            <Brokerage onBrokerageChange={(brokerage) => setFormData({ ...formData, brokerage })} />
          </>
        );
      case 3:
        return <CommercialAvailability onAvailabilityChange={(availability) => setFormData({ ...formData, availability })} />;
      case 4:
        return <CommercialContactDetails onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })} />;
      case 5:
        return <CommercialMediaUpload onMediaChange={(media) => setFormData({ ...formData, media })} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <h2 className="text-3xl font-bold mb-8">{steps[currentStep]}</h2>
      {renderStep()}
      <div className="flex justify-between mt-4">
        <button type="button" onClick={prevStep} disabled={currentStep === 0} className="px-6 py-3 rounded-lg border border-white/20 hover:border-white text-white transition-colors duration-200">
          Previous
        </button>
        {currentStep === steps.length - 1 ? (
          <button type="submit" className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200">
            List Property
          </button>
        ) : (
          <button type="button" onClick={nextStep} className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200">
            Next
          </button>
        )}
      </div>
    </form>
  );
};

export default SellShowroomMain;
