"use client"

import { useState } from "react"
import { ArrowRight, IndianRupee } from "lucide-react"

interface SecurityDepositProps {
  deposit: {
    amount: number;
  }
  onSecurityDepositChange?: (deposit: { amount: number }) => void
}

const SecurityDeposit = ({ deposit, onSecurityDepositChange }: SecurityDepositProps) => {
  const [securityDeposit, setSecurityDeposit] = useState(deposit);

  const handleChange = (value: any) => {
    const updatedDeposit = { amount: value }
    setSecurityDeposit(updatedDeposit)
    onSecurityDepositChange?.(updatedDeposit)
  }

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold text-black">Security Deposit</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Deposit Amount</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4 transition-all duration-300 hover:shadow-md">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <IndianRupee size={20} className="text-gray-400" />
            </div>
            <input
              type="number"
              min="0"
              value={securityDeposit.amount || ''}
              onChange={(e) => handleChange(parseFloat(e.target.value))}
              placeholder="Enter security deposit amount"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-black outline-none transition-colors duration-200 text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityDeposit

