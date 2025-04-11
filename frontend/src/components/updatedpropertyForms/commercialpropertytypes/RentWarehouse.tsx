import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import WarehouseType from '../CommercialComponents/WarehouseType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import WarehouseDetails from '../CommercialComponents/WarehouseDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { MapPin, Building2, DollarSign, Calendar, User, Image, Warehouse, ImageIcon, UserCircle } from 'lucide-react';

const RentWarehouse = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    warehouseType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    warehouseDetails: {},
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
    availability: {},
    contactDetails: {},
    media: { photos: [], video: null }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const formSections = [
    {
      title: 'Basic Information',
      icon: <MapPin className="w-6 h-6" />,
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <Warehouse className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-black">Basic Details</h3>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <PropertyName
                propertyName={formData.propertyName}
                onPropertyNameChange={(name) => setFormData({ ...formData, propertyName: name })}
              />
              <Warehouse className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
            </div>
            <WarehouseType
              onWarehouseTypeChange={(type) => setFormData({ ...formData, warehouseType: type })}
            />
            <CommercialPropertyAddress
              onAddressChange={(address) => setFormData({ ...formData, address })}
            />
            <div className="relative">
              <Landmark
                onLandmarkChange={(landmark) => setFormData({ ...formData, landmark })}
              />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
            </div>
            
            <div className="flex items-center space-x-2 cursor-pointer">
              <CornerProperty
                onCornerPropertyChange={(isCorner) => setFormData({ ...formData, isCornerProperty: isCorner })}
              />
              <span className="text-black">This is a corner property</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-6 h-6" />,
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <Building2 className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <div className="space-y-6">
            <WarehouseDetails
              onDetailsChange={(details) => setFormData({ ...formData, warehouseDetails: details })}
            />
            <CommercialPropertyDetails
              onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Rental Terms',
      icon: <DollarSign className="w-6 h-6" />,
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <DollarSign className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-black">Rental Terms</h3>
          </div>
          <div className="space-y-6">
            <Rent onRentChange={(rent) => setFormData({ ...formData, rent })} />
            {formData.rent.rentType === 'exclusive' && (
              <MaintenanceAmount
                onMaintenanceAmountChange={(maintenance) => setFormData({ ...formData, maintenanceAmount: maintenance })}
              />
            )}
            <SecurityDeposit
              onSecurityDepositChange={(deposit) => setFormData({ ...formData, securityDeposit: deposit })}
            />
            <OtherCharges
              onOtherChargesChange={(charges) => setFormData({ ...formData, otherCharges: charges })}
            />
            <Brokerage
              onBrokerageChange={(brokerage) => setFormData({ ...formData, brokerage })}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <Calendar className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-black">Availability</h3>
          </div>
          <div className="space-y-6">
            <AvailabilityDate
              onAvailabilityChange={(availability) => setFormData({ ...formData, availability })}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <User className="w-6 h-6" />,
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <UserCircle className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-black">Contact Details</h3>
          </div>
          <div className="space-y-6">
            <CommercialContactDetails
              onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Property Media',
      icon: <Image className="w-6 h-6" />,
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <ImageIcon className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-black">Property Media</h3>
          </div>
          <div className="space-y-6">
            <CommercialMediaUpload
              onMediaChange={(media) => setFormData({ ...formData, media })}
            />
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
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
                {s.icon}
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
        {currentStep < formSections.length - 1 ? (
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

export default RentWarehouse;
