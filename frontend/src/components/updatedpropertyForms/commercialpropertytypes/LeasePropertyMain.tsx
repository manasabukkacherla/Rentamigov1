import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import PlotType from '../CommercialComponents/PlotType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import PlotDetails from '../CommercialComponents/PlotDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';

import MediaUpload from '../MediaUpload';

const LeasePropertyMain = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    plotType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    plotDetails: {},
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

  const [step, setStep] = useState(0);
  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const steps = [
    <>
      <PropertyName propertyName={formData.propertyName} onPropertyNameChange={name => setFormData(prev => ({ ...prev, propertyName: name }))} />
      <PlotType onPlotTypeChange={type => setFormData(prev => ({ ...prev, plotType: type }))} />
      <CommercialPropertyAddress onAddressChange={address => setFormData(prev => ({ ...prev, address }))} />
      <Landmark onLandmarkChange={landmark => setFormData(prev => ({ ...prev, landmark }))} />
      <MapCoordinates latitude={formData.coordinates.latitude} longitude={formData.coordinates.longitude} onLatitudeChange={lat => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, latitude: lat } }))} onLongitudeChange={lng => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, longitude: lng } }))} />
      <CornerProperty onCornerPropertyChange={isCorner => setFormData(prev => ({ ...prev, isCornerProperty: isCorner }))} />
    </>,
    <>
      <PlotDetails onDetailsChange={details => setFormData(prev => ({ ...prev, plotDetails: details }))} />
      <CommercialPropertyDetails onDetailsChange={details => setFormData(prev => ({ ...prev, propertyDetails: details }))} />
    </>,
    <>
      <LeaseAmount onLeaseAmountChange={amount => setFormData(prev => ({ ...prev, leaseAmount: amount }))} />
      <LeaseTenure onLeaseTenureChange={tenure => setFormData(prev => ({ ...prev, leaseTenure: tenure }))} />
      <MaintenanceAmount onMaintenanceAmountChange={maintenance => setFormData(prev => ({ ...prev, maintenanceAmount: maintenance }))} />
      <OtherCharges onOtherChargesChange={charges => setFormData(prev => ({ ...prev, otherCharges: charges }))} />
      <Brokerage onBrokerageChange={brokerage => setFormData(prev => ({ ...prev, brokerage }))} />
    </>,
    <CommercialAvailability onAvailabilityChange={availability => setFormData(prev => ({ ...prev, availability }))} />,
    <CommercialContactDetails onContactChange={contact => setFormData(prev => ({ ...prev, contactDetails: contact }))} />,
    <MediaUpload onMediaChange={(media) => setFormData(prev => ({ ...prev, media }))} />
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-12">
        <h2 className="text-3xl font-bold mb-8">Step {step + 1} of {totalSteps}</h2>
        {steps[step]}
      </div>

      <div className="sticky bottom-0 bg-black/80 backdrop-blur-sm p-4 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          {step > 0 && (
            <button
              type="button"
              className="px-6 py-3 rounded-lg border border-white/20 hover:border-white text-white transition-colors duration-200"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {step < totalSteps - 1 ? (
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

export default LeasePropertyMain;
