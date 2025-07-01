import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Property } from '../App';

export interface EnquiryFormProps {
  onClose: () => void;
  property?: Property;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ onClose, property }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to submit the enquiry
      console.log('Enquiry submitted:', {
        ...formData,
        propertyId: property?.propertyId,
        propertyTitle: property?.metadata?.propertyName
      });
      
      // Show success message or redirect
      alert('Thank you for your enquiry! We will get back to you soon.');
      onClose();
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('There was an error submitting your enquiry. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">Enquiry Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {property && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Property: {property.metadata?.propertyName}</h3>
              {property.pricingDetails?.propertyPrice && (
                <p className="text-sm text-gray-600">
                  Price: ₹{property.pricingDetails.propertyPrice}
                </p>
              )}
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue={''}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};