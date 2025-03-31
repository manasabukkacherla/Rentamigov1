"use client"

import type React from "react"
import { useState } from "react"
import { IndianRupee, X, ChevronUp, Shield, Calendar, CreditCard, Info, Phone, MessageSquare } from "lucide-react"
import { EnquiryForm } from "./EnquiryForm"

export const PricingCard: React.FC = () => {
  const [showEnquiry, setShowEnquiry] = useState(false)
  const [showMobilePricing, setShowMobilePricing] = useState(false)
  const [activeTab, setActiveTab] = useState<"pricing" | "details">("pricing")

  const PricingContent = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl shadow-sm">
        <div className="text-sm font-medium text-gray-500 mb-1">Monthly Maintenance</div>
        <div className="flex justify-between items-center text-gray-900">
          <span className="font-medium flex items-center gap-1">
            <Shield className="w-4 h-4 text-gray-500" />
            Amount
          </span>
          <span className="text-lg font-semibold">₹5,000</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl shadow-sm">
        <div className="text-sm font-medium text-gray-500 mb-1">Security Deposit</div>
        <div className="flex justify-between items-center text-gray-900">
          <span className="font-medium flex items-center gap-1">
            <CreditCard className="w-4 h-4 text-gray-500" />
            Amount
          </span>
          <span className="text-lg font-semibold">₹40,000</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl shadow-sm">
        <div className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Other Charges
        </div>
        <div className="space-y-2 text-gray-900">
          <div className="flex justify-between items-center">
            <span>Water</span>
            <span className="font-medium">₹500</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Electricity</span>
            <span className="font-medium">₹600</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Parking</span>
            <span className="font-medium">₹500</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setShowEnquiry(true)}
          className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Enquire Now
        </button>

        <button className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md">
          <Phone className="w-4 h-4" />
        </button>
      </div>

      <div className="text-xs text-gray-500 flex items-start gap-2">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>Prices may vary. Contact the property owner for the most accurate information.</p>
      </div>
    </div>
  )

  const DetailsContent = () => (
    <div className="space-y-3 h-[320px] overflow-y-auto pr-1">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">Property Highlights</h3>
        <ul className="space-y-1.5 text-sm">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
            <span>Semi-furnished with modular kitchen</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
            <span>24/7 security with CCTV surveillance</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
            <span>Power backup for essential areas</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
            <span>Covered parking included</span>
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">Availability</h3>
        <p className="text-sm text-gray-700">
          Available from <span className="font-medium">June 15, 2024</span>
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md font-medium">Ready to Move</span>
        </div>
      </div>

      <button
        onClick={() => setShowEnquiry(true)}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-3"
      >
        <MessageSquare className="w-4 h-4" />
        Enquire Now
      </button>
    </div>
  )

  return (
    <>
      {/* Desktop Version - Fixed on the right side */}
      <div className="hidden lg:block sticky top-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-h-[500px]">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gray-900 text-white p-2 rounded-lg">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-bold text-gray-900">25,000</span>
            <span className="text-gray-500 ml-1">/month</span>
          </div>
        </div>

        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab("pricing")}
            className={`flex-1 py-2.5 text-center font-medium transition-colors ${
              activeTab === "pricing" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`flex-1 py-2.5 text-center font-medium transition-colors ${
              activeTab === "details" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Details
          </button>
        </div>

        {activeTab === "pricing" ? <PricingContent /> : <DetailsContent />}
      </div>

      {/* Mobile Fixed Price Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <button
          onClick={() => setShowMobilePricing(true)}
          className="flex items-center justify-between w-full bg-white px-6 py-3 border-t border-gray-200 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="bg-gray-900 text-white p-1.5 rounded-lg">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">25,000</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">View Details</span>
            <ChevronUp
              className={`w-5 h-5 text-gray-600 transition-transform ${showMobilePricing ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Mobile Pricing Card Overlay */}
        {showMobilePricing && (
          <div
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
            onClick={() => setShowMobilePricing(false)}
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-900 text-white p-1.5 rounded-lg">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gray-900">25,000</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowMobilePricing(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex border-b border-gray-200 mb-4">
                <button
                  onClick={() => setActiveTab("pricing")}
                  className={`flex-1 py-2.5 text-center font-medium transition-colors ${
                    activeTab === "pricing"
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Pricing
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex-1 py-2.5 text-center font-medium transition-colors ${
                    activeTab === "details"
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Details
                </button>
              </div>

              {activeTab === "pricing" ? <PricingContent /> : <DetailsContent />}
            </div>
          </div>
        )}
      </div>

      {showEnquiry && <EnquiryForm onClose={() => setShowEnquiry(false)} />}
    </>
  )
}

