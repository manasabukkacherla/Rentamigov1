import { useState } from 'react';
import { ArrowRight, Ruler, Building2, Compass, Sofa, Zap, Droplets, Shield, Clock } from 'lucide-react';

interface CommercialPropertyDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const CommercialPropertyDetails = ({ onDetailsChange }: CommercialPropertyDetailsProps) => {
  const [details, setDetails] = useState({
    totalArea: '',
    builtUpArea: '',
    carpetArea: '',
    floorNumber: '',
    totalFloors: '',
    facingDirection: '',
    furnishingStatus: '',
    propertyAmenities: {
      privateWashrooms: false,
      commonWashrooms: false,
      pantryCafeteria: false,
      passengerLift: false,
      freightLift: false,
      generator: false,
      inverter: false,
      solar: false,
      cctv: false,
      securityGuards: false,
      gatedAccess: false,
      fireExtinguishers: false,
      sprinklerSystem: false,
      emergencyExits: false,
      coveredParking: false,
      openParking: false,
      parkingSlots: '',
      receptionArea: false,
      conferenceRooms: false,
      centralizedAC: false,
      splitAC: false,
      wifi: false,
      serverRoom: false,
      naturalLighting: false
    },
    wholeSpaceAmenities: {
      commonAreaMaintenance: false,
      landscaping: false,
      waterSupply: false,
      wasteManagement: false,
      businessLounge: false,
      fitnessArea: false,
      visitorParking: false,
      emergencyServices: false,
      wheelchairRamps: false,
      elevators: false,
      handrails: false,
      signageBranding: false,
      cafeteriaAccess: false
    },
    electricitySupply: {
      powerLoad: '',
      backup: false
    },
    waterAvailability: '',
    fireExit: false,
    propertyAge: '',
    propertyCondition: ''
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  const handleAmenityChange = (category: 'propertyAmenities' | 'wholeSpaceAmenities', amenity: string, value: boolean) => {
    const updatedDetails = {
      ...details,
      [category]: {
        ...details[category],
        [amenity]: value
      }
    };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Property Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Property Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Area Details */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Ruler size={20} className="text-white/60" />
            Area Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="number"
                value={details.totalArea}
                onChange={(e) => handleChange('totalArea', e.target.value)}
                placeholder="Total Area (Sq Ft)"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                value={details.builtUpArea}
                onChange={(e) => handleChange('builtUpArea', e.target.value)}
                placeholder="Built-up Area (Sq Ft)"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                value={details.carpetArea}
                onChange={(e) => handleChange('carpetArea', e.target.value)}
                placeholder="Carpet Area (Sq Ft)"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </div>

        {/* Floor Details */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Building2 size={20} className="text-white/60" />
            Floor Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="number"
                value={details.floorNumber}
                onChange={(e) => handleChange('floorNumber', e.target.value)}
                placeholder="Floor Number"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                value={details.totalFloors}
                onChange={(e) => handleChange('totalFloors', e.target.value)}
                placeholder="Total Floors in Building"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </div>

        {/* Direction and Furnishing */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Compass size={20} className="text-white/60" />
                Facing Direction
              </h4>
              <select
                value={details.facingDirection}
                onChange={(e) => handleChange('facingDirection', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Direction</option>
                <option value="north" className="bg-black">North</option>
                <option value="south" className="bg-black">South</option>
                <option value="east" className="bg-black">East</option>
                <option value="west" className="bg-black">West</option>
                <option value="northeast" className="bg-black">North East</option>
                <option value="northwest" className="bg-black">North West</option>
                <option value="southeast" className="bg-black">South East</option>
                <option value="southwest" className="bg-black">South West</option>
              </select>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Sofa size={20} className="text-white/60" />
                Furnishing Status
              </h4>
              <select
                value={details.furnishingStatus}
                onChange={(e) => handleChange('furnishingStatus', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Status</option>
                <option value="unfurnished" className="bg-black">Unfurnished</option>
                <option value="semifurnished" className="bg-black">Semi-furnished</option>
                <option value="fullyfurnished" className="bg-black">Fully Furnished</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Amenities */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium">Property Amenities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries({
              privateWashrooms: 'Private Washrooms',
              commonWashrooms: 'Common Washrooms',
              pantryCafeteria: 'Pantry/Cafeteria',
              passengerLift: 'Passenger Lift',
              freightLift: 'Freight Lift',
              generator: 'Generator Backup',
              inverter: 'Inverter Backup',
              solar: 'Solar Power',
              cctv: 'CCTV Surveillance',
              securityGuards: 'Security Guards',
              gatedAccess: 'Gated Access',
              fireExtinguishers: 'Fire Extinguishers',
              sprinklerSystem: 'Sprinkler System',
              emergencyExits: 'Emergency Exits',
              coveredParking: 'Covered Parking',
              openParking: 'Open Parking',
              receptionArea: 'Reception Area',
              conferenceRooms: 'Conference Rooms',
              centralizedAC: 'Centralized AC',
              splitAC: 'Split AC',
              wifi: 'WiFi & Internet',
              serverRoom: 'Server Room',
              naturalLighting: 'Natural Lighting'
            }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={details.propertyAmenities[key as keyof typeof details.propertyAmenities] || false}
                  onChange={(e) => handleAmenityChange('propertyAmenities', key, e.target.checked)}
                  className="rounded border-white/20 bg-transparent focus:ring-white text-white"
                />
                <span className="text-white/80">{label}</span>
              </label>
            ))}
          </div>

          {/* Parking Slots */}
          {(details.propertyAmenities.coveredParking || details.propertyAmenities.openParking) && (
            <div className="mt-4">
              <input
                type="number"
                value={details.propertyAmenities.parkingSlots}
                onChange={(e) => handleAmenityChange('propertyAmenities', 'parkingSlots', e.target.value)}
                placeholder="Number of Parking Slots"
                className="w-full sm:w-1/2 px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          )}
        </div>

        {/* Whole Space Amenities */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium">Whole Space Amenities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries({
              commonAreaMaintenance: 'Common Area Maintenance',
              landscaping: 'Landscaping & Green Spaces',
              waterSupply: '24/7 Water Supply',
              wasteManagement: 'Waste Management',
              businessLounge: 'Business Lounge',
              fitnessArea: 'Fitness Area',
              visitorParking: 'Visitor Parking',
              emergencyServices: 'Emergency Services',
              wheelchairRamps: 'Wheelchair Ramps',
              elevators: 'Elevators',
              handrails: 'Handrails',
              signageBranding: 'Signage & Branding',
              cafeteriaAccess: 'Cafeteria Access'
            }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={details.wholeSpaceAmenities[key as keyof typeof details.wholeSpaceAmenities] || false}
                  onChange={(e) => handleAmenityChange('wholeSpaceAmenities', key, e.target.checked)}
                  className="rounded border-white/20 bg-transparent focus:ring-white text-white"
                />
                <span className="text-white/80">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Utilities */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Electricity Supply */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Zap size={20} className="text-white/60" />
                Electricity Supply
              </h4>
              <div className="space-y-4">
                <input
                  type="text"
                  value={details.electricitySupply.powerLoad}
                  onChange={(e) => handleChange('electricitySupply', { ...details.electricitySupply, powerLoad: e.target.value })}
                  placeholder="Power Load (KW)"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={details.electricitySupply.backup}
                    onChange={(e) => handleChange('electricitySupply', { ...details.electricitySupply, backup: e.target.checked })}
                    className="rounded border-white/20 bg-transparent focus:ring-white text-white"
                  />
                  <span className="text-white/80">Power Backup Available</span>
                </label>
              </div>
            </div>

            {/* Water Availability */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Droplets size={20} className="text-white/60" />
                Water Availability
              </h4>
              <select
                value={details.waterAvailability}
                onChange={(e) => handleChange('waterAvailability', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Availability</option>
                <option value="24/7" className="bg-black">24/7 Supply</option>
                <option value="limited" className="bg-black">Limited Supply</option>
                <option value="none" className="bg-black">No Supply</option>
              </select>
            </div>
          </div>
        </div>

        {/* Safety and Property Condition */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Fire Exit */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Shield size={20} className="text-white/60" />
                Fire Exit
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.fireExit}
                    onChange={() => handleChange('fireExit', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.fireExit}
                    onChange={() => handleChange('fireExit', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">No</span>
                </label>
              </div>
            </div>

            {/* Property Age */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Clock size={20} className="text-white/60" />
                Property Age
              </h4>
              <select
                value={details.propertyAge}
                onChange={(e) => handleChange('propertyAge', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Age</option>
                <option value="new" className="bg-black">New</option>
                <option value="1-5" className="bg-black">1-5 Years</option>
                <option value="5-10" className="bg-black">5-10 Years</option>
                <option value="10+" className="bg-black">10+ Years</option>
              </select>
            </div>

            {/* Property Condition */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Building2 size={20} className="text-white/60" />
                Property Condition
              </h4>
              <select
                value={details.propertyCondition}
                onChange={(e) => handleChange('propertyCondition', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Condition</option>
                <option value="excellent" className="bg-black">Excellent</option>
                <option value="good" className="bg-black">Good</option>
                <option value="needsRenovation" className="bg-black">Needs Renovation</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialPropertyDetails;