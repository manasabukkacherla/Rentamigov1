import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
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
import { MapPin, Building2, DollarSign, Calendar, User, Image, Store, ImageIcon, UserCircle, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';

interface MediaType {
  images: { category: string; files: { url: string; file: File; }[]; }[];
  video?: { url: string; file: File; };
  documents: { type: string; file: File; }[];
}

interface FormData {
  propertyName: string;
  warehouseType: string[];
  address: Record<string, string>;
  landmark: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
  warehouseDetails: Record<string, any>;
  propertyDetails: Record<string, any>;
  leaseAmount: Record<string, any>;
  leaseTenure: Record<string, any>;
  maintenanceAmount: Record<string, any>;
  otherCharges: {
    water: { amount: number; type: string };
    electricity: { amount: number; type: string };
    gas: { amount: number; type: string };
    others: { amount: number; type: string };
  };
  brokerage: Record<string, any>;
  availability: Record<string, any>;
  contactDetails: Record<string, string>;
  media: MediaType;
}

const LeaseWarehouseMain = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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
    otherCharges: {
      water: { amount: 0, type: 'inclusive' },
      electricity: { amount: 0, type: 'inclusive' },
      gas: { amount: 0, type: 'inclusive' },
      others: { amount: 0, type: 'inclusive' }
    },
    brokerage: {},
    availability: {},
    contactDetails: {},
    media: {
      images: [] as { category: string; files: { url: string; file: File; }[]; }[],
      video: undefined,
      documents: [] as { type: string; file: File; }[]
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Form prevention utility function
  const preventDefault = (e: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    return false;
  };

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
                onLatitudeChange={(latitude) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, latitude } }))}
                onLongitudeChange={(longitude) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, longitude } }))}
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
            <OtherCharges onOtherChargesChange={(charges) => {
              // Since the OtherCharges component sends the old state, wait for the component to update
              // by deferring the formData update with setTimeout
              setTimeout(() => {
                setFormData(prev => ({
                  ...prev,
                  otherCharges: {
                    water: charges.water || { amount: 0, type: 'inclusive' },
                    electricity: charges.electricity || { amount: 0, type: 'inclusive' },
                    gas: charges.gas || { amount: 0, type: 'inclusive' },
                    others: charges.others || { amount: 0, type: 'inclusive' }
                  }
                }));
              }, 0);
            }} />
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
            <CommercialMediaUpload
              onMediaChange={(media: MediaType) => {
                setFormData(prev => ({ ...prev, media }));
                console.log("Media changed:", media);
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  const handleNext = (e: React.MouseEvent) => {
    preventDefault(e);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = (e: React.MouseEvent) => {
    preventDefault(e);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to upload media files to a server or cloud storage
  const uploadMediaFiles = async () => {
    // In a real implementation, you would upload files to your server or a cloud service
    // For this example, we'll return the URLs we have (even if they're blob URLs)
    const uploadedMedia = {
      photos: {
        exterior: formData.media.images.find(img => img.category === 'exterior')?.files.map(f => f.url) || [],
        interior: formData.media.images.find(img => img.category === 'interior')?.files.map(f => f.url) || [],
        floorPlan: formData.media.images.find(img => img.category === 'floorPlan')?.files.map(f => f.url) || [],
        washrooms: formData.media.images.find(img => img.category === 'washrooms')?.files.map(f => f.url) || [],
        lifts: formData.media.images.find(img => img.category === 'lifts')?.files.map(f => f.url) || [],
        emergencyExits: formData.media.images.find(img => img.category === 'emergencyExits')?.files.map(f => f.url) || []
      },
      videoTour: formData.media.video?.url || '',
      documents: formData.media.documents.map(doc => doc.type) || []
    };

    return uploadedMedia;
  };

  // Map frontend form data to backend model structure
  const mapFormDataToBackendModel = async () => {
    // Handle media upload first (this would involve actual file uploads in production)
    const uploadedMedia = await uploadMediaFiles();

    // Function to ensure correct casing for enum values
    const formatEnumValue = (value: string | undefined, enumType: 'leaseType' | 'frequency'): string => {
      if (!value) return '';

      if (enumType === 'leaseType') {
        // First letter capitalized for lease type ('Fixed' or 'Negotiable')
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      } else if (enumType === 'frequency') {
        // First letter capitalized for frequency ('Monthly', 'Quarterly', 'Yearly', 'Half-Yearly')
        if (value.toLowerCase() === 'half-yearly') return 'Half-Yearly';
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }

      return value;
    };

    // Format the lease type and frequency values
    const leaseType = formatEnumValue(formData.leaseAmount?.type, 'leaseType');
    const maintenanceFrequency = formatEnumValue(formData.maintenanceAmount?.frequency, 'frequency');

    // Enhanced debugging for property age and other charges
    console.log('Frontend Form Data:', formData);
    console.log('Other Charges (Full Object):', formData.otherCharges);

    // Helper function to handle charge types and amounts
    const formatCharge = (charge: any) => {
      // Default values if charge is undefined
      const defaultCharge = { type: 'inclusive', amount: 0 };
      if (!charge) return defaultCharge;

      return {
        type: charge.type || 'inclusive',
        amount: charge.type === 'exclusive' ? Number(charge.amount || 0) : 0
      };
    };

    // Ensure we have the right structure for charges
    console.log('Other Charges before mapping:', formData.otherCharges);

    // Map the charges from OtherCharges component to the backend format
    const mappedCharges = {
      electricityCharges: formatCharge(formData.otherCharges.electricity),
      waterCharges: formatCharge(formData.otherCharges.water),
      gasCharges: formatCharge(formData.otherCharges.gas),
      otherCharges: formatCharge(formData.otherCharges.others)
    };

    console.log('Mapped charges for backend:', mappedCharges);

    // Create the backend data object with proper mapping
    const backendData = {
      basicInformation: {
        title: formData.propertyName || '',
        warehouseType: formData.warehouseType || [],
        address: {
          street: formData.address.street || '',
          city: formData.address.city || '',
          state: formData.address.state || '',
          zipCode: formData.address.zipCode || ''
        },
        landmark: formData.landmark || '',
        location: {
          latitude: parseFloat(formData.coordinates.latitude) || 0,
          longitude: parseFloat(formData.coordinates.longitude) || 0
        },
        isCornerProperty: formData.isCornerProperty || false
      },
      coveredSpaceDetails: {
        totalArea: Number(formData.warehouseDetails?.totalArea) || 0,
        ceilingHeight: Number(formData.warehouseDetails?.ceilingHeight) || 0,
        loadingDocks: Number(formData.warehouseDetails?.docks?.count) || 0,
        dockHeight: Number(formData.warehouseDetails?.docks?.height) || 0,
        floorload: Number(formData.warehouseDetails?.floorLoadCapacity) || 0,
        firesafety: Boolean(formData.warehouseDetails?.fireSafety) || false,
        security: Boolean(formData.warehouseDetails?.securityPersonnel) || false,
        access247: Boolean(formData.warehouseDetails?.access24x7) || false,
        truckparking: Boolean(formData.warehouseDetails?.truckParking) || false,
        parking: Boolean(formData.warehouseDetails?.parking) || false
      },
      propertyDetails: {
        area: {
          totalArea: Number(formData.propertyDetails?.area?.totalArea) || 0,
          builtUpArea: Number(formData.propertyDetails?.area?.builtUpArea) || 0,
          carpetArea: Number(formData.propertyDetails?.area?.carpetArea) || 0
        },
        floor: {
          floorNumber: Number(formData.propertyDetails?.floor?.floorNumber) || 0,
          totalFloors: Number(formData.propertyDetails?.floor?.totalFloors) || 0
        },
        facingDirection: formData.propertyDetails?.facingDirection || '',
        furnishingStatus: formData.propertyDetails?.furnishingStatus || '',
        propertyAmenities: Array.isArray(formData.propertyDetails?.propertyAmenities)
          ? formData.propertyDetails.propertyAmenities
          : [],
        wholeSpaceAmenities: Array.isArray(formData.propertyDetails?.wholeSpaceAmenities)
          ? formData.propertyDetails.wholeSpaceAmenities
          : [],
        electricitySupply: {
          powerLoad: Number(formData.propertyDetails?.electricitySupply?.powerLoad) || 0,
          backup: Boolean(formData.propertyDetails?.electricitySupply?.backup)
        },
        propertyAge: String(formData.propertyDetails?.propertyAge || formData.propertyDetails?.age || '0-5'),
        propertyCondition: formData.propertyDetails?.propertyCondition || formData.propertyDetails?.condition || ''
      },
      leaseTerms: {
        leaseDetails: {
          leaseAmount: {
            amount: Number(formData.leaseAmount?.amount) || 0,
            type: leaseType || 'Fixed',
            duration: Number(formData.leaseAmount?.duration) || 1,
            durationUnit: (formData.leaseAmount?.durationUnit || 'Month').toLowerCase()
          }
        },
        tenureDetails: {
          minimumTenure: Number(formData.leaseTenure?.minimumTenure) || 0,
          minimumUnit: (formData.leaseTenure?.minimumUnit || '').toLowerCase(),
          maximumTenure: Number(formData.leaseTenure?.maximumTenure) || 0,
          maximumUnit: (formData.leaseTenure?.maximumUnit || '').toLowerCase(),
          lockInPeriod: Number(formData.leaseTenure?.lockInPeriod) || 0,
          lockInUnit: (formData.leaseTenure?.lockInUnit || '').toLowerCase(),
          noticePeriod: Number(formData.leaseTenure?.noticePeriod) || 0,
          noticePeriodUnit: (formData.leaseTenure?.noticePeriodUnit || '').toLowerCase()
        },
        maintenanceAmount: {
          amount: Number(formData.maintenanceAmount?.amount) || 0,
          frequency: maintenanceFrequency || 'Monthly'
        },
        otherCharges: mappedCharges,
        brokerage: {
          required: formData.brokerage?.required || 'no',
          amount: Number(formData.brokerage?.amount) || 0
        },
        availability: {
          availableFrom: formData.availability?.availableFrom || new Date(),
          availableImmediately: Boolean(formData.availability?.availableImmediately),
          leaseDuration: formData.availability?.leaseDuration || '',
          noticePeriod: formData.availability?.noticePeriod || '',
          petsAllowed: Boolean(formData.availability?.petsAllowed),
          operatingHours: Boolean(formData.availability?.operatingHours)
        }
      },
      contactInformation: {
        name: formData.contactDetails?.name || '',
        email: formData.contactDetails?.email || '',
        phone: formData.contactDetails?.phone || '',
        alternatePhone: formData.contactDetails?.alternatePhone || '',
        bestTimeToContact: formData.contactDetails?.bestTimeToContact || ''
      },
      media: uploadedMedia,
      metadata: {
        status: 'active',
        views: 0,
        favorites: 0,
        isVerified: false,
        createdBy: localStorage.getItem('userId') || null
      }
    };

    // Log for debugging
    console.log('Backend Data:', backendData);
    console.log('Property Details in Backend Data:', backendData.propertyDetails);
    console.log('Other Charges in Backend Data:', backendData.leaseTerms.otherCharges);

    return backendData;
  };

  const validateCurrentStep = () => {
    // Add validation logic based on the current step
    switch (currentStep) {
      case 0: // Basic Information
        return !!formData.propertyName &&
          formData.warehouseType.length > 0 &&
          !!formData.address.street &&
          !!formData.address.city &&
          !!formData.address.state &&
          !!formData.address.zipCode;
      case 1: // Property Details
        return !!formData.warehouseDetails.totalArea;
      case 2: // Lease Terms
        return !!formData.leaseAmount.amount &&
          !!formData.leaseAmount.duration;
      case 3: // Availability
        return true; // Optional fields
      case 4: // Contact Information
        return !!formData.contactDetails.name &&
          !!formData.contactDetails.email &&
          !!formData.contactDetails.phone;
      case 5: // Property Media
        return true; // We'll validate this in validateFinalStep when actually submitting
      default:
        return true;
    }
  };

  const validateFinalStep = () => {
    // Check if media uploads are required and validate accordingly
    const hasRequiredMedia =
      formData.media.images.some(category => category.files.length > 0) ||
      formData.media.documents.some(doc => !!doc.file);

    return hasRequiredMedia;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      preventDefault(e);
    }

    // If not on the last step, move to the next step instead of submitting
    if (currentStep < steps.length - 1) {
      handleNext(e as React.MouseEvent);
      return;
    }

    // Validate the final step before submitting
    if (!validateFinalStep()) {
      toast.error("Please add at least one image or document");
      return;
    }

    try {
      setIsSubmitting(true);
      toast.loading("Submitting your property listing...");

      // Map form data to backend model structure
      const backendData = await mapFormDataToBackendModel();

      // Make API call to create commercial lease warehouse
      const response = await axios.post(
        `/api/commercial/lease/warehouse`,
        backendData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        toast.dismiss();
        toast.success("Property listed successfully!");
        navigate('/updatePropertyForm');
      } else {
        toast.dismiss();
        toast.error(response.data.error || "Failed to create property listing");
        console.error('Failed to create property listing:', response.data.error);
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.details || error.message || "An error occurred while submitting the form");
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={preventDefault} className="max-w-3xl mx-auto" noValidate>
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
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-400"
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
            disabled={isSubmitting}
          >
            <ChevronLeft className="mr-2" size={18} />
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto"
            disabled={!validateCurrentStep() || isSubmitting}
          >
            Next
            <ChevronRight className="ml-2" size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                List Property
                <ChevronRight className="ml-2" size={18} />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default LeaseWarehouseMain;

