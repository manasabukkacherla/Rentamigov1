import React from 'react';
import { X } from 'lucide-react';
import { Property } from '../types';

interface PropertyPreviewProps {
  property: Partial<Property>;
  onClose: () => void;
}

export function PropertyPreview({ property, onClose }: PropertyPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Property Preview
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Name</p>
                <p className="mt-1 text-base text-gray-900 dark:text-white">{property.propertyName || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Owner Type</p>
                <p className="mt-1 text-base text-gray-900 dark:text-white capitalize">{property.ownerType || 'Not specified'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
                <p className="mt-1 text-base text-gray-900 dark:text-white">{property.propertyDescription || 'No description provided'}</p>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Property Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                <p className="mt-1 text-base text-gray-900 dark:text-white capitalize">{property.propertyType || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">City</p>
                <p className="mt-1 text-base text-gray-900 dark:text-white">{property.city || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Project</p>
                <p className="mt-1 text-base text-gray-900 dark:text-white">{property.projectName || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Features
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{property.bedrooms}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{property.bathrooms}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{property.balconies}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Balconies</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{property.floorOfTheProperty}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Floor</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Society Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {property.societyAmenities?.map((amenity) => (
                    <span key={amenity} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                  {(!property.societyAmenities || property.societyAmenities.length === 0) && (
                    <span className="text-gray-500 dark:text-gray-400">No amenities selected</span>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Flat Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {property.flatAmenities?.map((amenity) => (
                    <span key={amenity} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                  {(!property.flatAmenities || property.flatAmenities.length === 0) && (
                    <span className="text-gray-500 dark:text-gray-400">No amenities selected</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Commercial Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Commercial Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Rent</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{property.monthlyRent?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Security Deposit</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{property.securityDeposit?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </div>

          {/* Restrictions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Restrictions & Preferences
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${property.bachelorTenants ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">Bachelor Tenants</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${property.nonVegTenants ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">Non-Veg Allowed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${property.tenantWithPets ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">Pets Allowed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${property.carParking ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">Car Parking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${property.twoWheelerParking ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">Two Wheeler Parking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}