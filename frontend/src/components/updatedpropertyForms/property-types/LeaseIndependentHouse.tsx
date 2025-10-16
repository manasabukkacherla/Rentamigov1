"use client"

import React, { useState, useCallback, useRef } from "react";
import { Building2, MapPin, IndianRupee, Calendar, Image, Ruler, Home, ChevronLeft, ChevronRight, Locate, Navigation, Loader2 } from "lucide-react";
import PropertyName from "../PropertyName";
import IndependentPropertyAddress from "../IndependentPropertyAddress";
import MapCoordinates from "../MapCoordinates";
import PropertySize from "../PropertySize";
import Restrictions from "../Restrictions";
import IndependentPropertyFeatures from "../IndependentPropertyFeatures";
import LeaseAmount from "../lease/LeaseAmount";
import LeaseTenure from "../lease/LeaseTenure";
import MaintenanceAmount from "../residentialrent/MaintenanceAmount";
import Brokerage from "../residentialrent/Brokerage";
import AvailabilityDate from "../AvailabilityDate";
import OtherCharges from "../residentialrent/OtherCharges";
import ResidentialPropertyMediaUpload from "../ResidentialPropertyMediaUpload";
import FlatAmenities from "../FlatAmenities";
import SocietyAmenities from "../SocietyAmenities";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Add custom styles for inclusive/exclusive buttons
const customStyles = `
  /* Target inclusive buttons when selected */
  button.bg-blue-50.border-blue-500.text-blue-700 {
    border-color: #DBEAFE !important; /* border-blue-100 */
    background-color: #EFF6FF !important; /* bg-blue-50 */
  }
`;

interface Location {
  latitude: string;
  longitude: string;
}

interface Address {
  houseName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  pinCode: string;
  location: Location;
}

interface BasicInformation {
  title: string;
  propertyAddress: Address;
}

interface ParkingDetails {
  twoWheeler: number;
  fourWheeler: number;
}

interface ExtraRooms {
  servant: boolean;
  puja: boolean;
  store: boolean;
  others: boolean;
}

interface WaterAvailability {
  borewell: boolean;
  governmentSupply: boolean;
  tankerSupply: boolean;
}

interface PropertyDetails {
  bedrooms: number;
  washrooms: number;
  balconies: number;
  hasParking: boolean;
  parkingDetails: ParkingDetails;
  extraRooms: ExtraRooms;
  utilityArea: string;
  furnishingStatus: string;
  flooring: string;
  facing: string;
  propertyAge: string;
  superBuiltUpAreaSqft: number;
  superBuiltUpAreaSqmt: number;
  builtUpAreaSqft: number;
  builtUpAreaSqmt: number;
  carpetAreaSqft: number;
  carpetAreaSqmt: number;
  electricityAvailability: string;
  waterAvailability: WaterAvailability;
}

interface FlatAmenities {
  lights: number;
  ceilingFan: number;
  geysers: number;
  chimney: boolean;
  callingBell: boolean;
  wardrobes: number;
  lofts: number;
  kitchenCabinets: number;
  clothHanger: number;
  pipedGasConnection: boolean;
  gasStoveWithCylinder: boolean;
  ironingStand: boolean;
  bathtub: boolean;
  shower: boolean;
  sofa: boolean;
  coffeeTable: boolean;
  tvUnit: boolean;
  diningTableWithChairs: number;
  cotWithMattress: number;
  sideTable: number;
  studyTableWithChair: number;
  television: boolean;
  refrigerator: boolean;
  washingMachine: boolean;
  dishwasher: boolean;
  waterPurifier: boolean;
  microwaveOven: boolean;
  inductionCooktop: boolean;
  gasStove: boolean;
  airConditioner: number;
  desertCooler: number;
  ironBox: boolean;
  exhaustFan: number;
}

interface SocietyAmenities {
  powerutility: string[];
  parkingtranspotation: string[];
  recreationalsportsfacilities: string[];
  childrenfamilyamenities: string[];
  healthwellnessfacilities: string[];
  shoppingconviencestores: string[];
  ecofriendlysustainable: string[];
  communityculturalspaces: string[];
  smarthometechnology: string[];
  otheritems: string[];
}

interface Media {
  photos: {
    exterior: (File | string)[];
    interior: (File | string)[];
    floorPlan: (File | string)[];
    washrooms: (File | string)[];
    lifts: (File | string)[];
    emergencyExits: (File | string)[];
    bedrooms: (File | string)[];
    halls: (File | string)[];
    storerooms: (File | string)[];
    kitchen: (File | string)[];
  };
  videoTour?: File | string | undefined;
  documents: (File | string)[];
}

interface LeaseAmount {
  amount: number;
  type: string;
  duration: number;
  durationUnit: string;
}


interface TenureDetails {
  minimumTenure: number;
  minimumUnit: string;
  maximumTenure: number;
  maximumUnit: string;
  lockInPeriod: number;
  lockInUnit: string;
  noticePeriod: number;
  noticePeriodUnit: string;
}

interface ChargeDetails {
  amount: number;
  type: string;
}

interface OtherCharges {
  water: ChargeDetails;
  electricity: ChargeDetails;
  gas: ChargeDetails;
  others: ChargeDetails;
}

interface LeaseTerms {
  leaseDetails: {
    leaseAmount: LeaseAmount;
  };
  tenureDetails: TenureDetails;
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  otherCharges: OtherCharges;
  brokerage: {
    required: string;
    amount?: number;
  };
}

interface Availability {
  type: string;
  date: string;
}

interface FormData {
  basicInformation: BasicInformation;
  propertySize: number;
  propertyDetails: PropertyDetails;
  restrictions: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  };
  flatAmenities: FlatAmenities;
  societyAmenities: SocietyAmenities;
  leaseTerms: LeaseTerms;
  availability: Availability;
  media: Media;
  metadata?: {
    createdBy: string;
    createdAt: string;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
  };
}

interface PropertyNameProps {
  // propertyName: string
  onPropertyNameChange: (name: string) => void
}

interface MapSelectorProps {
  latitude: string
  longitude: string
  onLocationSelect: (lat: string, lng: string, address?: any) => void
  initialShowMap?: boolean
}

interface PropertySizeProps {
  propertySize: number;
  onPropertySizeChange: (size: number) => void;
}

interface PropertyFeaturesProps {
  onFeaturesChange?: (features: Record<string, any>) => void
}

interface FlatAmenitiesProps {
  amenities: string[]
  onChange: (amenities: string[]) => void
}

interface SocietyAmenitiesProps {
  amenities: string[]
  onChange: (amenities: string[]) => void
}

interface RestrictionsProps {
  restrictions: string[]
  onChange: (restrictions: string[]) => void
}

interface AvailabilityDateProps {
  date: Date
  onChange: (date: Date) => void
}

interface MediaUploadProps {
  onMediaChange?: (media: {
    exteriorViews: File[];
    interiorViews: File[];
    floorPlan: File[];
    washrooms: File[];
    lifts: File[];
    emergencyExits: File[];
    videoTour?: File;
    legalDocuments: File[];
  }) => void;
}

const LeaseIndependentHouse: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<string | undefined>(undefined);

  const initialFormData: FormData = {
    basicInformation: {
      title: "",
      propertyAddress: {
        houseName: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        pinCode: "",
        location: {
          latitude: "",
          longitude: ""
        }
      }
    },
    propertySize: 0,
    propertyDetails: {
      bedrooms: 0,
      washrooms: 0,
      balconies: 0,
      hasParking: false,
      parkingDetails: {
        twoWheeler: 0,
        fourWheeler: 0
      },
      extraRooms: {
        servant: false,
        puja: false,
        store: false,
        others: false
      },
      utilityArea: "",
      furnishingStatus: "",
      flooring: "",
      facing: "",
      propertyAge: "",
      superBuiltUpAreaSqft: 0,
      superBuiltUpAreaSqmt: 0,
      builtUpAreaSqft: 0,
      builtUpAreaSqmt: 0,
      carpetAreaSqft: 0,
      carpetAreaSqmt: 0,
      electricityAvailability: "",
      waterAvailability: {
        borewell: false,
        governmentSupply: false,
        tankerSupply: false
      }
    },
    restrictions: {
      foodPreference: "",
      petsAllowed: "",
      tenantType: ""
    },
    flatAmenities: {
      lights: 0,
      ceilingFan: 0,
      geysers: 0,
      chimney: false,
      callingBell: false,
      wardrobes: 0,
      lofts: 0,
      kitchenCabinets: 0,
      clothHanger: 0,
      pipedGasConnection: false,
      gasStoveWithCylinder: false,
      ironingStand: false,
      bathtub: false,
      shower: false,
      sofa: false,
      coffeeTable: false,
      tvUnit: false,
      diningTableWithChairs: 0,
      cotWithMattress: 0,
      sideTable: 0,
      studyTableWithChair: 0,
      television: false,
      refrigerator: false,
      washingMachine: false,
      dishwasher: false,
      waterPurifier: false,
      microwaveOven: false,
      inductionCooktop: false,
      gasStove: false,
      airConditioner: 0,
      desertCooler: 0,
      ironBox: false,
      exhaustFan: 0
    },
    societyAmenities: {
      powerutility: [],
      parkingtranspotation: [],
      recreationalsportsfacilities: [],
      childrenfamilyamenities: [],
      healthwellnessfacilities: [],
      shoppingconviencestores: [],
      ecofriendlysustainable: [],
      communityculturalspaces: [],
      smarthometechnology: [],
      otheritems: []
    },
    leaseTerms: {
      leaseDetails: {
        leaseAmount: {
          amount: 0,
          type: "",
          duration: 0,
          durationUnit: ""
        }
      },
      tenureDetails: {
        minimumTenure: 0,
        minimumUnit: "",
        maximumTenure: 0,
        maximumUnit: "",
        lockInPeriod: 0,
        lockInUnit: "",
        noticePeriod: 0,
        noticePeriodUnit: ""
      },
      maintenanceAmount: {
        amount: 0,
        frequency: ""
      },
      otherCharges: {
        water: {
          amount: 0,
          type: ""
        },
        electricity: {
          amount: 0,
          type: ""
        },
        gas: {
          amount: 0,
          type: ""
        },
        others: {
          amount: 0,
          type: ""
        }
      },
      brokerage: {
        required: "",
        amount: 0
      }
    },
    availability: {
      type: "",
      date: ""
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        lifts: [],
        emergencyExits: [],
        bedrooms: [],
        halls: [],
        storerooms: [],
        kitchen: []
      },
      documents: []
    },
    metadata: {
      createdBy: "",
      createdAt: new Date().toISOString(),
      propertyType: "Residential",
      propertyName: "Independent House",
      intent: "Lease",
      status: "Available"
    }
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleAddressChange = useCallback((newAddress: Address) => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        address: {
          ...prev.basicInformation.propertyAddress,
          ...newAddress,
          location: {
            ...prev.basicInformation.propertyAddress.location,
            ...newAddress.location // <-- This line ensures updated lat/lng are applied
          }
        }
      }
    }));
  }, []);

  const handleAvailabilityChange = useCallback((newAvailability: { type: "immediate" | "specific", date?: string }) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        type: newAvailability.type,
        date: newAvailability.date || ""
      }
    }))
  }, []);

  const formSections = [
    {
      title: "Basic Information",
      icon: <Home className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name: string) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, title: name } }))}
          />
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <IndependentPropertyAddress
                propertyAddress={formData.basicInformation.propertyAddress}
                onAddressChange={(address) =>
                  setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, propertyAddress: address } }))
                }
              />
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
                  propertySize={formData.propertySize}
                  onPropertySizeChange={(size: number) => {
                    setFormData(prev => ({
                      ...prev,
                      propertySize: size
                    }));
                  }}
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
                <IndependentPropertyFeatures
                  propertyFeatures={formData.propertyDetails}
                  onFeaturesChange={(features) =>
                    setFormData(prev => ({
                      ...prev,
                      propertyDetails: {
                        ...prev.propertyDetails,
                        ...features
                      }
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <Restrictions
              res={formData.restrictions}
              onRestrictionsChange={(restrictions: {
                foodPreference: string;
                petsAllowed: string;
                tenantType: string;
              }) => setFormData(prev => ({
                ...prev,
                restrictions
              }))}
            />
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
                    amenities={formData.flatAmenities}
                    onAmenitiesChange={(amenities) =>
                      setFormData((prev) => ({
                        ...prev,
                        flatAmenities: {
                          ...prev.flatAmenities,
                          ...amenities
                        }
                      }))
                    }
                  />

                  <SocietyAmenities
                    amenities={formData.societyAmenities}
                    onChange={(updatedAmenities) => setFormData((prev) => ({
                      ...prev,
                      societyAmenities: {
                        ...prev.societyAmenities,
                        ...updatedAmenities
                      }
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <IndianRupee className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <div className="space-y-8">
            <LeaseAmount
              onLeaseAmountChange={(amount) => setFormData(prev => ({
                ...prev,
                leaseTerms: {
                  ...prev.leaseTerms,
                  leaseDetails: {
                    ...prev.leaseTerms.leaseDetails,
                    leaseAmount: {
                      amount: amount.amount || 0,
                      type: amount.type || 'fixed',
                      duration: amount.duration || 0,
                      durationUnit: amount.durationUnit || 'years'
                    },
                  }
                }
              }))}
            />
            <LeaseTenure
              onLeaseTenureChange={(tenure) => setFormData(prev => ({
                ...prev,
                leaseTerms: {
                  ...prev.leaseTerms,
                  leaseDetails: {
                    ...prev.leaseTerms.leaseDetails,
                  },
                  tenureDetails: {
                    minimumTenure: Number(tenure.minimumTenure) || 0,
                    minimumUnit: tenure.minimumUnit || 'years',
                    maximumTenure: Number(tenure.maximumTenure) || 0,
                    maximumUnit: tenure.maximumUnit || 'years',
                    lockInPeriod: Number(tenure.lockInPeriod) || 0,
                    lockInUnit: tenure.lockInUnit || 'years',
                    noticePeriod: Number(tenure.noticePeriod) || 0,
                    noticePeriodUnit: tenure.noticePeriodUnit || 'months'
                  }
                }
              }))}
            />
            <MaintenanceAmount
              maintenanceAmount={formData.leaseTerms.maintenanceAmount}
              onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({
                ...prev,
                leaseTerms: {
                  ...prev.leaseTerms,
                  maintenanceAmount: {
                    amount: Number(maintenance.amount) || 0,
                    frequency: maintenance.frequency || 'monthly'
                  }
                }
              }))}
            />
            <OtherCharges
              otherCharges={formData.leaseTerms.otherCharges}
              onOtherChargesChange={(charges) => setFormData(prev => ({
                ...prev,
                leaseTerms: {
                  ...prev.leaseTerms,
                  otherCharges: {
                    water: { type: charges.water.type, amount: charges.water.amount },
                    electricity: { type: charges.electricity.type, amount: charges.electricity.amount },
                    gas: { type: charges.gas.type, amount: charges.gas.amount },
                    others: { type: charges.others.type, amount: charges.others.amount }
                  }
                }
              }))}
            />
            <Brokerage
              bro={formData.leaseTerms.brokerage}
              onBrokerageChange={(brokerage) => setFormData(prev => ({
                ...prev,
                leaseTerms: {
                  ...prev.leaseTerms,
                  brokerage: {
                    required: brokerage.required as 'yes' | 'no',
                    amount: Number(brokerage.amount) || 0
                  }
                }
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <AvailabilityDate
                availability={{
                  type: formData.availability.type === "immediate" ? "immediate" : "specific",
                  date: formData.availability.date
                }}
                onAvailabilityChange={handleAvailabilityChange}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-6 h-6" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Image className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Media</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
              <ResidentialPropertyMediaUpload
                propertyType="independenthouse"
                propertyId={propertyId}
                value={formData.media}
                onChange={(media) => setFormData(prev => ({ ...prev, media }))}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < formSections.length) {
      setCurrentStep(currentStep + 1);
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

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log(formData)

    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

        // Convert media files to base64
        const convertFileToBase64 = (file: File): Promise<string> => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
          });
        };

        // Helper function to convert array of files to base64
        const convertFilesToBase64 = async (files: (File | string)[]): Promise<string[]> => {
          const results: string[] = [];
          for (const file of files) {
            if (file instanceof File) {
              const base64 = await convertFileToBase64(file);
              results.push(base64);
            } else {
              results.push(file); // Already a string (URL)
            }
          }
          return results;
        };

        const convertedMedia = {
          photos: {
            exterior: await convertFilesToBase64(formData.media.photos.exterior),
            interior: await convertFilesToBase64(formData.media.photos.interior),
            floorPlan: await convertFilesToBase64(formData.media.photos.floorPlan),
            washrooms: await convertFilesToBase64(formData.media.photos.washrooms),
            lifts: await convertFilesToBase64(formData.media.photos.lifts),
            emergencyExits: await convertFilesToBase64(formData.media.photos.emergencyExits),
            bedrooms: await convertFilesToBase64(formData.media.photos.bedrooms),
            halls: await convertFilesToBase64(formData.media.photos.halls),
            storerooms: await convertFilesToBase64(formData.media.photos.storerooms),
            kitchen: await convertFilesToBase64(formData.media.photos.kitchen)
          },
          videoTour: formData.media.videoTour
            ? (formData.media.videoTour instanceof File
              ? await convertFileToBase64(formData.media.videoTour)
              : formData.media.videoTour)
            : undefined,
          documents: await convertFilesToBase64(formData.media.documents)
        };

        const transformedData = {
          ...formData,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date(),
            propertyType: "Residential",
            propertyName: "Independent House",
            intent: "Lease",
            status: "Available"
          }
        };

        const response = await axios.post('/api/residential/lease/independenthouse', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          // Set the propertyId from the response
          setPropertyId(response.data.propertyId);
          toast.success('Property listing created successfully!');
          setFormData({...initialFormData} as FormData);
        } else {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create Independent house listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={formRef} className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* <style>{customStyles}</style> */}
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    if (index < currentStep) {
                      setCurrentStep(index);
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
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index <= currentStep
                      ? 'text-black'
                      : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {section.title}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className={`w-12 h-1 transition-colors duration-200 ${index < currentStep ? 'bg-black' : 'bg-gray-200'
                        }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your independent house property</p>
        </div>
        <div className="space-y-8">{formSections[currentStep].component}</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          {currentStep > 0 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg border border-black/20 bg-white text-black transition-all duration-200"
              onClick={handlePrevious}
              disabled={isSubmitting}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < formSections.length - 1 ? (
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
              onClick={currentStep === formSections.length - 1 ? handleSubmit : handleNext}
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Submitting...
                </>
              ) : (
                <>
                  {currentStep === formSections.length - 1 ? 'Submit' : 'Next'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaseIndependentHouse;
