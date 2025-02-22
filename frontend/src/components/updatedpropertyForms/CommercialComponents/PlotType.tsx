import { useState } from 'react';
import { ArrowRight, Factory, Building2, Truck, Store } from 'lucide-react';

interface PlotTypeProps {
  onPlotTypeChange?: (type: string) => void;
}

const PlotType = ({ onPlotTypeChange }: PlotTypeProps) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onPlotTypeChange?.(type);
  };

  const plotTypes = [
    { value: 'industrial', label: 'Industrial Plot' },
    { value: 'commercial', label: 'Commercial Plot' },
    { value: 'logistics', label: 'Logistics Park' },
    { value: 'retail', label: 'High-Street Retail Plot' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'industrial':
        return <Factory size={20} className="text-white/60" />;
      case 'logistics':
        return <Truck size={20} className="text-white/60" />;
      case 'retail':
        return <Store size={20} className="text-white/60" />;
      default:
        return <Building2 size={20} className="text-white/60" />;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Plot Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Plot Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Plot Type</h4>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select a plot type</option>
            {plotTypes.map(({ value, label }) => (
              <option key={value} value={value} className="bg-black">
                {label}
              </option>
            ))}
          </select>

          {selectedType && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                {getIcon(selectedType)}
                <h5 className="font-medium">Overview</h5>
              </div>
              <p className="text-white/80">
                {selectedType === 'industrial' && 'Plot designated for industrial development with necessary infrastructure and permissions.'}
                {selectedType === 'commercial' && 'Prime location plot suitable for commercial development and business establishments.'}
                {selectedType === 'logistics' && 'Strategic plot ideal for setting up logistics and warehousing facilities.'}
                {selectedType === 'retail' && 'Premium plot in high-traffic area perfect for retail development.'}
              </p>
            </div>
          )}

          {selectedType && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Key Features</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'industrial' && (
                    <>
                      <li>• Industrial zoning</li>
                      <li>• Power infrastructure</li>
                      <li>• Wide road access</li>
                      <li>• Industrial utilities</li>
                    </>
                  )}
                  {selectedType === 'commercial' && (
                    <>
                      <li>• Commercial zoning</li>
                      <li>• Prime location</li>
                      <li>• Development potential</li>
                      <li>• Basic infrastructure</li>
                    </>
                  )}
                  {selectedType === 'logistics' && (
                    <>
                      <li>• Strategic location</li>
                      <li>• Transport connectivity</li>
                      <li>• Large vehicle access</li>
                      <li>• Development ready</li>
                    </>
                  )}
                  {selectedType === 'retail' && (
                    <>
                      <li>• High visibility</li>
                      <li>• Foot traffic</li>
                      <li>• Corner location</li>
                      <li>• Frontage potential</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Ideal For</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'industrial' && (
                    <>
                      <li>• Manufacturing units</li>
                      <li>• Processing plants</li>
                      <li>• Industrial complexes</li>
                      <li>• Factory setup</li>
                    </>
                  )}
                  {selectedType === 'commercial' && (
                    <>
                      <li>• Office buildings</li>
                      <li>• Shopping centers</li>
                      <li>• Mixed-use development</li>
                      <li>• Business parks</li>
                    </>
                  )}
                  {selectedType === 'logistics' && (
                    <>
                      <li>• Warehousing</li>
                      <li>• Distribution centers</li>
                      <li>• Transport hubs</li>
                      <li>• Storage facilities</li>
                    </>
                  )}
                  {selectedType === 'retail' && (
                    <>
                      <li>• Retail stores</li>
                      <li>• Showrooms</li>
                      <li>• Shopping complexes</li>
                      <li>• Brand outlets</li>
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

export default PlotType;