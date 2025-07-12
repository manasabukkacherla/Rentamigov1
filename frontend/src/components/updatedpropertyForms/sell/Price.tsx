import { useState } from 'react';
import { IndianRupee } from 'lucide-react';

interface PriceData {
  amount: string;
  propertyPrice: number;
  pricetype: 'fixed' | 'negotiable';
  area: number;
  totalprice: number;
}

interface PriceProps {
  onPriceChange?: (price: PriceData) => void;
}

const Price = ({ onPriceChange }: PriceProps) => {
  const [price, setPrice] = useState<PriceData>({
    amount: "",
    propertyPrice: 0,
      pricetype: "fixed",
      area: 0,
      totalprice: 0,
  });

  const handleChange = (field: keyof PriceData, value: any) => {
    const updatedPrice = { ...price, [field]: value };
    setPrice(updatedPrice);
    onPriceChange?.(updatedPrice);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <IndianRupee className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Price Details</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <IndianRupee size={20} className="text-black/60" />
              <h4 className="text-lg font-medium text-black">Property Price</h4>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <span className="text-black/40">₹</span>
              </div>
              <input
                type="number"
                min="0"
                value={price.propertyPrice || ''}
                onChange={(e) => handleChange('propertyPrice', parseFloat(e.target.value))}
                placeholder="Enter property price"
                className="w-full pl-10 pr-4 py-3.5 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <IndianRupee size={20} className="text-black/60" />
              <h4 className="text-lg font-medium text-black">Price Type</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative flex items-center justify-between p-4 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-black transition-colors">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="priceType"
                    value="fixed"
                    checked={price.pricetype === 'fixed'}
                    onChange={(e) => handleChange('pricetype', e.target.value as 'fixed' | 'negotiable')}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-3 text-black">Fixed</span>
                </div>
              </label>
              <label className="relative flex items-center justify-between p-4 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-black transition-colors">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="priceType"
                    value="negotiable"
                    checked={price.pricetype === 'negotiable'}
                    onChange={(e) => handleChange('pricetype', e.target.value as 'fixed' | 'negotiable')}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-3 text-black">Negotiable</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;