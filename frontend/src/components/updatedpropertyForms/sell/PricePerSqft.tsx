import { useState, useEffect } from 'react';
import { ArrowRight, Calculator, IndianRupee } from 'lucide-react';

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
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Price per sq.ft</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Calculate Price per Square Foot</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Manual Calculator */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Calculator size={20} className="text-white/60" />
            Price Calculator
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-white/80">Area (sq.ft)</label>
              <input
                type="number"
                min="0"
                value={manualCalculation.squareFeet}
                onChange={(e) => handleManualCalculation('squareFeet', e.target.value)}
                placeholder="Enter area in sq.ft"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/80">Total Price (₹)</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <IndianRupee size={20} className="text-white/40" />
                </div>
                <input
                  type="number"
                  min="0"
                  value={manualCalculation.price}
                  onChange={(e) => handleManualCalculation('price', e.target.value)}
                  placeholder="Enter total price"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Price per sq.ft:</span>
              <span className="text-xl font-semibold">₹ {manualCalculation.pricePerSqft}</span>
            </div>
          </div>
        </div>

        {/* Property Area Calculations */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium">Property Area Calculations</h4>

          {/* Super Built-up Area Price */}
          {area.superBuiltUpAreaSqft && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium flex items-center gap-2">
                  <Calculator size={20} className="text-white/60" />
                  <span>Super Built-up Area Price</span>
                </h4>
                <div className="text-xl font-semibold">
                  ₹ {calculatePricePerSqft(area.superBuiltUpAreaSqft)}/sq.ft
                </div>
              </div>
              <p className="text-sm text-white/60">
                Based on super built-up area of {area.superBuiltUpAreaSqft} sq.ft
              </p>
            </div>
          )}

          {/* Built-up Area Price */}
          {area.builtUpAreaSqft && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium flex items-center gap-2">
                  <Calculator size={20} className="text-white/60" />
                  <span>Built-up Area Price</span>
                </h4>
                <div className="text-xl font-semibold">
                  ₹ {calculatePricePerSqft(area.builtUpAreaSqft)}/sq.ft
                </div>
              </div>
              <p className="text-sm text-white/60">
                Based on built-up area of {area.builtUpAreaSqft} sq.ft
              </p>
            </div>
          )}

          {/* Carpet Area Price */}
          {area.carpetAreaSqft && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium flex items-center gap-2">
                  <Calculator size={20} className="text-white/60" />
                  <span>Carpet Area Price</span>
                </h4>
                <div className="text-xl font-semibold">
                  ₹ {calculatePricePerSqft(area.carpetAreaSqft)}/sq.ft
                </div>
              </div>
              <p className="text-sm text-white/60">
                Based on carpet area of {area.carpetAreaSqft} sq.ft
              </p>
            </div>
          )}

          {!area.superBuiltUpAreaSqft && !area.builtUpAreaSqft && !area.carpetAreaSqft && (
            <div className="text-center text-white/60 py-4">
              Please enter property area details to view price per sq.ft calculations
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricePerSqft;