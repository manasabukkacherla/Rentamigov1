import { useState } from 'react';
import { ArrowRight, Store, Car, Tv, Crown } from 'lucide-react';

interface ShowroomTypeProps {
  onShowroomTypeChange?: (type: string) => void;
}

const ShowroomType = ({ onShowroomTypeChange }: ShowroomTypeProps) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onShowroomTypeChange?.(type);
  };

  const showroomTypes = [
    { value: 'ground-floor', label: 'Ground Floor Showroom' },
    { value: 'upper-floor', label: 'Upper Floor Showroom' },
    { value: 'car', label: 'Car Showroom' },
    { value: 'electronic', label: 'Electronic Goods Showroom' },
    { value: 'luxury', label: 'Luxury Showroom' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'car':
        return <Car size={20} className="text-white/60" />;
      case 'electronic':
        return <Tv size={20} className="text-white/60" />;
      case 'luxury':
        return <Crown size={20} className="text-white/60" />;
      default:
        return <Store size={20} className="text-white/60" />;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Showroom Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Showroom Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Store size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Showroom Type</h4>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select a showroom type</option>
            {showroomTypes.map(({ value, label }) => (
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
                {selectedType === 'ground-floor' && 'Prime location showroom with maximum visibility and easy access for customers.'}
                {selectedType === 'upper-floor' && 'Cost-effective showroom space with potential for larger display areas.'}
                {selectedType === 'car' && 'Specialized showroom designed for vehicle display with proper lighting and space planning.'}
                {selectedType === 'electronic' && 'Modern showroom setup for electronic goods with necessary power infrastructure.'}
                {selectedType === 'luxury' && 'High-end showroom space with premium finishes and enhanced security features.'}
              </p>
            </div>
          )}

          {selectedType && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Key Features</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'ground-floor' && (
                    <>
                      <li>• Street-level visibility</li>
                      <li>• Easy loading/unloading</li>
                      <li>• High foot traffic exposure</li>
                      <li>• Direct customer access</li>
                    </>
                  )}
                  {selectedType === 'upper-floor' && (
                    <>
                      <li>• Larger space options</li>
                      <li>• Cost-effective</li>
                      <li>• Elevator access</li>
                      <li>• Flexible layout options</li>
                    </>
                  )}
                  {selectedType === 'car' && (
                    <>
                      <li>• Large display windows</li>
                      <li>• High ceilings</li>
                      <li>• Vehicle access ramps</li>
                      <li>• Test drive facility</li>
                    </>
                  )}
                  {selectedType === 'electronic' && (
                    <>
                      <li>• Enhanced power backup</li>
                      <li>• Display lighting setup</li>
                      <li>• Demo zones</li>
                      <li>• Service center provision</li>
                    </>
                  )}
                  {selectedType === 'luxury' && (
                    <>
                      <li>• Premium interiors</li>
                      <li>• Enhanced security</li>
                      <li>• Private viewing areas</li>
                      <li>• VIP parking</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Ideal For</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'ground-floor' && (
                    <>
                      <li>• Retail brands</li>
                      <li>• Fashion outlets</li>
                      <li>• Furniture displays</li>
                      <li>• Multi-brand stores</li>
                    </>
                  )}
                  {selectedType === 'upper-floor' && (
                    <>
                      <li>• Wholesale showrooms</li>
                      <li>• Furniture galleries</li>
                      <li>• Appliance centers</li>
                      <li>• Fashion studios</li>
                    </>
                  )}
                  {selectedType === 'car' && (
                    <>
                      <li>• Automobile dealerships</li>
                      <li>• Bike showrooms</li>
                      <li>• Vintage car displays</li>
                      <li>• Auto accessories</li>
                    </>
                  )}
                  {selectedType === 'electronic' && (
                    <>
                      <li>• Electronics retailers</li>
                      <li>• Home appliance brands</li>
                      <li>• Mobile phone stores</li>
                      <li>• Computer showrooms</li>
                    </>
                  )}
                  {selectedType === 'luxury' && (
                    <>
                      <li>• High-end fashion</li>
                      <li>• Jewelry stores</li>
                      <li>• Watch boutiques</li>
                      <li>• Art galleries</li>
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

export default ShowroomType;