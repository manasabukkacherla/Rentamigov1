import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import WarehouseType from '../CommercialComponents/WarehouseType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import WarehouseDetails from '../CommercialComponents/WarehouseDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { MapPin, Building2, DollarSign, Calendar, User, Image, Store, ImageIcon, UserCircle } from 'lucide-react';

interface MediaType {
  images: { category: string; files: { url: string; file: File; }[]; }[];
  video?: { url: string; file: File; };
  documents: { type: string; file: File; }[];
}

const LeaseWarehouseMain = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    warehouseType: [] as string[],
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    warehouseDetails: {},
    propertyDetails: {},
    leaseAmount: {},
    leaseTenure: {},
    maintenanceAmount: {},
    otherCharges: {},
    brokerage: {},
    availability: {},
    contactDetails: {},
    media: {
      images: [] as { category: string; files: { url: string; file: File; }[]; }[],
      video: undefined,
      documents: [] as { type: string; file: File; }[]
    } as MediaType
  });

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Basic Information",
      icon: <MapPin className="w-6 h-6" />,
      component: (
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Store className="text-black mr-2" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Basic Details</h3>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <PropertyName propertyName={formData.propertyName} onPropertyNameChange={(name) => setFormData(prev => ({ ...prev, propertyName: name }))} />
                <Store className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
              </div>
              <WarehouseType onWarehouseTypeChange={(type) => setFormData(prev => ({ ...prev, warehouseType: type }))} />
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <MapPin className="text-black mr-2" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Location Details</h3>
            </div>
            <div className="space-y-6">
              <CommercialPropertyAddress onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))} />
              <div className="relative">
                <Landmark onLandmarkChange={(landmark) => setFormData(prev => ({ ...prev, landmark }))} />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
              </div>
              <MapCoordinates
                latitude={formData.coordinates.latitude}
                longitude={formData.coordinates.longitude}
                onLatitudeChange={(lat) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, latitude: lat } }))}
                onLongitudeChange={(lng) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, longitude: lng } }))}
              />
              <div className="flex items-center space-x-2 cursor-pointer">
                <CornerProperty onCornerPropertyChange={(isCorner) => setFormData(prev => ({ ...prev, isCornerProperty: isCorner }))} />
                <span className="text-black">This is a corner property</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-6 h-6" />,
      component: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <Building2 className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Property Details</h3>
          </div>
          <div className="space-y-6">
            <WarehouseDetails onDetailsChange={(details) => setFormData(prev => ({ ...prev, warehouseDetails: details }))} />
            <CommercialPropertyDetails onDetailsChange={(details) => setFormData(prev => ({ ...prev, propertyDetails: details }))} />
          </div>
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-6 h-6" />,
      component: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <DollarSign className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Lease Terms</h3>
          </div>
          <div className="space-y-6">
            <LeaseAmount onLeaseAmountChange={(amount) => setFormData(prev => ({ ...prev, leaseAmount: amount }))} />
            <LeaseTenure onLeaseTenureChange={(tenure) => setFormData(prev => ({ ...prev, leaseTenure: tenure }))} />
            <MaintenanceAmount onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({ ...prev, maintenanceAmount: maintenance }))} />
            <OtherCharges onOtherChargesChange={(charges) => setFormData(prev => ({ ...prev, otherCharges: charges }))} />
            <Brokerage onBrokerageChange={(brokerage) => setFormData(prev => ({ ...prev, brokerage }))} />
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <Calendar className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Availability</h3>
          </div>
          <div className="space-y-6">
            <CommercialAvailability onAvailabilityChange={(availability) => setFormData(prev => ({ ...prev, availability }))} />
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <User className="w-6 h-6" />,
      component: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <UserCircle className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Contact Details</h3>
          </div>
          <div className="space-y-6">
            <CommercialContactDetails onContactChange={(contact) => setFormData(prev => ({ ...prev, contactDetails: contact }))} />
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-6 h-6" />,
      component: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <ImageIcon className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Property Media</h3>
          </div>
          <div className="space-y-6">
            <CommercialMediaUpload onMediaChange={(media: MediaType) => setFormData(prev => ({ ...prev, media }))} />
          </div>
        </div>
      ),
    },
  ];

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

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, i) => (
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
                {s.icon}
              </div>
              <span className="text-xs font-medium">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-1 rounded-full">
          <div
            className="bg-black text-black h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep].title}</h2>
      </div>

      {steps[currentStep].component}

      <div className="mt-8 flex justify-between items-center">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="flex items-center px-6 py-3 text-black border-2 border-gray-300 rounded-lg hover:border-black transition-colors duration-200"
          >
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto"
          >
            List Property
          </button>
        )}
      </div>
    </form>
  );
};

export default LeaseWarehouseMain;

