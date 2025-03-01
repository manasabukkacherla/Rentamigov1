import React, { useState, useCallback } from 'react';
import PropertyName from '../PropertyName';
import IndependentPropertyAddress from '../IndependentPropertyAddress';
import MapCoordinates from '../MapCoordinates';
import PropertySize from '../PropertySize';
import IndependentPropertyFeatures from '../IndependentPropertyFeatures';
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

interface IndependentHouseProps {
  propertyId: string; // Property ID passed as a prop
  onSubmit?: (formData: any) => void;
}

const IndependentHouse = ({ propertyId, onSubmit }: IndependentHouseProps) => {
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyAddress: {
      flatNo: '',
      floor: '',
      houseName: '',
      address: '',
      pinCode: '',
      city: '',
      street: '',
      state: '',
      zipCode: ''
    },
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
    societyAmenities: {},
    restrictions: {
      foodPreference: '',
      petsAllowed: '',
      tenantType: ''
    }
  });

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Function to update property address details
  const handleAddressChange = useCallback((addressData: any) => {
    setFormData((prev) => ({
      ...prev,
      propertyAddress: { ...prev.propertyAddress, ...addressData }
    }));
  }, []);

  // Function to save data at each step
  const saveStepData = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const payload = {
        propertyId,
        propertyName: formData.propertyName,
        propertyAddress: formData.propertyAddress,
        coordinates: formData.coordinates, // Ensure correct field name for backend
        size: formData.size,
        restrictions: formData.restrictions,
        features: formData.features,
        rent: formData.rent,
        securityDeposit: formData.securityDeposit,
        maintenanceAmount: formData.maintenanceAmount,
        brokerage: formData.brokerage,
        availability: formData.availability,
        otherCharges: formData.otherCharges,
        media: formData.media,
        flatAmenities: formData.flatAmenities,
        societyAmenities: formData.societyAmenities
      };

      const response = await fetch("http://localhost:8000/api/basicdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload) // Sending the correct payload
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Step saved successfully! ✅");
      } else {
        setErrorMessage(`Error saving step: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving step:", error);
      setErrorMessage("Failed to save step. Check your connection.");
    }

    setLoading(false);
  };

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
            onAddressChange={handleAddressChange}
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
      title: 'Property Details',
      component: (
        <>
          <IndependentPropertyFeatures onFeaturesChange={(features) => setFormData(prev => ({ ...prev, features }))} />
          <FlatAmenities onAmenitiesChange={(amenities) => setFormData(prev => ({ ...prev, flatAmenities: amenities }))} />
          <SocietyAmenities onAmenitiesChange={(amenities) => setFormData(prev => ({ ...prev, societyAmenities: amenities }))} />
          <Restrictions onRestrictionsChange={(restrictions) => setFormData(prev => ({ ...prev, restrictions }))} />
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
    },
    {
      title: 'Property Media',
      component: <MediaUpload onMediaChange={(media) => setFormData(prev => ({ ...prev, media }))} />
    }
  ];

  const handleNext = async () => {
    await saveStepData();
    setStep(prev => prev + 1);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
      <h2 className="text-3xl font-bold mb-8">{steps[step].title}</h2>
      {steps[step].component}
      
      {/* Success & Error Messages */}
      {successMessage && <div className="p-4 bg-green-500 text-white rounded-lg text-center">{successMessage}</div>}
      {errorMessage && <div className="p-4 bg-red-500 text-white rounded-lg text-center">{errorMessage}</div>}

      <div className="sticky bottom-0 bg-black/80 backdrop-blur-sm p-4 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          {step > 0 && (
            <button type="button" onClick={() => setStep(prev => prev - 1)} className="px-6 py-3 rounded-lg border border-white/20 hover:border-white text-white transition-colors duration-200">
              Previous
            </button>
          )}
          <button type="button" onClick={handleNext} disabled={loading} className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200">
            {loading ? "Saving..." : step < steps.length - 1 ? "Next" : "List Property"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default IndependentHouse;
