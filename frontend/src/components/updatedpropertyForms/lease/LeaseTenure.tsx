import { useState } from 'react';
import { ArrowRight, Calendar, Clock, Timer } from 'lucide-react';

interface LeaseTenureProps {
  onLeaseTenureChange?: (tenure: Record<string, any>) => void;
}

const LeaseTenure = ({ onLeaseTenureChange }: LeaseTenureProps) => {
  const [tenure, setTenure] = useState({
    minimumTenure: 0,
    minimumUnit: 'years',
    maximumTenure: 0,
    maximumUnit: 'years',
    lockInPeriod: 0,
    lockInUnit: 'years',
    noticePeriod: 0,
    noticePeriodUnit: 'months'
  });

  const handleChange = (field: string, value: any) => {
    const updatedTenure = { ...tenure, [field]: value };
    setTenure(updatedTenure);
    onLeaseTenureChange?.(updatedTenure);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-2xl font-bold text-gray-800">Lease Tenure</h3>
        <ArrowRight className="text-blue-500" size={20} />
        <span className="text-sm text-gray-600">Enter Tenure Details</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-8">
        {/* Minimum Tenure */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Calendar size={20} className="text-blue-500" />
            Minimum Tenure
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              min="0"
              value={tenure.minimumTenure || ''}
              onChange={(e) => handleChange('minimumTenure', e.target.value)}
              placeholder="Enter minimum tenure"
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-blue-300"
            />
            <select
              value={tenure.minimumUnit}
              onChange={(e) => handleChange('minimumUnit', e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 hover:border-blue-300"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        {/* Maximum Tenure */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Calendar size={20} className="text-blue-500" />
            Maximum Tenure
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              min="0"
              value={tenure.maximumTenure || ''}
              onChange={(e) => handleChange('maximumTenure', e.target.value)}
              placeholder="Enter maximum tenure"
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-blue-300"
            />
            <select
              value={tenure.maximumUnit}
              onChange={(e) => handleChange('maximumUnit', e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 hover:border-blue-300"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        {/* Lock-in Period */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Timer size={20} className="text-blue-500" />
            Lock-in Period
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              min="0"
              value={tenure.lockInPeriod || ''}
              onChange={(e) => handleChange('lockInPeriod', e.target.value)}
              placeholder="Enter lock-in period"
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-blue-300"
            />
            <select
              value={tenure.lockInUnit}
              onChange={(e) => handleChange('lockInUnit', e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 hover:border-blue-300"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        {/* Notice Period */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Clock size={20} className="text-blue-500" />
            Notice Period
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              min="0"
              value={tenure.noticePeriod || ''   }
              onChange={(e) => handleChange('noticePeriod', e.target.value)}
              placeholder="Enter notice period"
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-blue-300"
            />
            <select
              value={tenure.noticePeriodUnit}
              onChange={(e) => handleChange('noticePeriodUnit', e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 hover:border-blue-300"
            >
              <option value="days">Days</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseTenure;