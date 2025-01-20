import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Camera, Upload, Save, Eye } from 'lucide-react';
import { Property, StepId } from '../types';
import { PropertyPreview } from './PropertyPreview';

interface PropertyFormProps {
  onSubmit: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  onClose: () => void;
  initialData?: Property;
}

const SOCIETY_AMENITIES = [
  'Swimming Pool', 'Gym', 'Club House', 'Children\'s Play Area',
  'Garden', 'Security', 'Power Backup', 'Lift', 'Community Hall'
];

const FLAT_AMENITIES = [
  'Air Conditioning', 'Modular Kitchen', 'Wardrobes', 'Reserved Parking',
  'Internet/Wi-Fi', 'Gas Pipeline', 'Water Purifier', 'Intercom'
];

const FORM_STEPS: Record<StepId, { title: string; description: string }> = {
  base: {
    title: 'Basic Information',
    description: 'Enter the basic details of your property'
  },
  details: {
    title: 'Property Details',
    description: 'Specify the type and characteristics of your property'
  },
  features: {
    title: 'Features',
    description: 'Add specific features and specifications'
  },
  amenities: {
    title: 'Amenities',
    description: 'Select available amenities for the property'
  },
  photos: {
    title: 'Photos',
    description: 'Upload photos of your property'
  },
  location: {
    title: 'Location',
    description: 'Provide the property location details'
  },
  commercials: {
    title: 'Commercial Details',
    description: 'Set rent and other financial details'
  },
  restrictions: {
    title: 'Restrictions',
    description: 'Specify any restrictions or preferences'
  }
};

const STEPS = Object.keys(FORM_STEPS) as StepId[];

export function PropertyForm({ onSubmit, onClose, initialData }: PropertyFormProps) {
  const [currentStep, setCurrentStep] = useState<StepId>('base');
  const [formData, setFormData] = useState<Partial<Property>>({
    propertyName: initialData?.propertyName || '',
    ownerType: initialData?.ownerType || 'individual',
    propertyDescription: initialData?.propertyDescription || '',
    listingType: initialData?.listingType || 'rent',
    propertyType: initialData?.propertyType || 'apartment',
    societySize: initialData?.societySize || '',
    city: initialData?.city || '',
    projectName: initialData?.projectName || '',
    bedrooms: initialData?.bedrooms || 1,
    bathrooms: initialData?.bathrooms || 1,
    balconies: initialData?.balconies || 0,
    floorOfTheProperty: initialData?.floorOfTheProperty || 0,
    totalNoOfFloors: initialData?.totalNoOfFloors || 1,
    superBuiltUp: initialData?.superBuiltUp || 0,
    builtUp: initialData?.builtUp || 0,
    carpetArea: initialData?.carpetArea || 0,
    ageOfTheProperty: initialData?.ageOfTheProperty || 0,
    furnishingStatus: initialData?.furnishingStatus || 'unfurnished',
    facing: initialData?.facing || 'north',
    societyAmenities: initialData?.societyAmenities || [],
    flatAmenities: initialData?.flatAmenities || [],
    photos: initialData?.photos || {
      cardPhoto: '',
      livingRoom: [],
      kitchen: [],
      bedrooms: [],
      bathrooms: [],
      balcony: [],
      exterior: []
    },
    address: initialData?.address || {
      line1: '',
      latitude: 0,
      longitude: 0,
      locality: '',
      area: '',
      pinCode: ''
    },
    monthlyRent: initialData?.monthlyRent || 0,
    maintenance: initialData?.maintenance || false,
    securityDeposit: initialData?.securityDeposit || 0,
    bachelorTenants: initialData?.bachelorTenants || false,
    nonVegTenants: initialData?.nonVegTenants || false,
    tenantWithPets: initialData?.tenantWithPets || false,
    propertyOverlooking: initialData?.propertyOverlooking || [],
    carParking: initialData?.carParking || false,
    twoWheelerParking: initialData?.twoWheelerParking || false,
    flooringType: initialData?.flooringType || '',
    status: 'draft'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const validateStep = (step: StepId) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 'base':
        if (!formData.propertyName) newErrors.propertyName = 'Property name is required';
        if (!formData.propertyDescription) newErrors.propertyDescription = 'Description is required';
        break;
      case 'details':
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.projectName) newErrors.projectName = 'Project name is required';
        break;
      case 'features':
        if (formData.bedrooms! < 1) newErrors.bedrooms = 'At least 1 bedroom is required';
        if (formData.bathrooms! < 1) newErrors.bathrooms = 'At least 1 bathroom is required';
        break;
      case 'location':
        if (!formData.address?.line1) newErrors['address.line1'] = 'Address is required';
        if (!formData.address?.pinCode) newErrors['address.pinCode'] = 'PIN code is required';
        break;
      case 'commercials':
        if (formData.monthlyRent! <= 0) newErrors.monthlyRent = 'Monthly rent must be greater than 0';
        if (formData.securityDeposit! <= 0) newErrors.securityDeposit = 'Security deposit must be greater than 0';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const currentIndex = STEPS.indexOf(currentStep);
      if (currentIndex < STEPS.length - 1) {
        setCurrentStep(STEPS[currentIndex + 1]);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData as Omit<Property, 'id' | 'createdAt'>);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'base':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Property Name
              </label>
              <input
                type="text"
                value={formData.propertyName}
                onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              {errors.propertyName && <p className="mt-1 text-sm text-red-600">{errors.propertyName}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Owner Type
              </label>
              <select
                value={formData.ownerType}
                onChange={(e) => setFormData({ ...formData, ownerType: e.target.value as 'individual' | 'company' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="individual">Individual</option>
                <option value="company">Company</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.propertyDescription}
                onChange={(e) => setFormData({ ...formData, propertyDescription: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              {errors.propertyDescription && <p className="mt-1 text-sm text-red-600">{errors.propertyDescription}</p>}
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Listing Type
                </label>
                <select
                  value={formData.listingType}
                  onChange={(e) => setFormData({ ...formData, listingType: e.target.value as 'rent' | 'sale' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Property Type
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as 'apartment' | 'villa' | 'house' | 'plot' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="house">House</option>
                  <option value="plot">Plot</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.projectName && <p className="mt-1 text-sm text-red-600">{errors.projectName}</p>}
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.bedrooms && <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.bathrooms && <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Balconies
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.balconies}
                  onChange={(e) => setFormData({ ...formData, balconies: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Floor
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.floorOfTheProperty}
                  onChange={(e) => setFormData({ ...formData, floorOfTheProperty: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Total Floors
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalNoOfFloors}
                  onChange={(e) => setFormData({ ...formData, totalNoOfFloors: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Furnishing Status
              </label>
              <select
                value={formData.furnishingStatus}
                onChange={(e) => setFormData({ ...formData, furnishingStatus: e.target.value as 'furnished' | 'semi-furnished' | 'unfurnished' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
          </div>
        );

      case 'amenities':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Society Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SOCIETY_AMENITIES.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.societyAmenities?.includes(amenity)}
                      onChange={(e) => {
                        const amenities = formData.societyAmenities || [];
                        setFormData({
                          ...formData,
                          societyAmenities: e.target.checked
                            ? [...amenities, amenity]
                            : amenities.filter(a => a !== amenity)
                        });
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Flat Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {FLAT_AMENITIES.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.flatAmenities?.includes(amenity)}
                      onChange={(e) => {
                        const amenities = formData.flatAmenities || [];
                        setFormData({
                          ...formData,
                          flatAmenities: e.target.checked
                            ? [...amenities, amenity]
                            : amenities.filter(a => a !== amenity)
                        });
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'photos':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Property Photos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Card Photo (Main)
                  </label>
                  <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 transition-colors">
                    <div className="space-y-1 text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <label htmlFor="card-photo" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload a photo</span>
                          <input id="card-photo" type="file" className="sr-only" accept="image/*" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {['Living Room', 'Kitchen', 'Bedrooms', 'Bathrooms', 'Balcony', 'Exterior'].map((category) => (
                  <div key={category}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {category} Photos
                    </label>
                    <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 transition-colors">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <label htmlFor={`${category.toLowerCase()}-photos`} className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                            <span>Upload photos</span>
                            <input id={`${category.toLowerCase()}-photos`} type="file" className="sr-only" accept="image/*" multiple />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                value={formData.address?.line1}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address!, line1: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              {errors['address.line1'] && <p className="mt-1 text-sm text-red-600">{errors['address.line1']}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Locality
                </label>
                <input
                  type="text"
                  value={formData.address?.locality}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address!, locality: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Area
                </label>
                <input
                  type="text"
                  value={formData.address?.area}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address!, area: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  value={formData.address?.pinCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address!, pinCode: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                {errors['address.pinCode'] && <p className="mt-1 text-sm text-red-600">{errors['address.pinCode']}</p>}
              </div>
            </div>
          </div>
        );

      case 'commercials':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Monthly Rent
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.monthlyRent}
                  onChange={(e) => setFormData({ ...formData, monthlyRent: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.monthlyRent && <p className="mt-1 text-sm text-red-600">{errors.monthlyRent}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Security Deposit
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.securityDeposit}
                  onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.securityDeposit && <p className="mt-1 text-sm text-red-600">{errors.securityDeposit}</p>}
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.maintenance}
                  onChange={(e) => setFormData({ ...formData, maintenance: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Maintenance Required</span>
              </label>
            </div>

            {formData.maintenance && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Maintenance Amount
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.maintenanceAmount}
                    onChange={(e) => setFormData({ ...formData, maintenanceAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Maintenance Frequency
                  </label>
                  <select
                    value={formData.maintenanceFrequency}
                    onChange={(e) => setFormData({ ...formData, maintenanceFrequency: e.target.value as 'monthly' | 'quarterly' | 'yearly' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        );

      case 'restrictions':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-3">
                  <input
                     type="checkbox"
                    checked={formData.bachelorTenants}
                    onChange={(e) => setFormData({ ...formData, bachelorTenants: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Bachelor Tenants Allowed</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.nonVegTenants}
                    onChange={(e) => setFormData({ ...formData, nonVegTenants: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Non-Veg Tenants Allowed</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.tenantWithPets}
                    onChange={(e) => setFormData({ ...formData, tenantWithPets: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Pets Allowed</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.carParking}
                    onChange={(e) => setFormData({ ...formData, carParking: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Car Parking Available</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.twoWheelerParking}
                    onChange={(e) => setFormData({ ...formData, twoWheelerParking: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Two Wheeler Parking Available</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Flooring Type
              </label>
              <select
                value={formData.flooringType}
                onChange={(e) => setFormData({ ...formData, flooringType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Select Flooring Type</option>
                <option value="marble">Marble</option>
                <option value="tile">Tile</option>
                <option value="wooden">Wooden</option>
                <option value="granite">Granite</option>
                <option value="cement">Cement</option>
              </select>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {FORM_STEPS[currentStep].title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {FORM_STEPS[currentStep].description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => (
                <React.Fragment key={step}>
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        STEPS.indexOf(currentStep) >= index
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="ml-2 text-sm hidden sm:block">
                      {FORM_STEPS[step].title}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 mx-4 bg-gray-200 dark:bg-gray-700" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-16rem)] custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStepContent()}
            </form>
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === STEPS[0]}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentStep === STEPS[0]
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>

              {currentStep === STEPS[STEPS.length - 1] ? (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Property
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <PropertyPreview
          property={formData}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}