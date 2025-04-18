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
import { Home, Building2, DollarSign, Calendar, Phone, Image, Store } from 'lucide-react';

interface FormData {
  propertyName: string;
  showroomType: string;
  address: {};
  landmark: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
  showroomDetails: {};
  propertyDetails: {};
  amenities: string[];
  rent: {
    expectedRent: string;
    isNegotiable: boolean;
    rentType: string;
    securityDeposit: {
      amount: number | null;
      depositType: string;
    };
    maintenanceCharges: {
      amount: number | null;
      frequency: string;
    };
    otherCharges: {
      water: {
        amount: number | null;
        type: string;
      };
      electricity: {
        amount: number | null;
        type: string;
      };
      gas: {
        amount: number | null;
        type: string;
      };
      others: {
        amount: number | null;
        type: string;
      };
      propertyTax: boolean;
      otherInclusives: string;
    };
  };
  brokerage: {
    amount: number | null;
    type: string;
  };
  availability: {
    fromDate: string;
    isImmediate: boolean;
  };
  contactInformation: {
    name: string;
    email: string;
    phone: string;
  };
  media: {
    images: { category: string; files: { url: string; file: File }[] }[];
    video?: { url: string; file: File };
    documents: { type: string; file: File }[];
  };
}

const RentShowroomMain = () => {
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    showroomType: '',
    address: {},
    landmark: '',
    coordinates: {
      latitude: '',
      longitude: ''
    },
    isCornerProperty: false,
    showroomDetails: {},
    propertyDetails: {},
    amenities: [],
    rent: {
      expectedRent: '',
      isNegotiable: false,
      rentType: '',
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
        otherInclusives: ''
      }
    },
    brokerage: {
      amount: null,
      type: 'percentage'
    },
    availability: {
      fromDate: '',
      isImmediate: false
    },
    contactInformation: {
      name: '',
      email: '',
      phone: ''
    },
    media: {
      images: [
        { category: 'exterior', files: [] },
        { category: 'interior', files: [] },
        { category: 'floorPlan', files: [] },
        { category: 'washrooms', files: [] },
        { category: 'lifts', files: [] },
        { category: 'emergencyExits', files: [] }
      ],
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleRentChange = (rent: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      rent: {
        ...prev.rent,
        ...rent,
        securityDeposit: {
          ...prev.rent.securityDeposit,
          ...rent.securityDeposit
        },
        maintenanceCharges: {
          ...prev.rent.maintenanceCharges,
          ...rent.maintenanceCharges
        },
        otherCharges: {
          ...prev.rent.otherCharges,
          ...rent.otherCharges,
          water: {
            ...prev.rent.otherCharges.water,
            ...rent.otherCharges?.water
          },
          electricity: {
            ...prev.rent.otherCharges.electricity,
            ...rent.otherCharges?.electricity
          },
          gas: {
            ...prev.rent.otherCharges.gas,
            ...rent.otherCharges?.gas
          },
          others: {
            ...prev.rent.otherCharges.others,
            ...rent.otherCharges?.others
          }
        }
      }
    }));
  };

  const handleMaintenanceAmountChange = (maintenance: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      rent: {
        ...prev.rent,
        maintenanceCharges: {
          amount: maintenance.amount || null,
          frequency: maintenance.frequency || ''
        }
      }
    }));
  };

  const handleBrokerageChange = (brokerage: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      brokerage: {
        amount: brokerage.amount || null,
        type: brokerage.type || 'percentage'
      }
    }));
  };

  const handleAvailabilityChange = (availability: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        ...availability
      }
    }));
  };

  const handleContactChange = (contact: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      contactInformation: {
        ...prev.contactInformation,
        ...contact
      }
    }));
  };

  const handleMediaChange = (media: {
    images: { category: string; files: { url: string; file: File }[] }[];
    video?: { url: string; file: File };
    documents: { type: string; file: File }[];
  }) => {
    setFormData(prev => ({
      ...prev,
      media
    }));
  };

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};
    // Add validation logic here
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderFormSection = (content: React.ReactNode) => (
    <div className="space-y-4">
      {Object.keys(formErrors).length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-red-800 font-medium">Please fix the following errors:</h3>
          </div>
          <ul className="mt-2 list-disc list-inside text-red-600">
            {Object.values(formErrors).map((error, index) => (
              <li key={index} className="text-sm">{error}</li>
            ))}
          </ul>
        </div>
      )}
      {content}
    </div>
  );

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
                  onTypeChange={(type) => setFormData({ ...formData, showroomType: type })}
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
                <Rent onRentChange={handleRentChange} />
                {formData.rent.rentType === 'exclusive' && (
                  <MaintenanceAmount
                    onMaintenanceAmountChange={handleMaintenanceAmountChange}
                  />
                )}
                <SecurityDeposit
                  onSecurityDepositChange={(deposit: Record<string, any>) => setFormData(prev => ({
                    ...prev,
                    rent: {
                      ...prev.rent,
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
                    rent: {
                      ...prev.rent,
                      otherCharges: {
                        water: { amount: Number(charges.water?.amount) || null, type: charges.water?.type || '' },
                        electricity: { amount: Number(charges.electricity?.amount) || null, type: charges.electricity?.type || '' },
                        gas: { amount: Number(charges.gas?.amount) || null, type: charges.gas?.type || '' },
                        others: { amount: Number(charges.others?.amount) || null, type: charges.others?.type || '' },
                        propertyTax: charges.propertyTax || false,
                        otherInclusives: charges.otherInclusives || ''
                      }
                    }
                  }))}
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
                  onAvailabilityChange={handleAvailabilityChange}
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
                  onContactChange={handleContactChange}
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
                  onMediaChange={handleMediaChange}
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
