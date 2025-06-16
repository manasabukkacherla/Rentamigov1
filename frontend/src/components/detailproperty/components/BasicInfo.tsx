import React from 'react';
import { PropertyDetails } from '../types';
import { Property } from '../App';


interface BasicInfoProps {
  property: Property;
}

// Helper function to get furnishing status or size
const getFurnishingStatus = (property: Property) => {
  // console.log("intent:", property.metadata?.intent);
  // console.log("propertyName:", property.metadata?.propertyName);

  if (property?.metadata?.intent === "rent" && property?.metadata?.propertyName === "Shop") {
    return "Fully furnished";
  }
  return property?.propertyDetails?.furnishingStatus || "Not specified";
};

const getSize = (property: Property) => {
  // console.log("intent:", property.metadata?.intent);
  // console.log("propertyName:", property.metadata?.propertyName);

  if (property?.metadata?.intent === "rent" && property?.metadata?.propertyName === "Shop") {
    return property?.shopDetails?.frontageWidth || "Not specified";
  }
  return property?.propertyDetails?.area?.totalArea || "Not specified";
};

const getAvailableFrom = (property: Property) => {
  const formatDateString = (dateString: string | undefined): string => {
    if (!dateString) return "Not specified";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Not specified";
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return "Not specified";
    }
  };

  if (property?.metadata?.intent === "sale" || property?.metadata?.intent === "Sale" || property?.metadata?.intent === "Sell") {
    return property?.availability?.availableImmediately === true ? "Immediate" : formatDateString(property?.availability?.availableFrom);
  }

  // For lease properties, check lease terms availability
  if (property?.metadata?.intent === "lease" || property?.metadata?.intent === "Lease") {
    return property?.leaseTerms?.availability?.availableImmediately === true ? "Immediate" : formatDateString(property?.leaseTerms?.availability?.date?.toString());
  }

  // For other intents (rent), use regular availability
  return property?.availability?.type === "immediate" || property?.availability?.immediate === true ? "Immediate" : formatDateString(property?.availability?.date);
};

export const BasicInfo: React.FC<BasicInfoProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 basic-info">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-100 px-6 py-4 rounded-lg">
          <h3 className="text-sm text-gray-600">Type</h3>
          {property?.basicInformation?.Type?.length > 0 ? (
            <ul className="list-disc pl-4 space-y-1">
              {property?.basicInformation?.Type?.map((type: string) => (
                <li 
                  key={type} 
                  className="text-sm font-medium text-black-800"
                >
                  {type}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm font-medium text-gray-900">Not specified</p>
          )}
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
