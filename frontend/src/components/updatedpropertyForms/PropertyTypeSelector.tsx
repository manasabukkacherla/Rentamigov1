import { useState } from "react";
import ListingTypeSelector from "./ListingTypeSelector";

interface PropertyTypeSelectorProps {
  onPropertyTypeSelect: (type: string) => void;
}

const PropertyTypeSelector = ({ onPropertyTypeSelect }: PropertyTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
              Find Your Perfect Space
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleSelect("Residential")}
                className={`flex-1 px-8 py-4 rounded-lg border transition-all duration-200 ${
                  selectedType === "Residential"
                    ? "bg-white text-black border-white"
                    : "border-white/20 hover:border-white"
                }`}
              >
                <span className="text-lg font-medium">Residential</span>
                <p className="text-sm mt-1 opacity-70">Find your perfect home</p>
              </button>

              <button
                onClick={() => handleSelect("Commercial")}
                className={`flex-1 px-8 py-4 rounded-lg border transition-all duration-200 ${
                  selectedType === "Commercial"
                    ? "bg-white text-black border-white"
                    : "border-white/20 hover:border-white"
                }`}
              >
                <span className="text-lg font-medium">Commercial</span>
                <p className="text-sm mt-1 opacity-70">Discover business spaces</p>
              </button>
            </div>
          </div>

          {selectedType && (
            <div className="mt-8">
              <ListingTypeSelector 
                propertyType={selectedType} 
                onPropertyTypeSelect={onPropertyTypeSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyTypeSelector;