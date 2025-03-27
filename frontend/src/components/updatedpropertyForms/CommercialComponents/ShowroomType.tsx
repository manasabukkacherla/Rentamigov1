import { useState } from 'react';
import { ArrowRight, Store, Car, Tv, Crown } from 'lucide-react';

interface ShowroomTypeProps {
  onShowroomTypeChange?: (types: string[]) => void;
}

const ShowroomType = ({ onShowroomTypeChange }: ShowroomTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type) 
        ? prev.filter((t) => t !== type) 
        : [...prev, type];
      onShowroomTypeChange?.(updatedTypes);
      return updatedTypes;
    });
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
          
          <div className="space-y-2">
            {showroomTypes.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedTypes.includes(value)}
                  onChange={() => handleTypeChange(value)}
                  className="w-4 h-4 text-blue-500 bg-transparent border border-white/20 rounded focus:ring-2 focus:ring-white transition"
                />
                <span className="text-white">{label}</span>
              </label>
            ))}
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default ShowroomType;
