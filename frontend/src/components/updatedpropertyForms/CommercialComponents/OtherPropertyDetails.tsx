import { useState } from 'react';
import { ArrowRight, FileText, AlertTriangle, Store } from 'lucide-react';

interface OtherPropertyDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const OtherPropertyDetails = ({ onDetailsChange }: OtherPropertyDetailsProps) => {
  const [details, setDetails] = useState({
    propertyTypeDescription: '',
    specialFeatures: '',
    usageRecommendation: '',
    additionalRequirements: ''
  });

  const handleChange = (field: string, value: string) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Other Property Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Property Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Property Type Description */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Store size={20} className="text-black/60" />
            Property Type Description
          </h4>
          <textarea
            value={details.propertyTypeDescription}
            onChange={(e) => handleChange('propertyTypeDescription', e.target.value)}
            placeholder="Describe the type of property in detail"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-black placeholder:text-black/40 min-h-[150px]"
          />
        </div>

        {/* Special Features */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <FileText size={20} className="text-black/60" />
            Special Features or Restrictions
          </h4>
          <textarea
            value={details.specialFeatures}
            onChange={(e) => handleChange('specialFeatures', e.target.value)}
            placeholder="List any special features or restrictions"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-black placeholder:text-black/40 min-h-[150px]"
          />
        </div>

        {/* Usage Recommendation */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Store size={20} className="text-black/60" />
            Usage Recommendation
          </h4>
          <textarea
            value={details.usageRecommendation}
            onChange={(e) => handleChange('usageRecommendation', e.target.value)}
            placeholder="Recommend suitable usage (e.g., Retail, Storage, Events, etc.)"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-black placeholder:text-black/40 min-h-[150px]"
          />
        </div>

        {/* Additional Requirements */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <AlertTriangle size={20} className="text-black/60" />
            Additional Requirements for Renters
          </h4>
          <textarea
            value={details.additionalRequirements}
            onChange={(e) => handleChange('additionalRequirements', e.target.value)}
            placeholder="Specify any custom terms & conditions for renters"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-black placeholder:text-black/40 min-h-[150px]"
          />
        </div>
      </div>
    </div>
  );
};

export default OtherPropertyDetails;