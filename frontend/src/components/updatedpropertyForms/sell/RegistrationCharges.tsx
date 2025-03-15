import { useState } from 'react';
import { ArrowRight, FileText } from 'lucide-react';

interface RegistrationChargesProps {
  onRegistrationChargesChange?: (charges: Record<string, any>) => void;
}

const RegistrationCharges = ({ onRegistrationChargesChange }: RegistrationChargesProps) => {
  const [charges, setCharges] = useState({
    registrationAmount: '',
    stampDutyAmount: '',
    type: 'exclusive'
  });

  const handleChange = (field: string, value: any) => {
    const updatedCharges = { ...charges, [field]: value };
    setCharges(updatedCharges);
    onRegistrationChargesChange?.(updatedCharges);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Registration and Stamp Duty Charges</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Registration Details</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          {/* Inclusive/Exclusive Selection */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <FileText size={20} className="text-white/60" />
              Charges Type
            </h4>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="chargesType"
                  value="inclusive"
                  checked={charges.type === 'inclusive'}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="text-white border-white/20 bg-transparent focus:ring-white"
                />
                <span className="text-white/80">Inclusive in Price</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="chargesType"
                  value="exclusive"
                  checked={charges.type === 'exclusive'}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="text-white border-white/20 bg-transparent focus:ring-white"
                />
                <span className="text-white/80">Exclusive of Price</span>
              </label>
            </div>
          </div>

          {charges.type === 'exclusive' && (
            <>
              {/* Registration Charges */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium flex items-center gap-2">
                  <FileText size={20} className="text-white/60" />
                  Registration Charges
                </h4>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <span className="text-white/40">₹</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={charges.registrationAmount}
                    onChange={(e) => handleChange('registrationAmount', e.target.value)}
                    placeholder="Enter registration charges"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                  />
                </div>
              </div>

              {/* Stamp Duty Charges */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium flex items-center gap-2">
                  <FileText size={20} className="text-white/60" />
                  Stamp Duty Charges
                </h4>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <span className="text-white/40">₹</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={charges.stampDutyAmount}
                    onChange={(e) => handleChange('stampDutyAmount', e.target.value)}
                    placeholder="Enter stamp duty charges"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationCharges;