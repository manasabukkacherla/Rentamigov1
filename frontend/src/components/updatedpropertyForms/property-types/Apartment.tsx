// import React, { useState, useCallback } from "react";
// import PropertyName from "../PropertyName";
// import PropertyAddress from "../PropertyAddress";
// import MapCoordinates from "../MapCoordinates";
// import PropertySize from "../PropertySize";
// import PropertyFeatures from "../PropertyFeatures";
// import Rent from "../residentialrent/Rent";
// import Restrictions from "../Restrictions";
// import SecurityDeposit from "../residentialrent/SecurityDeposit";
// import MaintenanceAmount from "../residentialrent/MaintenanceAmount";
// import Brokerage from "../residentialrent/Brokerage";
// import AvailabilityDate from "../AvailabilityDate";
// import OtherCharges from "../residentialrent/OtherCharges";
// import MediaUpload from "../MediaUpload";
// import FlatAmenities from "../FlatAmenities";
// import SocietyAmenities from "../SocietyAmenities";

// interface ApartmentProps {
//   propertyId: string; // Property ID passed as a prop
//   onSubmit?: (formData: any) => void;
// }

// const Apartment = ({ propertyId, onSubmit }: ApartmentProps) => {
//   const [formData, setFormData] = useState({
//     propertyId: propertyId || localStorage.getItem("propertyId") || "", // ✅ Always prioritize prop value
//     propertyName: "",
//     propertyAddress: {
//       flatNo: "",
//       floor: "",
//       houseName: "",
//       address: "",
//       pinCode: "",
//       city: "",
//       street: "",
//       state: "",
//       zipCode: "",
//     },
//     coordinates: { latitude: "", longitude: "" },
//     size: "",
//     features: {},
//     rent: { expectedRent: "", isNegotiable: false, rentType: "" },
//     securityDeposit: {},
//     maintenanceAmount: {},
//     brokerage: {},
//     availability: {},
//     otherCharges: {},
//     media: { photos: [], video: null },
//     flatAmenities: {},
//     societyAmenities: {},
//     restrictions: {
//       foodPreference: "",
//       petsAllowed: "",
//       tenantType: "",
//     },
//     propertyConfiguration: {
//       furnishingStatus: "",
//       flooringType: "",
//     },
//     areaDetails: {
//       superBuiltUpArea: "",
//       builtUpArea: "",
//       carpetArea: "",
//     },
//     waterAvailability: "",
//     electricityAvailability: "",
//     propertyFacing: "",
//     propertyAge: "",
//     utilityArea: "",
//   });

//   const [step, setStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   // Function to update property address details
//   const handleAddressChange = useCallback((addressData: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       propertyAddress: { ...prev.propertyAddress, ...addressData },
//     }));
//   }, []);

//   const steps = [
//     {
//       title: "Basic Information",
//       component: (
//         <>
//           <PropertyName
//             propertyName={formData.propertyName}
//             onPropertyNameChange={(name) =>
//               setFormData((prev) => ({ ...prev, propertyName: name }))
//             }
//           />
//           <PropertyAddress
//             onLatitudeChange={(lat) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 coordinates: { ...prev.coordinates, latitude: lat },
//               }))
//             }
//             onLongitudeChange={(lng) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 coordinates: { ...prev.coordinates, longitude: lng },
//               }))
//             }
//             onPropertyNameChange={(name) =>
//               setFormData((prev) => ({ ...prev, propertyName: name }))
//             }
//             onPropertyTypeSelect={(type) =>
//               setFormData((prev) => ({ ...prev, propertyType: type }))
//             }
//             onAddressChange={handleAddressChange}
//           />
//           <MapCoordinates
//             latitude={formData.coordinates.latitude}
//             longitude={formData.coordinates.longitude}
//             onLatitudeChange={(lat) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 coordinates: { ...prev.coordinates, latitude: lat },
//               }))
//             }
//             onLongitudeChange={(lng) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 coordinates: { ...prev.coordinates, longitude: lng },
//               }))
//             }
//           />
//           <PropertySize
//             onPropertySizeChange={(size) =>
//               setFormData((prev) => ({ ...prev, size }))
//             }
//           />
//         </>
//       ),
//     },

//     {
//       title: "Property Details",
//       component: (
//         <>
//           <PropertyFeatures
//             onFeaturesChange={(features) =>
//               setFormData((prev) => ({ ...prev, features }))
//             }
//           />
//           <FlatAmenities
//             onAmenitiesChange={(amenities) =>
//               setFormData((prev) => ({ ...prev, flatAmenities: amenities }))
//             }
//           />
//           <SocietyAmenities
//             onAmenitiesChange={(amenities) =>
//               setFormData((prev) => ({ ...prev, societyAmenities: amenities }))
//             }
//           />
//           <Restrictions
//             onRestrictionsChange={(restrictions) =>
//               setFormData((prev) => ({ ...prev, restrictions }))
//             }
//           />
//         </>
//       ),
//     },
//     {
//       title: "Rental Terms",
//       component: (
//         <>
//           <Rent
//             onRentChange={(rent) => setFormData((prev) => ({ ...prev, rent }))}
//           />
//           {formData.rent.rentType === "exclusive" && (
//             <MaintenanceAmount
//               onMaintenanceAmountChange={(maintenance) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   maintenanceAmount: maintenance,
//                 }))
//               }
//             />
//           )}
//           <SecurityDeposit
//             onSecurityDepositChange={(deposit) =>
//               setFormData((prev) => ({ ...prev, securityDeposit: deposit }))
//             }
//           />
//           <OtherCharges
//             onOtherChargesChange={(charges) =>
//               setFormData((prev) => ({ ...prev, otherCharges: charges }))
//             }
//           />
//           <Brokerage
//             onBrokerageChange={(brokerage) =>
//               setFormData((prev) => ({ ...prev, brokerage }))
//             }
//           />
//         </>
//       ),
//     },
//     {
//       title: "Availability",
//       component: (
//         <AvailabilityDate
//           onAvailabilityChange={(availability) =>
//             setFormData((prev) => ({ ...prev, availability }))
//           }
//         />
//       ),
//     },
//     {
//       title: "Property Media",
//       component: (
//         <MediaUpload
//           onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))}
//         />
//       ),
//     },
//   ];

//   // Function to save data at each step
//   const saveStepData = async () => {
//     setLoading(true);
//     setErrorMessage(null);
//     setSuccessMessage(null);

//     const endpoint = step === 0 ? "basicdetails" : "properties";

//     try {
//       const response = await fetch(`/api/${endpoint}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           propertyId: propertyId || formData.propertyId, // ✅ Ensure propertyId is used correctly
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setSuccessMessage("Step saved successfully! ✅");

//         // ✅ Persist propertyId correctly
//         if (step === 0 && result.data?.propertyId) {
//           const newPropertyId = propertyId || result.data.propertyId;
//           setFormData((prev) => ({
//             ...prev,
//             propertyId: newPropertyId, // ✅ Update propertyId
//           }));

//           localStorage.setItem("propertyId", newPropertyId);
//         }

//         return propertyId || result.data?.propertyId || formData.propertyId;
//       } else {
//         setErrorMessage(`Error saving step: ${result.message}`);
//         return null;
//       }
//     } catch (error) {
//       console.error("Error saving step:", error);
//       setErrorMessage("Failed to save step. Check your connection.");
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle Next button click
//   const handleNext = async () => {
//     const savedPropertyId = await saveStepData();

//     if (!savedPropertyId) {
//       setErrorMessage("Property ID is missing. Please try again.");
//       return; // Prevent moving forward if propertyId is missing
//     }

//     setStep((prev) => prev + 1);
//   };

//   return (
//     <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
//       <h2 className="text-3xl font-bold mb-8">{steps[step].title}</h2>
//       {steps[step].component}

//       {/* Success & Error Messages */}
//       {successMessage && (
//         <div className="p-4 bg-green-500 text-white rounded-lg text-center">
//           {successMessage}
//         </div>
//       )}
//       {errorMessage && (
//         <div className="p-4 bg-red-500 text-white rounded-lg text-center">
//           {errorMessage}
//         </div>
//       )}

//       <div className="sticky bottom-0 bg-black/80 backdrop-blur-sm p-4 -mx-4 sm:-mx-6 lg:-mx-8">
//         <div className="max-w-7xl mx-auto flex justify-between gap-4">
//           {step > 0 && (
//             <button
//               type="button"
//               onClick={() => setStep((prev) => prev - 1)}
//               className="px-6 py-3 rounded-lg border border-white/20 hover:border-white text-white transition-colors duration-200"
//             >
//               Previous
//             </button>
//           )}
//           <button
//             type="button"
//             onClick={handleNext}
//             disabled={loading}
//             className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200"
//           >
//             {loading
//               ? "Saving..."
//               : step < steps.length - 1
//               ? "Next"
//               : "List Property"}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Apartment;





"use client"

import { useState, useCallback } from "react"
import PropertyFeatures from "../PropertyFeatures"
import Rent from "../residentialrent/Rent"
import Restrictions from "../Restrictions"
import SecurityDeposit from "../residentialrent/SecurityDeposit"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import Brokerage from "../residentialrent/Brokerage"
import AvailabilityDate from "../AvailabilityDate"
import OtherCharges from "../residentialrent/OtherCharges"
import MediaUpload from "../MediaUpload"
import FlatAmenities from "../FlatAmenities"
import SocietyAmenities from "../SocietyAmenities"
import { Building, ChevronRight } from "lucide-react"

interface ApartmentProps {
  propertyId: string // Property ID passed as a prop
  onSubmit?: (formData: any) => void
}

const Apartment = ({ propertyId, onSubmit }: ApartmentProps) => {
  const [formData, setFormData] = useState({
    propertyId: propertyId || localStorage.getItem("propertyId") || "", // ✅ Always prioritize prop value
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
    rent: { expectedRent: "", isNegotiable: false, rentType: "" },
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
    propertyConfiguration: {
      furnishingStatus: "",
      flooringType: "",
    },
    areaDetails: {
      superBuiltUpArea: "",
      builtUpArea: "",
      carpetArea: "",
    },
    waterAvailability: "",
    electricityAvailability: "",
    propertyFacing: "",
    propertyAge: "",
    utilityArea: "",
  })

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Function to update property address details
  const handleAddressChange = useCallback((addressData: any) => {
    setFormData((prev) => ({
      ...prev,
      propertyAddress: { ...prev.propertyAddress, ...addressData },
    }))
  }, [])

  const steps = [
    {
      title: "Basic Information",
      component: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <Building className="text-purple-600 mr-2" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Apartment Details</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="propertyName" className="block text-gray-700 font-medium mb-2">
                Property Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="propertyName"
                  placeholder="Enter property name"
                  value={formData.propertyName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, propertyName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
                <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <textarea
                id="address"
                placeholder="Enter complete address"
                value={formData.propertyAddress.address}
                onChange={(e) => handleAddressChange({ address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="latitude" className="block text-gray-700 font-medium mb-2">
                  Latitude
                </label>
                <input
                  type="text"
                  id="latitude"
                  placeholder="Enter latitude"
                  value={formData.coordinates.latitude}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      coordinates: { ...prev.coordinates, latitude: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-gray-700 font-medium mb-2">
                  Longitude
                </label>
                <input
                  type="text"
                  id="longitude"
                  placeholder="Enter longitude"
                  value={formData.coordinates.longitude}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      coordinates: { ...prev.coordinates, longitude: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="propertySize" className="block text-gray-700 font-medium mb-2">
                Property Size (sq ft)
              </label>
              <input
                type="text"
                id="propertySize"
                placeholder="Enter property size"
                value={formData.size}
                onChange={(e) => setFormData((prev) => ({ ...prev, size: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Property Details",
      component: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <PropertyFeatures onFeaturesChange={(features) => setFormData((prev) => ({ ...prev, features }))} />
          <FlatAmenities
            onAmenitiesChange={(amenities) => setFormData((prev) => ({ ...prev, flatAmenities: amenities }))}
          />
          <SocietyAmenities
            onAmenitiesChange={(amenities) => setFormData((prev) => ({ ...prev, societyAmenities: amenities }))}
          />
          <Restrictions onRestrictionsChange={(restrictions) => setFormData((prev) => ({ ...prev, restrictions }))} />
        </div>
      ),
    },
    {
      title: "Rental Terms",
      component: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <Rent onRentChange={(rent) => setFormData((prev) => ({ ...prev, rent }))} />
          {formData.rent.rentType === "exclusive" && (
            <MaintenanceAmount
              onMaintenanceAmountChange={(maintenance) =>
                setFormData((prev) => ({
                  ...prev,
                  maintenanceAmount: maintenance,
                }))
              }
            />
          )}
          <SecurityDeposit
            onSecurityDepositChange={(deposit) => setFormData((prev) => ({ ...prev, securityDeposit: deposit }))}
          />
          <OtherCharges
            onOtherChargesChange={(charges) => setFormData((prev) => ({ ...prev, otherCharges: charges }))}
          />
          <Brokerage onBrokerageChange={(brokerage) => setFormData((prev) => ({ ...prev, brokerage }))} />
        </div>
      ),
    },
    {
      title: "Availability",
      component: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <AvailabilityDate
            onAvailabilityChange={(availability) => setFormData((prev) => ({ ...prev, availability }))}
          />
        </div>
      ),
    },
    {
      title: "Property Media",
      component: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <MediaUpload onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))} />
        </div>
      ),
    },
  ]

  // Function to save data at each step
  const saveStepData = async () => {
    setLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    const endpoint = step === 0 ? "basicdetails" : "properties"

    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          propertyId: propertyId || formData.propertyId, // ✅ Ensure propertyId is used correctly
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSuccessMessage("Step saved successfully! ✅")

        // ✅ Persist propertyId correctly
        if (step === 0 && result.data?.propertyId) {
          const newPropertyId = propertyId || result.data.propertyId
          setFormData((prev) => ({
            ...prev,
            propertyId: newPropertyId, // ✅ Update propertyId
          }))

          localStorage.setItem("propertyId", newPropertyId)
        }

        return propertyId || result.data?.propertyId || formData.propertyId
      } else {
        setErrorMessage(`Error saving step: ${result.message}`)
        return null
      }
    } catch (error) {
      console.error("Error saving step:", error)
      setErrorMessage("Failed to save step. Check your connection.")
      return null
    } finally {
      setLoading(false)
    }
  }

  // Function to handle Next button click
  const handleNext = async () => {
    const savedPropertyId = await saveStepData()

    if (!savedPropertyId) {
      setErrorMessage("Property ID is missing. Please try again.")
      return // Prevent moving forward if propertyId is missing
    }

    setStep((prev) => prev + 1)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{steps[step].title}</h2>
        <div className="h-1 w-20 bg-purple-600 mt-2 rounded-full"></div>
      </div>

      {steps[step].component}

      {/* Success & Error Messages */}
      {successMessage && (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg text-center mt-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-100 text-red-800 rounded-lg text-center mt-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errorMessage}
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={loading}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 flex items-center ml-auto"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              {step < steps.length - 1 ? "Next" : "List Property"}
              <ChevronRight className="ml-1" size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default Apartment

