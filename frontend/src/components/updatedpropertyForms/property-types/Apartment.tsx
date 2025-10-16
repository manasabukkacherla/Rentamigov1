"use client"

import { useState, useCallback, useRef } from "react"
import { Building2, MapPin, IndianRupee, Calendar, Image, Ruler, Home, Store, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import PropertyName from "../PropertyName"
import PropertyAddress from "../PropertyAddress"
import MapSelector from "../MapSelector"
import PropertySize from "../PropertySize"
import PropertyFeatures from "../PropertyFeatures"
import FlatAmenities from "../FlatAmenities"
import SocietyAmenities from "../SocietyAmenities"
import PropertyMediaUpload from "../PropertyMediaUpload"
import AvailabilityDate from "../AvailabilityDate"
import Restrictions from "../Restrictions"
import FinalSteps from "../FinalSteps"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import ResidentialPropertyMediaUpload from '../ResidentialPropertyMediaUpload'
import Brokerage from "../residentialrent/Brokerage"
import Rent from "../residentialrent/Rent"
import SecurityDeposit from "../residentialrent/SecurityDeposit"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import OtherCharges from "../residentialrent/OtherCharges"
import RentDetails from "@/components/fullpages/Rent_monthly"

interface Address {
  flatNo: number;
  showFlatNo: boolean;
  floor: number;
  apartmentName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  location: {
    latitude: string;
    longitude: string;
  };
}

interface IBasicInformation {
  title: string;
  address: {
    flatNo: number;
    showFlatNo: boolean;
    floor: number;
    apartmentName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    location: {
      latitude: string;
      longitude: string;
    };
  };
}

interface PropertyDetails {
  bedrooms: number;
  washrooms: number;
  balconies: number;
  hasParking: boolean;
  parkingDetails: {
    twoWheeler: number;
    fourWheeler: number;
  };
  extraRooms: {
    servant: boolean;
    puja: boolean;
    store: boolean;
    others: boolean;
  };
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
  waterAvailability: {
    borewell: boolean;
    governmentSupply: boolean;
    tankerSupply: boolean;
  };
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

interface RentalTerms {
  rentDetails: {
    expectedRent: number;
    isNegotiable: boolean;
    rentType: string;
  };
  securityDeposit: {
    amount: number;
  };
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  otherCharges: {
    water: {
      amount: number;
      type: string;
    };
    electricity: {
      amount: number;
      type: string;
    };
    gas: {
      amount: number;
      type: string;
    };
    others: {
      amount: number;
      type: string;
    };
  };
  brokerage: {
    required: string;
    amount?: number;
  };
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

interface IMetadata {
  createdBy: string;
  createdAt: Date;
  propertyType: 'Residential';
  propertyName: 'Apartment';
  intent: 'Rent';
  status: 'Available' | 'Rented' | 'Under Maintenance';
}

interface IMedia {
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
  videoTour?: File | string;
  documents: (File | string)[];
}

interface PropertySize {
  superBuiltUpAreaSqft: number;
  superBuiltUpAreaSqmt: number;
  builtUpAreaSqft: number;
  builtUpAreaSqmt: number;
  carpetAreaSqft: number;
  carpetAreaSqmt: number;
}

interface Restrictions {
  foodPreference: string;
  petsAllowed: string;
  tenantType: string;
}

interface FormData {
  basicInformation: IBasicInformation;
  propertySize: number;
  propertyDetails: PropertyDetails;
  restrictions: Restrictions;
  flatAmenities: FlatAmenities;
  societyAmenities: SocietyAmenities;
  rentalTerms: {
    rentDetails: {
      expectedRent: number,
      isNegotiable: boolean,
      rentType: string
    },
    securityDeposit: {
      amount: number
    },
    maintenanceAmount: {
      amount: number,
      frequency: string
    },
    otherCharges: {
      water: {
        amount: number,
        type: string
      },
      electricity: {
        amount: number,
        type: string
      },
      gas: {
        amount: number,
        type: string
      },
      others: {
        amount: number,
        type: string
      }
    },
    brokerage: {
      required: string,
      amount?: number
    },
  };
  availability: {
    type: "immediate" | "specific";
    date: string;
  };
  media: IMedia;
  metadata: IMetadata;
};

const Apartment = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [propertyId, setPropertyId] = useState<string | undefined>(undefined)
  const formRef = useRef<HTMLDivElement>(null)

  const initialFormData = {
    basicInformation: {
      title: "",
      address: {
        flatNo: 0,
        showFlatNo: false,
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
    rentalTerms:{
      rentDetails: {
        expectedRent: 0,
        isNegotiable: false,
        rentType: "inclusive",
      },
      securityDeposit: {
        amount: 0,
      },
      maintenanceAmount: {
        amount: 0,
        frequency: "monthly",
      },
      otherCharges: {
        water: {
          amount: 0,
          type: "inclusive",
        },
        electricity: {
          amount: 0,
          type: "inclusive",
        },
        gas: {
          amount: 0,
          type: "inclusive",
        },
        others: {
          amount: 0,
          type: "inclusive",
        },
      },
      brokerage: {
        required: "no",
        amount: 0,
      },
    },
    
    availability: {
      type: "immediate",
      date: "",
    },
    media: {
      photos: {
        exterior: [] as (File | string)[],
        interior: [] as (File | string)[],
        floorPlan: [] as (File | string)[],
        washrooms: [] as (File | string)[],
        lifts: [] as (File | string)[],
        emergencyExits: [] as (File | string)[],
        bedrooms: [] as (File | string)[],
        halls: [] as (File | string)[],
        storerooms: [] as (File | string)[],
        kitchen: [] as (File | string)[]
      },
      videoTour: undefined as (File | string | undefined),
      documents: [] as (File | string)[]
    },
    metadata: {
      createdBy: "",
      createdAt: new Date(),
      propertyType: 'Residential',
      propertyName: 'Appartment',
      intent: 'Rent',
      status: 'Available'
    },
  }
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: "",
      address: {
        flatNo: 0,
        showFlatNo: false,
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
    rentalTerms: {
      rentDetails: {
        expectedRent: 0,
        isNegotiable: false,
        rentType: "inclusive"
      },
      securityDeposit: {
        amount: 0

      },
      maintenanceAmount: {
        amount: 0,
        frequency: "monthly"
      },
      otherCharges:{
        water:{
          amount:0,
          type:"inclusive"
        },
        electricity:{
          amount:0,
          type:"inclusive"
        },
        gas:{
          amount:0,
          type:"inclusive"
        },
        others:{
          amount:0,
          type:"inclusive"
        }
      },
      brokerage: {
        required: "no",
        amount: 0
      }
    },
    availability: {
      type: "immediate",
      date: "",
    },
    media: {
      photos: {
        exterior: [] as (File | string)[],
        interior: [] as (File | string)[],
        floorPlan: [] as (File | string)[],
        washrooms: [] as (File | string)[],
        lifts: [] as (File | string)[],
        emergencyExits: [] as (File | string)[],
        bedrooms: [] as (File | string)[],
        halls: [] as (File | string)[],
        storerooms: [] as (File | string)[],
        kitchen: [] as (File | string)[]
      },
      videoTour: undefined as (File | string | undefined),
      documents: [] as (File | string)[]
    },
    metadata: {
      createdBy: '',
      createdAt: new Date(),
      propertyType: 'Residential',
      propertyName: 'Apartment',
      intent: 'Rent',
      status: 'Available'
    }
  })

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


  const handleLocationSelect = useCallback((lat: string, lng: string, address?: any) => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        address: {
          ...prev.basicInformation.address,
          street: address?.address || prev.basicInformation.address.street,
          city: address?.city || prev.basicInformation.address.city,
          state: address?.state || prev.basicInformation.address.state,
          zipCode: address?.pinCode || prev.basicInformation.address.zipCode,
          location: {
            latitude: lat,
            longitude: lng
          },
        }
      }
    }))
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
      icon: <Store className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
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

              <PropertyAddress
                address={formData.basicInformation.address}
                onAddressChange={(newAddress) =>
                  setFormData((prev) => ({
                    ...prev,
                    basicInformation: {
                      ...prev.basicInformation,
                      address: newAddress
                    }
                  }))
                }
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Size</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
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

          <div className="space-y-6">
            <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
              <div className="space-y-8">
                <div className="flex items-center mb-8">
                  <Building2 className="text-black mr-3" size={28} />
                  <h3 className="text-2xl font-semibold text-black">Amenities</h3>
                </div>

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
                      societyAmenities: updatedAmenities
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
      title: "Rental Terms",
      icon: <IndianRupee className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="space-y-8">

            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <Rent
                rentDetails={formData.rentalTerms.rentDetails}
                onRentChange={(rent) => setFormData(prev => ({
                  ...prev,
                  rentalTerms: {
                    ...prev.rentalTerms,
                    rentDetails: {
                      expectedRent: rent.expectedRent,
                      isNegotiable: rent.isNegotiable,
                      rentType: rent.rentType,
                    },
                  },
                }))}
              />
            </div>
          </div>

          <div className="space-y-8">

            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
            <SecurityDeposit
                deposit={formData.rentalTerms.securityDeposit}
                onSecurityDepositChange={(deposit) => setFormData(prev => ({
                  ...prev,
                  rentalTerms: {
                    ...prev.rentalTerms,
                    securityDeposit: deposit
                  }
                }))}
              />
            </div>
          </div>

          <div className="space-y-8">

            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <MaintenanceAmount
                maintenanceAmount={formData.rentalTerms.maintenanceAmount}
                onMaintenanceAmountChange={(maintenance) => setFormData({ ...formData, rentalTerms: { ...formData.rentalTerms, maintenanceAmount: maintenance } })} />
            </div>
          </div>

          <div className="space-y-8">

            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <OtherCharges
                otherCharges={formData.rentalTerms.otherCharges}
                onOtherChargesChange={(charges) => setFormData(prev => ({
                  ...prev,
                  rentalTerms: { ...prev.rentalTerms, otherCharges: charges }
                }))}
              />

            </div>
          </div>

          <div className="space-y-8">

            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
            <Brokerage
                bro={formData.rentalTerms.brokerage}
                onBrokerageChange={(brokerage) => setFormData(prev => ({
                  ...prev,
                  rentalTerms: { ...prev.rentalTerms, brokerage: brokerage }
                }))}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
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
      title: "Media",
      icon: <Image className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-8">
            <ResidentialPropertyMediaUpload
              propertyType="apartment"
              propertyId={propertyId}
              value={formData.media}
              onChange={(media) => setFormData(prev => ({ ...prev, media }))}
            />
          </div>
        </div>
      ),
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false)
  // const navigate = useNavigate()

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

  const navigate = useNavigate()
  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log("Final formData before submit", formData);

    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

        // Process media items to ensure we only send URLs to the backend
        const processMediaForSubmission = (media: IMedia) => {
          // Debug the incoming media object
          console.log('Processing media for submission:', {
            hasVideoTour: !!media.videoTour,
            videoTourType: media.videoTour ? typeof media.videoTour : 'undefined',
            videoTourValue: media.videoTour
          });
          
          // Ensure videoTour is properly extracted from media object
          const videoTourUrl = media.videoTour && typeof media.videoTour === 'string' ? media.videoTour : undefined;
          
          // Log the videoTour URL for debugging
          console.log('VideoTour URL for submission:', videoTourUrl);
          
          const processedMedia = {
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
            videoTour: videoTourUrl,
            documents: media.documents.filter(doc => typeof doc === 'string') as string[]
          };
          
          // Final check of processed media
          console.log('Final processed media for backend:', {
            hasVideoTour: !!processedMedia.videoTour,
            videoTourValue: processedMedia.videoTour,
            photoCategories: Object.keys(processedMedia.photos),
            documentCount: processedMedia.documents.length
          });
          
          return processedMedia;
        };

        const transformedData = {
          ...formData,
          media: processMediaForSubmission(formData.media),
          metadata: {
            createdBy: author,
            createdAt: new Date(),
            propertyType: 'Residential',
            propertyName: 'Appartment',
            intent: 'Rent',
            status: 'Available'
          }
        };

        const response = await axios.post('/api/residential/rent/apartment', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          // Set the propertyId from the response
          setPropertyId(response.data.propertyId);
          toast.success('Property listing created successfully!');
          setFormData({...initialFormData as FormData});
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create apartment listing. Please try again.');
    } finally {
      setIsSubmitting(false);
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
                    setCurrentStep(index + 1);
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
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index + 1 <= currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index + 1 <= currentStep ? 'text-black' : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {section.title}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className={`w-12 h-1 transition-colors duration-200 ${index < currentStep - 1 ? 'bg-black' : 'bg-gray-200'
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
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep - 1].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep - 1].content}
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
            onClick={() => currentStep === formSections.length ? handleSubmit() : handleNext()}
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
                {currentStep === formSections.length ? 'Submit' : 'Next'}
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

export default Apartment;
