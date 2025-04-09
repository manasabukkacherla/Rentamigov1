import { useState } from 'react';
import { Calculator, IndianRupee, ArrowRight } from 'lucide-react';

interface PricePerSqftProps {
  price: string;
  area: {
    superBuiltUpAreaSqft: string;
    builtUpAreaSqft: string;
    carpetAreaSqft: string;
  };
}

const PricePerSqft = ({ price, area }: PricePerSqftProps) => {
  const [manualCalculation, setManualCalculation] = useState({
    squareFeet: '',
    price: '',
    pricePerSqft: '0'
  });

  const calculatePricePerSqft = (areaValue: string) => {
    if (!price || !areaValue || parseFloat(areaValue) === 0) return '0';
    return (parseFloat(price) / parseFloat(areaValue)).toFixed(2);
  };

  const handleManualCalculation = (field: string, value: string) => {
    const updatedCalculation = { ...manualCalculation, [field]: value };
    
    if (updatedCalculation.squareFeet && updatedCalculation.price) {
      const sqft = parseFloat(updatedCalculation.squareFeet);
      const totalPrice = parseFloat(updatedCalculation.price);
      
      if (sqft > 0) {
        updatedCalculation.pricePerSqft = (totalPrice / sqft).toFixed(2);
      } else {
        updatedCalculation.pricePerSqft = '0';
      }
    } else {
      updatedCalculation.pricePerSqft = '0';
    }

    setManualCalculation(updatedCalculation);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Calculator className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Price per sq.ft</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-8">
          {/* Manual Calculator */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator size={20} className="text-black/60" />
              <h4 className="text-lg font-medium text-black">Price Calculator</h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-black">Area (sq.ft)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={manualCalculation.squareFeet}
                    onChange={(e) => handleManualCalculation('squareFeet', e.target.value)}
                    placeholder="Enter area in sq.ft"
                    className="w-full px-4 py-3.5 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 text-sm">
                    sq.ft
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-black">Total Price</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <IndianRupee size={16} className="text-black/40" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={manualCalculation.price}
                    onChange={(e) => handleManualCalculation('price', e.target.value)}
                    placeholder="Enter total price"
                    className="w-full pl-10 pr-4 py-3.5 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-300 hover:border-black transition-colors duration-200">
              <div className="flex items-center justify-between">
                <span className="text-black/80 font-medium">Price per sq.ft</span>
                <div className="flex items-center gap-2">
                  <IndianRupee size={20} className="text-black" />
                  <span className="text-2xl font-semibold text-black">{manualCalculation.pricePerSqft}</span>
                  <span className="text-sm text-black/60">/sq.ft</span>
                </div>
              </div>
            </div>
          </div>

          {/* Property Area Calculations */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator size={20} className="text-black/60" />
              <h4 className="text-lg font-medium text-black">Property Area Calculations</h4>
            </div>

            <div className="space-y-4">
              {/* Super Built-up Area Price */}
              {area.superBuiltUpAreaSqft && (
                <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-300 hover:border-black transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-lg font-medium text-black">Super Built-up Area Price</h4>
                      <p className="text-sm text-black/60">
                        Based on {area.superBuiltUpAreaSqft} sq.ft
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee size={20} className="text-black" />
                      <span className="text-2xl font-semibold text-black">{calculatePricePerSqft(area.superBuiltUpAreaSqft)}</span>
                      <span className="text-sm text-black/60">/sq.ft</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Built-up Area Price */}
              {area.builtUpAreaSqft && (
                <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-300 hover:border-black transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-lg font-medium text-black">Built-up Area Price</h4>
                      <p className="text-sm text-black/60">
                        Based on {area.builtUpAreaSqft} sq.ft
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee size={20} className="text-black" />
                      <span className="text-2xl font-semibold text-black">{calculatePricePerSqft(area.builtUpAreaSqft)}</span>
                      <span className="text-sm text-black/60">/sq.ft</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Carpet Area Price */}
              {area.carpetAreaSqft && (
                <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-300 hover:border-black transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-lg font-medium text-black">Carpet Area Price</h4>
                      <p className="text-sm text-black/60">
                        Based on {area.carpetAreaSqft} sq.ft
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee size={20} className="text-black" />
                      <span className="text-2xl font-semibold text-black">{calculatePricePerSqft(area.carpetAreaSqft)}</span>
                      <span className="text-sm text-black/60">/sq.ft</span>
                    </div>
                  </div>
                </div>
              )}

              {!area.superBuiltUpAreaSqft && !area.builtUpAreaSqft && !area.carpetAreaSqft && (
                <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-300 hover:border-black transition-colors duration-200">
                  <div className="text-center space-y-2">
                    <Calculator size={24} className="mx-auto text-black/40" />
                    <p className="text-black/60">Please enter property area details to view price per sq.ft calculations</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePerSqft;