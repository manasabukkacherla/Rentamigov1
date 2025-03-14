import React, { useState } from 'react';
import { IndianRupee, X, ChevronUp } from 'lucide-react';
import { EnquiryForm } from './EnquiryForm';

export const PricingCard: React.FC = () => {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showMobilePricing, setShowMobilePricing] = useState(false);

  const PricingContent = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-sm font-medium text-gray-500 mb-1">Monthly Maintenance</div>
        <div className="flex justify-between items-center text-gray-900">
          <span className="font-medium">Amount</span>
          <span className="text-lg">₹5,000</span>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-sm font-medium text-gray-500 mb-1">Security Deposit</div>
        <div className="flex justify-between items-center text-gray-900">
          <span className="font-medium">Amount</span>
          <span className="text-lg">₹40,000</span>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-sm font-medium text-gray-500 mb-2">Other Charges</div>
        <div className="space-y-2 text-gray-900">
          <div className="flex justify-between items-center">
            <span>Water</span>
            <span>₹500</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Electricity</span>
            <span>₹600</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Parking</span>
            <span>₹500</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setShowEnquiry(true)}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        Enquire Now
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Version - Fixed on the right side */}
      <div className="hidden lg:block sticky top-6 bg-white rounded-lg p-4 shadow-lg [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-2 mb-4">
          <IndianRupee className="w-8 h-5 text-gray-900" />
          <span className="text-2xl font-bold text-gray-900">25,000</span>
          <span className="text-gray-500">/month</span>
        </div>
        <PricingContent />
      </div>

      {/* Mobile Fixed Price Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <button
          onClick={() => setShowMobilePricing(true)}
          className="flex items-center justify-between w-full bg-white px-6 py-4 border-t border-gray-200 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <IndianRupee className="w-8 h-5 text-gray-900" />
            <span className="text-2xl font-bold text-gray-900">25,000</span>
            <span className="text-gray-500">/month</span>
          </div>
          <ChevronUp className={`w-5 h-5 text-gray-600 transition-transform ${showMobilePricing ? 'rotate-180' : ''}`} />
        </button>

        {/* Mobile Pricing Card Overlay */}
        {showMobilePricing && (
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowMobilePricing(false)}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Pricing Details</h2>
                <button
                  onClick={() => setShowMobilePricing(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <PricingContent />
            </div>
          </div>
        )}
      </div>

      {showEnquiry && (
        <EnquiryForm onClose={() => setShowEnquiry(false)} />
      )}
    </>
  );
};