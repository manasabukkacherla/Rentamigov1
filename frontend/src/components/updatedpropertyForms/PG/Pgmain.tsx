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
import { Save, ArrowRight, ArrowLeft } from 'lucide-react';

function Pgmain() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { title: "PG Details", component: <PgName /> },
    { title: "PG Type", component: <PgFor /> },
    { title: "Room Configuration", component: <Configuration /> },
    { title: "Common Area Amenities", component: <CommonAreaAmenities /> },
    { title: "Additional Services", component: <AdditionalServices /> },
    { title: "Other Features", component: <OtherFeatures /> },
    { title: "Food Services", component: <FoodServices /> },
    { title: "Restrictions & Rules", component: <Restrictions /> },
    { title: "Pricing & Terms", component: <Pricing /> },
    { title: "Photos & Videos", component: <PgMedia /> }
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
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-white">PG Registration</h1>
            <span className="text-white">Step {currentStep + 1} of {steps.length}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2.5">
            <div 
              className="bg-white h-2.5 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Title */}
        <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-800 pb-2">
          {steps[currentStep].title}
        </h2>

        {/* Current Step Component */}
        <div className="space-y-8">
          {steps[currentStep].component}
        </div>
          
        {/* Navigation Buttons */}
        <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pt-8 pb-4 mt-8">
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`
                flex items-center space-x-2 px-6 py-3 
                ${currentStep === 0 ? 'bg-gray-800 text-gray-500' : 'bg-gray-800 text-white hover:bg-gray-700'}
                border-2 border-gray-700
                font-semibold rounded-lg
                transform transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className={`
                  flex items-center space-x-2 px-6 py-3 
                  bg-white text-black
                  border-2 border-white
                  font-semibold rounded-lg
                  transform transition-all duration-200
                  hover:bg-black hover:text-white
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
                `}
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`
                  flex items-center space-x-2 px-8 py-3 
                  bg-white text-black
                  border-2 border-white
                  font-semibold rounded-lg
                  transform transition-all duration-200
                  hover:bg-black hover:text-white
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
                  disabled:opacity-50 disabled:cursor-not-allowed
                  disabled:hover:bg-white disabled:hover:text-black
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Submit PG Details</span>
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