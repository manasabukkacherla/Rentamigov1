import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import PropertyName from '../PropertyName';
import CoveredOpenSpaceType from '../CommercialComponents/CoveredOpenSpaceType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import CoveredOpenSpaceDetails from '../CommercialComponents/CoveredOpenSpaceDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon, Calendar, Loader2 } from "lucide-react"

interface FormData {
  propertyName: string;
  spaceType: string[];
  address: Record<string, string>;
  landmark: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
  spaceDetails: Record<string, any>;
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
  media: {
    images: Array<{ category: string; files: Array<{ url: string; file: File }> }>;
    video?: { url: string; file: File };
    documents: Array<{ type: string; file: File }>;
  };
}

const LeaseCoveredSpaceMain = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    spaceType: [],
    address: {},
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    spaceDetails: {},
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
      images: [],
      video: undefined,
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  // Form prevention utility function
  const preventDefault = (e: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    return false;
  };

  const formSections = [
    {
      title: 'Basic Information',
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Store className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Basic Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-white [&_button]:hover:text-black [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyName propertyName={formData.propertyName} onPropertyNameChange={(name) => setFormData(prev => ({ ...prev, propertyName: name }))} />
                <CoveredOpenSpaceType onSpaceTypeChange={(type) => setFormData(prev => ({ ...prev, spaceType: type }))} />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-white [&_button]:hover:text-black [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <CommercialPropertyAddress onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))} />
                <Landmark onLandmarkChange={(landmark) => setFormData(prev => ({ ...prev, landmark }))} />
                <MapCoordinates
                  latitude={formData.coordinates.latitude}
                  longitude={formData.coordinates.longitude}
                  onLatitudeChange={(latitude) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, latitude } }))}
                  onLongitudeChange={(longitude) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, longitude } }))}
                />
                <CornerProperty onCornerPropertyChange={(isCorner) => setFormData(prev => ({ ...prev, isCornerProperty: isCorner }))} />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Property Details',
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building2 className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-white [&_button]:hover:text-black [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CoveredOpenSpaceDetails onDetailsChange={(details) => setFormData(prev => ({ ...prev, spaceDetails: details }))} />
              <CommercialPropertyDetails onDetailsChange={(details) => setFormData(prev => ({ ...prev, propertyDetails: details }))} />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Lease Terms',
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building2 className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Lease Terms</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-white [&_button]:hover:text-black [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
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
        </div>
      )
    },
    {
      title: 'Availability',
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Calendar className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Availability</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-white [&_button]:hover:text-black [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialAvailability onAvailabilityChange={(availability) => setFormData(prev => ({ ...prev, availability }))} />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Contact Information',
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <UserCircle className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Contact Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-white [&_button]:hover:text-black [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialContactDetails onContactChange={(contact) => setFormData(prev => ({ ...prev, contactDetails: contact }))} />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Property Media',
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <ImageIcon className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Media</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-white [&_button]:hover:text-black [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialMediaUpload
                onMediaChange={(media) => {
                  setFormData(prev => ({ ...prev, media }));
                  // Add console log for debugging
                  console.log("Media changed:", media);
                }}
              />
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = (e: React.MouseEvent) => {
    preventDefault(e);
    if (currentStep < formSections.length - 1) {
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
    console.log('Property Age (raw):', formData.propertyDetails?.propertyAge);
    console.log('Property Age Type:', typeof formData.propertyDetails?.propertyAge);
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
        shedType: formData.spaceType || [],
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
        totalArea: Number(formData.spaceDetails?.totalArea) || 0,
        sqaurefeet: formData.spaceDetails?.squareFeet || String(formData.spaceDetails?.totalArea || '0'),
        coveredarea: Number(formData.spaceDetails?.coveredArea) || 0,
        roadwidth: Number(formData.spaceDetails?.roadWidth) || 0,
        roadfeet: formData.spaceDetails?.roadWidthUnit || '',
        ceilingheight: Number(formData.spaceDetails?.ceilingHeight) || 0,
        ceilingfeet: formData.spaceDetails?.ceilingHeightUnit || '',
        noofopenslides: Number(formData.spaceDetails?.openSides) || 0
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
    console.log('Property Age in Backend Data:', backendData.propertyDetails.propertyAge);
    console.log('Property Details in Backend Data:', backendData.propertyDetails);
    console.log('Other Charges in Backend Data:', backendData.leaseTerms.otherCharges);

    return backendData;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      preventDefault(e);
    }

    // If not on the last step, move to the next step instead of submitting
    if (currentStep < formSections.length - 1) {
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

      // Make API call to create commercial lease covered space
      const response = await axios.post(
        `/api/commercial/lease/covered-space`,
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
      toast.error(error.message || "An error occurred while submitting the form");
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateCurrentStep = () => {
    // Add validation logic based on the current step
    switch (currentStep) {
      case 0: // Basic Information
        return !!formData.propertyName &&
          formData.spaceType.length > 0 &&
          !!formData.address.street &&
          !!formData.address.city &&
          !!formData.address.state &&
          !!formData.address.zipCode;
      case 1: // Property Details
        return !!formData.spaceDetails.totalArea;
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
    // You can add specific validation rules here
    const hasRequiredMedia =
      formData.media.images.some(category => category.files.length > 0) ||
      formData.media.documents.some(doc => !!doc.file);

    return hasRequiredMedia;
  };

  return (
    <form className="max-w-4xl mx-auto" onSubmit={preventDefault} noValidate>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black">{formSections[currentStep].title}</h2>
        <div className="h-1 w-20 bg-black mt-2 rounded-full"></div>
      </div>

      <div className="space-y-8">{formSections[currentStep].content}</div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="px-6 py-2 border border-black/20 rounded-lg text-black hover:bg-white hover:text-black transition-all duration-200 flex items-center"
          onClick={handlePrevious}
          disabled={currentStep === 0 || isSubmitting}
        >
          <ChevronLeft className="mr-1" size={18} />
          Previous
        </button>

        {currentStep < formSections.length - 1 ? (
          <button
            type="button"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center"
            onClick={handleNext}
            disabled={!validateCurrentStep() || isSubmitting}
          >
            Next
            <ChevronRight className="ml-1" size={18} />
          </button>
        ) : (
          <button
            type="button"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center"
            onClick={(e) => handleSubmit(e)}
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
                <ChevronRight className="ml-1" size={18} />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default LeaseCoveredSpaceMain;
