import type React from "react"
import type { PropertyDetails } from "../types"
import { Calendar, Ruler, Home, CheckCircle, Clock, Users, Wifi, Shield } from "lucide-react"

interface BasicInfoProps {
  details: PropertyDetails
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ details }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 basic-info w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Property Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 px-4 py-4 rounded-xl flex flex-col items-center text-center transition-all hover:shadow-sm">
          <div className="bg-gray-100 p-2.5 rounded-full mb-2">
            <Home className="w-5 h-5 text-gray-700" />
          </div>
          <h3 className="text-xs text-gray-500 mb-1">Configuration</h3>
          <p className="font-semibold text-gray-900 text-sm">{details.configuration}</p>
        </div>

        <div className="bg-gray-50 px-4 py-4 rounded-xl flex flex-col items-center text-center transition-all hover:shadow-sm">
          <div className="bg-gray-100 p-2.5 rounded-full mb-2">
            <CheckCircle className="w-5 h-5 text-gray-700" />
          </div>
          <h3 className="text-xs text-gray-500 mb-1">Furnishing</h3>
          <p className="font-semibold text-gray-900 text-sm">{details.furnishingStatus}</p>
        </div>

        <div className="bg-gray-50 px-4 py-4 rounded-xl flex flex-col items-center text-center transition-all hover:shadow-sm">
          <div className="bg-gray-100 p-2.5 rounded-full mb-2">
            <Ruler className="w-5 h-5 text-gray-700" />
          </div>
          <h3 className="text-xs text-gray-500 mb-1">Size</h3>
          <p className="font-semibold text-gray-900 text-sm">{details.size}</p>
        </div>

        <div className="bg-gray-50 px-4 py-4 rounded-xl flex flex-col items-center text-center transition-all hover:shadow-sm">
          <div className="bg-gray-100 p-2.5 rounded-full mb-2">
            <Calendar className="w-5 h-5 text-gray-700" />
          </div>
          <h3 className="text-xs text-gray-500 mb-1">Available From</h3>
          <p className="font-semibold text-gray-900 text-sm">
            {new Date(details.availabilityDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Property Description - Enhanced UI with black color scheme */}
      <div className="mt-6 p-5 bg-gray-900 rounded-xl text-white">
        <h3 className="font-medium text-white mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Property Description
        </h3>
        <p className="text-gray-200 text-sm leading-relaxed">
          Prestige Lake Ridge is a premium residential project offering spacious apartments with modern amenities.
          Located in Electronic City Phase 1, it provides excellent connectivity to major IT hubs and commercial
          centers. The property features high-quality construction, contemporary design, and a range of lifestyle
          facilities.
        </p>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-300" />
            <span className="text-sm text-gray-300">Family-friendly</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-gray-300" />
            <span className="text-sm text-gray-300">High-speed internet</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-300" />
            <span className="text-sm text-gray-300">24/7 Security</span>
          </div>
        </div>
      </div>
    </div>
  )
}
