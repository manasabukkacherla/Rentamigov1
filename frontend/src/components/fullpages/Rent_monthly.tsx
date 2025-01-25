import React, { useState, useEffect } from "react";
import { Info, X, Loader2 } from "lucide-react";

interface RentDetailsProps {
  propertyId: string; // Property ID passed from the parent component
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
          `http://localhost:8000/api/properties/${propertyId}/commercials`
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
              <button
                onClick={() => setShowPopup(true)}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline mt-1 inline-flex items-center gap-1"
                aria-label="View deposit details"
              >
                <Info className="w-3 h-3" />
                <span>View details</span>
              </button>
            </div>
          </div>
        </>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] sm:max-h-[80vh] overflow-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl font-semibold">Property Details</h2>
                <button
                  onClick={closePopup}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {loading && (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <p className="mt-2 text-gray-600">Loading details...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  <p>{error}</p>
                </div>
              )}

              {!loading && !error && propertyData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderSection("Property Identification", (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property ID</span>
                        <span className="font-medium">{propertyData.propertyId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lease No</span>
                        <span className="font-medium">{propertyData.leaseNo}</span>
                      </div>
                    </div>
                  ))}

                  {renderSection("Basic Details", (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Type</span>
                        <span className="font-medium">{propertyData.propertyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Configuration</span>
                        <span className="font-medium">{propertyData.propertyConfig}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Furnishing</span>
                        <span className="font-medium">{propertyData.furnishingStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Facing</span>
                        <span className="font-medium">{propertyData.facing}</span>
                      </div>
                    </div>
                  ))}

                  {renderSection("Location", (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Name</span>
                        <span className="font-medium">{propertyData.propertyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Flat No</span>
                        <span className="font-medium">{propertyData.flatNo}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">Address</span>
                        <address className="not-italic text-right">
                          {propertyData.address.line1}<br />
                          {propertyData.address.line2}<br />
                          {propertyData.address.line3}
                        </address>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Locality</span>
                        <span className="font-medium">{propertyData.locality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pin Code</span>
                        <span className="font-medium">{propertyData.pinCode}</span>
                      </div>
                    </div>
                  ))}

                  {renderSection("Property Features", (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bedrooms</span>
                        <span className="font-medium">{propertyData.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bathrooms</span>
                        <span className="font-medium">{propertyData.bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Balconies</span>
                        <span className="font-medium">{propertyData.balconies}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">Extra Rooms</span>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {propertyData.extraRooms.map((room, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                              {room}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {renderSection("Area Details", (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Super Built-up Area</span>
                        <span className="font-medium">{propertyData.areaDetails.superBuiltup} sq.ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Built-up Area</span>
                        <span className="font-medium">{propertyData.areaDetails.builtUp} sq.ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Carpet Area</span>
                        <span className="font-medium">{propertyData.areaDetails.carpetArea} sq.ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Floor</span>
                        <span className="font-medium">{propertyData.floorNumber} of {propertyData.totalFloors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Age</span>
                        <span className="font-medium">{propertyData.propertyAge}</span>
                      </div>
                    </div>
                  ))}

                  {renderSection("Financial Details", (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Rent</span>
                        <span className="font-medium">₹{propertyData.monthlyRent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maintenance</span>
                        <span className="font-medium">{propertyData.maintenance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maintenance Amount</span>
                        <span className="font-medium">₹{propertyData.maintenanceAmount.toLocaleString()}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Security Deposit</span>
                        <span className="font-medium">₹{propertyData.securityDeposit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Available From</span>
                        <span className="font-medium">{new Date(propertyData.availabilityDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentDetails;