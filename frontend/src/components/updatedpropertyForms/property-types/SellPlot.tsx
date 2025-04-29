import React, { useState, useRef } from 'react';
import PropertyName from '../PropertyName';
import PlotType from '../CommercialComponents/PlotType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import PlotDetails from '../CommercialComponents/PlotDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Price from '../sell/Price';
import PricePerSqft from '../sell/PricePerSqft';
import RegistrationCharges from '../sell/RegistrationCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { Building2, Home, IndianRupee, Calendar, MapPin, Image, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import MapLocation from '../CommercialComponents/MapLocation';

type MediaFileType = { url: string; file: File };

type MediaType = {
  photos: File[];
  video: File | null;
  images: { category: string; files: MediaFileType[] }[];
  documents: { type: string; file: File }[];
};

type SellPlotProps = {
  propertyId?: string;
  onSubmit?: (formData: any) => void;
};

const SellPlot = ({ propertyId, onSubmit }: SellPlotProps) => {
  const [formData, setFormData] = useState({
    propertyName: '',
    plotType: [] as string[],
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    plotDetails: {},
    propertyDetails: {},
    price: '',
    area: {
      totalArea: 0,
      builtUpArea: 0,
      carpetArea: 0
    },
    registrationCharges: {},
    brokerage: {},
    availability: {},
    contactDetails: {},
    media: {
      photos: [] as File[],
      video: null as File | null,
      images: [
        { category: 'exterior', files: [] as MediaFileType[] },
        { category: 'interior', files: [] as MediaFileType[] },
        { category: 'floorPlan', files: [] as MediaFileType[] },
        { category: 'washrooms', files: [] as MediaFileType[] },
        { category: 'lifts', files: [] as MediaFileType[] },
        { category: 'emergencyExits', files: [] as MediaFileType[] }
      ],
      documents: [] as { type: string; file: File }[]
    } as MediaType
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => {
      const keys = key.split('.');
      if (keys.length > 1) {
        const newData = { ...prev };
        let current: Record<string, any> = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
      }
      return { ...prev, [key]: value };
    });
  };

  // Define form steps
  const formSections = [
    {
      title: 'Basic Information',
      component: (
        <>
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) => setFormData({ ...formData, propertyName: name })}
          />
          <PlotType
            onPlotTypeChange={(types) => setFormData({ ...formData, plotType: types })}
          />
          <CommercialPropertyAddress
            onAddressChange={(address) => setFormData({ ...formData, address })}
          />
          <MapLocation
            latitude={formData.coordinates.latitude.toString()}
            longitude={formData.coordinates.longitude.toString()}
            onLocationChange={(location) => handleChange('coordinates', location)}
            onAddressChange={(address) => handleChange('address', address)} 
            onLandmarkChange={(landmark) => handleChange('landmark', landmark)}
          />

          <CornerProperty
            onCornerPropertyChange={(isCorner) => setFormData({ ...formData, isCornerProperty: isCorner })}
          />
        </>
      ),
      icon: <Building2 className="w-6 h-6" />
    },
    {
      title: 'Property Details',
      component: (
        <>
          <PlotDetails
            onDetailsChange={(details) => setFormData({ ...formData, plotDetails: details })}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
          />
        </>
      ),
      icon: <Home className="w-6 h-6" />
    },
    {
      title: 'Pricing Details',
      component: (
        <>
          <Price
            onPriceChange={(price) => setFormData({ ...formData, price: price.amount })}
          />
          <PricePerSqft
            propertyPrice={Number(formData.price) || 0}
            Area={formData.area}
          />
          <RegistrationCharges
            onRegistrationChargesChange={(charges) => setFormData({ ...formData, registrationCharges: charges })}
          />
          <Brokerage
            onBrokerageChange={(brokerage) => setFormData({ ...formData, brokerage })}
          />
        </>
      ),
      icon: <IndianRupee className="w-6 h-6" />
    },
    {
      title: 'Availability',
      component: (
        <CommercialAvailability
          onAvailabilityChange={(availability) => setFormData({ ...formData, availability })}
        />
      ),
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: 'Contact Information',
      component: (
        <CommercialContactDetails
          onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })}
        />
      ),
      icon: <MapPin className="w-6 h-6" />
    },
    {
      title: 'Property Media',
      component: (
        <CommercialMediaUpload
          onMediaChange={(mediaData) => {
            setFormData({
              ...formData,
              media: {
                photos: mediaData.images.flatMap(cat => cat.files.map(f => f.file)),
                video: mediaData.video?.file || null,
                images: mediaData.images,
                documents: mediaData.documents
              } as MediaType
            });
          }}
        />
      ),
      icon: <Image className="w-6 h-6" />
    }
  ];

  // Navigation handlers
  const handleNext = () => {
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
    } else {
      onSubmit?.(formData);
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

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    if (i < currentStep) {
                      setCurrentStep(i);
                      setTimeout(() => {
                        if (formRef.current) {
                          window.scrollTo({
                            top: formRef.current.offsetTop - 100,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    }
                  }}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${i <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {s.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${i <= currentStep
                      ? 'text-black'
                      : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {s.title}
                    </span>
                  </div>
                  {i < formSections.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className={`w-12 h-1 transition-colors duration-200 ${i < currentStep ? 'bg-black' : 'bg-gray-200'
                        }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your plot property</p>
        </div>
        <div className="space-y-8">{formSections[currentStep].component}</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          {currentStep > 0 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg border border-black/20 bg-white text-black transition-all duration-200"
              onClick={handlePrevious}
              disabled={loading}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
          ) : (
            <div></div> /* Empty div to maintain layout when no Previous button */
          )}

          {currentStep < formSections.length - 1 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white transition-all duration-200"
              onClick={handleNext}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white transition-all duration-200"
              onClick={() => onSubmit?.(formData)}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Submitting...
                </>
              ) : (
                <>
                  List Property
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SellPlot;
