import { useState } from 'react';
import { ArrowRight, Warehouse, ArrowUpDown, Wind, Zap, Shield, PenTool as Tool } from 'lucide-react';

interface ShedDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const ShedDetails = ({ onDetailsChange }: ShedDetailsProps) => {
  const [details, setDetails] = useState({
    shedType: '',
    ceilingHeight: '',
    ventilation: false,
    electricity: false,
    securityRoom: false,
    fireSafety: false,
    machinery: {
      installed: false,
      details: ''
    }
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  const handleMachineryChange = (field: string, value: any) => {
    const updatedMachinery = { ...details.machinery, [field]: value };
    handleChange('machinery', updatedMachinery);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Shed Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Shed Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Shed Type and Height */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Shed Type */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Warehouse size={20} className="text-white/60" />
                Shed Type
              </h4>
              <select
                value={details.shedType}
                onChange={(e) => handleChange('shedType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
              >
                <option value="" disabled className="bg-black">Select Shed Type</option>
                <option value="industrial" className="bg-black">Industrial</option>
                <option value="commercial" className="bg-black">Commercial</option>
                <option value="open" className="bg-black">Open</option>
              </select>
            </div>

            {/* Ceiling Height */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <ArrowUpDown size={20} className="text-white/60" />
                Ceiling Height
              </h4>
              <input
                type="number"
                min="0"
                value={details.ceilingHeight}
                onChange={(e) => handleChange('ceilingHeight', e.target.value)}
                placeholder="Height in feet"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </div>

        {/* Utilities */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Ventilation */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Wind size={20} className="text-white/60" />
                Ventilation System
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.ventilation}
                    onChange={() => handleChange('ventilation', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.ventilation}
                    onChange={() => handleChange('ventilation', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Electricity */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Zap size={20} className="text-white/60" />
                Electricity Connection
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.electricity}
                    onChange={() => handleChange('electricity', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.electricity}
                    onChange={() => handleChange('electricity', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security and Safety */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Security Room */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Shield size={20} className="text-white/60" />
                Security Room
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.securityRoom}
                    onChange={() => handleChange('securityRoom', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.securityRoom}
                    onChange={() => handleChange('securityRoom', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Fire Safety */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Shield size={20} className="text-white/60" />
                Fire Safety Measures
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
          </div>
        </div>

        {/* Machinery */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Tool size={20} className="text-white/60" />
            Machinery Installation
          </h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={details.machinery.installed}
                  onChange={() => handleMachineryChange('installed', true)}
                  className="text-white border-white/20 bg-transparent focus:ring-white"
                />
                <span className="text-white/80">Installed</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!details.machinery.installed}
                  onChange={() => handleMachineryChange('installed', false)}
                  className="text-white border-white/20 bg-transparent focus:ring-white"
                />
                <span className="text-white/80">Not Installed</span>
              </label>
            </div>
            {details.machinery.installed && (
              <input
                type="text"
                value={details.machinery.details}
                onChange={(e) => handleMachineryChange('details', e.target.value)}
                placeholder="Specify machinery details"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShedDetails;