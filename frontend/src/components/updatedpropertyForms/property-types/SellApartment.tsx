import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from 'axios';
import PropertyName from "../PropertyName";
import PropertyAddress from "../PropertyAddress";
import MapCoordinates from "../MapCoordinates";
import PropertySize from "../PropertySize";
import PropertyFeatures from "../PropertyFeatures"; 
import Price from "../sell/Price";
import PricePerSqft from "../sell/PricePerSqft";
import RegistrationCharges from "../sell/RegistrationCharges";
import Brokerage from "../residentialrent/Brokerage";
import AvailabilityDate from "../AvailabilityDate";
import MediaUpload from "../MediaUpload";
import OtherCharges from "../residentialrent/OtherCharges";
import FlatAmenities from "../FlatAmenities";
import SocietyAmenities from "../SocietyAmenities";
import { MapPin, Building2, DollarSign, Calendar, Image, Home, ImageIcon, ChevronLeft, ChevronRight, IndianRupee } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Add custom styles for inclusive/exclusive buttons
const customStyles = `
  /* Target inclusive buttons when selected */
  button.bg-blue-50.border-blue-500.text-blue-700 {
    border-color: #DBEAFE !important; /* border-blue-100 */
    background-color: #EFF6FF !important; /* bg-blue-50 */
  }
`;

interface FormData {
  propertyId: string;
  propertyName: string;
  propertyAddress: {
    flatNo: number;
    floor: number;
    houseName?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      location: {
        latitude: string;
        longitude: string;
        locationLabel: string;
      };
    };
  };
  size: string;
  features: {
    propertysize: number;
    bedrooms: number;
    washrooms: number;
    bathrooms: number;
    balconies: number;
    parkingdetails: 'yes' | 'No';
    ExtraRooms: string[];
    utility: 'Yes' | 'No';
    Furnishingstatus: 'Unfurnished' | 'Semi-Furnished' | 'Fully-Furnished';
    totalfloors: number;
    propertyonfloor: number;
    propertyfacing: string;
    propertyage: string;
    superareasqmt: number;
    builtupareasqmt: number;
    carpetareasqmt: number;
    electricityavailability: string;
    wateravailability: string[];
    showflat: boolean;
    apartmentType: string;
    price: number;
    pricetype: 'negotiable' | 'fixed';
    pricepersqft: number;
    chargestype: 'inclusive' | 'exclusive';
    registrationcharges: number;
    stampdutycharges: number;
    brokerage: { required: 'yes' | 'no'; amount: number };
    othercharges: {
      water: { type: 'inclusive' | 'exclusive'; amount: number };
      electricity: { type: 'inclusive' | 'exclusive'; amount: number };
      gas: { type: 'inclusive' | 'exclusive'; amount: number };
      others: { type: 'inclusive' | 'exclusive'; amount: number };
    };
  };
  price: string;
  area: {
    superBuiltUpAreaSqft: string;
    builtUpAreaSqft: string;
    carpetAreaSqft: string;
  };
  registrationCharges: Record<string, any>;
  brokerage: Record<string, any>;
  availability: Record<string, any>;
  media: {
    exteriorViews: File[];
    interiorViews: File[];
    floorPlan: File[];
    washrooms: File[];
    lifts: File[];
    emergencyExits: File[];
    videoTour: File | null;
    legalDocuments: File[];
  };
  otherCharges: Record<string, any>;
  flatAmenities: Record<string, any>;
  societyAmenities: Record<string, any>;
}

interface SellApartmentProps {
  propertyId: string;
  onSubmit?: (formData: FormData) => void;
}

const SellApartment = ({ propertyId }: SellApartmentProps) => {
  const [formData, setFormData] = useState<FormData>({
    propertyId,
    propertyName: "",
    propertyAddress: {
      flatNo: 0,
      floor: 0,
      houseName: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        location: {
          latitude: "",
          longitude: "",
          locationLabel: ""
        }
      }
    },
    size: "",
    features: {
      propertysize: 0,
      bedrooms: 0,
      washrooms: 0,
      bathrooms: 0,
      balconies: 0,
      parkingdetails: 'yes',
      ExtraRooms: [],
      utility: 'Yes',
      Furnishingstatus: 'Unfurnished',
      totalfloors: 0,
      propertyonfloor: 0,
      propertyfacing: "East",
      propertyage: "0-1 year",
      superareasqmt: 0,
      builtupareasqmt: 0,
      carpetareasqmt: 0,
      electricityavailability: "24x7",
      wateravailability: [],
      showflat: false,
      apartmentType: "",
      price: 0,
      pricetype: 'fixed',
      pricepersqft: 0,
      chargestype: 'inclusive',
      registrationcharges: 0,
      stampdutycharges: 0,
      brokerage: { required: 'no', amount: 0 },
      othercharges: {
        water: { type: 'inclusive', amount: 0 },
        electricity: { type: 'inclusive', amount: 0 },
        gas: { type: 'inclusive', amount: 0 },
        others: { type: 'inclusive', amount: 0 },
      },
    },
    price: "",
    area: {
      superBuiltUpAreaSqft: "",
      builtUpAreaSqft: "",
      carpetAreaSqft: "",
    },
    registrationCharges: {},
    brokerage: {},
    availability: {},
    media: {
      exteriorViews: [],
      interiorViews: [],
      floorPlan: [],
      washrooms: [],
      lifts: [],
      emergencyExits: [],
      videoTour: null,
      legalDocuments: []
    },
    otherCharges: {},
    flatAmenities: {},
    societyAmenities: {},
  });

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddressChange = useCallback((addressData: Partial<FormData['propertyAddress']>) => {
    setFormData((prev) => ({
      ...prev,
      propertyAddress: { ...prev.propertyAddress, ...addressData },
    }));
  }, []);

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
      // Scroll to top of the form
      setTimeout(() => {
        if (formRef.current) {
          window.scrollTo({
            top: formRef.current.offsetTop - 100,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // onSubmit?.(formData);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      // Scroll to top of the form
      setTimeout(() => {
        if (formRef.current) {
          window.scrollTo({
            top: formRef.current.offsetTop - 100,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const steps = [
    {
      title: "Basic Information",
      icon: <Home className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Home className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Basic Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyName
                  propertyName={formData.propertyName}
                  onPropertyNameChange={(name) =>
                    setFormData((prev) => ({ ...prev, propertyName: name }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyAddress
                  address={formData.propertyAddress}
                  onAddressChange={handleAddressChange}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Size</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertySize
                  onPropertySizeChange={(size) =>
                    setFormData((prev) => ({ ...prev, size }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Features</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyFeatures
                  onFeaturesChange={(features) =>
                    setFormData((prev) => ({ ...prev, features :{ ...prev.features, features } }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Amenities</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <div className="space-y-12">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <IndianRupee className="w-6 h-6" />,
      component: (
        <div className="space-y-8">

          <div className="space-y-8">

            <div className="space-y-12">
              {/* <Price
                onPriceChange={(price) =>
                  setFormData((prev) => ({
                    ...prev,
                    features: { ...prev.features, price: price.amount },
                  }))
                }
              /> */}
              {/* <PricePerSqft
                propertyPrice={formData.features.price || 0}
                Area={{
                  totalArea: formData.area.superBuiltUpAreaSqft || 0,
                  builtUpArea: formData.area.builtUpAreaSqft || 0,
                  carpetArea: formData.area.carpetAreaSqft || 0
                }}
              /> */}
            </div>

          </div>


          <div className="space-y-8">

            <div className="space-y-12">
              <RegistrationCharges
                onRegistrationChargesChange={(charges) =>
                  setFormData((prev) => ({
                    ...prev,
                    features: { ...prev.features, registrationCharges: charges },
                  }))
                }
              />
              <OtherCharges
                onOtherChargesChange={(charges) =>
                  setFormData((prev) => ({
                    ...prev,
                    features: { ...prev.features, otherCharges: charges },
                  }))
                }
              />
              <Brokerage
                onBrokerageChange={(brokerage) =>
                  setFormData((prev) => ({
                    ...prev,
                    features: { ...prev.features, brokerage: { required: brokerage.required, amount: brokerage.amount } },
                  }))
                }
              />
            </div>
          </div>
        </div>


      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: (
        <>
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Calendar className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Availability</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <AvailabilityDate
                  onAvailabilityChange={(availability) =>
                    setFormData((prev) => ({ ...prev, availability }))
                  }
                />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-6 h-6" />,
      component: (
        <>
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <ImageIcon className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Media</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <MediaUpload
                  onMediaChange={(media) => setFormData((prev) => ({
                    ...prev,
                    media: {
                      ...media,
                      videoTour: media.videoTour || null
                    }
                  }))}
                />
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  // --- SUBMIT HANDLER TO POST FORM DATA ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting formData:', formData);
    setIsSubmitting(true);
    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        navigate('/login');
        return;
      }
      const author = JSON.parse(user).id;
      // --- Transform formData to match backend schema ---
      const formDataToPost = {
        propertyId: formData.propertyId,
        basicInformation: {
          title: formData.propertyName,
          showflat: formData.features.showflat,
          apartmentType: formData.features.apartmentType,
          flatno: formData.propertyAddress.flatNo,
          floor: formData.propertyAddress.floor,
          address: {
            street: formData.propertyAddress.address.street,
            city: formData.propertyAddress.address.city,
            state: formData.propertyAddress.address.state,
            zipCode: formData.propertyAddress.address.zipCode,
            location: {
              latitude: formData.propertyAddress.address.location.latitude,
              longitude: formData.propertyAddress.address.location.longitude,
              locationLabel: formData.propertyAddress.address.location.locationLabel,
            }
          }
        },
        propertyDetails: {
          propertysize: formData.features.propertysize,
          bedrooms: formData.features.bedrooms,
          washrooms: formData.features.washrooms,
          bathrooms: formData.features.bathrooms,
          balconies: formData.features.balconies,
          parkingdetails: formData.features.parkingdetails,
          ExtraRooms: formData.features.ExtraRooms,
          utility: formData.features.utility,
          Furnishingstatus: formData.features.Furnishingstatus,
          totalfloors: formData.features.totalfloors,
          propertyonfloor: formData.features.propertyonfloor,
          propertyfacing: formData.features.propertyfacing,
          propertyage: formData.features.propertyage,
          superareasqft: Number(formData.area.superBuiltUpAreaSqft ?? 0),
          superareasqmt: formData.features.superareasqmt,
          builtupareasqft: Number(formData.area.builtUpAreaSqft ?? 0),
          builtupareasqmt: formData.features.builtupareasqmt,
          carpetareasqft: Number(formData.area.carpetAreaSqft ?? 0),
          carpetareasqmt: formData.features.carpetareasqmt,
          electricityavailability: formData.features.electricityavailability,
          wateravailability: formData.features.wateravailability,
        },
        flatamenities: formData.flatAmenities,
        availableitems: formData.societyAmenities,
        priceDetails: {
          propertyprice: formData.features.price,
          pricetype: formData.features.pricetype,
          pricepersqft: formData.features.pricepersqft,
          stampcharges: {
            chargestype: formData.features.chargestype,
            registrationcharges: formData.features.registrationcharges,
            stampdutycharges: formData.features.stampdutycharges,
            othercharges: {
              water: {
                type: formData.features.othercharges.water.type,
                amount: formData.features.othercharges.water.amount,
              },
              electricity: {
                type: formData.features.othercharges.electricity.type,
                amount: formData.features.othercharges.electricity.amount,
              },
              gas: {
                type: formData.features.othercharges.gas.type,
                amount: formData.features.othercharges.gas.amount,
              },
              others: {
                type: formData.features.othercharges.others.type,
                amount: formData.features.othercharges.others.amount,
              },
            },
            brokerage: {
              required: formData.features.brokerage.required,
              amount: formData.features.brokerage.amount,
            },
          },
        },
        media: {
          photos: {
            exterior: [],
            interior: [],
            floorPlan: [],
            washrooms: [],
            lifts: [],
            emergencyExits: [],
          },
          videoTour: '',
          documents: [],
        },
        metadata: {
          createdBy: author,
          createdAt: new Date(),
        }
      };
      // Convert media files to base64
      const convertedMedia = {
        photos: {
          exterior: await Promise.all((formData.media?.exteriorViews ?? []).map(convertFileToBase64)),
          interior: await Promise.all((formData.media?.interiorViews ?? []).map(convertFileToBase64)),
          floorPlan: await Promise.all((formData.media?.floorPlan ?? []).map(convertFileToBase64)),
          washrooms: await Promise.all((formData.media?.washrooms ?? []).map(convertFileToBase64)),
          lifts: await Promise.all((formData.media?.lifts ?? []).map(convertFileToBase64)),
          emergencyExits: await Promise.all((formData.media?.emergencyExits ?? []).map(convertFileToBase64))
        },
        videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : '',
        documents: await Promise.all((formData.media?.legalDocuments ?? []).map(convertFileToBase64))
      };
    
      const transformedData = {
        ...formDataToPost,
        media: convertedMedia,
        metadata: {
          createdBy: author,
          createdAt: new Date()
        }
      };
      const response = await axios.post('/api/residential/sell/apartments', transformedData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.success) {
        toast.success('Apartment listed successfully!');
      }
    } catch (error) {
      toast.error('Failed to create apartment listing. Please check all required fields.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <style>{customStyles}</style>
      {/* Progress indicator */}
      <div ref={formRef} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center ${i <= step ? "text-black" : "text-gray-400"}`}
              onClick={() => {
                if (i < step) {
                  setStep(i);
                  setTimeout(() => {
                    if (formRef.current) {
                      window.scrollTo({
                        top: formRef.current.offsetTop - 100,
                        behavior: 'smooth'
                      });
                    }
                  }, 100);
                }
              }}
              style={{ cursor: i < step ? "pointer" : "default" }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${i <= step ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {s.icon}
              </div>
              <span className="text-xs font-medium">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-1 rounded-full">
          <div
            className="bg-black h-1 rounded-full transition-all duration-300"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{steps[step].title}</h2>
          <p className="text-gray-600">Please fill in the details for your apartment property</p>
        </div>
        <div className="space-y-8">{steps[step].component}</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          {step > 0 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg border border-black/20 bg-white text-black transition-all duration-200"
              onClick={handlePrevious}
              disabled={loading}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
          ) : (
            <div></div> /* Empty div to maintain layout when no Previous button */
          )}

          {step < steps.length - 1 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white transition-all duration-200"
              onClick={handleNext}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white transition-all duration-200"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">Listing...</span>
                  <span className="loader spinner-border spinner-border-sm" />
                </>
              ) : (
                <>
                  List Property
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SellApartment;
