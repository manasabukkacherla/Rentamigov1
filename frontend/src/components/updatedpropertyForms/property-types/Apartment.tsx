import React, { useState, useCallback } from 'react';
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
  propertyId: string; // Property ID passed as a prop
  onSubmit?: (formData: any) => void;
}

const Apartment = ({ propertyId, onSubmit }: ApartmentProps) => {
  const [formData, setFormData] = useState({
    propertyId: propertyId || localStorage.getItem("propertyId") || "", // ✅ Always prioritize prop value
    propertyName: '',
    propertyAddress: { flatNo: '', floor: '', houseName: '', address: '', pinCode: '', city: '', street: '', state: '', zipCode: '' },
    coordinates: { latitude: '', longitude: '' },
    size: '',
    features: {},
    rent: { expectedRent: '', isNegotiable: false, rentType: '' },
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
    },
    propertyConfiguration: {
      furnishingStatus: '',
      flooringType: ''
    },
    areaDetails: {
      superBuiltUpArea: '',
      builtUpArea: '',
      carpetArea: ''
    },
    waterAvailability: '',
    electricityAvailability: '',
    propertyFacing: '',
    propertyAge: '',
    utilityArea: ''
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

  const steps = [
    {
      title: 'Basic Information',
      component: (
        <>
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) =>
              setFormData((prev) => ({ ...prev, propertyName: name }))
            }
          />
          <PropertyAddress
            onLatitudeChange={(lat) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, latitude: lat }
              }))
            }
            onLongitudeChange={(lng) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, longitude: lng }
              }))
            }
            onPropertyNameChange={(name) =>
              setFormData((prev) => ({ ...prev, propertyName: name }))
            }
            onPropertyTypeSelect={(type) =>
              setFormData((prev) => ({ ...prev, propertyType: type }))
            }
            onAddressChange={handleAddressChange}
          />
          <MapCoordinates
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            onLatitudeChange={(lat) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, latitude: lat }
              }))
            }
            onLongitudeChange={(lng) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, longitude: lng }
              }))
            }
          />
          <PropertySize
            onPropertySizeChange={(size) =>
              setFormData((prev) => ({ ...prev, size }))
            }
          />
        </>
      )
    },
  
    {
      title: 'Property Details',
      component: (
        <>
          <PropertyFeatures onFeaturesChange={(features) => setFormData((prev) => ({ ...prev, features }))} />
          <FlatAmenities onAmenitiesChange={(amenities) => setFormData((prev) => ({ ...prev, flatAmenities: amenities }))} />
          <SocietyAmenities onAmenitiesChange={(amenities) => setFormData((prev) => ({ ...prev, societyAmenities: amenities }))} />
          <Restrictions onRestrictionsChange={(restrictions) => setFormData((prev) => ({ ...prev, restrictions }))} />
        </>
      )
    },
    {
      title: 'Rental Terms',
      component: (
        <>
          <Rent onRentChange={(rent) => setFormData((prev) => ({ ...prev, rent }))} />
          {formData.rent.rentType === 'exclusive' && (
            <MaintenanceAmount onMaintenanceAmountChange={(maintenance) => setFormData((prev) => ({ ...prev, maintenanceAmount: maintenance }))} />
          )}
          <SecurityDeposit onSecurityDepositChange={(deposit) => setFormData((prev) => ({ ...prev, securityDeposit: deposit }))} />
          <OtherCharges onOtherChargesChange={(charges) => setFormData((prev) => ({ ...prev, otherCharges: charges }))} />
          <Brokerage onBrokerageChange={(brokerage) => setFormData((prev) => ({ ...prev, brokerage }))} />
        </>
      )
    },
    {
      title: 'Availability',
      component: <AvailabilityDate onAvailabilityChange={(availability) => setFormData((prev) => ({ ...prev, availability }))} />
    },
    {
      title: 'Property Media',
      component: <MediaUpload onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))} />
    }
  ];

  // Function to save data at each step
  const saveStepData = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
  
    const endpoint = step === 0 ? "basicdetails" : "properties";
  
    try {
      const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          propertyId: propertyId || formData.propertyId, // ✅ Ensure propertyId is used correctly
        })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setSuccessMessage("Step saved successfully! ✅");
  
        // ✅ Persist propertyId correctly
        if (step === 0 && result.data?.propertyId) {
          const newPropertyId = propertyId || result.data.propertyId;
          setFormData((prev) => ({
            ...prev,
            propertyId: newPropertyId, // ✅ Update propertyId
          }));
  
          localStorage.setItem("propertyId", newPropertyId);
        }
  
        return propertyId || result.data?.propertyId || formData.propertyId;
      } else {
        setErrorMessage(`Error saving step: ${result.message}`);
        return null;
      }
    } catch (error) {
      console.error("Error saving step:", error);
      setErrorMessage("Failed to save step. Check your connection.");
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  // Function to handle Next button click
  const handleNext = async () => {
    const savedPropertyId = await saveStepData();
  
    if (!savedPropertyId) {
      setErrorMessage("Property ID is missing. Please try again.");
      return; // Prevent moving forward if propertyId is missing
    }
  
    setStep((prev) => prev + 1);
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
            <button type="button" onClick={() => setStep((prev) => prev - 1)} className="px-6 py-3 rounded-lg border border-white/20 hover:border-white text-white transition-colors duration-200">
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

export default Apartment;
