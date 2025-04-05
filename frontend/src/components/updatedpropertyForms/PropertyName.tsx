"use client"

import type React from "react"
import { Building } from "lucide-react"

interface PropertyNameProps {
  propertyName: string
  onPropertyNameChange: (name: string) => void
}

const PropertyName: React.FC<PropertyNameProps> = ({ propertyName, onPropertyNameChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="propertyName" className="block text-gray-800 font-medium mb-2">
        Property Name
      </label>
      <div className="relative">
        <input
          type="text"
          id="propertyName"
          value={propertyName}
          onChange={(e) => onPropertyNameChange(e.target.value)}
          placeholder="Enter property name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200"
        />
        <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
    </div>
  )
}

export default PropertyName

