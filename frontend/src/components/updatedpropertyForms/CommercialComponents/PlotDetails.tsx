import React, { useState } from 'react';
import { Building2, Info, Ruler, Shield } from 'lucide-react';

interface DetailsProps {
  onDetailsChange: (details: any) => void;
}

const PlotDetails: React.FC<DetailsProps> = ({ onDetailsChange }) => {
  const [details, setDetails] = useState({
    totalArea: 0,
    zoningType: '',
    boundaryWall: false,
    waterSewer: false,
    electricity: false,
    roadAccess: '',
    securityRoom: false,
    previousConstruction: '',
    carpetArea: 0,
    builtUpArea: 0
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange(updatedDetails);
  };

  // const handleInfrastructureChange = (item: string) => {
  //   let updatedInfrastructure = [...details.infrastructure];
    
  //   if (updatedInfrastructure.includes(item)) {
  //     updatedInfrastructure = updatedInfrastructure.filter(i => i !== item);
  //   } else {
  //     updatedInfrastructure.push(item);
  //   }
    
  //   handleChange('infrastructure', updatedInfrastructure);
  // };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Building2 className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Plot Details</h3>
        </div>

        {/* Area and Zoning */}
        <div className="bg-white p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Total Area */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-black">
                <Ruler size={20} className="text-black" />
                Total Plot Area
              </h4>
              <input
                type="number"
                min="0"
                value={details.totalArea}
                onChange={(e) => handleChange('totalArea', parseInt(e.target.value))}
                placeholder="Area in sq.ft"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>

            {/* Zoning Type */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-black">
                <Building2 size={20} className="text-black" />
                Zoning Type
              </h4>
              <select
                value={details.zoningType}
                onChange={(e) => handleChange('zoningType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
              >
                <option value="" disabled className="text-black bg-white">Select Zoning Type</option>
                <option value="commercial" className="text-black bg-white">Commercial</option>
                <option value="industrial" className="text-black bg-white">Industrial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Infrastructure */}
        <div className="bg-white p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2 text-black">
            <Shield size={20} className="text-black" />
            Infrastructure
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={details.boundaryWall}
                  onChange={(e) => handleChange('boundaryWall', e.target.checked)}
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-black">Boundary Wall</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={details.waterSewer}
                  onChange={(e) => handleChange('waterSewer', e.target.checked)}
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-black">Water & Sewer Connection</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={details.electricity}
                  onChange={(e) => handleChange('electricity', e.target.checked)}
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-black">Electricity Connection</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Road Access */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <label className="block text-md font-medium mb-2 text-black">Road Access <span className="text-red-500">*</span></label>
        <select
          value={details.roadAccess}
          onChange={(e) => handleChange('roadAccess', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
          required
        >
          <option value="" disabled className="text-black bg-white">Select Road Access</option>
          <option value="private" className="text-black bg-white">Private Road</option>
          <option value="public" className="text-black bg-white">Public Road</option>
          <option value="highway" className="text-black bg-white">Highway Access</option>
          <option value="limited" className="text-black bg-white">Limited Access</option>
        </select>
        {!details.roadAccess && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
      </div>
      
      {/* Security Room */}
      <div className="mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="security-room"
            checked={details.securityRoom}
            onChange={(e) => handleChange('securityRoom', e.target.checked)}
            className="h-5 w-5 rounded border-gray-300 text-black focus:ring-0 cursor-pointer"
          />
          <label 
            htmlFor="security-room" 
            className="ml-2 text-sm font-medium text-black cursor-pointer"
          >
            Security Room Available
          </label>
        </div>
      </div>
      
      {/* Previous Construction */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <label className="block text-md font-medium mb-2 text-black">Previous Construction <span className="text-red-500">*</span></label>
        <select
          value={details.previousConstruction}
          onChange={(e) => handleChange('previousConstruction', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
          required
        >
          <option value="" disabled className="text-black bg-white">Select Previous Construction</option>
          <option value="none" className="text-black bg-white">None (Empty Plot)</option>
          <option value="demolished" className="text-black bg-white">Demolished</option>
          <option value="partial" className="text-black bg-white">Partial Construction</option>
          <option value="complete" className="text-black bg-white">Complete Structure</option>
        </select>
        {!details.previousConstruction && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
      </div>
      
      {/* Info Tooltip */}
      <div className="flex items-start mt-4 p-4 bg-blue-50 rounded-lg">
        <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm text-blue-700">
          Provide accurate plot details to help potential clients understand your property better. 
          All measurements should be in square feet.
        </p>
      </div>
    </div>
  );
};

export default PlotDetails;