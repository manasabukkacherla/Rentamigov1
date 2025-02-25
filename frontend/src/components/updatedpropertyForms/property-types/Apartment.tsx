import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import PropertyAddress from '../PropertyAddress';
import MapCoordinates from '../MapCoordinates';
import PropertySize from '../PropertySize';
import PropertyFeatures from '../PropertyFeatures';
import Rent from '../residentialrent/Rent';
import Restrictions from '../Restrictions';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import OtherCharges from '../residentialrent/OtherCharges';
import MediaUpload from '../MediaUpload';
import FlatAmenities from '../FlatAmenities';
import SocietyAmenities from '../SocietyAmenities';

interface ApartmentProps {
  onSubmit?: (formData: any) => void;
}
const handleRestrictionsChange = (restrictions: {
  foodPreference: string;
  petsAllowed: string;
  tenantType: string;
}) => {
  setFormData(prev => ({ ...prev, restrictions }));
};
const Apartment = ({ onSubmit }: ApartmentProps) => {
  const [formData, setFormData] = useState({
    propertyName: '',
    address: {},
    coordinates: { latitude: '', longitude: '' },
    size: '',
    features: {},
    rent: {
      expectedRent: '',
      isNegotiable: false,
      rentType: ''
    },
    securityDeposit: {},
    maintenanceAmount: {},
    brokerage: {},
    availability: {},
    otherCharges: {},
    media: { photos: [], video: null },
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
          <PropertyAddress
            onLatitudeChange={(lat) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, latitude: lat } }))}
            onLongitudeChange={(lng) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, longitude: lng } }))} onPropertyNameChange={function (name: string): void {
              throw new Error('Function not implemented.');
            } } onPropertyTypeSelect={function (type: string): void {
              throw new Error('Function not implemented.');
            } }          />
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
          <PropertyFeatures onFeaturesChange={(features) => setFormData(prev => ({ ...prev, features }))} />
          <FlatAmenities onAmenitiesChange={(amenities) => setFormData(prev => ({ ...prev, flatAmenities: amenities }))} />
          <SocietyAmenities onAmenitiesChange={(amenities) => setFormData(prev => ({ ...prev, societyAmenities: amenities }))} />
          <Restrictions onRestrictionsChange={handleRestrictionsChange} />
        </>
      )
    },
    {
      title: 'Rental Terms',
      component: (
        <>
          <Rent onRentChange={(rent) => setFormData(prev => ({ ...prev, rent }))} />
          {formData.rent.rentType === 'exclusive' && (
            <MaintenanceAmount onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({ ...prev, maintenanceAmount: maintenance }))} />
          )}
          <SecurityDeposit onSecurityDepositChange={(deposit) => setFormData(prev => ({ ...prev, securityDeposit: deposit }))} />
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

export default Apartment;
