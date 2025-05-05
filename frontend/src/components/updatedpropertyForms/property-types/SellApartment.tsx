// import React, { useState, useCallback, useRef, useEffect } from "react";
// import PropertyName from "../PropertyName";
// import PropertyAddress from "../PropertyAddress";
// import MapCoordinates from "../MapCoordinates";
// import PropertySize from "../PropertySize";
// import PropertyFeatures from "../PropertyFeatures";
// import Price from "../sell/Price";
// import PricePerSqft from "../sell/PricePerSqft";
// import RegistrationCharges from "../sell/RegistrationCharges";
// import Brokerage from "../residentialrent/Brokerage";
// import AvailabilityDate from "../AvailabilityDate";
// import MediaUpload from "../MediaUpload";
// import OtherCharges from "../residentialrent/OtherCharges";
// import FlatAmenities from "../FlatAmenities";
// import SocietyAmenities from "../SocietyAmenities";
// import { MapPin, Building2, DollarSign, Calendar, Image, Home, ImageIcon, ChevronLeft, ChevronRight, IndianRupee } from 'lucide-react';
// import axios from "axios";
// import { type } from "os";

// // Add custom styles for inclusive/exclusive buttons
// const customStyles = `
//   /* Target inclusive buttons when selected */
//   button.bg-blue-50.border-blue-500.text-blue-700 {
//     border-color: #DBEAFE !important; /* border-blue-100 */
//     background-color: #EFF6FF !important; /* bg-blue-50 */
//   }
// `;

// // --- Interfaces and Types ---

// interface Address {
//   flatNo: number;
//   showFlatNo: boolean;
//   floor: number;
//   apartmentName: string;
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   location: {
//     latitude: string;
//     longitude: string;
//   };
// }

// interface IBasicInformation {
//   propertyName: string;
//   address: Address;
// }

// interface PropertyDetails {
//   bedrooms: number;
//   washrooms: number;
//   balconies: number;
//   hasParking: boolean;
//   parkingDetails: {
//     twoWheeler: number;
//     fourWheeler: number;
//   };
//   extraRooms: {
//     servant: boolean;
//     puja: boolean;
//     store: boolean;
//     others: boolean;
//   };
//   utilityArea: string;
//   furnishingStatus: string;
//   totalFloors: number;
//   propertyOnFloor: number;
//   facing: string;
//   propertyAge: string;
//   superBuiltUpAreaSqft: number;
//   superBuiltUpAreaSqmt: number;
//   builtUpAreaSqft: number;
//   builtUpAreaSqmt: number;
//   carpetAreaSqft: number;
//   carpetAreaSqmt: number;
//   electricityAvailability: string;
//   waterAvailability: {
//     borewell: boolean;
//     governmentSupply: boolean;
//     tankerSupply: boolean;
//   };
// }

// interface FlatAmenities {
//   lights: number;
//   ceilingFan: number;
//   geysers: number;
//   chimney: boolean;
//   callingBell: boolean;
//   wardrobes: number;
//   lofts: number;
//   kitchenCabinets: number;
//   clothHanger: number;
//   pipedGasConnection: boolean;
//   gasStoveWithCylinder: boolean;
//   ironingStand: boolean;
//   bathtub: boolean;
//   shower: boolean;
//   sofa: boolean;
//   coffeeTable: boolean;
//   tvUnit: boolean;
//   diningTableWithChairs: number;
//   cotWithMattress: number;
//   sideTable: number;
//   studyTableWithChair: number;
//   television: boolean;
//   refrigerator: boolean;
//   washingMachine: boolean;
//   dishwasher: boolean;
//   waterPurifier: boolean;
//   microwaveOven: boolean;
//   inductionCooktop: boolean;
//   gasStove: boolean;
//   airConditioner: number;
//   desertCooler: number;
//   ironBox: boolean;
//   exhaustFan: number;
// }

// interface SocietyAmenities {
//   powerutility: string[];
//   parkingtranspotation: string[];
//   recreationalsportsfacilities: string[];
//   childrenfamilyamenities: string[];
//   healthwellnessfacilities: string[];
//   shoppingconviencestores: string[];
//   ecofriendlysustainable: string[];
//   communityculturalspaces: string[];
//   smarthometechnology: string[];
//   otheritems: string[];
// }

// interface IMedia {
//   photos: {
//     exterior: (File | string)[];
//     interior: (File | string)[];
//     floorPlan: (File | string)[];
//     washrooms: (File | string)[];
//     lifts: (File | string)[];
//     emergencyExits: (File | string)[];
//     bedrooms: (File | string)[];
//     halls: (File | string)[];
//     storerooms: (File | string)[];
//     kitchen: (File | string)[];
//   };
//   videoTour?: File | string;
//   documents: (File | string)[];
// }

// interface PropertySize {
//   superBuiltUpAreaSqft: number;
//   superBuiltUpAreaSqmt: number;
//   builtUpAreaSqft: number;
//   builtUpAreaSqmt: number;
//   carpetAreaSqft: number;
//   carpetAreaSqmt: number;
// }
// interface PriceDetails {
//   propertyprice: number;
//   pricetype: string;
//   stampcharges:
//   {
//     chargestype: string;
//     registrationcharges: number;
//     stampdutycharges: number;

//     othercharges: {
//       water: {
//         amount: number,
//         type: string,
//       },
//       electricity: {
//         amount: number,
//         type: string,
//       },
//       gas: {
//         amount: number,
//         type: string,
//       },
//       internet: {
//         amount: number,
//         type: string,
//       },
//       other: {
//         amount: number,
//         type: string,
//       },
//     },
//   },
// }
// interface Restrictions {
//   foodPreference: string;
//   petsAllowed: string;
//   tenantType: string;
// }

// interface FormData {
//   propertyId: any;
//   basicInformation: IBasicInformation;
//   propertySize: number;
//   propertyDetails: PropertyDetails;
//   priceDetails: PriceDetails;
//   restrictions: Restrictions;
//   flatAmenities: FlatAmenities;
//   societyAmenities: SocietyAmenities;
//   availability: {
//     type: "immediate" | "specific";
//     date: string;
//   };
//   media: IMedia;
// }

// interface SellApartmentProps {
//   propertyId: string;
//   onSubmit?: (formData: FormData) => void;
// }

// const SellApartment = ({ propertyId, onSubmit }: SellApartmentProps) => {
//   const [formData, setFormData] = useState<FormData>({
//     propertyId: propertyId,
//     basicInformation: {
//       propertyName: "",
//       address: {
//         flatNo: 0,
//         showFlatNo: false,
//         floor: 0,
//         apartmentName: "",
//         street: "",
//         city: "",
//         state: "",
//         zipCode: "",
//         location: {
//           latitude: "",
//           longitude: "",
//         },
//       },
//     },
//     propertySize: 0,
//     propertyDetails: {
//       bedrooms: 0,
//       washrooms: 0,
//       balconies: 0,
//       hasParking: false,
//       parkingDetails: {
//         twoWheeler: 0,
//         fourWheeler: 0,
//       },
//       extraRooms: {
//         servant: false,
//         puja: false,
//         store: false,
//         others: false,
//       },
//       utilityArea: "",
//       furnishingStatus: "",
//       totalFloors: 0,
//       propertyOnFloor: 0,
//       facing: "",
//       propertyAge: "",
//       superBuiltUpAreaSqft: 0,
//       superBuiltUpAreaSqmt: 0,
//       builtUpAreaSqft: 0,
//       builtUpAreaSqmt: 0,
//       carpetAreaSqft: 0,
//       carpetAreaSqmt: 0,
//       electricityAvailability: "",
//       waterAvailability: {
//         borewell: false,
//         governmentSupply: false,
//         tankerSupply: false,
//       },
//     },
//     restrictions: {
//       foodPreference: "",
//       petsAllowed: "",
//       tenantType: "",
//     },
//     flatAmenities: {
//       lights: 0,
//       ceilingFan: 0,
//       geysers: 0,
//       chimney: false,
//       callingBell: false,
//       wardrobes: 0,
//       lofts: 0,
//       kitchenCabinets: 0,
//       clothHanger: 0,
//       pipedGasConnection: false,
//       gasStoveWithCylinder: false,
//       ironingStand: false,
//       bathtub: false,
//       shower: false,
//       sofa: false,
//       coffeeTable: false,
//       tvUnit: false,
//       diningTableWithChairs: 0,
//       cotWithMattress: 0,
//       sideTable: 0,
//       studyTableWithChair: 0,
//       television: false,
//       refrigerator: false,
//       washingMachine: false,
//       dishwasher: false,
//       waterPurifier: false,
//       microwaveOven: false,
//       inductionCooktop: false,
//       gasStove: false,
//       airConditioner: 0,
//       desertCooler: 0,
//       ironBox: false,
//       exhaustFan: 0,
//     },
//     societyAmenities: {
//       powerutility: [],
//       parkingtranspotation: [],
//       recreationalsportsfacilities: [],
//       childrenfamilyamenities: [],
//       healthwellnessfacilities: [],
//       shoppingconviencestores: [],
//       ecofriendlysustainable: [],
//       communityculturalspaces: [],
//       smarthometechnology: [],
//       otheritems: [],
//     },

//     priceDetails: {
//       propertyprice: 0,
//       pricetype: "",
//       stampcharges:
//       {
//         chargestype: "",
//         registrationcharges: 0,
//         stampdutycharges: 0,

//         othercharges: {
//           water: {
//             amount: 0,
//             type: "",
//           },
//           electricity: {
//             amount: 0,
//             type: "",
//           },
//           gas: {
//             amount: 0,
//             type: "",
//           },
//           internet: {
//             amount: 0,
//             type: "",
//           },
//           other: {
//             amount: 0,
//             type: "",
//           },
//         },
//       },
//     },  
//     availability: {
//       type: "immediate",
//       date: "",
//     },
//     media: {
//       photos: {
//         exterior: [],
//         interior: [],
//         floorPlan: [],
//         washrooms: [],
//         lifts: [],
//         emergencyExits: [],
//         bedrooms: [],
//         halls: [],
//         storerooms: [],
//         kitchen: [],
//       },
//       videoTour: undefined,
//       documents: [],
//     },
//   });

//   const [step, setStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const formRef = useRef<HTMLDivElement>(null);
//   const [propertyId, setPropertyId] = useState<string | null>(null);
//   const onAmenitiesChange = (amenities: FlatAmenities) => {
//     setFormData((prev) => ({
//       ...prev,
//       flatAmenities: amenities,
//     }));
//   };

//   const onSocietyAmenitiesChange = (amenities: SocietyAmenities) => {
//     setFormData((prev) => ({
//       ...prev,
//       societyAmenities: amenities,
//     }));
//   };

//   const handleAddressChange = useCallback((addressData: Partial<FormData['basicInformation']['address']>) => {
//     setFormData((prev) => ({
//       ...prev,
//       basicInformation: { ...prev.basicInformation, address: { ...prev.basicInformation.address, ...addressData } },
//     }));
//   }, []);

//   const handleLocationChange = useCallback((location: { latitude: string; longitude: string; label: string }) => {
//     setFormData((prev) => ({
//       ...prev,
//       basicInformation: { ...prev.basicInformation, address: { ...prev.basicInformation.address, location: { ...prev.basicInformation.address.location, latitude: location.latitude, longitude: location.longitude } } },
//     }));
//   }, []);

//   const convertFileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = error => reject(error);
//     });
//   };

//   const convertedMedia=(formData: FormData) => {
//     return {
//       photos: {
//       exterior: Promise.all(
//         (formData.media.photos.exterior || [])
//           .map(fileObj => convertFileToBase64(fileObj as File))
//       ),
//       interior: Promise.all(
//         (formData.media.photos.interior || [])
//           .map(fileObj => convertFileToBase64(fileObj as File))
//       ),
//       floorPlan: Promise.all(
//         (formData.media.photos.floorPlan || [])
//           .map(fileObj => convertFileToBase64(fileObj as File))
//       ),
//       washrooms: Promise.all(
//         (formData.media.photos.washrooms || [])
//           .map(fileObj => convertFileToBase64(fileObj as File))
//       ),
//       lifts: Promise.all(
//         (formData.media.photos.lifts || [])
//           .map(fileObj => convertFileToBase64(fileObj as File))
//       ),
//       emergencyExits: Promise.all(
//         (formData.media.photos.emergencyExits || [])
//           .map(fileObj => convertFileToBase64(fileObj as File))
//       )
//     },
//     bedrooms: Promise.all(
//       (formData.media.photos.bedrooms || [])
//         .map(fileObj => convertFileToBase64(fileObj as File))
//     ),
//     halls: Promise.all(
//       (formData.media.photos.halls || [])
//         .map(fileObj => convertFileToBase64(fileObj as File))
//     ),
//     storerooms: Promise.all(
//       (formData.media.photos.storerooms || [])
//         .map(fileObj => convertFileToBase64(fileObj as File))
//     ),
//     kitchen: Promise.all(
//       (formData.media.photos.kitchen || [])
//         .map(fileObj => convertFileToBase64(fileObj as File))
//     ),
//     video: formData.media.videoTour ? convertFileToBase64(formData.media.videoTour as File) : undefined,
//     documents: Promise.all(formData.media.documents.map(doc => convertFileToBase64(doc as File)))
//   };
// };

//   const handleNext = async () => {
//     if (step < steps.length - 1) {
//       setStep((prev) => prev + 1);
//       // Scroll to top of the form
//       setTimeout(() => {
//         if (formRef.current) {
//           window.scrollTo({
//             top: formRef.current.offsetTop - 100,
//             behavior: 'smooth'
//           });
//         } else {
//           window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//           });
//         }
//       }, 100);
//     }

//     // } else {
//     //   // Transform media before submit
//     //   onSubmit?.({ ...formData,media:convertedMedia(formData) });
//     // }
//   };

//   const handlePrevious = () => {
//     if (step > 0) {
//       setStep((prev) => prev - 1);
//       // Scroll to top of the form
//       setTimeout(() => {
//         if (formRef.current) {
//           window.scrollTo({
//             top: formRef.current.offsetTop - 100,
//             behavior: 'smooth'
//           });
//         } else {
//           window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//           });
//         }
//       }, 100);
//     }
//   };
  

  

//   const steps = [
//     {
//       title: "Basic Information",
//       icon: <Home className="w-6 h-6" />,
//       component: (
//         <div className="space-y-8">
//           <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
//             <div className="space-y-8">
//               <div className="flex items-center mb-8">
//                 <MapPin className="text-black mr-3" size={28} />
//                 <h3 className="text-2xl font-semibold text-black">Location Details</h3>
//               </div>
//               <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
//                 <PropertyAddress
//                   address={formData.basicInformation.address}
//                   onAddressChange={handleAddressChange}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Property Details",
//       icon: <Building2 className="w-6 h-6" />,
//       component: (
//         <div className="space-y-8">
//           <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
//             <div className="space-y-8">
//               <div className="flex items-center mb-8">
//                 <Building2 className="text-black mr-3" size={28} />
//                 <h3 className="text-2xl font-semibold text-black">Property Size</h3>
//               </div>
//               <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
//                 <PropertySize
//                   onPropertySizeChange={(size) =>
//                     setFormData((prev) => ({ ...prev, propertySize: Number(size) }))
//                   }
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
//             <div className="space-y-8">
//               <div className="flex items-center mb-8">
//                 <Building2 className="text-black mr-3" size={28} />
//                 <h3 className="text-2xl font-semibold text-black">Property Features</h3>
//               </div>
//               <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
//                 <PropertyFeatures
//                   onFeaturesChange={(features) =>
//                     setFormData((prev) => ({ ...prev, propertyDetails: { ...prev.propertyDetails, ...features } }))
//                   }
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
//             <div className="space-y-8">
//               <div className="flex items-center mb-8">
//                 <Building2 className="text-black mr-3" size={28} />
//                 <h3 className="text-2xl font-semibold text-black">Amenities</h3>
//               </div>
//               <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
//                 <div className="space-y-12">
//                   <div key={propertyId || 'default'}>
//                     <FlatAmenities
//                       onAmenitiesChange={(flatAmenities: FlatAmenities) =>
//                         setFormData((prev) => ({ ...prev, flatAmenities }))
//                       }
//                       amenities={formData.flatAmenities}
//                     />
//                     <SocietyAmenities
//                       onAmenitiesChange={(societyAmenities: SocietyAmenities) =>
//                         setFormData((prev) => ({ ...prev, societyAmenities }))
//                       }
//                       amenities={formData.societyAmenities}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Pricing Details",
//       icon: <IndianRupee className="w-6 h-6" />,
//       component: (
//         <div className="space-y-8">

//           <div className="space-y-8">

//             <div className="space-y-12">
//               <Price
//                 onPriceChange={(price) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     priceDetails: { ...prev.priceDetails, propertyprice: Number(price.amount) },
//                   }))
//                 }
//               />
//               <PricePerSqft
//                 propertyPrice={Number(formData.priceDetails.propertyprice || 0)}
//                 Area={{
//                   totalArea: (formData.propertyDetails.superBuiltUpAreaSqft) || 0,
//                   builtUpArea: (formData.propertyDetails.builtUpAreaSqft) || 0,
//                   carpetArea: (formData.propertyDetails.carpetAreaSqft) || 0
//                 }}
//               />
//             </div>

//           </div>


//           <div className="space-y-8">

//             <div className="space-y-12">
//               <RegistrationCharges
//                 onRegistrationChargesChange={(charges) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     priceDetails: { ...prev.priceDetails, registrationCharges: charges },
//                   }))
//                 }
//               />
//               <OtherCharges
//                 onOtherChargesChange={(charges) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     priceDetails: { ...prev.priceDetails, otherCharges: charges },
//                   }))
//                 }
//               />
//               <Brokerage
//                 onBrokerageChange={(brokerage) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     priceDetails: { ...prev.priceDetails, brokerage },
//                   }))
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
//         <>
//           <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
//             <div className="space-y-8">
//               <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
//                 <AvailabilityDate
//                   onAvailabilityChange={(availability) =>
//                     setFormData((prev) => ({ ...prev, availability: { ...prev.availability, ...availability } }))
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "Property Media",
//       icon: <Image className="w-6 h-6" />,
//       component: (
//         <>
//           <div className="space-y-8">
//             <MediaUpload
//               initialMedia={formData.media}
//               onMediaChange={(media) => {
//                 setFormData(prev => ({
//                   ...prev,
//                   media: {
//                     photos: {
//                       exterior: media.photos.exterior || [],
//                       interior: media.photos.interior || [],
//                       floorPlan: media.photos.floorPlan || [],
//                       washrooms: media.photos.washrooms || [],
//                       lifts: media.photos.lifts || [],
//                       emergencyExits: media.photos.emergencyExits || [],
//                       bedrooms: media.photos.bedrooms || [],
//                       halls: media.photos.halls || [],
//                       storerooms: media.photos.storerooms || [],
//                       kitchen: media.photos.kitchen || []
//                     },
//                     videoTour: media.videoTour,
//                     documents: media.documents || []
//                   }
//                 }));
//               }}
//             />
//           </div>
//         </>
//       ),
//     },
//   ];

//   useEffect(() => {
//     if (propertyId) {
//       axios.get(`/api/residential/sell/apartments/${propertyId}`)
//         .then(response => {
//           const data = response.data;
//           setFormData(prev => ({
//             ...prev,
//             ...data,
//             flatAmenities: data.flatAmenities || prev.flatAmenities,
//             societyAmenities: data.societyAmenities || prev.societyAmenities,
//             media: {
//               photos: {
//                 exterior: data.media?.photos?.exterior || [],
//                 interior: data.media?.photos?.interior || [],
//                 floorPlan: data.media?.photos?.floorPlan || [],
//                 washrooms: data.media?.photos?.washrooms || [],
//                 lifts: data.media?.photos?.lifts || [],
//                 emergencyExits: data.media?.photos?.emergencyExits || [],
//                 bedrooms: data.media?.photos?.bedrooms || [],
//                 halls: data.media?.photos?.halls || [],
//                 storerooms: data.media?.photos?.storerooms || [],
//                 kitchen: data.media?.photos?.kitchen || [],
//               },
//               videoTour: data.media?.videoTour || undefined,
//               documents: data.media?.documents || [],
//             },
//           }));
//         })
//         .catch(() => {/* optionally handle error */});
//     }
//   }, [propertyId]);

//   // Helper to transform frontend formData to backend schema
//   const transformFormDataForBackend = (formData: FormData) => {
//     return {
//       propertyId: formData.propertyId,
//       basicInformation: {
//         propertyName: formData.basicInformation.propertyName,
//         address: {
//           flatNo: formData.basicInformation.address.flatNo,
//           showFlatNo: formData.basicInformation.address.showFlatNo,
//           floor: formData.basicInformation.address.floor,
//           apartmentName: formData.basicInformation.address.apartmentName,
//           street: formData.basicInformation.address.street,
//           city: formData.basicInformation.address.city,
//           state: formData.basicInformation.address.state,
//           zipCode: formData.basicInformation.address.zipCode,
//           location: {
//             latitude: formData.basicInformation.address.location.latitude,
//             longitude: formData.basicInformation.address.location.longitude,
//           },
//         },
//       },
//       propertySize: formData.propertySize,
//       propertyDetails: {
//         ...formData.propertyDetails,
//       },
//       priceDetails: formData.priceDetails,
//       restrictions: formData.restrictions,
//       flatAmenities: formData.flatAmenities,
//       societyAmenities: formData.societyAmenities,
//       availability: formData.availability,
//       media: {
//         photos: {
//           exterior: formData.media.photos.exterior,
//           interior: formData.media.photos.interior,
//           floorPlan: formData.media.photos.floorPlan,
//           washrooms: formData.media.photos.washrooms,
//           lifts: formData.media.photos.lifts,
//           emergencyExits: formData.media.photos.emergencyExits,
//           bedrooms: formData.media.photos.bedrooms,
//           halls: formData.media.photos.halls,
//           storerooms: formData.media.photos.storerooms,
//           kitchen: formData.media.photos.kitchen,
//         },
//         videoTour: formData.media.videoTour,
//         documents: formData.media.documents,
//       },
//     };
//   };

//   // Converts all media File objects to base64 strings before submission
//   const convertAllMediaToBase64 = async (media: IMedia) => {
//     const convertArray = async (arr: (File | string)[]) => {
//       return Promise.all(
//         (arr || []).map(async (item) => {
//           if (typeof item === "string") return item;
//           return await convertFileToBase64(item as File);
//         })
//       );
//     };
//     return {
//       photos: {
//         exterior: await convertArray(media.photos.exterior),
//         interior: await convertArray(media.photos.interior),
//         floorPlan: await convertArray(media.photos.floorPlan),
//         washrooms: await convertArray(media.photos.washrooms),
//         lifts: await convertArray(media.photos.lifts),
//         emergencyExits: await convertArray(media.photos.emergencyExits),
//         bedrooms: await convertArray(media.photos.bedrooms),
//         halls: await convertArray(media.photos.halls),
//         storerooms: await convertArray(media.photos.storerooms),
//         kitchen: await convertArray(media.photos.kitchen),
//       },
//       videoTour: media.videoTour
//         ? (typeof media.videoTour === "string"
//             ? media.videoTour
//             : await convertFileToBase64(media.videoTour as File))
//         : undefined,
//       documents: await convertArray(media.documents),
//     };
//   };

//   // Submit handler to send data to backend
//   const handleSubmit = async () => {
//     try {
//       // Convert all media files to base64 strings before sending
//       const convertedMedia = await convertAllMediaToBase64(formData.media);
//       const backendData = {
//         ...transformFormDataForBackend(formData),
//         media: convertedMedia,
//       };
//       const response = await axios.post("/api/residential/sell/apartments", backendData, {
//         headers: { "Content-Type": "application/json" },
//       });
//       if (response.data.success) {
//         alert("Apartment listed successfully!");
//       }
//     } catch (error) {
//       alert("Failed to create apartment listing.");
//     }
//   };

//   return (
//     <form onSubmit={(e) => e.preventDefault()} className="max-w-5xl mx-auto px-4 py-8 space-y-12">
//       <style>{customStyles}</style>
//       {/* Progress indicator */}
//       <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
//         <div className="max-w-5xl mx-auto px-4 py-4">
//           <div className="flex justify-center">
//             <div className="flex items-center space-x-2">
//               {steps.map((s, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center cursor-pointer"
//                   onClick={() => {
//                     if (i < step) {
//                       setStep(i);
//                       setTimeout(() => {
//                         if (formRef.current) {
//                           window.scrollTo({
//                             top: formRef.current.offsetTop - 100,
//                             behavior: 'smooth'
//                           });
//                         }
//                       }, 100);
//                     }
//                   }}
//                 >
//                   <div className="flex flex-col items-center group">
//                     <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${i <= step
//                       ? 'bg-black text-white'
//                       : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//                       }`}>
//                       {s.icon}
//                     </div>
//                     <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${i <= step
//                       ? 'text-black'
//                       : 'text-gray-500 group-hover:text-gray-700'
//                       }`}>
//                       {s.title}
//                     </span>
//                   </div>
//                   {i < steps.length - 1 && (
//                     <div className="flex items-center mx-1">
//                       <div className={`w-12 h-1 transition-colors duration-200 ${i < step ? 'bg-black' : 'bg-gray-200'
//                         }`} />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-12">
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-black mb-2">{steps[step].title}</h2>
//           <p className="text-gray-600">Please fill in the details for your apartment property</p>
//         </div>
//         <div className="space-y-8">{steps[step].component}</div>
//       </div>

//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
//         <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
//           {step > 0 ? (
//             <button
//               type="button"
//               className="flex items-center px-6 py-2 rounded-lg border border-black/20 bg-white text-black transition-all duration-200"
//               onClick={handlePrevious}
//               disabled={loading}
//             >
//               <ChevronLeft className="w-5 h-5 mr-2" />
//               Previous
//             </button>
//           ) : (
//             <div></div> /* Empty div to maintain layout when no Previous button */
//           )}

//           {step < steps.length - 1 ? (
//             <button
//               type="button"
//               className="flex items-center px-6 py-2 rounded-lg bg-black text-white transition-all duration-200"
//               onClick={handleNext}
//             >
//               Next
//               <ChevronRight className="w-5 h-5 ml-2" />
//             </button>
//           ) : (
//             <button
//               type="button"
//               className="flex items-center px-6 py-2 rounded-lg bg-black text-white transition-all duration-200"
//               onClick={handleSubmit}
//             >
//               List Property
//               <ChevronRight className="w-5 h-5 ml-2" />
//             </button>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default SellApartment;
const SellApartment = () => {
    return (
        <div>
            <h1>SellApartment</h1>
        </div>
    );
};
export default SellApartment; 