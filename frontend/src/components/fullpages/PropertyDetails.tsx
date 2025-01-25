import React, { useState, useEffect } from "react";
import {
  Home,
  Sofa,
  Compass,
  Building2,
  Car,
  DotSquare as SquareFootage,
  Calendar,
  Users,
} from "lucide-react";
import { useParams } from "react-router-dom";

interface PropertyDetails {
  configuration: string;
  furnishingStatus: string;
  facing: string;
  floor: {
    current: number;
    total: number;
  };
  parking: {
    twoWheeler: string;
    twoWheelerCount: number;
    fourWheeler: string;
    fourWheelerCount: number;
  };
  area: {
    value: number;
    unit: string;
  };
  availabilityDate: string;
  tenantPreference: string[];
}

const Details: React.FC = () => {
  const { id: propertyId } = useParams<{ id: string }>();
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);

        // Fetch basic property details (furnishing status, configuration, facing)
        const propertyResponse = await fetch(
          `http://localhost:8000/api/properties/propertyds/${propertyId}`
        );
        if (!propertyResponse.ok) {
          throw new Error("Failed to fetch basic property details");
        }
        const propertyData = await propertyResponse.json();

        // Fetch features (floor and area details)
        const featuresResponse = await fetch(
          `http://localhost:8000/api/properties/${propertyId}/features`
        );
        if (!featuresResponse.ok) {
          throw new Error("Failed to fetch property features");
        }
        const featuresData = await featuresResponse.json();

        // Fetch availability date
        const availabilityResponse = await fetch(
          `http://localhost:8000/api/properties/${propertyId}/availability`
        );
        if (!availabilityResponse.ok) {
          throw new Error("Failed to fetch availability details");
        }
        const availabilityData = await availabilityResponse.json();

        // Fetch parking and tenant preferences
        const restrictionsResponse = await fetch(
          `http://localhost:8000/api/properties/${propertyId}/restrictions`
        );
        if (!restrictionsResponse.ok) {
          throw new Error("Failed to fetch parking and tenant preferences");
        }
        const restrictionsData = await restrictionsResponse.json();

        // Combine data into a single object
        setPropertyDetails({
          configuration: propertyData.propertyConfiguration,
          furnishingStatus: propertyData.furnishingStatus,
          facing: propertyData.facing,
          floor: {
            current: featuresData[0].floorNumber,
            total: featuresData[0].totalFloors,
          },
          parking: {
            twoWheeler: restrictionsData[0].twoWheelerParking,
            twoWheelerCount: parseInt(restrictionsData[0].twoWheelerParkingCount || "0"),
            fourWheeler: restrictionsData[0].carParking,
            fourWheelerCount: parseInt(restrictionsData[0].carParkingCount || "0"),
          },
          area: {
            value: featuresData[0].superBuiltupArea,
            unit: "sq.ft.",
          },
          availabilityDate: availabilityData[0].availableFrom,
          tenantPreference: [
            restrictionsData[0].bachelorTenants === "Yes" ? "Bachelors" : "",
            restrictionsData[0].nonVegTenants === "Yes" ? "Non-Vegetarian" : "",
            restrictionsData[0].tenantWithPets === "Yes" ? "Pets Allowed" : "",
          ].filter((pref) => pref), // Filter out empty preferences
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) fetchPropertyDetails();
  }, [propertyId]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return <p className="text-center text-gray-600">Loading property details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  if (!propertyDetails) {
    return <p className="text-center text-gray-600">No property details available.</p>;
  }

  return (

    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Home className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Property Details</h1>
        </div>

    <div className="h-[45%] w-[95%] md:w-[70%] bg-[whitesmoke]">
      <div className="p-6 rounded-lg shadow-lg overflow-hidden bg-[whitesmoke]">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Configuration */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Configuration</h3>
                <p className="text-gray-600 mt-1">{propertyDetails.configuration}</p>
              </div>
            </div>
          </div>

          {/* Furnishing Status */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Sofa className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Furnishing Status</h3>
                <p className="text-gray-600 mt-1">{propertyDetails.furnishingStatus}</p>
              </div>
            </div>
          </div>

          {/* Facing */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Compass className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Facing</h3>
                <p className="text-gray-600 mt-1">{propertyDetails.facing}</p>
              </div>
            </div>
          </div>

          {/* Floor */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Floor</h3>
                <p className="text-gray-600 mt-1">
                  {propertyDetails.floor.current} out of {propertyDetails.floor.total} Floors
                </p>
              </div>
            </div>
          </div>

          {/* Parking */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Parking</h3>
                <p className="text-gray-600 mt-1">
                  {propertyDetails.parking.twoWheeler} Two Wheeler
                  {propertyDetails.parking.fourWheeler > 0 &&
                    ` • ${propertyDetails.parking.fourWheeler} Four Wheeler`}
                </p>
              </div>
            </div>
          </div>

          {/* Area */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <SquareFootage className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Area</h3>
                <p className="text-gray-600 mt-1">
                  {propertyDetails.area.value.toLocaleString()} {propertyDetails.area.unit}
                </p>
              </div>

          {/* Area */}
          <div className="flex items-start space-x-3 bg-[whitesmoke] p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <SquareFootage className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">Area</h3>
              <p className="text-gray-600 text-sm truncate">
                {propertyDetails.area.value} {propertyDetails.area.unit}
              </p>
            </div>
          </div>

          {/* Parking */}
          <div className="flex items-start space-x-3 bg-[whitesmoke] p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <Car className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">Parking</h3>
              <p className="text-gray-600 text-sm truncate">
                {propertyDetails.parking.twoWheeler} ({propertyDetails.parking.twoWheelerCount}) Two Wheeler{" "}
                • {propertyDetails.parking.fourWheeler} ({propertyDetails.parking.fourWheelerCount}) Four Wheeler
              </p>

            </div>
          </div>

          {/* Availability Date */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Availability Date</h3>
                <p className="text-gray-600 mt-1">
                  {formatDate(propertyDetails.availabilityDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Tenant Preference */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Tenant Preference</h3>
                <p className="text-gray-600 mt-1">
                  {propertyDetails.tenantPreference.join(" • ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
