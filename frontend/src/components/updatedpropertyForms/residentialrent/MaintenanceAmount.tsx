"use client"

import { useState } from "react"
import { ArrowRight, IndianRupee } from "lucide-react"

interface MaintenanceAmountProps {
  onMaintenanceAmountChange?: (maintenance: Record<string, any>) => void
}

const MaintenanceAmount = ({ onMaintenanceAmountChange }: MaintenanceAmountProps) => {
  const [maintenance, setMaintenance] = useState({
    amount: "",
    frequency: "monthly",
  })

  const handleChange = (field: string, value: string) => {
    const updatedMaintenance = { ...maintenance, [field]: value }
    setMaintenance(updatedMaintenance)
    onMaintenanceAmountChange?.(updatedMaintenance)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold text-black">Maintenance Amount</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Maintenance Details</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6 transition-all duration-300 hover:shadow-md">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <IndianRupee size={20} className="text-gray-400" />
            </div>
            <input
              type="number"
              min="0"
              value={maintenance.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              placeholder="Enter maintenance amount"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-black outline-none transition-colors duration-200 text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="maintenanceFrequency"
                value="monthly"
                checked={maintenance.frequency === "monthly"}
                onChange={(e) => handleChange("frequency", e.target.value)}
                className="text-black border-gray-300 bg-white focus:ring-black"
              />
              <span className="text-gray-700">Monthly</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="maintenanceFrequency"
                value="quarterly"
                checked={maintenance.frequency === "quarterly"}
                onChange={(e) => handleChange("frequency", e.target.value)}
                className="text-black border-gray-300 bg-white focus:ring-black"
              />
              <span className="text-gray-700">Quarterly</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="maintenanceFrequency"
                value="halfYearly"
                checked={maintenance.frequency === "halfYearly"}
                onChange={(e) => handleChange("frequency", e.target.value)}
                className="text-black border-gray-300 bg-white focus:ring-black"
              />
              <span className="text-gray-700">Half-Yearly</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="maintenanceFrequency"
                value="yearly"
                checked={maintenance.frequency === "yearly"}
                onChange={(e) => handleChange("frequency", e.target.value)}
                className="text-black border-gray-300 bg-white focus:ring-black"
              />
              <span className="text-gray-700">Yearly</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceAmount

