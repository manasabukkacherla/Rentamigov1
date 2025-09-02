"use client"

import { useState } from "react"
import { ArrowRight, IndianRupee } from "lucide-react"

interface RentProps {
  rentDetails: {
    expectedRent: number;
    isNegotiable: boolean;
    rentType: string;
  }
  onRentChange?: (rent: Record<string, any>) => void
}

const Rent = ({ rentDetails, onRentChange }: RentProps) => {
  const [rent, setRent] = useState(rentDetails);

  const handleChange = (field: string, value: any) => {
    const updatedRent = { ...rent, [field]: value }
    setRent(updatedRent)
    onRentChange?.(updatedRent)
  }

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-6 ">
        <h3 className="text-2xl font-semibold text-black">Rent Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Rent Information</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4 transition-all duration-300 hover:shadow-md">
          <h4 className="text-lg font-medium flex items-center gap-2 text-gray-800">
            <IndianRupee size={20} className="text-gray-600" />
            Expected Rent
          </h4>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <IndianRupee size={20} className="text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                value={rent.expectedRent || ''}
                onChange={(e) => handleChange("expectedRent", parseFloat(e.target.value))}
                placeholder="Enter expected rent"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-black outline-none transition-colors duration-200 text-gray-800 placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rent.isNegotiable}
                  onChange={(e) => handleChange("isNegotiable", e.target.checked)}
                  className="rounded border-gray-300 bg-white focus:ring-black text-black"
                />
                <span className="text-gray-700">Rent is negotiable</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="rentType"
                    value="inclusive"
                    checked={rent.rentType === "inclusive"}
                    onChange={(e) => handleChange("rentType", e.target.value)}
                    className="text-black border-gray-300 bg-white focus:ring-black"
                  />
                  <span className="text-gray-700">Inclusive of Maintenance</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="rentType"
                    value="exclusive"
                    checked={rent.rentType === "exclusive"}
                    onChange={(e) => handleChange("rentType", e.target.value)}
                    className="text-black border-gray-300 bg-white focus:ring-black"
                  />
                  <span className="text-gray-700">Exclusive of Maintenance</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rent

