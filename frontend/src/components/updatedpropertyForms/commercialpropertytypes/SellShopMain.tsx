import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Navigate} from 'react-router-dom';
import PropertyName from '../PropertyName';
import ShopType from '../CommercialComponents/ShopType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShopDetails from '../CommercialComponents/ShopDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Price from '../sell/Price';
import PricePerSqft from '../sell/PricePerSqft';
import RegistrationCharges from '../sell/RegistrationCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

import { Store, ChevronRight, ChevronLeft, Building2, UserCircle, ImageIcon, Calendar, DollarSign, CheckCircle, Loader2, MapPin, Locate, Navigation } from "lucide-react"
import { toast } from 'react-toastify';
import MapSelector from '../MapSelector';
import MapLocation from '../CommercialComponents/MapLocation';

const globalStyles = `
  input::placeholder,
  textarea::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
  
  /* Make radio button and checkbox text black */
  input[type="radio"] + label,
  input[type="checkbox"] + label {
    color: black;
  }
  
  /* Make select placeholder text black */
  select {
    color: black;
  }
  
  /* Make all form labels black */
  label {
    color: black;
  }
  
  /* Make all input text black */
  input,
  textarea,
  select {
    color: black;
  }
`;

interface FormData {
  propertyId?: String;
  basicInformation: {
    title: string;
    Type: string[];
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    }
    landmark: string;
    location: {
      latitude: string;
      longitude: string;
    };
    isCornerProperty: boolean;
  };
  propertyDetails: {
    area: {
      totalArea: number;
      builtUpArea: number;
      carpetArea: number;
    };
    floor: {
      floorNumber: number;
      totalFloors: number;
    };
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
  };
  shopDetails: {
    frontageWidth: number;
    heightOfShop: number;
    displayWindow: boolean;
    attachedStorageRoom: boolean;
    averageFootTraffic: string;
    customerParking: boolean;
    previousBusiness: string;
  };
  pricingDetails: {
    propertyPrice: number;
    pricetype: string;
    area: number;
    totalprice: number;
    pricePerSqft: number;
  };
  registration: {
    chargestype: string;
    registrationAmount: number;
    stampDutyAmount: number;
    brokeragedetails: boolean;
    brokerageAmount: number;
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    availableFrom: string;
    availableImmediately: boolean;
    leaseDuration: string;
    noticePeriod: string;
    petsAllowed: boolean;
    operatingHours: {
      restricted: boolean;
      restrictions: string;
    };
  };
  contactInformation: {
    name: string;
    email: string;
    phone: string;
    alternatePhone: string;
    bestTimeToContact: string;
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
  },
  metadata: {
    createdBy: string;
    createdAt: Date;
    propertyType: string;
    intent: string;
    propertyName: string;
    status: string;
  };
}

const SellShopMain = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
      Type: [],
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
      isCornerProperty: false,
    },
    propertyDetails: {
      area: {
        totalArea: 0,
        builtUpArea: 0,
        carpetArea: 0
      },
      floor: {
        floorNumber: 0,
        totalFloors: 0
      },
      facingDirection: '',
      furnishingStatus: '',
      propertyAmenities: [] as string[],
      wholeSpaceAmenities: [] as string[],
      electricitySupply: {
        powerLoad: 0,
        backup: false
      },
      waterAvailability: '',
      propertyAge: '',
      propertyCondition: ''
    },
    shopDetails: {
      frontageWidth: 0,
      heightOfShop: 0,
      displayWindow: false,
      attachedStorageRoom: false,
      averageFootTraffic: '',
      customerParking: false,
      previousBusiness: ''
    },
    pricingDetails: {
      propertyPrice: 0,
      pricetype: "fixed",
      area: 0,
      totalprice: 0,
      pricePerSqft: 0
    },
    registration: {
      chargestype: '',
      registrationAmount: 0,
      stampDutyAmount: 0,
      brokeragedetails: false,
      brokerageAmount: 0
    },
    brokerage: {
      required: 'no',
      amount: 0
    },
    availability: {
      availableFrom: '',
      availableImmediately: false,
      leaseDuration: '',
      noticePeriod: '',
      petsAllowed: false,
      operatingHours: {
        restricted: false,
        restrictions: ''
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
    },// ADD THIS METADATA SECTION
  metadata: {
    createdBy: '',
    createdAt: new Date(),
    propertyType: 'Commercial',
    intent: 'Sell',
    propertyName: 'Shop',
    status: 'Available'
  } 
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDebugMode, setIsDebugMode] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const params = useParams()
  const [Loading, setLoading] = useState(false)
   const propertyId = params.propertyId;
    
  
  // Function to get auth token

  // Check login status on component mount
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const renderFormSection = (content: React.ReactNode) => (
    <div className="space-y-4">
      {content}
    </div>
  );

  // Function to update map location based on latitude and longitude
  // const updateMapLocation = (lat: string, lng: string) => {
  //   const iframe = document.getElementById('map-iframe') as HTMLIFrameElement;
  //   if (iframe && lat && lng) {
  //     // Use higher zoom level (18) and more precise marker for better accuracy
  //     iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${lat},${lng}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`;
  //   }
  // };

  // Function to get current location
  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude.toString();
  //         const lng = position.coords.longitude.toString();

  //         // Update form data
  //         handleChange('basicInformation.location', {
  //           latitude: lat,
  //           longitude: lng
  //         });

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

  // Reverse geocode to get address from coordinates
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
  //         handleChange('basicInformation.address', addressComponents);

  //         // Update landmark with nearby point of interest if available
  //         const landmark = data.results.find((result: any) =>
  //           result.types.some((type: string) =>
  //             ['point_of_interest', 'establishment', 'premise'].includes(type)
  //           )
  //         );

  //         if (landmark && landmark.name) {
  //           handleChange('basicInformation.landmark', landmark.name);
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

  // Function to open location picker in Google Maps
  // const openLocationPicker = () => {
  //   const lat = formData.basicInformation.location.latitude || "20.5937";
  //   const lng = formData.basicInformation.location.longitude || "78.9629";
  //   window.open(`https://www.google.com/maps/@${lat},${lng},18z`, '_blank');
  //   toast.info("After selecting a location in Google Maps, please manually input the coordinates here.");
  // };

useEffect(() => {
  const fetchById = async () => {
    const user = sessionStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    } else {
      setIsLoggedIn(true);
    }

    if (!propertyId) return;
    console.log("Fetching Commercial Shop details for:", propertyId);
    setLoading(true);
    try {
      const response = await axios.get(`/api/commercial/sale/shops/${propertyId}`);
      
      if (response.data && response.data.data) {
        const sellshopData = response.data.data;
        
        // Transform the backend data to match frontend form structure
        setFormData((prev) => ({
          ...prev,
          propertyId: sellshopData.propertyId || '',
          basicInformation: {
            title: sellshopData.basicInformation?.title || '',
            Type: sellshopData.basicInformation?.Type || [],
            address: {
              street: sellshopData.basicInformation?.address?.street || '',
              city: sellshopData.basicInformation?.address?.city || '',
              state: sellshopData.basicInformation?.address?.state || '',
              zipCode: sellshopData.basicInformation?.address?.zipCode || ''
            },
            landmark: sellshopData.basicInformation?.landmark || '',
            location: {
              latitude: sellshopData.basicInformation?.location?.latitude?.toString() || '',
              longitude: sellshopData.basicInformation?.location?.longitude?.toString() || ''
            },
            isCornerProperty: sellshopData.basicInformation?.isCornerProperty || false
          },
          propertyDetails: {
            area: {
              totalArea: sellshopData.propertyDetails?.area?.totalArea || 0,
              builtUpArea: sellshopData.propertyDetails?.area?.builtUpArea || 0,
              carpetArea: sellshopData.propertyDetails?.area?.carpetArea || 0
            },
            floor: {
              floorNumber: sellshopData.propertyDetails?.floor?.floorNumber || 0,
              totalFloors: sellshopData.propertyDetails?.floor?.totalFloors || 0
            },
            facingDirection: sellshopData.propertyDetails?.facingDirection || '',
            furnishingStatus: sellshopData.propertyDetails?.furnishingStatus || '',
            propertyAmenities: sellshopData.propertyDetails?.propertyAmenities || [],
            wholeSpaceAmenities: sellshopData.propertyDetails?.wholeSpaceAmenities || [],
            electricitySupply: {
              powerLoad: sellshopData.propertyDetails?.electricitySupply?.powerLoad || 0,
              backup: sellshopData.propertyDetails?.electricitySupply?.backup || false
            },
            waterAvailability: Array.isArray(sellshopData.propertyDetails?.waterAvailability) 
              ? sellshopData.propertyDetails.waterAvailability[0] || ''
              : sellshopData.propertyDetails?.waterAvailability || '',
            propertyAge: sellshopData.propertyDetails?.propertyAge || '',
            propertyCondition: sellshopData.propertyDetails?.propertyCondition || ''
          },
          shopDetails: {
            frontageWidth: sellshopData.shopDetails?.frontageWidth || 0,
            heightOfShop: sellshopData.shopDetails?.heightOfShop || 0,
            displayWindow: sellshopData.shopDetails?.displayWindow || false,
            attachedStorageRoom: sellshopData.shopDetails?.attachedStorageRoom || false,
            averageFootTraffic: sellshopData.shopDetails?.averageFootTraffic || '',
            customerParking: sellshopData.shopDetails?.customerParking || false,
            previousBusiness: sellshopData.shopDetails?.previousBusiness || ''
          },
          pricingDetails: {
            propertyPrice: sellshopData.pricingDetails?.propertyPrice || 0,
            pricetype: sellshopData.pricingDetails?.pricetype || 'fixed',
            area: sellshopData.pricingDetails?.area || 0,
            totalprice: sellshopData.pricingDetails?.totalprice || 0,
            pricePerSqft: sellshopData.pricingDetails?.pricePerSqft || 0
          },
          registration: {
            chargestype: sellshopData.registration?.chargestype || '',
            registrationAmount: sellshopData.registration?.registrationAmount || 0,
            stampDutyAmount: sellshopData.registration?.stampDutyAmount || 0,
            brokeragedetails: sellshopData.registration?.brokeragedetails || false,
            brokerageAmount: sellshopData.registration?.brokerageAmount || 0
          },
          brokerage: {
            required: sellshopData.brokerage?.required || 'no',
            amount: sellshopData.brokerage?.amount || 0
          },
          availability: {
            availableFrom: sellshopData.availability?.availableFrom ? 
                  new Date(sellshopData.availability.availableFrom).toISOString().split('T')[0] : '',
            availableImmediately: sellshopData.availability?.availableImmediately || false,
            leaseDuration: sellshopData.availability?.leaseDuration || '',
            noticePeriod: sellshopData.availability?.noticePeriod || '',
            petsAllowed: sellshopData.availability?.petsAllowed || false,
            operatingHours: {
              restricted: sellshopData.availability?.operatingHours?.restricted || false,
              restrictions: sellshopData.availability?.operatingHours?.restrictions || ''
            }
          },
          contactInformation: {
            name: sellshopData.contactInformation?.name || '',
            email: sellshopData.contactInformation?.email || '',
            phone: sellshopData.contactInformation?.phone || '',
            alternatePhone: sellshopData.contactInformation?.alternatePhone || '',
            bestTimeToContact: sellshopData.contactInformation?.bestTimeToContact || ''
          },
          media: {
            photos: {
              exterior: sellshopData.media?.photos?.exterior || [],
              interior: sellshopData.media?.photos?.interior || [],
              floorPlan: sellshopData.media?.photos?.floorPlan || [],
              washrooms: sellshopData.media?.photos?.washrooms || [],
              lifts: sellshopData.media?.photos?.lifts || [],
              emergencyExits: sellshopData.media?.photos?.emergencyExits || []
            },
            videoTour: sellshopData.media?.videoTour || null,
            documents: sellshopData.media?.documents || []
          }
        }));

        console.log('Shop form data set successfully:', sellshopData);
      } else {
        toast.error('No data found for this shop property');
        navigate('/Userdashboard/properties');
      }
    } catch (error: any) {
      console.error('Error fetching shop property details:', error);
      toast.error('Failed to load shop property details');
      navigate('/Userdashboard/properties');
    } finally {
      setLoading(false);
    }
  };

  if (propertyId) {
    fetchById();
  }
}, [propertyId, navigate]);
  const formSections = [
    {
      title: 'Basic Information',
      icon: <Store className="w-5 h-5" />,
      content: renderFormSection(
        <div className="space-y-6">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) => handleChange('basicInformation.title', name)}
          />
          <ShopType
            Type={formData.basicInformation.Type}
            onShopTypeChange={(type) => handleChange('basicInformation.type', type)}
          />
          <CommercialPropertyAddress
            address={formData.basicInformation.address}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
          />
          <MapLocation
            latitude={formData.basicInformation.location.latitude}
            longitude={formData.basicInformation.location.longitude}
            landmark={formData.basicInformation.landmark}
            onLocationChange={(location) => handleChange('basicInformation.location', location)}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
          />
          {/* <Landmark
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
            onLocationSelect={(location) => handleChange('basicInformation.location', location)}
            latitude={formData.basicInformation.location.latitude}
            longitude={formData.basicInformation.location.longitude}
          /> */}
          <CornerProperty
            isCornerProperty={formData.basicInformation.isCornerProperty}
            onCornerPropertyChange={(isCorner) => handleChange('basicInformation.isCornerProperty', isCorner)}
          />
        </div>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-5 h-5" />,
      content: renderFormSection(
        <div className="space-y-6">
          <ShopDetails
            shopDetails={formData.shopDetails}
            onDetailsChange={(details) => handleChange('shopDetails', details)}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => handleChange('propertyDetails', details)}
          />
        </div>
      )
    },
    {
      title: 'Pricing Details',
      icon: <DollarSign className="w-5 h-5" />,
      content: renderFormSection(
        <div className="space-y-6">
          <Price onPriceChange={(price) => {
            setFormData(prev => ({
              ...prev,
              pricingDetails: {
                ...prev.pricingDetails,
                propertyPrice: price.propertyPrice,
                pricetype: price.pricetype,
                area: price.area || 0,
                totalprice: price.totalprice || 0,
              }
            }));
          }} />
          <PricePerSqft
            propertyPrice={formData.pricingDetails.propertyPrice}
            Area={formData.propertyDetails.area}
            onPricePerSqftChange={(data) => {
              setFormData(prev => ({
                ...prev,
                pricingDetails: {
                  ...prev.pricingDetails,
                  area: data.area || 0,
                  totalprice: data.totalprice || 0,
                  pricePerSqft: data.pricePerSqft || 0
                }
              }));
            }}
          />
          <div className="space-y-4 text-black">
            <div className="text-black">
              <RegistrationCharges onRegistrationChargesChange={(charges) => {
                setFormData(prev => ({
                  ...prev,
                  registration: {
                    chargestype: charges.chargestype,
                    registrationAmount: charges.registrationAmount,
                    stampDutyAmount: charges.stampDutyAmount,
                    brokeragedetails: false,
                    brokerageAmount: 0
                  }
                }));
              }} />
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="text-black">
              <Brokerage bro={formData.brokerage} 
              onBrokerageChange={(brokerage) => setFormData(prev => ({
                ...prev,
                brokerage: brokerage
              }))}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-5 h-5" />,
      content: renderFormSection(
        <div className="space-y-6">
          <CommercialAvailability onAvailabilityChange={(availability) => handleChange('availability', availability)} />
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <UserCircle className="w-5 h-5" />,
      content: renderFormSection(
        <div className="space-y-6">
          <CommercialContactDetails 
            contactInformation={formData.contactInformation}
            onContactChange={(contact) => handleChange('contactInformation', contact)} />
        </div>
      )
    },
    {
  title: 'Property Media',
  icon: <ImageIcon className="w-5 h-5" />,
  content: renderFormSection(
    <div className="space-y-6">
      <CommercialMediaUpload
        Media={{
          photos: Object.entries(formData.media.photos).map(([category, files]) => ({
            category,
            files: files.map(file => {
              if (file instanceof File) {
                return { url: URL.createObjectURL(file), file, isNew: true };
              } else {
                return { url: file, file: null, isNew: false };
              }
            })
          })),
          videoTour: formData.media.videoTour ? 
            (formData.media.videoTour instanceof File ? 
              { url: URL.createObjectURL(formData.media.videoTour), file: formData.media.videoTour, isNew: true } 
              : { url: formData.media.videoTour, file: null, isNew: false }) 
            : null,
          documents: formData.media.documents.map(doc => {
            if (doc instanceof File) {
              return { url: URL.createObjectURL(doc), file: doc, isNew: true };
            } else {
              return { url: doc, file: null, isNew: false };
            }
          })
        }}
        onMediaChange={(media) => {
          const photos: Record<string, (File | string)[]> = {};
          media.photos.forEach(({ category, files }: { category: string, files: { url: string, file: File | null }[] }) => {
            photos[category] = files.map(f => f.file || f.url);
          });

          setFormData(prev => ({
            ...prev,
            media: {
              ...prev.media,
              photos: {
                ...prev.media.photos,
                ...photos
              },
              videoTour: media.videoTour?.file || media.videoTour?.url || null,
              documents: media.documents.map((doc: any) => doc.file || doc.url)
            }
          }));
        }}
      />
    </div>
  )
}
  ];

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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };


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
const handleSubmit = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  console.log('Starting form submission...', formData);

  setIsSubmitting(true);

  try {
    const user = sessionStorage.getItem('user');
    if (!user) {
      toast.error('Please log in to continue');
      navigate('/login');
      return;
    }

    const userData = JSON.parse(user);
    const author = userData.id;
    const token = userData.token;

    console.log("User authenticated:", { userId: author });

    // Enhanced file conversion with better error handling
    const convertIfFile = async (item: File | string): Promise<string> => {
      if (item instanceof File) {
        console.log('Converting file to base64:', item.name, item.type, item.size);
        try {
          const base64 = await convertFileToBase64(item);
          console.log('File converted successfully, length:', base64.length);
          return base64;
        } catch (error) {
          console.error('Error converting file to base64:', error);
          throw new Error(`Failed to convert file ${item.name}: ${error}`);
        }
      }
      console.log('Keeping existing string (URL/base64):', item?.substring(0, 100) + '...');
      return item;
    };

    console.log("Converting media files...");

    // Convert media files to base64
    const convertedMedia = {
      photos: {
        exterior: await Promise.all((formData.media?.photos?.exterior ?? []).map(convertIfFile)),
        interior: await Promise.all((formData.media?.photos?.interior ?? []).map(convertIfFile)),
        floorPlan: await Promise.all((formData.media?.photos?.floorPlan ?? []).map(convertIfFile)),
        washrooms: await Promise.all((formData.media?.photos?.washrooms ?? []).map(convertIfFile)),
        lifts: await Promise.all((formData.media?.photos?.lifts ?? []).map(convertIfFile)),
        emergencyExits: await Promise.all((formData.media?.photos?.emergencyExits ?? []).map(convertIfFile))
      },
      videoTour: formData.media?.videoTour ? await convertIfFile(formData.media.videoTour) : undefined,
      documents: await Promise.all((formData.media?.documents ?? []).map(convertIfFile))
    };

    console.log("Media conversion complete");

    // Safe location conversion
    const safeLocation = {
      latitude: formData.basicInformation.location.latitude || '0',
      longitude: formData.basicInformation.location.longitude || '0'
    };

    // Prepare the complete data for backend
    const transformedData = {
      basicInformation: {
        title: formData.basicInformation.title || '',
        Type: Array.isArray(formData.basicInformation.Type) 
          ? formData.basicInformation.Type 
          : [formData.basicInformation.Type].filter(Boolean),
        address: {
          street: formData.basicInformation.address.street || '',
          city: formData.basicInformation.address.city || '',
          state: formData.basicInformation.address.state || '',
          zipCode: formData.basicInformation.address.zipCode || ''
        },
        landmark: formData.basicInformation.landmark || '',
        location: safeLocation,
        isCornerProperty: Boolean(formData.basicInformation.isCornerProperty)
      },
      propertyDetails: {
        area: {
          totalArea: Number(formData.propertyDetails.area.totalArea) || 0,
          carpetArea: Number(formData.propertyDetails.area.carpetArea) || 0,
          builtUpArea: Number(formData.propertyDetails.area.builtUpArea) || 0
        },
        floor: {
          floorNumber: Number(formData.propertyDetails.floor.floorNumber) || 0,
          totalFloors: Number(formData.propertyDetails.floor.totalFloors) || 0
        },
        facingDirection: formData.propertyDetails.facingDirection || '',
        furnishingStatus: formData.propertyDetails.furnishingStatus || '',
        propertyAmenities: Array.isArray(formData.propertyDetails.propertyAmenities) 
          ? formData.propertyDetails.propertyAmenities 
          : [],
        wholeSpaceAmenities: Array.isArray(formData.propertyDetails.wholeSpaceAmenities) 
          ? formData.propertyDetails.wholeSpaceAmenities 
          : [],
        electricitySupply: {
          powerLoad: Number(formData.propertyDetails.electricitySupply.powerLoad) || 0,
          backup: Boolean(formData.propertyDetails.electricitySupply.backup)
        },
        waterAvailability: formData.propertyDetails.waterAvailability || '',
        propertyAge: formData.propertyDetails.propertyAge || '',
        propertyCondition: formData.propertyDetails.propertyCondition || ''
      },
      shopDetails: {
        frontageWidth: Number(formData.shopDetails.frontageWidth) || 0,
        heightOfShop: Number(formData.shopDetails.heightOfShop) || 0,
        displayWindow: Boolean(formData.shopDetails.displayWindow),
        attachedStorageRoom: Boolean(formData.shopDetails.attachedStorageRoom),
        averageFootTraffic: formData.shopDetails.averageFootTraffic || '',
        customerParking: Boolean(formData.shopDetails.customerParking),
        previousBusiness: formData.shopDetails.previousBusiness || ''
      },
      pricingDetails: {
        propertyPrice: Number(formData.pricingDetails.propertyPrice) || 0,
        pricetype: formData.pricingDetails.pricetype || 'fixed',
        area: Number(formData.pricingDetails.area) || 0,
        totalprice: Number(formData.pricingDetails.totalprice) || 0,
        pricePerSqft: Number(formData.pricingDetails.pricePerSqft) || 0
      },
      registration: {
        chargestype: formData.registration.chargestype || 'inclusive',
        registrationAmount: Number(formData.registration.registrationAmount) || 0,
        stampDutyAmount: Number(formData.registration.stampDutyAmount) || 0
      },
      brokerage: {
        required: formData.brokerage.required === 'yes',
        amount: Number(formData.brokerage.amount) || 0
      },
      availability: {
        availableImmediately: Boolean(formData.availability.availableImmediately),
        availableFrom: formData.availability.availableFrom && !formData.availability.availableImmediately
          ? new Date(formData.availability.availableFrom)
          : undefined,
        leaseDuration: formData.availability.leaseDuration || '',
        noticePeriod: formData.availability.noticePeriod || '',
        petsAllowed: Boolean(formData.availability.petsAllowed),
        operatingHours: {
          restricted: Boolean(formData.availability.operatingHours?.restricted),
          restrictions: formData.availability.operatingHours?.restrictions || ''
        }
      },
      contactInformation: {
        name: formData.contactInformation.name || '',
        email: formData.contactInformation.email || '',
        phone: formData.contactInformation.phone || '',
        alternatePhone: formData.contactInformation.alternatePhone || '',
        bestTimeToContact: formData.contactInformation.bestTimeToContact || ''
      },
      media: convertedMedia,
      metadata: {
        createdBy: author,
        createdAt: new Date(),
        propertyType: 'Commercial',
        intent: 'Sell',
        propertyName: 'Shop',
        status: 'Available'
      }
    };

    console.log("Final transformed data:", transformedData);

    let response;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'user-id': author
    };

    if (propertyId) {
      console.log('Updating property:', propertyId);
      response = await axios.put(`/api/commercial/sale/shops/${propertyId}`, transformedData, {
        headers: headers
      });
    } else {
      console.log('Creating new property');
      response = await axios.post('/api/commercial/sale/shops', transformedData, {
        headers: headers
      });
    }

    console.log("Response received:", response.data);

    if (response.data.success) {
      setFormSubmitted(true);
      const successMessage = propertyId 
        ? 'Commercial shop listing updated successfully!' 
        : 'Commercial shop listing created successfully!';
      
      toast.success(successMessage);

      if (response.data.data && response.data.data.propertyId) {
        toast.info(`Your property ID is: ${response.data.data.propertyId}`);
      }
      
      navigate('/Userdashboard/properties');
    } else {
      throw new Error(response.data.message || (propertyId ? 'Failed to update property' : 'Failed to create listing'));
    }
  } catch (error: any) {
    console.error('Error submitting form:', error);
    
    if (error.response) {
      console.error('Error response:', error.response);
      const errorMessage = error.response.data?.message || error.response.data?.error || 'Server error occurred';
      toast.error(`Submission failed: ${errorMessage}`);

      if (error.response.data?.validationErrors) {
        console.error('Validation errors:', error.response.data.validationErrors);
        Object.values(error.response.data.validationErrors).forEach((message: any) => {
          toast.error(`Validation error: ${message}`);
        });
      }
    } else if (error.request) {
      console.error('Error request:', error.request);
      toast.error('Network error: Please check your internet connection');
    } else {
      console.error('Error message:', error.message);
      toast.error(`Error: ${error.message || 'An unknown error occurred'}`);
    }
  } finally {
    setIsSubmitting(false);
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

  // Debug function to test API connection
  const testApiConnection = async () => {
    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        toast.error('Please log in to continue');
        return;
      }

      const userData = JSON.parse(user);
      const token = userData.token;

      // Test request to the API
      const response = await axios.get('/api/commercial/sell/shops', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('API connection test successful:', response.data);
      toast.success('API connection successful!');
    } catch (error: any) {
      console.error('API connection test failed:', error);

      if (error.response) {
        toast.error(`API test failed with status ${error.response.status}: ${error.response.data.error || 'Unknown error'}`);
      } else if (error.request) {
        toast.error('Network error: No response received from server');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };
  

  // Toggle debug mode with Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsDebugMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to continue</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      <style>{globalStyles}</style>

      {/* Progress Bar */}
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

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Sale Commercial Shop</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>

          {isDebugMode && (
            <button
              onClick={testApiConnection}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Test API Connection
            </button>
          )}
        </div>

        {formSubmitted ? (
          <div className="bg-green-50 border-l-4 border-green-500 p-8 rounded-lg text-center">
            <div className="flex flex-col items-center justify-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-green-800 mb-2">Listing Submitted Successfully!</h3>
              <p className="text-green-600 mb-6">Your commercial shop listing has been created.</p>
              <button
                onClick={() => navigate('/dashboard/properties')}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Go to My Properties
              </button>
            </div>
          </div>
        ) : (
          formSections[currentStep].content
        )}
      </div>

      {/* Navigation Buttons */}
      {!formSubmitted && (
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
      )}
    </div>
  );
};

export default SellShopMain;
