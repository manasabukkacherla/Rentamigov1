"use client"

import React, { useState, useRef } from "react"
import { Building2, MapPin, IndianRupee, Calendar, Image, Ruler, Home, ChevronLeft, ChevronRight, Locate, Navigation, Loader2 } from "lucide-react"
import PropertyName from "../PropertyName"
import PropertyAddress from "../PropertyAddress"
import MapCoordinates from "../MapCoordinates"
import PropertySize from "../PropertySize"
import Restrictions from "../Restrictions"
import PropertyFeatures from "../PropertyFeatures"
import LeaseAmount from "../lease/LeaseAmount"
import LeaseTenure from "../lease/LeaseTenure"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import Brokerage from "../residentialrent/Brokerage"
import AvailabilityDate from "../AvailabilityDate"
import OtherCharges from "../residentialrent/OtherCharges"
import MediaUpload from "../MediaUpload"
import FlatAmenities from "../FlatAmenities"
import SocietyAmenities from "../SocietyAmenities"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface LeaseApartmentProps {
  propertyId: string
  onSubmit?: (formData: any) => void
}

const LeaseApartment = ({ propertyId, onSubmit }: LeaseApartmentProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    propertyId,
    propertyName: "",
    propertyAddress: {
      flatNo: 0,
      floor: 0,
      houseName: "",
      address: "",
      pinCode: "",
      city: "",
      street: "",
      state: "",
      zipCode: "",
    },
    coordinates: { latitude: "", longitude: "" },
    size: "",
    restrictions: {},
    features: {},
    leaseAmount: {},
    leaseTenure: {},
    maintenanceAmount: {},
    brokerage: {},
    availability: {},
    media: {
      exteriorViews: [] as File[],
      interiorViews: [] as File[],
      floorPlan: [] as File[],
      washrooms: [] as File[],
      lifts: [] as File[],
      emergencyExits: [] as File[],
      videoTour: null as File | null,
      legalDocuments: [] as File[]
    },
    otherCharges: {},
    flatAmenities: {},
    societyAmenities: {},
  })

  // Function to update map location based on latitude and longitude
  const updateMapLocation = (lat: string, lng: string) => {
    const iframe = document.getElementById('map-iframe') as HTMLIFrameElement;
    if (iframe && lat && lng) {
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
          
          setFormData(prev => ({
            ...prev,
            coordinates: {
              latitude: lat,
              longitude: lng
            }
          }));
          
          updateMapLocation(lat, lng);
          
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
          
          const addressComponents = {
            street: '',
            city: '',
            state: '',
            zipCode: ''
          };
          
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
          
          if (!addressComponents.street && address.formatted_address) {
            const formattedParts = address.formatted_address.split(',');
            if (formattedParts.length > 0) {
              addressComponents.street = formattedParts[0];
            }
          }
          
          setFormData(prev => ({
            ...prev,
            propertyAddress: {
              ...prev.propertyAddress,
              ...addressComponents
            }
          }));
          
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

  const handleAddressChange = (addressData: any) => {
    setFormData(prev => ({
      ...prev,
      propertyAddress: { ...prev.propertyAddress, ...addressData }
    }));
  };

  const formSections = [
    {
      title: "Basic Information",
      icon: <Home className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
            <div className="space-y-8">
               <PropertyName
                  propertyName={formData.propertyName}
                  onPropertyNameChange={(name) =>
                    setFormData((prev) => ({ ...prev, propertyName: name }))
                  }
                />
              </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyAddress
                  address={formData.propertyAddress}
                  onAddressChange={(address) =>
                    setFormData((prev) => ({ ...prev, propertyAddress: address }))
                  }
                />
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
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Size</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertySize
                  onPropertySizeChange={(size) =>
                    setFormData((prev) => ({ ...prev, size }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Features</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyFeatures
                  onFeaturesChange={(features) =>
                    setFormData((prev) => ({ ...prev, features }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <Restrictions
              restrictions={formData.features.restrictions}
              onChange={(restrictions: string[]) => setFormData(prev => ({
                ...prev,
                features: { ...prev.features, restrictions }
              }))}
            />
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Amenities</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <FlatAmenities
                  onAmenitiesChange={(amenities) =>
                    setFormData((prev) => ({ ...prev, flatAmenities: amenities }))
                  }
                />
                <SocietyAmenities
                  onAmenitiesChange={(amenities) =>
                    setFormData((prev) => ({ ...prev, societyAmenities: amenities }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <IndianRupee className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          
              
               <LeaseAmount
                  onLeaseAmountChange={(amount) =>
                    setFormData((prev) => ({ ...prev, leaseAmount: amount }))
                  }
                />
                <LeaseTenure
                  onLeaseTenureChange={(tenure) =>
                    setFormData((prev) => ({ ...prev, leaseTenure: tenure }))
                  }
                />
                <MaintenanceAmount
                  onMaintenanceAmountChange={(amount) =>
                    setFormData((prev) => ({ ...prev, maintenanceAmount: amount }))
                  }
                />
                <OtherCharges
                  onOtherChargesChange={(charges) =>
                    setFormData((prev) => ({ ...prev, otherCharges: charges }))
                  }
                />
                <Brokerage
                  onBrokerageChange={(brokerage) =>
                    setFormData((prev) => ({ ...prev, brokerage }))
                  }
                />
              </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <AvailabilityDate
                onAvailabilityChange={(availability) =>
                  setFormData((prev) => ({ ...prev, availability }))
                }
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-6 h-6" />,
      component: (
        
          <div className="space-y-8">
            <MediaUpload
                onMediaChange={(media) => setFormData((prev) => ({
                  ...prev,
                  media: {
                    exteriorViews: media.exteriorViews || [],
                    interiorViews: media.interiorViews || [],
                    floorPlan: media.floorPlan || [],
                    washrooms: media.washrooms || [],
                    lifts: media.lifts || [],
                    emergencyExits: media.emergencyExits || [],
                    videoTour: media.videoTour || null,
                    legalDocuments: media.legalDocuments || []
                  }
                }))}
              />
            </div>
      ),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSuccess("Property details submitted successfully!");
    } catch (error) {
      setError("Failed to submit property details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
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
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    if (index < currentStep) {
                      setCurrentStep(index);
                      setTimeout(() => {
                        if (formRef.current) {
                          window.scrollTo({
                            top: formRef.current.offsetTop - 100,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    }
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
                  {index < formSections.length - 1 && (
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

      <div className="space-y-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your apartment property</p>
        </div>
        <div className="space-y-8">{formSections[currentStep].component}</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          {currentStep > 0 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg border border-black/20 bg-white text-black transition-all duration-200"
              onClick={handlePrevious}
              disabled={loading}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < formSections.length - 1 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white transition-all duration-200"
              onClick={handleNext}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white transition-all duration-200"
              onClick={() => onSubmit?.(formData)}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Submitting...
                </>
              ) : (
                <>
                  List Property
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default LeaseApartment;