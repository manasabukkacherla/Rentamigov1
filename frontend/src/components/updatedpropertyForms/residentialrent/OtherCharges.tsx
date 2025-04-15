"use client"

import { useState } from "react"
import { ArrowRight, Droplets, Zap, Flame, Plus, IndianRupee } from "lucide-react"

interface OtherChargesProps {
  onOtherChargesChange?: (charges: Record<string, any>) => void
}

const OtherCharges = ({ onOtherChargesChange }: OtherChargesProps) => {
  const [charges, setCharges] = useState({
    water: {
      amount: 0,
      type: "",
    },
    electricity: {
      amount: 0,
      type: "",
    },
    gas: {
      amount: 0,
      type: "",
    },
    others: {
      amount: 0,
      type: "",
    },
  })

  const handleChange = (utility: string, field: string, value: any) => {
    const updatedCharges = {
      ...charges,
      [utility]: {
        ...charges[utility as keyof typeof charges],
        [field]: value,
      },
    }
    setCharges(updatedCharges)
    onOtherChargesChange?.(updatedCharges)
  }

  const utilities = [
    { key: "water", label: "Water", icon: Droplets, color: "text-black" },
    { key: "electricity", label: "Electricity", icon: Zap, color: "text-black" },
    { key: "gas", label: "Gas", icon: Flame, color: "text-black" },
    { key: "others", label: "Others", icon: Plus, color: "text-black" },
  ]

  return (
    <div className="bg-gray-100 p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold text-black">Other Charges</h3>
        <ArrowRight className="text-black" size={20} />
        <span className="text-sm text-gray-500">Enter Utility Charges</span>
      </div>

      <div className="space-y-6 max-w-4xl">
        {utilities.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="bg-white p-6 rounded-2xl shadow-lg space-y-6"
          >
            <div className="flex items-center gap-2">
              <Icon size={24} className={color} />
              <h4 className="text-lg font-medium text-gray-800">{label}</h4>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {["inclusive", "exclusive"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange(key, "type", type)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                      charges[key as keyof typeof charges].type === type
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="capitalize">{type}</span>
                  </button>
                ))}
              </div>

              {charges[key as keyof typeof charges].type === "exclusive" && (
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <IndianRupee size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={charges[key as keyof typeof charges].amount || ''}
                    onChange={(e) => handleChange(key, "amount", parseFloat(e.target.value))}
                    placeholder={`Enter ${label.toLowerCase()} charges`}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800 placeholder:text-gray-400 hover:border-gray-300"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OtherCharges

