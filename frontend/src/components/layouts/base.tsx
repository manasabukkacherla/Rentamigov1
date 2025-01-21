import React, { useState } from 'react';
import { PropertyForm, FormData } from "./PropertyForm";
import { PropertyLocation, LocationData } from './PropertyLocation';
import { PropertyFeatures, FeaturesData } from './PropertyFeatures';
import { SocietyAmenities, AmenitiesData } from './SocietyAmenities';
import { FlatAmenities, FlatAmenitiesData } from './FlatAmenities';
import { PropertyRestrictions, RestrictionsData } from './PropertyRestrictions';
import { PropertyCommercials, CommercialsData } from './PropertyCommercials';
import { PropertyAvailability, AvailabilityData } from './PropertyAvailability';
import { PropertyPhotos, PhotoData } from './PropertyPhotos';
import { ArrowRight, ArrowLeft } from 'lucide-react';

function Base() {
  const [activeStep, setActiveStep] = useState<'form' | 'location' | 'features' | 'amenities' | 'flatAmenities' | 'restrictions' | 'commercials' | 'availability' | 'photos'>('form');
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
    selectedAmenities: []
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

  const handleNext = () => {
    if (activeStep === 'form') {
      setActiveStep('location');
    } else if (activeStep === 'location') {
      setActiveStep('features');
    } else if (activeStep === 'features') {
      setActiveStep('amenities');
    } else if (activeStep === 'amenities') {
      setActiveStep('flatAmenities');
    } else if (activeStep === 'flatAmenities') {
      setActiveStep('restrictions');
    } else if (activeStep === 'restrictions') {
      setActiveStep('commercials');
    } else if (activeStep === 'commercials') {
      setActiveStep('availability');
    } else if (activeStep === 'availability') {
      setActiveStep('photos');
    }
  };

  const handlePrevious = () => {
    if (activeStep === 'location') {
      setActiveStep('form');
    } else if (activeStep === 'features') {
      setActiveStep('location');
    } else if (activeStep === 'amenities') {
      setActiveStep('features');
    } else if (activeStep === 'flatAmenities') {
      setActiveStep('amenities');
    } else if (activeStep === 'restrictions') {
      setActiveStep('flatAmenities');
    } else if (activeStep === 'commercials') {
      setActiveStep('restrictions');
    } else if (activeStep === 'availability') {
      setActiveStep('commercials');
    } else if (activeStep === 'photos') {
      setActiveStep('availability');
    }
  };

  return (
    <div className="p-4">
      <div className="w-full max-w-4xl space-y-8">
        {activeStep === 'form' && (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Property Details</h1>
            <PropertyForm formData={formData} setFormData={setFormData} />
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeStep === 'location' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Property Location</h2>
            <PropertyLocation locationData={locationData} setLocationData={setLocationData} />
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeStep === 'features' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Property Features</h2>
            <PropertyFeatures featuresData={featuresData} setFeaturesData={setFeaturesData} />
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeStep === 'amenities' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Society Amenities</h2>
            <SocietyAmenities amenitiesData={amenitiesData} setAmenitiesData={setAmenitiesData} />
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeStep === 'flatAmenities' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Flat Amenities</h2>
            <FlatAmenities amenitiesData={flatAmenitiesData} setAmenitiesData={setFlatAmenitiesData} />
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeStep === 'restrictions' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Property Restrictions</h2>
            <PropertyRestrictions restrictionsData={restrictionsData} setRestrictionsData={setRestrictionsData} />
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeStep === 'commercials' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Property Commercials</h2>
            <PropertyCommercials commercialsData={commercialsData} setCommercialsData={setCommercialsData} />
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeStep === 'availability' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Property Availability</h2>
            <PropertyAvailability availabilityData={availabilityData} setAvailabilityData={setAvailabilityData} />
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeStep === 'photos' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Property Photos</h2>
            <PropertyPhotos photoData={photoData} setPhotoData={setPhotoData} />
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Base;