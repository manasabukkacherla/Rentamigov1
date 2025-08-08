import { useState } from 'react';
import { ArrowRight, Warehouse, ArrowUpDown, Wind, Zap, Shield, PenTool as Tool } from 'lucide-react';

interface ShedDetailsProps {
  onDetailsChange?: (details: any) => void;
}

const ShedDetails = ({ onDetailsChange }: ShedDetailsProps) => {
  const [details, setDetails] = useState({
    totalArea: '',
    carpetArea: '',
    height: '',
    entranceWidth: '',
    additionalDetails: ''
  });

  const handleChange = (field: string, value: string) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Warehouse className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Shed Details</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="totalArea" className="block text-gray-800 font-medium mb-2">
                Total Area (sq.ft)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="totalArea"
                  value={details.totalArea}
                  onChange={(e) => handleChange('totalArea', e.target.value)}
                  placeholder="Enter total area"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="carpetArea" className="block text-gray-800 font-medium mb-2">
                Carpet Area (sq.ft)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="carpetArea"
                  value={details.carpetArea}
                  onChange={(e) => handleChange('carpetArea', e.target.value)}
                  placeholder="Enter carpet area"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="height" className="block text-gray-800 font-medium mb-2">
                Height (ft)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="height"
                  value={details.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  placeholder="Enter height"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="entranceWidth" className="block text-gray-800 font-medium mb-2">
                Entrance Width (ft)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="entranceWidth"
                  value={details.entranceWidth}
                  onChange={(e) => handleChange('entranceWidth', e.target.value)}
                  placeholder="Enter entrance width"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="additionalDetails" className="block text-gray-800 font-medium mb-2">
              Additional Details
            </label>
            <textarea
              id="additionalDetails"
              value={details.additionalDetails}
              onChange={(e) => handleChange('additionalDetails', e.target.value)}
              placeholder="Enter any additional details about the shed"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShedDetails;