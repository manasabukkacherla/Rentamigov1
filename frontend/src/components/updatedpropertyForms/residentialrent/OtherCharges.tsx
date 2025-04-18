"use client"

import { useState } from "react"
import { ArrowRight, Droplets, Zap, Flame, Plus, IndianRupee } from "lucide-react"

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
  propertyTax: boolean
  otherInclusives: string
}

const OtherCharges: React.FC<OtherChargesProps> = ({ onOtherChargesChange }) => {
  const [charges, setCharges] = useState<ChargesState>({
    water: { amount: 0, type: 'inclusive' },
    electricity: { amount: 0, type: 'inclusive' },
    gas: { amount: 0, type: 'inclusive' },
    others: { amount: 0, type: 'inclusive' },
    propertyTax: false,
    otherInclusives: '',
  })

  const handleChange = (field: keyof ChargesState, value: any) => {
    if (field === 'propertyTax') {
      setCharges((prev) => ({
        ...prev,
        propertyTax: value as boolean,
      }))
    } else if (field === 'otherInclusives') {
      setCharges((prev) => ({
        ...prev,
        otherInclusives: value as string,
      }))
    } else {
      setCharges((prev) => ({
        ...prev,
        [field]: value as Charge,
      }))
    }
    onOtherChargesChange?.(charges)
  }

  const handleOtherInclusivesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCharges((prev) => ({
      ...prev,
      otherInclusives: value,
    }))
    onOtherChargesChange?.(charges)
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
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Type</label>
                <select
                  className="border border-gray-300 rounded-md p-2"
                  value={(charges[key as keyof typeof charges] as Charge).type}
                  onChange={(e) =>
                    handleChange(key as keyof typeof charges, {
                      ...(charges[key as keyof typeof charges] as Charge),
                      type: e.target.value,
                    })
                  }
                >
                  <option value="inclusive">Inclusive</option>
                  <option value="exclusive">Exclusive</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md p-2"
                  value={(charges[key as keyof typeof charges] as Charge).amount}
                  onChange={(e) =>
                    handleChange(key as keyof typeof charges, {
                      ...(charges[key as keyof typeof charges] as Charge),
                      amount: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-medium text-gray-800">Property Tax</h4>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleChange('propertyTax', true)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${charges.propertyTax
                ? "bg-blue-50 border-blue-500 text-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
            >
              Included
            </button>
            <button
              type="button"
              onClick={() => handleChange('propertyTax', false)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${!charges.propertyTax
                ? "bg-blue-50 border-blue-500 text-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
            >
              Not Included
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-medium text-gray-800">Other Inclusives</h4>
          </div>
          <div className="relative">
            <input
              type="text"
              value={charges.otherInclusives}
              onChange={handleOtherInclusivesChange}
              placeholder="Enter other inclusive charges"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800 placeholder:text-gray-400 hover:border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtherCharges

