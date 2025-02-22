import { useState } from 'react';
import { ArrowRight, Ruler, Building2, Warehouse, Shield, Users, Clock, Truck } from 'lucide-react';

interface WarehouseDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const WarehouseDetails = ({ onDetailsChange }: WarehouseDetailsProps) => {
  const [details, setDetails] = useState({
    totalArea: '',
    ceilingHeight: '',
    docks: {
      count: '',
      height: ''
    },
    floorLoadCapacity: '',
    fireSafety: false,
    securityPersonnel: false,
    access24x7: false,
    truckParking: false
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  const handleDockChange = (field: string, value: string) => {
    const updatedDocks = { ...details.docks, [field]: value };
    handleChange('docks', updatedDocks);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Warehouse Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Warehouse Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Dimensions */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Ruler size={20} className="text-white/60" />
            Warehouse Dimensions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="number"
                min="0"
                value={details.totalArea}
                onChange={(e) => handleChange('totalArea', e.target.value)}
                placeholder="Total Area (Sq Ft)"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={details.ceilingHeight}
                onChange={(e) => handleChange('ceilingHeight', e.target.value)}
                placeholder="Ceiling Height (Feet)"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </div>

        {/* Loading Docks */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Building2 size={20} className="text-white/60" />
            Loading Docks
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="number"
                min="0"
                value={details.docks.count}
                onChange={(e) => handleDockChange('count', e.target.value)}
                placeholder="Number of Docks/Bays"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={details.docks.height}
                onChange={(e) => handleDockChange('height', e.target.value)}
                placeholder="Dock Height (Feet)"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </div>

        {/* Floor Load */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Warehouse size={20} className="text-white/60" />
            Floor Load Capacity
          </h4>
          <input
            type="number"
            min="0"
            value={details.floorLoadCapacity}
            onChange={(e) => handleChange('floorLoadCapacity', e.target.value)}
            placeholder="Floor Load Capacity (Tons/Sq Ft)"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
          />
        </div>

        {/* Safety and Security */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fire Safety */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Shield size={20} className="text-white/60" />
                Fire Safety
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.fireSafety}
                    onChange={() => handleChange('fireSafety', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Installed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.fireSafety}
                    onChange={() => handleChange('fireSafety', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Installed</span>
                </label>
              </div>
            </div>

            {/* Security Personnel */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Users size={20} className="text-white/60" />
                Security Personnel
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.securityPersonnel}
                    onChange={() => handleChange('securityPersonnel', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.securityPersonnel}
                    onChange={() => handleChange('securityPersonnel', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* 24/7 Access */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Clock size={20} className="text-white/60" />
                24/7 Access
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.access24x7}
                    onChange={() => handleChange('access24x7', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Allowed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.access24x7}
                    onChange={() => handleChange('access24x7', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Allowed</span>
                </label>
              </div>
            </div>

            {/* Truck Parking */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Truck size={20} className="text-white/60" />
                Truck Parking & Loading Zones
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.truckParking}
                    onChange={() => handleChange('truckParking', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.truckParking}
                    onChange={() => handleChange('truckParking', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetails;