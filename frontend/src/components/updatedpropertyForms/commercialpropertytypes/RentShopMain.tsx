"use client"

import React, { useState, useEffect, useRef } from "react"
import { toast } from 'react-toastify'
import MapSelector from "../MapSelector"
import ShopDetails from "../CommercialComponents/ShopDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Rent from "../residentialrent/Rent"
import SecurityDeposit from "../residentialrent/SecurityDeposit"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import OtherCharges from "../residentialrent/OtherCharges"
import Brokerage from "../residentialrent/Brokerage"
import AvailabilityDate from "../AvailabilityDate"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"

import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon, DollarSign, Calendar, Locate, Navigation, Loader2 } from "lucide-react"

import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import PropertyName from "../PropertyName"
import ShopType from "../CommercialComponents/ShopType"
import CornerProperty from "../CommercialComponents/CornerProperty"
import MapLocation from "../CommercialComponents/MapLocation"
// import MapLocation from "../CommercialComponents/MapLocation"

interface IBasicInformation {
  title: string;
  shopType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  location: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
}

interface IShopDetails {
  frontageWidth: number;
  heightOfShop: number;
  displayWindow: boolean;
  attachedStorageRoom: boolean;
  averageFootTraffic: string;
  customerParking: boolean;
  previousBusiness: string;
}

interface IRentalTerms {
  rentDetails: {
    expectedRent: number;
    isNegotiable: boolean;
    rentType: string;
  };
  securityDeposit: {
    amount: number;
  };
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  otherCharges: {
    water: {
      amount?: number;
      type: string;
    };
    electricity: {
      amount?: number;
      type: string;
    };
    gas: {
      amount?: number;
      type: string;
    };
    others: {
      amount?: number;
      type: string;
    };
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: string;
    date?: string;
  };
}

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
}

interface IMedia {
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
}

interface FormData {
  basicInformation: IBasicInformation;
  shopDetails: IShopDetails;
  rentalTerms: IRentalTerms;
  contactInformation: IContactInformation;
  media: IMedia;
}

interface PropertyNameProps {
  propertyName: string;
  onPropertyNameChange: (name: string) => void;
}

interface ShopTypeProps {
  onShopTypeChange: (types: string[]) => void;
}

interface CornerPropertyProps {
  onCornerPropertyChange: (isCorner: boolean) => void;
}

interface ShopDetailsProps {
  onDetailsChange: (details: IShopDetails) => void;
}

interface RentProps {
  onRentChange: (rent: { expectedRent: number; isNegotiable: boolean; rentType: string }) => void;
}

interface SecurityDepositProps {
  onSecurityDepositChange: (deposit: { amount: number }) => void;
}

interface MaintenanceAmountProps {
  onMaintenanceAmountChange: (maintenance: { amount: number; frequency: string }) => void;
}

interface OtherChargesProps {
  onOtherChargesChange: (charges: {
    water: { type: string; amount?: number };
    electricity: { type: string; amount?: number };
    gas: { type: string; amount?: number };
    others: { type: string; amount?: number };
  }) => void;
}

interface BrokerageProps {
  onBrokerageChange: (brokerage: { required: string; amount?: number }) => void;
}

interface AvailabilityDateProps {
  onAvailabilityChange: (availability: { type: string; date?: string }) => void;
}

interface CommercialContactDetailsProps {
  onContactChange: (contact: IContactInformation) => void;
}

interface CommercialMediaUploadProps {
  onMediaChange: (media: {
    images: { category: string; files: { file: File }[] }[];
    video?: { file: File };
    documents: { file: File }[];
  }) => void;
}

const RentShopMain = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
      shopType: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      landmark: '',
      location: {
        latitude: '',
        longitude: ''
      },
      isCornerProperty: false
    },
    shopDetails: {
      frontageWidth: 0,
      heightOfShop: 0,
      displayWindow: false,
      attachedStorageRoom: false,
      averageFootTraffic: 'low',
      customerParking: false,
      previousBusiness: ''
    },
    rentalTerms: {
      rentDetails: {
        expectedRent: 0,
        isNegotiable: false,
        rentType: 'inclusive'
      },
      securityDeposit: {
        amount: 0
      },
      maintenanceAmount: {
        amount: 0,
        frequency: ''
      },
      otherCharges: {
        water: {
          type: '',
          amount: 0
        },
        electricity: {
          type: '',
          amount: 0
        },
        gas: {
          type: '',
          amount: 0
        },
        others: {
          type: '',
          amount: 0
        }
      },
      brokerage: {
        required: 'no'
      },
      availability: {
        type: 'immediate',
        date: ''
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
      videoTour: null,
      documents: []
    }
  })

  const [currentStep, setCurrentStep] = useState(0)

  // Function to update map location based on latitude and longitude
  const updateMapLocation = (lat: string, lng: string) => {
    const iframe = document.getElementById('map-iframe') as HTMLIFrameElement;
    if (iframe && lat && lng) {
      // Use higher zoom level (18) and more precise marker for better accuracy
      iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${lat},${lng}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`;
    }
  };

  // Function to get current location
  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude.toString();
  //         const lng = position.coords.longitude.toString();

  //         // Update form data
  //         setFormData(prev => ({
  //           ...prev,
  //           basicInformation: {
  //             ...prev.basicInformation,
  //             location: {
  //               latitude: parseFloat(lat),
  //               longitude: parseFloat(lng)
  //             }
  //           }
  //         }));

  //         // Update map
  //         updateMapLocation(lat, lng);

  //         // Attempt to reverse geocode for address
  //         reverseGeocode(lat, lng);
  //       },
  //       (error) => {
  //         console.error("Error getting location: ", error);
  //         toast.error("Unable to get your current location. Please check your browser permissions.");
  //       }
  //     );
  //   } else {
  //     toast.error("Geolocation is not supported by your browser.");
  //   }
  // };

  // // Reverse geocode to get address from coordinates
  // const reverseGeocode = (lat: string, lng: string) => {
  //   const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

  //   fetch(geocodingUrl)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.status === "OK" && data.results && data.results.length > 0) {
  //         const address = data.results[0];

  //         // Extract address components
  //         const addressComponents = {
  //           street: '',
  //           city: '',
  //           state: '',
  //           zipCode: ''
  //         };

  //         // Map address components to our format
  //         address.address_components.forEach((component: any) => {
  //           const types = component.types;

  //           if (types.includes('route')) {
  //             addressComponents.street = component.long_name;
  //           } else if (types.includes('locality')) {
  //             addressComponents.city = component.long_name;
  //           } else if (types.includes('administrative_area_level_1')) {
  //             addressComponents.state = component.long_name;
  //           } else if (types.includes('postal_code')) {
  //             addressComponents.zipCode = component.long_name;
  //           }
  //         });

  //         // Check if we have a street address, if not use formatted address
  //         if (!addressComponents.street && address.formatted_address) {
  //           const formattedParts = address.formatted_address.split(',');
  //           if (formattedParts.length > 0) {
  //             addressComponents.street = formattedParts[0];
  //           }
  //         }

  //         // Update address in form data
  //         setFormData(prev => ({
  //           ...prev,
  //           basicInformation: {
  //             ...prev.basicInformation,
  //             address: addressComponents
  //           }
  //         }));

  //         // Update landmark with nearby point of interest if available
  //         const landmark = data.results.find((result: any) =>
  //           result.types.some((type: string) =>
  //             ['point_of_interest', 'establishment', 'premise'].includes(type)
  //           )
  //         );

  //         if (landmark && landmark.name) {
  //           setFormData(prev => ({
  //             ...prev,
  //             basicInformation: {
  //               ...prev.basicInformation,
  //               landmark: landmark.name
  //             }
  //           }));
  //         }

  //         toast.success("Location details updated successfully");
  //       } else {
  //         console.error("Geocoding failed:", data.status);
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error during reverse geocoding:", error);
  //     });
  // };

  // // Function to open location picker in Google Maps
  // const openLocationPicker = () => {
  //   const lat = formData.basicInformation.location.latitude.toString() || "20.5937";
  //   const lng = formData.basicInformation.location.longitude.toString() || "78.9629";
  //   window.open(`https://www.google.com/maps/@${lat},${lng},18z`, '_blank');
  //   toast.info("After selecting a location in Google Maps, please manually input the coordinates here.");
  // };

  // const handleLocationSelect = (latitude: string, longitude: string) => {
  //   setFormData({
  //     ...formData,
  //     basicInformation: {
  //       ...formData.basicInformation,
  //       location: {
  //         latitude: parseFloat(latitude),
  //         longitude: parseFloat(longitude)
  //       }
  //     }
  //   });

  //   // Update map when coordinates change
  //   updateMapLocation(latitude, longitude);
  // };

  const handleChange = (key: string, value: any) => {
    setFormData(prev => {
      const keys = key.split('.');
      if (keys.length > 1) {
        const newData = { ...prev };
        let current: any = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
      }
      return { ...prev, [key]: value };
    });
  };

  const formSections = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, title: name }
            }))}
          />
          <ShopType
            onShopTypeChange={(types) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, shopType: types }
            }))}
          />
          <CommercialPropertyAddress
            onAddressChange={(address) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, address }
            }))}
          />
          {/* <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-8">
              <MapPin className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Map Location</h3>
            </div>
            <div className="bg-white p-6 rounded-lg space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-4 text-black">Select Location on Map</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Use the map below to set your property's location. Click on the map or search for an address.
                </p>
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative mb-6">
                  <iframe
                    id="map-iframe"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${formData.basicInformation.location.longitude || '78.9629'}!3d${formData.basicInformation.location.latitude || '20.5937'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${formData.basicInformation.location.latitude || '20.5937'},${formData.basicInformation.location.longitude || '78.9629'}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`}
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
                        value={formData.basicInformation.location.latitude}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!isNaN(Number(value)) || value === '-' || value === '') {
                            setFormData(prev => ({
                              ...prev,
                              basicInformation: {
                                ...prev.basicInformation,
                                location: {
                                  ...prev.basicInformation.location,
                                  latitude: parseFloat(value) || 0
                                }
                              }
                            }));
                            
                            // Update map when latitude changes
                            updateMapLocation(
                              value, 
                              formData.basicInformation.location.longitude.toString() || '78.9629'
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
                        value={formData.basicInformation.location.longitude}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!isNaN(Number(value)) || value === '-' || value === '') {
                            setFormData(prev => ({
                              ...prev,
                              basicInformation: {
                                ...prev.basicInformation,
                                location: {
                                  ...prev.basicInformation.location,
                                  longitude: parseFloat(value) || 0
                                }
                              }
                            }));
                            
                            // Update map when longitude changes
                            updateMapLocation(
                              formData.basicInformation.location.latitude.toString() || '20.5937',
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
          </div> */}
          <MapLocation
            latitude={formData.basicInformation.location.latitude.toString()}
            longitude={formData.basicInformation.location.longitude.toString()}
            onLocationChange={(location) => handleChange('basicInformation.location', location)}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
          />
          {/* <Landmark
            onLandmarkChange={(landmark) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, landmark }
            }))}
            onLocationSelect={(location) => {
              setFormData(prev => ({
                ...prev,
                basicInformation: {
                  ...prev.basicInformation,
                  location: {
                    latitude: parseFloat(location.latitude),
                    longitude: parseFloat(location.longitude)
                  }
                }
              }));
              // Update map when location changes from Landmark component
              updateMapLocation(location.latitude, location.longitude);
            }}
            latitude={formData.basicInformation.location.latitude.toString()}
            longitude={formData.basicInformation.location.longitude.toString()}
          /> */}
          <CornerProperty
            onCornerPropertyChange={(isCorner) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Shop Details",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <ShopDetails
            onDetailsChange={(details) => setFormData(prev => ({
              ...prev,
              shopDetails: {
                frontageWidth: details.frontageWidth,
                heightOfShop: details.heightOfShop,
                displayWindow: details.displayWindow,
                attachedStorageRoom: details.attachedStorageRoom,
                averageFootTraffic: details.averageFootTraffic,
                customerParking: details.customerParking,
                previousBusiness: details.previousBusiness
              }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Rental Terms",
      icon: <DollarSign className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Rent
            onRentChange={(rent) => setFormData(prev => ({
              ...prev,
              rentalTerms: {
                ...prev.rentalTerms,
                rentDetails: {
                  expectedRent: rent.expectedRent,
                  isNegotiable: rent.isNegotiable,
                  rentType: rent.rentType
                }
              }
            }))}
          />
          {formData.rentalTerms.rentDetails.rentType === 'exclusive' && (
            <MaintenanceAmount
              onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({
                ...prev,
                rentalTerms: {
                  ...prev.rentalTerms,
                  maintenanceAmount: {
                    amount: maintenance.amount,
                    frequency: maintenance.frequency
                  }
                }
              }))}
            />
          )}
          <SecurityDeposit
            onSecurityDepositChange={(deposit) => setFormData(prev => ({
              ...prev,
              rentalTerms: {
                ...prev.rentalTerms,
                securityDeposit: {
                  amount: deposit.amount
                }
              }
            }))}
          />
          <OtherCharges
            onOtherChargesChange={(charges) => setFormData(prev => ({
              ...prev,
              rentalTerms: {
                ...prev.rentalTerms,
                otherCharges: {
                  water: { type: charges.water.type, amount: charges.water.amount },
                  electricity: { type: charges.electricity.type, amount: charges.electricity.amount },
                  gas: { type: charges.gas.type, amount: charges.gas.amount },
                  others: { type: charges.others.type, amount: charges.others.amount }
                }
              }
            }))}
          />
          <Brokerage
            onBrokerageChange={(brokerage) => setFormData(prev => ({
              ...prev,
              rentalTerms: {
                ...prev.rentalTerms,
                brokerage: {
                  required: brokerage.required,
                  amount: brokerage.amount
                }
              }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <AvailabilityDate
            onAvailabilityChange={(availability) => setFormData(prev => ({
              ...prev,
              rentalTerms: {
                ...prev.rentalTerms,
                availability: {
                  type: availability.type,
                  date: availability.date
                }
              }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <CommercialContactDetails
            onContactChange={(contact) => setFormData(prev => ({
              ...prev,
              contactInformation: {
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                alternatePhone: contact.alternatePhone,
                bestTimeToContact: contact.bestTimeToContact
              }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      content: (
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
      ),
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false)
  // const navigate = useNavigate()

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
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

  const handlePrevious = () => {
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

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData)

    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

        // Convert media files to base64
        const convertFileToBase64 = (file: File): Promise<string> => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
          });
        };

        const convertedMedia = {
          photos: {
            exterior: await Promise.all((formData.media?.photos?.exterior ?? []).map(convertFileToBase64)),
            interior: await Promise.all((formData.media?.photos?.interior ?? []).map(convertFileToBase64)),
            floorPlan: await Promise.all((formData.media?.photos?.floorPlan ?? []).map(convertFileToBase64)),
            washrooms: await Promise.all((formData.media?.photos?.washrooms ?? []).map(convertFileToBase64)),
            lifts: await Promise.all((formData.media?.photos?.lifts ?? []).map(convertFileToBase64)),
            emergencyExits: await Promise.all((formData.media?.photos?.emergencyExits ?? []).map(convertFileToBase64))
          },
          videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : undefined,
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

        const response = await axios.post('/api/commercial/rent/shops', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          toast.success('Commercial rent shop listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial rent shop listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
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
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Rent Commercial Shop</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep].content}
      </div>
      
      {/* Navigation Buttons */}
      {/* {!formSubmitted && ( */}
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
            onClick={currentStep === formSections.length - 1 ? handleSubmit : handleNext}
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
                {currentStep === formSections.length - 1 ? 'Submit' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
      {/* )} */}
    </div>
    // </div>
    // </div>
    // </div>
  )
}

export default RentShopMain

