import React from 'react';
import { ChevronUp } from 'lucide-react';

type AdditionalDetailsProps = {
  onClose: () => void;
  values: {
    parkingCharges: string;
    paintingCharges: string;
    facing: string;
    servantRoom: string;
    reraId: string;
    propertyDescription: string;
    address: string;
  };
  onChange: (field: string, value: string) => void;
};

export function AdditionalDetails({ onClose, values, onChange }: AdditionalDetailsProps) {
  const parkingOptions = ['Include in rent', 'Separate'];
  const paintingOptions = ['None', 'As per cost', '1 month', 'Custom'];
  const facingOptions = ['North', 'East', 'West', 'South', 'North - East', 'North - West', 'South - East', 'South - West'];
  const servantRoomOptions = ['Yes', 'No'];

  return (
    <div className="border-t border-gray-200 pt-8 mt-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold text-gray-800">Additional Details</h3>
        <button
          onClick={onClose}
          className="text-purple-600 hover:text-purple-700"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      {/* Address */}
      <div className="mb-8">
        <label className="block text-gray-700 mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          value={values.address}
          onChange={(e) => onChange('address', e.target.value)}
          placeholder="Enter complete property address"
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Parking Charges */}
      <div className="mb-8">
        <label className="block text-gray-700 mb-2">
          Parking Charges
        </label>
        <div className="flex gap-4">
          {parkingOptions.map((option) => (
            <button
              key={option}
              onClick={() => onChange('parkingCharges', option)}
              className={`px-6 py-3 rounded-lg ${
                values.parkingCharges === option
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Painting Charges */}
      <div className="mb-8">
        <label className="block text-gray-700 mb-2">
          Painting Charges
        </label>
        <div className="flex flex-wrap gap-4">
          {paintingOptions.map((option) => (
            <button
              key={option}
              onClick={() => onChange('paintingCharges', option)}
              className={`px-6 py-3 rounded-lg ${
                values.paintingCharges === option
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Facing */}
      <div className="mb-8">
        <label className="block text-gray-700 mb-2">
          Facing
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {facingOptions.map((option) => (
            <button
              key={option}
              onClick={() => onChange('facing', option)}
              className={`px-6 py-3 rounded-lg ${
                values.facing === option
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Servant Room */}
      <div className="mb-8">
        <label className="block text-gray-700 mb-2">
          Servant Room
        </label>
        <div className="flex gap-4">
          {servantRoomOptions.map((option) => (
            <button
              key={option}
              onClick={() => onChange('servantRoom', option)}
              className={`px-6 py-3 rounded-lg ${
                values.servantRoom === option
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* RERA ID */}
      <div className="mb-8">
        <label className="block text-gray-700 mb-2">
          RERA ID
        </label>
        <input
          type="text"
          value={values.reraId}
          onChange={(e) => onChange('reraId', e.target.value)}
          placeholder="Enter RERA ID"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Property Description */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-gray-700">
            Property Description
          </label>
          <span className="text-sm text-gray-500">
            {values.propertyDescription.length} / 1500
          </span>
        </div>
        <textarea
          value={values.propertyDescription}
          onChange={(e) => onChange('propertyDescription', e.target.value)}
          placeholder="Enter property description"
          maxLength={1500}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}