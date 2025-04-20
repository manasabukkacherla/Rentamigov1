import { useState } from 'react';
import { ArrowRight, Home, Bath, BanIcon as Balcony, Car, DoorOpen, Grid, Boxes, Building, Calendar, Ruler, Compass, Zap, Droplets } from 'lucide-react';

interface PropertyFeaturesProps {
  onFeaturesChange?: (features: Record<string, any>) => void;
}

const PropertyFeatures = ({ onFeaturesChange }: PropertyFeaturesProps) => {
  const [features, setFeatures] = useState({
    bedrooms: 0,
    washrooms: 0,
    balconies: 0,
    hasParking: false,
    parkingDetails: {
      twoWheeler: 0,
      fourWheeler: 0
    },
    extraRooms: {
      servant: false,
      puja: false,
      store: false,
      others: false
    },
    utilityArea: 'no',
    furnishingStatus: 'fullyfurnished',
    // flooring: '',
    totalFloors: 0,
    propertyOnFloor: 0,
    facing: '',
    propertyAge: '',
    superBuiltUpAreaSqft: 0,
    superBuiltUpAreaSqmt: 0,
    builtUpAreaSqft: 0,
    builtUpAreaSqmt: 0,
    carpetAreaSqft: 0,
    carpetAreaSqmt: 0,
    electricityAvailability: '',
    waterAvailability: {
      borewell: false,
      governmentSupply: false,
      tankerSupply: false
    }
  });

  const handleChange = (field: string, value: any) => {
    const updatedFeatures = { ...features, [field]: value };
    setFeatures(updatedFeatures);
    onFeaturesChange?.(updatedFeatures);
  };

  const handleParkingChange = (field: string, value: number) => {
    const updatedFeatures = {
      ...features,
      parkingDetails: {
        ...features.parkingDetails,
        [field]: value
      }
    };
    setFeatures(updatedFeatures);
    onFeaturesChange?.(updatedFeatures);
  };

  const handleExtraRoomChange = (room: string, checked: boolean) => {
    const updatedFeatures = {
      ...features,
      extraRooms: {
        ...features.extraRooms,
        [room]: checked
      }
    };
    setFeatures(updatedFeatures);
    onFeaturesChange?.(updatedFeatures);
  };

  const handleWaterAvailabilityChange = (type: string, checked: boolean) => {
    const updatedFeatures = {
      ...features,
      waterAvailability: {
        ...features.waterAvailability,
        [type]: checked
      }
    };
    setFeatures(updatedFeatures);
    onFeaturesChange?.(updatedFeatures);
  };

  const convertSqftToSqmt = (sqft: number) => {
    if (!sqft) return 0;
    const sqftNum = sqft;
    return (sqftNum * 0.092903);
  };

  const convertSqmtToSqft = (sqmt: number) => {
    if (!sqmt) return 0;
    const sqmtNum = sqmt;
    return (sqmtNum * 10.7639);
  };

  const handleAreaChange = (field: string, value: number, unit: 'sqft' | 'sqmt') => {
    if (unit === 'sqft') {
      setFeatures({
        ...features,
        [`${field}Sqft`]: value,
        [`${field}Sqmt`]: convertSqftToSqmt(value)
      });
    } else {
      setFeatures({
        ...features,
        [`${field}Sqmt`]: value,
        [`${field}Sqft`]: convertSqmtToSqft(value)
      });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold text-black">Property Features</h3>
        <ArrowRight className="opacity-40 text-black" size={20} />
        <span className="text-sm opacity-70 text-black">Enter Property Details</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Basic Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Home size={20} className="text-black/40" />
            </div>
            <input
              type="number"
              min="0"
              value={features.bedrooms || ''}
              onChange={(e) => handleChange('bedrooms', parseInt(e.target.value))}
              placeholder="No. of Bedrooms"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Bath size={20} className="text-black/40" />
            </div>
            <input
              type="number"
              min="0"
              value={features.washrooms || ''}
              onChange={(e) => handleChange('washrooms', parseInt(e.target.value))}
              placeholder="No. of Washrooms"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Balcony size={20} className="text-black/40" />
            </div>
            <input
              type="number"
              min="0"
              value={features.balconies || '' }
              onChange={(e) => handleChange('balconies', parseInt(e.target.value))}
              placeholder="No. of Balconies"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
          </div>
        </div>

        {/* Parking */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Car size={20} className="text-black/60" />
            Parking Details
          </h4>
          <div className="space-y-6">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={features.hasParking}
                  onChange={() => handleChange('hasParking', true)}
                  className="text-black border-black/20 bg-white focus:ring-black"
                />
                <span className="text-black/80">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!features.hasParking}
                  onChange={() => handleChange('hasParking', false)}
                  className="text-black border-black/20 bg-white focus:ring-black"
                />
                <span className="text-black/80">No</span>
              </label>
            </div>

            {features.hasParking && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-black/80">2 Wheeler Parking</label>
                  <input
                    type="number"
                    min="0"
                    value={features.parkingDetails.twoWheeler}
                    onChange={(e) => handleParkingChange('twoWheeler', parseInt(e.target.value))}
                    placeholder="No. of 2 wheeler parking"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-black/80">4 Wheeler Parking</label>
                  <input
                    type="number"
                    min="0"
                    value={features.parkingDetails.fourWheeler}
                    onChange={(e) => handleParkingChange('fourWheeler', parseInt(e.target.value))}
                    placeholder="No. of 4 wheeler parking"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Extra Rooms */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <DoorOpen size={20} className="text-black/60" />
            Extra Rooms
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={features.extraRooms.servant}
                onChange={(e) => handleExtraRoomChange('servant', e.target.checked)}
                className="rounded border-black/20 bg-white focus:ring-black text-black"
              />
              <span className="text-black/80">Servant Room</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={features.extraRooms.puja}
                onChange={(e) => handleExtraRoomChange('puja', e.target.checked)}
                className="rounded border-black/20 bg-white focus:ring-black text-black"
              />
              <span className="text-black/80">Puja Room</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={features.extraRooms.store}
                onChange={(e) => handleExtraRoomChange('store', e.target.checked)}
                className="rounded border-black/20 bg-white focus:ring-black text-black"
              />
              <span className="text-black/80">Store Room</span>
            </label>
            <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                checked={features.extraRooms.others}
                onChange={(e) => handleExtraRoomChange('others', e.target.checked)}
                className="rounded border-black/20 bg-white focus:ring-black text-black"
              />
              <span className="text-black/80">Others</span>
              </label>
          </div>
        </div>

        {/* Utility Area */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Grid size={20} className="text-black/60" />
            Utility Area
          </h4>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="utilityArea"
                value="yes"
                checked={features.utilityArea === 'yes'}
                onChange={(e) => handleChange('utilityArea', e.target.value)}
                className="text-black border-black/20 bg-white focus:ring-black"
              />
              <span className="text-black/80">Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="utilityArea"
                value="no"
                checked={features.utilityArea === 'no'}
                onChange={(e) => handleChange('utilityArea', e.target.value)}
                className="text-black border-black/20 bg-white focus:ring-black"
              />
              <span className="text-black/80">No</span>
            </label>
          </div>
        </div>

        {/* Furnishing Status */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Boxes size={20} className="text-black/60" />
            Furnishing Status
          </h4>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="furnishingStatus"
                value="unfurnished"
                checked={features.furnishingStatus === 'unfurnished'}
                onChange={(e) => handleChange('furnishingStatus', e.target.value)}
                className="text-black border-black/20 bg-white focus:ring-black"
              />
              <span className="text-black/80">Unfurnished</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="furnishingStatus"
                value="semifurnished"
                checked={features.furnishingStatus === 'semifurnished'}
                onChange={(e) => handleChange('furnishingStatus', e.target.value)}
                className="text-black border-black/20 bg-white focus:ring-black"
              />
              <span className="text-black/80">Semi-Furnished</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="furnishingStatus"
                value="fullyfurnished"
                checked={features.furnishingStatus === 'fullyfurnished'}
              onChange={(e) => handleChange('furnishingStatus', e.target.value)}
                className="text-black border-black/20 bg-white focus:ring-black"
              />
              <span className="text-black/80">Fully Furnished</span>
            </label>
          </div>
        </div>

        {/* Floor Details */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Building size={20} className="text-black/60" />
            Floor Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              min="0"
              value={features.totalFloors || ''}
              onChange={(e) => handleChange('totalFloors', parseInt(e.target.value))}
              placeholder="Total No. of Floors"
              className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
            <input
              type="number"
              min="0"
              value={features.propertyOnFloor || ''}
              onChange={(e) => handleChange('propertyOnFloor', parseInt(e.target.value))}
              placeholder="Property on Floor"
              className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
          </div>
        </div>

        {/* Property Facing */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Compass size={20} className="text-black/60" />
            Property Facing
          </h4>
          <select
            value={features.facing || ''}
            onChange={(e) => handleChange('facing', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black"
          >
            <option value="" disabled className="bg-white">Select Facing</option>
            <option value="N" className="bg-white">North</option>
            <option value="S" className="bg-white">South</option>
            <option value="E" className="bg-white">East</option>
            <option value="W" className="bg-white">West</option>
            <option value="NE" className="bg-white">North East</option>
            <option value="NW" className="bg-white">North West</option>
            <option value="SE" className="bg-white">South East</option>
            <option value="SW" className="bg-white">South West</option>
          </select>
        </div>

        {/* Property Age */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Calendar size={20} className="text-black/60" />
            Property Age
          </h4>
          <select
                value={features.propertyAge}
                onChange={(e) => handleChange('propertyAge', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="" disabled>Select Property Age</option>
                <option value="0-5" className="text-black bg-white">0-5</option>
                <option value="5-10" className="text-black bg-white">5-10</option>
                <option value="10-15" className="text-black bg-white">10-15</option>
                <option value="15+" className="text-black bg-white">15+</option>
                {/* Add other relevant options as needed */}
              </select>
        </div>

        {/* Area Details */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Ruler size={20} className="text-black/60" />
            Area Details
          </h4>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-black/80 text-sm">Super Built-up Area</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  min="0"
                  value={features.superBuiltUpAreaSqft || ''} 
                  onChange={(e) => handleAreaChange('superBuiltUpArea', parseFloat(e.target.value), 'sqft')}
                  placeholder="Area in sq.ft"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <input
                  type="number"
                  min="0"
                  value={features.superBuiltUpAreaSqmt || ''}
                  onChange={(e) => handleAreaChange('superBuiltUpArea', parseFloat(e.target.value), 'sqmt')}
                  placeholder="Area in sq.mt"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-black/80 text-sm">Built-up Area</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  min="0"
                  value={features.builtUpAreaSqft || ''}
                  onChange={(e) => handleAreaChange('builtUpArea', parseFloat(e.target.value), 'sqft')}
                  placeholder="Area in sq.ft"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <input
                  type="number"
                  min="0"
                  value={features.builtUpAreaSqmt || ''}
                  onChange={(e) => handleAreaChange('builtUpArea', parseFloat(e.target.value), 'sqmt')}
                  placeholder="Area in sq.mt"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-black/80 text-sm">Carpet Area</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  min="0"
                  value={features.carpetAreaSqft || ''}
                  onChange={(e) => handleAreaChange('carpetArea', parseFloat(e.target.value), 'sqft')}
                  placeholder="Area in sq.ft"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
                <input
                  type="number"
                  min="0"
                  value={features.carpetAreaSqmt || ''}
                  onChange={(e) => handleAreaChange('carpetArea', parseFloat(e.target.value), 'sqmt')}
                  placeholder="Area in sq.mt"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Utilities */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2 text-black">
              <Zap size={20} className="text-black/60" />
              Electricity Availability
            </h4>
            <select
              value={features.electricityAvailability}
              onChange={(e) => handleChange('electricityAvailability', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black"
            >
              <option value="" disabled className="bg-white">Select Availability</option>
              <option value="24hours" className="bg-white">24 Hours Power</option>
              <option value="partial" className="bg-white">Partial Power Cuts</option>
              <option value="no" className="bg-white">No Power</option>
            </select>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2 text-black">
              <Droplets size={20} className="text-black/60" />
              Water Availability
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: 'borewell', label: 'Borewell' },
                { key: 'governmentSupply', label: 'Government Supply' },
                { key: 'tankerSupply', label: 'Tanker Supply' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={features.waterAvailability[key as keyof typeof features.waterAvailability]}
                    onChange={(e) => handleWaterAvailabilityChange(key, e.target.checked)}
                    className="rounded border-black/20 bg-white focus:ring-black text-black"
                  />
                  <span className="text-black/80">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFeatures;