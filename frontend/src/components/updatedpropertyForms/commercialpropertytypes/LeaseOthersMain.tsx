"use client"

import { useState } from "react";
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import PropertyName from '../PropertyName';
import OtherCommercialType from '../CommercialComponents/OtherCommercialType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import OtherPropertyDetails from '../CommercialComponents/OtherPropertyDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

interface FormData {
  propertyName: string;
  commercialType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isCornerProperty: boolean;
  otherDetails: Record<string, any>;
  propertyDetails: Record<string, any>;
  leaseAmount: Record<string, any>;
  leaseTenure: Record<string, any>;
  maintenanceAmount: Record<string, any>;
  otherCharges: Record<string, any>;
  brokerage: Record<string, any>;
  availability: Record<string, any>;
  contactDetails: Record<string, any>;
  media: {
    photos: {
      exterior: File[];
      interior: File[];
      floorPlan: File[];
      aerial: File[];
      surroundings: File[];
      documents: File[];
    };
    videoTour: File | null;
    documents: File[];
  };
}

const LeaseOthersMain = () => {
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    commercialType: [],
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    landmark: '',
    coordinates: {
      latitude: 0,
      longitude: 0
    },
    isCornerProperty: false,
    otherDetails: {},
    propertyDetails: {},
    leaseAmount: {},
    leaseTenure: {},
    maintenanceAmount: {},
    otherCharges: {},
    brokerage: {},
    availability: {},
    contactDetails: {},
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        aerial: [],
        surroundings: [],
        documents: []
      },
      videoTour: null,
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Store className="text-black w-6 h-6" />
              <h3 className="text-xl font-semibold text-black">Basic Details</h3>
            </div>
            <div className="space-y-6">
              <PropertyName
                propertyName={formData.propertyName}
                onPropertyNameChange={(name) => setFormData(prev => ({
                  ...prev,
                  propertyName: name
                }))}
              />
              <OtherCommercialType
                onCommercialTypeChange={(types) => setFormData(prev => ({
                  ...prev,
                  commercialType: types
                }))}
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-black w-6 h-6" />
              <h3 className="text-xl font-semibold text-black">Location Details</h3>
            </div>
            <div className="space-y-6">
              <CommercialPropertyAddress
                onAddressChange={(address) => setFormData(prev => ({
                  ...prev,
                  address
                }))}
              />
              <Landmark
                onLandmarkChange={(landmark) => setFormData(prev => ({
                  ...prev,
                  landmark
                }))}
                onLocationSelect={(location) => setFormData(prev => ({
                  ...prev,
                  coordinates: {
                    latitude: parseFloat(location.latitude),
                    longitude: parseFloat(location.longitude)
                  }
                }))}
              />
              <CornerProperty
                onCornerPropertyChange={(isCorner) => setFormData(prev => ({
                  ...prev,
                  isCornerProperty: isCorner
                }))}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <div className="space-y-6">
            <OtherPropertyDetails
              onDetailsChange={(details) => setFormData(prev => ({
                ...prev,
                otherDetails: { ...prev.otherDetails, ...details }
              }))}
            />
            <CommercialPropertyDetails
              onDetailsChange={(details) => setFormData(prev => ({
                ...prev,
                propertyDetails: { ...prev.propertyDetails, ...details }
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Lease Terms</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Lease Information</h4>
              <div className="space-y-4">
                <LeaseAmount 
                  onLeaseAmountChange={(amount) => setFormData(prev => ({
                    ...prev,
                    leaseAmount: { ...prev.leaseAmount, ...amount }
                  }))} 
                />
                <LeaseTenure 
                  onLeaseTenureChange={(tenure) => setFormData(prev => ({
                    ...prev,
                    leaseTenure: { ...prev.leaseTenure, ...tenure }
                  }))} 
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Additional Charges</h4>
              <div className="space-y-4">
                <MaintenanceAmount 
                  onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({
                    ...prev,
                    maintenanceAmount: { ...prev.maintenanceAmount, ...maintenance }
                  }))} 
                />
                <div className="border-t border-gray-200 my-4"></div>
                <OtherCharges 
                  onOtherChargesChange={(charges) => setFormData(prev => ({
                    ...prev,
                    otherCharges: { ...prev.otherCharges, ...charges }
                  }))} 
                />
                <div className="border-t border-gray-200 my-4"></div>
                <Brokerage 
                  onBrokerageChange={(brokerage) => setFormData(prev => ({
                    ...prev,
                    brokerage: { ...prev.brokerage, ...brokerage }
                  }))} 
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Availability</h3>
          </div>
          <div className="space-y-6">
            <CommercialAvailability
              onAvailabilityChange={(availability) => setFormData(prev => ({
                ...prev,
                availability: { ...prev.availability, ...availability }
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <UserCircle className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Contact Details</h3>
          </div>
          <div className="space-y-6">
            <CommercialContactDetails
              onContactChange={(contact) => setFormData(prev => ({
                ...prev,
                contactDetails: { ...prev.contactDetails, ...contact }
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Property Media</h3>
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
      ),
    },
  ];

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

        const convertedMedia = {
          photos: {
            exterior: await Promise.all((formData.media?.photos?.exterior ?? []).map(convertFileToBase64)),
            interior: await Promise.all((formData.media?.photos?.interior ?? []).map(convertFileToBase64)),
            floorPlan: await Promise.all((formData.media?.photos?.floorPlan ?? []).map(convertFileToBase64)),
            aerial: await Promise.all((formData.media?.photos?.aerial ?? []).map(convertFileToBase64)),
            surroundings: await Promise.all((formData.media?.photos?.surroundings ?? []).map(convertFileToBase64)),
            documents: await Promise.all((formData.media?.photos?.documents ?? []).map(convertFileToBase64))
          },
          videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
          documents: await Promise.all((formData.media?.documents ?? []).map(convertFileToBase64))
        };

        const transformedData = {
          ...formData,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date()
          }
        };

        const response = await axios.post('/api/commercial-other/lease', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          toast.success('Other commercial property lease listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial property lease listing. Please try again.');
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center cursor-pointer"
                  onClick={() => setCurrentStep(i)}
                >
                  <div className="flex flex-col items-center group">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      {s.icon}
                    </div>
                    <span
                      className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                        i <= currentStep ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div
                        className={`w-12 h-1 transition-colors duration-200 ${
                          i < currentStep ? "bg-black" : "bg-gray-200"
                        }`}
                      ></div>
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
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {steps[currentStep].component}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              List Property
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaseOthersMain;
