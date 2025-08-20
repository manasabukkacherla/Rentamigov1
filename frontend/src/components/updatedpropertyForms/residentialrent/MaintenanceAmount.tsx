"use client"

import { useState } from "react"
import { ArrowRight, IndianRupee, Wrench } from "lucide-react"

interface MaintenanceAmountProps {
  maintenanceAmount: {
    amount: number;
    frequency: string;
  }
  onMaintenanceAmountChange?: (maintenance: {amount: number, frequency: string}) => void
}

const MaintenanceAmount = ({ maintenanceAmount, onMaintenanceAmountChange }: MaintenanceAmountProps) => {
  const [maintenance, setMaintenance] = useState(maintenanceAmount);

  const handleChange = (field: string, value: any) => {
    const updatedMaintenance = { ...maintenance, [field]: value }
    setMaintenance(updatedMaintenance)
    onMaintenanceAmountChange?.(updatedMaintenance)
  }

  return (
    <div className="bg-gray-100 p-6 rounded-2xl [forced-colors:active] border border-transparent">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold text-black [forced-colors:active]:text-[CanvasText]">Maintenance Amount</h3>
        <ArrowRight className="text-black [forced-colors:active]:text-[CanvasText]" size={20} />
        <span className="text-sm text-gray-500 [forced-colors:active]:text-[CanvasText]">Enter Maintenance Details</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6 [forced-colors:active] border border-transparent">
          <div className="flex items-center gap-2">
            <Wrench className="text-black [forced-colors:active]:text-[CanvasText]" size={24} />
            <h4 className="text-lg font-medium text-gray-800 [forced-colors:active]:text-[CanvasText]">Maintenance Details</h4>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <IndianRupee size={20} className="text-gray-400 [forced-colors:active]:text-[CanvasText]" />
              </div>
              <input
                type="number"
                min="0"
                value={maintenance.amount || ''}
                onChange={(e) => handleChange("amount", parseFloat(e.target.value))}
                placeholder="Enter maintenance amount"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-black outline-none transition-colors duration-200 text-gray-800 placeholder:text-gray-400 hover:border-gray-300 [forced-colors:active]:border-[ButtonText] [forced-colors:active]:text-[CanvasText] [forced-colors:active]:bg-[Canvas]"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 [forced-colors:active]:text-[CanvasText]">Frequency</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["monthly", "quarterly", "half-yearly", "yearly"].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => handleChange("frequency", freq)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                      maintenance.frequency === freq
                        ? "bg-gray-100 border-black text-black [forced-colors:active]:bg-[Highlight] [forced-colors:active]:border-[Highlight] [forced-colors:active]:text-[HighlightText]"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 [forced-colors:active]:bg-[Canvas] [forced-colors:active]:border-[ButtonText] [forced-colors:active]:text-[CanvasText]"
                    }`}
                  >
                    <span className="capitalize">{freq}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceAmount