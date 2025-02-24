import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import IndependentPropertyAddress from '../IndependentPropertyAddress';
import MapCoordinates from '../MapCoordinates';
import PropertySize from '../PropertySize';
import Restrictions from '../Restrictions';
import IndependentPropertyFeatures from '../IndependentPropertyFeatures';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import OtherCharges from '../residentialrent/OtherCharges';
import MediaUpload from '../MediaUpload';
import FlatAmenities from '../FlatAmenities';
import SocietyAmenities from '../SocietyAmenities';

interface LeaseIndependentHouseProps {
  onSubmit?: (formData: any) => void;
}

const LeaseIndependentHouse = ({ onSubmit }: LeaseIndependentHouseProps) => {
  const [formData, setFormData] = useState({
    propertyName: '',
    address: {},
    coordinates: { latitude: '', longitude: '' },
    size: '',
    restrictions: {},
    features: {},
    leaseAmount: {},
    leaseTenure: {},
    maintenanceAmount: {},
    brokerage: {},
    availability: {},
    media: { photos: [], video: null },
    otherCharges: {},
    flatAmenities: {},
    societyAmenities: {}
  });

  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Basic Information',
      component: (
        <>
          <PropertyName 
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) => setFormData(prev => ({ ...prev, propertyName: name }))}
          />
          <IndependentPropertyAddress
            onPropertyNameChange={(name) => setFormData(prev => ({ ...prev, propertyName: name }))}
            onPropertyTypeSelect={(type) => setFormData(prev => ({ ...prev, propertyType: type }))}
            onLatitudeChange={(lat) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, latitude: lat } }))}
            onLongitudeChange={(lng) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, longitude: lng } }))}
          />
          <MapCoordinates
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            onLatitudeChange={(lat) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, latitude: lat } }))}
            onLongitudeChange={(lng) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, longitude: lng } }))}
          />
          <PropertySize onPropertySizeChange={(size) => setFormData(prev => ({ ...prev, size }))} />
        </>
      )
    },
    {
      title: 'Property Media',
      component: <MediaUpload onMediaChange={(media) => setFormData(prev => ({ ...prev, media }))} />
    },
    {
      title: 'Property Details',
      component: (
        <>
          <Restrictions onRestrictionsChange={(restrictions) => setFormData(prev => ({ ...prev, restrictions }))} />
          <IndependentPropertyFeatures onFeaturesChange={(features) => setFormData(prev => ({ ...prev, features }))} />
          <FlatAmenities onAmenitiesChange={(amenities) => setFormData(prev => ({ ...prev, flatAmenities: amenities }))} />
          <SocietyAmenities onAmenitiesChange={(amenities) => setFormData(prev => ({ ...prev, societyAmenities: amenities }))} />
        </>
      )
    },
    {
      title: 'Lease Terms',
      component: (
        <>
          <LeaseAmount onLeaseAmountChange={(leaseAmount) => setFormData(prev => ({ ...prev, leaseAmount }))} />
          <LeaseTenure onLeaseTenureChange={(leaseTenure) => setFormData(prev => ({ ...prev, leaseTenure }))} />
          <MaintenanceAmount onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({ ...prev, maintenanceAmount: maintenance }))} />
          <OtherCharges onOtherChargesChange={(charges) => setFormData(prev => ({ ...prev, otherCharges: charges }))} />
          <Brokerage onBrokerageChange={(brokerage) => setFormData(prev => ({ ...prev, brokerage }))} />
        </>
      )
    },
    {
      title: 'Availability',
      component: <AvailabilityDate onAvailabilityChange={(availability) => setFormData(prev => ({ ...prev, availability }))} />
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <h2 className="text-3xl font-bold mb-8">{steps[step].title}</h2>
      {steps[step].component}
      <div className="sticky bottom-0 bg-black/80 backdrop-blur-sm p-4 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(prev => prev - 1)}
              className="px-6 py-3 rounded-lg border border-white/20 hover:border-white text-white transition-colors duration-200"
            >
              Previous
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(prev => prev + 1)}
              className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200"
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

export default LeaseIndependentHouse;
