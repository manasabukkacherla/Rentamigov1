import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropertyName from '../PropertyName';
import ShopType from '../CommercialComponents/ShopType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShopDetails from '../CommercialComponents/ShopDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Price from '../sell/Price';
import PricePerSqft from '../sell/PricePerSqft';
import RegistrationCharges from '../sell/RegistrationCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon, Calendar, DollarSign } from "lucide-react"
import { toast } from 'react-toastify';

const globalStyles = `
  input::placeholder,
  textarea::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
  
  /* Make radio button and checkbox text black */
  input[type="radio"] + label,
  input[type="checkbox"] + label {
    color: black;
  }
  
  /* Make select placeholder text black */
  select {
    color: black;
  }
  
  /* Make all form labels black */
  label {
    color: black;
  }
  
  /* Make all input text black */
  input,
  textarea,
  select {
    color: black;
  }
`;

interface FormData {
  basicInformation: {
    title: string;
    shopType: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    }
    landmark: string;
    location: {
      latitude: string;
      longitude: string;
    };
    isCornerProperty: boolean;
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
    propertyAge: number;
    propertyCondition: string;
  };
  shopDetails: {
    frontageWidth: number;
    heightOfShop: number;
    displayWindow: boolean;
    attachedStorageRoom: boolean;
    averageFootTraffic: string;
    customerParking: boolean;
    previousBusiness: string;
  };
  pricingDetails: {
    propertyPrice: number;
    pricetype: string;
    area: number;
    totalprice: number;
    pricePerSqft: number;
  };
  registration: {
    chargestype: string;
    registrationAmount: number;
    stampDutyAmount: number;
  };
  brokerage: {
    required: string;
    amount: number;
  };
  availability: {
    availableFrom: Date;
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

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

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

const validatePrice = (price: number) => {
  return price > 0;
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

const SellShopMain = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
      shopType: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      landmark: '',
      location: {
        latitude: '',
        longitude: ''
      },
      isCornerProperty: false,
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
      propertyAge: 0,
      propertyCondition: ''
    },
    shopDetails: {
      frontageWidth: 0,
      heightOfShop: 0,
      displayWindow: false,
      attachedStorageRoom: false,
      averageFootTraffic: '',
      customerParking: false,
      previousBusiness: ''
    },
    pricingDetails: {
      propertyPrice: 0,
      pricetype: "fixed",
      area: 0,
      totalprice: 0,
      pricePerSqft: 0
    },
    registration: {
      chargestype: '',
      registrationAmount: 0,
      stampDutyAmount: 0,
    },
    brokerage: {
      required: 'no',
      amount: 0
    },
    availability: {
      availableFrom: new Date(),
      availableImmediately: false,
      leaseDuration: '',
      noticePeriod: '',
      petsAllowed: false,
      operatingHours: {
        restricted: false,
        restrictions: ''
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
      videoTour: null,
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

        if (!formData.basicInformation.shopType) {
          errors.shopType = 'Shop type is required';
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
      
      case 1: // Property Details
        if (!formData.propertyDetails.area.totalArea) {
          errors.totalArea = 'Total area is required';
        } else if (!validateArea(formData.propertyDetails.area.totalArea)) {
          errors.totalArea = 'Total area must be greater than 0';
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
        } else if (formData.propertyDetails.propertyAge < 0) {
          errors.propertyAge = 'Property age cannot be negative';
        }

        if (!formData.propertyDetails.propertyCondition) {
          errors.propertyCondition = 'Property condition is required';
        }
        break;
      
      case 2: // Pricing Details
        if (!formData.pricingDetails.propertyPrice) {
          errors.propertyPrice = 'Property price is required';
        } else if (!validatePrice(formData.pricingDetails.propertyPrice)) {
          errors.propertyPrice = 'Property price must be greater than 0';
        }

        if (!formData.pricingDetails.pricetype) {
          errors.pricetype = 'Price type is required';
        }

        if (!formData.pricingDetails.area) {
          errors.area = 'Area is required';
        } else if (!validateArea(formData.pricingDetails.area)) {
          errors.area = 'Area must be greater than 0';
        }

        if (!formData.pricingDetails.totalprice) {
          errors.totalprice = 'Total price is required';
        } else if (!validatePrice(formData.pricingDetails.totalprice)) {
          errors.totalprice = 'Total price must be greater than 0';
        }
        break;
      
      case 3: // Availability
        if (!formData.availability.availableFrom) {
          errors.availableFrom = 'Available from date is required';
        }

        if (!formData.availability.leaseDuration) {
          errors.leaseDuration = 'Lease duration is required';
        }

        if (!formData.availability.noticePeriod) {
          errors.noticePeriod = 'Notice period is required';
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

  const formSections = [
    {
      title: 'Basic Information',
      icon: <Store className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Store className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <div className="space-y-6">
            <PropertyName 
              propertyName={formData.basicInformation.title} 
              onPropertyNameChange={(name) => handleChange('basicInformation.title', name)}
            />
            <ShopType 
              onShopTypeChange={(type) => handleChange('basicInformation.shopType', type)}
            />
            <CommercialPropertyAddress 
              onAddressChange={(address) => handleChange('basicInformation.address', address)}
            />
            <Landmark
              onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
              onLocationSelect={(location) => handleChange('basicInformation.location', location)}
            />
            <CornerProperty 
              onCornerPropertyChange={(isCorner) => handleChange('basicInformation.isCornerProperty', isCorner)} 
            />
          </div>
        </div>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <div className="space-y-6">
            <ShopDetails 
              onDetailsChange={(details) => handleChange('shopDetails', details)}
            />
            <CommercialPropertyDetails 
              onDetailsChange={(details) => handleChange('propertyDetails', details)}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Pricing Details',
      icon: <DollarSign className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Pricing Details</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Price Information</h4>
              <div className="space-y-4 text-black">
                <Price onPriceChange={(price) => handleChange('pricingDetails', price)} />
                <PricePerSqft
                  propertyPrice={formData.pricingDetails.propertyPrice}
                  Area={formData.propertyDetails.area}
                  onPricePerSqftChange={(data) => {
                    setFormData(prev => ({
                      ...prev,
                      pricingDetails: {
                        ...prev.pricingDetails,
                        area: data.area,
                        totalprice: data.totalprice,
                        pricePerSqft: data.pricePerSqft
                      }
                    }));
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Additional Charges</h4>
              <div className="space-y-4 text-black">
                <div className="text-black">
                  <RegistrationCharges onRegistrationChargesChange={(charges) => handleChange('registration', charges)} />
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="text-black">
                  <Brokerage onBrokerageChange={(brokerage) => handleChange('brokerage', brokerage)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Availability</h3>
          </div>
          <CommercialAvailability onAvailabilityChange={(availability) => handleChange('availability', availability)} />
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <UserCircle className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <UserCircle className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Contact Information</h3>
          </div>
          <CommercialContactDetails onContactChange={(contact) => handleChange('contactInformation', contact)} />
        </div>
      )
    },
    {
      title: 'Property Media',
      icon: <ImageIcon className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Media</h3>
          </div>
          <CommercialMediaUpload
            onMediaChange={(mediaUpdate) => {
              const convertedPhotos: any = {};

              mediaUpdate.images.forEach(({ category, files }) => {
                convertedPhotos[category] = files.map(f => f.file);
              });

              handleChange('media', {
                photos: {
                  ...formData.media.photos,
                  ...convertedPhotos
                },
                videoTour: mediaUpdate.video?.file || null,
                documents: mediaUpdate.documents.map(d => d.file)
              });
            }}
          />
        </div>
      )
    }
  ];

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

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

        // Convert all media files to base64
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
        console.log(formData)

        const transformedData = {
          ...formData,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date()
          }
        };


        console.log(transformedData);
        const response = await axios.post('/api/commercial-shops', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)

        if (response.data.success) {
          // Show success message and redirect
          toast.success('Commercial shop listing created successfully!');
          // navigate('/dashboard'); // Redirect to dashboard or appropriate page
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial shop listing. Please try again.');
    }
  };

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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to continue</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{globalStyles}</style>

      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => setCurrentStep(index)}
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

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
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

export default SellShopMain;
