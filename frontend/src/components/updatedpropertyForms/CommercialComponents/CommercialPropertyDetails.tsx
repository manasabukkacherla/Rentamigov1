import { useState, useEffect } from 'react';
import { ArrowRight, Ruler, Building2, Compass, Sofa, Zap, Droplets, Shield, Clock } from 'lucide-react';

interface CommercialPropertyDetailsProps {
  onDetailsChange: (details: {
    area: {
      totalArea: number;
      carpetArea: number;
      builtUpArea: number;
    };
    floor: {
      floorNumber: number;
      totalFloors: number;
    };
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
      powerLoad: number | null;
      backup: boolean;
    };
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
  }) => void;
}

const CommercialPropertyDetails = ({ onDetailsChange }: CommercialPropertyDetailsProps) => {
  const [propertyDetails, setPropertyDetails] = useState({
    area: {
      totalArea: 0,
      carpetArea: 0,
      builtUpArea: 0
    },
    floor: {
      floorNumber: 0,
      totalFloors: 0
    },
    facingDirection: '',
    furnishingStatus: '',
    propertyAmenities: [] as string[],
    wholeSpaceAmenities: [] as string[],
    electricitySupply: {
      powerLoad: null as number | null,
      backup: false
    },
    waterAvailability: '',
    propertyAge: '',
    propertyCondition: 'new'
  });

  const handleChange = (field: string, value: any) => {
    setPropertyDetails(prev => {
      const newState = { ...prev };
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        const parentKey = parent as keyof typeof newState;
        const childKey = child as keyof (typeof newState)[typeof parentKey];
        (newState[parentKey] as any) = {
          ...(newState[parentKey] as any),
          [childKey]: value
        };
      } else {
        const key = field as keyof typeof newState;
        (newState[key] as any) = value;
      }
      onDetailsChange(newState);
      return newState;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const detailsToSend = {
      ...propertyDetails,
      electricitySupply: {
        powerLoad: propertyDetails.electricitySupply.powerLoad,
        backup: propertyDetails.electricitySupply.backup
      },
      waterAvailability: propertyDetails.waterAvailability,
      propertyAge: propertyDetails.propertyAge,
      propertyCondition: propertyDetails.propertyCondition
    };
    onDetailsChange(detailsToSend);
  };

  useEffect(() => {
    onDetailsChange({
      ...propertyDetails,
      electricitySupply: {
        powerLoad: null,
        backup: false
      },
      waterAvailability: '',
      propertyAge: '',
      propertyCondition: 'new'
    });
  }, []);

  const handleAmenityChange = (category: 'propertyAmenities' | 'wholeSpaceAmenities', amenity: string, isChecked: boolean) => {
    const currentAmenities = propertyDetails[category];
    let updatedAmenities: string[];

    if (isChecked) {
      updatedAmenities = [...currentAmenities, amenity];
    } else {
      updatedAmenities = currentAmenities.filter(item => item !== amenity);
    }

    const updatedDetails = {
      ...propertyDetails,
      [category]: updatedAmenities
    };

    setPropertyDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  const allPropertyAmenities = [
    'privateWashrooms',
    'commonWashrooms',
    'pantryCafeteria',
    'passengerLift',
    'freightLift',
    'generator',
    'inverter',
    'solar',
    'cctv',
    'securityGuards',
    'gatedAccess',
    'fireExtinguishers',
    'sprinklerSystem',
    'emergencyExits',
    'coveredParking',
    'openParking',
    'parkingSlots',
    'receptionArea',
    'conferenceRooms',
    'centralizedAC',
    'splitAC',
    'wifi',
    'serverRoom',
    'naturalLighting'
  ];

  const allWholeSpaceAmenities = [
    'commonAreaMaintenance',
    'landscaping',
    'waterSupply',
    'wasteManagement',
    'businessLounge',
    'fitnessArea',
    'visitorParking',
    'emergencyServices',
    'wheelchairRamps',
    'elevators',
    'handrails',
    'signageBranding',
    'cafeteriaAccess'
  ];

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Building2 className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Property Details</h3>
        </div>

        {/* Area Details */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Ruler size={20} className="text-black" />
            Area Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="number"
                value={propertyDetails.area.totalArea || ''}
                onChange={(e) => handleChange('area.totalArea', parseFloat(e.target.value) || 0)}
                placeholder="Total Area (Sq Ft)"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                value={propertyDetails.area.builtUpArea || ''}
                onChange={(e) => handleChange('area.builtUpArea', parseFloat(e.target.value) || 0)}
                placeholder="Built-up Area (Sq Ft)"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                value={propertyDetails.area.carpetArea || ''}
                onChange={(e) => handleChange('area.carpetArea', parseFloat(e.target.value) || 0)}
                placeholder="Carpet Area (Sq Ft)"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>
          </div>
        </div>

        {/* Floor Details */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Building2 size={20} className="text-black" />
            Floor Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="number"
                value={propertyDetails.floor.floorNumber || ''}
                onChange={(e) => handleChange('floor.floorNumber', parseFloat(e.target.value) || 0)}
                placeholder="Floor Number"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                value={propertyDetails.floor.totalFloors || ''}
                onChange={(e) => handleChange('floor.totalFloors', parseFloat(e.target.value) || 0)}
                placeholder="Total Floors in Building"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>
          </div>
        </div>

        {/* Direction and Furnishing */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-black">
                <Compass size={20} className="text-black" />
                Facing Direction
              </h4>
              <select
                value={propertyDetails.facingDirection}
                onChange={(e) => handleChange('facingDirection', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="" disabled className="text-black bg-white">Select Direction</option>
                <option value="north" className="text-black bg-white">North</option>
                <option value="south" className="text-black bg-white">South</option>
                <option value="east" className="text-black bg-white">East</option>
                <option value="west" className="text-black bg-white">West</option>
                <option value="northeast" className="text-black bg-white">North East</option>
                <option value="northwest" className="text-black bg-white">North West</option>
                <option value="southeast" className="text-black bg-white">South East</option>
                <option value="southwest" className="text-black bg-white">South West</option>
              </select>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-black">
                <Sofa size={20} className="text-black" />
                Furnishing Status
              </h4>
              <select
                value={propertyDetails.furnishingStatus}
                onChange={(e) => handleChange('furnishingStatus', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="" disabled className="text-black bg-white">Select Status</option>
                <option value="unfurnished" className="text-black bg-white">Unfurnished</option>
                <option value="semifurnished" className="text-black bg-white">Semi-furnished</option>
                <option value="fullyfurnished" className="text-black bg-white">Fully Furnished</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Amenities */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Shield size={20} className="text-black" />
            Property Amenities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allPropertyAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={propertyDetails.propertyAmenities.includes(amenity)}
                  onChange={(e) => handleAmenityChange('propertyAmenities', amenity, e.target.checked)}
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-black">{amenity.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Whole Space Amenities */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Building2 size={20} className="text-black" />
            Whole Space Amenities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allWholeSpaceAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={propertyDetails.wholeSpaceAmenities.includes(amenity)}
                  onChange={(e) => handleAmenityChange('wholeSpaceAmenities', amenity, e.target.checked)}
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-black">{amenity.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Electricity Supply */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Zap size={20} className="text-black" />
            Electricity Supply
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="number"
                value={propertyDetails.electricitySupply.powerLoad === null ? '' : propertyDetails.electricitySupply.powerLoad}
                onChange={(e) => handleChange('electricitySupply.powerLoad', e.target.value === '' ? null : parseFloat(e.target.value))}
                placeholder="Power Load (kW)"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyDetails.electricitySupply.backup}
                onChange={(e) => handleChange('electricitySupply.backup', e.target.checked)}
                className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="text-black">Backup Power Available</span>
            </div>
          </div>
        </div>

        {/* Water Availability */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Droplets size={20} className="text-black" />
            Water Availability
          </h4>
          <select
            value={propertyDetails.waterAvailability}
            onChange={(e) => handleChange('waterAvailability', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
          >
            <option value="" disabled>Select Availability</option>
            <option value="24x7" className="text-black bg-white">24x7</option>
            <option value="scheduled" className="text-black bg-white">Scheduled</option>
            <option value="limited" className="text-black bg-white">Limited</option>
            {/* Add other relevant options as needed */}
          </select>
        </div>

        {/* Property Age and Condition */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Clock size={20} className="text-black" />
            Property Age and Condition
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              {/* <input
                type="number"
                value={propertyDetails.propertyAge === null ? '' : propertyDetails.propertyAge}
                onChange={(e) => handleChange('propertyAge', e.target.value === '' ? null : parseFloat(e.target.value))}
                placeholder="Property Age (Years)"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              /> */}

              <select
                value={propertyDetails.propertyAge ? propertyDetails.propertyAge.toString() : ''}
                onChange={(e) => handleChange('propertyAge', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="" disabled>Select Property Age</option>
                <option value="0-5" className="text-black bg-white">0-5</option>
                <option value="5-10" className="text-black bg-white">5-10</option>
                <option value="10-15" className="text-black bg-white">10-15</option>
                <option value="15+" className="text-black bg-white">15+</option>
              </select>
            </div>
            <div className="relative">
              <select
                value={propertyDetails.propertyCondition}
                onChange={(e) => handleChange('propertyCondition', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="new">New</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="needs_renovation">Needs Renovation</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialPropertyDetails;