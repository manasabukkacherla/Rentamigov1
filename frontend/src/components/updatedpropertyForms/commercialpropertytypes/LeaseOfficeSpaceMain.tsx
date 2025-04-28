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

interface MediaType {
  images: { category: string; files: { url: string; file: File; }[]; }[];
  video?: { url: string; file: File; };
  documents: { type: string; file: File; }[];
}

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
  propertyName: string;
  officeType: string[];
  address: Record<string, string>;
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

const LeaseOfficeSpaceMain = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    officeType: [] as string[],
    address: {},
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
  const formRef = useRef<HTMLDivElement>(null);

  // Function to update map location based on latitude and longitude
  const updateMapLocation = (lat: string, lng: string) => {
    const iframe = document.getElementById('map-iframe') as HTMLIFrameElement;
    if (iframe && lat && lng) {
      // Use higher zoom level (18) and more precise marker for better accuracy
      iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${lat},${lng}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`;
    }
  };

  // Function to get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toString();
          const lng = position.coords.longitude.toString();
          
          // Update form data
          setFormData(prev => ({
            ...prev,
            coordinates: {
              latitude: lat,
              longitude: lng
            }
          }));
          
          // Update map
          updateMapLocation(lat, lng);
          
          // Attempt to reverse geocode for address
          reverseGeocode(lat, lng);
        },
        (error) => {
          console.error("Error getting location: ", error);
          toast.error("Unable to get your current location. Please check your browser permissions.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  // Reverse geocode to get address from coordinates
  const reverseGeocode = (lat: string, lng: string) => {
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    
    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === "OK" && data.results && data.results.length > 0) {
          const address = data.results[0];
          
          // Extract address components
          const addressComponents: Record<string, string> = {
            street: '',
            city: '',
            state: '',
            zipCode: ''
          };
          
          // Map address components to our format
          address.address_components.forEach((component: any) => {
            const types = component.types;
            
            if (types.includes('route')) {
              addressComponents.street = component.long_name;
            } else if (types.includes('locality')) {
              addressComponents.city = component.long_name;
            } else if (types.includes('administrative_area_level_1')) {
              addressComponents.state = component.long_name;
            } else if (types.includes('postal_code')) {
              addressComponents.zipCode = component.long_name;
            }
          });
          
          // Check if we have a street address, if not use formatted address
          if (!addressComponents.street && address.formatted_address) {
            const formattedParts = address.formatted_address.split(',');
            if (formattedParts.length > 0) {
              addressComponents.street = formattedParts[0];
            }
          }
          
          // Update address in form data
          setFormData(prev => ({
            ...prev,
            address: addressComponents
          }));
          
          // Update landmark with nearby point of interest if available
          const landmark = data.results.find((result: any) => 
            result.types.some((type: string) => 
              ['point_of_interest', 'establishment', 'premise'].includes(type)
            )
          );
          
          if (landmark && landmark.name) {
            setFormData(prev => ({
              ...prev,
              landmark: landmark.name
            }));
          }
          
          toast.success("Location details updated successfully");
        } else {
          console.error("Geocoding failed:", data.status);
        }
      })
      .catch(error => {
        console.error("Error during reverse geocoding:", error);
      });
  };

  // Function to open location picker in Google Maps
  const openLocationPicker = () => {
    const lat = formData.coordinates.latitude || "20.5937";
    const lng = formData.coordinates.longitude || "78.9629";
    window.open(`https://www.google.com/maps/@${lat},${lng},18z`, '_blank');
    toast.info("After selecting a location in Google Maps, please manually input the coordinates here.");
  };

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
              <OfficeSpaceType onOfficeTypeChange={(type) => setFormData(prev => ({ ...prev, officeType: type }))} />
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <MapPin className="text-black mr-2" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Location Details</h3>
            </div>
            <div className="space-y-6">
              <CommercialPropertyAddress onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))} />
              
              <div className="bg-white p-6 rounded-lg space-y-6">
                <h4 className="text-lg font-medium mb-4 text-black">Map Location</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Use the map below to set your property's location. Click on the map or search for an address.
                </p>
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative mb-6">
                  <iframe
                    id="map-iframe"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${formData.coordinates.longitude || '78.9629'}!3d${formData.coordinates.latitude || '20.5937'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${formData.coordinates.latitude || '20.5937'},${formData.coordinates.longitude || '78.9629'}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                    title="Property Location Map"
                  ></iframe>
                  
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <button 
                      onClick={() => getCurrentLocation()}
                      className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                      aria-label="Get current location"
                      type="button"
                    >
                      <Locate className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">My Location</span>
                    </button>
                    
                    <button
                      onClick={() => openLocationPicker()}
                      className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                      aria-label="Select location"
                      type="button"
                    >
                      <Navigation className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">Select Location</span>
                    </button>
                  </div>
                  
                  <div className="absolute bottom-2 left-2 bg-white bg-opacity-75 px-2 py-1 rounded text-xs text-gray-600">
                    Powered by Google Maps
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-4 text-black">Coordinates</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="latitude" className="block text-gray-800 font-medium mb-2">
                        Latitude
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="latitude"
                          value={formData.coordinates.latitude}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(Number(value)) || value === '-' || value === '') {
                              setFormData(prev => ({
                                ...prev,
                                coordinates: {
                                  ...prev.coordinates,
                                  latitude: value
                                }
                              }));
                              
                              // Update map when latitude changes
                              updateMapLocation(
                                value, 
                                formData.coordinates.longitude || '78.9629'
                              );
                            }
                          }}
                          placeholder="Enter latitude (e.g., 17.683301)"
                          className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                        />
                        <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="longitude" className="block text-gray-800 font-medium mb-2">
                        Longitude
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="longitude"
                          value={formData.coordinates.longitude}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(Number(value)) || value === '-' || value === '') {
                              setFormData(prev => ({
                                ...prev,
                                coordinates: {
                                  ...prev.coordinates,
                                  longitude: value
                                }
                              }));
                              
                              // Update map when longitude changes
                              updateMapLocation(
                                formData.coordinates.latitude || '20.5937',
                                value
                              );
                            }
                          }}
                          placeholder="Enter longitude (e.g., 83.019301)"
                          className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                        />
                        <Navigation className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Enter coordinates manually or use the map above to set the location.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <Landmark 
                  onLandmarkChange={(landmark) => setFormData(prev => ({ ...prev, landmark }))} 
                  onLocationSelect={(location) => {
                    setFormData(prev => ({ ...prev, coordinates: location }));
                    // Update map when location changes
                    updateMapLocation(location.latitude, location.longitude);
                  }}
                  latitude={formData.coordinates.latitude}
                  longitude={formData.coordinates.longitude}
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
              </div>
              
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
            <OfficeSpaceDetails onDetailsChange={(details) => {
              console.log('OfficeSpaceDetails provided:', details);
              console.log('Cabins data:', details.cabins);
              setFormData(prev => ({ ...prev, officeDetails: details }));
            }} />
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
  ]

  const validateCurrentStep = () => {
    // Add validation logic based on the current step
    switch (currentStep) {
      case 0: // Basic Information
        return !!formData.propertyName &&
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
      handleNext();
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

  const handleNext = (e: React.MouseEvent) => {
    preventDefault(e);
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
        title: formData.propertyName || '',
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
    console.log('Office Space Details in Backend Data:', backendData.officeSpaceDetails);
    console.log('Other Charges in Backend Data:', backendData.leaseTerms.otherCharges);

    return backendData;
  };

  return (
    <div className="min-h-screen bg-white">
      <form ref={formRef} onSubmit={preventDefault} className="max-w-3xl mx-auto" noValidate>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep].title}</h2>
        </div>

        {steps[currentStep].component}

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}
          <button
            type="button"
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaseOfficeSpaceMain;

