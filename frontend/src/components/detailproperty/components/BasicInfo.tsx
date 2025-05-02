import React from 'react';
import { PropertyDetails } from '../types';

interface BasicInfoProps {
  details: PropertyDetails;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ details }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 basic-info">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-100 px-6 py-4 rounded-lg">
          <h3 className="text-sm text-gray-600">Configuration</h3>
          <p className="font-semibold text-gray-900">{details.configuration}</p>
        </div>
        <div className="bg-gray-100 px-6 py-4 rounded-lg">
          <h3 className="text-sm text-gray-600">Furnishing Status</h3>
          <p className="font-semibold text-gray-900">{details.furnishingStatus}</p>
        </div>
        <div className="bg-gray-100 px-6 py-4 rounded-lg">
          <h3 className="text-sm text-gray-600">Size</h3>
          <p className="font-semibold text-gray-900">{details.size}</p>
        </div>
        <div className="bg-gray-100 px-6 py-4 rounded-lg">
          <h3 className="text-sm text-gray-600">Available From</h3>
          <p className="font-semibold text-gray-900">{new Date(details.availabilityDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};