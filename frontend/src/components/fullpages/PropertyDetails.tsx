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

        const propertyResponse = await fetch(
          `api/properties/propertyds/${propertyId}`
        );
        if (!propertyResponse.ok) {
          throw new Error("Failed to fetch basic property details");
        }
        const propertyData = await propertyResponse.json();

        const featuresResponse = await fetch(
          `api/properties/${propertyId}/features`
        );
        if (!featuresResponse.ok) {
          throw new Error("Failed to fetch property features");
        }
        const featuresData = await featuresResponse.json();

        const availabilityResponse = await fetch(
          `api/properties/${propertyId}/availability`
        );
        if (!availabilityResponse.ok) {
          throw new Error("Failed to fetch availability details");
        }
        const availabilityData = await availabilityResponse.json();

        const restrictionsResponse = await fetch(
          `api/properties/${propertyId}/restrictions`
        );
        if (!restrictionsResponse.ok) {
          throw new Error("Failed to fetch parking and tenant preferences");
        }
        const restrictionsData = await restrictionsResponse.json();

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
          ].filter((pref) => pref),
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
    return <p className="text-center text-gray-600 text-sm md:text-base">Loading property details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 text-sm md:text-base">Error: {error}</p>;
  }

  if (!propertyDetails) {
    return <p className="text-center text-gray-600 text-sm md:text-base">No property details available.</p>;
  }

  return (
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden mx-auto">
      <div className="p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Home className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Property Details</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Configuration */}
          <div className="bg-white p-4 rounded-xl border hover:shadow-lg">
            <Home className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-sm md:text-base">Configuration</h3>
            <p className="text-sm md:text-base">{propertyDetails.configuration}</p>
          </div>

          {/* Furnishing */}
          <div className="bg-white p-4 rounded-xl border hover:shadow-lg">
            <Sofa className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-sm md:text-base">Furnishing</h3>
            <p className="text-sm md:text-base">{propertyDetails.furnishingStatus}</p>
          </div>

          {/* Facing */}
          <div className="bg-white p-4 rounded-xl border hover:shadow-lg">
            <Compass className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-sm md:text-base">Facing</h3>
            <p className="text-sm md:text-base">{propertyDetails.facing}</p>
          </div>

          {/* Floor */}
          <div className="bg-white p-4 rounded-xl border hover:shadow-lg">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-sm md:text-base">Floor</h3>
            <p className="text-sm md:text-base">
              {propertyDetails.floor.current} of {propertyDetails.floor.total} floors
            </p>
          </div>

          {/* Parking */}
          <div className="bg-white p-4 rounded-xl border hover:shadow-lg">
            <Car className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-sm md:text-base">Parking</h3>
            <p className="text-sm md:text-base">
              {propertyDetails.parking.twoWheeler} ({propertyDetails.parking.twoWheelerCount}) Two
              Wheeler
              <br />
              {propertyDetails.parking.fourWheeler} ({propertyDetails.parking.fourWheelerCount}) Four
              Wheeler
            </p>
          </div>

          {/* Area */}
          <div className="bg-white p-4 rounded-xl border hover:shadow-lg">
            <SquareFootage className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-sm md:text-base">Area</h3>
            <p className="text-sm md:text-base">
              {propertyDetails.area.value} {propertyDetails.area.unit}
            </p>
          </div>

          {/* Availability Date */}
          <div className="bg-white p-4 rounded-xl border hover:shadow-lg">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-sm md:text-base">Availability Date</h3>
            <p className="text-sm md:text-base">{formatDate(propertyDetails.availabilityDate)}</p>
          </div>

          {/* Tenant Preference */}
          <div className="bg-white p-4 rounded-xl border hover:shadow-lg">
            <Users className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-sm md:text-base">Tenant Preference</h3>
            <p className="text-sm md:text-base">{propertyDetails.tenantPreference.join(" • ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
