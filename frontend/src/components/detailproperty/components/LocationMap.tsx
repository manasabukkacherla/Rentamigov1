import React from 'react';
import { MapPin } from 'lucide-react';
import { Property } from '../App';

export const LocationMap: React.FC<{ property: Property }> = ({ property }) => {
  return (
<div className="bg-white rounded-lg shadow-lg p-6">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>

  {/* Google Map with red marker using lat/lng */}
  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative mb-4">
    <iframe
      src={`https://maps.google.com/maps?q=${property?.basicInformation?.location?.latitude},${property?.basicInformation?.location?.longitude}&z=16&output=embed`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

  {/* Address display */}
  <div className="flex items-start gap-2">
    <MapPin className="w-5 h-5 text-red-600 mt-1" />
    <div>
      <h3 className="font-semibold text-gray-900">Property Address</h3>
      <p className="text-gray-600">
        {property?.basicInformation?.address?.street},<br />
        {property?.basicInformation?.address?.city},{" "}
        {property?.basicInformation?.address?.state},{" "}
        {property?.basicInformation?.address?.zipCode}
      </p>
    </div>
  </div>
</div>


  );
};