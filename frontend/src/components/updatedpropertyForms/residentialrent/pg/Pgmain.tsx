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
import { Store, ChevronRight, ChevronLeft, Building2, UserCircle, ImageIcon, Calendar, DollarSign, CheckCircle, Loader2 } from "lucide-react";

const globalStyles = `
  input::placeholder,
  textarea::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
  
  /* Make radio button and checkbox text black */
  input[type="radio"] + label,
  input[type="checkbox"] + label {
    color: black;
  }
  
  /* Make select placeholder text black */
  select {
    color: black;
  }
  
  /* Make all form labels black */
  label {
    color: black;
  }
  
  /* Make all input text black */
  input,
  textarea,
  select {
    color: black;
  }
`;

function Pgmain() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSections = [
    { 
      id: 'pgDetails',
      title: "PG Details", 
      icon: <Building2 className="h-5 w-5" />,
      component: <PgName />
    },
    { 
      id: 'pgType',
      title: "PG Type", 
      icon: <Building2 className="h-5 w-5" />,
      component: <PgFor />
    },
    { 
      id: 'roomConfiguration',
      title: "Room Configuration", 
      icon: <Building2 className="h-5 w-5" />,
      component: <Configuration />
    },
    { 
      id: 'commonAreaAmenities',
      title: "Common Area Amenities", 
      icon: <Store className="h-5 w-5" />,
      component: <CommonAreaAmenities />
    },
    { 
      id: 'additionalServices',
      title: "Additional Services", 
      icon: <CheckCircle className="h-5 w-5" />,
      component: <AdditionalServices />
    },
    { 
      id: 'otherFeatures',
      title: "Other Features", 
      icon: <Store className="h-5 w-5" />,
      component: <OtherFeatures />
    },
    { 
      id: 'foodServices',
      title: "Food Services", 
      icon: <Store className="h-5 w-5" />,
      component: <FoodServices />
    },
    { 
      id: 'restrictions',
      title: "Restrictions & Rules", 
      icon: <CheckCircle className="h-5 w-5" />,
      component: <Restrictions />
    },
    { 
      id: 'pricing',
      title: "Pricing & Terms", 
      icon: <DollarSign className="h-5 w-5" />,
      component: <Pricing />
    },
    { 
      id: 'media',
      title: "Photos & Videos", 
      icon: <ImageIcon className="h-5 w-5" />,
      component: <PgMedia />
    }
  ];

  const renderFormSection = (content: React.ReactNode) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {content}
    </div>
  );

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
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
    <div className="min-h-screen bg-gray-50">
      <style>{globalStyles}</style>
      
      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
                <div
                  key={section.id}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setCurrentStep(index);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      index <= currentStep
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}>
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                      index <= currentStep
                        ? 'text-black'
                        : 'text-gray-500 group-hover:text-gray-700'
                    }`}>
                      {section.title}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className={`w-12 h-1 transition-colors duration-200 ${
                        index < currentStep ? 'bg-black' : 'bg-gray-200'
                      }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List Your PG/Co-living Space</h1>
          <p className="text-gray-600 mt-2">Fill in the details below to list your PG property</p>
        </div>

        {/* Form Content */}
        <div className="space-y-8">
          {/* Current Section Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg text-white">
              {formSections[currentStep].icon}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {formSections[currentStep].title}
            </h2>
          </div>

          {/* Form Section Content */}
          {renderFormSection(formSections[currentStep].component)}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`
                flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition-colors
                ${currentStep === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < formSections.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pgmain;