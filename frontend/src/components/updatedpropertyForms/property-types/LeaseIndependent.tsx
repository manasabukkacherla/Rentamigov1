// import React, { useState, useCallback } from "react";
// import PropertyName from "../PropertyName";
// import PropertyAddress from "../PropertyAddress";
// import MapCoordinates from "../MapCoordinates";
// import PropertySize from "../PropertySize";
// import PropertyFeatures from "../PropertyFeatures";
// import Rent from "../residentialrent/Rent";
// import SecurityDeposit from "../residentialrent/SecurityDeposit";
// import MaintenanceAmount from "../residentialrent/MaintenanceAmount";
// import Brokerage from "../residentialrent/Brokerage";
// import AvailabilityDate from "../AvailabilityDate";
// import OtherCharges from "../residentialrent/OtherCharges";
// import MediaUpload from "../MediaUpload";
// import FlatAmenities from "../FlatAmenities";
// import SocietyAmenities from "../SocietyAmenities";
// import { Building2, MapPin, Ruler, Home, Calendar, Image, IndianRupee } from "lucide-react";

// interface LeaseIndependentProps {
//   propertyId: string;
//   onSubmit?: (formData: any) => void;
// }

// const LeaseIndependent = ({ propertyId, onSubmit }: LeaseIndependentProps) => {
//   const [formData, setFormData] = useState({
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
//     rent: {
//       expectedRent: "",
//       isNegotiable: false,
//       rentType: "",
//     },
//     securityDeposit: {},
//     maintenanceAmount: {},
//     brokerage: {},
//     availability: {},
//     media: { photos: [], video: null },
//     otherCharges: {},
//     flatAmenities: {},
//     societyAmenities: {},
//   });

//   const [step, setStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const handleAddressChange = useCallback((addressData: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       propertyAddress: { ...prev.propertyAddress, ...addressData },
//     }));
//   }, []);

//   const steps = [
//     {
//       title: "Basic Information",
//       icon: <Building2 className="w-6 h-6" />,
//       component: (
//         <div className="space-y-8">
            
//             <PropertyName
//                 propertyName={formData.propertyName}
//                 onPropertyNameChange={(name) =>
//                   setFormData((prev) => ({ ...prev, propertyName: name }))
//                 }
//               />
//               <PropertyAddress
//                 onPropertyNameChange={(name) =>
//                   setFormData((prev) => ({ ...prev, propertyName: name }))
//                 }
//                 onPropertyTypeSelect={(type) =>
//                   setFormData((prev) => ({ ...prev, propertyType: type }))
//                 }
//                 onLatitudeChange={(lat) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     coordinates: { ...prev.coordinates, latitude: lat },
//                   }))
//                 }
//                 onLongitudeChange={(lng) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     coordinates: { ...prev.coordinates, longitude: lng },
//                   }))
//                 }
//                 onAddressChange={handleAddressChange}
//               />
//               <MapCoordinates
//                 latitude={formData.coordinates.latitude}
//                 longitude={formData.coordinates.longitude}
//                 onLatitudeChange={(lat) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     coordinates: { ...prev.coordinates, latitude: lat },
//                   }))
//                 }
//                 onLongitudeChange={(lng) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     coordinates: { ...prev.coordinates, longitude: lng },
//                   }))
//                 }
//               />
//             </div>
//       ),
//     },
//     {
//       title: "Property Size",
//       icon: <Ruler className="w-6 h-6" />,
//       component: (
//         <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
//           <div className="space-y-8">
//             <div className="flex items-center mb-8">
//               <Ruler className="text-black mr-3" size={28} />
//               <h3 className="text-2xl font-semibold text-black">Property Size</h3>
//             </div>
//             <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
//               <PropertySize
//                 onPropertySizeChange={(size) =>
//                   setFormData((prev) => ({ ...prev, size }))
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Property Features",
//       icon: <Home className="w-6 h-6" />,
//       component: (
//         <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
//           <div className="space-y-8">
//             <div className="flex items-center mb-8">
//               <Home className="text-black mr-3" size={28} />
//               <h3 className="text-2xl font-semibold text-black">Property Features</h3>
//             </div>
//             <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_label]:text-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20">
//               <PropertyFeatures
//                 onFeaturesChange={(features) =>
//                   setFormData((prev) => ({ ...prev, features }))
//                 }
//               />
//               <FlatAmenities
//                 onAmenitiesChange={(amenities) =>
//                   setFormData((prev) => ({ ...prev, flatAmenities: amenities }))
//                 }
//               />
//               <SocietyAmenities
//                 onAmenitiesChange={(amenities) =>
//                   setFormData((prev) => ({ ...prev, societyAmenities: amenities }))
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Rental Terms",
//       icon: <IndianRupee className="w-6 h-6" />,
//       component: (
//         <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
//           <div className="space-y-8">
//             <div className="flex items-center mb-8">
//               <IndianRupee className="text-black mr-3" size={28} />
//               <h3 className="text-2xl font-semibold text-black">Rental Terms</h3>
//             </div>
//             <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
//               <Rent
//                 onRentChange={(rent) => setFormData((prev) => ({ ...prev, rent: { ...prev.rent, ...rent } }))}
//               />
//               {formData.rent.rentType === "exclusive" && (
//                 <MaintenanceAmount
//                   onMaintenanceAmountChange={(maintenance) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       maintenanceAmount: maintenance,
//                     }))
//                   }
//                 />
//               )}
//               <SecurityDeposit
//                 onSecurityDepositChange={(deposit) =>
//                   setFormData((prev) => ({ ...prev, securityDeposit: deposit }))
//                 }
//               />
//               <OtherCharges
//                 onOtherChargesChange={(charges) =>
//                   setFormData((prev) => ({ ...prev, otherCharges: charges }))
//                 }
//               />
//               <Brokerage
//                 onBrokerageChange={(brokerage) =>
//                   setFormData((prev) => ({ ...prev, brokerage }))
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Availability",
//       icon: <Calendar className="w-6 h-6" />,
//       component: (
//         <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
//           <div className="space-y-8">
//             <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
//               <AvailabilityDate
//                 onAvailabilityChange={(availability) =>
//                   setFormData((prev) => ({ ...prev, availability }))
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Property Media",
//       icon: <Image className="w-6 h-6" />,
//       component: (
//         <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
//           <div className="space-y-8">
//             <div className="flex items-center mb-8">
//               <Image className="text-black mr-3" size={28} />
//               <h3 className="text-2xl font-semibold text-black">Property Media</h3>
//             </div>
//             <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
//               <MediaUpload
//                 onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))}
//               />
//             </div>
//           </div>
//         </div>
//       ),
//     },
//   ];

//   const handleNext = () => {
//     if (step < steps.length - 1) {
//       setStep((prev) => prev + 1);
//     } else {
//       onSubmit?.(formData);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-4xl mx-auto p-8">
//         <div className="flex items-center gap-2 mb-8">
//           <Building2 className="h-8 w-8 text-black" />
//           <h1 className="text-3xl font-bold text-black">Lease Your Independent House</h1>
//         </div>

//         {/* Progress Steps */}
//         <div className="flex items-center justify-between mb-8">
//           {steps.map((s, index) => (
//             <div key={index} className="flex items-center">
//               <div
//                 className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                   index <= step ? "bg-black text-white" : "bg-gray-200 text-gray-600"
//                 } cursor-pointer transition-all duration-300 hover:scale-110`}
//                 onClick={() => setStep(index)}
//               >
//                 {s.icon}
//               </div>
//               <div className="ml-2 text-sm font-medium text-black">{s.title}</div>
//               {index < steps.length - 1 && (
//                 <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
//           {steps[step].component}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between mt-8">
//           <button
//             onClick={() => setStep(prev => Math.max(0, prev - 1))}
//             disabled={step === 0 || loading}
//             className="px-6 py-3 bg-white text-black border border-black/20 rounded-lg hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>
//           <button
//             onClick={handleNext}
//             disabled={loading}
//             className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Saving..." : step === steps.length - 1 ? "Submit" : "Next"}
//           </button>
//         </div>

//         {/* Messages */}
//         {errorMessage && (
//           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//             {errorMessage}
//           </div>
//         )}
//         {successMessage && (
//           <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
//             {successMessage}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LeaseIndependent; 