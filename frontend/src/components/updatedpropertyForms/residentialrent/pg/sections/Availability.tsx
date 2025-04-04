import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface AvailabilityProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const Availability: React.FC<AvailabilityProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Availability</h2>

      {/* Available From */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Available From *
        </label>
        <input
          type="date"
          {...register('availableFrom')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
        />
        {errors.availableFrom && (
          <p className="mt-1 text-sm text-red-600">{errors.availableFrom.message as string}</p>
        )}
      </div>

      {/* Available Until */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Available Until
        </label>
        <input
          type="date"
          {...register('availableUntil')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
        />
        {errors.availableUntil && (
          <p className="mt-1 text-sm text-red-600">{errors.availableUntil.message as string}</p>
        )}
      </div>

      {/* Number of Beds Available */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Number of Beds Available *
        </label>
        <input
          type="number"
          {...register('bedsAvailable')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter number of beds available"
        />
        {errors.bedsAvailable && (
          <p className="mt-1 text-sm text-red-600">{errors.bedsAvailable.message as string}</p>
        )}
      </div>

      {/* Preferred Tenant Type */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Preferred Tenant Type *
        </label>
        <div className="space-y-2">
          {[
            'Student',
            'Working Professional',
            'Both',
            'Any'
          ].map(type => (
            <div key={type} className="flex items-center">
              <input
                type="radio"
                id={type}
                value={type}
                {...register('preferredTenantType')}
                className="w-4 h-4 border-gray-300 focus:ring-black text-black"
              />
              <label htmlFor={type} className="ml-2 text-sm text-black">
                {type}
              </label>
            </div>
          ))}
        </div>
        {errors.preferredTenantType && (
          <p className="mt-1 text-sm text-red-600">{errors.preferredTenantType.message as string}</p>
        )}
      </div>

      {/* Minimum Stay Duration */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Minimum Stay Duration *
        </label>
        <select
          {...register('minimumStayDuration')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
        >
          <option value="">Select minimum stay duration</option>
          <option value="1">1 Month</option>
          <option value="3">3 Months</option>
          <option value="6">6 Months</option>
          <option value="12">1 Year</option>
          <option value="24">2 Years</option>
        </select>
        {errors.minimumStayDuration && (
          <p className="mt-1 text-sm text-red-600">{errors.minimumStayDuration.message as string}</p>
        )}
      </div>

      {/* Preferred Move-in Time */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Preferred Move-in Time *
        </label>
        <select
          {...register('preferredMoveInTime')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
        >
          <option value="">Select preferred move-in time</option>
          <option value="Immediate">Immediate</option>
          <option value="Within 1 Week">Within 1 Week</option>
          <option value="Within 2 Weeks">Within 2 Weeks</option>
          <option value="Within 1 Month">Within 1 Month</option>
        </select>
        {errors.preferredMoveInTime && (
          <p className="mt-1 text-sm text-red-600">{errors.preferredMoveInTime.message as string}</p>
        )}
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Additional Notes
        </label>
        <textarea
          {...register('additionalNotes')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter any additional notes about availability"
        />
        {errors.additionalNotes && (
          <p className="mt-1 text-sm text-red-600">{errors.additionalNotes.message as string}</p>
        )}
      </div>
    </div>
  );
};

export default Availability; 