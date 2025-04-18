import { useState } from 'react';
import { Store } from 'lucide-react';
import NextButton from './NextButton';

interface ShowroomTypeProps {
  onTypeChange?: (type: string) => void;
  onShowroomTypeChange?: (type: string[]) => void;
  onNext?: () => void;
}

const showroomTypes = [
  'Mall',
  'High Street',
  'Commercial Complex',
  'Shopping Center',
  'Standalone Building',
  'Other'
];

const ShowroomType = ({ onTypeChange, onShowroomTypeChange, onNext = () => { } }: ShowroomTypeProps) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onTypeChange?.(type);
    onShowroomTypeChange?.([type]);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Store className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Showroom Type</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Store size={20} className="text-black/60" />
            <h4 className="text-lg font-medium text-black">Select Showroom Type</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {showroomTypes.map((type) => (
              <label key={type} className="relative flex items-center justify-between p-4 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-black transition-colors">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="showroomType"
                    value={type}
                    checked={selectedType === type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-3 text-black">{type}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* <NextButton onClick={onNext} disabled={!selectedType} /> */}
    </div>
  );
};

export default ShowroomType;
