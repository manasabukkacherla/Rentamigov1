"use client"

import React, { useState } from "react"
import { Home, DollarSign, Clock, Users } from "lucide-react"

interface ListingTypeSelectorProps {
  propertyType: string
  onListingTypeSelect: (type: string) => void
}

const ListingTypeSelector = ({ propertyType, onListingTypeSelect }: ListingTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleSelect = (type: string) => {
    setSelectedType(type)
    onListingTypeSelect(type)
  }

  const getListingTypes = () => {
    if (propertyType === "Residential") {
      return [
        {
          id: "Rent",
          name: "Rent",
          icon: Home,
          description: "List your property for rent",
        },
        {
          id: "Sell",
          name: "Sale",
          icon: DollarSign,
          description: "List your property for sale",
        },
        {
          id: "Lease",
          name: "Lease",
          icon: Clock,
          description: "List your property for lease",
        },
        {
          id: "PG/Co-living",
          name: "PG/Co-living",
          icon: Users,
          description: "List your PG or co-living space",
        },
      ]
    } else if (propertyType === "Commercial") {
      return [
        {
          id: "Rent",
          name: "Rent",
          icon: Home,
          description: "List your commercial property for rent",
        },
        {
          id: "Sell",
          name: "Sale",
          icon: DollarSign,
          description: "List your commercial property for sale",
        },
        {
          id: "Lease",
          name: "Lease",
          icon: Clock,
          description: "List your commercial property for lease",
        },
      ]
    }
    return []
  }

  const listingTypes = getListingTypes()

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {listingTypes.map(({ id, name, icon: Icon, description }) => (
          <button
            key={id}
            onClick={() => handleSelect(id)}
            className={`flex flex-col items-center justify-center h-[180px] transition-all duration-300 group rounded-lg shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${
              selectedType === id
                ? "bg-black text-white"
                : "bg-white text-black border border-black/10 hover:bg-black"
            }`}
          >
            <Icon 
              size={24} 
              className={`mb-3 ${
                selectedType === id 
                  ? "text-white" 
                  : "text-black"
              }`} 
            />
            <h4 className="font-semibold text-xl mb-2 opacity-100 text-current">{name}</h4>
            <p className={`text-sm text-center px-4 opacity-100 ${
              selectedType === id 
                ? "text-white/90" 
                : "text-black/70"
            }`}>
              {description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ListingTypeSelector

