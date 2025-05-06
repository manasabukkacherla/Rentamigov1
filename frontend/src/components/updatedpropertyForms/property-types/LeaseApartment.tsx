"use client"

import React, { useState, useRef, useCallback } from "react"
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
import MediaUpload from "../MediaUpload"
import FlatAmenities from "../FlatAmenities"
import SocietyAmenities from "../SocietyAmenities"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface LeaseApartmentProps {
  propertyId: string
  onSubmit?: (formData: any) => void
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
  propertyName: string;
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



interface Restrictions {
  foodPreference: string;
  petsAllowed: string;
  tenantType: string;
}





interface ILeaseTerms {
  leaseDetails: {
    amount: number;
    type: string;
    duration: number;
    durationUnit: string;

  };
  tenureDetails: {
    minimumTenure: number;
    minimumUnit: string;
    maximumTenure: number;
    maximumUnit: string;
    lockInPeriod: number;
    lockInUnit: string;
    noticePeriod: number;
    noticePeriodUnit: string;
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
    }
  };
  brokerage: {
    required: string;
    amount?: number;
  };
 
}
interface IMetadata {
  createdBy: string;
  createdAt: string;
}

interface formData {
  basicInformation: IBasicInformation;
  propertySize: number;
  propertyDetails: PropertyDetails;
  restrictions: Restrictions;
  flatAmenities: FlatAmenities;
  societyAmenities: SocietyAmenities;
  leaseTerms:ILeaseTerms;
  availability: {
    type: string;
    date: string;
  };
  media: IMedia;

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


const LeaseApartment  = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const initialData={
    basicInformation: {
      propertyName: "",
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
    leaseTerms:{
      leaseDetails: {
        amount: 0,
        type: 'fixed',
    duration: 0,
    durationUnit: 'years'
      },
      tenureDetails: {
        minimumTenure: 0,
        minimumUnit: "years",
        maximumTenure: 0,
        maximumUnit: "years",
        lockInPeriod: 0,
        lockInUnit: "years",
        noticePeriod: 0,
        noticePeriodUnit: "months",
      },
      maintenanceAmount: {
        amount: 0,
        frequency: "monthly",
      },
      otherCharges: {
        water: { amount: 0, type: "inclusive" },
        electricity: { amount: 0, type: "inclusive" },
        gas: { amount: 0, type: "inclusive" },
        others: { amount: 0, type: "inclusive" },
      },
      brokerage: {
        required: "no",
        amount: 0,
      },
    },
      availability: {
        date: new Date().toISOString(),
        type: "immediate",
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
      videoTour: undefined,
      documents: [],
    },
  }
  const [formData, setFormData] = useState<formData>({
    basicInformation: {
      propertyName: "",
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
    leaseTerms:{
      leaseDetails: {
        amount: 0,
        type: 'fixed',
    duration: 0,
    durationUnit: 'years'
      },
      tenureDetails: {
        minimumTenure: 0,
        minimumUnit: "years",
        maximumTenure: 0,
        maximumUnit: "years",
        lockInPeriod: 0,
        lockInUnit: "years",
        noticePeriod: 0,
        noticePeriodUnit: "months",
      },
      maintenanceAmount: {
        amount: 0,
        frequency: "monthly",
      },
      otherCharges: {
        water: { amount: 0, type: "inclusive" },
        electricity: { amount: 0, type: "inclusive" },
        gas: { amount: 0, type: "inclusive" },
        others: { amount: 0, type: "inclusive" },
      },
      brokerage: {
        required: "no",
        amount: 0,
      },
    },
      availability: {
        date: new Date().toISOString(),
        type: "immediate",
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
      videoTour: undefined,
      documents: [],
    },
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

  // Function to update map location based on latitude and longitude
  const updateMapLocation = (lat: string, lng: string) => {
    const iframe = document.getElementById('map-iframe') as HTMLIFrameElement;
    if (iframe && lat && lng) {
      iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${lat},${lng}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`;
    }
  };

  // // Function to get current location
  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude.toString();
  //         const lng = position.coords.longitude.toString();
          
  //         setFormData(prev => ({
  //           ...prev,
  //           coordinates: {
  //             latitude: lat,
  //             longitude: lng
  //           }
  //         }));
          
  //         updateMapLocation(lat, lng);
          
  //         reverseGeocode(lat, lng);
  //       },
  //       (error) => {
  //         console.error("Error getting location: ", error);
  //         toast.error("Unable to get your current location. Please check your browser permissions.");
  //       }
  //     );
  //   } else {
  //     toast.error("Geolocation is not supported by your browser.");
  //   }
  // };

  // // Reverse geocode to get address from coordinates
  // const reverseGeocode = (lat: string, lng: string) => {
  //   const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    
  //   fetch(geocodingUrl)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.status === "OK" && data.results && data.results.length > 0) {
  //         const address = data.results[0];
          
  //         const addressComponents = {
  //           street: '',
  //           city: '',
  //           state: '',
  //           zipCode: ''
  //         };
          
  //         address.address_components.forEach((component: any) => {
  //           const types = component.types;
            
  //           if (types.includes('route')) {
  //             addressComponents.street = component.long_name;
  //           } else if (types.includes('locality')) {
  //             addressComponents.city = component.long_name;
  //           } else if (types.includes('administrative_area_level_1')) {
  //             addressComponents.state = component.long_name;
  //           } else if (types.includes('postal_code')) {
  //             addressComponents.zipCode = component.long_name;
  //           }
  //         });
          
  //         if (!addressComponents.street && address.formatted_address) {
  //           const formattedParts = address.formatted_address.split(',');
  //           if (formattedParts.length > 0) {
  //             addressComponents.street = formattedParts[0];
  //           }
  //         }
          
  //         setFormData(prev => ({
  //           ...prev,
  //           propertyAddress: {
  //             ...prev.propertyAddress,
  //             ...addressComponents
  //           }
  //         }));
          
  //         toast.success("Location details updated successfully");
  //       } else {
  //         console.error("Geocoding failed:", data.status);
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error during reverse geocoding:", error);
  //     });
  // };


  const formSections = [
    {
      title: "Basic Information",
      icon: <Home className="w-6 h-6" />,
      component: (
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
      component: (
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
        
          <div className="space-y-8">
            <MediaUpload
              initialMedia={formData.media}
              onMediaChange={(media) => {
                setFormData(prev => ({
                  ...prev,
                  media: {
                    photos: {
                      exterior: media.photos.exterior,
                      interior: media.photos.interior,
                      floorPlan: media.photos.floorPlan,
                      washrooms: media.photos.washrooms,
                      lifts: media.photos.lifts,
                      emergencyExits: media.photos.emergencyExits,
                      bedrooms: media.photos.bedrooms,
                      halls: media.photos.halls,
                      storerooms: media.photos.storerooms,
                      kitchen: media.photos.kitchen
                    },
                    videoTour: media.videoTour,
                    documents: media.documents
                  }
                }));
              }}
            />
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
            createdAt: new Date()
          }
        };

        const response = await axios.post('/api/residential/rent/apartment', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          toast.success('Apartment listing created successfully!');
          setFormData({...initialData} as formData);
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


//   return (
//     <form onSubmit={(e) => e.preventDefault()} className="max-w-5xl mx-auto px-4 py-8 space-y-12">
//       {/* Progress indicator */}
//       <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
//         <div className="max-w-5xl mx-auto px-4 py-4">
//           <div className="flex justify-center">
//             <div className="flex items-center space-x-2">
//               {formSections.map((section, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center cursor-pointer"
//                   onClick={() => {
//                     if (index < currentStep) {
//                       setCurrentStep(index);
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
//                     <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index <= currentStep
//                       ? 'bg-black text-white'
//                       : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//                       }`}>
//                       {section.icon}
//                     </div>
//                     <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index <= currentStep
//                       ? 'text-black'
//                       : 'text-gray-500 group-hover:text-gray-700'
//                       }`}>
//                       {section.title}
//                     </span>
//                   </div>
//                   {index < formSections.length - 1 && (
//                     <div className="flex items-center mx-1">
//                       <div className={`w-12 h-1 transition-colors duration-200 ${index < currentStep ? 'bg-black' : 'bg-gray-200'
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
//           <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
//           <p className="text-gray-600">Please fill in the details for your apartment property</p>
//         </div>
//         <div className="space-y-8">{formSections[currentStep].component}</div>
//       </div>

//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
//         <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
//           {currentStep > 0 ? (
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
//             <div></div>
//           )}

//           {currentStep < formSections.length - 1 ? (
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
//               onClick={() => onSubmit?.(formData)}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="animate-spin mr-2 h-5 w-5" />
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   List Property
//                   <ChevronRight className="w-5 h-5 ml-2" />
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// };


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
export default LeaseApartment;