import { useState } from 'react';
import { ArrowRight, Ruler, Building2, Warehouse, Shield, Users, Clock, Truck } from 'lucide-react';

interface WarehouseDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const WarehouseDetails = ({ onDetailsChange }: WarehouseDetailsProps) => {
  const [details, setDetails] = useState({
    totalArea: 0,
    ceilingHeight: 0,
    docks: {
      count: 0,
      height: 0
    },
    floorLoadCapacity: 0,
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

  const handleDockChange = (field: string, value: number) => {
    const updatedDocks = { ...details.docks, [field]: value };
    handleChange('docks', updatedDocks);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Warehouse className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Warehouse Details</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          {/* Dimensions */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <Ruler size={20} className="text-black/60" />
              Warehouse Dimensions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={details.totalArea || ''}
                  onChange={(e) => handleChange('totalArea', parseFloat(e.target.value))}
                  placeholder="Total Area (Sq Ft)"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={details.ceilingHeight || ''}
                  onChange={(e) => handleChange('ceilingHeight', parseFloat(e.target.value))}
                  placeholder="Ceiling Height (Feet)"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>
          </div>

          {/* Loading Docks */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <Truck size={20} className="text-black/60" />
              Loading Docks
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={details.docks.count || ''}
                  onChange={(e) => handleDockChange('count', parseInt(e.target.value))}
                  placeholder="Number of Docks"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={details.docks.height || ''}
                  onChange={(e) => handleDockChange('height', parseInt(e.target.value))}
                  placeholder="Dock Height (Feet)" 
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>
          </div>

          {/* Floor Load Capacity */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <Building2 size={20} className="text-black/60" />
              Floor Load Capacity
            </h4>
            <input
              type="number"
              min="0"
              value={details.floorLoadCapacity || ''}
              onChange={(e) => handleChange('floorLoadCapacity', parseFloat(e.target.value))}
              placeholder="Floor Load Capacity (Tons/Sq Ft)"
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
          </div>

          {/* Safety and Security */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <Shield size={20} className="text-black/60" />
              Safety and Security
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={details.fireSafety}
                    onChange={(e) => handleChange('fireSafety', e.target.checked)}
                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="text-black">Fire Safety System</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={details.securityPersonnel}
                    onChange={(e) => handleChange('securityPersonnel', e.target.checked)}
                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="text-black">Security Personnel</span>
                </label>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-black flex items-center gap-2">
              <Clock size={20} className="text-black/60" />
              Additional Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={details.access24x7}
                    onChange={(e) => handleChange('access24x7', e.target.checked)}
                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="text-black">24/7 Access</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={details.truckParking}
                    onChange={(e) => handleChange('truckParking', e.target.checked)}
                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="text-black">Truck Parking Available</span>
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