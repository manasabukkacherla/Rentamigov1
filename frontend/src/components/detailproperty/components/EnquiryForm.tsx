import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Property } from '@/components/allpropertiespage/types';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string ;
  propertyId: string;
  propertyType: string;
  propertyName: string;
  
  price:string,
  // selectedServices: string[];
  // isVerified: boolean;
}

export interface EnquiryFormProps {
  onClose: () => void;
  property?: {
    price:string,
    propertyId:string,
    propertyType:string,
    propertyName:string,
    createdBy:string
  }
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ onClose, property }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    price:'0',
    createdBy: property?.createdBy || "",
    propertyId: property?.propertyId || "",
    propertyType:property?.propertyType || "",
    propertyName: property?.propertyName || 'Unnamed property',
    // price:property?.price || '0',
    // selectedServices: [],
    // isVerified: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const transformedData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      createdBy: formData.createdBy,  // may be empty if anonymous
      propertyId: formData.propertyId,
      propertyType: formData.propertyType,
      propertyName: formData.propertyName,
      createdAt: formData.createdAt,
      updatedAt: formData.updatedAt,
    };

    const response = await axios.post('/api/enquiry/submit', transformedData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.success) {
      toast.success('Enquiry submitted successfully!');
      onClose(); // Close the modal after success
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error('Failed to submit enquiry. Please try again.');
  } finally {
    setIsSubmitting(false);
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
              <h3 className="font-medium text-gray-900">Property: {property.propertyName}</h3>
              <p className="text-sm text-gray-600">
                Price: ₹{property.price}
              </p>
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))}
              required
              />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              onChange={(e) => setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input 
              type="tel"
              id="phone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            ></textarea>
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

export default EnquiryForm;