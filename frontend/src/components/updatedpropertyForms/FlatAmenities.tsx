import { useState } from 'react';
import { ArrowRight, CheckSquare } from 'lucide-react';

interface FlatAmenitiesProps {
  amenities: {
    lights: number;
    ceilingFan: number;
    geysers: number;
    chimney: boolean;
    callingBell: boolean;
    wardrobes: number;
    lofts: number;
    kitchenCabinets: number;
    clothHanger: number;
    pipedGasConnection: boolean;
    gasStoveWithCylinder: boolean;
    ironingStand: boolean;
    bathtub: boolean;
    shower: boolean;
    sofa: boolean;
    coffeeTable: boolean;
    tvUnit: boolean;
    diningTableWithChairs: number;
    cotWithMattress: number;
    sideTable: number;
    studyTableWithChair: number;
    television: boolean;
    refrigerator: boolean;
    washingMachine: boolean;
    dishwasher: boolean;
    waterPurifier: boolean;
    microwaveOven: boolean;
    inductionCooktop: boolean;
    gasStove: boolean;
    airConditioner: number;
    desertCooler: number;
    ironBox: boolean;
    exhaustFan: number;
  }
  onAmenitiesChange?: (amenities: Record<string, number | boolean>) => void;
}

const FlatAmenities = ({ amenities, onAmenitiesChange }: FlatAmenitiesProps) => {
  const [localAmenities, setAmenities] = useState<Record<string, number | boolean>>(amenities);

  const handleNumberChange = (key: string, value: string) => {
    const newValue = value === '' ? 0 : parseInt(value, 10);
    setAmenities(prev => ({ ...prev, [key]: newValue }));
    onAmenitiesChange?.({ ...localAmenities, [key]: newValue });
  };

  const handleBooleanChange = (key: string, value: boolean) => {
    setAmenities(prev => ({ ...prev, [key]: value }));
    onAmenitiesChange?.({ ...localAmenities, [key]: value });
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
        <h3 className="text-2xl font-semibold text-black">Flat Amenities</h3>
        <ArrowRight className="text-black/60" size={20} />
        <span className="text-sm text-black/70">Select Available Items</span>
      </div>

      <div className="space-y-8 max-w-6xl">
        <div>
          <h4 className="text-lg font-medium mb-4 text-black">Quantity Items</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {numberInputs.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-black/30 hover:border-black/50 transition-colors duration-200">
                <input
                  type="number"
                  min="0"
                  value={typeof localAmenities[key] === 'number' ? localAmenities[key] : ''}
                  onChange={(e) => handleNumberChange(key, e.target.value)}
                  className="w-16 px-3 py-2 rounded-lg bg-white border border-black/30 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
                />
                <label className="text-black flex-1">{label}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-4 text-black">Available Items</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {booleanInputs.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 p-3 bg-white rounded-lg text-black border border-black/30 hover:border-black/50 transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={!!localAmenities[key]}
                  onChange={(e) => handleBooleanChange(key, e.target.checked)}
                  className="rounded border-black/30 bg-white focus:ring-black text-black"
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