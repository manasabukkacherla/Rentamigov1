"use client"

import React, { useState } from 'react';
import PgName from './PgName';
import Configuration from './Configuration';
import PgFor from './PgFor';
import CommonAreaAmenities from './CommonAreaAmenities';
import AdditionalServices from './AdditionalServices';
import OtherFeatures from './OtherFeatures';
import FoodServices from './FoodServices';
import Restrictions from './Restrictions';
import Pricing from './Pricing';
import PgMedia from './PgMedia';
import { Save, ArrowRight, ArrowLeft, Building2 } from 'lucide-react';

function Pgmain() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { 
      title: "PG Details", 
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black">
          <div className="flex items-center mb-8">
            <Building2 className="text-black mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-black">PG Details</h3>
          </div>
          <PgName />
        </div>
      )
    },
    { 
      title: "PG Type", 
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black">
          <div className="flex items-center mb-8">
            <Building2 className="text-black mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-black">PG Type</h3>
          </div>
          <PgFor />
        </div>
      )
    },
    { 
      title: "Room Configuration", 
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black">
          <div className="flex items-center mb-8">
            <Building2 className="text-black mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-black">Room Configuration</h3>
          </div>
          <Configuration />
        </div>
      )
    },
    { 
      title: "Common Area Amenities", 
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black">
          <div className="flex items-center mb-8">
            <Building2 className="text-black mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-black">Common Area Amenities</h3>
          </div>
          <CommonAreaAmenities />
        </div>
      )
    },
    { 
      title: "Additional Services", 
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black">
          <div className="flex items-center mb-8">
            <Building2 className="text-black mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-black">Additional Services</h3>
          </div>
          <AdditionalServices />
        </div>
      )
    },
    { 
      title: "Other Features", 
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black">
          <div className="flex items-center mb-8">
            <Building2 className="text-black mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-black">Other Features</h3>
          </div>
          <OtherFeatures />
        </div>
      )
    },
    { 
      title: "Food Services", 
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black">
          <div className="flex items-center mb-8">
            <Building2 className="text-black mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-black">Food Services</h3>
          </div>
          <FoodServices />
        </div>
      )
    },
    { 
      title: "Restrictions & Rules", 
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black">
          <div className="flex items-center mb-8">
            <Building2 className="text-black mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-black">Restrictions & Rules</h3>
          </div>
          <Restrictions />
        </div>
      )
    },
    { 
      title: "Pricing & Terms", 
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black">
          <div className="flex items-center mb-8">
            <Building2 className="text-black mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-black">Pricing & Terms</h3>
          </div>
          <Pricing />
        </div>
      )
    },
    { 
      title: "Photos & Videos", 
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg [&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_select]:text-black [&_select]:border-black/20 [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_textarea]:text-black [&_textarea]:border-black/20 [&_label]:text-black [&_p]:text-black [&_span]:text-black [&_svg]:text-black">
          <div className="flex items-center mb-8">
            <Building2 className="text-black mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-black">Photos & Videos</h3>
          </div>
          <PgMedia />
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Here you would typically collect all the data from child components
    // and submit it to your backend

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('PG details submitted successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Building2 className="w-8 h-8 text-black" />
          <div>
            <h1 className="text-2xl font-bold text-black">List Your PG/Co-living Space</h1>
            <p className="text-sm text-black/70">Step {currentStep + 1} of {steps.length}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-black h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Step Component */}
        <div className="space-y-8">
          {steps[currentStep].component}
        </div>
          
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg transition-colors duration-200
              ${currentStep === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
              }
            `}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-black text-white hover:bg-black/90 transition-colors duration-200"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-black text-white hover:bg-black/90 transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-400"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Submit</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pgmain;