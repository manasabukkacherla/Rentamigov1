import React, { useState, useCallback } from 'react';
import PropertyName from '../PropertyName';
import IndependentPropertyAddress from '../IndependentPropertyAddress';
import MapCoordinates from '../MapCoordinates';
import PropertySize from '../PropertySize';
import IndependentPropertyFeatures from '../IndependentPropertyFeatures';
import Price from '../sell/Price';
import PricePerSqft from '../sell/PricePerSqft';
import RegistrationCharges from '../sell/RegistrationCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import MediaUpload from '../MediaUpload';
import OtherCharges from '../residentialrent/OtherCharges';
import FlatAmenities from '../FlatAmenities';
import SocietyAmenities from '../SocietyAmenities';

interface SellIndependentHouseProps {
  propertyId: string; // Property ID passed as a prop
  onSubmit?: (formData: any) => void;
}

const SellIndependentHouse = ({ propertyId, onSubmit }: SellIndependentHouseProps) => {
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
    price: '',
    area: {
      superBuiltUpAreaSqft: '',
      builtUpAreaSqft: '',
      carpetAreaSqft: ''
    },
    registrationCharges: {},
    brokerage: {},
    availability: {},
    media: { photos: [], video: null },
    otherCharges: {},
    flatAmenities: {},
    societyAmenities: {}
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
        propertyAddress: formData.propertyAddress, // ✅ Ensure this is included
        coordinates: formData.coordinates,
        size: formData.size,
        features: formData.features,
        price: formData.price,
        area: formData.area,
        registrationCharges: formData.registrationCharges,
        brokerage: formData.brokerage,
        availability: formData.availability,
        media: formData.media,
        otherCharges: formData.otherCharges,
        flatAmenities: formData.flatAmenities,
        societyAmenities: formData.societyAmenities
      };

      console.log("🔹 API Payload:", JSON.stringify(payload, null, 2)); // ✅ Debug log

      const response = await fetch("http://localhost:8000/api/basicdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload) // ✅ Send correctly formatted payload
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
        </>
      )
    },
    {
      title: 'Pricing Details',
      component: (
        <>
          <Price onPriceChange={(price) => setFormData(prev => ({ ...prev, price: price.amount }))} />
          <PricePerSqft 
            price={formData.price}
            area={formData.area}
          />
          <RegistrationCharges onRegistrationChargesChange={(charges) => setFormData(prev => ({ ...prev, registrationCharges: charges }))} />
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

      <button type="button" onClick={handleNext} disabled={loading} className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200">
        {loading ? "Saving..." : step < steps.length - 1 ? "Next" : "List Property"}
      </button>
    </form>
  );
};

export default SellIndependentHouse;
