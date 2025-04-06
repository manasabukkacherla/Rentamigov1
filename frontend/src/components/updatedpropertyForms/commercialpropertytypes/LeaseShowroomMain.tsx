import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import ShowroomType from '../CommercialComponents/ShowroomType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShowroomDetails from '../CommercialComponents/ShowroomDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

const LeaseShowroomMain = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    showroomType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    showroomDetails: {},
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

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    // Each step corresponds to one form section
    <div key="basic">
      <h2 className="text-3xl font-bold mb-8">Basic Information</h2>
      <PropertyName propertyName={formData.propertyName} onPropertyNameChange={(name) => setFormData(prev => ({ ...prev, propertyName: name }))} />
      <ShowroomType onShowroomTypeChange={(type) => setFormData(prev => ({ ...prev, showroomType: type }))} />
      <CommercialPropertyAddress onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))} />
      <Landmark onLandmarkChange={(landmark) => setFormData(prev => ({ ...prev, landmark }))} />
      <MapCoordinates
        latitude={formData.coordinates.latitude}
        longitude={formData.coordinates.longitude}
        onLatitudeChange={(lat) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, latitude: lat } }))}
        onLongitudeChange={(lng) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, longitude: lng } }))}
      />
      <CornerProperty onCornerPropertyChange={(isCorner) => setFormData(prev => ({ ...prev, isCornerProperty: isCorner }))} />
    </div>,
    <div key="details">
      <h2 className="text-3xl font-bold mb-8">Property Details</h2>
      <ShowroomDetails onDetailsChange={(details) => setFormData(prev => ({ ...prev, showroomDetails: details }))} />
      <CommercialPropertyDetails onDetailsChange={(details) => setFormData(prev => ({ ...prev, propertyDetails: details }))} />
    </div>,
    <div key="lease">
      <h2 className="text-3xl font-bold mb-8">Lease Terms</h2>
      <LeaseAmount onLeaseAmountChange={(amount) => setFormData(prev => ({ ...prev, leaseAmount: amount }))} />
      <LeaseTenure onLeaseTenureChange={(tenure) => setFormData(prev => ({ ...prev, leaseTenure: tenure }))} />
      <MaintenanceAmount onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({ ...prev, maintenanceAmount: maintenance }))} />
      <OtherCharges onOtherChargesChange={(charges) => setFormData(prev => ({ ...prev, otherCharges: charges }))} />
      <Brokerage onBrokerageChange={(brokerage) => setFormData(prev => ({ ...prev, brokerage }))} />
    </div>,
    <div key="availability">
      <h2 className="text-3xl font-bold mb-8">Availability</h2>
      <CommercialAvailability onAvailabilityChange={(availability) => setFormData(prev => ({ ...prev, availability }))} />
    </div>,
    <div key="contact">
      <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
      <CommercialContactDetails onContactChange={(contact) => setFormData(prev => ({ ...prev, contactDetails: contact }))} />
    </div>,
    <div key="media">
      <h2 className="text-3xl font-bold mb-8">Property Media</h2>
      <CommercialMediaUpload onMediaChange={(media) => setFormData(prev => ({ ...prev, media }))} />
    </div>
  ];

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
        {steps[currentStep]}
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
        {currentStep < steps.length - 1 ? (
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

export default LeaseShowroomMain;
