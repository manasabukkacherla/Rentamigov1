import React from 'react';
import { PropertyDetails } from '../types';
import { Property } from '../App';


interface BasicInfoProps {
  details: PropertyDetails;
  property: Property;
}

// Helper function to get furnishing status or size
const getFurnishingStatus = (property: Property) => {
  // console.log("intent:", property.metadata?.intent);
  // console.log("propertyName:", property.metadata?.propertyName);

  if (property.metadata?.intent === "rent" && property.metadata?.propertyName === "Shop") {
    return "Fully furnished";
  }
  return property.propertyDetails?.furnishingStatus || "Not specified";
};

const getSize = (property: Property) => {
  // console.log("intent:", property.metadata?.intent);
  // console.log("propertyName:", property.metadata?.propertyName);

  if (property.metadata?.intent === "rent" && property.metadata?.propertyName === "Shop") {
    return property.shopDetails?.frontageWidth || "Not specified";
  }
  return property.propertyDetails?.area?.totalArea || "Not specified";
};

const getAvailableFrom = (property: Property) => {
  console.log("availability:", property.availability);
  return property.availability?.type === "immediate" || property.availability?.immediate === true
    ? "Immediate"
    : property.availability?.date || "Not specified";
};

export const BasicInfo: React.FC<BasicInfoProps> = ({ details, property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 basic-info">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-100 px-6 py-4 rounded-lg">
          <h3 className="text-sm text-gray-600">Type</h3>
          <ul className="list-disc pl-4 space-y-1">
            {property.basicInformation?.Type?.map((type: string) => (
              <li 
                key={type} 
                className="text-sm font-medium text-black-800"
              >
                {type}
              </li>
            )) || (
              <li className="text-sm font-medium text-gray-900">Not specified</li>
            )}
          </ul>
        </div>
        <div className="bg-gray-100 px-6 py-4 rounded-lg">
          <h3 className="text-sm text-gray-600">Furnishing Status</h3>
          <p className="font-semibold text-gray-900">{getFurnishingStatus(property)}</p>
        </div>
        <div className="bg-gray-100 px-6 py-4 rounded-lg">
          <h3 className="text-sm text-gray-600">Size</h3>
          <p className="font-semibold text-gray-900">{getSize(property)} sq.ft</p>
        </div>
        <div className="bg-gray-100 px-6 py-4 rounded-lg">
          <h3 className="text-sm text-gray-600">Available From</h3>
          <p className="font-semibold text-gray-900">{getAvailableFrom(property)}</p>
        </div>
      </div>
    </div>
  );
};
