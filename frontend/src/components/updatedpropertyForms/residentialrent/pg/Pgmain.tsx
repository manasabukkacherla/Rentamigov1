"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PgName from './PgName';
import Configuration from './Configuration';
import CommonAreaAmenitiesAndServices from './CommonAreaAmenitiesAndServices';
import OtherFeaturesAndRestrictions from './OtherFeaturesAndRestrictions';
import FoodServices from './FoodServices';
import Pricing from './Pricing';
import PgMedia from './PgMedia';

// Room share options for consistency
const shareOptions = [
  { id: 'single', label: 'Single Share' },
  { id: 'double', label: 'Double Share' },
  { id: 'triple', label: 'Triple Share' },
  { id: 'four', label: 'Four Share' },
  { id: 'five', label: 'Five Share' },
  { id: 'more', label: 'More' },
];

import { Store, ChevronRight, ChevronLeft, Building2, UserCircle, ImageIcon, Calendar, DollarSign, Loader2, Star } from "lucide-react";

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

// PgMainFormData interface matching backend PgMain schema
export interface PgMainFormData {
  pgDetails: {
    name: string;
    accommodationType: "boys" | "girls" | "both boys and girls";
    address: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  roomConfiguration: {
    totalRooms: number;
    sharingTypes: string[];
    customShare?: string;
    roomSize?: number;
    singleRoomAmenities?: string[];
    doubleShareRoomAmenities?: string[];
    tripleShareRoomAmenities?: string[];
    fourShareRoomAmenities?: string[];
    fiveShareRoomAmenities?: string[];
    customShareRoomAmenities?: string[];
  };
  commonAreaAmenitiesAndServices: string[];
  otherFeaturesAndRestrictions: {
    otherFeatures: string[];
    restrictions: string[];
  };
  foodServices: {
    available: boolean;
    includeSnacks?: boolean;
    weekMeals?: {
      [key: string]: {
        breakfast: { name: string; time: string };
        lunch: { name: string; time: string };
        dinner: { name: string; time: string };
      };
    };
    mealTimesState?: {
      breakfast?: string;
      lunch?: string;
      dinner?: string;
    };
  };
  pricing: {
    rent: number;
    deposit?: number;
    maintenance?: number;
    includedUtilities?: string[];
    terms?: string;
    roomSharePricing?: {
      singleShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
      };
      doubleShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
      };
      tripleShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
      };
      fourShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
      };
      fiveShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
      };
      multiShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
        numberOfPersons?: string;
      };
    };
  };
  media: {
    photos: string[];
    videos?: string[];
    mediaItems?: Array<{
      id?: string;
      type?: 'photo' | 'video';
      url?: string;
      title?: string;
      tags?: string[];
      roomType?: string;
    }>;
  };
  metadata: {
    userId: string;
    userName: string;
    createdAt: string;
  };
}

function Pgmain() {
  // State for PgMain form data
  const [formData, setFormData] = React.useState<PgMainFormData>({
    pgDetails: { name: '', accommodationType: 'both boys and girls', address: '' },
    location: { latitude: 0, longitude: 0 },
    roomConfiguration: {
      totalRooms: 0,
      sharingTypes: [],
      customShare: '',
      roomSize: undefined,
      singleRoomAmenities: [],
      doubleShareRoomAmenities: [],
      tripleShareRoomAmenities: [],
      fourShareRoomAmenities: [],
      fiveShareRoomAmenities: [],
      customShareRoomAmenities: [],
    },
    commonAreaAmenitiesAndServices: [],
    otherFeaturesAndRestrictions: { otherFeatures: [], restrictions: [] },
    foodServices: { available: false },
    pricing: { rent: 0 },
    media: { photos: [] },
    metadata: { userId: '', userName: '', createdAt: '' },
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  // Handle form submission to backend
  const navigate = useNavigate();

  // Refs for elements
  const progressBarRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);

  // Function to convert file to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Original form data:', formData);
    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        toast.error('You need to be logged in to create a listing');
        navigate('/login');
        setIsSubmitting(false);
        return;
      }
      const userData = JSON.parse(user);
      const author = userData.id || userData._id; // Ensure valid user id

      if (!author) {
        toast.error('Invalid user data');
        setIsSubmitting(false);
        return;
      }

      const token = sessionStorage.getItem('token');
      
      // Convert media items to base64 if they exist
      let processedMedia = { ...formData.media };
      
      if (formData.media && formData.media.mediaItems && formData.media.mediaItems.length > 0) {
        console.log('Processing media items for base64 conversion...');
        const convertedMediaItems = await Promise.all(
          formData.media.mediaItems.map(async (item: any) => {
            if (item.file) {
              const base64Data = await convertFileToBase64(item.file);
              return {
                ...item,
                url: base64Data, // Replace file with base64 data
                file: undefined // Remove the file object as it can't be serialized
              };
            }
            return item;
          })
        );
        
        // Update the media object with converted items
        processedMedia = {
          ...processedMedia,
          mediaItems: convertedMediaItems,
          photos: convertedMediaItems
            .filter((item: any) => item.type === 'photo')
            .map((item: any) => item.url)
        };
        
        if (convertedMediaItems.some((item: any) => item.type === 'video')) {
          processedMedia.videos = convertedMediaItems
            .filter((item: any) => item.type === 'video')
            .map((item: any) => item.url);
        }
      }
      
      // Attach user info to the payload with processed media
      const payload = {
        ...formData,
        media: processedMedia,
        metadata: {
          ...formData.metadata,
          userId: author, // Ensure 'author' contains a valid ObjectId
          userName: userData.name,
        }
      };
      
      console.log('OtherFeaturesAndRestrictions before POST:', formData.otherFeaturesAndRestrictions);
      console.log('Sending payload with processed media');
      
      await axios.post('/api/residential/pgmain', payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });


      toast.success('PG listing created!');
      setSubmitStatus('success');
      // Optionally reset form or navigate
    } catch (err: any) {
      toast.error('Failed to create listing');
      setSubmitStatus('Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared state for room configuration
  const [selectedShares, setSelectedShares] = useState<string[]>([]);
  const [customShare, setCustomShare] = useState<string>('');

  const formSections = [
    { 
      id: 'pgDetails',
      title: "PG Details", 
      icon: <Building2 className="h-5 w-5" />,
      component: <PgName 
        pgName={formData.pgDetails.name} 
        onPgNameChange={(name) => setFormData(prev => ({
          ...prev,
          pgDetails: { ...prev.pgDetails, name }
        }))} 
        accommodationType={formData.pgDetails.accommodationType}
        onAccommodationTypeChange={(type) => setFormData(prev => ({
          ...prev,
          pgDetails: { ...prev.pgDetails, accommodationType: type as "boys" | "girls" | "both boys and girls" }
        }))}
        address={formData.pgDetails.address}
        onAddressChange={(address) => setFormData(prev => ({
          ...prev,
          pgDetails: { ...prev.pgDetails, address }
        }))}
        location={formData.location}
        onLocationChange={(location) => setFormData(prev => ({
          ...prev,
          location
        }))}
      />
    },

    { 
      id: 'roomConfiguration',
      title: "Room Configuration", 
      icon: <Building2 className="h-5 w-5" />,
      component: <Configuration 
        selectedShares={selectedShares} 
        setSelectedShares={(shares) => {
          setSelectedShares(shares);
          setFormData(prev => ({
            ...prev,
            roomConfiguration: { 
              ...prev.roomConfiguration, 
              sharingTypes: Array.isArray(shares) ? shares : [] // Ensure it's an array
            }
          }));
        }} 
        customShare={customShare} 
        setCustomShare={(share: React.SetStateAction<string>) => {
          const newShare = typeof share === 'function' ? share(customShare) : share;
          setCustomShare(newShare);
          setFormData(prev => ({
            ...prev,
            roomConfiguration: { ...prev.roomConfiguration, customShare: newShare }
          }));
        }}
        // @ts-ignore - The component accepts these props even though they're not in the type definition
        roomConfiguration={formData.roomConfiguration}
        onRoomConfigurationChange={(config: Partial<PgMainFormData['roomConfiguration']>) => setFormData(prev => ({
          ...prev,
          roomConfiguration: { ...prev.roomConfiguration, ...config }
        }))}
      />
    },
    {
      id: 'commonAreaAmenitiesAndServices',
      title: 'Common Area Amenities and Services',
      icon: <Store className="h-5 w-5" />,
      component: <CommonAreaAmenitiesAndServices 
        // @ts-ignore - The component accepts these props even though they're not in the type definition
        amenities={formData.commonAreaAmenitiesAndServices}
        onAmenitiesChange={(amenities: string[]) => setFormData(prev => ({
          ...prev,
          commonAreaAmenitiesAndServices: amenities
        }))}
      />
    },
    {
      id: 'otherFeaturesAndRestrictions',
      title: 'Other Features & Rules',
      icon: <Star className="h-5 w-5" />,
      component: <OtherFeaturesAndRestrictions
        value={formData.otherFeaturesAndRestrictions}
        onChange={({ otherFeatures, restrictions }) => setFormData(prev => ({
          ...prev,
          otherFeaturesAndRestrictions: {
            otherFeatures,
            restrictions
          }
        }))}
      />
    },
    { 
      id: 'foodServices',
      title: "Food Services", 
      icon: <Store className="h-5 w-5" />,
      component: <FoodServices 
        // @ts-ignore - The component accepts these props even though they're not in the type definition
        foodServices={formData.foodServices}
        onFoodServicesChange={(foodServices: PgMainFormData['foodServices']) => setFormData(prev => ({
          ...prev,
          foodServices
        }))}
      />
    },

    { 
      id: 'pricing',
      title: "Pricing & Terms", 
      icon: <DollarSign className="h-5 w-5" />,
      component: <Pricing 
        // @ts-ignore - The component accepts these props even though they're not in the type definition
        pricing={formData.pricing}
        onPricingChange={(pricing: any) => setFormData(prev => ({
          ...prev,
          pricing
        }))}
        selectedShares={selectedShares}
        customShare={customShare}
      />
    },
    { 
      id: 'media',
      title: "Photos & Videos", 
      icon: <ImageIcon className="h-5 w-5" />,
      component: <PgMedia 
        selectedShares={selectedShares} 
        customShare={customShare} 
        // @ts-ignore - The component accepts these props even though they're not in the type definition
        mediaItems={formData.media.mediaItems || []}
        onMediaItemsChange={(mediaItems: any) => setFormData(prev => ({
          ...prev,
          media: { ...prev.media, mediaItems: mediaItems }
        }))}
      />
    }
  ];

  // Function for rendering form sections if needed elsewhere
  // Currently using inline rendering in the JSX below
  // const renderFormSection = (content: React.ReactNode) => (
  //   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
  //     {content}
  //   </div>
  // );

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{globalStyles}</style>
      {/* Progress Bar */}
      <div ref={progressBarRef} className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
                <div
                  key={section.id}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    // Set the current step
                    setCurrentStep(index);
                    
                    // Scroll to the title
                    if (titleRef.current) {
                      titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      index <= currentStep
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}>
                      {section.icon}
                    </div>
                    <span className={`text-[10px] sm:text-xs mt-1 font-medium transition-colors duration-200 text-center ${
                      index <= currentStep
                        ? 'text-black'
                        : 'text-gray-500 group-hover:text-gray-700'
                    }`}>
                      {section.title}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className={`w-8 h-1 sm:w-12 transition-colors duration-200 ${
                        index < currentStep ? 'bg-black' : 'bg-gray-200'
                      }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Submit Form Button and Feedback */}
        <form onSubmit={handleSubmit} className="mb-8">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit PG Details'}
          </button>
          {submitStatus === 'success' && (
            <div className="mt-4 text-green-600">Submitted successfully!</div>
          )}
          {submitStatus && submitStatus !== 'success' && (
            <div className="mt-4 text-red-600">{submitStatus}</div>
          )}
        </form>
        {/* Header */}
        <div className="mb-8">
          <h1 ref={titleRef} className="text-3xl font-bold text-gray-900">List Your PG/Co-living Space</h1>
        </div>
        {/* Form Content */}
        <div className="space-y-8">
          {/* Current Section Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg text-white">
              {formSections[currentStep].icon}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {formSections[currentStep].title}
            </h2>
          </div>

          {/* Form Section Content */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            {formSections[currentStep].component}
          </div>

          {/* Navigation Buttons - Fixed at bottom of screen */}
          <div style={{ height: '96px' }} /> {/* Spacer to prevent content being hidden behind fixed bar */}
          <div className="fixed left-0 right-0 bottom-0 w-full bg-white border-t border-gray-200 z-50">
            <div className="max-w-5xl mx-auto px-4 flex flex-row items-center justify-between gap-4 py-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`
                  flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition-colors
                  ${currentStep === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStep < formSections.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Pgmain;
