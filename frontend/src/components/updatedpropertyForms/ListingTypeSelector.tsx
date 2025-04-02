import { useState } from "react";
import ResidentialPropertyType from "./ResidentialPropertyType";
import { ArrowRight, Home, Building2, Users, Key } from "lucide-react";

interface ListingTypeSelectorProps {
  propertyType: string;
  onPropertyTypeSelect: (type: string) => void;
}

const ListingTypeSelector = ({ propertyType, onPropertyTypeSelect }: ListingTypeSelectorProps) => {
  const [selectedListingType, setSelectedListingType] = useState<string | null>(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);

  const listingTypes = propertyType === "Residential" 
    ? [
        { type: "Rent", icon: Key },
        { type: "PG/Co-living", icon: Users },
        { type: "Sell", icon: Home },
        { type: "Lease", icon: Building2 }
      ]
    : [
        { type: "Rent", icon: Key },
        { type: "Sell", icon: Building2 },
        { type: "Lease", icon: Building2 }
      ];

  const handleSelect = (type: string) => {
    setSelectedListingType(type);
    setSelectedPropertyType(null);
  };

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type);
    onPropertyTypeSelect(type);
  };

  return (
    <div className="space-y-8 bg-white">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-black">
            {propertyType} Property Listings
          </h2>
          <ArrowRight className="text-black" size={20} />
          <span className="text-sm text-black">Select Purpose</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {listingTypes.map(({ type, icon: Icon }) => (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className={`group flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 ${
                selectedListingType === type
                  ? "bg-black text-white border-black"
                  : "border-black/20 hover:border-black text-black"
              }`}
            >
              <Icon size={20} className={selectedListingType === type ? "text-white" : "text-black"} />
              <span className="font-medium">{type}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedListingType && (
        <ResidentialPropertyType 
          listingType={selectedListingType}
          selectedType={selectedPropertyType}
          onSelect={handlePropertyTypeSelect}
          propertyType={propertyType}
        />
      )}
    </div>
  );
};

export default ListingTypeSelector;