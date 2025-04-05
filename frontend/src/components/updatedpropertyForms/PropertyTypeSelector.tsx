"use client"

import React, { useState } from "react"
import { Building, Store, CheckCircle2, ArrowRight } from "lucide-react"
import ListingTypeSelector from "./ListingTypeSelector"
import ResidentialPropertyType from "./ResidentialPropertyType"

const PropertyTypeSelector = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null)
  const [selectedListingType, setSelectedListingType] = useState<string | null>(null)
  const [selectedPropertySubType, setSelectedPropertySubType] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type)
    setStep(2)
  }

  const handleListingTypeSelect = (type: string) => {
    setSelectedListingType(type)
    setStep(3)
  }

  const handlePropertySubTypeSelect = (type: string) => {
    setSelectedPropertySubType(type)
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <h1 className="text-3xl font-bold mb-8 mt-12">Find Your Perfect Space</h1>
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => handlePropertyTypeSelect("Residential")}
            className={`h-[180px] flex flex-col items-center justify-center transition-all duration-300 group rounded-lg shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${
              selectedPropertyType === "Residential" || !selectedPropertyType
                ? "bg-black text-white"
                : "bg-white text-black border border-black/10 hover:bg-black"
            }`}
          >
            <Building size={32} className={`mb-3 ${selectedPropertyType === "Residential" || !selectedPropertyType ? "text-white" : "text-black"}`} />
            <h3 className="font-semibold text-xl mb-2 opacity-100 text-current">Residential</h3>
            <p className={`text-sm opacity-100 ${selectedPropertyType === "Residential" || !selectedPropertyType ? "text-white/90" : "text-black/70"}`}>
              Find your perfect home
            </p>
          </button>

          <button
            onClick={() => handlePropertyTypeSelect("Commercial")}
            className={`h-[180px] flex flex-col items-center justify-center transition-all duration-300 group rounded-lg shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${
              selectedPropertyType === "Commercial"
                ? "bg-black text-white"
                : "bg-white text-black border border-black/10 hover:bg-black"
            }`}
          >
            <Store size={32} className={`mb-3 ${selectedPropertyType === "Commercial" ? "text-white" : "text-black"}`} />
            <h3 className="font-semibold text-xl mb-2 opacity-100 text-current">Commercial</h3>
            <p className={`text-sm opacity-100 ${selectedPropertyType === "Commercial" ? "text-white/90" : "text-black/70"}`}>
              Discover business spaces
            </p>
          </button>
        </div>
      </div>

      {step >= 2 && selectedPropertyType && (
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-semibold">Residential Property Listings</h2>
            <ArrowRight className="mx-3 text-black/60" size={20} />
            <span className="text-black/70">Select Purpose</span>
          </div>
          <ListingTypeSelector propertyType={selectedPropertyType} onListingTypeSelect={handleListingTypeSelect} />
        </div>
      )}

      {step === 3 && selectedPropertyType && selectedListingType && (
        <div className="mb-16">
          <ResidentialPropertyType
            propertyType={selectedPropertyType}
            listingType={selectedListingType}
            selectedType={selectedPropertySubType}
            onSelect={handlePropertySubTypeSelect}
          />
        </div>
      )}
    </div>
  )
}

export default PropertyTypeSelector

