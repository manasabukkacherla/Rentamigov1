import React from 'react';
import { MapPin } from 'lucide-react';

export const LocationMap: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
      
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative mb-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965966906644!2d77.64163427473439!3d12.838572987455667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b2ef7f1c6f3%3A0x6c06e8c7dc1ac0e!2sElectronic%20City%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="flex items-start gap-2">
        <MapPin className="w-5 h-5 text-gray-900 mt-1" />
        <div>
          <h3 className="font-semibold text-gray-900">Property Address</h3>
          <p className="text-gray-600">123 Electronic City Phase 1, Bengaluru, Karnataka 560100</p>
        </div>
      </div>
    </div>
  );
};