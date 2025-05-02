import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface RoomDetailsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Room Details</h2>

      {/* Total Rooms */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Total Number of Rooms *
        </label>
        <input
          type="number"
          {...register('totalRooms')}
          ref={firstFieldRef}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter total number of rooms"
        />
        {errors.totalRooms && (
          <p className="mt-1 text-sm text-red-600">{errors.totalRooms.message as string}</p>
        )}
      </div>

      {/* Room Size */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Room Size (sq ft) *
        </label>
        <input
          type="number"
          {...register('roomSize')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter room size in square feet"
        />
        {errors.roomSize && (
          <p className="mt-1 text-sm text-red-600">{errors.roomSize.message as string}</p>
        )}
      </div>

      {/* Room Type */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Room Type *
        </label>
        <select
          {...register('roomType')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
        >
          <option value="">Select room type</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Premium">Premium</option>
          <option value="Luxury">Luxury</option>
        </select>
        {errors.roomType && (
          <p className="mt-1 text-sm text-red-600">{errors.roomType.message as string}</p>
        )}
      </div>

      {/* Room Furnishing */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Room Furnishing *
        </label>
        <div className="space-y-2">
          {['Furnished', 'Semi-Furnished', 'Unfurnished'].map(furnishing => (
            <div key={furnishing} className="flex items-center">
              <input
                type="radio"
                id={furnishing}
                value={furnishing}
                {...register('roomFurnishing')}
                className="w-4 h-4 border-gray-300 focus:ring-black text-black"
              />
              <label htmlFor={furnishing} className="ml-2 text-sm text-black">
                {furnishing}
              </label>
            </div>
          ))}
        </div>
        {errors.roomFurnishing && (
          <p className="mt-1 text-sm text-red-600">{errors.roomFurnishing.message as string}</p>
        )}
      </div>

      {/* Room Features */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Room Features *
        </label>
        <div className="space-y-2">
          {[
            'AC',
            'Fan',
            'TV',
            'Study Table',
            'Wardrobe',
            'Balcony',
            'Attached Bathroom',
            'Geyser',
            'Window',
            'Cupboard'
          ].map(feature => (
            <div key={feature} className="flex items-center">
              <input
                type="checkbox"
                id={feature}
                value={feature}
                {...register('roomFeatures')}
                className="w-4 h-4 rounded border-gray-300 focus:ring-black text-black"
              />
              <label htmlFor={feature} className="ml-2 text-sm text-black">
                {feature}
              </label>
            </div>
          ))}
        </div>
        {errors.roomFeatures && (
          <p className="mt-1 text-sm text-red-600">{errors.roomFeatures.message as string}</p>
        )}
      </div>

      {/* Room Description */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Room Description *
        </label>
        <textarea
          {...register('roomDescription')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Describe the room features and conditions"
        />
        {errors.roomDescription && (
          <p className="mt-1 text-sm text-red-600">{errors.roomDescription.message as string}</p>
        )}
      </div>
    </div>
  );
};

export default RoomDetails; 