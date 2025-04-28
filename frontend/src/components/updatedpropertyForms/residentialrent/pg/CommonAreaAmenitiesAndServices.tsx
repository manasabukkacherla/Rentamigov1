import React from 'react';
import CommonAreaAmenities from './CommonAreaAmenities';
import AdditionalServices from './AdditionalServices';

const CommonAreaAmenitiesAndServices = () => {
  return (
    <div className="space-y-8">
      <CommonAreaAmenities />
      <AdditionalServices />
    </div>
  );
};

export default CommonAreaAmenitiesAndServices;
