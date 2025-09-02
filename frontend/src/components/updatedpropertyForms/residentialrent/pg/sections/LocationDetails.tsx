import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface LocationDetailsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Location Details</h2>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Complete Address *
        </label>
        <textarea
          {...register('address')}
          ref={firstFieldRef}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter complete address"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message as string}</p>
        )}
      </div>

      {/* Landmark */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Landmark
        </label>
        <input
          type="text"
          {...register('landmark')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter nearby landmark"
        />
        {errors.landmark && (
          <p className="mt-1 text-sm text-red-600">{errors.landmark.message as string}</p>
        )}
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          City *
        </label>
        <input
          type="text"
          {...register('city')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter city name"
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city.message as string}</p>
        )}
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          State *
        </label>
        <input
          type="text"
          {...register('state')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter state name"
        />
        {errors.state && (
          <p className="mt-1 text-sm text-red-600">{errors.state.message as string}</p>
        )}
      </div>

      {/* Pincode */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Pincode *
        </label>
        <input
          type="text"
          {...register('pincode')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter 6-digit pincode"
        />
        {errors.pincode && (
          <p className="mt-1 text-sm text-red-600">{errors.pincode.message as string}</p>
        )}
      </div>

      {/* Location Type */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Location Type *
        </label>
        <select
          {...register('locationType')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
        >
          <option value="">Select location type</option>
          <option value="Metro">Metro</option>
          <option value="Non-Metro">Non-Metro</option>
        </select>
        {errors.locationType && (
          <p className="mt-1 text-sm text-red-600">{errors.locationType.message as string}</p>
        )}
      </div>

      {/* Property Age */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Property Age *
        </label>
        <select
          {...register('propertyAge')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
        >
          <option value="">Select property age</option>
          <option value="0-1">0-1 years</option>
          <option value="1-5">1-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10+">10+ years</option>
        </select>
        {errors.propertyAge && (
          <p className="mt-1 text-sm text-red-600">{errors.propertyAge.message as string}</p>
        )}
      </div>
    </div>
  );
};

export default LocationDetails; 