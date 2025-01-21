import React, { useState, useEffect } from 'react';
import { PropertyForm, FormData } from './PropertyForm';
import { PropertyLocation, LocationData } from './PropertyLocation';
import { PropertyFeatures, FeaturesData } from './PropertyFeatures';
import { SocietyAmenities, AmenitiesData } from './SocietyAmenities';
import { FlatAmenities, FlatAmenitiesData } from './FlatAmenities';
import { PropertyRestrictions, RestrictionsData } from './PropertyRestrictions';
import { PropertyCommercials, CommercialsData } from './PropertyCommercials';
import { PropertyAvailability, AvailabilityData } from './PropertyAvailability';
import { PropertyPhotos, PhotoData } from './PropertyPhotos';
import { PreviewModal } from "./Previewmodal";
import { ArrowRight, ArrowLeft, Home, MapPin, Building2, Dumbbell, Sofa, Ban, IndianRupee, Calendar, Image, Eye, Menu } from 'lucide-react';

type StepType = 'form' | 'location' | 'features' | 'amenities' | 'flatAmenities' | 'restrictions' | 'commercials' | 'availability' | 'photos';

const steps: { id: StepType; label: string; icon: React.ElementType }[] = [
  { id: 'form', label: 'Basic Details', icon: Home },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'features', label: 'Features', icon: Building2 },
  { id: 'amenities', label: 'Society Amenities', icon: Dumbbell },
  { id: 'flatAmenities', label: 'Flat Amenities', icon: Sofa },
  { id: 'restrictions', label: 'Restrictions', icon: Ban },
  { id: 'commercials', label: 'Commercials', icon: IndianRupee },
  { id: 'availability', label: 'Availability', icon: Calendar },
  { id: 'photos', label: 'Photos', icon: Image },
];

function Base() {
  const [activeStep, setActiveStep] = useState<StepType>('form');
  const [showPreview, setShowPreview] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    propertyType: '',
    propertyConfiguration: '',
    furnishingStatus: '',
    facing: ''
  });

  const [locationData, setLocationData] = useState<LocationData>({
    propertyName: '',
    flatNo: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    latitude: '',
    longitude: '',
    locality: '',
    area: '',
    pinCode: ''
  });

  const [featuresData, setFeaturesData] = useState<FeaturesData>({
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    extraRooms: [],
    floorNumber: '',
    totalFloors: '',
    superBuiltupArea: '',
    builtupArea: '',
    carpetArea: '',
    propertyAge: ''
  });

  const [amenitiesData, setAmenitiesData] = useState<AmenitiesData>({
    selectedAmenities: [],
    powerBackupType: undefined
  });

  const [flatAmenitiesData, setFlatAmenitiesData] = useState<FlatAmenitiesData>({
    selectedAmenities: []
  });

  const [restrictionsData, setRestrictionsData] = useState<RestrictionsData>({
    bachelorTenants: '',
    nonVegTenants: '',
    tenantWithPets: '',
    propertyOverlooking: '',
    carParking: '',
    carParkingCount: '',
    twoWheelerParking: '',
    twoWheelerParkingCount: '',
    flooringType: ''
  });

  const [commercialsData, setCommercialsData] = useState<CommercialsData>({
    monthlyRent: '',
    maintenance: '',
    maintenanceAmount: '',
    securityDeposit: ''
  });

  const [availabilityData, setAvailabilityData] = useState<AvailabilityData>({
    availableFrom: ''
  });

  const [photoData, setPhotoData] = useState<PhotoData>({
    coverImage: null,
    exteriorView: null,
    livingRoom: null,
    kitchen: null,
    diningRoom: null,
    bedroom1: null,
    bedroom2: null,
    bedroom3: null,
    bedroom4: null,
    bathroom1: null,
    bathroom2: null,
    bathroom3: null,
    bathroom4: null,
    balcony1: null,
    balcony2: null,
    balcony3: null,
    balcony4: null,
    studyRoom: null,
    pujaRoom: null,
    theaterRoom: null,
    gymRoom: null,
    utilityArea: null,
    others: null,
    propertyVideo: null
  });

  // Effect to scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeStep]);

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === activeStep);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
      setShowMobileMenu(false);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex(step => step.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id);
      setShowMobileMenu(false);
    }
  };

  const handleStepClick = (stepId: StepType) => {
    setActiveStep(stepId);
    setShowMobileMenu(false);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 'form':
        return <PropertyForm formData={formData} setFormData={setFormData} />;
      case 'location':
        return <PropertyLocation locationData={locationData} setLocationData={setLocationData} />;
      case 'features':
        return <PropertyFeatures featuresData={featuresData} setFeaturesData={setFeaturesData} />;
      case 'amenities':
        return <SocietyAmenities amenitiesData={amenitiesData} setAmenitiesData={setAmenitiesData} />;
      case 'flatAmenities':
        return <FlatAmenities amenitiesData={flatAmenitiesData} setAmenitiesData={setFlatAmenitiesData} />;
      case 'restrictions':
        return <PropertyRestrictions restrictionsData={restrictionsData} setRestrictionsData={setRestrictionsData} />;
      case 'commercials':
        return <PropertyCommercials commercialsData={commercialsData} setCommercialsData={setCommercialsData} />;
      case 'availability':
        return <PropertyAvailability availabilityData={availabilityData} setAvailabilityData={setAvailabilityData} />;
      case 'photos':
        return <PropertyPhotos photoData={photoData} setPhotoData={setPhotoData} featuresData={featuresData} />;
      default:
        return null;
    }
  };

  const currentStep = steps.find(step => step.id === activeStep);
  const currentStepIndex = steps.findIndex(step => step.id === activeStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-20 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <span className="font-medium text-gray-800">{currentStep?.label}</span>
            <button
              onClick={() => setShowPreview(true)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Eye className="w-6 h-6" />
            </button>
          </div>
          <div className="h-1 bg-gray-100">
            <div
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden">
            <div className="bg-white h-full w-3/4 max-w-xs p-4 transform transition-transform">
              <div className="space-y-2">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCurrent = step.id === activeStep;
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(step.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isCurrent
                          ? 'bg-red-50 text-red-500'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <StepIcon className="w-5 h-5" />
                      <span>{step.label}</span>
                      {isCurrent && (
                        <div className="w-2 h-2 rounded-full bg-red-500 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 bg-white shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">Property Details</h1>
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Eye className="w-5 h-5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex border-b bg-white">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCurrent = step.id === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`flex items-center space-x-2 py-4 px-6 border-b-2 transition-colors ${
                  isCurrent
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-500 hover:text-red-500'
                }`}
              >
                <StepIcon className="w-5 h-5" />
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8 mt-14 md:mt-0">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              {renderStepContent()}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-between">
              {activeStep !== 'form' && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}
              {activeStep !== 'photos' && (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors ml-auto"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          onClose={() => setShowPreview(false)}
          formData={formData}
          locationData={locationData}
          featuresData={featuresData}
          amenitiesData={amenitiesData}
          flatAmenitiesData={flatAmenitiesData}
          restrictionsData={restrictionsData}
          commercialsData={commercialsData}
          availabilityData={availabilityData}
          photoData={photoData}
        />
      )}
    </div>
  );
}

export default Base;