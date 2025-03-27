import { useState } from 'react';
import { ArrowRight, CheckSquare, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface FinalStepsProps {
  onSubmit?: () => void;
}

const FinalSteps = ({ onSubmit }: FinalStepsProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [reviewComplete, setReviewComplete] = useState(false);

  const handleSubmit = () => {
    if (termsAccepted && reviewComplete) {
      onSubmit?.();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Final Steps</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Complete Your Listing</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Review & Preview */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <CheckSquare size={20} className="text-white/60" />
            Review & Preview Listing
          </h4>
          <div className="space-y-4">
            <p className="text-white/80">
              Please review all the information you've provided to ensure accuracy and completeness.
            </p>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={reviewComplete}
                onChange={(e) => setReviewComplete(e.target.checked)}
                className="rounded border-white/20 bg-transparent focus:ring-white text-white"
              />
              <span className="text-white/80">I have reviewed all the information</span>
            </label>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <FileText size={20} className="text-white/60" />
            Terms & Conditions
          </h4>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg text-white/80 text-sm space-y-2">
              <p>By listing your property, you agree to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Provide accurate and truthful information</li>
                <li>Keep property details up to date</li>
                <li>Respond to inquiries in a timely manner</li>
                <li>Follow all applicable laws and regulations</li>
                <li>Accept our platform's terms of service</li>
              </ul>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="rounded border-white/20 bg-transparent focus:ring-white text-white"
              />
              <span className="text-white/80">I agree to the terms and conditions</span>
            </label>
          </div>
        </div>

        {/* Submit for Approval */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <AlertTriangle size={20} className="text-white/60" />
            Submit for Approval
          </h4>
          <div className="space-y-4">
            <p className="text-white/80">
              Your listing will be reviewed by our team before going live. This process typically takes 24-48 hours.
            </p>
            <button
              onClick={handleSubmit}
              disabled={!termsAccepted || !reviewComplete}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 ${
                termsAccepted && reviewComplete
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-white/20 text-white/40 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 size={20} />
              <span>Submit Listing</span>
            </button>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium">Next Steps</h4>
          <div className="space-y-6">
            <div className="relative pl-8 pb-6 border-l border-white/20">
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-2 rounded-full bg-white"></div>
              <h5 className="font-medium">Admin Review</h5>
              <p className="text-sm text-white/60">Our team will verify all provided information</p>
            </div>
            <div className="relative pl-8 pb-6 border-l border-white/20">
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-2 rounded-full bg-white/20"></div>
              <h5 className="font-medium">Verification</h5>
              <p className="text-sm text-white/60">Property details and documents will be validated</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-2 rounded-full bg-white/20"></div>
              <h5 className="font-medium">Live Listing</h5>
              <p className="text-sm text-white/60">Your property will be visible to potential clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalSteps;