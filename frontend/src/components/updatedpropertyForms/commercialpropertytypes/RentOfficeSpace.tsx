import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropertyName from '../PropertyName';
import OfficeSpaceType from '../CommercialComponents/OfficeSpaceType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapSelector from '../MapSelector';
import CornerProperty from '../CommercialComponents/CornerProperty';
import OfficeSpaceDetails from '../CommercialComponents/OfficeSpaceDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { MapPin, Building2, DollarSign, Calendar, ChevronLeft, ChevronRight, Store, ImageIcon, UserCircle } from 'lucide-react';

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

// Error display component for validation errors
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

interface FormData {
  propertyName: string;
  officeType: string;
  address: Record<string, any>;
  landmark: string;
  coordinates: { latitude: string; longitude: string };
  isCornerProperty: boolean;
  officeDetails: Record<string, any>;
  propertyDetails: Record<string, any>;
  rent: {
    expectedRent: string;
    isNegotiable: boolean;
    rentType: string;
  };
  securityDeposit: Record<string, any>;
  maintenanceAmount: Record<string, any>;
  otherCharges: Record<string, any>;
  brokerage: Record<string, any>;
  availability: {
    type: 'immediate' | 'specific';
    date: string;
  };
  contactDetails: Record<string, any>;
  media: {
    photos: File[];
    video: File | null;
  };
}

const RentOfficeSpace = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    officeType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    officeDetails: {},
    propertyDetails: {},
    rent: {
      expectedRent: '',
      isNegotiable: false,
      rentType: ''
    },
    securityDeposit: {},
    maintenanceAmount: {},
    otherCharges: {},
    brokerage: {},
    availability: {
      type: 'immediate',
      date: ''
    },
    contactDetails: {},
    media: { photos: [], video: null }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};
    // Add validation logic here if needed
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderFormSection = (content: React.ReactNode) => (
    <div className="space-y-4">
      <ErrorDisplay errors={formErrors} />
      {content}
    </div>
  );

  const handleOfficeTypeChange = (types: string[]) => {
    if (types && types.length > 0) {
      setFormData({ ...formData, officeType: types[0] });
    }
  };

  const handlePropertyNameChange = (name: string) => {
    setFormData({ ...formData, propertyName: name });
  };

  const handleAddressChange = (address: { street: string; city: string; state: string; zipCode: string; }) => {
    setFormData({ ...formData, address });
  };

  const handleLandmarkChange = (landmark: string) => {
    setFormData({ ...formData, landmark });
  };

  const handleCornerPropertyChange = (isCorner: boolean) => {
    setFormData({ ...formData, isCornerProperty: isCorner });
  };

  const handleOfficeDetailsChange = (details: Record<string, any>) => {
    setFormData({ ...formData, officeDetails: details });
  };

  const handlePropertyDetailsChange = (details: Record<string, any>) => {
    setFormData({ ...formData, propertyDetails: details });
  };

  const handleRentChange = (rent: Record<string, any>) => {
    // Preserve the existing structure while updating with new values
    setFormData(prev => ({
      ...prev,
      rent: {
        expectedRent: rent.expectedRent || prev.rent.expectedRent,
        isNegotiable: rent.isNegotiable !== undefined ? rent.isNegotiable : prev.rent.isNegotiable,
        rentType: rent.rentType || prev.rent.rentType
      }
    }));
  };

  const handleMaintenanceAmountChange = (maintenance: Record<string, any>) => {
    setFormData({ ...formData, maintenanceAmount: maintenance });
  };

  const handleSecurityDepositChange = (deposit: Record<string, any>) => {
    setFormData({ ...formData, securityDeposit: deposit });
  };

  const handleOtherChargesChange = (charges: Record<string, any>) => {
    setFormData({ ...formData, otherCharges: charges });
  };

  const handleBrokerageChange = (brokerage: Record<string, any>) => {
    setFormData({ ...formData, brokerage });
  };

  const handleAvailabilityChange = (availability: { type: 'immediate' | 'specific'; date?: string }) => {
    // Get today's date in ISO format for immediate availability
    const today = new Date().toISOString().split('T')[0];

    setFormData(prev => ({
      ...prev,
      availability: {
        type: availability.type,
        date: availability.type === 'immediate' ? today : (availability.date || '')
      }
    }));
  };

  const handleContactChange = (contact: Record<string, any>) => {
    setFormData({ ...formData, contactDetails: contact });
  };

  const handleMediaChange = (media: {
    images: { category: string; files: { url: string; file: File; }[]; }[];
    video?: { url: string; file: File; } | undefined;
    documents: { type: string; file: File; }[];
  }) => {
    const transformedMedia = {
      photos: [...media.images.flatMap(cat => cat.files.map(f => f.file))],
      video: media.video?.file || null
    };

    // Update media with type safety
    setFormData(prev => ({
      ...prev,
      media: {
        photos: transformedMedia.photos,
        video: transformedMedia.video
      }
    }));
  };

  const formSections = [
    {
      title: 'Basic Information',
      icon: <Store className="w-5 h-5" />,
      content: renderFormSection(
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Store className="w-6 h-6 text-black" />
              <h3 className="text-xl font-semibold text-black">Basic Details</h3>
            </div>
            <div className="space-y-6">
              <PropertyName
                propertyName={formData.propertyName}
                onPropertyNameChange={handlePropertyNameChange}
              />
              <OfficeSpaceType
                onOfficeTypeChange={handleOfficeTypeChange}
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-black" />
              <h3 className="text-xl font-semibold text-black">Location Details</h3>
            </div>
            <div className="space-y-6">
              <CommercialPropertyAddress
                onAddressChange={handleAddressChange}
              />
              <Landmark onLandmarkChange={handleLandmarkChange} />
              {currentStep === 0 && (
                <MapSelector
                  latitude={formData.coordinates.latitude}
                  longitude={formData.coordinates.longitude}
                  onLocationSelect={(lat, lng, address) => {
                    setFormData(prev => ({
                      ...prev,
                      coordinates: {
                        latitude: lat,
                        longitude: lng
                      }
                    }));
                  }}
                />
              )}
              <CornerProperty
                onCornerPropertyChange={handleCornerPropertyChange}
              />
            </div>
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
            <OfficeSpaceDetails
              onDetailsChange={handleOfficeDetailsChange}
            />
            <CommercialPropertyDetails
              onDetailsChange={handlePropertyDetailsChange}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Rental Terms',
      icon: <DollarSign className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Rental Terms</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Rent Information</h4>
              <div className="space-y-4 text-black">
                <Rent onRentChange={handleRentChange} />
                {formData.rent.rentType === 'exclusive' && (
                  <MaintenanceAmount
                    onMaintenanceAmountChange={handleMaintenanceAmountChange}
                  />
                )}
                <SecurityDeposit
                  onSecurityDepositChange={handleSecurityDepositChange}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Additional Charges</h4>
              <div className="space-y-4 text-black">
                <OtherCharges
                  onOtherChargesChange={handleOtherChargesChange}
                />
                <div className="border-t border-gray-200 my-4"></div>
                <Brokerage
                  onBrokerageChange={handleBrokerageChange}
                />
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
          <AvailabilityDate
            onAvailabilityChange={handleAvailabilityChange}
          />
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
            <h3 className="text-xl font-semibold text-black">Contact Details</h3>
          </div>
          <CommercialContactDetails
            onContactChange={handleContactChange}
          />
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
            onMediaChange={handleMediaChange}
          />
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
    setIsSubmitting(true);

    try {
      // Validate coordinates
      if (!formData.coordinates.latitude || !formData.coordinates.longitude) {
        toast.error('Please select a location on the map');
        setIsSubmitting(false);
        return;
      }

      const latitude = parseFloat(formData.coordinates.latitude);
      const longitude = parseFloat(formData.coordinates.longitude);

      if (isNaN(latitude) || isNaN(longitude)) {
        toast.error('Invalid coordinates. Please select a location on the map');
        setIsSubmitting(false);
        return;
      }

      // Format the data according to the backend model
      const formattedData = {
        basicInformation: {
          title: formData.propertyName,
          officeType: [formData.officeType],
          address: formData.address,
          landmark: formData.landmark,
          location: {
            latitude: latitude,
            longitude: longitude
          },
          isCornerProperty: formData.isCornerProperty
        },
        officeDetails: formData.officeDetails,
        propertyDetails: formData.propertyDetails,
        rentalTerms: {
          rentDetails: {
            expectedRent: parseFloat(formData.rent.expectedRent) || 0,
            isNegotiable: formData.rent.isNegotiable,
            rentType: formData.rent.rentType
          },
          securityDeposit: formData.securityDeposit,
          maintenanceAmount: formData.maintenanceAmount,
          otherCharges: formData.otherCharges,
          brokerage: formData.brokerage,
          availability: formData.availability
        },
        availability: {
          availableFrom: formData.availability.date,
          availableImmediately: formData.availability.type === 'immediate'
        },
        contactInformation: formData.contactDetails,
        media: {
          photos: {
            exterior: [],
            interior: [],
            floorPlan: [],
            washrooms: [],
            lifts: [],
            emergencyExits: []
          },
          videoTour: formData.media.video ? URL.createObjectURL(formData.media.video) : '',
          documents: []
        }
      };

      // Submit to backend API
      const response = await fetch('/api/commercial/office-spaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      toast.success('Office space listing created successfully!');
      navigate('/updatePropertyform'); // Redirect to dashboard after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
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
            disabled={isSubmitting}
          >
            {currentStep === formSections.length - 1 ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentOfficeSpace;
