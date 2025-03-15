import { useState } from 'react';
import { ArrowRight, IndianRupee } from 'lucide-react';

interface RentProps {
  onRentChange?: (rent: Record<string, any>) => void;
}

const Rent = ({ onRentChange }: RentProps) => {
  const [rent, setRent] = useState({
    expectedRent: '',
    isNegotiable: false,
    rentType: ''
  });

  const handleChange = (field: string, value: any) => {
    const updatedRent = { ...rent, [field]: value };
    setRent(updatedRent);
    onRentChange?.(updatedRent);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Rent Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Rent Information</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <IndianRupee size={20} className="text-white/60" />
            Expected Rent
          </h4>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <IndianRupee size={20} className="text-white/40" />
              </div>
              <input
                type="number"
                min="0"
                value={rent.expectedRent}
                onChange={(e) => handleChange('expectedRent', e.target.value)}
                placeholder="Enter expected rent"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rent.isNegotiable}
                  onChange={(e) => handleChange('isNegotiable', e.target.checked)}
                  className="rounded border-white/20 bg-transparent focus:ring-white text-white"
                />
                <span className="text-white/80">Rent is negotiable</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="rentType"
                    value="inclusive"
                    checked={rent.rentType === 'inclusive'}
                    onChange={(e) => handleChange('rentType', e.target.value)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Inclusive of Maintenance</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="rentType"
                    value="exclusive"
                    checked={rent.rentType === 'exclusive'}
                    onChange={(e) => handleChange('rentType', e.target.value)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Exclusive of Maintenance</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;