import { useState } from 'react';
import { ArrowRight, CheckSquare } from 'lucide-react';

interface FlatAmenitiesProps {
  onAmenitiesChange?: (amenities: Record<string, number | boolean>) => void;
}

const FlatAmenities = ({ onAmenitiesChange }: FlatAmenitiesProps) => {
  const [amenities, setAmenities] = useState<Record<string, number | boolean>>({
    lights: 0,
    ceilingFan: 0,
    geysers: 0,
    chimney: false,
    callingBell: false,
    wardrobes: 0,
    lofts: 0,
    kitchenCabinets: 0,
    clothHanger: 0,
    pipedGasConnection: false,
    gasStoveWithCylinder: false,
    ironingStand: false,
    bathtub: false,
    shower: false,
    sofa: false,
    coffeeTable: false,
    tvUnit: false,
    diningTableWithChairs: 0,
    cotWithMattress: 0,
    sideTable: 0,
    studyTableWithChair: 0,
    television: false,
    refrigerator: false,
    washingMachine: false,
    dishwasher: false,
    waterPurifier: false,
    microwaveOven: false,
    inductionCooktop: false,
    gasStove: false,
    airConditioner: 0,
    desertCooler: 0,
    ironBox: false,
    exhaustFan: 0,
  });

  const handleNumberChange = (key: string, value: string) => {
    const newValue = value === '' ? 0 : parseInt(value, 10);
    setAmenities(prev => ({ ...prev, [key]: newValue }));
    onAmenitiesChange?.({ ...amenities, [key]: newValue });
  };

  const handleBooleanChange = (key: string, value: boolean) => {
    setAmenities(prev => ({ ...prev, [key]: value }));
    onAmenitiesChange?.({ ...amenities, [key]: value });
  };

  const numberInputs = [
    { key: 'lights', label: 'Lights' },
    { key: 'ceilingFan', label: 'Ceiling Fan (With/Without Remote)' },
    { key: 'geysers', label: 'Geysers' },
    { key: 'wardrobes', label: 'Wardrobes' },
    { key: 'lofts', label: 'Lofts' },
    { key: 'kitchenCabinets', label: 'Kitchen Cabinets' },
    { key: 'clothHanger', label: 'Cloth Hanger' },
    { key: 'diningTableWithChairs', label: 'Dining Table with Chairs (4/6)' },
    { key: 'cotWithMattress', label: 'Cot with Mattress (No.s)' },
    { key: 'sideTable', label: 'Side Table' },
    { key: 'airConditioner', label: 'Air Conditioner' },
    { key: 'desertCooler', label: 'Desert Cooler' },
    { key: 'exhaustFan', label: 'Exhaust Fan (No.s)' },
  ];

  const booleanInputs = [
    { key: 'chimney', label: 'Chimney' },
    { key: 'callingBell', label: 'Calling Bell' },
    { key: 'pipedGasConnection', label: 'Piped Gas Connection' },
    { key: 'gasStoveWithCylinder', label: 'Gas Stove with Cylinder' },
    { key: 'ironingStand', label: 'Ironing Stand' },
    { key: 'bathtub', label: 'Bathtub' },
    { key: 'shower', label: 'Shower' },
    { key: 'sofa', label: 'Sofa' },
    { key: 'coffeeTable', label: 'Coffee Table' },
    { key: 'tvUnit', label: 'TV Unit' },
    { key: 'studyTableWithChair', label: 'Study Table with Chair' },
    { key: 'television', label: 'Television' },
    { key: 'refrigerator', label: 'Refrigerator' },
    { key: 'washingMachine', label: 'Washing Machine' },
    { key: 'dishwasher', label: 'Dish-washer' },
    { key: 'waterPurifier', label: 'Water Purifier' },
    { key: 'microwaveOven', label: 'Microwave oven' },
    { key: 'inductionCooktop', label: 'Induction cooktop' },
    { key: 'gasStove', label: 'Gas Stove' },
    { key: 'ironBox', label: 'Iron Box' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Flat Amenities</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Available Items</span>
      </div>

      <div className="space-y-8 max-w-6xl">
        <div>
          <h4 className="text-lg font-medium mb-4">Quantity Items</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {numberInputs.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                <input
                  type="number"
                  min="0"
                  value={amenities[key] || ''}
                  onChange={(e) => handleNumberChange(key, e.target.value)}
                  className="w-16 px-3 py-2 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                />
                <label className="text-white/80 flex-1">{label}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-4">Available Items</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {booleanInputs.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg text-white/80">
                <input
                  type="checkbox"
                  checked={!!amenities[key]}
                  onChange={(e) => handleBooleanChange(key, e.target.checked)}
                  className="rounded border-white/20 bg-transparent focus:ring-white text-white"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatAmenities;