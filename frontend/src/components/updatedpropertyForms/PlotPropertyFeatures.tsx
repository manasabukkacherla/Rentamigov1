import { useState } from 'react';
import { ArrowRight, Compass, Ruler, Zap, Droplets } from 'lucide-react';

interface PlotPropertyFeaturesProps {
  onFeaturesChange?: (features: Record<string, any>) => void;
}

const PlotPropertyFeatures = ({ onFeaturesChange }: PlotPropertyFeaturesProps) => {
  const [features, setFeatures] = useState({
    facing: '',
    builtUpAreaSqft: '',
    builtUpAreaSqmt: '',
    electricityAvailability: '',
    waterAvailability: {
      borewell: false,
      governmentSupply: false,
      tankerSupply: false
    }
  });

  const handleChange = (field: string, value: any) => {
    const updatedFeatures = { ...features, [field]: value };
    setFeatures(updatedFeatures);
    onFeaturesChange?.(updatedFeatures);
  };

  const handleWaterAvailabilityChange = (type: string, checked: boolean) => {
    const updatedFeatures = {
      ...features,
      waterAvailability: {
        ...features.waterAvailability,
        [type]: checked
      }
    };
    setFeatures(updatedFeatures);
    onFeaturesChange?.(updatedFeatures);
  };

  const convertSqftToSqmt = (sqft: string) => {
    if (!sqft) return '';
    const sqftNum = parseFloat(sqft);
    return (sqftNum * 0.092903).toFixed(2);
  };

  const convertSqmtToSqft = (sqmt: string) => {
    if (!sqmt) return '';
    const sqmtNum = parseFloat(sqmt);
    return (sqmtNum * 10.7639).toFixed(2);
  };

  const handleAreaChange = (field: string, value: string, unit: 'sqft' | 'sqmt') => {
    if (unit === 'sqft') {
      setFeatures({
        ...features,
        [`${field}Sqft`]: value,
        [`${field}Sqmt`]: convertSqftToSqmt(value)
      });
    } else {
      setFeatures({
        ...features,
        [`${field}Sqmt`]: value,
        [`${field}Sqft`]: convertSqmtToSqft(value)
      });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Plot Features</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Plot Details</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Property Facing */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Compass size={20} className="text-white/60" />
            Plot Facing
          </h4>
          <select
            value={features.facing}
            onChange={(e) => handleChange('facing', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select Facing</option>
            <option value="N" className="bg-black">North</option>
            <option value="S" className="bg-black">South</option>
            <option value="E" className="bg-black">East</option>
            <option value="W" className="bg-black">West</option>
            <option value="NE" className="bg-black">North East</option>
            <option value="NW" className="bg-black">North West</option>
            <option value="SE" className="bg-black">South East</option>
            <option value="SW" className="bg-black">South West</option>
          </select>
        </div>

        {/* Built-up Area */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Ruler size={20} className="text-white/60" />
            Built-up Area
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              min="0"
              value={features.builtUpAreaSqft}
              onChange={(e) => handleAreaChange('builtUpArea', e.target.value, 'sqft')}
              placeholder="Area in sq.ft"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
            <input
              type="number"
              min="0"
              value={features.builtUpAreaSqmt}
              onChange={(e) => handleAreaChange('builtUpArea', e.target.value, 'sqmt')}
              placeholder="Area in sq.mt"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>
        </div>

        {/* Utilities */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          {/* Electricity Availability */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Zap size={20} className="text-white/60" />
              Electricity Availability
            </h4>
            <select
              value={features.electricityAvailability}
              onChange={(e) => handleChange('electricityAvailability', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
            >
              <option value="" disabled className="bg-black">Select Availability</option>
              <option value="24hours" className="bg-black">24 Hours Power</option>
              <option value="partial" className="bg-black">Partial Power Cuts</option>
              <option value="no" className="bg-black">No Power</option>
            </select>
          </div>

          {/* Water Availability */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Droplets size={20} className="text-white/60" />
              Water Availability
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: 'borewell', label: 'Borewell' },
                { key: 'governmentSupply', label: 'Government Supply' },
                { key: 'tankerSupply', label: 'Tanker Supply' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={features.waterAvailability[key as keyof typeof features.waterAvailability]}
                    onChange={(e) => handleWaterAvailabilityChange(key, e.target.checked)}
                    className="rounded border-white/20 bg-transparent focus:ring-white text-white"
                  />
                  <span className="text-white/80">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotPropertyFeatures;