import { useState } from 'react';
import { ArrowRight, Warehouse, Factory, Tractor, Wrench, Car } from 'lucide-react';

interface ShedTypeProps {
  onShedTypeChange?: (type: string) => void;
}

const ShedType = ({ onShedTypeChange }: ShedTypeProps) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onShedTypeChange?.(type);
  };

  const shedTypes = [
    { value: 'industrial', label: 'Industrial Shed' },
    { value: 'godown', label: 'Godown Shed' },
    { value: 'agricultural', label: 'Agricultural Shed' },
    { value: 'workshop', label: 'Workshop Shed' },
    { value: 'automobile', label: 'Automobile Shed' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'industrial':
        return <Factory size={20} className="text-white/60" />;
      case 'agricultural':
        return <Tractor size={20} className="text-white/60" />;
      case 'workshop':
        return <Wrench size={20} className="text-white/60" />;
      case 'automobile':
        return <Car size={20} className="text-white/60" />;
      default:
        return <Warehouse size={20} className="text-white/60" />;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Shed Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Shed Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Warehouse size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Shed Type</h4>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select a shed type</option>
            {shedTypes.map(({ value, label }) => (
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
                {selectedType === 'industrial' && 'Heavy-duty shed designed for industrial operations with robust infrastructure.'}
                {selectedType === 'godown' && 'Storage-focused shed with proper ventilation and security features.'}
                {selectedType === 'agricultural' && 'Specialized shed for agricultural equipment and produce storage.'}
                {selectedType === 'workshop' && 'Versatile shed space equipped for manufacturing and repair work.'}
                {selectedType === 'automobile' && 'Purpose-built shed for vehicle servicing and maintenance.'}
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
                      <li>• High ceiling clearance</li>
                      <li>• Heavy machinery support</li>
                      <li>• Industrial power supply</li>
                      <li>• Loading/unloading bays</li>
                    </>
                  )}
                  {selectedType === 'godown' && (
                    <>
                      <li>• Proper ventilation</li>
                      <li>• Security systems</li>
                      <li>• Storage racks</li>
                      <li>• Fire safety measures</li>
                    </>
                  )}
                  {selectedType === 'agricultural' && (
                    <>
                      <li>• Weather protection</li>
                      <li>• Equipment storage</li>
                      <li>• Ventilation system</li>
                      <li>• Wide entrances</li>
                    </>
                  )}
                  {selectedType === 'workshop' && (
                    <>
                      <li>• Work benches</li>
                      <li>• Power points</li>
                      <li>• Tool storage</li>
                      <li>• Adequate lighting</li>
                    </>
                  )}
                  {selectedType === 'automobile' && (
                    <>
                      <li>• Vehicle lifts</li>
                      <li>• Oil disposal system</li>
                      <li>• Compressed air lines</li>
                      <li>• Tool storage</li>
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
                      <li>• Assembly lines</li>
                      <li>• Heavy industries</li>
                      <li>• Processing units</li>
                    </>
                  )}
                  {selectedType === 'godown' && (
                    <>
                      <li>• Wholesalers</li>
                      <li>• Distributors</li>
                      <li>• Logistics companies</li>
                      <li>• Retailers</li>
                    </>
                  )}
                  {selectedType === 'agricultural' && (
                    <>
                      <li>• Farmers</li>
                      <li>• Agricultural suppliers</li>
                      <li>• Equipment dealers</li>
                      <li>• Produce storage</li>
                    </>
                  )}
                  {selectedType === 'workshop' && (
                    <>
                      <li>• Small manufacturers</li>
                      <li>• Craftsmen</li>
                      <li>• Repair services</li>
                      <li>• Training centers</li>
                    </>
                  )}
                  {selectedType === 'automobile' && (
                    <>
                      <li>• Auto repair shops</li>
                      <li>• Service centers</li>
                      <li>• Car detailing</li>
                      <li>• Tire services</li>
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

export default ShedType;