import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import ShowroomType from '../CommercialComponents/ShowroomType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShowroomDetails from '../CommercialComponents/ShowroomDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { Home, Building2, DollarSign, Calendar, Phone, Image } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoadScript, Libraries } from '@react-google-maps/api';

interface FormData {
  basicInformation: {
    title: string;
    showroomType: string[];
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    landmark: string;
    location: {
      latitude: number | null;
      longitude: number | null;
    };
    isCornerProperty: boolean;
  };
  showroomDetails: {
    totalSpace: number | null;
    frontageWidth: number | null;
    ceilingHeight: number | null;
    glassFrontage: boolean;
    lightingType: string;
    acInstalled: boolean;
    nearbyCompetitors: {
      present: boolean;
      brandNames: string;
    };
    displayRacks: boolean;
  };
  propertyDetails: {
    area: {
      totalArea: number | null;
      carpetArea: number | null;
      builtUpArea: number | null;
    };
    floor: {
      floorNumber: number | null;
      totalFloors: number | null;
    };
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
      powerLoad: number | null;
      backup: boolean;
    };
    waterAvailability: string[];
    propertyAge: number | null;
    propertyCondition: string;
  };
  rentalDetails: {
    expectedRent: number | null;
    rentType: string;
    isNegotiable: boolean;
    securityDeposit: {
      amount: number | null;
      depositType: string;
    };
    maintenanceCharges: {
      amount: number | null;
      frequency: string;
    };
    otherCharges: {
      water: { amount: number | null; type: string };
      electricity: { amount: number | null; type: string };
      gas: { amount: number | null; type: string };
      others: { amount: number | null; type: string };
      propertyTax: boolean;
      otherInclusives: string[];
    };
  };
  brokerage: {
    required: string;
    amount: number | null;
  };
  availability: {
    immediate: boolean;
    specificDate: null;
    availableImmediately: boolean;
    leaseDuration: string;
    noticePeriod: string;
    petsAllowed: boolean;
    operatingHours: {
      restricted: boolean;
      restrictions: string;
    };
  };
  contactInformation: {
    name: string;
    email: string;
    phone: string;
    alternatePhone: string;
    bestTimeToContact: string;
  };
  media: {
    photos: {
      exterior: string[];
      interior: string[];
      floorPlan: string[];
      washrooms: string[];
      lifts: string[];
      emergencyExits: string[];
    };
    videoTour: string;
    documents: string[];
  };
}

// Declare the type for the window object
declare global {
  interface Window {
    __NEXT_PUBLIC_GOOGLE_MAPS_API_KEY__: string;
  }
}

const RentShowroomMain = () => {
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
      showroomType: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      landmark: '',
      location: {
        latitude: null,
        longitude: null
      },
      isCornerProperty: false
    },
    showroomDetails: {
      totalSpace: null,
      frontageWidth: null,
      ceilingHeight: null,
      glassFrontage: false,
      lightingType: '',
      acInstalled: false,
      nearbyCompetitors: {
        present: false,
        brandNames: ''
      },
      displayRacks: false
    },
    propertyDetails: {
      area: {
        totalArea: null,
        carpetArea: null,
        builtUpArea: null
      },
      floor: {
        floorNumber: null,
        totalFloors: null
      },
      facingDirection: '',
      furnishingStatus: '',
      propertyAmenities: [],
      wholeSpaceAmenities: [],
      electricitySupply: {
        powerLoad: null,
        backup: false
      },
      waterAvailability: [],
      propertyAge: null,
      propertyCondition: 'new'
    },
    rentalDetails: {
      expectedRent: null,
      rentType: 'inclusive',
      isNegotiable: false,
      securityDeposit: {
        amount: null,
        depositType: 'refundable'
      },
      maintenanceCharges: {
        amount: null,
        frequency: ''
      },
      otherCharges: {
        water: {
          amount: null,
          type: 'inclusive'
        },
        electricity: {
          amount: null,
          type: 'inclusive'
        },
        gas: {
          amount: null,
          type: 'inclusive'
        },
        others: {
          amount: null,
          type: 'inclusive'
        },
        propertyTax: false,
        otherInclusives: []
      }
    },
    brokerage: {
      required: 'no',
      amount: null
    },
    availability: {
      immediate: false,
      specificDate: null,
      availableImmediately: false,
      leaseDuration: '12 months',
      noticePeriod: '1 month',
      petsAllowed: false,
      operatingHours: {
        restricted: false,
        restrictions: 'Standard business hours'
      }
    },
    contactInformation: {
      name: '',
      email: '',
      phone: '',
      alternatePhone: '',
      bestTimeToContact: ''
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        lifts: [],
        emergencyExits: []
      },
      videoTour: '',
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  const libraries: Libraries = ['places', 'geocoding'];

  // Get the API key from the window object or use a fallback
  const apiKey = typeof window !== 'undefined' ? window.__NEXT_PUBLIC_GOOGLE_MAPS_API_KEY__ : '';

  const formSections = [
    {
      title: 'Basic Information',
      icon: <Home className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Home className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Basic Details</h3>
              </div>
              <div className="space-y-6">
                <PropertyName
                  propertyName={formData.basicInformation.title}
                  onPropertyNameChange={(name) => setFormData(prev => ({
                    ...prev,
                    basicInformation: {
                      ...prev.basicInformation,
                      title: name
                    }
                  }))}
                />
                <ShowroomType
                  onShowroomTypeChange={(type: string[]) => setFormData(prev => ({
                    ...prev,
                    basicInformation: {
                      ...prev.basicInformation,
                      showroomType: type
                    }
                  }))}
                />
                <CommercialPropertyAddress
                  onAddressChange={(address) => setFormData(prev => ({
                    ...prev,
                    basicInformation: {
                      ...prev.basicInformation,
                      address: {
                        ...prev.basicInformation.address,
                        ...address
                      }
                    }
                  }))}
                />
                <Landmark
                  onLandmarkChange={(landmark) => setFormData(prev => ({
                    ...prev,
                    basicInformation: {
                      ...prev.basicInformation,
                      landmark: landmark
                    }
                  }))}
                />
                <CornerProperty
                  onCornerPropertyChange={(isCorner) => setFormData(prev => ({
                    ...prev,
                    basicInformation: {
                      ...prev.basicInformation,
                      isCornerProperty: isCorner
                    }
                  }))}
                />
                <div className="mt-4">
                  <h4 className="text-lg font-medium mb-2">Location on Map</h4>
                  <p className="text-sm text-gray-600 mb-4">Click on the map to set the location coordinates</p>
                  {mapLoaded && (
                    <MapCoordinates
                      latitude={formData.basicInformation.location.latitude?.toString() || ''}
                      longitude={formData.basicInformation.location.longitude?.toString() || ''}
                      onLocationChange={(location) => {
                        const numLat = parseFloat(location.latitude);
                        const numLng = parseFloat(location.longitude);
                        if (!isNaN(numLat) && !isNaN(numLng)) {
                          setFormData(prev => ({
                            ...prev,
                            basicInformation: {
                              ...prev.basicInformation,
                              location: {
                                latitude: numLat,
                                longitude: numLng
                              }
                            }
                          }));
                        }
                      }}
                    />
                  )}
                  {formData.basicInformation.location.latitude && formData.basicInformation.location.longitude && (
                    <div className="mt-4 text-sm text-gray-600">
                      <p>Selected Location:</p>
                      <p>Latitude: {formData.basicInformation.location.latitude.toFixed(6)}</p>
                      <p>Longitude: {formData.basicInformation.location.longitude.toFixed(6)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <ShowroomDetails
                  onDetailsChange={(details) => {
                    console.log('Showroom details received:', details);
                    setFormData(prev => ({
                      ...prev,
                      showroomDetails: {
                        ...prev.showroomDetails,
                        totalSpace: details.totalSpace || null,
                        frontageWidth: details.frontageWidth || null,
                        ceilingHeight: details.ceilingHeight || null,
                        glassFrontage: details.glassFrontage,
                        lightingType: details.lightingType,
                        acInstalled: details.acInstalled,
                        nearbyCompetitors: {
                          present: details.nearbyCompetitors.present,
                          brandNames: details.nearbyCompetitors.brandNames
                        },
                        displayRacks: details.displayRacks
                      }
                    }));
                  }}
                />
                <CommercialPropertyDetails
                  onDetailsChange={(details) => {
                    console.log('Property details received:', details);
                    setFormData(prev => ({
                      ...prev,
                      propertyDetails: {
                        ...prev.propertyDetails,
                        area: {
                          totalArea: Number(details.area?.totalArea) || null,
                          carpetArea: Number(details.area?.carpetArea) || null,
                          builtUpArea: Number(details.area?.builtUpArea) || null
                        },
                        floor: {
                          floorNumber: Number(details.floor?.floorNumber) || null,
                          totalFloors: Number(details.floor?.totalFloors) || null
                        },
                        facingDirection: details.facingDirection || '',
                        furnishingStatus: details.furnishingStatus || '',
                        propertyAmenities: details.propertyAmenities || [],
                        wholeSpaceAmenities: details.wholeSpaceAmenities || [],
                        electricitySupply: {
                          powerLoad: details.electricitySupply?.powerLoad ?? null,
                          backup: details.electricitySupply?.backup ?? false
                        },
                        waterAvailability: details.waterAvailability || [],
                        propertyAge: details.propertyAge ?? null,
                        propertyCondition: details.propertyCondition || 'new'
                      }
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Rental Terms',
      icon: <DollarSign className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <DollarSign className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Rental Terms</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <Rent
                  onRentChange={(rent) => setFormData(prev => ({
                    ...prev,
                    rentalDetails: {
                      ...prev.rentalDetails,
                      ...rent
                    }
                  }))}
                />
                {formData.rentalDetails.rentType === 'exclusive' && (
                  <MaintenanceAmount
                    onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({
                      ...prev,
                      rentalDetails: {
                        ...prev.rentalDetails,
                        maintenanceCharges: {
                          amount: maintenance.amount,
                          frequency: maintenance.frequency || ''
                        }
                      }
                    }))}
                  />
                )}
                <SecurityDeposit
                  onSecurityDepositChange={(deposit: Record<string, any>) => setFormData(prev => ({
                    ...prev,
                    rentalDetails: {
                      ...prev.rentalDetails,
                      securityDeposit: {
                        amount: deposit.amount || null,
                        depositType: deposit.depositType || ''
                      }
                    }
                  }))}
                />
                <OtherCharges
                  onOtherChargesChange={(charges: Record<string, any>) => setFormData(prev => ({
                    ...prev,
                    rentalDetails: {
                      ...prev.rentalDetails,
                      otherCharges: {
                        water: { amount: Number(charges.water?.amount) || null, type: charges.water?.type || '' },
                        electricity: { amount: Number(charges.electricity?.amount) || null, type: charges.electricity?.type || '' },
                        gas: { amount: Number(charges.gas?.amount) || null, type: charges.gas?.type || '' },
                        others: { amount: Number(charges.others?.amount) || null, type: charges.others?.type || '' },
                        propertyTax: charges.propertyTax || false,
                        otherInclusives: charges.otherInclusives || []
                      }
                    }
                  }))}
                />
                <Brokerage
                  onBrokerageChange={(brokerage: Record<string, any>) => setFormData(prev => ({
                    ...prev,
                    brokerage: {
                      required: brokerage.required || 'no',
                      amount: Number(brokerage.amount) || null
                    }
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Calendar className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Availability</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <AvailabilityDate
                  onAvailabilityChange={(availability: { type: "immediate" | "specific"; date?: string }) => setFormData(prev => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      immediate: availability.type === "immediate",
                      specificDate: null,
                      availableImmediately: availability.type === "immediate"
                    }
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <Phone className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Phone className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Contact Information</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <CommercialContactDetails
                  onContactChange={(contact: Record<string, any>) => setFormData(prev => ({
                    ...prev,
                    contactInformation: {
                      name: contact.name || '',
                      email: contact.email || '',
                      phone: contact.phone || '',
                      alternatePhone: contact.alternatePhone || '',
                      bestTimeToContact: contact.bestTimeToContact || ''
                    }
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Property Media',
      icon: <Image className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Image className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Media</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <CommercialMediaUpload
                  onMediaChange={(mediaUpdate) => {
                    const convertedPhotos: any = {};
                    mediaUpdate.images.forEach(({ category, files }) => {
                      convertedPhotos[category] = files.map(f => f.url);
                    });
                    setFormData(prev => ({
                      ...prev,
                      media: {
                        photos: {
                          ...prev.media.photos,
                          ...convertedPhotos
                        },
                        videoTour: mediaUpdate.video?.url || '',
                        documents: mediaUpdate.documents.map(d => d.file.name)
                      }
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Add validation for numeric fields
  const validateNumericField = (value: number | null, fieldName: string): boolean => {
    if (value === null) return true; // Allow null values
    if (isNaN(value)) {
      toast.error(`Please enter a valid number for ${fieldName}`);
      return false;
    }
    if (value <= 0) {
      toast.error(`${fieldName} must be greater than 0`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

        // Validate required fields
        if (!formData.basicInformation.location.latitude || !formData.basicInformation.location.longitude) {
          toast.error('Please provide location coordinates by selecting a location on the map');
          return;
        }

        // Validate numeric fields
        if (!validateNumericField(formData.showroomDetails.totalSpace, 'Total Space')) return;
        if (!validateNumericField(formData.showroomDetails.frontageWidth, 'Frontage Width')) return;
        if (!validateNumericField(formData.showroomDetails.ceilingHeight, 'Ceiling Height')) return;
        if (!validateNumericField(formData.propertyDetails.area.totalArea, 'Total Area')) return;
        if (!validateNumericField(formData.propertyDetails.area.carpetArea, 'Carpet Area')) return;
        if (!validateNumericField(formData.propertyDetails.area.builtUpArea, 'Built-up Area')) return;
        if (!validateNumericField(formData.propertyDetails.floor.floorNumber, 'Floor Number')) return;
        if (!validateNumericField(formData.propertyDetails.floor.totalFloors, 'Total Floors')) return;
        if (!validateNumericField(formData.rentalDetails.expectedRent, 'Expected Rent')) return;
        if (!validateNumericField(formData.rentalDetails.securityDeposit.amount, 'Security Deposit Amount')) return;
        if (!validateNumericField(formData.brokerage.amount, 'Brokerage Amount')) return;

        // Validate contact information
        if (!formData.contactInformation.name.trim()) {
          toast.error('Please enter your name');
          return;
        }
        if (!formData.contactInformation.email.trim()) {
          toast.error('Please enter your email');
          return;
        }
        if (!formData.contactInformation.phone.trim()) {
          toast.error('Please enter your phone number');
          return;
        }

        // Transform the data to match the schema requirements
        const transformedData = {
          basicInformation: {
            title: formData.basicInformation.title,
            showroomType: formData.basicInformation.showroomType,
            address: {
              street: formData.basicInformation.address.street,
              city: formData.basicInformation.address.city,
              state: formData.basicInformation.address.state,
              zipCode: formData.basicInformation.address.zipCode
            },
            landmark: formData.basicInformation.landmark,
            location: {
              latitude: formData.basicInformation.location.latitude,
              longitude: formData.basicInformation.location.longitude
            },
            isCornerProperty: formData.basicInformation.isCornerProperty
          },
          showroomDetails: {
            totalSpace: formData.showroomDetails.totalSpace,
            frontageWidth: formData.showroomDetails.frontageWidth,
            ceilingHeight: formData.showroomDetails.ceilingHeight,
            glassFrontage: formData.showroomDetails.glassFrontage,
            lightingType: formData.showroomDetails.lightingType,
            acInstalled: formData.showroomDetails.acInstalled,
            nearbyCompetitors: {
              present: formData.showroomDetails.nearbyCompetitors.present,
              brandNames: formData.showroomDetails.nearbyCompetitors.brandNames
            },
            displayRacks: formData.showroomDetails.displayRacks
          },
          propertyDetails: {
            area: {
              totalArea: formData.propertyDetails.area.totalArea,
              carpetArea: formData.propertyDetails.area.carpetArea,
              builtUpArea: formData.propertyDetails.area.builtUpArea
            },
            floor: {
              floorNumber: formData.propertyDetails.floor.floorNumber,
              totalFloors: formData.propertyDetails.floor.totalFloors
            },
            facingDirection: formData.propertyDetails.facingDirection,
            furnishingStatus: formData.propertyDetails.furnishingStatus,
            propertyAmenities: formData.propertyDetails.propertyAmenities,
            wholeSpaceAmenities: formData.propertyDetails.wholeSpaceAmenities,
            electricitySupply: {
              powerLoad: formData.propertyDetails.electricitySupply.powerLoad,
              backup: formData.propertyDetails.electricitySupply.backup
            },
            waterAvailability: formData.propertyDetails.waterAvailability,
            propertyAge: formData.propertyDetails.propertyAge,
            propertyCondition: formData.propertyDetails.propertyCondition
          },
          rentalDetails: {
            expectedRent: formData.rentalDetails.expectedRent,
            rentType: formData.rentalDetails.rentType,
            isNegotiable: formData.rentalDetails.isNegotiable,
            securityDeposit: {
              amount: formData.rentalDetails.securityDeposit.amount,
              depositType: formData.rentalDetails.securityDeposit.depositType
            },
            maintenanceCharges: {
              amount: formData.rentalDetails.maintenanceCharges.amount,
              frequency: formData.rentalDetails.maintenanceCharges.frequency
            },
            otherCharges: {
              water: {
                amount: formData.rentalDetails.otherCharges.water.amount,
                type: formData.rentalDetails.otherCharges.water.type
              },
              electricity: {
                amount: formData.rentalDetails.otherCharges.electricity.amount,
                type: formData.rentalDetails.otherCharges.electricity.type
              },
              gas: {
                amount: formData.rentalDetails.otherCharges.gas.amount,
                type: formData.rentalDetails.otherCharges.gas.type
              },
              others: {
                amount: formData.rentalDetails.otherCharges.others.amount,
                type: formData.rentalDetails.otherCharges.others.type
              },
              propertyTax: formData.rentalDetails.otherCharges.propertyTax,
              otherInclusives: formData.rentalDetails.otherCharges.otherInclusives
            }
          },
          brokerage: {
            required: formData.brokerage.required,
            amount: formData.brokerage.amount
          },
          availability: {
            immediate: formData.availability.immediate,
            specificDate: formData.availability.specificDate,
            availableImmediately: formData.availability.availableImmediately,
            leaseDuration: formData.availability.leaseDuration,
            noticePeriod: formData.availability.noticePeriod,
            petsAllowed: formData.availability.petsAllowed,
            operatingHours: {
              restricted: formData.availability.operatingHours.restricted,
              restrictions: formData.availability.operatingHours.restrictions
            }
          },
          contactInformation: {
            name: formData.contactInformation.name,
            email: formData.contactInformation.email,
            phone: formData.contactInformation.phone,
            alternatePhone: formData.contactInformation.alternatePhone,
            bestTimeToContact: formData.contactInformation.bestTimeToContact
          },
          media: {
            photos: {
              exterior: formData.media.photos.exterior,
              interior: formData.media.photos.interior,
              floorPlan: formData.media.photos.floorPlan,
              washrooms: formData.media.photos.washrooms,
              lifts: formData.media.photos.lifts,
              emergencyExits: formData.media.photos.emergencyExits
            },
            videoTour: formData.media.videoTour,
            documents: formData.media.documents
          },
          metadata: {
            createdBy: author,
            createdAt: new Date().toISOString()
          }
        };

        // Remove only undefined values, keep null and empty strings
        const cleanData = JSON.parse(JSON.stringify(transformedData, (key, value) => {
          if (value === undefined) {
            return undefined;
          }
          return value;
        }));

        console.log('Submitting data:', cleanData);
        const response = await axios.post('/api/commercial/rent/showroom', cleanData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Success:', response.data);
        toast.success('Property listed successfully');
      } else {
        console.error('User not logged in');
        toast.error('Please login to list a property');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error details:', error.response.data);
        toast.error(`Failed to list property: ${error.response.data.message || 'Please try again.'}`);
      } else {
        toast.error('Failed to list property. Please try again.');
      }
    }
  };

  // Add handlers for specific fields
  const handleWaterAvailabilityChange = (availability: string[]) => {
    setFormData(prev => ({
      ...prev,
      propertyDetails: {
        ...prev.propertyDetails,
        waterAvailability: availability
      }
    }));
  };

  const handlePropertyAgeChange = (age: number | null) => {
    setFormData(prev => ({
      ...prev,
      propertyDetails: {
        ...prev.propertyDetails,
        propertyAge: age
      }
    }));
  };

  const handleElectricitySupplyChange = (supply: { powerLoad: number | null; backup: boolean }) => {
    setFormData(prev => ({
      ...prev,
      propertyDetails: {
        ...prev.propertyDetails,
        electricitySupply: supply
      }
    }));
  };

  const handleMaintenanceChargesChange = (charges: { amount: number | null; frequency: string }) => {
    setFormData(prev => ({
      ...prev,
      rentalDetails: {
        ...prev.rentalDetails,
        maintenanceCharges: charges
      }
    }));
  };

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={libraries}
      onLoad={() => setMapLoaded(true)}
    >
      <div className="max-w-4xl mx-auto text-black">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {formSections.map((section, i) => (
              <div
                key={i}
                className={`flex flex-col items-center ${i <= currentStep ? "text-black" : "text-gray-400"}`}
                onClick={() => i < currentStep && setCurrentStep(i)}
                style={{ cursor: i < currentStep ? "pointer" : "default" }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {section.icon}
                </div>
                <span className="text-xs font-medium">{section.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-1 rounded-full">
            <div
              className="bg-black h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (formSections.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-black">{formSections[currentStep].title}</h2>

        {formSections[currentStep].content}

        <div className="mt-8 flex justify-end">
          {currentStep < formSections.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-200 flex items-center"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-200"
            >
              List Property
            </button>
          )}
        </div>
      </div>
    </LoadScript>
  );
};

export default RentShowroomMain;
