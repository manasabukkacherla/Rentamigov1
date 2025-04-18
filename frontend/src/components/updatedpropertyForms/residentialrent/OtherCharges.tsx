"use client"

import { useState } from "react"
import { ArrowRight, Droplets, Zap, Flame, Plus } from "lucide-react"

interface OtherChargesProps {
  onOtherChargesChange?: (charges: Record<string, any>) => void
}

interface Charge {
  amount: number
  type: string
}

interface ChargesState {
  water: Charge
  electricity: Charge
  gas: Charge
  others: Charge
}

const OtherCharges: React.FC<OtherChargesProps> = ({ onOtherChargesChange }) => {
  const [charges, setCharges] = useState<ChargesState>({
    water: { amount: 0, type: '' },
    electricity: { amount: 0, type: '' },
    gas: { amount: 0, type: '' },
    others: { amount: 0, type: '' },
  })

  const handleChange = (field: keyof ChargesState, value: any) => {
    setCharges((prev) => ({
      ...prev,
      [field]: value as Charge,
    }))
    onOtherChargesChange?.(charges)
  }

  const utilities = [
    { key: "water", label: "Water", icon: Droplets },
    { key: "electricity", label: "Electricity", icon: Zap },
    { key: "gas", label: "Gas", icon: Flame },
    { key: "others", label: "Others", icon: Plus },
  ]

  return (
    <div className="bg-gray-100 p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold text-black">Other Charges</h3>
        <ArrowRight className="text-black" size={20} />
        <span className="text-sm text-gray-500">Enter Utility Charges</span>
      </div>

      <div className="space-y-6 max-w-4xl">
        {utilities.map(({ key, label, icon: Icon }) => (
          <div key={key} className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Icon size={24} className="text-black" />
              <h4 className="text-lg font-medium text-gray-800">{label}</h4>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() =>
                  handleChange(key as keyof typeof charges, {
                    ...(charges[key as keyof typeof charges] as Charge),
                    type: 'inclusive',
                  })
                }
                className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-200 ${
                  (charges[key as keyof typeof charges] as Charge).type === 'inclusive'
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                Inclusive
              </button>
              <button
                type="button"
                onClick={() =>
                    handleChange(key as keyof typeof charges, {
                      ...(charges[key as keyof typeof charges] as Charge),
                    type: 'exclusive',
                    })
                  }
                className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-200 ${
                  (charges[key as keyof typeof charges] as Charge).type === 'exclusive'
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
                >
                Exclusive
              </button>
              </div>

            {(charges[key as keyof typeof charges] as Charge).type === 'exclusive' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors duration-200"
                  value={(charges[key as keyof typeof charges] as Charge).amount}
                  onChange={(e) =>
                    handleChange(key as keyof typeof charges, {
                      ...(charges[key as keyof typeof charges] as Charge),
                      amount: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter amount"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OtherCharges

