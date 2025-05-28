"use client"

import React, { useState, useRef, useCallback } from "react"
import { Building2, MapPin, IndianRupee, Calendar, Image, Home, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import PropertyName from "../PropertyName"
import PropertyAddress from "../PropertyAddress"
import PropertySize from "../PropertySize"
import Restrictions from "../Restrictions"
import PropertyFeatures from "../PropertyFeatures"
import LeaseAmount from "../lease/LeaseAmount"
import LeaseTenure from "../lease/LeaseTenure"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import Brokerage from "../residentialrent/Brokerage"
import AvailabilityDate from "../AvailabilityDate"
import OtherCharges from "../residentialrent/OtherCharges"
import ResidentialPropertyMediaUpload from "../ResidentialPropertyMediaUpload"
import FlatAmenities from "../FlatAmenities"
import SocietyAmenities from "../SocietyAmenities"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { uploadResidentialMediaToS3 } from "../../../utils/residentialMediaUploader"

interface Location {
  latitude: string;
  longitude: string;
}

interface Address {
  flatNo: number;
  showFlatNo: boolean;
  floor: number;
  apartmentName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  location: Location;
}

interface BasicInformation {
  propertyName: string;
  address: Address;
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
  totalFloors: number;
  propertyOnFloor: number;
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

interface Restrictions {
  foodPreference: string;
  petsAllowed: string;
  tenantType: string;
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

interface MediaUploadResult {
  photos: Record<string, string[]>;
  videoTour?: string;
  documents: string[];
}

interface FormData {
  basicInformation: BasicInformation;
  propertySize: number;
  propertyDetails: PropertyDetails;
  restrictions: Restrictions;
  flatAmenities: FlatAmenities;
  societyAmenities: SocietyAmenities;
  leaseTerms: LeaseTerms;
  availability: Availability;
  media: Media;
  metadata?: {
    createdBy: string;
    createdAt: string;
  };
}

const LeaseApartment: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error] = useState<string | null>(null);
  const [success] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<string | undefined>(undefined);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const initialFormData: FormData = {
    basicInformation: {
      propertyName: "",
      address: {
        flatNo: 0,
        showFlatNo: true,
        floor: 0,
        apartmentName: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
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
      totalFloors: 0,
      propertyOnFloor: 0,
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
    }
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleAddressChange = useCallback((newAddress: Address) => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        address: {
          ...prev.basicInformation.address,
          ...newAddress,
          location: {
            ...prev.basicInformation.address.location,
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

  // Function to update map location based on latitude and longitude

  const formSections = [
    {
      title: "Basic Information",
      icon: <Home className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
            <div className="space-y-8">
            <PropertyName
            propertyName={formData.basicInformation.propertyName}
            onPropertyNameChange={(name: string) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, propertyName: name } }))}
          />
              </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <PropertyAddress
                // latitude={formData.basicInformation.address.location.latitude}
                // longitude={formData.basicInformation.address.location.longitude}
                address={{
                  ...formData.basicInformation.address,
                  location: {
                    latitude: formData.basicInformation.address.location.latitude,
                    longitude: formData.basicInformation.address.location.longitude
                  }
                }}
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
      content: (
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
              <PropertyFeatures
                onFeaturesChange={(features: Record<string, any>) => {
                  setFormData(prev => ({
                    ...prev,
                    propertyDetails: {
                      ...prev.propertyDetails,
                      ...features
                    }
                  }))
                }}
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
                      societyAmenities: updatedAmenities
                    }))}
                  />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <IndianRupee className="w-6 h-6" />,
      content: (
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
                  // leaseDuration: tenure.leaseDuration || '',
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
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      content: (
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
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Image className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Media</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <ResidentialPropertyMediaUpload
                  propertyType="apartment"
                  propertyId={propertyId}
                  value={formData.media}
                  onChange={(media) => setFormData(prev => ({ ...prev, media }))}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
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
    console.log("Final formData before submit", formData);

    try {
      const user = sessionStorage.getItem("user");
      if (!user) {
        navigate("/login");
        return;
      }

      const author = JSON.parse(user).id;

      // Process media items to ensure we only send URLs to the backend
      const processMediaForSubmission = (media: Media) => {
        return {
          photos: {
            exterior: media.photos.exterior.filter(item => typeof item === 'string') as string[],
            interior: media.photos.interior.filter(item => typeof item === 'string') as string[],
            floorPlan: media.photos.floorPlan.filter(item => typeof item === 'string') as string[],
            washrooms: media.photos.washrooms.filter(item => typeof item === 'string') as string[],
            lifts: media.photos.lifts.filter(item => typeof item === 'string') as string[],
            emergencyExits: media.photos.emergencyExits.filter(item => typeof item === 'string') as string[],
            bedrooms: media.photos.bedrooms.filter(item => typeof item === 'string') as string[],
            halls: media.photos.halls.filter(item => typeof item === 'string') as string[],
            storerooms: media.photos.storerooms.filter(item => typeof item === 'string') as string[],
            kitchen: media.photos.kitchen.filter(item => typeof item === 'string') as string[]
          },
          videoTour: typeof media.videoTour === 'string' ? media.videoTour : undefined,
          documents: media.documents.filter(doc => typeof doc === 'string') as string[]
        };
      };

      // First check if there are any new files to upload
      const hasNewFiles = Object.values(formData.media.photos).some(files => 
        files.some(file => file instanceof File)
      ) || formData.media.videoTour instanceof File || 
      formData.media.documents.some(file => file instanceof File);

      let uploadedMedia;
      if (hasNewFiles) {
        setUploadingMedia(true);
        toast.loading('Uploading media files...', { toastId: 'mediaUpload' });

        const mediaItems: { id: string; type: "photo" | "video" | "document"; file: File; category: string; }[] = [];

        // Process photos
        for (const [category, files] of Object.entries(formData.media.photos)) {
          for (const file of files) {
            if (file instanceof File) {
              mediaItems.push({
                id: crypto.randomUUID(),
                type: "photo",
                file,
                category
              });
            }
          }
        }

        // Process video tour
        if (formData.media.videoTour instanceof File) {
          mediaItems.push({
            id: crypto.randomUUID(),
            type: "video",
            file: formData.media.videoTour,
            category: "videoTour"
          });
        }

        // Process documents
        for (const file of formData.media.documents) {
          if (file instanceof File) {
            mediaItems.push({
              id: crypto.randomUUID(),
              type: "document",
              file,
              category: "documents"
            });
          }
        }

        try {
          const uploadedItems = await uploadResidentialMediaToS3('apartment', mediaItems, propertyId);
          
          // Transform uploaded items into the expected format
          uploadedMedia = {
            photos: {
              exterior: formData.media.photos.exterior.filter(item => typeof item === 'string') as string[],
              interior: formData.media.photos.interior.filter(item => typeof item === 'string') as string[],
              floorPlan: formData.media.photos.floorPlan.filter(item => typeof item === 'string') as string[],
              washrooms: formData.media.photos.washrooms.filter(item => typeof item === 'string') as string[],
              lifts: formData.media.photos.lifts.filter(item => typeof item === 'string') as string[],
              emergencyExits: formData.media.photos.emergencyExits.filter(item => typeof item === 'string') as string[],
              bedrooms: formData.media.photos.bedrooms.filter(item => typeof item === 'string') as string[],
              halls: formData.media.photos.halls.filter(item => typeof item === 'string') as string[],
              storerooms: formData.media.photos.storerooms.filter(item => typeof item === 'string') as string[],
              kitchen: formData.media.photos.kitchen.filter(item => typeof item === 'string') as string[]
            },
            videoTour: undefined,
            documents: formData.media.documents.filter(doc => typeof doc === 'string') as string[]
          };

          // Add newly uploaded items to the media object
          uploadedItems.forEach(item => {
            if (item.type === 'photo' && item.category) {
              uploadedMedia!.photos[item.category].push(item.url);
            } else if (item.type === 'video') {
              uploadedMedia!.videoTour = item.url;
            } else if (item.type === 'document') {
              uploadedMedia!.documents.push(item.url);
            }
          });

          toast.dismiss('mediaUpload');
          toast.success('Media files uploaded successfully');
        } catch (error: any) {
          console.error('Error uploading media:', error);
          toast.dismiss('mediaUpload');
          toast.error(`Failed to upload media: ${error.message}`);
          setIsSubmitting(false);
          setUploadingMedia(false);
          return;
        }
        setUploadingMedia(false);
      }

      // Show form submission toast
      toast.loading('Creating property listing...', { toastId: 'formSubmit' });

      const transformedData = {
        ...formData,
        media: uploadedMedia || processMediaForSubmission(formData.media),
        metadata: {
          createdBy: author,
          createdAt: new Date().toISOString()
        }
      };

      // Log the data being sent to the backend
      console.log('Data being sent to backend:', JSON.stringify(transformedData, null, 2));

      // Create axios instance with custom config
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000',
        timeout: 60000, // Increase timeout to 60 seconds
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      // Log request details for debugging
      console.log('Request URL:', '/api/residential/lease/apartment');
      console.log('Request headers:', axiosInstance.defaults.headers);

      const response = await axiosInstance.post("/api/residential/lease/apartment", transformedData).catch((error) => {
        console.error('Full error object:', error);
        console.error('Error response data:', error.response?.data);
        console.error('Error status:', error.response?.status);

        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timed out. The server is taking too long to respond. Please try again.');
        }
        if (!error.response) {
          throw new Error('Network error. Please check if the backend server is running at http://localhost:8000');
        }
        if (error.response.status === 400) {
          const validationErrors = error.response.data.details;
          const errorMessage = Object.values(validationErrors).join(', ');
          throw new Error(`Validation failed: ${errorMessage}`);
        }
        throw error;
      });

      if (response.data.success) {
        setPropertyId(response.data.propertyId);
        toast.dismiss('formSubmit');
        toast.success('Property listing created successfully!');
        setFormData(initialFormData);
        navigate('/dashboard');
      } else {
        throw new Error(response.data.message || 'Failed to create listing');
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.dismiss('formSubmit');
      
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           error.response.data?.details || 
                           "Server error. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server. Please check if the backend server is running at http://localhost:8000");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(error.message || "Failed to create apartment listing. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      setUploadingMedia(false);
    }
  };

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setCurrentStep(index);
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
                  }}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index <= currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index <= currentStep ? 'text-black' : 'text-gray-500 group-hover:text-gray-700'
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

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">List Your Apartment</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep].content}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          <button
            onClick={() => currentStep === formSections.length - 1 ? handleSubmit() : handleNext()}
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
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
          {success}
        </div>
      )}
    </div>
  );
};

export default LeaseApartment;