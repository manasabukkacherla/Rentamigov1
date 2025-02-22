import { useState } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface LeaseTenureProps {
  onLeaseTenureChange?: (tenure: Record<string, any>) => void;
}

const LeaseTenure = ({ onLeaseTenureChange }: LeaseTenureProps) => {
  const [tenure, setTenure] = useState({
    minimumTenure: '',
    minimumUnit: 'years',
    maximumTenure: '',
    maximumUnit: 'years',
    lockInPeriod: '',
    lockInUnit: 'years',
    noticePeriod: '',
    noticePeriodUnit: 'months'
  });

  const handleChange = (field: string, value: any) => {
    const updatedTenure = { ...tenure, [field]: value };
    setTenure(updatedTenure);
    onLeaseTenureChange?.(updatedTenure);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Lease Tenure</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Tenure Details</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          {/* Minimum Tenure */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Calendar size={20} className="text-white/60" />
              Minimum Tenure
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                min="0"
                value={tenure.minimumTenure}
                onChange={(e) => handleChange('minimumTenure', e.target.value)}
                placeholder="Enter minimum tenure"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
              <select
                value={tenure.minimumUnit}
                onChange={(e) => handleChange('minimumUnit', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="months" className="bg-black">Months</option>
                <option value="years" className="bg-black">Years</option>
              </select>
            </div>
          </div>

          {/* Maximum Tenure */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Calendar size={20} className="text-white/60" />
              Maximum Tenure
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                min="0"
                value={tenure.maximumTenure}
                onChange={(e) => handleChange('maximumTenure', e.target.value)}
                placeholder="Enter maximum tenure"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
              <select
                value={tenure.maximumUnit}
                onChange={(e) => handleChange('maximumUnit', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="months" className="bg-black">Months</option>
                <option value="years" className="bg-black">Years</option>
              </select>
            </div>
          </div>

          {/* Lock-in Period */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Clock size={20} className="text-white/60" />
              Lock-in Period
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                min="0"
                value={tenure.lockInPeriod}
                onChange={(e) => handleChange('lockInPeriod', e.target.value)}
                placeholder="Enter lock-in period"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
              <select
                value={tenure.lockInUnit}
                onChange={(e) => handleChange('lockInUnit', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="months" className="bg-black">Months</option>
                <option value="years" className="bg-black">Years</option>
              </select>
            </div>
          </div>

          {/* Notice Period */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Clock size={20} className="text-white/60" />
              Notice Period
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                min="0"
                value={tenure.noticePeriod}
                onChange={(e) => handleChange('noticePeriod', e.target.value)}
                placeholder="Enter notice period"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
              <select
                value={tenure.noticePeriodUnit}
                onChange={(e) => handleChange('noticePeriodUnit', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="days" className="bg-black">Days</option>
                <option value="months" className="bg-black">Months</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseTenure;