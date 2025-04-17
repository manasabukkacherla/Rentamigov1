import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropertyName from '../PropertyName';
import ShowroomType from '../CommercialComponents/ShowroomType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShowroomDetails from '../CommercialComponents/ShowroomDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { Home, Building2, DollarSign, Calendar, Phone, Image } from 'lucide-react';

const RentShowroomMain = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    showroomType: '',
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    showroomDetails: {},
    propertyDetails: {},
    rent: {
      expectedRent: '',
      isNegotiable: false,
      securityDeposit: {
        amount: null,
        depositType: 'refundable'
      },
      maintenanceCharges: {
        amount: null,
        frequency: ''
      },
      otherCharges: {
        water: {
          amount: null,
          type: 'inclusive'
        },
        electricity: {
          amount: null,
          type: 'inclusive'
        },
        gas: {
          amount: null,
          type: 'inclusive'
        },
        others: {
          amount: null,
          type: 'inclusive'
        },
        propertyTax: false,
        otherInclusives: []
      }
    },
    brokerage: {
      required: 'no',
      amount: null
    },
    availability: {
      immediate: false,
      specificDate: null,
      availableImmediately: false,
      leaseDuration: '12 months',
      noticePeriod: '1 month',
      petsAllowed: false,
      operatingHours: {
        restricted: false,
        restrictions: 'Standard business hours'
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
      videoTour: '',
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const formSections = [
    {
      title: 'Basic Information',
      icon: <Store className="w-5 h-5" />,
      content: renderFormSection(
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Home className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Basic Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyName
                  propertyName={formData.propertyName}
                  onPropertyNameChange={(name) => setFormData({ ...formData, propertyName: name })}
                />
                <ShowroomType
                  onShowroomTypeChange={(type) => setFormData({ ...formData, showroomType: type })}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Home className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <CommercialPropertyAddress
                  onAddressChange={(address) => setFormData({ ...formData, address })}
                />
                <Landmark
                  onLandmarkChange={(landmark) => setFormData({ ...formData, landmark })}
                />

                <CornerProperty
                  onCornerPropertyChange={(isCorner) => setFormData({ ...formData, isCornerProperty: isCorner })}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <ShowroomDetails
                  onDetailsChange={(details) => setFormData({ ...formData, showroomDetails: details })}
                />
                <CommercialPropertyDetails
                  onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Rental Terms',
      icon: <DollarSign className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <DollarSign className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Rental Terms</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <Rent onRentChange={(rent) => setFormData({ ...formData, rent })} />
                {formData.rent.rentType === 'exclusive' && (
                  <MaintenanceAmount
                    onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({
                      ...prev,
                      rentalDetails: {
                        ...prev.rentalDetails,
                        maintenanceCharges: {
                          amount: maintenance.amount,
                          frequency: maintenance.frequency || ''
                        }
                      }
                    }))}
                  />
                )}
                <SecurityDeposit
                  onSecurityDepositChange={(deposit: Record<string, any>) => setFormData(prev => ({
                    ...prev,
                    rentalDetails: {
                      ...prev.rentalDetails,
                      securityDeposit: {
                        amount: deposit.amount || null,
                        depositType: deposit.depositType || ''
                      }
                    }
                  }))}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Additional Charges</h4>
              <div className="space-y-4 text-black">
                <OtherCharges
                  onOtherChargesChange={(charges: Record<string, any>) => setFormData(prev => ({
                    ...prev,
                    rentalDetails: {
                      ...prev.rentalDetails,
                      otherCharges: {
                        water: { amount: Number(charges.water?.amount) || null, type: charges.water?.type || '' },
                        electricity: { amount: Number(charges.electricity?.amount) || null, type: charges.electricity?.type || '' },
                        gas: { amount: Number(charges.gas?.amount) || null, type: charges.gas?.type || '' },
                        others: { amount: Number(charges.others?.amount) || null, type: charges.others?.type || '' },
                        propertyTax: charges.propertyTax || false,
                        otherInclusives: charges.otherInclusives || []
                      }
                    }
                  }))}
                />
                <div className="border-t border-gray-200 my-4"></div>
                <Brokerage
                  onBrokerageChange={(brokerage: Record<string, any>) => setFormData(prev => ({
                    ...prev,
                    brokerage: {
                      required: brokerage.required || 'no',
                      amount: Number(brokerage.amount) || null
                    }
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Calendar className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Availability</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <AvailabilityDate
                  onAvailabilityChange={(availability) => setFormData({ ...formData, availability })}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <Phone className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Phone className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Contact Information</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <CommercialContactDetails
                  onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Property Media',
      icon: <Image className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Image className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Media</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <CommercialMediaUpload
                  onMediaChange={(media) => setFormData({ ...formData, media })}
                />
              </div>
            </div>
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

  // Add validation for numeric fields
  const validateNumericField = (value: number | null, fieldName: string): boolean => {
    if (value === null) return true; // Allow null values
    if (isNaN(value)) {
      toast.error(`Please enter a valid number for ${fieldName}`);
      return false;
    }
    if (value <= 0) {
      toast.error(`${fieldName} must be greater than 0`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto text-black">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {formSections.map((section, i) => (
            <div
              key={i}
              className={`flex flex-col items-center ${i <= currentStep ? "text-black" : "text-gray-400"}`}
              onClick={() => i < currentStep && setCurrentStep(i)}
              style={{ cursor: i < currentStep ? "pointer" : "default" }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {section.icon}
              </div>
              <span className="text-xs font-medium">{section.title}</span>
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

      <h2 className="text-3xl font-bold mb-8 text-black">{formSections[currentStep].title}</h2>

      {formSections[currentStep].content}

      <div className="mt-8 flex justify-end">
        {currentStep < formSections.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-200 flex items-center"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-200"
          >
            List Property
          </button>
        )}
      </div>
    </div>
  );
};

export default RentShowroomMain;
