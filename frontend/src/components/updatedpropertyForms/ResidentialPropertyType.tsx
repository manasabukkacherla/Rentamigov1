"use client"

import { useState, useEffect } from "react"
import { Store, Building2, Warehouse, Home, Building, Users, Map, Factory, TreePine, CheckCircle2 } from "lucide-react"

import Apartment from "./property-types/Apartment"
import IndependentHouse from "./property-types/IndependentHouse"
import BuilderFloor from "./property-types/BuilderFloor"
import SharedSpace from "./property-types/SharedSpace"
import LeaseApartment from "./property-types/LeaseApartment"
import LeaseIndependentHouse from "./property-types/LeaseIndependentHouse"
import LeaseBuilderFloor from "./property-types/LeaseBuilderFloor"
import SellApartment from "./property-types/SellApartment"
import SellIndependentHouse from "./property-types/SellIndependentHouse"
import SellBuilderFloor from "./property-types/SellBuilderFloor"
import SellPlot from "./property-types/SellPlot"
import Pgmain from "./residentialrent/pg/Pgmain"
import LeaseAgricultureMain from "./commercialpropertytypes/LeaseAgricultureMain"
import LeaseCoveredSpaceMain from "./commercialpropertytypes/LeaseCoveredSpaceMain"
import LeaseOfficeSpaceMain from "./commercialpropertytypes/LeaseOfficeSpaceMain"
import LeaseOthersMain from "./commercialpropertytypes/LeaseOthersMain"
import LeasePlotMain from "./commercialpropertytypes/LeasePlotMain"
import LeaseRetailStoreMain from "./commercialpropertytypes/LeaseRetailStoreMain"
import LeaseShedMain from "./commercialpropertytypes/LeaseShedMain"
import LeaseShopMain from "./commercialpropertytypes/LeaseShopMain"
import LeaseShowroomMain from "./commercialpropertytypes/LeaseShowroomMain"
import LeaseWarehouseMain from "./commercialpropertytypes/LeaseWarehouseMain"
import RentAgriculture from "./commercialpropertytypes/RentAgriculture"
import RentCoveredSpace from "./commercialpropertytypes/RentCoveredSpace"
import RentOfficeSpace from "./commercialpropertytypes/RentOfficeSpace"
import RentOthers from "./commercialpropertytypes/RentOthers"
import RentPlot from "./commercialpropertytypes/RentPlot"
import RentRetailStoreMain from "./commercialpropertytypes/RentRetailStoreMain"
import RentShed from "./commercialpropertytypes/RentShed"
import RentShopMain from "./commercialpropertytypes/RentShopMain"
import RentShowroomMain from "./commercialpropertytypes/RentShowroomMain"
import RentWarehouse from "./commercialpropertytypes/RentWarehouse"
import SellAgricultureMain from "./commercialpropertytypes/SellAgricultureMain"
import SellCoveredSpaceMain from "./commercialpropertytypes/SellCoveredSpaceMain"
import SellOfficeSpaceMain from "./commercialpropertytypes/SellOfficeSpaceMain"
import SellOthersMain from "./commercialpropertytypes/SellOthersMain"
import SellPlotMain from "./commercialpropertytypes/SellPlotMain"
import SellRetailShopMain from "./commercialpropertytypes/SellRetailShopMain"
import SellShedMain from "./commercialpropertytypes/SellShedMain"
import SellShopMain from "./commercialpropertytypes/SellShopMain"
import SellShowroomMain from "./commercialpropertytypes/SellShowroomMain"
import SellWarehouseMain from "./commercialpropertytypes/SellWarehouseMain"


interface ResidentialPropertyTypeProps {
  listingType: string
  selectedType: string | null
  onSelect: (type: string) => void
  propertyType: string
}

const ResidentialPropertyType = ({
  listingType,
  selectedType,
  onSelect,
  propertyType,
}: ResidentialPropertyTypeProps) => {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [propertyId, setPropertyId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [skipTypeSelection, setSkipTypeSelection] = useState(false)

  // Check if we should skip type selection for PG/Co-living
  useEffect(() => {
    if (propertyType === "Residential" && listingType === "PG/Co-living") {
      setSkipTypeSelection(true)
      // Auto-select a default type for PG/Co-living
      onSelect("pg-coliving")
      setTimeout(() => {
        setShowForm(true)
      }, 100)
    } else {
      setSkipTypeSelection(false)
    }
  }, [propertyType, listingType, onSelect])

  const getPropertyTypes = () => {
    if (propertyType === "Commercial") {
      return [
        {
          id: "shop",
          name: "Shop",
          icon: Store,
          description: "Small retail spaces for businesses",
        },
        {
          id: "retail-store-space",
          name: "Retail Store Space",
          icon: Building2,
          description: "Large retail spaces for stores",
        },
        {
          id: "showroom",
          name: "Showroom",
          icon: Store,
          description: "Display spaces for products",
        },
        {
          id: "office-space",
          name: "Office Space",
          icon: Building2,
          description: "Professional workspace",
        },
        {
          id: "warehouse",
          name: "Warehouse",
          icon: Warehouse,
          description: "Storage facilities",
        },
        {
          id: "shed",
          name: "Shed",
          icon: Factory,
          description: "Industrial sheds",
        },
        {
          id: "covered-open-space",
          name: "Covered/Open Space",
          icon: Building,
          description: "Versatile spaces",
        },
        {
          id: "plot",
          name: "Plot",
          icon: Map,
          description: "Commercial plots",
        },
        {
          id: "agricultural-land",
          name: "Agricultural Land",
          icon: TreePine,
          description: "Farming and agriculture",
        },
        {
          id: "others",
          name: "Others",
          icon: Building2,
          description: "Other commercial spaces",
        },
      ]
    } else if (listingType === "PG/Co-living") {
      return [
        {
          id: "pg-coliving",
          name: "PG/Co-living Space",
          icon: Users,
          description: "Shared living accommodations",
        },
      ]
    } else if (listingType === "Rent") {
      return [
        {
          id: "Apartment",
          name: "Apartment",
          icon: Building2,
          description: "Flats in residential buildings",
        },
        {
          id: "Independent House",
          name: "Independent House",
          icon: Home,
          description: "Individual houses with private space",
        },
        {
          id: "Builder Floor",
          name: "Builder Floor",
          icon: Building,
          description: "Individual floors in buildings",
        }
      ]
    } else if (listingType === "Sell") {
      return [
        {
          id: "Apartment",
          name: "Apartment",
          icon: Building2,
          description: "Flats in residential buildings",
        },
        {
          id: "Independent House",
          name: "Independent House",
          icon: Home,
          description: "Individual houses with private space",
        },
        {
          id: "Builder Floor",
          name: "Builder Floor",
          icon: Building,
          description: "Individual floors in buildings",
        },
        {
          id: "Plot",
          name: "Plot",
          icon: Map,
          description: "Land for construction",
        },
      ]
    } else if (listingType === "Lease") {
      return [
        {
          id: "Apartment",
          name: "Apartment",
          icon: Building2,
          description: "Flats in residential buildings",
        },
        {
          id: "Independent House",
          name: "Independent House",
          icon: Home,
          description: "Individual houses with private space",
        },
        {
          id: "Builder Floor",
          name: "Builder Floor",
          icon: Building,
          description: "Individual floors in buildings",
        },
      ]
    }
    return []
  }

  const propertyTypes = getPropertyTypes()

  const getSelectedPropertyName = () => {
    const selectedProperty = propertyTypes.find((type) => type.id === selectedType)
    return selectedProperty ? selectedProperty.name : ""
  }

  const renderPropertyForm = () => {
    if (propertyType === "Residential" && listingType === "PG/Co-living") {
      return <Pgmain />
    }

    if (propertyType === "Commercial") {
      if (listingType === "Rent") {
        switch (selectedType) {
          case "shop":
            return <RentShopMain />
          case "retail-store-space":
            return <RentRetailStoreMain />
          case "showroom":
            return <RentShowroomMain />
          case "office-space":
            return <RentOfficeSpace />
          case "warehouse":
            return <RentWarehouse />
          case "shed":
            return <RentShed />
          case "covered-open-space":
            return <RentCoveredSpace />
          case "plot":
            return <RentPlot />
          case "agricultural-land":
            return <RentAgriculture />
          case "others":
            return <RentOthers />
        }
      } else if (listingType === "Sell") {
        switch (selectedType) {
          case "shop":
            return <SellShopMain />
          case "retail-store-space":
            return <SellRetailShopMain />
          case "showroom":
            return <SellShowroomMain />
          case "office-space":
            return <SellOfficeSpaceMain />
          case "warehouse":
            return <SellWarehouseMain />
          case "shed":
            return <SellShedMain />
          case "covered-open-space":
            return <SellCoveredSpaceMain />
          case "plot":
            return <SellPlotMain />
          case "agricultural-land":
            return <SellAgricultureMain />
          case "others":
            return <SellOthersMain />
        }
      } else if (listingType === "Lease") {
        switch (selectedType) {
          case "shop":
            return <LeaseShopMain />
          case "retail-store-space":
            return <LeaseRetailStoreMain />
          case "showroom":
            return <LeaseShowroomMain />
          case "office-space":
            return <LeaseOfficeSpaceMain />
          case "warehouse":
            return <LeaseWarehouseMain />
          case "shed":
            return <LeaseShedMain />
          case "covered-open-space":
            return <LeaseCoveredSpaceMain />
          case "plot":
            return <LeasePlotMain />
          case "agricultural-land":
            return <LeaseAgricultureMain />
          case "others":
            return <LeaseOthersMain />
        }
      }
    } else if (propertyType === "Residential") {
      if (listingType === "Rent") {
        switch (selectedType) {
          case "Apartment":
            return <Apartment />
          case "Independent House":
            return <IndependentHouse propertyId={""} />
          case "Builder Floor":
            return <BuilderFloor propertyId={""} />
          // case "PG/Co-living":
          //   return <SharedSpace propertyId={""} />
        }
      } else if (listingType === "Lease") {
        switch (selectedType) {
          case "Apartment":
            return <LeaseApartment />
          case "Independent House":
            return <LeaseIndependentHouse />
          case "Builder Floor":
            return <LeaseBuilderFloor propertyId={""} />
        }
      } else if (listingType === "Sell") {
        switch (selectedType) {
          case "Apartment":
            return <SellApartment />
          case "Independent House":
            return <SellIndependentHouse />
          case "Builder Floor":
            return <SellBuilderFloor propertyId={""} />
          case "Plot":
            return <SellPlot />
        }
      }
    }
    return null
  }

  if (propertyTypes.length === 0) return null

  // If we're skipping type selection and showing the form directly
  if (skipTypeSelection && showForm) {
    return (
      <div className="bg-white">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
                <CheckCircle2 size={20} />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-black">{propertyType}</p>
                <p className="text-xs text-black">Property Category</p>
              </div>
            </div>
            <div className="flex-1 mx-4 h-px bg-black/20" />
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
                <CheckCircle2 size={20} />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-black">{listingType}</p>
                <p className="text-xs text-black">Listing Type</p>
              </div>
            </div>
          </div>
        </div>

        {renderPropertyForm()}
      </div>
    )
  }



  if (showForm && selectedType) {
    return (
      <div className="bg-white">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
                <CheckCircle2 size={20} />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-black">{propertyType}</p>
                <p className="text-xs text-black">Property Category</p>
              </div>
            </div>
            <div className="flex-1 mx-4 h-px bg-black/20" />
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
                <CheckCircle2 size={20} />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-black">{listingType}</p>
                <p className="text-xs text-black">Listing Type</p>
              </div>
            </div>
            <div className="flex-1 mx-4 h-px bg-black/20" />
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
                <CheckCircle2 size={20} />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-black">{getSelectedPropertyName()}</p>
                <p className="text-xs text-black">Property Type</p>
              </div>
            </div>
          </div>
        </div>

        {renderPropertyForm()}
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
              <CheckCircle2 size={20} />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-black">{propertyType}</p>
              <p className="text-xs text-black">Property Category</p>
            </div>
          </div>
          <div className="flex-1 mx-4 h-px bg-black/20" />
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
              <CheckCircle2 size={20} />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-black">{listingType}</p>
              <p className="text-xs text-black">Listing Type</p>
            </div>
          </div>
          <div className="flex-1 mx-4 h-px bg-black/20" />
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/20 text-black">
              <span>3</span>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-black">Property Type</p>
              <p className="text-xs text-black">Select Category</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {propertyTypes.map(({ id, name, icon: Icon, description }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex flex-col items-center justify-center h-[180px] transition-all duration-300 group rounded-lg shadow-lg hover:shadow-2xl ${
              selectedType === id
                ? "bg-black text-white"
                : "bg-white text-black border border-black/10 hover:bg-black"
            }`}
          >
            <Icon 
              size={32} 
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

      {/* Success & Error Messages */}
      {successMessage && (
        <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-lg text-center">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="mt-8 p-4 bg-red-100 text-red-800 rounded-lg text-center">{errorMessage}</div>
      )}

      {selectedType && (
        <div className="flex justify-end mt-8">
          <button
            onClick={() => setShowForm(true)}

            disabled={loading}
            className="px-6 py-3 rounded-lg bg-black text-white hover:bg-black/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"


          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default ResidentialPropertyType
