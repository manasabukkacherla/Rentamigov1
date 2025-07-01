"use client"

import React, { useState, useRef ,useCallback} from "react"
import { Building2, MapPin, IndianRupee, Calendar, Image, Ruler, Home, ChevronLeft, ChevronRight, Locate, Navigation, Loader2 } from "lucide-react"
import PropertyName from "../PropertyName"
import PropertyAddress from "../PropertyAddress"
import MapCoordinates from "../MapCoordinates"
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
import { v4 as uuidv4 } from 'uuid'
import { uploadResidentialMediaToS3 } from '../../../utils/residentialMediaUploader'

interface LeaseBuilderFloorProps {
  propertyId?: string;
  onSubmit?: (formData: FormData) => void;
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
  location: {
    latitude: string;
    longitude: string;
  };
}

interface IBasicInformation {
  title: string;

  floorNumber: number;
  totalFloors: number;
  propertyId?: string;
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
      locationLabel: string;
    };
  };
}

interface IPropertyDetails {
  propertysize: number;
  bedrooms: number;
  washrooms: number;
  bathrooms: number;
  balconies: number;
  parkingdetails: string;
  ExtraRooms: string[];
  utility: string;
  Furnishingstatus: string;
  totalfloors: number;
  floorNumber: number;
  propertyfacing: string;
  propertyage: string;
  superareasqft: number;
  superareasqmt: number;
  builtupareasqft: number;
  builtupareasqmt: number;
  carpetareasqft: number;
  carpetareasqmt: number;
  electricityavailability: string;
  wateravailability: string[];
  servantRoom: boolean;
  studyRoom: boolean;
  pooja: boolean;
}

interface IAvailableItems {
  availableitems: string[];
  securityandsafety: string[];
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

interface IFloorAmenities {
  lights: number;
  geysers: number;
  lofts: number;
  clothHanger: number;
  cotWithMattress: number;
  airConditioner: number;
  exhaustFan: number;
  ceilingFan: number;
  wardrobes: number;
  kitchenCabinets: number;
  diningTableWithChairs: number;
  sideTable: number;
  desertCooler: number;
}

interface ILeaseDetails {
  monthlyRent: number;
  securityDeposit: number;
  maintenanceCharges: {
    amount: number;
    type: string;
  };
  leaseDuration: {
    minimumDuration: number;
    maximumDuration: number;
    durationUnit: string;
  };
  rentNegotiable: boolean;
  additionalCharges: {
    waterCharges: {
      type: string;
      amount: number;
    };
    electricityCharges: {
      type: string;
      amount: number;
    };
    gasCharges: {
      type: string;
      amount: number;
    };
    otherCharges: {
      type: string;
      amount: number;
    };
  };
  brokerage: {
    type: string;
    amount: number;
  };
}

interface IAvailability {
  type: "immediate" | "specific";
  date?: string;
}

interface IMedia {
  photos: {
    exterior: (File | string)[];
    interior: (File | string)[];
    floorPlan: (File | string)[];
    washrooms: (File | string)[];
    bedrooms: (File | string)[];
    halls: (File | string)[];
    storerooms: (File | string)[];
    kitchen: (File | string)[];
    servantRoom: (File | string)[];
    studyRoom: (File | string)[];
    pooja: (File | string)[];
    lifts: (File | string)[];
    emergencyExits: (File | string)[];
  };
  mediaItems: {
    id: string;
    type: string;
    url: string;
    title: string;
    tags: string[];
    roomType: string;
    category: string;
  }[];
  videoTour: File | string;
  documents: (File | string)[];
}

interface IMetadata {
  createdBy: string;
  createdAt: Date;
  propertyType: 'Residential';
  propertyName: 'Builder Floor';
  intent: 'Lease';
  status: 'Available' | 'Rented' | 'Under Maintenance';
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
}

interface ApiError {
  status: number;
  message: string;
  errors?: ValidationError[];
}

interface FormData {
  basicInformation: {
    title: string;
    floorNumber: number;
    totalFloors: number;
    address: Address;
    propertyId?: string;
  };
  propertyDetails: {
    propertysize: number;
    bedrooms: number;
    washrooms: number;
    bathrooms: number;
    balconies: number;
    parkingdetails: string;
    ExtraRooms: string[];
    utility: string;
    Furnishingstatus: string;
    totalfloors: number;
    floorNumber: number;
    propertyfacing: string;
    propertyage: string;
    superareasqft: number;
    superareasqmt: number;
    builtupareasqft: number;
    builtupareasqmt: number;
    carpetareasqft: number;
    carpetareasqmt: number;
    electricityavailability: string;
    wateravailability: string[];
    servantRoom: boolean;
    studyRoom: boolean;
    pooja: boolean;
  };
  availableitems: {
    availableitems: string[];
    securityandsafety: string[];
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
  };
  floorAmenities: {
    lights: number;
    geysers: number;
    lofts: number;
    clothHanger: number;
    cotWithMattress: number;
    airConditioner: number;
    exhaustFan: number;
    ceilingFan: number;
    wardrobes: number;
    kitchenCabinets: number;
    diningTableWithChairs: number;
    sideTable: number;
    desertCooler: number;
  };
  leaseDetails: {
    monthlyRent: number;
    securityDeposit: number;
    maintenanceCharges: {
      amount: number;
      type: string;
    };
    leaseDuration: {
      minimumDuration: number;
      maximumDuration: number;
      durationUnit: string;
    };
    rentNegotiable: boolean;
    additionalCharges: {
      waterCharges: {
        type: string;
        amount: number;
      };
      electricityCharges: {
        type: string;
        amount: number;
      };
      gasCharges: {
        type: string;
        amount: number;
      };
      otherCharges: {
        type: string;
        amount: number;
      };
    };
    brokerage: {
      type: string;
      amount: number;
    };
  };
  availability: {
    type: "immediate" | "specific";
    date?: string;
  };
  media: {
    photos: {
      exterior: (File | string)[];
      interior: (File | string)[];
      floorPlan: (File | string)[];
      washrooms: (File | string)[];
      bedrooms: (File | string)[];
      halls: (File | string)[];
      storerooms: (File | string)[];
      kitchen: (File | string)[];
      servantRoom: (File | string)[];
      studyRoom: (File | string)[];
      pooja: (File | string)[];
      lifts: (File | string)[];
      emergencyExits: (File | string)[];
    };
    mediaItems: {
      id: string;
      type: string;
      url: string;
      title: string;
      tags: string[];
      roomType: string;
      category: string;
    }[];
    videoTour: File | string;
    documents: (File | string)[];
  };
  metadata: {
    createdBy: string;
    createdAt: Date;
    propertyType: 'Residential';
    propertyName: 'Builder Floor';
    intent: 'Lease';
    status: 'Available' | 'Rented' | 'Under Maintenance';
  };
}

interface PropertyNameProps {
  title: string;
  onTitleChange: (name: string) => void;
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
  amenities: {
    lights: number;
    geysers: number;
    lofts: number;
    clothHanger: number;
    cotWithMattress: number;
    airConditioner: number;
    exhaustFan: number;
    ceilingFan: number;
    wardrobes: number;
    kitchenCabinets: number;
    diningTableWithChairs: number;
    sideTable: number;
    desertCooler: number;
  };
  onAmenitiesChange: (amenities: Partial<FormData['floorAmenities']>) => void;
}

interface SocietyAmenitiesProps {
  amenities: {
    availableitems: string[];
    securityandsafety: string[];
    powerutility: string[];
    parkingtranspotation: string[];
    recreationalsportsfacilities: string[];
    childrenfamilyamenities: string[];
    healthwellnessfacilities: string[];
    shoppingconviencestores: string[];
    ecofriendlysustainable: string[];
    communityculturalspaces: string[];
    smarthometechnology: string[];
  };
  onChange: (amenities: FormData['availableitems']) => void;
}

interface RestrictionsProps {
  res: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  };
  onRestrictionsChange: (restrictions: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  }) => void;
}

interface AvailabilityDateProps {
  availability: {
    availablefrom: string;
    date: string;
  };
  onAvailabilityChange: (availability: {
    availablefrom: string;
    date: string;
  }) => void;
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

interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'document';
  file: File;
  category: string;
  title?: string;
  tags?: string[];
  progress?: UploadProgress;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

interface LeaseAmountProps {
  onLeaseAmountChange: (leaseAmount: Record<string, any>) => void;
}

interface LeaseTenureProps {
  onLeaseTenureChange: (tenure: {
    minimumTenure: number;
    minimumUnit: string;
    maximumTenure: number;
    maximumUnit: string;
    lockInPeriod: number;
    lockInUnit: string;
    noticePeriod: number;
    noticePeriodUnit: string;
  }) => void;
}

interface MaintenanceAmountProps {
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  onMaintenanceAmountChange: (maintenance: {
    amount: number;
    frequency: string;
  }) => void;
}

interface BrokerageProps {
  bro: {
    required: string;
    amount?: number;
  };
  onBrokerageChange: (brokerage: {
    required: string;
    amount?: number;
  }) => void;
}

interface OtherChargesProps {
  otherCharges: {
    water: {
      type: string;
      amount: number;
    };
    electricity: {
      type: string;
      amount: number;
    };
    gas: {
      type: string;
      amount: number;
    };
    others: {
      type: string;
      amount: number;
    };
  };
  onOtherChargesChange: (charges: {
    water: {
      type: string;
      amount: number;
    };
    electricity: {
      type: string;
      amount: number;
    };
    gas: {
      type: string;
      amount: number;
    };
    others: {
      type: string;
      amount: number;
    };
  }) => void;
}

// Add strict validation for lease duration units
type DurationUnit = 'days' | 'months' | 'years';

interface LeaseDuration {
  minimumDuration: number;
  maximumDuration: number;
  durationUnit: DurationUnit;  // More strict typing
}

const LeaseBuilderFloor: React.FC<LeaseBuilderFloorProps> = ({ propertyId: initialPropertyId, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [propertyId, setPropertyId] = useState<string | undefined>(initialPropertyId)
  const formRef = useRef<HTMLDivElement>(null)
  const initialData = {
    basicInformation: {
      title: "",
      floorNumber: 0,
      totalFloors: 0,
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
    propertyDetails: {
      propertysize: 0,
      bedrooms: 0,
      washrooms: 0,
      bathrooms: 0,
      balconies: 0,
      parkingdetails: "",
      ExtraRooms: [],
      utility: "",
      Furnishingstatus: "",
      totalfloors: 0,
      floorNumber: 0,
      propertyfacing: "",
      propertyage: "",
      superareasqft: 0,
      superareasqmt: 0,
      builtupareasqft: 0,
      builtupareasqmt: 0,
      carpetareasqft: 0,
      carpetareasqmt: 0,
      electricityavailability: "",
      wateravailability: [],
      servantRoom: false,
      studyRoom: false,
      pooja: false
    },
    availableitems: {
      availableitems: [],
      securityandsafety: [],
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
    floorAmenities: {
      lights: 0,
      geysers: 0,
      lofts: 0,
      clothHanger: 0,
      cotWithMattress: 0,
      airConditioner: 0,
      exhaustFan: 0,
      ceilingFan: 0,
      wardrobes: 0,
      kitchenCabinets: 0,
      diningTableWithChairs: 0,
      sideTable: 0,
      desertCooler: 0
    },
    leaseDetails: {
      monthlyRent: 0,
      securityDeposit: 0,
      maintenanceCharges: {
        amount: 0,
        type: "monthly"
      },
      leaseDuration: {
        minimumDuration: 0,
        maximumDuration: 0,
        durationUnit: "years"
      },
      rentNegotiable: false,
      additionalCharges: {
        waterCharges: {
          type: "inclusive",
          amount: 0
        },
        electricityCharges: {
          type: "inclusive",
          amount: 0
        },
        gasCharges: {
          type: "inclusive",
          amount: 0
        },
        otherCharges: {
          type: "inclusive",
          amount: 0
        }
      },
      brokerage: {
        type: "no",
        amount: 0
      }
    },
    availability: {
      type: "immediate" as const,
      date: ""
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        bedrooms: [],
        halls: [],
        storerooms: [],
        kitchen: [],
        servantRoom: [],
        studyRoom: [],
        pooja: [],
        lifts: [],
        emergencyExits: []
      },
      mediaItems: [],
      videoTour: "",
      documents: []
    },
    metadata: {
      createdBy: "",
      createdAt: new Date(),
      propertyType: "Residential",
      propertyName: "Builder Floor",
      intent: "Lease",
      status: "Available"
    }
  }
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: "",
      floorNumber: 0,
      totalFloors: 0,
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
          longitude: "",
        }
      }
    },
    propertyDetails: {
      propertysize: 0,
      bedrooms: 0,
      washrooms: 0,
      bathrooms: 0,
      balconies: 0,
      parkingdetails: "",
      ExtraRooms: [],
      utility: "",
      Furnishingstatus: "",
      totalfloors: 0,
      floorNumber: 0,
      propertyfacing: "",
      propertyage: "",
      superareasqft: 0,
      superareasqmt: 0,
      builtupareasqft: 0,
      builtupareasqmt: 0,
      carpetareasqft: 0,
      carpetareasqmt: 0,
      electricityavailability: "",
      wateravailability: [],
      servantRoom: false,
      studyRoom: false,
      pooja: false
    },
    availableitems: {
      availableitems: [],
      securityandsafety: [],
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
    floorAmenities: {
      lights: 0,
      geysers: 0,
      lofts: 0,
      clothHanger: 0,
      cotWithMattress: 0,
      airConditioner: 0,
      exhaustFan: 0,
      ceilingFan: 0,
      wardrobes: 0,
      kitchenCabinets: 0,
      diningTableWithChairs: 0,
      sideTable: 0,
      desertCooler: 0
    },
    leaseDetails: {
      monthlyRent: 0,
      securityDeposit: 0,
      maintenanceCharges: {
        amount: 0,
        type: "monthly"
      },
      leaseDuration: {
        minimumDuration: 0,
        maximumDuration: 0,
        durationUnit: "years"
      },
      rentNegotiable: false,
      additionalCharges: {
        waterCharges: {
          type: "inclusive",
          amount: 0
        },
        electricityCharges: {
          type: "inclusive",
          amount: 0
        },
        gasCharges: {
          type: "inclusive",
          amount: 0
        },
        otherCharges: {
          type: "inclusive",
          amount: 0
        }
      },
      brokerage: {
        type: "no",
        amount: 0
      }
    },
    availability: {
      type: "immediate" as const,
      date: ""
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        bedrooms: [],
        halls: [],
        storerooms: [],
        kitchen: [],
        servantRoom: [],
        studyRoom: [],
        pooja: [],
        lifts: [],
        emergencyExits: []
      },
      mediaItems: [],
      videoTour: "",
      documents: []
    },
    metadata: {
      createdBy: "",
      createdAt: new Date(),
      propertyType: "Residential",
      propertyName: "Builder Floor",
      intent: "Lease",
      status: "Available"
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
            longitude: lng,
            locationLabel: address?.locationLabel || ""
          }
        }
      }
    }));
  }, []);

  const handleLeaseAmountChange = useCallback((leaseAmount: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      leaseDetails: {
        ...prev.leaseDetails,
        monthlyRent: leaseAmount.amount,
        rentNegotiable: leaseAmount.type === 'negotiable',
        leaseDuration: {
          minimumDuration: leaseAmount.duration,
          maximumDuration: prev.leaseDetails.leaseDuration.maximumDuration,
          durationUnit: leaseAmount.durationUnit
        }
      }
    }));
  }, []);

  const handleLeaseTenureChange = useCallback((tenure: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      leaseDetails: {
        ...prev.leaseDetails,
        leaseDuration: {
          minimumDuration: tenure.minimumTenure,
          maximumDuration: tenure.maximumTenure,
          durationUnit: tenure.minimumUnit
        }
      }
    }));
  }, []);

  const handleMaintenanceAmountChange = useCallback((maintenance: {
    amount: number;
    frequency: string;
  }) => {
    setFormData(prev => ({
      ...prev,
      leaseDetails: {
        ...prev.leaseDetails,
        maintenanceCharges: {
          amount: maintenance.amount,
          type: maintenance.frequency
        }
      }
    }));
  }, []);

  const handleBrokerageChange = useCallback((brokerage: {
    required: string;
    amount?: number;
  }) => {
    setFormData(prev => ({
      ...prev,
      leaseDetails: {
        ...prev.leaseDetails,
        brokerage: {
          type: brokerage.required,
          amount: brokerage.amount || 0
        }
      }
    }));
  }, []);

  const handleOtherChargesChange = useCallback((charges: {
    water: {
      type: string;
      amount: number;
    };
    electricity: {
      type: string;
      amount: number;
    };
    gas: {
      type: string;
      amount: number;
    };
    others: {
      type: string;
      amount: number;
    };
  }) => {
    setFormData(prev => ({
      ...prev,
      leaseDetails: {
        ...prev.leaseDetails,
        additionalCharges: {
          waterCharges: charges.water,
          electricityCharges: charges.electricity,
          gasCharges: charges.gas,
          otherCharges: charges.others
        }
      }
    }));
  }, []);

  const handleAvailabilityChange = useCallback((availability: { type: "immediate" | "specific"; date?: string }) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        type: availability.type,
        date: availability.date || ""
      }
    }));
  }, []);

  const updateMapLocation = (lat: string, lng: string) => {
    const iframe = document.getElementById('map-iframe') as HTMLIFrameElement;
    if (iframe && lat && lng) {
      iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${lat},${lng}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`;
    }
  };

  const formSections = [
    {
      title: "Basic Information",
      icon: <Home className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
           
           <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name: string) => setFormData(prev => ({
              ...prev,
              basicInformation: {
                ...prev.basicInformation,
                title: name
              }
            }))}
          />
             

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
                  propertySize={formData.propertyDetails.propertysize}
                  onPropertySizeChange={(size: number) => {
                    setFormData(prev => ({
                      ...prev,
                      propertyDetails: {
                        ...prev.propertyDetails,
                        propertysize: size
                      }
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
              res={{
                foodPreference: "",
                petsAllowed: "",
                tenantType: ""
              }}
              onRestrictionsChange={(restrictions) => {
                setFormData(prev => ({
                  ...prev,
                  propertyDetails: {
                    ...prev.propertyDetails,
                    ExtraRooms: [
                      ...(restrictions.foodPreference ? ['foodPreference'] : []),
                      ...(restrictions.petsAllowed ? ['petsAllowed'] : []),
                      ...(restrictions.tenantType ? ['tenantType'] : [])
                    ]
                  }
                }));
              }}
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
                    amenities={{
                      ...formData.floorAmenities,
                      chimney: false,
                      callingBell: false,
                      pipedGasConnection: false,
                      gasStoveWithCylinder: false,
                      ironingStand: false,
                      bathtub: false,
                      shower: false,
                      sofa: false,
                      coffeeTable: false,
                      tvUnit: false,
                      studyTableWithChair: 0,
                      television: false,
                      washingMachine: false,
                      refrigerator: false,
                      microwaveOven: false,
                      dishwasher: false,
                      waterPurifier: false,
                      inductionCooktop: false,
                      gasStove: false,
                      ironBox: false
                    }}
                    onAmenitiesChange={(amenities) =>
                      setFormData((prev) => ({
                        ...prev,
                        floorAmenities: {
                          ...prev.floorAmenities,
                          ...Object.fromEntries(
                            Object.entries(amenities).map(([key, value]) => [key, Number(value)])
                          )
                        }
                      }))
                    }
                  />

                  <SocietyAmenities
                    amenities={formData.availableitems}
                    onChange={(updatedAmenities) => setFormData((prev) => ({
                      ...prev,
                      availableitems: {
                        ...prev.availableitems,
                        ...updatedAmenities
                      }
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
      component: (
        <div className="space-y-8">
          <LeaseAmount
            onLeaseAmountChange={handleLeaseAmountChange}
          />
          <LeaseTenure
            onLeaseTenureChange={handleLeaseTenureChange}
          />
          <MaintenanceAmount
            maintenanceAmount={{
              amount: formData.leaseDetails.maintenanceCharges.amount,
              frequency: formData.leaseDetails.maintenanceCharges.type
            }}
            onMaintenanceAmountChange={handleMaintenanceAmountChange}
          />
          <OtherCharges
            otherCharges={{
              water: formData.leaseDetails.additionalCharges.waterCharges,
              electricity: formData.leaseDetails.additionalCharges.electricityCharges,
              gas: formData.leaseDetails.additionalCharges.gasCharges,
              others: formData.leaseDetails.additionalCharges.otherCharges
            }}
            onOtherChargesChange={handleOtherChargesChange}
          />
          <Brokerage
            bro={{
              required: formData.leaseDetails.brokerage.type,
              amount: formData.leaseDetails.brokerage.amount
            }}
            onBrokerageChange={handleBrokerageChange}
          />
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
                availability={formData.availability}
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
         <div className="space-y-8">
            <ResidentialPropertyMediaUpload
                propertyType="builderfloor"
                propertyId={propertyId}
                value={formData.media}
                onChange={(media) => setFormData(prev => ({
                  ...prev,
                  media: {
                    ...media,
                    mediaItems: prev.media.mediaItems,
                    photos: {
                      ...media.photos,
                      servantRoom: prev.media.photos.servantRoom,
                      studyRoom: prev.media.photos.studyRoom,
                      pooja: prev.media.photos.pooja
                    },
                    videoTour: media.videoTour || ""
                  }
                }))}
              />
            </div>
      ),
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleNext = () => {
    if (currentStep < formSections.length) {
      setCurrentStep(currentStep + 1);
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
    console.log(formData);

    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        navigate('/login');
        return;
      }

      const author = JSON.parse(user).id;

      // Convert media files to MediaItem format for S3 upload
      const mediaItemsToUpload: MediaItem[] = [];

      // Process photos
      Object.entries(formData.media.photos).forEach(([category, files]) => {
        files.forEach((file: File | string) => {
          if (file instanceof File) {
            mediaItemsToUpload.push({
              id: uuidv4(),
              type: 'photo',
              file,
              category,
              status: 'pending'
            });
          }
        });
      });

      // Process video tour
      if (formData.media.videoTour instanceof File) {
        mediaItemsToUpload.push({
          id: uuidv4(),
          type: 'video',
          file: formData.media.videoTour,
          category: 'videoTour',
          status: 'pending'
        });
      }

      // Process documents
      formData.media.documents.forEach((file: File | string) => {
        if (file instanceof File) {
          mediaItemsToUpload.push({
            id: uuidv4(),
            type: 'document',
            file,
            category: 'documents',
            status: 'pending'
          });
        }
      });

      // Upload media to S3
      let uploadedMediaUrls;
      if (mediaItemsToUpload.length > 0) {
        try {
          uploadedMediaUrls = await uploadResidentialMediaToS3(
            'builderfloor',
            mediaItemsToUpload,
            propertyId
          );

          // Update formData with uploaded URLs
          if (uploadedMediaUrls) {
            const updatedFormData = {
              ...formData,
              media: {
                ...formData.media,
                mediaItems: uploadedMediaUrls.map(item => ({
                  id: item.id,
                  type: item.type,
                  url: item.url,
                  title: item.title || '',
                  tags: item.tags || [],
                  roomType: item.category,
                  category: item.category
                }))
              }
            };

            // Send the updated form data to the backend
            const response = await axios.post('/api/residential/lease/builderfloor', {
              ...updatedFormData,
              metadata: {
                createdBy: author,
                createdAt: new Date(),
                propertyType: "Residential",
                propertyName: "Builder Floor",
                intent: "Lease",
                status: "Available"
              }
            });

            if (response.data.success) {
              // Set the propertyId from the response
              setPropertyId(response.data.data.propertyId);
              toast.success('Property listed successfully!');
              // navigate('/dashboard');
            }
          }
        } catch (error) {
          console.error('Error uploading media:', error);
          toast.error('Failed to upload media files');
        }
      } else {
        // If no media to upload, just send the form data
        const response = await axios.post('/api/residential/lease/builderfloor', {
          ...formData,
          metadata: {
            createdBy: author,
            createdAt: new Date(),
            propertyType: "Residential",
            propertyName: "Builder Floor",
            intent: "Lease",
            status: "Available"
          }
        });

        if (response.data.success) {
          // Set the propertyId from the response
          setPropertyId(response.data.data.propertyId);
          toast.success('Property listed successfully!');
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error creating builder floor listing:', error);
      toast.error('Failed to create builder floor listing');
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
  
        {formSections[currentStep - 1].component}
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

export default LeaseBuilderFloor;
