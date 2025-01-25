import React from "react";
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

function App() {
  const propertyDetails = {
    configuration: "3 Bedrooms, 2 Bathrooms, 2 Balconies",
    furnishingStatus: "Semi Furnished",
    facing: "North",
    floor: {
      current: 2,
      total: 4,
    },
    parking: {
      twoWheeler: 1,
      fourWheeler: 1,
    },
    area: {
      value: 1850,
      unit: "sq.ft.",
    },
    availabilityDate: "2024-04-01",
    tenantPreference: ["Family", "Bachelors", "Company Lease"],
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Home className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Property Details</h1>
        </div>

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
}

export default App;