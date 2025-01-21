import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDownWideNarrow, Filter } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "./searchbar";
import ResponsiveSearchBar from "./responsiveSearch";

const FilterComponent: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );

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
  };

  const applyFilters = () => {
    console.log(
      "Applied Filters:",
      selectedFilters,
      "Price Range:",
      selectedPriceRange
    );
    // Here you would typically update the parent component or make an API call
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
        <Card className="fixed top-1/5 left-5 w-[91%] md:w-1/4 h-[70vh] bg-white text-black shadow-lg rounded-lg flex flex-col">
          <ScrollArea className="flex-grow px-6 py-4">
            <h3 className="text-xl font-medium mb-4 text-center text-gray-700">
              Filters
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium mb-2 text-gray-600">
                  BHK Type
                </h4>
                <div className="flex flex-wrap gap-2">
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
                        className="text-sm"
                      >
                        {type}
                      </Button>
                    )
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium mb-2 text-gray-600">
                  Price Range
                </h4>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <Button
                      key={range}
                      variant={
                        selectedPriceRange === range ? "default" : "outline"
                      }
                      onClick={() => handlePriceRangeSelection(range)}
                      className="text-sm"
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium mb-2 text-gray-600">
                  Furnishing Type
                </h4>
                <div className="flex flex-wrap gap-2">
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
                      className="text-sm"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium mb-2 text-gray-600">
                  Property Type
                </h4>
                <div className="flex flex-wrap gap-2">
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
                      className="text-sm"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium mb-2 text-gray-600">
                  Availability Date
                </h4>
                <div className="flex flex-wrap gap-2">
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
                      className="text-sm"
                    >
                      {date}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium mb-2 text-gray-600">
                  Preferred Tenants
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Family",
                    "Bachelor Male",
                    "Bachelor Female",
                    "Company",
                  ].map((tenant) => (
                    <Button
                      key={tenant}
                      variant={
                        selectedFilters["Preferred Tenants"]?.includes(tenant)
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        toggleSelection("Preferred Tenants", tenant)
                      }
                      className="text-sm"
                    >
                      {tenant}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="flex justify-between p-4 border-t border-gray-200">
            <Button
              onClick={clearAllFilters}
              variant="outline"
              className="w-[48%]"
            >
              Clear All
            </Button>
            <Button
              onClick={applyFilters}
              className="w-[48%] bg-black text-white hover:bg-gray-800"
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
