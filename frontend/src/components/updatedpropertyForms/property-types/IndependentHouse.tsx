"use client"

import React, { useState, useCallback, useRef } from "react"
import { Building2, MapPin, IndianRupee, Calendar, Image, Ruler, Home, ChevronLeft, ChevronRight, Locate, Navigation, Loader2, Lock as LockIcon } from "lucide-react"
import PropertyName from "../PropertyName"
import IndependentPropertyAddress from "../IndependentPropertyAddress"
import MapCoordinates from "../MapCoordinates"
import PropertySize from "../PropertySize"
import Restrictions from "../Restrictions"
import IndependentPropertyFeatures from "../IndependentPropertyFeatures"
import Rent from "../residentialrent/Rent"
import SecurityDeposit from "../residentialrent/SecurityDeposit"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import Brokerage from "../residentialrent/Brokerage"
import AvailabilityDate from "../AvailabilityDate"
import OtherCharges from "../residentialrent/OtherCharges"
import ResidentialPropertyMediaUpload from "../ResidentialPropertyMediaUpload"
import FlatAmenities from "../FlatAmenities"
import SocietyAmenities from "../SocietyAmenities"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

// Add custom styles for inclusive/exclusive buttons
const customStyles = `
  /* Target inclusive buttons when selected */
  button.bg-blue-50.border-blue-500.text-blue-700 {
    border-color: #DBEAFE !important; /* border-blue-100 */
    background-color: #EFF6FF !important; /* bg-blue-50 */
  }
`;

interface FormData {
  basicInformation: {
    title: string
    address: {
      houseName: string;
      street: string;
      city: string;
      state: string;
      zipCode: string;
      pinCode: string;
      location: {
        latitude: string;
        longitude: string;
      };
    };
  };
  propertySize: number;
  propertyDetails: {
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
    waterAvailability: {
      borewell: boolean;
      governmentSupply: boolean;
      tankerSupply: boolean;
    };
  }
  restrictions: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  };
  flatAmenities: {
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
  societyAmenities: {
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
  rentalTerms: {
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
  availability: {
    type: string;
    date?: string;
  };
  media: {
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
  },
  metadata?: {
    createdBy: string;
    createdAt: Date;
    propertyType: 'Residential';
    propertyName: 'Independent House';
    intent: 'Rent';
    status: 'Available' | 'Rented' | 'Under Maintenance';
  }
}

interface IndependentHouseProps {
  propertyId?: string;
  onSubmit?: (formData: FormData) => void;
}

const IndependentHouse: React.FC<IndependentHouseProps> = ({ propertyId: initialPropertyId, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [propertyId, setPropertyId] = useState<string | undefined>(initialPropertyId)
  const formRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: "",
      address: {
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
      utilityArea: 'no',
      furnishingStatus: '',
      flooring: '',
      facing: '',
      propertyAge: '',
      superBuiltUpAreaSqft: 0,
      superBuiltUpAreaSqmt: 0,
      builtUpAreaSqft: 0,
      builtUpAreaSqmt: 0,
      carpetAreaSqft: 0,
      carpetAreaSqmt: 0,
      electricityAvailability: '',
      waterAvailability: {
        borewell: false,
        governmentSupply: false,
        tankerSupply: false
      }
    },
    restrictions: {
      foodPreference: '',
      petsAllowed: '',
      tenantType: ''
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
      otherCharges: {
        water: {
          amount: 0,
          type: "inclusive"
        },
        electricity: {
          amount: 0,
          type: "inclusive"
        },
        gas: {
          amount: 0,
          type: "inclusive"
        },
        others: {
          amount: 0,
          type: "inclusive"
        }
      },
      brokerage: {
        required: "no",
        amount: 0
      },
    },
    availability: {
      type: "immediate",
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
      videoTour: undefined,
      documents: []
    },
    metadata: {
      createdBy: "",
      createdAt: new Date(),
      propertyType: "Residential",
      propertyName: "Independent House",
      intent: "Rent",
      status: "Available"
    }
  })

  const formSections = [
    {
      title: "Basic Information",
      icon: <Home className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <div className="space-y-8">


            <PropertyName
              propertyName={formData.basicInformation.title}
              onPropertyNameChange={(name) =>
                setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, title: name } }))
              }
            />
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>

              <IndependentPropertyAddress
                propertyAddress={formData.basicInformation.address}
                onAddressChange={(address) =>
                  setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, address: address } }))
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
                  onPropertySizeChange={(size) =>
                    setFormData((prev) => ({ ...prev, propertySize: size }))
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
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <LockIcon className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Restrictions</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
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
                    amenities={formData.flatAmenities}
                    onAmenitiesChange={(amenities) =>
                      setFormData((prev) => ({
                        ...prev,
                        flatAmenities: { ...prev.flatAmenities, amenities },
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
      component: (
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
                  rentalTerms: { ...prev.rentalTerms, securityDeposit: deposit }
                }))}
              />
            </div>
          </div>

          <div className="space-y-8">

            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <MaintenanceAmount
                maintenanceAmount={formData.rentalTerms.maintenanceAmount}
                onMaintenanceAmountChange={(maintenance) => setFormData({ ...formData, rentalTerms: { ...formData.rentalTerms, maintenanceAmount: maintenance } })}
              />
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
                onAvailabilityChange={(availability) => setFormData(prev => ({
                  ...prev,
                  rentalTerms: { ...prev.rentalTerms, availability: availability }
                }))}
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

          <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
          <ResidentialPropertyMediaUpload
                propertyType="independenthouse"
                propertyId={propertyId}
                value={formData.media}
                onChange={(media) => setFormData(prev => ({ ...prev, media }))}
              />
          </div>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep((prev) => prev + 1)
      // Scroll to top of the form
      setTimeout(() => {
        if (formRef.current) {
          window.scrollTo({
            top: formRef.current.offsetTop - 100,
            behavior: 'smooth'
          })
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
      }, 100)
    } else {
      onSubmit?.(formData)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      // Scroll to top of the form
      setTimeout(() => {
        if (formRef.current) {
          window.scrollTo({
            top: formRef.current.offsetTop - 100,
            behavior: 'smooth'
          })
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  const initialFormData = formData

  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log(formData);

    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        navigate('/updatepropertyform');
        return;
      }

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
          ? formData.media.videoTour instanceof File
            ? await convertFileToBase64(formData.media.videoTour)
            : formData.media.videoTour
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
          intent: "Rent",
          status: "Available"
        }
      };

      const response = await axios.post('/api/residential/rent/independenthouse', transformedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setPropertyId(response.data.propertyId);
        toast.success('Property listing created successfully!');
        setFormData(initialFormData);
        if (onSubmit) {
          onSubmit(formData);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create independent house listing. Please try again.');
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

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Rent Independent House</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep].component}
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
        </div>
      </div>
    </div>
  )
}

export default IndependentHouse