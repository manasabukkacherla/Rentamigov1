import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import ShedType from '../CommercialComponents/ShedType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShedDetails from '../CommercialComponents/ShedDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

const LeaseShedMain = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    shedType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    shedDetails: {},
    propertyDetails: {},
    leaseAmount: {},
    leaseTenure: {},
    maintenanceAmount: {},
    otherCharges: {},
    brokerage: {},
    availability: {},
    contactDetails: {},
    media: { photos: [], video: null }
  });

  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleFormChange = (field: string, value: string | boolean | Record<string, any>) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <PropertyName propertyName={formData.propertyName} onPropertyNameChange={(value) => handleFormChange('propertyName', value)} />
            <ShedType onShedTypeChange={(value) => handleFormChange('shedType', value)} />
            <CommercialPropertyAddress onAddressChange={(value) => handleFormChange('address', value)} />
            <Landmark onLandmarkChange={(value) => handleFormChange('landmark', value)} />
            <MapCoordinates
              latitude={formData.coordinates.latitude}
              longitude={formData.coordinates.longitude}
              onLatitudeChange={(lat) => handleFormChange('coordinates', { ...formData.coordinates, latitude: lat })}
              onLongitudeChange={(lng) => handleFormChange('coordinates', { ...formData.coordinates, longitude: lng })}
            />
            <CornerProperty onCornerPropertyChange={(value) => handleFormChange('isCornerProperty', value)} />
          </>
        );
      case 2:
        return (
          <>
            <ShedDetails onDetailsChange={(value) => handleFormChange('shedDetails', value)} />
            <CommercialPropertyDetails onDetailsChange={(value) => handleFormChange('propertyDetails', value)} />
          </>
        );
      case 3:
        return (
          <>
            <LeaseAmount onLeaseAmountChange={(value) => handleFormChange('leaseAmount', value)} />
            <LeaseTenure onLeaseTenureChange={(value) => handleFormChange('leaseTenure', value)} />
            <MaintenanceAmount onMaintenanceAmountChange={(value) => handleFormChange('maintenanceAmount', value)} />
            <OtherCharges onOtherChargesChange={(value) => handleFormChange('otherCharges', value)} />
            <Brokerage onBrokerageChange={(value) => handleFormChange('brokerage', value)} />
          </>
        );
      case 4:
        return (
          <>
            <CommercialAvailability onAvailabilityChange={(value) => handleFormChange('availability', value)} />
            <CommercialContactDetails onContactChange={(value) => handleFormChange('contactDetails', value)} />
          </>
        );
      case 5:
        return (
          <CommercialMediaUpload onMediaChange={(value) => handleFormChange('media', value)} />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-12">
        <h2 className="text-3xl font-bold mb-8">Step {step} of 5</h2>
        {renderStep()}
      </div>

      <div className="sticky bottom-0 bg-black/80 backdrop-blur-sm p-4 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          {step > 1 && (
            <button
              type="button"
              className="px-6 py-3 rounded-lg border border-white/20 hover:border-white text-white transition-colors duration-200"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {step < 5 ? (
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
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default LeaseShedMain;
