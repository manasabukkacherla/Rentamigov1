import { useState } from 'react';
import { ArrowRight, Warehouse, Container, PartyPopper, Truck, Map } from 'lucide-react';

interface CoveredOpenSpaceTypeProps {
  onSpaceTypeChange?: (type: string) => void;
}

const CoveredOpenSpaceType = ({ onSpaceTypeChange }: CoveredOpenSpaceTypeProps) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onSpaceTypeChange?.(type);
  };

  const spaceTypes = [
    { value: 'open-yard', label: 'Open Yard' },
    { value: 'container-yard', label: 'Container Yard' },
    { value: 'event-space', label: 'Event Space' },
    { value: 'truck-parking', label: 'Truck Parking Lot' },
    { value: 'fenced-land', label: 'Fenced Open Land' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'container-yard':
        return <Container size={20} className="text-white/60" />;
      case 'event-space':
        return <PartyPopper size={20} className="text-white/60" />;
      case 'truck-parking':
        return <Truck size={20} className="text-white/60" />;
      case 'fenced-land':
        return <Map size={20} className="text-white/60" />;
      default:
        return <Warehouse size={20} className="text-white/60" />;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Covered/Open Space Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Space Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Warehouse size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Space Type</h4>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select a space type</option>
            {spaceTypes.map(({ value, label }) => (
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
                {selectedType === 'open-yard' && 'Versatile open space suitable for multiple commercial purposes.'}
                {selectedType === 'container-yard' && 'Specialized yard for container storage and handling operations.'}
                {selectedType === 'event-space' && 'Open area suitable for hosting events and gatherings.'}
                {selectedType === 'truck-parking' && 'Dedicated space for commercial vehicle parking and logistics.'}
                {selectedType === 'fenced-land' && 'Secured open land with proper fencing for various uses.'}
              </p>
            </div>
          )}

          {selectedType && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Key Features</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'open-yard' && (
                    <>
                      <li>• Level ground</li>
                      <li>• Vehicle access</li>
                      <li>• Basic utilities</li>
                      <li>• Security provisions</li>
                    </>
                  )}
                  {selectedType === 'container-yard' && (
                    <>
                      <li>• Reinforced surface</li>
                      <li>• Container handling</li>
                      <li>• Wide access gates</li>
                      <li>• Security systems</li>
                    </>
                  )}
                  {selectedType === 'event-space' && (
                    <>
                      <li>• Open layout</li>
                      <li>• Power supply</li>
                      <li>• Parking space</li>
                      <li>• Basic amenities</li>
                    </>
                  )}
                  {selectedType === 'truck-parking' && (
                    <>
                      <li>• Durable surface</li>
                      <li>• Wide entrances</li>
                      <li>• Security booth</li>
                      <li>• Basic facilities</li>
                    </>
                  )}
                  {selectedType === 'fenced-land' && (
                    <>
                      <li>• Secure fencing</li>
                      <li>• Gated access</li>
                      <li>• Clear boundaries</li>
                      <li>• Basic infrastructure</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Ideal For</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'open-yard' && (
                    <>
                      <li>• Material storage</li>
                      <li>• Equipment parking</li>
                      <li>• Temporary storage</li>
                      <li>• Loading/unloading</li>
                    </>
                  )}
                  {selectedType === 'container-yard' && (
                    <>
                      <li>• Shipping companies</li>
                      <li>• Logistics providers</li>
                      <li>• Import/Export firms</li>
                      <li>• Container depot</li>
                    </>
                  )}
                  {selectedType === 'event-space' && (
                    <>
                      <li>• Exhibitions</li>
                      <li>• Corporate events</li>
                      <li>• Trade shows</li>
                      <li>• Outdoor markets</li>
                    </>
                  )}
                  {selectedType === 'truck-parking' && (
                    <>
                      <li>• Transport companies</li>
                      <li>• Fleet operators</li>
                      <li>• Logistics firms</li>
                      <li>• Commercial vehicles</li>
                    </>
                  )}
                  {selectedType === 'fenced-land' && (
                    <>
                      <li>• Storage yards</li>
                      <li>• Equipment yards</li>
                      <li>• Vehicle storage</li>
                      <li>• Temporary setups</li>
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

export default CoveredOpenSpaceType;