import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import BasicDetails from './sections/BasicDetails';
import LocationDetails from './sections/LocationDetails';
import RentDetails from './sections/RentDetails';
import RoomDetails from './sections/RoomDetails';
import Amenities from './sections/Amenities';
import Media from './sections/Media';
import Summary from './sections/Summary';

const formSchema = z.object({
  // Basic Details
  propertyName: z.string().min(1, 'Property name is required'),
  ownerName: z.string().min(1, 'Owner name is required'),
  contactNumber: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'),
  email: z.string().email('Please enter a valid email address'),
  propertyType: z.string().min(1, 'Property type is required'),
  genderAllowed: z.string().min(1, 'Please select gender allowed'),
  sharingTypes: z.array(z.string()).min(1, 'Please select at least one sharing type'),

  // Location Details
  address: z.string().min(1, 'Address is required'),
  landmark: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode'),
  locationType: z.string().min(1, 'Location type is required'),
  propertyAge: z.string().min(1, 'Property age is required'),

  // Rent Details
  rentAmount: z.number().min(1, 'Rent amount is required'),
  securityDeposit: z.number().min(1, 'Security deposit is required'),
  maintenanceCharges: z.number().optional(),
  foodCharges: z.number().optional(),
  otherCharges: z.number().optional(),
  paymentTerms: z.string().min(1, 'Payment terms are required'),
  advancePayment: z.string().min(1, 'Advance payment is required'),

  // Room Details
  totalRooms: z.number().min(1, 'Total rooms is required'),
  roomSize: z.number().min(1, 'Room size is required'),
  roomType: z.string().min(1, 'Room type is required'),
  roomFurnishing: z.string().min(1, 'Room furnishing is required'),
  roomFeatures: z.array(z.string()).min(1, 'Please select at least one room feature'),
  roomDescription: z.string().min(1, 'Room description is required'),

  // Amenities
  amenities: z.array(z.string()).min(1, 'Please select at least one amenity'),
  additionalAmenities: z.string().optional(),
  houseRules: z.string().min(1, 'House rules are required'),

  // Media
  images: z.array(z.any()).min(1, 'At least one image is required'),
  videos: z.array(z.any()).optional(),

  // Availability
  availableFrom: z.string().min(1, 'Available from date is required'),
  availableUntil: z.string().optional(),
  bedsAvailable: z.number().min(1, 'Number of beds available is required'),
  preferredTenantType: z.string().min(1, 'Preferred tenant type is required'),
  minimumStayDuration: z.string().min(1, 'Minimum stay duration is required'),
  preferredMoveInTime: z.string().min(1, 'Preferred move-in time is required'),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

import { useRef } from 'react';

const PgPropertyForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const firstFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 7; // Added Summary step

  // Load saved form data from localStorage
  const loadSavedData = () => {
    const savedData = localStorage.getItem('pgPropertyFormData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
        return {};
      }
    }
    return {};
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: loadSavedData(),
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('pgPropertyFormData', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Clear saved form data
      localStorage.removeItem('pgPropertyFormData');
      
      // Show success message
      toast.success('Property listed successfully!');
      
      // Reset form
      setCurrentStep(1);
      Object.keys(data).forEach((key) => setValue(key as any, ''));
      
      // Redirect or handle success
      // window.location.href = '/dashboard';
    } catch (error) {
      toast.error('Failed to submit property listing. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    let stepChanged = false;
    setIsLoading(true);
    try {
      // Validate current step
      const isValid = await validateCurrentStep();
      if (isValid) {
        if (currentStep < totalSteps) {
          setCurrentStep(currentStep + 1);
          stepChanged = true;
        }
      }
    } catch (error) {
      toast.error('Please fill all required fields correctly.');
    } finally {
      setIsLoading(false);
      if (stepChanged && firstFieldRef.current) {
        setTimeout(() => {
          firstFieldRef.current?.focus();
        }, 0);
      }
    if (stepChanged && firstFieldRef.current) {
      setTimeout(() => {
        firstFieldRef.current?.focus();
      }, 0);
    }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = async () => {
    // Add validation logic for each step
    const stepFields = {
      1: ['propertyName', 'ownerName', 'contactNumber', 'email', 'propertyType', 'genderAllowed', 'sharingTypes'],
      2: ['address', 'city', 'state', 'pincode', 'locationType', 'propertyAge'],
      3: ['rentAmount', 'securityDeposit', 'paymentTerms', 'advancePayment'],
      4: ['totalRooms', 'roomSize', 'roomType', 'roomFurnishing', 'roomFeatures', 'roomDescription'],
      5: ['amenities', 'houseRules'],
      6: ['images'],
    };

    const currentFields = stepFields[currentStep as keyof typeof stepFields] || [];
    const result = await watch(currentFields);
    
    return currentFields.every(field => {
      const value = result[field];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== '';
    });
  };

  const renderStep = () => {
    // Pass the ref only to the first field of each section
    const refProps = { firstFieldRef };

    switch (currentStep) {
      case 1:
        return <BasicDetails register={register} errors={errors} {...refProps} />;
      case 2:
        return <LocationDetails register={register} errors={errors} {...refProps} />;
      case 3:
        return <RentDetails register={register} errors={errors} {...refProps} />;
      case 4:
        return <RoomDetails register={register} errors={errors} {...refProps} />;
      case 5:
        return <Amenities register={register} errors={errors} {...refProps} />;
      case 6:
        return <Media register={register} errors={errors} {...refProps} />;
      case 7:
        return <Summary watch={watch} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-black mb-8">List Your PG/Coliving Property</h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i + 1}
              className={`text-sm font-medium ${
                currentStep >= i + 1 ? 'text-black' : 'text-gray-500'
              }`}
            >
              Step {i + 1}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-black rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1 || isLoading}
            className={`px-6 py-2 rounded-md ${
              currentStep === 1 || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Previous
          </button>
          {currentStep === totalSteps ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-md ${
                isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              disabled={isLoading}
              className={`px-6 py-2 rounded-md ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isLoading ? 'Validating...' : 'Next'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PgPropertyForm; 