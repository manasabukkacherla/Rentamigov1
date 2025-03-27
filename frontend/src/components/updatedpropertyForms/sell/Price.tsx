import { useState } from 'react';
import { ArrowRight, IndianRupee } from 'lucide-react';

interface PriceProps {
  onPriceChange?: (price: Record<string, any>) => void;
}

const Price = ({ onPriceChange }: PriceProps) => {
  const [price, setPrice] = useState({
    amount: '',
    type: 'fixed',
  });

  const handleChange = (field: string, value: any) => {
    const updatedPrice = { ...price, [field]: value };
    setPrice(updatedPrice);
    onPriceChange?.(updatedPrice);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Price</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Property Price</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <IndianRupee size={20} className="text-white/40" />
            </div>
            <input
              type="number"
              min="0"
              value={price.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              placeholder="Enter property price"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="priceType"
                value="fixed"
                checked={price.type === 'fixed'}
                onChange={(e) => handleChange('type', e.target.value)}
                className="text-white border-white/20 bg-transparent focus:ring-white"
              />
              <span className="text-white/80">Fixed</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="priceType"
                value="negotiable"
                checked={price.type === 'negotiable'}
                onChange={(e) => handleChange('type', e.target.value)}
                className="text-white border-white/20 bg-transparent focus:ring-white"
              />
              <span className="text-white/80">Negotiable</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;