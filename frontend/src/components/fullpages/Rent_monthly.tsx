import React, { useState, useEffect } from "react";
import { Info, X, Loader2 } from "lucide-react";

interface RentDetailsProps {
  propertyId: string;
  monthlyRent?: number | null; // Optional or nullable number
  maintenanceAmount?: number | null; // Optional or nullable number
  securityDeposit?: number | null; // Optional or nullable number
}

const RentDetails: React.FC<RentDetailsProps> = ({ propertyId }) => {
  const [commercials, setCommercials] = useState<{
    monthlyRent: string;
    maintenance: string;
    maintenanceAmount?: string;
    securityDeposit: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch commercials from the API
  useEffect(() => {
    const fetchCommercials = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.rentamigo.in/api/properties/${propertyId}/commercials`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property commercials");
        }
        const data = await response.json();

        // Assuming the first commercial is the most relevant
        if (data.length > 0) {
          const commercial = data[0];
          setCommercials({
            monthlyRent: commercial.monthlyRent,
            maintenance: commercial.maintenance,
            maintenanceAmount: commercial.maintenanceAmount,
            securityDeposit: commercial.securityDeposit,
          });
        } else {
          setError("No commercials found for this property");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setCommercials(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCommercials();
  }, [propertyId]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between bg-gray-50 rounded-lg p-4 mt-5 gap-4 border border-gray-200 w-full max-w-4xl">
      {/* Loading State */}
      {loading && (
        <div className="w-full text-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <p className="text-gray-600 mt-2">Loading commercials...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="w-full text-center bg-red-50 text-red-600 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Commercials Data */}
      {!loading && commercials && (
        <>
          <div className="flex-1 bg-white rounded p-3 shadow-sm border border-gray-100 text-center">
            <p className="text-gray-600 text-sm">Monthly Rent</p>
            <p className="font-semibold text-base sm:text-lg md:text-xl">
              ₹{Number(commercials.monthlyRent).toLocaleString()}
            </p>
          </div>

          <div className="flex-1 bg-white rounded p-3 shadow-sm border border-gray-100 text-center">
            <p className="text-gray-600 text-sm">Maintenance</p>
            <p className="font-semibold text-base sm:text-lg md:text-xl">
              {commercials.maintenance === "Included"
                ? "Included"
                : `₹${Number(commercials.maintenanceAmount || 0).toLocaleString()}/month`}
            </p>
          </div>

          <div className="flex-1 bg-white rounded p-3 shadow-sm border border-gray-100 text-center relative">
            <p className="text-gray-600 text-sm">Security Deposit</p>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-base sm:text-lg md:text-xl">
                ₹{Number(commercials.securityDeposit).toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default RentDetails;