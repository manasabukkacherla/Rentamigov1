import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import PlotType from '../CommercialComponents/PlotType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import PlotDetails from '../CommercialComponents/PlotDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Price from '../sell/Price';
import PricePerSqft from '../sell/PricePerSqft';
import RegistrationCharges from '../sell/RegistrationCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { Building2, Home, IndianRupee, Calendar, MapPin, Image } from 'lucide-react';

const SellPlot = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    plotType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    plotDetails: {},
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
          <PlotType
            onPlotTypeChange={(type) => setFormData({ ...formData, plotType: type })}
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
          <PlotDetails
            onDetailsChange={(details) => setFormData({ ...formData, plotDetails: details })}
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
      {/* Stepper Scroll Bar UI */}
      <div className="mt-6 flex items-center space-x-6 overflow-x-auto pb-2 mb-8">
        {steps.map((stepObj, index) => (
          <div key={index} className="flex items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(index)}
              className="flex items-center focus:outline-none"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index === 0 && <Building2 className="w-6 h-6" />} 
                {index === 1 && <Home className="w-6 h-6" />} 
                {index === 2 && <IndianRupee className="w-6 h-6" />} 
                {index === 3 && <Calendar className="w-6 h-6" />} 
                {index === 4 && <MapPin className="w-6 h-6" />} 
                {index === 5 && <Image className="w-6 h-6" />} 
              </div>
              <span className={`ml-3 text-sm font-medium whitespace-nowrap ${
                index <= currentStep ? 'text-black' : 'text-black/70'
              }`}>
                {stepObj.title}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-3 ${index < currentStep ? 'bg-black' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-12">
        <h2 className="text-3xl font-bold mb-8">{steps[currentStep].title}</h2>
        <div className="space-y-8">{steps[currentStep].content}</div>
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

export default SellPlot;
