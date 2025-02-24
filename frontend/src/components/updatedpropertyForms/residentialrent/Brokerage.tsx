import { useState } from 'react';
import { ArrowRight, IndianRupee } from 'lucide-react';

interface BrokerageProps {
  onBrokerageChange?: (brokerage: Record<string, any>) => void;
}

const Brokerage = ({ onBrokerageChange }: BrokerageProps) => {
  const [brokerage, setBrokerage] = useState({
    required: 'no',
    amount: ''
  });

  const handleChange = (field: string, value: any) => {
    const updatedBrokerage = { ...brokerage, [field]: value };
    if (field === 'required' && value === 'no') {
      updatedBrokerage.amount = '';
    }
    setBrokerage(updatedBrokerage);
    onBrokerageChange?.(updatedBrokerage);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Brokerage</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Specify Brokerage Details</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="brokerageRequired"
                value="yes"
                checked={brokerage.required === 'yes'}
                onChange={(e) => handleChange('required', e.target.value)}
                className="text-white border-white/20 bg-transparent focus:ring-white"
              />
              <span className="text-white/80">Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="brokerageRequired"
                value="no"
                checked={brokerage.required === 'no'}
                onChange={(e) => handleChange('required', e.target.value)}
                className="text-white border-white/20 bg-transparent focus:ring-white"
              />
              <span className="text-white/80">No</span>
            </label>
          </div>

          {brokerage.required === 'yes' && (
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <IndianRupee size={20} className="text-white/40" />
              </div>
              <input
                type="number"
                min="0"
                value={brokerage.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="Enter brokerage amount"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brokerage;