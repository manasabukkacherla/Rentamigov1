import React, { useEffect, useState, useRef } from 'react';
import PropertyName from '../PropertyName';
import CoveredOpenSpaceType from '../CommercialComponents/CoveredOpenSpaceType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
// import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import CoveredOpenSpaceDetails from '../CommercialComponents/CoveredOpenSpaceDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { DollarSign, Calendar, User, Image, ImageIcon, UserCircle, ChevronLeft, ChevronRight, Store, Building2, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MapLocation from '../CommercialComponents/MapLocation';

interface IFormData {
  basicInformation: {
    title: string;
    Type: string[];
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    landmark: string;
    location: {
      latitude: string;
      longitude: string;
    };
    isCornerProperty: boolean;
  };

  spaceDetails: {
    totalArea: number;
    areaUnit: string;
    coveredArea: number;
    openArea: number;
    roadWidth: {
      value: number | null;
      unit: string;
    };
    ceilingHeight: {
      value: number | null;
      unit: string;
    };
    noOfOpenSides: string;
  };

  propertyDetails: {
    area: {
      totalArea: number;
      builtUpArea: number;
      carpetArea: number;
    };
    floor: {
      floorNumber: number;
      totalFloors: number;
    };
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
  };
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
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: string;
    date?: string;
  };
  contactInformation: {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    bestTimeToContact?: string;
  };
  media: {
    photos: {
      exterior: File[];
      interior: File[];
      floorPlan: File[];
      washrooms: File[];
      lifts: File[];
      emergencyExits: File[];
    };
    videoTour: File | null;
    documents: File[];
  };
}

const RentCoveredSpace = () => {
  const [formData, setFormData] = useState<IFormData>({
    basicInformation: {
      title: '',
      Type: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      landmark: '', // required, must be filled by user
      location: {
        latitude: '', // required, must be filled by user
        longitude: '', // required, must be filled by user
      },
      isCornerProperty: false,
    },
    spaceDetails: {
      totalArea: 0,
      areaUnit: '',
      coveredArea: 0,
      openArea: 0,
      roadWidth: {
        value: 0,
        unit: '',
      },
      ceilingHeight: {
        value: 0,
        unit: '',
      },
      noOfOpenSides: ''
    },
    propertyDetails: {
      area: {
        totalArea: 0,
        builtUpArea: 0,
        carpetArea: 0
      },
      floor: {
        floorNumber: 0,
        totalFloors: 0
      },
      facingDirection: '',
      furnishingStatus: '',
      propertyAmenities: [] as string[],
      wholeSpaceAmenities: [] as string[],
      electricitySupply: {
        powerLoad: 0,
        backup: false
      },
      waterAvailability: '',
      propertyAge: '',
      propertyCondition: ''
    },
    rentalTerms: {
      rentDetails: {
        expectedRent: 0,
        isNegotiable: false,
        rentType: '',
      },
      securityDeposit: {
        amount: 0,
      },
      maintenanceAmount: {
        amount: 0,
        frequency: '',
      },
      otherCharges: {
        water: {
          amount: 0,
          type: '',
        },
        electricity: {
          amount: 0,
          type: '',
        },
        gas: {
          amount: 0,
          type: '',
        },
        others: {
          amount: 0,
          type: '',
        },
      },
    },
    
    brokerage: {
      required: 'no',
      amount: 0,
    },
    availability: {
      type: 'immediate',
      date: '',
    },
    contactInformation: {
      name: '',
      email: '',
      phone: '',
      alternatePhone: '',
      bestTimeToContact: '',
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
      videoTour: null,
      documents: [],
    },
  });


  // Add validation utility functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateZipCode = (zipCode: string) => {
    const zipRegex = /^[0-9]{6}$/;
    return zipRegex.test(zipCode);
  };

  const validateArea = (area: number) => {
    return area > 0;
  };

  // Add error display component
  const ErrorDisplay = ({ errors }: { errors: Record<string, string> }) => {
    if (Object.keys(errors).length === 0) return null;

    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-red-800 font-medium">Please fix the following errors:</h3>
        </div>
        <ul className="mt-2 list-disc list-inside text-red-600">
          {Object.values(errors).map((error, index) => (
            <li key={index} className="text-sm">{error}</li>
          ))}
        </ul>
      </div>
    );
  };

  const [currentStep, setCurrentStep] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);

  // Check login status on component mount
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  // Enhanced validation for current step
  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};

    switch (currentStep) {
      case 0: // Basic Information
        if (!formData.basicInformation.title.trim()) {
          errors.title = 'Title is required';
        } else if (formData.basicInformation.title.length < 5) {
          errors.title = 'Title must be at least 5 characters long';
        }

        if (!formData.basicInformation.Type) {
          errors.Type = 'Space type is required';
        }

        if (!formData.basicInformation.address.street.trim()) {
          errors.street = 'Street address is required';
        }

        if (!formData.basicInformation.address.city.trim()) {
          errors.city = 'City is required';
        }

        if (!formData.basicInformation.address.state.trim()) {
          errors.state = 'State is required';
        }

        if (!formData.basicInformation.address.zipCode) {
          errors.zipCode = 'ZIP code is required';
        } else if (!validateZipCode(formData.basicInformation.address.zipCode)) {
          errors.zipCode = 'ZIP code must be 6 digits';
        }

        if (!formData.basicInformation.landmark.trim()) {
          errors.landmark = 'Landmark is required';
        }

        if (!formData.basicInformation.location.latitude || !formData.basicInformation.location.longitude) {
          errors.location = 'Please select a location on the map';
        }
        break;

      case 1: // Property Details (includes both Space Details and Property Details)
        // Validate Space Details
        if (!formData.spaceDetails.totalArea) {
          errors.totalArea = 'Total area is required';
        } else if (!validateArea(formData.spaceDetails.totalArea)) {
          errors.totalArea = 'Total area must be greater than 0';
        }

        if (!formData.spaceDetails.coveredArea) {
          errors.coveredArea = 'Covered area is required';
        } else if (!validateArea(formData.spaceDetails.coveredArea)) {
          errors.coveredArea = 'Covered area must be greater than 0';
        }

        if (!formData.spaceDetails.openArea) {
          errors.openArea = 'Open area is required';
        } else if (!validateArea(formData.spaceDetails.openArea)) {
          errors.openArea = 'Open area must be greater than 0';
        }

        if (formData.spaceDetails.roadWidth.value !== null && formData.spaceDetails.roadWidth.value <= 0) {
          errors.roadWidth = 'Road width must be greater than 0';
        }

        if (formData.spaceDetails.ceilingHeight.value !== null && formData.spaceDetails.ceilingHeight.value <= 0) {
          errors.ceilingHeight = 'Ceiling height must be greater than 0';
        }

        // Validate Property Details
        if (!formData.propertyDetails.area.totalArea) {
          errors.propertyTotalArea = 'Property total area is required';
        } else if (!validateArea(formData.propertyDetails.area.totalArea)) {
          errors.propertyTotalArea = 'Property total area must be greater than 0';
        }

        if (!formData.propertyDetails.area.builtUpArea) {
          errors.builtUpArea = 'Built-up area is required';
        } else if (!validateArea(formData.propertyDetails.area.builtUpArea)) {
          errors.builtUpArea = 'Built-up area must be greater than 0';
        }

        if (!formData.propertyDetails.area.carpetArea) {
          errors.carpetArea = 'Carpet area is required';
        } else if (!validateArea(formData.propertyDetails.area.carpetArea)) {
          errors.carpetArea = 'Carpet area must be greater than 0';
        }

        if (!formData.propertyDetails.floor.floorNumber) {
          errors.floorNumber = 'Floor number is required';
        } else if (formData.propertyDetails.floor.floorNumber < 0) {
          errors.floorNumber = 'Floor number cannot be negative';
        }

        if (!formData.propertyDetails.floor.totalFloors) {
          errors.totalFloors = 'Total floors is required';
        } else if (formData.propertyDetails.floor.totalFloors <= 0) {
          errors.totalFloors = 'Total floors must be greater than 0';
        }

        if (!formData.propertyDetails.facingDirection) {
          errors.facingDirection = 'Facing direction is required';
        }

        if (!formData.propertyDetails.furnishingStatus) {
          errors.furnishingStatus = 'Furnishing status is required';
        }

        if (!formData.propertyDetails.electricitySupply.powerLoad) {
          errors.powerLoad = 'Power load is required';
        } else if (formData.propertyDetails.electricitySupply.powerLoad <= 0) {
          errors.powerLoad = 'Power load must be greater than 0';
        }

        if (!formData.propertyDetails.waterAvailability) {
          errors.waterAvailability = 'Water availability is required';
        }

        if (!formData.propertyDetails.propertyAge) {
          errors.propertyAge = 'Property age is required';
        }

        if (!formData.propertyDetails.propertyCondition) {
          errors.propertyCondition = 'Property condition is required';
        }
        break;

      case 2: // Rental Terms
        if (!formData.rentalTerms.rentDetails.expectedRent) {
          errors.expectedRent = 'Expected rent is required';
        } else if (formData.rentalTerms.rentDetails.expectedRent <= 0) {
          errors.expectedRent = 'Expected rent must be greater than 0';
        }

        if (!formData.rentalTerms.rentDetails.rentType) {
          errors.rentType = 'Please select rent type (inclusive/exclusive)';
        }

        if (!formData.rentalTerms.securityDeposit.amount) {
          errors.securityDeposit = 'Security deposit is required';
        } else if (formData.rentalTerms.securityDeposit.amount <= 0) {
          errors.securityDeposit = 'Security deposit must be greater than 0';
        }

        // Validate maintenance amount only if rent type is exclusive
        if (formData.rentalTerms.rentDetails.rentType === 'exclusive') {
          if (!formData.rentalTerms.maintenanceAmount.amount) {
            errors.maintenanceAmount = 'Maintenance amount is required for exclusive rent';
          } else if (formData.rentalTerms.maintenanceAmount.amount <= 0) {
            errors.maintenanceAmount = 'Maintenance amount must be greater than 0';
          }
        }

        // Validate water charges based on its own type
        if (!formData.rentalTerms.otherCharges.water.type) {
          errors.waterType = 'Please select water charges type (inclusive/exclusive)';
        } else if (formData.rentalTerms.otherCharges.water.type === 'exclusive') {
          if (!formData.rentalTerms.otherCharges.water.amount) {
            errors.water = 'Water amount is required when water charges are exclusive';
          } else if (formData.rentalTerms.otherCharges.water.amount <= 0) {
            errors.water = 'Water amount must be greater than 0';
          }
        }

        // Validate electricity charges based on its own type
        if (!formData.rentalTerms.otherCharges.electricity.type) {
          errors.electricityType = 'Please select electricity charges type (inclusive/exclusive)';
        } else if (formData.rentalTerms.otherCharges.electricity.type === 'exclusive') {
          if (!formData.rentalTerms.otherCharges.electricity.amount) {
            errors.electricity = 'Electricity amount is required when electricity charges are exclusive';
          } else if (formData.rentalTerms.otherCharges.electricity.amount <= 0) {
            errors.electricity = 'Electricity amount must be greater than 0';
          }
        }

        // Validate gas charges based on its own type
        if (!formData.rentalTerms.otherCharges.gas.type) {
          errors.gasType = 'Please select gas charges type (inclusive/exclusive)';
        } else if (formData.rentalTerms.otherCharges.gas.type === 'exclusive') {
          if (!formData.rentalTerms.otherCharges.gas.amount) {
            errors.gas = 'Gas amount is required when gas charges are exclusive';
          } else if (formData.rentalTerms.otherCharges.gas.amount <= 0) {
            errors.gas = 'Gas amount must be greater than 0';
          }
        }

        // Validate other charges based on its own type
        if (!formData.rentalTerms.otherCharges.others.type) {
          errors.othersType = 'Please select other charges type (inclusive/exclusive)';
        } else if (formData.rentalTerms.otherCharges.others.type === 'exclusive') {
          if (!formData.rentalTerms.otherCharges.others.amount) {
            errors.others = 'Other charges amount is required when other charges are exclusive';
          } else if (formData.rentalTerms.otherCharges.others.amount <= 0) {
            errors.others = 'Other charges amount must be greater than 0';
          }
        }

        // Validate brokerage selection first
        if (!formData.brokerage.required) {
          errors.brokerage = 'Please select if brokerage is required';
        }

        // Only validate brokerage amount if brokerage is required (yes)
        if (formData.brokerage.required === 'yes') {
          if (!formData.brokerage.amount) {
            errors.brokerage = 'Brokerage amount is required when brokerage is yes';
          } else if (formData.brokerage.amount <= 0) {
            errors.brokerage = 'Brokerage amount must be greater than 0';
          }
        }
        break;

      case 3: // Availability
        if (!formData.availability.date) {
          errors.date = 'Available from date is required';
        }
        break;

      case 4: // Contact Information
        if (!formData.contactInformation.name.trim()) {
          errors.name = 'Name is required';
        } else if (formData.contactInformation.name.length < 3) {
          errors.name = 'Name must be at least 3 characters long';
        }

        if (!formData.contactInformation.email.trim()) {
          errors.email = 'Email is required';
        } else if (!validateEmail(formData.contactInformation.email)) {
          errors.email = 'Please enter a valid email address';
        }

        if (!formData.contactInformation.phone.trim()) {
          errors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.contactInformation.phone)) {
          errors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (formData.contactInformation.alternatePhone && !validatePhone(formData.contactInformation.alternatePhone)) {
          errors.alternatePhone = 'Please enter a valid 10-digit phone number';
        }
        break;

      case 5: // Property Media
        if (!formData.media.photos.exterior.length) {
          errors.exteriorPhotos = 'At least one exterior photo is required';
        }
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderFormSection = (content: React.ReactNode) => (
    <div className="space-y-4">
      <ErrorDisplay errors={formErrors} />
      {content}
    </div>
  );

  const handleSpaceDetailsChange = (details: Record<string, any>) => {
    // Transform the data to match the expected format
    const transformedDetails = {
      ...details,
      // Convert string values to numbers
      totalArea: details.totalArea ? parseFloat(details.totalArea) : 0,
      areaUnit: details.areaUnit || '',
      coveredArea: details.coveredArea ? parseFloat(details.coveredArea) : 0,
      openArea: details.openArea ? parseFloat(details.openArea) : 0,
      // Transform road width to object format
      roadWidth: {
        value: details.roadWidth ? parseFloat(details.roadWidth) : 0,
        unit: details.roadWidthUnit || ''
      },
      // Transform ceiling height to object format
      ceilingHeight: {
        value: details.ceilingHeight ? parseFloat(details.ceilingHeight) : 0,
        unit: details.ceilingHeightUnit || ''
      },
      // Convert open sides to string
      noOfOpenSides: details.openSides || ''
    };


    setFormData(prev => ({
      ...prev,
      spaceDetails: {
        ...prev.spaceDetails,
        ...transformedDetails
      }
    }));
  };



  const handleChange = (key: string, value: any) => {
    setFormData(prev => {
      const keys = key.split('.');
      if (keys.length > 1) {
        const newData = { ...prev };
        let current: any = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
      }
      return { ...prev, [key]: value };
    });
  };

  

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const formSections = [
    {
      title: 'Basic Information',
      icon: <Store className="w-5 h-5" />,
      content: renderFormSection(
        <>
          <PropertyName propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, title: name }
            }))} />
          <CoveredOpenSpaceType onSpaceTypeChange={(types) => setFormData(prev => ({
            ...prev,
            basicInformation: { ...prev.basicInformation, Type: types }
          }))} />
          <CommercialPropertyAddress
            address={formData.basicInformation.address}
            onAddressChange={(address) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, address }
            }))}
          />
          {/* <Landmark
            onLandmarkChange={(landmark) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, landmark }
            }))}
            onLocationSelect={(location) => setFormData(prev => ({
              ...prev,
              basicInformation: {
                ...prev.basicInformation,
                location: {
                  latitude: parseFloat(location.latitude),
                  longitude: parseFloat(location.longitude)
                }
              }
            }))}
          /> */}
          <MapLocation
            latitude={formData.basicInformation.location.latitude.toString()}
            longitude={formData.basicInformation.location.longitude.toString()}
            landmark={formData.basicInformation.landmark}
            onLocationChange={(location) => handleChange('basicInformation.location', location)}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
          />
          <CornerProperty
            isCornerProperty={formData.basicInformation.isCornerProperty}
            onCornerPropertyChange={(isCorner) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner }
            }))}
          />
        </>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-5 h-5" />,
      content: renderFormSection(
        <>
          <CoveredOpenSpaceDetails onDetailsChange={handleSpaceDetailsChange} />
          <CommercialPropertyDetails
            onDetailsChange={(details) => handleChange('propertyDetails', details)}
          />
        </>
      )
    },
    {
      title: 'Rental Terms',
      icon: <DollarSign className="w-5 h-5" />,
      content: renderFormSection(
        <>
          <div className="space-y-6">
            <Rent rentDetails={formData.rentalTerms.rentDetails} 
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
            {formData.rentalTerms.rentDetails.rentType === 'exclusive' && (
              <MaintenanceAmount
                maintenanceAmount={formData.rentalTerms.maintenanceAmount}
                onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({
                  ...prev,
                  rentalTerms: {
                    ...prev.rentalTerms,
                    maintenanceAmount: {
                      amount: maintenance.amount,
                      frequency: maintenance.frequency
                    }
                  }
                }))}
              />
            )}
            <SecurityDeposit
              deposit={formData.rentalTerms.securityDeposit}
              onSecurityDepositChange={(deposit) => setFormData(prev => ({
                ...prev,
                rentalTerms: {
                  ...prev.rentalTerms,
                  securityDeposit: {
                    amount: deposit.amount
                  }
                }
              }))}
            />
            <OtherCharges
              otherCharges={formData.rentalTerms.otherCharges}
              onOtherChargesChange={(charges) => setFormData(prev => ({
                ...prev,
                rentalTerms: {
                  ...prev.rentalTerms,
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
              bro={formData.brokerage}
              onBrokerageChange={(brokerage) => {
                setFormData(prev => ({
                  ...prev,
                  rentalTerms: {
                    ...prev.rentalTerms,
                    brokerage: {
                      required: brokerage.required,
                      amount: brokerage.amount
                    }
                  }
                }));
              }}
            />
          </div>
        </>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-6 h-6" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <AvailabilityDate
            availability={{
              type: formData.availability.type as "immediate" | "specific",
              date: formData.availability.date
            }}
            onAvailabilityChange={(availability) => setFormData(prev => ({
              ...prev,
              availability: availability
            }))}
          />
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <User className="w-6 h-6" />,
      content: renderFormSection(
        <div className="space-y-6">
          <CommercialContactDetails
            contactInformation={formData.contactInformation}
            onContactChange={(contact) => setFormData(prev => ({
              ...prev,
              contactInformation: contact
            }))}
          />
        </div>
      )
    },
    {
      title: 'Property Media',
      icon: <Image className="w-6 h-6" />,
      content: renderFormSection(
        <div className="space-y-6">
          <CommercialMediaUpload
            Media={{
              photos: Object.entries(formData.media.photos).map(([category, files]) => ({
                category,
                files: files.map(file => ({ url: URL.createObjectURL(file), file }))
              })),
              videoTour: formData.media.videoTour || null,
              documents: formData.media.documents
            }}
            onMediaChange={(media) => {
              const photos: Record<string, File[]> = {};
              media.photos.forEach(({ category, files }: { category: string, files: { url: string, file: File }[] }) => {
                photos[category] = files.map(f => f.file);
              });

              setFormData(prev => ({
                ...prev,
                media: {
                  ...prev.media,
                  photos: {
                    ...prev.media.photos,
                    ...photos
                  },
                  videoTour: media.videoTour || null,
                  documents: media.documents
                }
              }));
            }}
          />
        </div>
      )
    }
  ];

  const handleNext = () => {
    // if (validateCurrentStep()) {
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
    // } else {
    //   toast.error('Please fix the errors in the form before proceeding');
    // }
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    // Validate the final step before submission
    // if (!validateCurrentStep()) {
    //   toast.error('Please fill in all required fields');
    //   return;
    // }
    console.log(formData);

    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

        // Convert media files to base64
        const convertedMedia = {
          photos: {
            exterior: await Promise.all((formData.media?.photos?.exterior ?? []).map(convertFileToBase64)),
            interior: await Promise.all((formData.media?.photos?.interior ?? []).map(convertFileToBase64)),
            floorPlan: await Promise.all((formData.media?.photos?.floorPlan ?? []).map(convertFileToBase64)),
            washrooms: await Promise.all((formData.media?.photos?.washrooms ?? []).map(convertFileToBase64)),
            lifts: await Promise.all((formData.media?.photos?.lifts ?? []).map(convertFileToBase64)),
            emergencyExits: await Promise.all((formData.media?.photos?.emergencyExits ?? []).map(convertFileToBase64))
          },
          videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
          documents: await Promise.all((formData.media?.documents ?? []).map(convertFileToBase64))
        };

        // Transform the data to match the expected format for the database
        const transformedData = {
          basicInformation: {
            ...formData.basicInformation,
            Type: formData.basicInformation.Type
          },
          spaceDetails: {
            totalArea: formData.spaceDetails.totalArea,
            areaUnit: formData.spaceDetails.areaUnit,
            coveredArea: formData.spaceDetails.coveredArea,
            openArea: formData.spaceDetails.openArea,
            roadWidth: formData.spaceDetails.roadWidth.value || 0,
            roadWidthUnit: formData.spaceDetails.roadWidth.unit,
            ceilingHeight: formData.spaceDetails.ceilingHeight.value || 0,
            ceilingHeightUnit: formData.spaceDetails.ceilingHeight.unit,
            noOfOpenSides: formData.spaceDetails.noOfOpenSides
          },
          propertyDetails: {
            area: {
              totalArea: formData.propertyDetails.area.totalArea || 0,
              builtUpArea: formData.propertyDetails.area.builtUpArea || 0,
              carpetArea: formData.propertyDetails.area.carpetArea || 0
            },
            floor: {
              floorNumber: formData.propertyDetails.floor.floorNumber || 0,
              totalFloors: formData.propertyDetails.floor.totalFloors || 0
            },
            facingDirection: formData.propertyDetails.facingDirection,
            furnishingStatus: formData.propertyDetails.furnishingStatus,
            propertyAmenities: formData.propertyDetails.propertyAmenities,
            wholeSpaceAmenities: formData.propertyDetails.wholeSpaceAmenities,
            electricitySupply: {
              powerLoad: formData.propertyDetails.electricitySupply.powerLoad || 0,
              backup: formData.propertyDetails.electricitySupply.backup
            },
            waterAvailability: formData.propertyDetails.waterAvailability,
            propertyAge: formData.propertyDetails.propertyAge || '',
            propertyCondition: formData.propertyDetails.propertyCondition
          },
          rentalTerms: formData.rentalTerms,
          brokerage: formData.brokerage,
          availability: {
            date: formData.availability.date,
            type: formData.availability.type
          },
          contactInformation: formData.contactInformation,
          media: convertedMedia,
          metadata: {
            createdBy: author,
          }
        };

        // Send the data to the backend
        const token = JSON.parse(user).token;
        const response = await axios.post(
          `/api/commercial/rent/covered-space`,
          transformedData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success('Commercial covered space listing created successfully!');
        } else {
          toast.error(response.data.error || 'Failed to create listing. Please try again.');
        }
      } else {
        navigate('/login');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.details || 'Failed to create commercial covered space listing. Please try again.';
      toast.error("Please fill all details!");
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
                    // Scroll to top of the form when clicking on progress indicators
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Rent Commercial Covered Space</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep].content}
      </div>

      {/* Navigation Buttons */}
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
  );
};

export default RentCoveredSpace;


