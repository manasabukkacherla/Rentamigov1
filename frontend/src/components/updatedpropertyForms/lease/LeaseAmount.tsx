import { useState } from 'react';
import { ArrowRight, IndianRupee, Calendar, DollarSign } from 'lucide-react';

interface LeaseAmountProps {
  onLeaseAmountChange?: (leaseAmount: Record<string, any>) => void;
}

const LeaseAmount = ({ onLeaseAmountChange }: LeaseAmountProps) => {
  const [leaseAmount, setLeaseAmount] = useState({
    amount: '',
    type: 'fixed',
    duration: '',
    durationUnit: 'years'
  });

  const handleChange = (field: string, value: any) => {
    const updatedLeaseAmount = { ...leaseAmount, [field]: value };
    setLeaseAmount(updatedLeaseAmount);
    onLeaseAmountChange?.(updatedLeaseAmount);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-2xl font-bold text-gray-800">Lease Amount</h3>
        <ArrowRight className="text-black" size={20} />
        <span className="text-sm text-gray-600">Enter Lease Details</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-8">
        {/* Lease Amount Input */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <DollarSign className="text-black" size={20} />
            Lease Amount
          </h4>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <IndianRupee size={20} className="text-gray-400" />
            </div>
            <input
              type="number"
              min="0"
              value={leaseAmount.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              placeholder="Enter lease amount"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-2 focus:ring-black-100 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-black"
            />
          </div>
        </div>

        {/* Lease Duration */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Calendar size={20} className="text-black" />
            Lease Duration
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              min="1"
              value={leaseAmount.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="Enter duration"
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-black-500 focus:ring-2 focus:ring-black-100 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-black"
            />
            <select
              value={leaseAmount.durationUnit}
              onChange={(e) => handleChange('durationUnit', e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-black-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 hover:border-black"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        {/* Amount Type Selection */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Amount Type</h4>
          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                leaseAmount.type === 'fixed' 
                  ? 'border-black-500 bg-black-500' 
                  : 'border-gray-300 group-hover:border-black-300'
              }`}>
                {leaseAmount.type === 'fixed' && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <span className="text-gray-700 group-hover:text-black transition-colors duration-200">Fixed</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                leaseAmount.type === 'negotiable' 
                  ? 'border-black bg-black' 
                  : 'border-gray-300 group-hover:border-black'
              }`}>
                {leaseAmount.type === 'negotiable' && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <span className="text-gray-700 group-hover:text-black transition-colors duration-200">Negotiable</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseAmount;