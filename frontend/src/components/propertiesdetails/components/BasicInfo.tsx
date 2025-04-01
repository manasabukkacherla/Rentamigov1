import type React from "react"
import type { PropertyDetails } from "../types"
import { Calendar, Ruler, Home, CheckCircle2 } from "lucide-react"

interface BasicInfoProps {
  details: PropertyDetails
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ details }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Property Overview</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <Home className="w-6 h-6 text-gray-700 mb-2" />
          <span className="text-sm text-gray-500 mb-1">Configuration</span>
          <span className="font-semibold text-gray-900">{details.configuration}</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <CheckCircle2 className="w-6 h-6 text-gray-700 mb-2" />
          <span className="text-sm text-gray-500 mb-1">Furnishing</span>
          <span className="font-semibold text-gray-900">{details.furnishingStatus}</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <Ruler className="w-6 h-6 text-gray-700 mb-2" />
          <span className="text-sm text-gray-500 mb-1">Size</span>
          <span className="font-semibold text-gray-900">{details.size}</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <Calendar className="w-6 h-6 text-gray-700 mb-2" />
          <span className="text-sm text-gray-500 mb-1">Available From</span>
          <span className="font-semibold text-gray-900">
            {new Date(details.availabilityDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
        <p className="text-gray-600 leading-relaxed">
          Prestige Lake Ridge is a premium residential project offering spacious and well-designed apartments. Located
          in the heart of Electronic City Phase 1, this property provides easy access to major IT parks, educational
          institutions, healthcare facilities, and entertainment options.
        </p>
        <p className="text-gray-600 leading-relaxed mt-3">
          The apartment features modern amenities, quality fittings, and excellent ventilation. The society offers a
          range of facilities including a swimming pool, gym, children's play area, and 24/7 security to ensure a
          comfortable and secure living experience.
        </p>
      </div>
    </div>
  )
}

