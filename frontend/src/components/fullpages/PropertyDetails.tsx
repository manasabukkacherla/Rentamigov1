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
    <div className="h-[45%] w-[95%] md:w-[70%] bg-[whitesmoke]">
      <div className="p-6 rounded-lg shadow-lg overflow-hidden bg-[whitesmoke]">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto h-[calc(100%-4rem)]">
          {/* Configuration */}
          <div className="flex items-start space-x-3 bg-[whitesmoke] p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <Home className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">Configuration</h3>
              <p className="text-gray-600 text-sm truncate">{propertyDetails.configuration}</p>
            </div>
          </div>

          {/* Furnishing Status */}
          <div className="flex items-start space-x-3 bg-[whitesmoke] p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <Sofa className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">Furnishing Status</h3>
              <p className="text-gray-600 text-sm truncate">{propertyDetails.furnishingStatus}</p>
            </div>
          </div>

          {/* Facing */}
          <div className="flex items-start space-x-3 bg-[whitesmoke] p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <Compass className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">Facing</h3>
              <p className="text-gray-600 text-sm truncate">{propertyDetails.facing}</p>
            </div>
          </div>

          {/* Floor */}
          <div className="flex items-start space-x-3 bg-[whitesmoke] p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <Building2 className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">Floor</h3>
              <p className="text-gray-600 text-sm truncate">
                {propertyDetails.floor.current} out of {propertyDetails.floor.total} Floors
              </p>
            </div>
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
          <div className="flex items-start space-x-3 bg-[whitesmoke] p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <Calendar className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">Availability Date</h3>
              <p className="text-gray-600 text-sm truncate">
                {formatDate(propertyDetails.availabilityDate)}
              </p>
            </div>
          </div>

          {/* Tenant Preference */}
          <div className="flex items-start space-x-3 bg-[whitesmoke] p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <Users className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">Tenant Preference</h3>
              <p className="text-gray-600 text-sm truncate">
                {propertyDetails.tenantPreference.join(" • ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
