import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";

interface FilterComponentProps {
  onApplyFilters: (filters: Record<string, string[]>, priceRange: string | null) => void;
  onClearFilters: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onApplyFilters, onClearFilters }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMinimized(true);
      setIsFilterVisible(false);
    } else {
      setIsMinimized(false);
      setIsFilterVisible(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const toggleSelection = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const currentSelections = prev[category] || [];
      const isSelected = currentSelections.includes(option);
      const newSelections = isSelected
        ? currentSelections.filter((item) => item !== option)
        : [...currentSelections, option];
      return { ...prev, [category]: newSelections };
    });
  };

  const handlePriceRangeSelection = (range: string) => {
    setSelectedPriceRange(range === selectedPriceRange ? null : range);
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setSelectedPriceRange(null);
    onClearFilters();
  };

  const applyFilters = () => {
    onApplyFilters(selectedFilters, selectedPriceRange);
  };

  const priceRanges = [
    "< 10k",
    "10k - 20k",
    "20k - 30k",
    "30k - 40k",
    "40k - 50k",
    "50k - 60k",
    "60k - 70k",
    "> 70k",
  ];

  return (
    <div className="font-sans">
      {isMinimized && (
        <div className="fixed top-10 md:top-12 right-4 md:right-8 lg:right-12 flex items-center justify-center space-x-4">
          <Button
            onClick={toggleFilter}
            className="text-white hover:bg-gray-800 p-3 mt-11"
          >
            <Filter />
          </Button>
        </div>
      )}

      {isFilterVisible && (
        <Card className="fixed top-2/5 left-5 w-[98%] md:w-[350px] h-[65vh] bg-white text-black shadow-lg rounded-lg flex flex-col">
          <ScrollArea className="flex-grow px-4 py-4">
            <h3 className="text-lg font-medium mb-4 text-center text-gray-700">
              Filters
            </h3>

            <div className="space-y-4">
              {/* BHK Type */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-600">
                  BHK Type
                </h4>
                <div className="flex flex-wrap gap-1">
                  {["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"].map(
                    (type) => (
                      <Button
                        key={type}
                        variant={
                          selectedFilters["BHK Type"]?.includes(type)
                            ? "default"
                            : "outline"
                        }
                        onClick={() => toggleSelection("BHK Type", type)}
                        className="text-xs px-2 py-1 h-7"
                      >
                        {type}
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-600">
                  Price Range
                </h4>
                <div className="flex flex-wrap gap-1">
                  {priceRanges.map((range) => (
                    <Button
                      key={range}
                      variant={
                        selectedPriceRange === range ? "default" : "outline"
                      }
                      onClick={() => handlePriceRangeSelection(range)}
                      className="text-xs px-2 py-1 h-7"
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Furnishing Type */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-600">
                  Furnishing Type
                </h4>
                <div className="flex flex-wrap gap-1">
                  {[
                    "Semi Furnished",
                    "Partially Furnished",
                    "Fully Furnished",
                  ].map((type) => (
                    <Button
                      key={type}
                      variant={
                        selectedFilters["Furnishing Type"]?.includes(type)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => toggleSelection("Furnishing Type", type)}
                      className="text-xs px-2 py-1 h-7"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-600">
                  Property Type
                </h4>
                <div className="flex flex-wrap gap-1">
                  {[
                    "Apartment",
                    "Standalone Building",
                    "Independent House",
                    "Villa",
                    "Studio",
                    "Penthouse",
                  ].map((type) => (
                    <Button
                      key={type}
                      variant={
                        selectedFilters["Property Type"]?.includes(type)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => toggleSelection("Property Type", type)}
                      className="text-xs px-2 py-1 h-7"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Availability Date 
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-600">
                  Availability Date
                </h4>
                <div className="flex flex-wrap gap-1">
                  {[
                    "Immediate",
                    "Within 15 Days",
                    "Within 30 Days",
                    "After 30 Days",
                  ].map((date) => (
                    <Button
                      key={date}
                      variant={
                        selectedFilters["Availability Date"]?.includes(date)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => toggleSelection("Availability Date", date)}
                      className="text-xs px-2 py-1 h-7"
                    >
                      {date}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Preferred Tenants 
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-600">
                  Preferred Tenants
                </h4>
                <div className="flex flex-wrap gap-1">
                  {[
                    "BachelorTenants",
                    "nonVegTenants",
                    "Family",
                    "tenantWithPets",
                  ].map((tenant) => (
                    <Button
                      key={tenant}
                      variant={
                        selectedFilters["Preferred Tenants"]?.includes(tenant)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => toggleSelection("Preferred Tenants", tenant)}
                      className="text-xs px-2 py-1 h-7"
                    >
                      {tenant}
                    </Button>
                  ))}
                </div>
              </div>*/}
            </div>
          </ScrollArea>

          <div className="flex justify-between p-3 border-t border-gray-200">
            <Button
              onClick={clearAllFilters}
              variant="outline"
              className="w-[48%] text-xs h-8"
            >
              Clear All
            </Button>
            <Button
              onClick={applyFilters}
              className="w-[48%] bg-black text-white hover:bg-gray-800 text-xs h-8"
            >
              Apply
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FilterComponent;