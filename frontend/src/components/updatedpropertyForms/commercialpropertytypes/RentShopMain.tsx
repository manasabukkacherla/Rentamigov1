import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import ShopType from '../CommercialComponents/ShopType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShopDetails from '../CommercialComponents/ShopDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

const RentShopMain = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    shopType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    shopDetails: {},
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
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) => setFormData({ ...formData, propertyName: name })}
          />
          <ShopType onShopTypeChange={(type) => setFormData({ ...formData, shopType: type })} />
          <CommercialPropertyAddress
            onAddressChange={(address) => setFormData({ ...formData, address })}
          />
          <Landmark onLandmarkChange={(landmark) => setFormData({ ...formData, landmark })} />
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
          <ShopDetails onDetailsChange={(details) => setFormData({ ...formData, shopDetails: details })} />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
          />
        </>
      )
    },
    {
      title: 'Rental Terms',
      content: (
        <>
          <Rent onRentChange={(rent) => setFormData({ ...formData, rent })} />
          {formData.rent.rentType === 'exclusive' && (
            <MaintenanceAmount
              onMaintenanceAmountChange={(maintenance) => setFormData({ ...formData, maintenanceAmount: maintenance })}
            />
          )}
          <SecurityDeposit
            onSecurityDepositChange={(deposit) => setFormData({ ...formData, securityDeposit: deposit })}
          />
          <OtherCharges onOtherChargesChange={(charges) => setFormData({ ...formData, otherCharges: charges })} />
          <Brokerage onBrokerageChange={(brokerage) => setFormData({ ...formData, brokerage })} />
        </>
      )
    },
    {
      title: 'Availability',
      content: <AvailabilityDate onAvailabilityChange={(availability) => setFormData({ ...formData, availability })} />
    },
    {
      title: 'Contact Information',
      content: <CommercialContactDetails onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })} />
    },
    {
      title: 'Property Media',
      content: <CommercialMediaUpload onMediaChange={(media) => setFormData({ ...formData, media })} />
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

export default RentShopMain;
