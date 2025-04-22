import React, { useEffect, useState } from 'react';
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
import {  DollarSign, Calendar, User, Image,  ImageIcon, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IFormData {
  basicInformation: {
    title: string;
  spaceType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  location: {
    latitude: number;
    longitude: number;
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
        amount?: number;
        type: string;
      };
      electricity: {
        amount?: number;
        type: string;
      };
      gas: {
        amount?: number;
        type: string;
      };
      others: {
        amount?: number;
        type: string;
      };
    };
    brokerage: {
      required: string;
      amount?: number;
    };
    availability: {
      type: 'immediate' | 'specific';
    availableFrom?: string;
    availableImmediately: boolean;
  };
  };
  
  contactInformation: {
    name: string;
    email: string;
    phone: string;
    preferredContactMethod: string;
    responseTime: string;
    alternatePhone: string;
    bestTimeToContact: string;
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
      spaceType: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      landmark: '',
      location: {
        latitude: 0,
        longitude: 0,
      },
      isCornerProperty: false,
    },
    spaceDetails: {
      totalArea: 0,
      areaUnit:'',
      coveredArea: 0,
      openArea: 0,
      roadWidth: {
        value: 0,
        unit:'',
      },
      ceilingHeight: {
        value: 0,
        unit:'',
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
      brokerage: {
        required: 'no',
        amount: 0,
      },
      availability: {
        type: 'immediate',
      availableFrom: '',
      availableImmediately: true,
    },
    },
    
    contactInformation: {
      name: '',
      email: '',
      phone: '',
      preferredContactMethod: '',
      responseTime: '',
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

        if (!formData.basicInformation.spaceType) {
          errors.spaceType = 'Space type is required';
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
        if (!formData.rentalTerms.brokerage.required) {
          errors.brokerage = 'Please select if brokerage is required';
        }

        // Only validate brokerage amount if brokerage is required (yes)
        if (formData.rentalTerms.brokerage.required === 'yes') {
          if (!formData.rentalTerms.brokerage.amount) {
            errors.brokerage = 'Brokerage amount is required when brokerage is yes';
          } else if (formData.rentalTerms.brokerage.amount <= 0) {
            errors.brokerage = 'Brokerage amount must be greater than 0';
          }
        }
        break;

      case 3: // Availability
        if (!formData.rentalTerms.availability.availableFrom) {
          errors.availableFrom = 'Available from date is required';
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

  

  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      const fields = field.split('.');
      const lastField = fields.pop() || '';
  
      const newData = { ...prev };
      let current: any = newData;
  
      for (const field of fields) {
        current = { ...current[field] };
      }
  
      current[lastField] = value;
      return newData;
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
      content: renderFormSection(
        <>
          <PropertyName propertyName={formData.basicInformation.title}
                onPropertyNameChange={(name) => setFormData(prev => ({
                  ...prev,
                  basicInformation: { ...prev.basicInformation, title: name }
                }))}/>
          <CoveredOpenSpaceType onSpaceTypeChange={(types) => setFormData(prev => ({
                ...prev,
                basicInformation: { ...prev.basicInformation, spaceType: types }
              }))} />
          <CommercialPropertyAddress
              onAddressChange={(address) => setFormData(prev => ({
                ...prev,
                basicInformation: { ...prev.basicInformation, address }
              }))}
            />
            <Landmark
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
              />
          <CornerProperty
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
      content: renderFormSection(
        <>
          
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="text-black" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Rental Terms</h3>
          </div>
          <div className="space-y-6">
            <Rent
              onRentChange={(rent) => setFormData(prev => ({
                ...prev,
                rentalTerms: {
                  ...prev.rentalTerms,
                  rentDetails: {
                    expectedRent: rent.expectedRent,
                    isNegotiable: rent.isNegotiable,
                    rentType: rent.rentType
                  }
                }
              }))}
            />
            {formData.rentalTerms.rentDetails.rentType === 'exclusive' && (
              <MaintenanceAmount
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
        </div>
        </>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-6 h-6" />,
      content: renderFormSection(
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-black" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Availability</h3>
          </div>
          <div className="space-y-6">
            <AvailabilityDate
              onAvailabilityChange={(availability) => {
                // For immediate availability, set availableImmediately to true and availableFrom to current date
                if (availability.type === 'immediate') {
                  const currentDate = new Date().toISOString();
                  // Update the rentalTerms.availability object
                  setFormData(prev => ({
                    ...prev,
                    rentalTerms: {
                      ...prev.rentalTerms,
                      availability: {
                        type: 'immediate',
                        availableFrom: currentDate,
                        availableImmediately: true
                      }
                    }
                  }));
                } 
                // For specific date, set availableImmediately to false and availableFrom to user's selected date
                else {
                  const userDate = availability.date || '';
                  // Update the rentalTerms.availability object
                  setFormData(prev => ({
                    ...prev,
                    rentalTerms: {
                      ...prev.rentalTerms,
                      availability: {
                        type: 'specific',
                        availableFrom: userDate,
                        availableImmediately: false
                      }
                    }
                  }));
                }
              }}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <User className="w-6 h-6" />,
      content: renderFormSection(
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <UserCircle className="text-black" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Contact Details</h3>
          </div>
          <div className="space-y-6">
            <CommercialContactDetails
              onContactChange={(contact) => handleChange('contactInformation', contact)}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Property Media',
      icon: <Image className="w-6 h-6" />,
      content: renderFormSection    (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="text-black" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Property Media</h3>
          </div>
          <div className="space-y-6">
            <CommercialMediaUpload
              onMediaChange={(media) => {
                const photos: Record<string, File[]> = {};
                media.images.forEach(({ category, files }) => {
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
                    videoTour: media.video?.file || null,
                    documents: media.documents.map(d => d.file)
                  }
                }));
              }}
            />
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (validateCurrentStep()) {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the final step before submission
    if (!validateCurrentStep()) {
      toast.error('Please fill in all required fields');
      return;
    }

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
            spaceType: formData.basicInformation.spaceType
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
          availability: {
            availableFrom: formData.rentalTerms.availability.availableFrom,
            availableImmediately: formData.rentalTerms.availability.availableImmediately,
            type: formData.rentalTerms.availability.type
          },
          contactInformation: formData.contactInformation,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date()
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
      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-12">
      <div className="space-y-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {formSections.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center ${i <= currentStep ? "text-black" : "text-gray-400"}`}
                onClick={() => i < currentStep && setCurrentStep(i)}
                style={{ cursor: i < currentStep ? "pointer" : "default" }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-xs font-medium">{s.title}</span>
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

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black">{formSections[currentStep].title}</h2>
        </div>

        <div className="space-y-8">{formSections[currentStep].content}</div>
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
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              {currentStep === formSections.length - 1 ? 'Submit' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
    </div>
  );
};

export default RentCoveredSpace;


