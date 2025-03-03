import React, { useState, useCallback, useEffect } from "react";
import PropertyName from "../PropertyName";
import PropertyAddress from "../PropertyAddress";
import MapCoordinates from "../MapCoordinates";
import PropertySize from "../PropertySize";
import PropertyFeatures from "../PropertyFeatures";
import Rent from "../residentialrent/Rent";
import Restrictions from "../Restrictions";
import SecurityDeposit from "../residentialrent/SecurityDeposit";
import MaintenanceAmount from "../residentialrent/MaintenanceAmount";
import Brokerage from "../residentialrent/Brokerage";
import AvailabilityDate from "../AvailabilityDate";
import OtherCharges from "../residentialrent/OtherCharges";
import MediaUpload from "../MediaUpload";
import FlatAmenities from "../FlatAmenities";
import SocietyAmenities from "../SocietyAmenities";

interface ApartmentProps {
  propertyId: string; // Property ID passed as a prop
  onSubmit?: (formData: any) => void;
}

const Apartment = ({ propertyId, onSubmit }: ApartmentProps) => {
  const [formData, setFormData] = useState({
    propertyId, // Ensure propertyId is included in form data
    propertyName: "",
    propertyAddress: {
      flatNo: "",
      floor: "",
      houseName: "",
      address: "",
      pinCode: "",
      city: "",
      street: "",
      state: "",
      zipCode: "",
    },
    coordinates: { latitude: "", longitude: "" },
    size: "",
    features: {},
    rent: {
      expectedRent: "",
      isNegotiable: false,
      rentType: "",
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
      foodPreference: "",
      petsAllowed: "",
      tenantType: "",
    },
  });

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Ensure propertyId is always updated in formData when it changes

  useEffect(() => {
    console.log("📌 Updated propertyId in useEffect:", formData.propertyId);
  }, [formData.propertyId]);
  
  useEffect(() => {
    console.log("📌 Updated Flat Amenities in useEffect:", formData.flatAmenities);
  }, [formData.flatAmenities]);
  

  // Function to update property address details
  const handleAddressChange = useCallback((addressData: any) => {
    setFormData((prev) => ({
      ...prev,
      propertyAddress: { ...prev.propertyAddress, ...addressData },
    }));
  }, []);
  const handleFlatAmenitiesChange = (updatedAmenities: Record<string, number | boolean>) => {
    console.log("📌 Flat Amenities Updated Before State:", updatedAmenities);
    setFormData((prev) => ({
      ...prev,
      flatAmenities: updatedAmenities,
    }));
  };
  
  // Steps Configuration
  const steps = [
    {
      title: "Basic Information",
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
                coordinates: { ...prev.coordinates, latitude: lat },
              }))
            }
            onLongitudeChange={(lng) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, longitude: lng },
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
                coordinates: { ...prev.coordinates, latitude: lat },
              }))
            }
            onLongitudeChange={(lng) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, longitude: lng },
              }))
            }
          />
          <PropertySize
            onPropertySizeChange={(size) =>
              setFormData((prev) => ({ ...prev, size }))
            }
          />
        </>
      ),
    },
    {
      title: "Property Details",
      component: (
        <>
          <PropertyFeatures
            onFeaturesChange={(features) =>
              setFormData((prev) => ({ ...prev, features }))
            }
          />
          <FlatAmenities
            onAmenitiesChange={(amenities) =>
              setFormData((prev) => ({ ...prev, flatAmenities: amenities }))
            }
          />
          <SocietyAmenities
            onAmenitiesChange={(amenities) =>
              setFormData((prev) => ({ ...prev, societyAmenities: amenities }))
            }
          />
          <Restrictions
            onRestrictionsChange={(restrictions) =>
              setFormData((prev) => ({ ...prev, restrictions }))
            }
          />
        </>
      ),
    },
    {
      title: "Rental Terms",
      component: (
        <>
          <Rent onRentChange={(rent) => setFormData((prev) => ({ ...prev, rent }))} />
          {formData.rent.rentType === "exclusive" && (
            <MaintenanceAmount
              onMaintenanceAmountChange={(maintenance) =>
                setFormData((prev) => ({ ...prev, maintenanceAmount: maintenance }))
              }
            />
          )}
          <SecurityDeposit
            onSecurityDepositChange={(deposit) =>
              setFormData((prev) => ({ ...prev, securityDeposit: deposit }))
            }
          />
          <OtherCharges
            onOtherChargesChange={(charges) =>
              setFormData((prev) => ({ ...prev, otherCharges: charges }))
            }
          />
          <Brokerage
            onBrokerageChange={(brokerage) =>
              setFormData((prev) => ({ ...prev, brokerage }))
            }
          />
        </>
      ),
    },
    {
      title: "Availability",
      component: (
        <AvailabilityDate
          onAvailabilityChange={(availability) =>
            setFormData((prev) => ({ ...prev, availability }))
          }
        />
      ),
    },
    
    {
      title: "Property Media",
      component: (
        <MediaUpload
          onMediaChange={(media) =>
            setFormData((prev) => ({ ...prev, media }))
          }
        />
      ),
    }
  ];

  const saveStepData = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
  
    try {
      if (step === 0) {
        // ✅ Save Basic Details first
        const basicDetailsResponse = await fetch(`http://localhost:8000/api/basicdetails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertyId: formData.propertyId,
            propertyName: formData.propertyName,
            propertyAddress: formData.propertyAddress,
            coordinates: formData.coordinates,
            size: formData.size,
            features: formData.features,
            rent: formData.rent,
            securityDeposit: formData.securityDeposit,
            maintenanceAmount: formData.maintenanceAmount,
            brokerage: formData.brokerage,
            availability: formData.availability,
            otherCharges: formData.otherCharges,
            media: formData.media,
            restrictions: formData.restrictions
          })
        });
  
        if (!basicDetailsResponse.ok) throw new Error("Failed to save Basic Details");
  
      } else if (step === 1) {
        // ✅ Save Flat Amenities
        const flatAmenitiesResponse = await fetch(`http://localhost:8000/api/flat-amenities`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertyId: formData.propertyId,
            amenities: formData.flatAmenities
          })
        });
  
        if (!flatAmenitiesResponse.ok) throw new Error("Failed to save Flat Amenities");
  
        // ✅ Save Society Amenities
        const societyAmenitiesResponse = await fetch(`http://localhost:8000/api/society-amenities`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertyId: formData.propertyId,
            amenities: formData.societyAmenities
          })
        });
  
        if (!societyAmenitiesResponse.ok) throw new Error("Failed to save Society Amenities");
      }
  
      setSuccessMessage("Step saved successfully! ✅");
    } catch (error) {
      console.error("Error saving step:", error);
      setErrorMessage("Failed to save step. Check your connection.");
    }
  
    setLoading(false);
  };
  
  
  

  // Function to handle Next button click
  const handleNext = async () => {
    await saveStepData();
    setStep((prev) => prev + 1);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
      <h2 className="text-3xl font-bold mb-8">{steps[step].title}</h2>
      {steps[step].component}

      {successMessage && <div className="p-4 bg-green-500 text-white rounded-lg text-center">{successMessage}</div>}
      {errorMessage && <div className="p-4 bg-red-500 text-white rounded-lg text-center">{errorMessage}</div>}

      <div className="sticky bottom-0 bg-black/80 backdrop-blur-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          {step > 0 && <button onClick={() => setStep((prev) => prev - 1)}>Previous</button>}
          <button onClick={handleNext} disabled={loading}>
            {loading ? "Saving..." : step < steps.length - 1 ? "Next" : "List Property"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Apartment;
