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
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define media type to match CommercialMediaUpload component
type MediaFileType = { url: string; file: File };

type MediaType = {
  photos: File[];
  video: File | null;
  images: { category: string; files: MediaFileType[] }[];
  documents: { type: string; file: File }[];
};

const SellPlot = () => {
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
  const formRef = useRef<HTMLDivElement>(null);

  // Define form steps
  const steps = [
    {
      title: 'Basic Information',
      content: (
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
          <Landmark
            onLandmarkChange={(landmark) => setFormData({ ...formData, landmark })}
          />
          <MapCoordinates
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            onLatitudeChange={(lat) => setFormData({ ...formData, coordinates: { ...formData.coordinates, latitude: lat } })}
            onLongitudeChange={(lng) => setFormData({ ...formData, coordinates: { ...formData.coordinates, longitude: lng } })}
          />
          <CornerProperty
            onCornerPropertyChange={(isCorner) => setFormData({ ...formData, isCornerProperty: isCorner })}
          />
        </>
      )
    },
    {
      title: 'Property Details',
      content: (
        <>
          <PlotDetails
            onDetailsChange={(details) => setFormData({ ...formData, plotDetails: details })}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
          />
        </>
      )
    },
    {
      title: 'Pricing Details',
      content: (
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
      )
    },
    {
      title: 'Availability',
      content: (
        <CommercialAvailability
          onAvailabilityChange={(availability) => setFormData({ ...formData, availability })}
        />
      )
    },
    {
      title: 'Contact Information',
      content: (
        <CommercialContactDetails
          onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })}
        />
      )
    },
    {
      title: 'Property Media',
      content: (
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
      )
    }
  ];

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <div ref={formRef} className="space-y-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your plot property</p>
        </div>
        <div className="space-y-8">{steps[currentStep].content}</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          {currentStep > 0 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg border border-black/20 bg-white text-black hover:bg-black hover:text-white transition-all duration-200"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
          ) : (
            <div></div> /* Empty div to maintain layout when no Previous button */
          )}

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
              onClick={handleNext}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              List Property
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SellPlot;
