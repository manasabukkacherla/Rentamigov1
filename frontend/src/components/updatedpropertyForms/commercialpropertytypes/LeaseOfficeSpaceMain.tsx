"use client"

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import PropertyName from '../PropertyName';
import OfficeSpaceType from '../CommercialComponents/OfficeSpaceType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import OfficeSpaceDetails from '../CommercialComponents/OfficeSpaceDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { MapPin, Building2, DollarSign, Calendar, User, Image, Store, ImageIcon, UserCircle, ChevronRight, ChevronLeft, Loader2, Locate, Navigation } from 'lucide-react';
import MapLocation from '../CommercialComponents/MapLocation';

interface OfficeDetails {
  seatingCapacity: string | number;
  cabins: {
    available: boolean;
    count: number;
  };
  conferenceRoom: boolean;
  meetingRoom: boolean;
  receptionArea: boolean;
  wifiSetup: boolean;
  serverRoom: boolean;
  coworkingFriendly: boolean;
}

interface FormData {
  title: string;
  officeType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
  officeDetails: OfficeDetails;
  propertyDetails: Record<string, any>;
  leaseAmount: Record<string, any>;
  leaseTenure: Record<string, any>;
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  otherCharges: {
    water: { amount: number; type: string };
    electricity: { amount: number; type: string };
    gas: { amount: number; type: string };
    others: { amount: number; type: string };
  };
  brokerage: {
    amount?: number;
    required: string;
  };
  availability: {
    date: Date;
    type: string;
    leaseDuration: string;
    noticePeriod: string;
    petsAllowed: boolean;
  };
  contactDetails: {
    name: string;
    email: string;
    phone: string;
    bestTimeToContact?: string;
    alternatePhone?: string;
  };
  media: {
    photos: {
      exterior: File[];
      interior: File[];
      floorPlan: File[];
      washrooms: File[];
      lifts: File[];
      emergencyExits: File[];
    };
    videoTour: File | null;
    documents: File[];
  };
}

const LeaseOfficeSpaceMain = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    officeType: [] as string[],
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    officeDetails: {
      seatingCapacity: '',
      cabins: {
        available: false,
        count: 0
      },
      conferenceRoom: false,
      meetingRoom: false,
      receptionArea: false,
      wifiSetup: false,
      serverRoom: false,
      coworkingFriendly: false
    },
    propertyDetails: {},
    leaseAmount: {},
    leaseTenure: {},
    maintenanceAmount: {
      amount: 0,
      frequency: 'monthly'
    },
    otherCharges: {
      water: { amount: 0, type: 'inclusive' },
      electricity: { amount: 0, type: 'inclusive' },
      gas: { amount: 0, type: 'inclusive' },
      others: { amount: 0, type: 'inclusive' }
    },
    brokerage: {
      amount: 0,
      required: 'no'
    },
    availability: {
      date: new Date(),
      type: 'immediate',
      leaseDuration: '',
      noticePeriod: '',
      petsAllowed: false
    },
    contactDetails: {
      name: '',
      email: '',
      phone: '',
      bestTimeToContact: '',
      alternatePhone: ''
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
      videoTour: null,
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

  const steps = [
    {
      title: "Basic Information",
      icon: <MapPin className="w-6 h-6" />,
      component: (
        <div className="space-y-6">
          <div className="space-y-6">
            <div className="relative">
              <PropertyName propertyName={formData.title} onPropertyNameChange={(propertyName) => setFormData(prev => ({ ...prev, title: propertyName }))} />
              <Store className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
            </div>
            <OfficeSpaceType onOfficeTypeChange={(type) => setFormData(prev => ({ ...prev, officeType: type }))} />
          </div>

          <div className="space-y-6">
            <CommercialPropertyAddress address={formData.address} onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))} />

            <MapLocation  
              latitude={formData.coordinates.latitude}
              longitude={formData.coordinates.longitude}
              landmark={formData.landmark}
              onLocationChange={(location) => setFormData(prev => ({ ...prev, coordinates: location }))}
              onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))}
            />

            <div className="flex items-center space-x-2 cursor-pointer">
              <CornerProperty isCornerProperty={formData.isCornerProperty} onCornerPropertyChange={(isCorner) => setFormData(prev => ({ ...prev, isCornerProperty: isCorner }))} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-6 h-6" />,
      component: (
        <div className="space-y-6">
          <OfficeSpaceDetails onDetailsChange={(details) => {
            console.log('OfficeSpaceDetails provided:', details);
            console.log('Cabins data:', details.cabins);
            setFormData(prev => ({ ...prev, officeDetails: details }));
          }} />
          <CommercialPropertyDetails onDetailsChange={(details) => setFormData(prev => ({ ...prev, propertyDetails: details }))} />
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-6 h-6" />,
      component: (
        <div className="space-y-6">
          <LeaseAmount onLeaseAmountChange={(amount) => setFormData(prev => ({ ...prev, leaseAmount: amount }))} />
          <LeaseTenure onLeaseTenureChange={(tenure) => setFormData(prev => ({ ...prev, leaseTenure: tenure }))} />
          <MaintenanceAmount maintenanceAmount={formData.maintenanceAmount} onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({ ...prev, maintenanceAmount: maintenance }))} />
          <OtherCharges otherCharges={formData.otherCharges} onOtherChargesChange={(charges) => {
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
          <Brokerage bro={formData.brokerage} onBrokerageChange={(brokerage) => setFormData(prev => ({ ...prev, brokerage }))} />
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: (
        <div className="space-y-6">
          <CommercialAvailability onAvailabilityChange={(availability) => setFormData(prev => ({
            ...prev,
            availability: {
              date: availability.date || new Date(),
              type: availability.type|| 'immediate',
              leaseDuration: availability.preferredSaleDuration || '',
              noticePeriod: availability.noticePeriod || '',
              petsAllowed: availability.petsAllowed || false
            }
          }))} />
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <User className="w-6 h-6" />,
      component: (
        <div className="space-y-6">
          <CommercialContactDetails contactInformation={formData.contactDetails} onContactChange={(contact) => setFormData(prev => ({ ...prev, contactDetails: contact }))} />
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-6 h-6" />,
      component: (
        <div className="space-y-6">
          <CommercialMediaUpload
            Media={{
              photos: Object.entries(formData.media.photos).map(([category, files]) => ({
                category,
                files: files.map(file => ({ url: URL.createObjectURL(file), file }))
              })),
              videoTour: formData.media.videoTour || null,
              documents: formData.media.documents
            }}
              onMediaChange={(media) => {
                const photosByCategory: Record<string, File[]> = {
                  exterior: [],
                  interior: [],
                  floorPlan: [],
                  washrooms: [],
                  lifts: [],
                  emergencyExits: []
                };

                media.photos.forEach(({ category, files }) => {
                  if (category in photosByCategory) {
                    photosByCategory[category] = files.map(f => f.file);
                  }
                });

                setFormData(prev => ({
                  ...prev,
                  media: {
                    photos: {
                      exterior: photosByCategory.exterior,
                      interior: photosByCategory.interior,
                      floorPlan: photosByCategory.floorPlan,
                      washrooms: photosByCategory.washrooms,
                      lifts: photosByCategory.lifts,
                      emergencyExits: photosByCategory.emergencyExits
                    },
                    videoTour: media.videoTour || null,
                    documents: media.documents
                  }
                }));
              }}
            />
        </div>
      ),
    },
  ]

  const validateCurrentStep = () => {
    // Add validation logic based on the current step
    switch (currentStep) {
      case 0: // Basic Information
        return !!formData.title &&
          formData.officeType.length > 0 &&
          !!formData.address.street &&
          !!formData.address.city &&
          !!formData.address.state &&
          !!formData.address.zipCode;
      case 1: // Property Details
        return !!formData.officeDetails.seatingCapacity;
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

  // const validateFinalStep = () => {
  //   // Check if media uploads are required and validate accordingly
  //   const hasRequiredMedia =
  //     formData.media.photos.some(category => category.files.length > 0) ||
  //     formData.media.documents.some(doc => !!doc.file);

  //   return hasRequiredMedia;
  // };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      preventDefault(e);
    }

    // If not on the last step, move to the next step instead of submitting
    if (currentStep < steps.length - 1) {
      handleNext();
      return;
    }

    // Validate the final step before submitting
    // if (!validateFinalStep()) {
    //   toast.error("Please add at least one image or document");
    //   return;
    // }

    try {
      setIsSubmitting(true);
      toast.loading("Submitting your property listing...");

      // Log the office details for debugging
      console.log('Office Details before mapping:', formData.officeDetails);

      // Map form data to backend model structure
      const backendData = await mapFormDataToBackendModel();

      // Log the complete data being sent to the API
      console.log('Submitting data to API:', backendData);
      console.log('API Endpoint:', '/api/commercial/lease/office-space');

      try {
        // Make API call to create commercial lease office space
        const response = await axios.post(
          `/api/commercial/lease/office-space`, // Fixed endpoint path to match backend route
          backendData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (response.data.success) {
          // Clear the stored property ID after successful submission
          localStorage.removeItem('officeSpacePropertyId');

          toast.dismiss();
          toast.success("Property listed successfully!");
          navigate('/updatePropertyForm');
        } else {
          toast.dismiss();
          toast.error(response.data.error || "Failed to create property listing");
          console.error('Failed to create property listing:', response.data.error);
        }
      } catch (apiError: any) {
        toast.dismiss();
        console.error('API Error Details:', apiError);

        if (apiError.response) {
          console.error('API Response Status:', apiError.response.status);
          console.error('API Response Data:', apiError.response.data);

          // Check if endpoint not found (404)
          if (apiError.response.status === 404) {
            toast.error("API endpoint not found. Please check with administrators.");
            console.error("API endpoint '/api/commercial/lease/office-space' not found. Please verify the correct endpoint with your backend team.");
          } else {
            toast.error(apiError.response.data?.message || apiError.response.data?.details ||
              "Server error. Please try again later.");
          }
        } else if (apiError.request) {
          // Request was made but no response received
          toast.error("No response from server. Please check your connection.");
          console.error('No response received:', apiError.request);
        } else {
          // Error in setting up the request
          toast.error(apiError.message || "An error occurred. Please try again.");
          console.error('Error setting up request:', apiError.message);
        }
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error("Failed to process form data. Please try again.");
      console.error('Error in form processing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handlePrevious = (e: React.MouseEvent) => {
    preventDefault(e);
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

  // Function to upload media files to a server or cloud storage
  const uploadMediaFiles = async () => {
    // In a real implementation, you would upload files to your server or a cloud service
    // For this example, we'll return the URLs we have (even if they're blob URLs)
    const uploadedMedia = {
      photos: {
        exterior: formData.media.photos.exterior.map(f => URL.createObjectURL(f)) || [],
        interior: formData.media.photos.interior.map(f => URL.createObjectURL(f)) || [],
        floorPlan: formData.media.photos.floorPlan.map(f => URL.createObjectURL(f)) || [],
        washrooms: formData.media.photos.washrooms.map(f => URL.createObjectURL(f)) || [],
        lifts: formData.media.photos.lifts.map(f => URL.createObjectURL(f)) || [],
        emergencyExits: formData.media.photos.emergencyExits.map(f => URL.createObjectURL(f)) || []
      },
      videoTour: formData.media.videoTour ? URL.createObjectURL(formData.media.videoTour) : '',
      documents: formData.media.documents.map(doc => doc.name) || []
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
    console.log('Office Details:', formData.officeDetails);

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

    // Convert boolean values to "Available" or "Not Available" for office details
    const formatOfficeFeature = (value: boolean) => value ? 'Available' : 'Not Available';

    // Check if propertyId already exists in localStorage, otherwise generate a new one
    let propertyId = localStorage.getItem('officeSpacePropertyId');
    console.log('Existing propertyId from localStorage:', propertyId);

    if (!propertyId) {
      const timestamp = new Date().getTime();
      const randomStr = Math.random().toString(36).substring(2, 8);
      propertyId = `OFFICE-${timestamp}-${randomStr}`;
      localStorage.setItem('officeSpacePropertyId', propertyId);
      console.log('Generated new propertyId:', propertyId);
    } else {
      console.log('Using existing propertyId:', propertyId);
    }

    // Log the office details before mapping
    console.log('Office Details before mapping:', {
      seatingCapacity: formData.officeDetails?.seatingCapacity,
      cabins: formatOfficeFeature(formData.officeDetails?.cabins.available),
      cabinCount: formData.officeDetails?.cabins.count
    });

    // Create the backend data object with proper mapping
    const backendData = {
      propertyId: propertyId,
      basicInformation: {
        title: formData.title || '',
        officeType: formData.officeType || [],
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
      officeSpaceDetails: {
        seatingcapacity: Number(formData.officeDetails?.seatingCapacity) || 0,
        cabins: formatOfficeFeature(formData.officeDetails?.cabins.available),
        meetingrooms: formatOfficeFeature(formData.officeDetails?.meetingRoom),
        conferenceRooms: formatOfficeFeature(formData.officeDetails?.conferenceRoom),
        receptionarea: formatOfficeFeature(formData.officeDetails?.receptionArea),
        wifi: formatOfficeFeature(formData.officeDetails?.wifiSetup),
        serverroom: formatOfficeFeature(formData.officeDetails?.serverRoom),
        coworkingfriendly: formatOfficeFeature(formData.officeDetails?.coworkingFriendly),
        cabinsDetails: {
          count: Number(formData.officeDetails?.cabins.count) || 0
        }
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
          date: formData.availability?.date || new Date(),
          type: formData.availability?.type || 'immediate',
          leaseDuration: formData.availability?.leaseDuration || '',
          noticePeriod: formData.availability?.noticePeriod || '',
          petsAllowed: Boolean(formData.availability?.petsAllowed)
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
        createdBy: localStorage.getItem('_Id') || null,
        createdAt: new Date(),
        propertyType: 'Commercial',
        propertyName: 'Office Space',
        intent: 'Lease',
        status: 'Available',
      }
    };

    // Log for debugging
    console.log('Backend Data:', backendData);
    console.log('Office Space Details in Backend Data:', backendData.officeSpaceDetails);
    console.log('Other Charges in Backend Data:', backendData.leaseTerms.otherCharges);

    return backendData;
  };

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setCurrentStep(index);
                    // Scroll to top of the form when clicking on progress indicators
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
                  }}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index <= currentStep
                      ? 'text-black'
                      : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {section.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className={`w-12 h-1 transition-colors duration-200 ${index < currentStep ? 'bg-black' : 'bg-gray-200'
                        }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Lease Commercial Office Space</h1>
        </div>
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
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          <button
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={isSubmitting}
            className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Submitting...
              </>
            ) : (
              <>
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaseOfficeSpaceMain;

