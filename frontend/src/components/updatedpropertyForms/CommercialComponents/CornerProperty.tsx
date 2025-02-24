import { ArrowRight, CornerUpRight } from 'lucide-react';
import { useState } from 'react';

interface CornerPropertyProps {
  onCornerPropertyChange?: (isCorner: boolean) => void;
}

const CornerProperty = ({ onCornerPropertyChange }: CornerPropertyProps) => {
  const [isCorner, setIsCorner] = useState(false);

  const handleChange = (value: boolean) => {
    setIsCorner(value);
    onCornerPropertyChange?.(value);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Corner Property</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Property Type</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-6">
            <div className="text-white/60">
              <CornerUpRight size={24} />
            </div>
            <div className="flex gap-8">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="cornerProperty"
                  checked={isCorner}
                  onChange={() => handleChange(true)}
                  className="text-white border-white/20 bg-transparent focus:ring-white"
                />
                <span className="text-white/80">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="cornerProperty"
                  checked={!isCorner}
                  onChange={() => handleChange(false)}
                  className="text-white border-white/20 bg-transparent focus:ring-white"
                />
                <span className="text-white/80">No</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CornerProperty;