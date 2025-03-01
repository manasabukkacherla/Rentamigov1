import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";

interface FlatAmenitiesProps {
  flatId: string;
  onNext?: () => void;
}

const FlatAmenities = ({ flatId, onNext }: FlatAmenitiesProps) => {
  const [amenities, setAmenities] = useState<Record<string, number | boolean>>({});
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(true); // Track if amenities exist

  // Fetch amenities from backend on component mount
  useEffect(() => {
    if (!flatId) return;

    axios
      .get(`http://localhost:5000/api/flat-amenities/${flatId}`)
      .then((response) => {
        if (response.data) {
          setAmenities(response.data);
          setIsNew(false); // Mark as an existing entry
        }
      })
      .catch((error) => {
        console.error("No existing flat amenities found, will create new:", error);
      });
  }, [flatId]);

  // Handle input changes
  const handleInputChange = (key: string, value: number | boolean) => {
    setAmenities((prev) => ({ ...prev, [key]: value }));
  };

  // Save or update amenities
  const handleNextClick = () => {
    if (!flatId) {
      console.error("Flat ID is missing.");
      return;
    }

    setLoading(true);

    // If amenities exist, update them; otherwise, create new ones
    const request = isNew
      ? axios.post(`http://localhost:5000/api/flat-amenities`, { flatId, ...amenities })
      : axios.put(`http://localhost:5000/api/flat-amenities/${flatId}`, amenities);

    request
      .then(() => {
        console.log("Flat amenities saved successfully");
        setIsNew(false); // Mark as existing after first save
        onNext?.();
      })
      .catch((error) => {
        console.error("Error saving flat amenities:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Flat Amenities</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Available Items</span>
      </div>

      <div className="space-y-8 max-w-6xl">
        {/* Quantity Inputs */}
        <div>
          <h4 className="text-lg font-medium mb-4">Quantity Items</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: "lights", label: "Lights" },
              { key: "ceilingFan", label: "Ceiling Fan" },
              { key: "geysers", label: "Geysers" },
              { key: "wardrobes", label: "Wardrobes" },
              { key: "kitchenCabinets", label: "Kitchen Cabinets" },
              { key: "diningTableWithChairs", label: "Dining Table with Chairs" },
              { key: "cotWithMattress", label: "Cot with Mattress" },
              { key: "airConditioner", label: "Air Conditioner" },
              { key: "exhaustFan", label: "Exhaust Fan" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                <input
                  type="number"
                  min="0"
                  value={amenities[key] || 0}
                  onChange={(e) => handleInputChange(key, parseInt(e.target.value, 10))}
                  className="w-16 px-3 py-2 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                />
                <label className="text-white/80 flex-1">{label}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Boolean Inputs (Checkboxes) */}
        <div>
          <h4 className="text-lg font-medium mb-4">Available Items</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { key: "chimney", label: "Chimney" },
              { key: "callingBell", label: "Calling Bell" },
              { key: "pipedGasConnection", label: "Piped Gas Connection" },
              { key: "sofa", label: "Sofa" },
              { key: "refrigerator", label: "Refrigerator" },
              { key: "washingMachine", label: "Washing Machine" },
              { key: "dishwasher", label: "Dishwasher" },
              { key: "waterPurifier", label: "Water Purifier" },
              { key: "microwaveOven", label: "Microwave Oven" },
              { key: "inductionCooktop", label: "Induction Cooktop" },
              { key: "gasStove", label: "Gas Stove" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg text-white/80">
                <input
                  type="checkbox"
                  checked={!!amenities[key]}
                  onChange={(e) => handleInputChange(key, e.target.checked)}
                  className="rounded border-white/20 bg-transparent focus:ring-white text-white"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-6">
          <button
            onClick={handleNextClick}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlatAmenities;
