import { ArrowRight, MapPin } from 'lucide-react';

interface LandmarkProps {
  onLandmarkChange?: (landmark: string) => void;
}

const Landmark = ({ onLandmarkChange }: LandmarkProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Landmark</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Nearby Landmark</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <MapPin size={20} className="text-white/40" />
            </div>
            <input
              type="text"
              onChange={(e) => onLandmarkChange?.(e.target.value)}
              placeholder="Enter a prominent landmark near the property"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landmark;