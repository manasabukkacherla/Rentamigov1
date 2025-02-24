import { useState } from 'react';
import { ArrowRight, IndianRupee } from 'lucide-react';

interface MaintenanceAmountProps {
  onMaintenanceAmountChange?: (maintenance: Record<string, any>) => void;
}

const MaintenanceAmount = ({ onMaintenanceAmountChange }: MaintenanceAmountProps) => {
  const [maintenanceAmount, setMaintenanceAmount] = useState({
    amount: ''
  });

  const handleChange = (value: string) => {
    const updatedMaintenance = { amount: value };
    setMaintenanceAmount(updatedMaintenance);
    onMaintenanceAmountChange?.(updatedMaintenance);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Maintenance Amount</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Monthly Maintenance</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <IndianRupee size={20} className="text-white/40" />
            </div>
            <input
              type="number"
              min="0"
              value={maintenanceAmount.amount}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Enter maintenance amount"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceAmount;