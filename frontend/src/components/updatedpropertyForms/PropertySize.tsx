"use client"

import type React from "react"
import { Ruler } from "lucide-react"

interface PropertySizeProps {
  propertySize: number  
  onPropertySizeChange: (size: number) => void
}

const PropertySize: React.FC<PropertySizeProps> = ({ propertySize, onPropertySizeChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="propertySize" className="block text-gray-800 font-medium mb-2">
        Property Size (sq ft)
      </label>
      <div className="relative">
        <input
          type="number"
          id="propertySize"
          onChange={(e) => onPropertySizeChange(parseFloat(e.target.value))}
          value={propertySize || ""}
          placeholder="Enter property size"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200"
        />
        <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
    </div>
  )
}

export default PropertySize

