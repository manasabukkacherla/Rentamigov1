import React from 'react';
import { Save, Send } from 'lucide-react';

interface CommercialSubmitButtonProps {
  onSubmit?: () => void;
  onSaveDraft?: () => void;
  isSubmitting?: boolean;
  isSaving?: boolean;
  submitLabel?: string;
  saveLabel?: string;
  className?: string;
}

const CommercialSubmitButton = ({
  onSubmit,
  onSaveDraft,
  isSubmitting = false,
  isSaving = false,
  submitLabel = 'List Property',
  saveLabel = 'Save as Draft',
  className = ''
}: CommercialSubmitButtonProps) => {
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto flex justify-end gap-4">
        {/* Save Draft Button */}
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isSaving}
          className="px-6 py-3 rounded-lg border-2 border-black text-black hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={20} className={isSaving ? 'animate-pulse' : ''} />
          <span>{isSaving ? 'Saving...' : saveLabel}</span>
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg bg-black text-white hover:bg-black/90 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} className={isSubmitting ? 'animate-pulse' : ''} />
          <span>{isSubmitting ? 'Submitting...' : submitLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default CommercialSubmitButton;