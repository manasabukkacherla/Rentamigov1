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
    <div className="h-[45%] w-[95%] md:w-[70%] bg-[whitesmoke]">
      <div 
        className="p-6 rounded-lg shadow-lg overflow-hidden bg-[whitesmoke]"
      >
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

          {/* Parking */}
          <div className="flex items-start space-x-3 bg-[whitesmoke] p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <Car className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">Parking</h3>
              <p className="text-gray-600 text-sm truncate">
                {propertyDetails.parking.twoWheeler} Two Wheeler
                {propertyDetails.parking.fourWheeler > 0 &&
                  ` • ${propertyDetails.parking.fourWheeler} Four Wheeler`}
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
}

export default App;