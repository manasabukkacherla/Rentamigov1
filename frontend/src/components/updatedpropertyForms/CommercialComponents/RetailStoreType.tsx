import { useState } from 'react';
import { ArrowRight, Store } from 'lucide-react';

interface RetailStoreTypeProps {
  onRetailTypeChange?: (type: string) => void;
}

const RetailStoreType = ({ onRetailTypeChange }: RetailStoreTypeProps) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onRetailTypeChange?.(type);
  };

  const retailTypes = [
    { value: 'standalone', label: 'Standalone Retail Store' },
    { value: 'shopping-complex', label: 'Retail Space in a Shopping Complex' },
    { value: 'hypermarket', label: 'Hypermarket Space' },
    { value: 'strip-mall', label: 'Strip Mall Unit' },
    { value: 'pop-up', label: 'Pop-Up Store' }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Retail Store Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Retail Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Store size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Retail Store Type</h4>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select a retail store type</option>
            {retailTypes.map(({ value, label }) => (
              <option key={value} value={value} className="bg-black">
                {label}
              </option>
            ))}
          </select>

          {selectedType && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <p className="text-white/80">
                {selectedType === 'standalone' && 'An independent retail store with complete control over branding and operations.'}
                {selectedType === 'shopping-complex' && 'Retail space within a larger shopping complex, benefiting from shared facilities and foot traffic.'}
                {selectedType === 'hypermarket' && 'Large format retail space suitable for departmental stores or supermarkets.'}
                {selectedType === 'strip-mall' && 'Retail unit in an open-air shopping center with direct storefront parking.'}
                {selectedType === 'pop-up' && 'Temporary retail space perfect for seasonal sales, product launches, or brand activations.'}
              </p>
            </div>
          )}

          {selectedType && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Key Features</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'standalone' && (
                    <>
                      <li>• Complete brand visibility</li>
                      <li>• Customizable storefront</li>
                      <li>• Dedicated parking possible</li>
                      <li>• Full operational control</li>
                    </>
                  )}
                  {selectedType === 'shopping-complex' && (
                    <>
                      <li>• High foot traffic</li>
                      <li>• Shared facilities</li>
                      <li>• Security services</li>
                      <li>• Common area maintenance</li>
                    </>
                  )}
                  {selectedType === 'hypermarket' && (
                    <>
                      <li>• Large floor space</li>
                      <li>• Multiple departments</li>
                      <li>• Storage facilities</li>
                      <li>• Loading/unloading zones</li>
                    </>
                  )}
                  {selectedType === 'strip-mall' && (
                    <>
                      <li>• Direct storefront access</li>
                      <li>• Convenient parking</li>
                      <li>• High visibility</li>
                      <li>• Easy loading/unloading</li>
                    </>
                  )}
                  {selectedType === 'pop-up' && (
                    <>
                      <li>• Flexible lease terms</li>
                      <li>• Quick setup</li>
                      <li>• Strategic locations</li>
                      <li>• Event-friendly spaces</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Ideal For</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'standalone' && (
                    <>
                      <li>• Established retail brands</li>
                      <li>• Flagship stores</li>
                      <li>• Multi-brand outlets</li>
                      <li>• Specialty retailers</li>
                    </>
                  )}
                  {selectedType === 'shopping-complex' && (
                    <>
                      <li>• Fashion retailers</li>
                      <li>• Food & beverage</li>
                      <li>• Electronics stores</li>
                      <li>• Service businesses</li>
                    </>
                  )}
                  {selectedType === 'hypermarket' && (
                    <>
                      <li>• Supermarket chains</li>
                      <li>• Department stores</li>
                      <li>• Wholesale retailers</li>
                      <li>• Multi-category stores</li>
                    </>
                  )}
                  {selectedType === 'strip-mall' && (
                    <>
                      <li>• Convenience stores</li>
                      <li>• Quick-service restaurants</li>
                      <li>• Service businesses</li>
                      <li>• Local retailers</li>
                    </>
                  )}
                  {selectedType === 'pop-up' && (
                    <>
                      <li>• Seasonal retailers</li>
                      <li>• Brand activations</li>
                      <li>• Product launches</li>
                      <li>• Art galleries/exhibitions</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetailStoreType;