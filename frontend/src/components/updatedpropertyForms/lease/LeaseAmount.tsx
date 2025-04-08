import { useState } from 'react';
import { ArrowRight, IndianRupee } from 'lucide-react';

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
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold text-black">Lease Amount</h3>
        <ArrowRight className="opacity-40 text-black" size={20} />
        <span className="text-sm opacity-70 text-black">Enter Lease Details</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          {/* Lease Amount Input */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black">Lease Amount</h4>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <IndianRupee size={20} className="text-black/40" />
              </div>
              <input
                type="number"
                min="0"
                value={leaseAmount.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="Enter lease amount"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>
          </div>

          {/* Lease Duration */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black">Lease Duration</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                min="1"
                value={leaseAmount.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="Enter duration"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
              <select
                value={leaseAmount.durationUnit}
                onChange={(e) => handleChange('durationUnit', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="months" className="bg-white text-black">Months</option>
                <option value="years" className="bg-white text-black">Years</option>
              </select>
            </div>
          </div>

          {/* Amount Type Selection */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black">Amount Type</h4>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="amountType"
                  value="fixed"
                  checked={leaseAmount.type === 'fixed'}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="text-black border-black/20 bg-transparent focus:ring-black"
                />
                <span className="text-black/80">Fixed</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="amountType"
                  value="negotiable"
                  checked={leaseAmount.type === 'negotiable'}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="text-black border-black/20 bg-transparent focus:ring-black"
                />
                <span className="text-black/80">Negotiable</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseAmount;