import { useState } from 'react';
import { FileText, IndianRupee } from 'lucide-react';

interface RegistrationChargesProps {
  onRegistrationChargesChange?: (charges: Record<string, any>) => void;
}

const RegistrationCharges = ({ onRegistrationChargesChange }: RegistrationChargesProps) => {
  const [charges, setCharges] = useState({
    registrationAmount: 0,
    stampDutyAmount: 0,
    chargestype: 'exclusive'
  });

  const handleChange = (field: string, value: any) => {
    const updated = {
      ...charges,
      [field]: field === 'chargestype' ? value : parseFloat(value) || 0
    };
    setCharges(updated);
    onRegistrationChargesChange?.(updated);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <FileText className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Registration and Stamp Duty Charges</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          {/* Charges Type Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={20} className="text-black/60" />
              <h4 className="text-lg font-medium text-black">Charges Type</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative flex items-center justify-between p-4 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-black transition-colors">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="chargesType"
                    value="inclusive"
                    checked={charges.chargestype === 'inclusive'}
                    onChange={(e) => handleChange('chargestype', e.target.value)}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-3 text-black">Inclusive in Price</span>
                </div>
              </label>
              <label className="relative flex items-center justify-between p-4 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-black transition-colors">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="chargesType"
                    value="exclusive"
                    checked={charges.chargestype === 'exclusive'}
                    onChange={(e) => handleChange('chargestype', e.target.value)}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-3 text-black">Exclusive of Price</span>
                </div>
              </label>
            </div>
          </div>

          {charges.chargestype === 'exclusive' && (
            <div className="space-y-6 mt-6">
              {/* Registration Charges */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <IndianRupee size={20} className="text-black/60" />
                  <h4 className="text-lg font-medium text-black">Registration Charges</h4>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <span className="text-black/40">₹</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={charges.registrationAmount || ''}
                    onChange={(e) => handleChange('registrationAmount', e.target.value)}
                    placeholder="Enter registration charges"
                    className="w-full pl-10 pr-4 py-3.5 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                  />
                </div>
              </div>

              {/* Stamp Duty Charges */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <IndianRupee size={20} className="text-black/60" />
                  <h4 className="text-lg font-medium text-black">Stamp Duty Charges</h4>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <span className="text-black/40">₹</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={charges.stampDutyAmount || ''}
                    onChange={(e) => handleChange('stampDutyAmount', e.target.value)}
                    placeholder="Enter stamp duty charges"
                    className="w-full pl-10 pr-4 py-3.5 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationCharges;