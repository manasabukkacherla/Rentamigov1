import React from 'react';
import CommonAreaAmenities from './CommonAreaAmenities';
import AdditionalServices from './AdditionalServices';

interface CommonAreaAmenitiesAndServicesProps {
  amenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
}

const CommonAreaAmenitiesAndServices: React.FC<CommonAreaAmenitiesAndServicesProps> = ({ amenities, onAmenitiesChange }) => {
  // Split amenities for each section if needed, or treat as a single list
  // Here, we'll treat all as a single array for simplicity
  // If you want to split between amenities/services, you can adjust accordingly
  const handleCommonAreaChange = (selected: string[]) => {
    // Combine with existing services if needed
    // For now, overwrite
    onAmenitiesChange(selected);
  };
  const handleServicesChange = (selected: string[]) => {
    // Combine with existing amenities if needed
    // For now, merge unique
    const merged = Array.from(new Set([...amenities, ...selected]));
    onAmenitiesChange(merged);
  };
  return (
    <div className="space-y-8">
      <CommonAreaAmenities selectedAmenities={amenities} onChange={handleCommonAreaChange} />
      <AdditionalServices selectedServices={amenities} onChange={handleServicesChange} />
    </div>
  );
};

export default CommonAreaAmenitiesAndServices;
