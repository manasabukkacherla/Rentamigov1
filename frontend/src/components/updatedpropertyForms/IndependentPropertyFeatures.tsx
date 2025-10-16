import { useState } from 'react';
import { ArrowRight, Home, Bath, BanIcon as Balcony, Car, DoorOpen, Grid, Boxes, Calendar, Ruler, Compass, Zap, Droplets } from 'lucide-react';

interface IndependentPropertyFeaturesProps {
  propertyFeatures: {
    bedrooms: number;
    washrooms: number;
    balconies: number;
    hasParking: boolean;
    parkingDetails: {
      twoWheeler: number;
      fourWheeler: number;
    };
    extraRooms: {
      servant: boolean;
      puja: boolean;
      store: boolean;
      others: boolean;
    };
    utilityArea: string;
    furnishingStatus: string;
    flooring: string;
    facing: string;
    propertyAge: string;
    superBuiltUpAreaSqft: number;
    superBuiltUpAreaSqmt: number;
    builtUpAreaSqft: number;
    builtUpAreaSqmt: number;
    carpetAreaSqft: number;
    carpetAreaSqmt: number;
    electricityAvailability: string;
    waterAvailability: {
      borewell: boolean;
      governmentSupply: boolean;
      tankerSupply: boolean;
    };
  }
  onFeaturesChange?: (features: Record<string, any>) => void;
}

const IndependentPropertyFeatures = ({ propertyFeatures, onFeaturesChange }: IndependentPropertyFeaturesProps) => {
  const [features, setFeatures] = useState(propertyFeatures);

  const propertyAgeRanges = [
    { value: '0-5', label: '0-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10-15', label: '10-15 years' },
    { value: '15-20', label: '15-20 years' },
    { value: '20-25', label: '20-25 years' },
    { value: '25-30', label: '25-30 years' },
    { value: '30-35', label: '30-35 years' },
    { value: '35-40', label: '35-40 years' },
    { value: '40-45', label: '40-45 years' },
    { value: '45-50', label: '45-50 years' },
    { value: '50+', label: 'More than 50 years' }
  ];

  const handleChange = (field: string, value: any) => {
    const updatedFeatures = { ...features, [field]: value };
    setFeatures(updatedFeatures);
    onFeaturesChange?.(updatedFeatures);
  };

  const handleParkingChange = (field: string, value: string) => {
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

  const convertSqftToSqmt = (sqft: string) => {
    if (!sqft) return '';
    const sqftNum = parseFloat(sqft);
    return (sqftNum * 0.092903).toFixed(2);
  };

  const convertSqmtToSqft = (sqmt: string) => {
    if (!sqmt) return '';
    const sqmtNum = parseFloat(sqmt);
    return (sqmtNum * 10.7639).toFixed(2);
  };

  const handleAreaChange = (field: string, value: string, unit: 'sqft' | 'sqmt') => {
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
        <ArrowRight className="text-black/60" size={20} />
        <span className="text-sm text-black/70">Enter Property Details</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Basic Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Home size={20} className="text-black" />
            </div>
            <input
              type="number"
              min="0"
              value={features.bedrooms || ''}
              onChange={(e) => handleChange('bedrooms', parseFloat(e.target.value))}
              placeholder="No. of Bedrooms"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Bath size={20} className="text-black" />
            </div>
            <input
              type="number"
              min="0"
              value={features.washrooms || ''}
              onChange={(e) => handleChange('washrooms', parseFloat(e.target.value))}
              placeholder="No. of Washrooms"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Balcony size={20} className="text-black" />
            </div>
            <input
              type="number"
              min="0"
              value={features.balconies || ''}
              onChange={(e) => handleChange('balconies', parseFloat(e.target.value) )}
              placeholder="No. of Balconies"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
            />
          </div>
        </div>

        {/* Parking */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Car size={20} className="text-black" />
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
                <span className="text-black">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!features.hasParking}
                  onChange={() => handleChange('hasParking', false)}
                  className="text-black border-black/20 bg-white focus:ring-black"
                />
                <span className="text-black">No</span>
              </label>
            </div>

            {features.hasParking && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-black">2 Wheeler Parking</label>
                  <input
                    type="number"
                    min="0"
                    value={features.parkingDetails.twoWheeler || ''}
                    onChange={(e) => handleParkingChange('twoWheeler', e.target.value)}
                    placeholder="Number of 2 wheeler parking"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-black">4 Wheeler Parking</label>
                  <input
                    type="number"
                    min="0"
                    value={features.parkingDetails.fourWheeler || ''}
                    onChange={(e) => handleParkingChange('fourWheeler', e.target.value)}
                    placeholder="Number of 4 wheeler parking"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Extra Rooms */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <DoorOpen size={20} className="text-black" />
            Extra Rooms
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries({
              servant: 'Servant Room',
              puja: 'Puja Room',
              store: 'Store Room',
              others: 'Others'
            }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={features.extraRooms[key as keyof typeof features.extraRooms]}
                  onChange={(e) => handleExtraRoomChange(key, e.target.checked)}
                  className="rounded border-black/20 bg-white focus:ring-black text-black"
                />
                <span className="text-black">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Utility Area */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Grid size={20} className="text-black" />
            Utility Area Availability
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
              <span className="text-black">Yes</span>
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
              <span className="text-black">No</span>
            </label>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Boxes size={20} className="text-black" />
            Property Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={features.furnishingStatus}
              onChange={(e) => handleChange('furnishingStatus', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black hover:bg-black hover:text-white [&_option]:text-black [&_option]:bg-white"
            >
              <option value="" disabled>Furnishing Status</option>
              <option value="unfurnished">Unfurnished</option>
              <option value="semifurnished">Semi Furnished</option>
              <option value="partialfurnished">Partially Furnished</option>
              <option value="fullyfurnished">Fully Furnished</option>
            </select>

            <select
              value={features.flooring}
              onChange={(e) => handleChange('flooring', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black hover:bg-black hover:text-white [&_option]:text-black [&_option]:bg-white"
            >
              <option value="" disabled>Flooring Type</option>
              <option value="marble">Marble</option>
              <option value="ceramic">Ceramic</option>
              <option value="vitrified">Vitrified</option>
              <option value="wooden">Wooden</option>
              <option value="mosaic">Mosaic</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>

        {/* Property Facing */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Compass size={20} className="text-black" />
            Property Facing
          </h4>
          <select
            value={features.facing}
            onChange={(e) => handleChange('facing', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black hover:bg-black hover:text-white [&_option]:text-black [&_option]:bg-white"
          >
            <option value="" disabled>Select Facing</option>
            <option value="N">North</option>
            <option value="S">South</option>
            <option value="E">East</option>
            <option value="W">West</option>
            <option value="NE">North East</option>
            <option value="NW">North West</option>
            <option value="SE">South East</option>
            <option value="SW">South West</option>
          </select>
        </div>

        {/* Property Age */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Calendar size={20} className="text-black" />
            Property Age
          </h4>
          <select
            value={features.propertyAge}
            onChange={(e) => handleChange('propertyAge', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black hover:bg-black hover:text-white [&_option]:text-black [&_option]:bg-white"
          >
            <option value="" disabled>Select Property Age</option>
            {propertyAgeRanges.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Area Details */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Ruler size={20} className="text-black" />
            Area Details
          </h4>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-black text-sm">Super Built-up Area</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  min="0"
                  value={features.superBuiltUpAreaSqft || ''}
                    onChange={(e) => handleAreaChange('superBuiltUpArea', e.target.value, 'sqft')}
                  placeholder="Area in sq.ft"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
                />
                <input
                  type="number"
                  min="0"
                  value={features.superBuiltUpAreaSqmt || ''}
                  onChange={(e) => handleAreaChange('superBuiltUpArea', e.target.value, 'sqmt')}
                  placeholder="Area in sq.mt"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-black text-sm">Built-up Area</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  min="0"
                  value={features.builtUpAreaSqft || ''}
                  onChange={(e) => handleAreaChange('builtUpArea', e.target.value, 'sqft')}
                  placeholder="Area in sq.ft"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
                />
                <input
                  type="number"
                  min="0"
                  value={features.builtUpAreaSqmt || ''}
                  onChange={(e) => handleAreaChange('builtUpArea', e.target.value, 'sqmt')}
                  placeholder="Area in sq.mt"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-black text-sm">Carpet Area</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  min="0"
                  value={features.carpetAreaSqft || ''}
                  onChange={(e) => handleAreaChange('carpetArea', e.target.value, 'sqft')}
                  placeholder="Area in sq.ft"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
                />
                <input
                  type="number"
                  min="0"
                  value={features.carpetAreaSqmt || ''}
                  onChange={(e) => handleAreaChange('carpetArea', e.target.value, 'sqmt')}
                  placeholder="Area in sq.mt"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Utilities */}
        <div className="bg-white p-6 rounded-lg space-y-6">
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2 text-black">
              <Zap size={20} className="text-black" />
              Electricity Availability
            </h4>
            <select
              value={features.electricityAvailability}
              onChange={(e) => handleChange('electricityAvailability', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black hover:bg-black hover:text-white [&_option]:text-black [&_option]:bg-white"
            >
              <option value="" disabled>Select Availability</option>
              <option value="24hours">24 Hours Power</option>
              <option value="partial">Partial Power Cuts</option>
              <option value="no">No Power</option>
            </select>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2 text-black">
              <Droplets size={20} className="text-black" />
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
                  <span className="text-black">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndependentPropertyFeatures;