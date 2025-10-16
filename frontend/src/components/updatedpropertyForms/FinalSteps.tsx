"use client"

import { useState, useEffect } from "react"
import { ArrowRight, CheckSquare, FileText, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react"

interface FinalStepsProps {
  onSubmit?: () => void
}

const FinalSteps = ({ onSubmit }: FinalStepsProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [reviewComplete, setReviewComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleSubmit = () => {
    if (termsAccepted && reviewComplete) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setShowSuccess(true)
        onSubmit?.()
      }, 2000)
    }
  }

  useEffect(() => {
    // Animate timeline steps
    const interval = setInterval(() => {
      if (currentStep < 3 && showSuccess) {
        setCurrentStep((prev) => prev + 1)
      } else {
        clearInterval(interval)
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [showSuccess, currentStep])

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800">Final Steps</h3>
        <ArrowRight className="text-gray-500" size={20} />
        <span className="text-sm text-gray-500">Complete Your Listing</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Review & Preview */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 transition-all duration-300 hover:border-gray-300">
          <h4 className="text-xl font-medium flex items-center gap-3 mb-5 text-gray-800">
            <CheckSquare size={22} className="text-gray-700" />
            Review & Preview Listing
          </h4>
          <div className="space-y-5">
            <p className="text-gray-700 leading-relaxed">
              Please review all the information you've provided to ensure accuracy and completeness. This helps
              potential clients get a clear understanding of your property.
            </p>
            <label className="flex items-center gap-3 p-4 bg-white rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 border border-gray-200">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={reviewComplete}
                  onChange={(e) => setReviewComplete(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-6 h-6 border-2 border-gray-300 rounded-md peer-checked:bg-black peer-checked:border-black transition-all duration-200"></div>
                <CheckSquare
                  size={22}
                  className="absolute top-0 left-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                />
              </div>
              <span className="text-gray-800">I have reviewed all the information and confirm it's accurate</span>
            </label>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 transition-all duration-300 hover:border-gray-300">
          <h4 className="text-xl font-medium flex items-center gap-3 mb-5 text-gray-800">
            <FileText size={22} className="text-gray-700" />
            Terms & Conditions
          </h4>
          <div className="space-y-5">
            <div className="p-5 bg-white rounded-xl text-gray-700 text-sm space-y-4 max-h-60 overflow-y-auto custom-scrollbar border border-gray-200">
              <p className="font-medium text-gray-800">By listing your property, you agree to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>
                    Provide accurate and truthful information about your property, including its condition, features,
                    and availability.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>
                    Keep your property details up to date and promptly remove listings when the property is no longer
                    available.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>Respond to inquiries from potential clients in a timely and professional manner.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>
                    Follow all applicable laws and regulations related to property listing and rental/sale in your
                    jurisdiction.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>Accept our platform's terms of service, privacy policy, and community guidelines.</span>
                </li>
              </ul>
            </div>
            <label className="flex items-center gap-3 p-4 bg-white rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 border border-gray-200">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-6 h-6 border-2 border-gray-300 rounded-md peer-checked:bg-black peer-checked:border-black transition-all duration-200"></div>
                <CheckSquare
                  size={22}
                  className="absolute top-0 left-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                />
              </div>
              <span className="text-gray-800">I agree to the terms and conditions</span>
            </label>
          </div>
        </div>

        {/* Submit for Approval */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 transition-all duration-300 hover:border-gray-300">
          <h4 className="text-xl font-medium flex items-center gap-3 mb-5 text-gray-800">
            <AlertTriangle size={22} className="text-gray-700" />
            Submit for Approval
          </h4>
          <div className="space-y-5">
            <p className="text-gray-700 leading-relaxed">
              Your listing will be reviewed by our team before going live. This process typically takes 24-48 hours.
              We'll notify you once your property is approved and visible to potential clients.
            </p>
            <button
              onClick={handleSubmit}
              disabled={!termsAccepted || !reviewComplete || isSubmitting}
              className={`px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 w-full sm:w-auto ${
                termsAccepted && reviewComplete && !isSubmitting
                  ? "bg-black text-white hover:bg-black/90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle2 size={20} />
                  <span>Listing Submitted!</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  <span>Submit Listing</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 transition-all duration-300 hover:border-gray-300">
          <h4 className="text-xl font-medium mb-6 text-gray-800">Next Steps</h4>
          <div className="space-y-0">
            <div className="relative pl-10 pb-8 border-l border-gray-300">
              <div
                className={`absolute left-0 top-0 w-5 h-5 -translate-x-2.5 rounded-full transition-all duration-500 ${currentStep >= 1 ? "bg-black scale-110" : "bg-gray-300"}`}
              ></div>
              <h5
                className={`font-medium transition-colors duration-500 ${currentStep >= 1 ? "text-black" : "text-gray-500"}`}
              >
                Admin Review
              </h5>
              <p className="text-sm text-gray-500 mt-1">Our team will verify all provided information</p>
            </div>
            <div className="relative pl-10 pb-8 border-l border-gray-300">
              <div
                className={`absolute left-0 top-0 w-5 h-5 -translate-x-2.5 rounded-full transition-all duration-500 ${currentStep >= 2 ? "bg-black scale-110" : "bg-gray-300"}`}
              ></div>
              <h5
                className={`font-medium transition-colors duration-500 ${currentStep >= 2 ? "text-black" : "text-gray-500"}`}
              >
                Verification
              </h5>
              <p className="text-sm text-gray-500 mt-1">Property details and documents will be validated</p>
            </div>
            <div className="relative pl-10">
              <div
                className={`absolute left-0 top-0 w-5 h-5 -translate-x-2.5 rounded-full transition-all duration-500 ${currentStep >= 3 ? "bg-black scale-110" : "bg-gray-300"}`}
              ></div>
              <h5
                className={`font-medium transition-colors duration-500 ${currentStep >= 3 ? "text-black" : "text-gray-500"}`}
              >
                Live Listing
              </h5>
              <p className="text-sm text-gray-500 mt-1">Your property will be visible to potential clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalSteps

