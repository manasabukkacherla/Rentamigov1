import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface DetailsProps {
  onDetailsChange: (details: any) => void;
}

const PlotDetails: React.FC<DetailsProps> = ({ onDetailsChange }) => {
  const [details, setDetails] = useState({
    totalPlotArea: 0,
    zoningType: 'commercial',
    infrastructure: [] as string[],
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

  const handleInfrastructureChange = (item: string) => {
    let updatedInfrastructure = [...details.infrastructure];
    
    if (updatedInfrastructure.includes(item)) {
      updatedInfrastructure = updatedInfrastructure.filter(i => i !== item);
    } else {
      updatedInfrastructure.push(item);
    }
    
    handleChange('infrastructure', updatedInfrastructure);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h4 className="text-lg font-medium text-black mb-4">Plot Details <span className="text-red-500">*</span></h4>
      
      {/* Plot Area */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 gap-3">
          <label className="block text-md font-medium mb-2 text-black">Total Plot Area (sq. ft) <span className="text-red-500">*</span></label>
          <input
            type="number"
            value={details.totalPlotArea}
            onChange={(e) => handleChange('totalPlotArea', Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
            required
          />
          {details.totalPlotArea <= 0 && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>
      </div>
      
      {/* Built-up Area & Carpet Area */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-md font-medium mb-2 text-black">Built-up Area (sq. ft) <span className="text-red-500">*</span></label>
          <input
            type="number"
            value={details.builtUpArea}
            onChange={(e) => handleChange('builtUpArea', Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
            required
          />
        </div>
        <div>
          <label className="block text-md font-medium mb-2 text-black">Carpet Area (sq. ft) <span className="text-red-500">*</span></label>
          <input
            type="number"
            value={details.carpetArea}
            onChange={(e) => handleChange('carpetArea', Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
            required
          />
        </div>
      </div>
      
      {/* Zoning Type */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <label className="block text-md font-medium mb-2 text-black">Zoning Type <span className="text-red-500">*</span></label>
        <select
          value={details.zoningType}
          onChange={(e) => handleChange('zoningType', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
          required
        >
          <option value="commercial" className="text-black bg-white">Commercial</option>
          <option value="residential" className="text-black bg-white">Residential</option>
          <option value="industrial" className="text-black bg-white">Industrial</option>
          <option value="mixed" className="text-black bg-white">Mixed Use</option>
        </select>
      </div>
      
      {/* Infrastructure */}
      <div className="mb-6">
        <label className="block text-md font-medium mb-3 text-black">Infrastructure Available <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 gap-3">
          {['Water Connection', 'Electricity Connection', 'Sewage System', 'Drainage System', 
            'Street Lights', 'Boundary Wall', 'Security Gate', 'Paved Roads'].map((item) => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                id={item.replace(/\s+/g, '-').toLowerCase()}
                checked={details.infrastructure.includes(item)}
                onChange={() => handleInfrastructureChange(item)}
                className="h-5 w-5 rounded border-gray-300 text-black focus:ring-0 cursor-pointer"
              />
              <label 
                htmlFor={item.replace(/\s+/g, '-').toLowerCase()} 
                className="ml-2 text-sm font-medium text-black cursor-pointer"
              >
                {item}
              </label>
            </div>
          ))}
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