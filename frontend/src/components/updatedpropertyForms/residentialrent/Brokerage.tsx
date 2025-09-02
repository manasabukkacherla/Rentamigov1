"use client"

import { useState } from "react"
import { IndianRupee, Wallet } from "lucide-react"

interface BrokerageProps {
  bro: {
    required: string;
    amount?: number;
  }
  onBrokerageChange?: (brokerage: { required: string; amount?: number }) => void
}

const Brokerage = ({ bro, onBrokerageChange }: BrokerageProps) => {
  const [brokerage, setBrokerage] = useState(bro)

  const handleChange = (field: string, value: any) => {
    const updatedBrokerage = { ...brokerage, [field]: value }
    if (field === "required" && value === "no") {
      updatedBrokerage.amount = 0
    }
    setBrokerage(updatedBrokerage)
    onBrokerageChange?.(updatedBrokerage)
  }

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Wallet className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Brokerage</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Wallet size={20} className="text-black/60" />
              <h4 className="text-lg font-medium text-black">Brokerage Required</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative flex items-center justify-between p-4 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-black transition-colors">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="brokerageRequired"
                    value="yes"
                    checked={brokerage.required === "yes"}
                    onChange={(e) => handleChange("required", e.target.value)}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-3 text-black">Yes</span>
                </div>
              </label>
              <label className="relative flex items-center justify-between p-4 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-black transition-colors">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="brokerageRequired"
                    value="no"
                    checked={brokerage.required === "no"}
                    onChange={(e) => handleChange("required", e.target.value)}
                    className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-3 text-black">No</span>
                </div>
              </label>
            </div>
          </div>

          {brokerage.required === "no" && (
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee size={20} className="text-black/60" />
                <h4 className="text-lg font-medium text-black">Brokerage Amount</h4>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <span className="text-black/40">₹</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={brokerage.amount || ''}
                  onChange={(e) => handleChange("amount", parseFloat(e.target.value))}
                  placeholder="Enter brokerage amount"
                  className="w-full pl-10 pr-4 py-3.5 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Brokerage

