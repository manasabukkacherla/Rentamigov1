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

      {/* Navigation Buttons */}
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
          {currentStep === steps.length - 1 ? (
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200"
            >
              List Property
            </button>
          ) : (
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default LeaseShowroomMain;
